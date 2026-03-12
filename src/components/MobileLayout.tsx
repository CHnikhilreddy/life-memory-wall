import { usePlatform } from '../hooks/usePlatform'

interface MobileLayoutProps {
  children: React.ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const { isNative } = usePlatform()
  if (!isNative) return <>{children}</>
  return (
    <div className="safe-top safe-bottom overscroll-none" style={{ height: '100%' }}>
      {children}
    </div>
  )
}
