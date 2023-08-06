import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from './modal-portal.module.css'

export function ModalPortal({ children, onOverlay }) {

  return createPortal(
    <div className={`${styles.overlay}`} onClick={onOverlay}>
      {children}
    </div>,
    document.body
  )
}