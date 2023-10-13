import { useState, useEffect, memo, useCallback, useRef } from "react"
import styles from "./burger-Ingredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngredientGroup } from "./ingredient-group/ingredient-group"
import { useSelector } from "react-redux"

export function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState("bun")
  const ingredients = useSelector((state) => state.ingredients.ingredients)
  const buns = ingredients.filter((item) => item.type === "bun")
  const sauces = ingredients.filter((item) => item.type === "sauce")
  const mains = ingredients.filter((item) => item.type === "main")

  const ingredientsContainerRef = useRef()
  const bunsGroupRef = useRef()
  const saucesGroupRef = useRef()
  const mainsGroupRef = useRef()

  const handleTabClick = useCallback((value) => {
    setCurrentTab(value)
    document.getElementById(value).scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleScroll = useCallback(() => {
    const container = ingredientsContainerRef.current
    const scrollPosition = container.scrollTop
    const bunGroupHeight = bunsGroupRef.current.offsetHeight
    const sauceGroupHeight = saucesGroupRef.current.offsetHeight

    if (scrollPosition < bunGroupHeight) {
      setCurrentTab("bun")
    } else if (scrollPosition < bunGroupHeight + sauceGroupHeight) {
      setCurrentTab("sauce")
    } else {
      setCurrentTab("main")
    }
  }, [])

  useEffect(() => {
    ingredientsContainerRef.current.addEventListener("scroll", handleScroll)
    return () => {
      ingredientsContainerRef.current.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={currentTab === "bun"} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === "sauce"} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === "main"} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredientsContainer} custom-scroll mt-10`} ref={ingredientsContainerRef}>
        <IngredientGroup id="bun" title="Булка" listItems={buns} ref={bunsGroupRef} />
        <IngredientGroup id="sauce" title="Соусы" listItems={sauces} ref={saucesGroupRef} />
        <IngredientGroup id="main" title="Начинки" listItems={mains} ref={mainsGroupRef} />
      </div>
    </section>
  )
}

export default memo(BurgerIngredients)

