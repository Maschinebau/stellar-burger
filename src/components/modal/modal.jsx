import { useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
// import { ModalOverlay } from "./modal-overlay/modal-overlay"
import PropTypes from "prop-types"
import styles from "./modal.module.css"

export function Modal({ children, onClose }) {
  const modalOverlayRef = useRef(null)

  const handleKeyPress = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  const handleClick = useCallback(
    (evt) => {
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
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById("modals")
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}
