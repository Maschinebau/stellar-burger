import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from './modal-portal.module.css'

// export const modalPortal = ({ children, close }) => {
//   const elementRef = useRef(null) 
//   if (!elementRef.current) {
//     elementRef.current = document.createElement("div")
//   }

//   useEffect(() => {
//     const portalRoot = document.getElementById("portal")
//     portalRoot.appendChild(elementRef.current)

//     return () => {
//       portalRoot.removeChild(elementRef.current)
//     }
//   }, [])

//   return createPortal(
//     <div className={styles.overlay} onClick={() => {close((showModal) => !showModal)}}>
//       <div className={styles.portal} onClick={(e) => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>,
//     elementRef.current
//   )
// }

export function ModalPortal({ children, onOverlay }) {
  const [isActive, setIsActive] = useState(false)

  return createPortal(
    <div className={`${styles.overlay} ${isActive ? styles.active : ''}`} onClick={onOverlay}>
      {children}
    </div>,
    document.body
  )
}