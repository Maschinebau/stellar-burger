import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {ModalOverlay} from './modal-overlay/modal-overlay'
import PropTypes from "prop-types"
import styles from './modal.module.css'

export function Modal({ children, onClose }) {

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleClick = (event) => {
    if (
      event.target.classList.contains(`${styles.overlay}`)
    ) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay className={styles.overlay} click={handleClick}>
      <div className={styles.wrapper}>
        {children}
        <button className={styles.cross} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </ModalOverlay>,
    document.getElementById('modals')
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
}