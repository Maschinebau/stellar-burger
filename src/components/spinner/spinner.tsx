import styles from "./spinner.module.css"

type TSpinner = {
  extraClass?: string
}

export const Spinner = ({ extraClass }: TSpinner) => {
  return (
    <div className={extraClass}>
      <span className={styles.spinner}></span>
    </div>
  )
}
