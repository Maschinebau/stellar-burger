import styles from "./app.module.css";
import { data } from "../../utils/data";
import {AppHeader} from '../app-header/app-header'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-Ingredients/burger-Ingredients'

import {Haerin} from '../../NewJeans/Haerin';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      
    </div>
  );
}

export default App;
