type TModalOverlayProps = {
  className: string
  click: () => void
  children: React.ReactNode
}

export function ModalOverlay({ className, click, children }: TModalOverlayProps) {
  return (
    <div className={className} onClick={click}>
      {children}
    </div>
  )
}
