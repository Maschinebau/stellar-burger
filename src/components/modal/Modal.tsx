import { useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./modal.module.css"

type TModal = {
  children: React.ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: TModal) {
  const modalOverlayRef = useRef<HTMLDivElement | null>(null)

  const handleKeyPress = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  const handleClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (evt.target === modalOverlayRef.current) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  return createPortal(
    <div className={styles.overlay} onClick={handleClick} ref={modalOverlayRef}>
      <div className={styles.wrapper}>
        {children}
        <button className={styles.cross} onClick={onClose}>
          <CloseIcon type='primary'/>
        </button>
      </div>
    </div>,
    document.getElementById("modals") as Element
  )
}