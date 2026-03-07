# Life Memory Wall — Product Documentation

---

## 1. Vision & Idea

**Life Memory Wall** is a web application for capturing, preserving, and reliving life memories as beautiful visual timelines. It replaces traditional photo albums and diary apps with a **dreamlike, emotional, storybook-style experience** — designed to feel warm and nostalgic, not like a dashboard or productivity tool.

The core philosophy: **Memories are not data. They are stories. They deserve to feel like stories.**

---

## 2. Core Concepts

### 2.1 Memory Spaces
A **Memory Space** is a container for memories — like a scrapbook or journal. There are two types:

| Type | Description | Visibility |
|------|-------------|------------|
| **Personal** | Private journal for one user. Only the creator can see it. | Creator only |
| **Group** | Shared space for friends, family, or teams. Multiple members contribute. | Members only |

Every user can have multiple spaces. A user only sees spaces where they are an **active member**.

### 2.2 Memories
A **Memory** is a single event or moment on the timeline. It contains:
- **Title** — a short name (e.g., "Landing in Bangkok")
- **Date** (and optional **End Date**) — when it happened; multi-day events are supported
- **Story** — a written narrative of the event
- **Location** — where it happened (optional)
- **Tags** — categorization labels (optional)
- **Photos** — image attachments (placeholder/future feature)
- **Reactions** — emoji reactions with counts
- **Visibility** — which members can see this memory (group spaces only)
- **Creator** — who created this memory

Memories are always displayed **sorted chronologically by date** on the timeline.

### 2.3 Substories (Moments)
Each memory can contain **substories** — smaller moments within the larger event. For example, a "Thailand Trip" memory might have substories like "Airport chaos", "First tuk-tuk ride", "Khao San Road at midnight".

Substories have three types:
| Type | Content |
|------|---------|
| **Text** | A written story/paragraph |
| **Photo** | A single photo with caption |
| **Photos** | A photo grid (2x2) with caption |

Substories are grouped by date and displayed as a flowing sub-timeline within the memory detail view.

### 2.4 Users
Each user has:
- Unique ID, Name, Email, Phone, Avatar
- Can own or be a member of multiple spaces
- Sees only spaces they belong to
- Has different roles across different spaces

---

## 3. User Flows

### 3.1 Authentication Flow

```
                    +-------------------+
                    |   Login Screen    |
                    |                   |
                    | [Continue Google] |
                    | [Continue Email]  |
                    | [Continue Phone]  |
                    | [Quick Login x6]  |
                    +-------------------+
                           |
              +------------+------------+
              |            |            |
        Google SSO    Email Flow    Phone Flow
        (one-tap)         |            |
              |      +----+----+  +----+----+
              |      | Enter   |  | Enter   |
              |      | Email   |  | Phone   |
              |      +----+----+  +----+----+
              |           |            |
              |      +----+----+  +----+----+
              |      | Enter   |  | Enter   |
              |      | Password|  | 6-digit |
              |      +---------+  | OTP     |
              |           |       +---------+
              |           |            |
              +-----+-----+-----+-----+
                    |
              +-----+------+
              | Space      |
              | Selector   |
              +------------+
```

**Google Login**: Single tap, instant login.

**Email Login** (two-step):
1. Enter email address -> Continue
2. Enter password -> Sign In
3. Can go back to change email at step 2

**Phone Login** (two-step):
1. Enter phone number (with +91 prefix) -> Send OTP
2. Enter 6-digit OTP in individual input boxes
3. Auto-submits when all 6 digits filled
4. Auto-focuses next box on digit entry
5. Backspace moves to previous box
6. Resend code option available

**Quick Login**: 6 test user buttons at the bottom for development/testing.

### 3.2 Space Selection Flow

```
+------------------------------------------+
|          "Hello, [User Name]"            |
|   "Where do you want to go today?"      |
|                                          |
|  [Pending Requests Banner - if any]      |
|                                          |
|   (O) (O) (O) (O) (O) (+)              |
|   Space bubbles    Create New            |
|                                          |
|   [Join a space with invite code]        |
+------------------------------------------+
```

- User sees **only their spaces** (filtered by active membership)
- Each space is a **circular bubble** with emoji, title, memory count
- Group spaces show member count and role badge
- **Red badge** on spaces with pending join requests (visible to owner/admin)
- **Pending requests banner** at top if any requests await approval
- **"+" button** to create a new space
- **"Join a space"** link to enter an invite code

### 3.3 Space Creation Flow

1. User taps "+" button
2. Modal opens with:
   - **Name** field (text input)
   - **Emoji picker** (10 preset emojis)
   - **Type selector** (Personal / Group toggle)
3. If Group selected: shows note that a unique invite code will be generated
4. On create: space appears immediately with user as owner
5. Group spaces auto-generate a **6-character invite code**

### 3.4 Join Space Flow

```
User enters code -> Request sent -> Owner/Admin approves -> User gains access
```

1. User clicks "Join a space with invite code"
2. Enters 6-character code (auto-uppercased, monospace display)
3. System validates:
   - Invalid code -> Error message
   - Already a member -> Error message
   - Already requested -> Error message
   - Valid -> Creates a **pending join request**
4. Shows "Request sent! Waiting for approval." message
5. Owner/Admin of target space sees request in:
   - Red badge on space bubble
   - Pending requests banner
   - Members modal with Approve/Reject buttons
6. On approval: user becomes active member and can see the space
7. On rejection: request is removed

### 3.5 Timeline View Flow

```
+------------------------------------------+
| [<- Spaces]  Space Title + Emoji   [N]   |  <- Header with back + member count
|                                          |
|    "Description of the space"            |
|    "with Member1, Member2, ..."          |
|                                          |
|         o                                |  <- Timeline dot
|    +--------+                            |
|    | Memory |     (alternating left/right)|
|    | Card   |                            |
|    +--------+                            |
|                   o                      |
|              +--------+                  |
|              | Memory |                  |
|              | Card   |                  |
|              +--------+                  |
|         o                                |
|    +--------+                            |
|    | Memory |                            |
|    +--------+                            |
|                                          |
|    "...and the story continues"          |
|                                          |
|  [Home] [Explore] (+) [Explore] [User]   |  <- Floating nav
+------------------------------------------+
```

**Full Mode** (no memory selected):
- Alternating left/right **polaroid-style cards** along a center dashed line
- Each card shows: photo area (gradient placeholder + tag emoji), date badge, title, story excerpt, location, tags, reactions, substory count hint
- Cards animate in from left/right as they scroll into view
- Dashed timeline path animates with scroll progress
- Mobile: single column with left-aligned timeline

**Split Mode** (memory selected):
```
+---+------------------------------------------+
|   |                                          |
| S | Memory Detail View (~88% width)          |
| i |                                          |
| d | Title (large serif)                      |
| e | Date (handwriting) + Location            |
| b | Story text                               |
| a |                                          |
| r | [Stories] [Photos] tabs                   |
|   |                                          |
| T | Substory timeline...                     |
| i |                                          |
| m | [+ Add a moment]                         |
| e |                                          |
| l |                                          |
| i |                                          |
| n |                                          |
| e |                                          |
+---+------------------------------------------+
  ~12%
```

- Left sidebar (~12% width, min 180px) shows compact card list with small dots
- Right detail area takes remaining space (~88%)
- Selected card is highlighted in sidebar
- Clicking another card in sidebar switches the detail view
- Mobile: full-screen overlay for detail view

### 3.6 Memory Detail View

**Header Section:**
- Large serif title (text-4xl on desktop, text-5xl on large screens)
- Handwriting-style date with optional date range
- Location with map pin icon
- Story text in readable sans font

**Two Tabs:**

**Stories Tab:**
- Substories grouped by date
- Each date has a marker dot on a flowing timeline line
- Text stories show title + content
- Photo stories show gradient placeholder + caption
- Photo grid stories show 2x2 grid + caption
- Empty state: "No stories yet — Add moments from this memory"

**Photos Tab:**
- Grid of all photos from substories (2-3 columns)
- Hover reveals photo title
- Captions shown below each photo
- Empty state: "No photos yet — Photos from your stories will appear here"

**Add a Moment Form:**
- "Add a moment" dashed button expands into a form
- Type selector: Story / Photo / Photos (with icons)
- Title input, content/caption textarea
- Photo upload area (placeholder)
- Cancel / Add moment buttons

### 3.7 Memory Creation Flow

1. User taps the glowing "+" orb in floating nav
2. **Journal-page styled modal** opens with:
   - Title (serif input with underline)
   - Date picker ("When did this happen?")
   - Story textarea ("Tell the story")
   - Photo upload area (coming soon)
   - Location input (with MapPin icon)
   - Tags input (comma-separated, with Tag icon)
   - **Visibility selector** (group spaces only):
     - Eye icon toggle: "Visible to everyone" / "Visible to N selected"
     - Expands to show checkboxes for all active members
     - Each member shows name + "(you)" indicator
   - Save button with gradient
3. Memory added to the active space's timeline, sorted by date
4. Edit mode: same modal pre-filled with existing memory data

### 3.8 Memory Visibility (Group Spaces)

- When creating/editing a memory in a group space, user can toggle visibility
- **Default**: Visible to everyone in the space (visibleTo is empty/undefined)
- **Restricted**: Only selected members can see the memory
- The timeline filters memories using `getVisibleMemories()` — if a memory has a `visibleTo` array, only users in that array see it
- Use case: "In a group, there can be specific moments only 2-3 people are part of"

### 3.9 Back Navigation

Context-aware back button in the header:
- **In detail view** -> Back to timeline (label: "Timeline")
- **In timeline view** -> Back to space selector (label: "Spaces")

### 3.10 Member Management

Accessible via "N members" link under group space bubbles:

**Members Modal shows:**
- Space name + emoji
- Member count
- **Invite code** (monospace, large tracking) with:
  - Copy code button
  - Copy invite message button (copies formatted text)
- **Pending requests** section (owner/admin only):
  - Requester name, avatar initial, request date
  - Approve (green checkmark) / Reject (red X) buttons
- **Members list** sorted by role (owner -> admin -> member):
  - Avatar initial, name, "(you)" indicator, join date
  - Role badge: Owner (gold crown), Admin (teal shield), Member (text)

---

## 4. Data Flow

### 4.1 State Management (Zustand)

All application state lives in a single Zustand store. No backend — everything is in-memory with mock data.

```
AppState
├── isLoggedIn: boolean
├── currentUser: User | null
├── spaces: MemorySpace[]        <- all spaces (source of truth)
├── activeSpaceId: string | null <- which space is open
│
├── login(user?) -> sets currentUser, isLoggedIn=true
├── logout() -> clears user, activeSpaceId
├── setActiveSpace(id) -> navigates to space
│
├── getActiveSpace() -> finds space by activeSpaceId
├── getVisibleSpaces() -> filters spaces where currentUser is active member
├── getVisibleMemories(space) -> filters memories by visibleTo field
│
├── addMemory(spaceId, memory) -> appends to space.memories
├── updateMemory(spaceId, memoryId, updates) -> patches memory
├── deleteMemory(spaceId, memoryId) -> removes memory
├── addReaction(spaceId, memoryId, emoji) -> increments reaction count
├── addSubstory(spaceId, memoryId, substory) -> appends to memory.substories
│
├── addSpace(space) -> creates space with user as owner + invite code
├── requestJoinByCode(code) -> validates code, creates JoinRequest
├── approveJoinRequest(spaceId, userId) -> moves from requests to members
├── rejectJoinRequest(spaceId, userId) -> removes request
├── getPendingRequests(spaceId) -> returns joinRequests array
├── getInviteCode(spaceId) -> returns invite code
├── removeMember(spaceId, userId) -> removes from membersList
└── updateMemberRole(spaceId, userId, role) -> changes member role
```

### 4.2 Data Flow Diagrams

**Login Flow:**
```
User clicks login button
  -> login({ id, name, email })
  -> set({ isLoggedIn: true, currentUser: merged })
  -> App re-renders: !isLoggedIn=false -> shows SpaceSelector
```

**Space Navigation:**
```
User clicks space bubble
  -> setActiveSpace(space.id)
  -> set({ activeSpaceId: id })
  -> App re-renders: activeSpaceId exists -> shows Timeline
  -> Timeline calls getActiveSpace() -> finds space
  -> Timeline calls getVisibleMemories(space) -> filters by visibleTo
  -> Renders sorted, filtered memories
```

**Join Request Flow:**
```
User enters invite code
  -> requestJoinByCode(code)
  -> Validates: code exists? already member? already requested?
  -> Creates JoinRequest { userId, userName, requestedAt }
  -> Appends to space.joinRequests

Owner opens members modal
  -> Sees pending requests
  -> Clicks approve
  -> approveJoinRequest(spaceId, userId)
  -> Creates SpaceMember { role: 'member', status: 'active' }
  -> Removes JoinRequest
  -> New user can now see the space in getVisibleSpaces()
```

**Memory Creation Flow:**
```
User fills CreateMemoryModal form
  -> handleSave(memory)
  -> addMemory(spaceId, memory) in store
  -> memory includes visibleTo[] if visibility was restricted
  -> space.memories updated, memoryCount incremented
  -> Timeline re-renders with new memory in sorted position
```

**Substory Addition Flow:**
```
User fills "Add a moment" form in MemoryDetail
  -> handleAddSubstory(memoryId, substory)
  -> addSubstory(spaceId, memoryId, substory) in store
  -> Appends to memory.substories (NOT main timeline)
  -> MemoryDetail re-renders with new substory
```

---

## 5. Invite Code System

- **Format**: 6 characters from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (no 0, O, 1, I, L to avoid confusion)
- **Generation**: On space creation, generates code and checks against all existing codes for uniqueness
- **Collision handling**: Regenerates until unique code found
- **Display**: Monospace font, large letter-spacing for readability
- **Copy options**: Copy code only, or copy formatted invite message
- **Validation**: Case-insensitive (auto-uppercased on input)

---

## 6. Role & Permission System

| Action | Owner | Admin | Member |
|--------|-------|-------|--------|
| View space & memories | Yes | Yes | Yes |
| Add/edit/delete own memories | Yes | Yes | Yes |
| See invite code | Yes | Yes | Yes |
| Copy invite code/message | Yes | Yes | Yes |
| View pending join requests | Yes | Yes | No |
| Approve/reject join requests | Yes | Yes | No |
| See pending request badges | Yes | Yes | No |

---

## 7. Mock Data Structure

### 7.1 Test Users (6 total)

| ID | Name | Email | Phone |
|----|------|-------|-------|
| u1 | Jagadeesh | jagadeesh@example.com | 9876543210 |
| u2 | Rahul | rahul@example.com | 9876543211 |
| u3 | Priya | priya@example.com | 9876543212 |
| u4 | Ankit | ankit@example.com | 9876543213 |
| u5 | Vikram | vikram@example.com | 9876543214 |
| u6 | Sneha | sneha@example.com | 9876543215 |

### 7.2 Spaces (13 total: 6 personal + 7 group)

**Personal Spaces** (one per user):
| Space | Owner | Memories |
|-------|-------|----------|
| Personal Life | Jagadeesh | 3 (Luna, Dream Job, Moving) |
| Rahul's Diary | Rahul | 2 (Open Mic, Solo Trip) |
| Priya's Corner | Priya | 2 (Painting Sold, Adopted Biscuit) |
| Ankit's Log | Ankit | 1 (Side Project) |
| Vikram's World | Vikram | 1 (First Song) |
| Sneha's Space | Sneha | 1 (50 Books) |

**Group Spaces:**
| Space | Owner | Code | Members |
|-------|-------|------|---------|
| Thailand Trip 2025 | Jagadeesh | TH25XP | Jagadeesh, Rahul, Priya, Ankit |
| College Gang | Vikram | CLG4EV | Vikram, Jagadeesh, Sneha, Rahul, Priya |
| Startup Journey | Jagadeesh | STRT9K | Jagadeesh, Ankit, Sneha |
| Weekend Trekkers | Rahul | TREK77 | Rahul, Jagadeesh, Vikram, Ankit |
| The Reading Room | Sneha | READ42 | Sneha, Priya, Vikram |
| Goa Reunion 2024 | Priya | GOA24X | All 6 users |
| Fitness Buddies | Ankit | FIT365 | Ankit, Rahul, Jagadeesh |

### 7.3 User-to-Space Membership Matrix

| User | Spaces Visible |
|------|---------------|
| Jagadeesh (u1) | Personal Life, Thailand Trip, College Gang, Startup Journey, Weekend Trekkers, Goa Reunion, Fitness Buddies (7) |
| Rahul (u2) | Rahul's Diary, Thailand Trip, College Gang, Weekend Trekkers, Goa Reunion, Fitness Buddies (6) |
| Priya (u3) | Priya's Corner, Thailand Trip, College Gang, Goa Reunion (4) |
| Ankit (u4) | Ankit's Log, Thailand Trip, Startup Journey, Weekend Trekkers, Goa Reunion (5) |
| Vikram (u5) | Vikram's World, College Gang, Weekend Trekkers, The Reading Room, Goa Reunion (5) |
| Sneha (u6) | Sneha's Space, College Gang, Startup Journey, The Reading Room, Goa Reunion (4) |

---

## 8. UI/UX Design Philosophy

### 8.1 Visual Identity
- **Dreamlike, warm, nostalgic** — not clinical or corporate
- **Soft animated gradient background** that shifts between lavender, peach, blue-white, and warm orange
- **Glassmorphism** for cards and overlays (frosted glass effect with backdrop blur)
- **Polaroid-style memory cards** with slight rotation and shadow
- **Floating particle canvas** with gold and lavender dots drifting slowly
- **No harsh borders** — everything uses rounded corners (rounded-2xl, rounded-3xl, rounded-full)

### 8.2 Typography
- **Playfair Display** (serif) — for titles, headings, names — emotional and elegant
- **DM Sans** (sans-serif) — for body text, labels, metadata — clean and readable
- **Caveat** (handwriting) — for dates, descriptions, hints — personal and warm

### 8.3 Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Lavender | #f0e6ff | Background accents, card gradients |
| Peach | #ffe8d6 | Background accents, warm highlights |
| Gold | #d4a574 | Primary accent, timeline dots, buttons, glowing orb |
| Coral | #e8927c | Secondary accent, delete actions, urgent badges |
| Teal | #7cb5a8 | Success states, admin badges, approve buttons |
| Warm White | #fffbf5 | Card backgrounds, page backgrounds |
| Warm Dark | #4a3728 | Primary text color |

### 8.4 Animations
- **Page transitions**: Fade-in with Framer Motion
- **Card entrance**: Slide in from left/right with spring physics
- **Floating nav**: Spring up from bottom
- **Memory detail**: Slide in from right (desktop), slide up from bottom (mobile)
- **Bubble hover**: Scale up + lift (translateY -8px)
- **Create orb**: Glow animation (pulsing box-shadow)
- **Timeline path**: Animated dashed stroke
- **Particles**: Continuous slow drift across screen

### 8.5 Responsive Design
- **Desktop**: Full split-view with sidebar, alternating card layout, centered timeline
- **Mobile**: Single column, left-aligned timeline, full-screen detail overlay
- Breakpoint: `md` (768px) is the primary responsive switch

---

## 9. Floating Navigation Bar

Fixed at bottom center of screen in Timeline view:
```
[Home] [Explore] (+) [Explore] [Profile]
```
- **Home**: Returns to space selector
- **Explore**: Placeholder for future discovery feature
- **+ (Create Orb)**: Opens memory creation modal, has glowing gold-to-coral gradient with pulse animation
- **Profile**: Placeholder for future profile feature

---

## 10. Edge Cases & Behaviors

1. **Empty space**: Shows "No memories yet" with hint to use the glowing orb
2. **Empty substories**: Shows "No stories yet — Add moments from this memory"
3. **Empty photos tab**: Shows camera icon + "No photos yet"
4. **Single-member group**: Still gets invite code, can invite others
5. **User logs in with unknown email/phone**: Falls back to default user (u1) with the entered email/phone
6. **Duplicate join request**: Shows error "You already have a pending request"
7. **Already a member**: Shows error "You are already a member of this space"
8. **Memory with no visibleTo**: Visible to all space members (default behavior)
9. **Memory with visibleTo=[]**: Also visible to all (treated same as undefined)
10. **Back button context**: Always knows whether to go to timeline or spaces based on current state

---

*Document generated for Life Memory Wall v1.0.0*
*Last updated: March 2026*
