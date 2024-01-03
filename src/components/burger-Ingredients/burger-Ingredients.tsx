import { FC, useState, useEffect, memo, useCallback, useRef } from "react"
import styles from "./burger-Ingredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngredientGroup } from "./ingredient-group/ingredient-group"
import { TIngredient } from "../../utils/types"
import { useAppSelector } from "../hooks/useAppSelector"

type TabType = "bun" | "sauce" | "main"

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState<TabType>("bun")
  const ingredients = useAppSelector((state) => state.ingredients.ingredients)
  const buns = ingredients.filter((item) => item.type === "bun") as TIngredient[]
  const sauces = ingredients.filter((item) => item.type === "sauce") as TIngredient[]
  const mains = ingredients.filter((item) => item.type === "main") as TIngredient[]

  const ingredientsContainerRef = useRef<HTMLDivElement>(null)
  const bunsGroupRef = useRef<HTMLDivElement | null>(null)
  const saucesGroupRef = useRef<HTMLDivElement | null>(null)
  const mainsGroupRef = useRef<HTMLDivElement | null>(null)

  const handleTabClick = useCallback((value: TabType) => {
    setCurrentTab(value)
    const element = document.getElementById(value)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleScroll = useCallback(() => {
    const container = ingredientsContainerRef.current
    if (container) {
      const scrollPosition = container.scrollTop
      const bunGroupHeight = bunsGroupRef.current?.offsetHeight || 0
      const sauceGroupHeight = saucesGroupRef.current?.offsetHeight || 0

      if (scrollPosition < bunGroupHeight) {
        setCurrentTab("bun")
      } else if (scrollPosition < bunGroupHeight + sauceGroupHeight) {
        setCurrentTab("sauce")
      } else {
        setCurrentTab("main")
      }
    }
  }, [])

  useEffect(() => {
    const container = ingredientsContainerRef.current

    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [handleScroll])

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={currentTab === "bun"} onClick={() => handleTabClick("bun")}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === "sauce"} onClick={() => handleTabClick("sauce")}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === "main"} onClick={() => handleTabClick("main")}>
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
