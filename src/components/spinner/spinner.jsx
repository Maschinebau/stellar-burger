import styles from "./spinner.module.css"

export const Spinner = ({ extraClass }) => {
  return (
    <div className={extraClass}>
      <span className={styles.spinner}></span>
    </div>
  )
}
