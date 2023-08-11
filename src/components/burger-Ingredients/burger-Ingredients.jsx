import { useState, useEffect, memo } from 'react'
import styles from './burger-Ingredients.module.css'
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngredientGroup } from './ingredient-group/ingredient-group'
import { apiUrl } from '../../utils/constants'

export function BurgerIngredients({ingredients}) {
  const [currentTab, setCurrentTab] = useState('bun')
  const buns = ingredients.filter((item) => item.type === 'bun')
  const sauces = ingredients.filter((item) => item.type === 'sauce')
  const mains = ingredients.filter((item) => item.type === 'main')

  const handleTabClick = (value) => {
    setCurrentTab(value)
    document.getElementById(value).scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
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
        <IngredientGroup id='bun' title='Булка' listItems={buns} />
        <IngredientGroup id='sauce' title='Соусы' listItems={sauces} />
        <IngredientGroup id='main' title='Начинки' listItems={mains} />
      </div>
    </section>
  )
}

export default memo(BurgerIngredients)