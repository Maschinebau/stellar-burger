
export function ModalOverlay({ className, click, children }) {

  return (
    <div className={className} onClick={click}>
      {children}
    </div>
  )
}