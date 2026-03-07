import { useState, useRef, useEffect, useCallback } from 'react'

const EMOJI_CATEGORIES: Record<string, string[]> = {
  'Smileys': [
    '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇',
    '🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚',
    '😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔',
    '🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥',
    '😔','😪','🤤','😴','😷','🤒','🤕','🥺','😢','😭',
    '😱','😖','😣','😞','😓','😩','😫','🥳','😎','🤩',
  ],
  'Hearts': [
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔',
    '❣️','💕','💞','💓','💗','💖','💘','💝','💟','♥️',
    '😍','🥰','💑','👫','👬','👭','🫂','🤝','🙌','👏',
  ],
  'Gestures': [
    '👍','👎','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙',
    '👈','👉','👆','👇','☝️','👋','🤚','🖐️','✋','🖖',
    '🙏','💪','🦾','💅','🤳','🤲','🫶','🫱','🫲','🫸',
  ],
  'Nature': [
    '🌸','🌺','🌻','🌹','🌷','🌼','🌿','🍀','🍁','🍂',
    '🍃','🌱','🌲','🌳','🌴','🌵','🎋','🎍','🍄','🌊',
    '⭐','🌟','💫','✨','☀️','🌤️','🌈','🌙','❄️','🔥',
    '🌬️','🌀','⛅','🌦️','🌧️','⛈️','🌩️','🌪️','🌫️','🌅',
  ],
  'Animals': [
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯',
    '🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🦆','🦅',
    '🦉','🦋','🐝','🐞','🐠','🐟','🐬','🐳','🦈','🐊',
    '🐢','🦎','🐍','🐉','🦕','🦖','🦓','🦒','🐘','🦏',
  ],
  'Food': [
    '🍎','🍊','🍋','🍇','🍓','🫐','🍑','🥭','🍍','🥥',
    '🥑','🍆','🥕','🌽','🌶️','🥗','🍕','🍔','🌮','🌯',
    '🍜','🍝','🍣','🍱','🎂','🍰','🧁','🍩','🍪','🍫',
    '☕','🧋','🥤','🍺','🥂','🍾','🍦','🧃','🫖','🍷',
  ],
  'Activities': [
    '⚽','🏀','🏈','⚾','🎾','🏐','🎱','🏓','🏸','🥊',
    '🎿','⛷️','🏂','🏋️','🤸','🏊','🚴','🧘','🎭','🎨',
    '🎬','🎤','🎧','🎵','🎶','🎸','🎹','🥁','🎻','🎷',
    '🎮','🕹️','🎲','🎯','🧩','🎪','🎠','🎡','🎢','🎰',
  ],
  'Travel': [
    '✈️','🚀','🛸','🚁','🛩️','⛵','🚢','🚂','🚗','🏎️',
    '🏠','🏡','🏰','🗼','🗽','🗿','🌋','🏔️','🏖️','🏕️',
    '🌅','🌇','🌆','🌃','🌉','🌌','🎆','🎇','🗺️','🧭',
    '🌍','🌎','🌏','🧳','🎒','⛺','🌠','🛤️','🛣️','🏗️',
  ],
  'Symbols': [
    '💯','✅','❌','❓','❗','💡','🔑','🔒','🔓','⚡',
    '🎉','🎊','🎁','🏆','🥇','🎖️','📸','📱','💻','⌚',
    '💎','👑','🔮','🪄','🧲','💌','📝','📖','📚','✏️',
    '💸','💰','🪙','🔔','📣','📢','🚨','⚠️','🎯','🧿',
  ],
}

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value, onChange, placeholder, className }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const savedRange = useRef<Range | null>(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [emojiTab, setEmojiTab] = useState('Smileys')
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())

  // Set initial HTML once on mount only
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || ''
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save the current selection range (called on every interaction inside editor)
  const saveRange = useCallback(() => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange()
      // Update active formats based on where the cursor is
      const active = new Set<string>()
      try {
        if (document.queryCommandState('bold')) active.add('bold')
        if (document.queryCommandState('italic')) active.add('italic')
        if (document.queryCommandState('underline')) active.add('underline')
        if (document.queryCommandState('strikeThrough')) active.add('strikeThrough')
      } catch { /* ignore */ }
      setActiveFormats(active)
    }
  }, [])

  // Restore saved range, then apply execCommand
  const applyFormat = (e: React.MouseEvent, cmd: string) => {
    e.preventDefault()
    e.stopPropagation()

    // Restore the saved selection into the editor
    editorRef.current?.focus()
    if (savedRange.current) {
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(savedRange.current)
      }
    }

    document.execCommand(cmd, false, undefined)
    onChange(editorRef.current?.innerHTML || '')

    // Re-save updated range and re-check active formats
    setTimeout(saveRange, 0)
  }

  const insertEmoji = (e: React.MouseEvent, emoji: string) => {
    e.preventDefault()
    editorRef.current?.focus()
    if (savedRange.current) {
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(savedRange.current)
      }
    }
    document.execCommand('insertText', false, emoji)
    onChange(editorRef.current?.innerHTML || '')
    setShowEmojis(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      document.execCommand('insertLineBreak')
      onChange(editorRef.current?.innerHTML || '')
    }
  }

  const isActive = (cmd: string) => activeFormats.has(cmd)

  const fmtBtn = (active: boolean) =>
    `h-8 rounded-lg flex items-center justify-center transition-all select-none cursor-pointer text-sm ${
      active
        ? 'bg-warmDark/15 text-warmDark shadow-sm ring-1 ring-warmDark/20'
        : 'text-warmDark/55 hover:bg-black/8 hover:text-warmDark'
    }`

  return (
    <div className={`relative ${className ?? ''}`}>
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-1 mb-1.5 bg-white/50 rounded-xl px-2.5 py-1.5 border border-warmMid/10">
        <button type="button" onMouseDown={(e) => applyFormat(e, 'bold')}
          className={`${fmtBtn(isActive('bold'))} w-8 font-bold`} title="Bold">B</button>
        <button type="button" onMouseDown={(e) => applyFormat(e, 'italic')}
          className={`${fmtBtn(isActive('italic'))} w-8 italic`} title="Italic">I</button>
        <button type="button" onMouseDown={(e) => applyFormat(e, 'underline')}
          className={`${fmtBtn(isActive('underline'))} w-8 underline`} title="Underline">U</button>
        <button type="button" onMouseDown={(e) => applyFormat(e, 'strikeThrough')}
          className={`${fmtBtn(isActive('strikeThrough'))} w-8 line-through`} title="Strikethrough">S</button>

        <div className="w-px h-4 bg-warmMid/20 mx-0.5" />

        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); setShowEmojis(v => !v) }}
          className={`${fmtBtn(showEmojis)} w-8 text-base`}
          title="Emoji"
        >😊</button>
      </div>

      {/* ── Emoji picker ── */}
      {showEmojis && (
        <div className="absolute top-12 left-0 z-50 bg-white/98 backdrop-blur-sm rounded-2xl shadow-xl border border-warmMid/15 w-80">
          <div className="flex overflow-x-auto gap-0.5 px-2 pt-2 pb-1 border-b border-warmMid/10" style={{ scrollbarWidth: 'none' }}>
            {Object.keys(EMOJI_CATEGORIES).map((cat) => (
              <button key={cat} type="button"
                onMouseDown={(e) => { e.preventDefault(); setEmojiTab(cat) }}
                className={`flex-shrink-0 px-2 py-1 rounded-lg text-xs transition-colors ${
                  emojiTab === cat ? 'bg-gold/20 text-warmDark font-medium' : 'text-warmDark/50 hover:bg-warmMid/10'
                }`}>{cat}</button>
            ))}
          </div>
          <div className="grid grid-cols-10 gap-0.5 p-2 max-h-44 overflow-y-auto">
            {(EMOJI_CATEGORIES[emojiTab] || []).map((emoji) => (
              <button key={emoji} type="button"
                onMouseDown={(e) => insertEmoji(e, emoji)}
                className="w-7 h-7 flex items-center justify-center hover:bg-warmMid/15 rounded-lg text-lg leading-none">{emoji}</button>
            ))}
          </div>
        </div>
      )}

      {/* ── Contenteditable editor ── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(editorRef.current?.innerHTML || '')}
        onBlur={() => { saveRange(); setShowEmojis(false) }}
        onKeyDown={handleKeyDown}
        onMouseUp={saveRange}
        onKeyUp={saveRange}
        onSelect={saveRange}
        data-placeholder={placeholder}
        className="rich-editor w-full font-sans text-warmDark bg-white/40 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-gold/15 transition-all leading-relaxed min-h-[80px]"
      />
    </div>
  )
}
