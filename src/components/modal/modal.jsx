import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'

export function Modal({ children, onClose }) {

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleClick = (event) => {
    if (
      event.target.classList.contains(`${styles.overlay}`) ||
      event.target.closest(`.${styles.cross}`)
    ) {
      onClose();
    }
  };

  return createPortal(
    <div className={`${styles.overlay}`} onClick={handleClick}>
      <div className={styles.wrapper}>
        {children}
        <button className={styles.cross}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modals')
  )
}