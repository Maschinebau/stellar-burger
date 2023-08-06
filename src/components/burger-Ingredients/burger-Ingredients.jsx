import { useState, useEffect, memo } from 'react'
import styles from './burger-Ingredients.module.css'
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngridientGroup } from './ingridient-group/ingridient-group'
import { apiUrl } from '../../utils/constants'

export function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState('bun')
  const [ingredients, setIngredients] = useState([])
  const buns = ingredients.filter((item) => item.type === 'bun')
  const sauces = ingredients.filter((item) => item.type === 'sauce')
  const mains = ingredients.filter((item) => item.type === 'main')

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const response = await fetch(apiUrl)
      const array = await response.json()
      setIngredients(array.data)
    } catch (error) {
      console.error('Ошибка при получении ингредиентов:', error)
    }
  }

  const handleTabClick = (value) => {
    setCurrentTab(value)
    document.getElementById(value).scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredientsContainer} custom-scroll mt-10`}>
        <IngridientGroup id='bun' title='Булка' listItems={buns} />
        <IngridientGroup id='sauce' title='Соусы' listItems={sauces} />
        <IngridientGroup id='main' title='Начинки' listItems={mains} />
      </div>
    </section>
  )
}

export default memo(BurgerIngredients)