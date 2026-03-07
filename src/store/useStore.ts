import { create } from 'zustand'
import { Memory, MemorySpace, SubStory, User, SpaceMember, JoinRequest } from '../types'
import { memorySpaces as initialSpaces, allUsers } from '../data/mockData'

function generateUniqueCode(existingCodes: string[]): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const existing = new Set(existingCodes)
  let code = ''
  do {
    code = ''
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  } while (existing.has(code))
  return code
}

interface AppState {
  isLoggedIn: boolean
  currentUser: User | null
  spaces: MemorySpace[]
  activeSpaceId: string | null

  login: (user?: Partial<User>) => void
  logout: () => void
  setActiveSpace: (id: string | null) => void
  getActiveSpace: () => MemorySpace | undefined
  getVisibleSpaces: () => MemorySpace[]
  getVisibleMemories: (space: MemorySpace) => Memory[]

  addMemory: (spaceId: string, memory: Memory) => void
  updateMemory: (spaceId: string, memoryId: string, updates: Partial<Memory>) => void
  deleteMemory: (spaceId: string, memoryId: string) => void
  addReaction: (spaceId: string, memoryId: string, emoji: string) => void
  addSubstory: (spaceId: string, memoryId: string, substory: SubStory) => void

  addSpace: (space: MemorySpace) => void
  requestJoinByCode: (code: string) => { success: boolean; spaceName?: string; error?: string }
  approveJoinRequest: (spaceId: string, userId: string) => void
  rejectJoinRequest: (spaceId: string, userId: string) => void
  getPendingRequests: (spaceId: string) => JoinRequest[]
  getInviteCode: (spaceId: string) => string | undefined
  removeMember: (spaceId: string, userId: string) => void
  updateMemberRole: (spaceId: string, userId: string, role: SpaceMember['role']) => void
}

export const useStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  currentUser: null,
  spaces: initialSpaces,
  activeSpaceId: null,

  login: (user) => {
    const existing = user?.id ? allUsers.find((u) => u.id === user.id) : allUsers[0]
    const merged: User = {
      id: user?.id || existing?.id || 'u1',
      name: user?.name || existing?.name || 'User',
      email: user?.email || existing?.email || '',
      avatar: user?.avatar || existing?.avatar || '',
      phone: user?.phone || existing?.phone,
    }
    set({ isLoggedIn: true, currentUser: merged })
  },

  logout: () => set({ isLoggedIn: false, currentUser: null, activeSpaceId: null }),
  setActiveSpace: (id) => set({ activeSpaceId: id }),

  getActiveSpace: () => {
    const { spaces, activeSpaceId } = get()
    return spaces.find((s) => s.id === activeSpaceId)
  },

  getVisibleSpaces: () => {
    const { spaces, currentUser } = get()
    if (!currentUser) return []
    return spaces.filter((s) =>
      s.membersList.some((m) => m.userId === currentUser.id && m.status === 'active')
    )
  },

  getVisibleMemories: (space) => {
    const { currentUser } = get()
    if (!currentUser) return []
    return space.memories.filter((m) => {
      if (!m.visibleTo || m.visibleTo.length === 0) return true
      return m.visibleTo.includes(currentUser.id)
    })
  },

  addMemory: (spaceId, memory) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? { ...s, memories: [...s.memories, memory], memoryCount: s.memoryCount + 1 }
          : s
      ),
    })),

  updateMemory: (spaceId, memoryId, updates) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? { ...s, memories: s.memories.map((m) => m.id === memoryId ? { ...m, ...updates } : m) }
          : s
      ),
    })),

  deleteMemory: (spaceId, memoryId) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? { ...s, memories: s.memories.filter((m) => m.id !== memoryId), memoryCount: s.memoryCount - 1 }
          : s
      ),
    })),

  addReaction: (spaceId, memoryId, emoji) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? {
              ...s,
              memories: s.memories.map((m) =>
                m.id === memoryId
                  ? { ...m, reactions: { ...m.reactions, [emoji]: ((m.reactions?.[emoji]) ?? 0) + 1 } }
                  : m
              ),
            }
          : s
      ),
    })),

  addSubstory: (spaceId, memoryId, substory) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? {
              ...s,
              memories: s.memories.map((m) =>
                m.id === memoryId
                  ? { ...m, substories: [...(m.substories || []), substory] }
                  : m
              ),
            }
          : s
      ),
    })),

  addSpace: (space) => {
    const { currentUser, spaces } = get()
    if (!currentUser) return
    const existingCodes = spaces.map((s) => s.inviteCode).filter(Boolean) as string[]
    const newSpace: MemorySpace = {
      ...space,
      createdBy: currentUser.id,
      inviteCode: space.type === 'group' ? generateUniqueCode(existingCodes) : undefined,
      joinRequests: [],
      membersList: [
        { userId: currentUser.id, name: currentUser.name, role: 'owner', status: 'active', joinedAt: new Date().toISOString().split('T')[0] },
      ],
    }
    set((state) => ({ spaces: [...state.spaces, newSpace] }))
  },

  requestJoinByCode: (code) => {
    const { spaces, currentUser } = get()
    if (!currentUser) return { success: false, error: 'Not logged in' }

    const upperCode = code.toUpperCase().trim()
    const space = spaces.find((s) => s.inviteCode === upperCode)

    if (!space) return { success: false, error: 'Invalid invite code. Please check and try again.' }
    if (space.membersList.some((m) => m.userId === currentUser.id && m.status === 'active'))
      return { success: false, error: 'You are already a member of this space.' }
    if (space.joinRequests.some((r) => r.userId === currentUser.id))
      return { success: false, error: 'You already have a pending request for this space.' }

    const request: JoinRequest = {
      userId: currentUser.id,
      userName: currentUser.name,
      requestedAt: new Date().toISOString().split('T')[0],
    }

    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === space.id
          ? { ...s, joinRequests: [...s.joinRequests, request] }
          : s
      ),
    }))

    return { success: true, spaceName: space.title }
  },

  approveJoinRequest: (spaceId, userId) => {
    const { spaces } = get()
    const space = spaces.find((s) => s.id === spaceId)
    const request = space?.joinRequests.find((r) => r.userId === userId)
    if (!request) return

    const newMember: SpaceMember = {
      userId: request.userId,
      name: request.userName,
      role: 'member',
      status: 'active',
      joinedAt: new Date().toISOString().split('T')[0],
    }

    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? {
              ...s,
              membersList: [...s.membersList, newMember],
              joinRequests: s.joinRequests.filter((r) => r.userId !== userId),
            }
          : s
      ),
    }))
  },

  rejectJoinRequest: (spaceId, userId) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? { ...s, joinRequests: s.joinRequests.filter((r) => r.userId !== userId) }
          : s
      ),
    })),

  getPendingRequests: (spaceId) => {
    const { spaces } = get()
    return spaces.find((s) => s.id === spaceId)?.joinRequests || []
  },

  getInviteCode: (spaceId) => {
    const { spaces } = get()
    return spaces.find((s) => s.id === spaceId)?.inviteCode
  },

  removeMember: (spaceId, userId) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? { ...s, membersList: s.membersList.filter((m) => m.userId !== userId) }
          : s
      ),
    })),

  updateMemberRole: (spaceId, userId, role) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? { ...s, membersList: s.membersList.map((m) => m.userId === userId ? { ...m, role } : m) }
          : s
      ),
    })),
}))
