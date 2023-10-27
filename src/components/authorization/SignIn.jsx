import styles from "./authorization.module.css"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link } from "react-router-dom"
export const SignIn = () => {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2 className="text text_type_main-large">Вход</h2>
        <Input type="email" icon="undefined" placeholder="E-mail"></Input>
        <Input type="password" icon="EditIcon" placeholder="Пароль"></Input>
        <Button
          htmlType="button"
          type="primary"
          size="undefined"
          extraClass={`${styles.button} text text_type_main-default`}
          // onClick={handleOrderCreate}
          // disabled={allOrderedIngredients.length > 0 ? false : true}
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pt-20">
        Вы - новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to='/forgot-password'className={styles.link}>Восстановить пароль</Link>
      </p>
    </div>
  )
}
