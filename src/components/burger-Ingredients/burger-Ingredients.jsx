import { useState, useEffect } from 'react'
import styles from './burger-Ingredients.module.css'
import { Tab, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngridientGroup } from './ingridient-group/ingridient-group'
import { data } from '../../utils/data'

export function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState('bun')
  
  const handleTabClick = (value) => {
    setCurrentTab(value)
    document.getElementById(value).scrollIntoView({ behavior: "smooth"})
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
      <div className={`${styles.ingridientsContainer} custom-scroll mt-10`}>
        <IngridientGroup id='bun' title='Булка' ingridients={data.filter((item) => item.type === 'bun')} />
        <IngridientGroup id='sauce' title='Соусы' ingridients={data.filter((item) => item.type === 'sauce')} />
        <IngridientGroup id='main' title='Начинки' ingridients={data.filter((item) => item.type === 'main')} />
      </div>
    </section>
  )
}