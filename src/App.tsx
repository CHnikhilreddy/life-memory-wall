import { motion } from 'framer-motion'
import { useStore } from './store/useStore'
import LoginPage from './components/LoginPage'
import SpaceSelector from './components/SpaceSelector'
import Timeline from './components/Timeline'

export default function App() {
  const { isLoggedIn, activeSpaceId } = useStore()

  if (!isLoggedIn) {
    return <LoginPage />
  }

  if (activeSpaceId) {
    return (
      <motion.div
        key={`space-${activeSpaceId}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
      >
        <Timeline />
      </motion.div>
    )
  }

  return (
    <motion.div
      key="selector"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
    >
      <SpaceSelector />
    </motion.div>
  )
}
