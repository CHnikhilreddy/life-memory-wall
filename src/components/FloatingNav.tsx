import { motion } from 'framer-motion'
import { Home, Plus, Compass, User } from 'lucide-react'

interface Props {
  onCreateClick: () => void
  onHomeClick: () => void
}

export default function FloatingNav({ onCreateClick, onHomeClick }: Props) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="glass rounded-full px-3 py-2 flex items-center gap-1 shadow-lg">
        <button
          onClick={onHomeClick}
          className="p-3 rounded-full hover:bg-white/40 transition-colors group"
        >
          <Home className="w-5 h-5 text-warmDark/50 group-hover:text-warmDark transition-colors" />
        </button>

        <button
          onClick={() => {}}
          className="p-3 rounded-full hover:bg-white/40 transition-colors group"
        >
          <Compass className="w-5 h-5 text-warmDark/50 group-hover:text-warmDark transition-colors" />
        </button>

        {/* Glowing create orb */}
        <motion.button
          onClick={onCreateClick}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="relative mx-2"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-coral flex items-center justify-center shadow-lg animate-glow">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/50 to-coral/50 blur-md -z-10" />
        </motion.button>

        <button
          onClick={onHomeClick}
          className="p-3 rounded-full hover:bg-white/40 transition-colors group"
        >
          <Compass className="w-5 h-5 text-warmDark/50 group-hover:text-warmDark transition-colors" />
        </button>

        <button
          onClick={() => {}}
          className="p-3 rounded-full hover:bg-white/40 transition-colors group"
        >
          <User className="w-5 h-5 text-warmDark/50 group-hover:text-warmDark transition-colors" />
        </button>
      </div>
    </motion.div>
  )
}
