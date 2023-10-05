import styles from "./app.module.css";
import { AppHeader } from '../app-header/app-header'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-Ingredients/burger-Ingredients'
import { useEffect, useState } from "react"
import { apiUrl } from '../../utils/constants'
import { ConstructorContext } from '../../services/ConstructorContext.js'

function App() {

  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Server response was not ok')
      }
      const array = await response.json()
      setIngredients(array.data)
    } catch (error) {
      console.error('Ошибка при получении ингредиентов:', error)
    }
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <ConstructorContext.Provider value={{}}>
        <main className={styles.main}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      </ConstructorContext.Provider>
    </div>
  );
}

export default App;
