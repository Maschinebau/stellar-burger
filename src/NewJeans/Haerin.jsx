import {useState, useEffect} from 'react'
import styles from "./haerin.module.css"
import {StageName} from './StageName'

export function Haerin () {
  const [userId, setUserId] = useState(1);
  return (
    <>
    <img className={styles.image} src='https://i.ibb.co/XJCfkPY/Haerin-Super-Shy-Concept-Photo-1.webp'/>
    <StageName userId={userId}/>
    <button onClick={ () => {
      setUserId(userId + 1)
    }}>increment id</button>
    </>
  )
 }