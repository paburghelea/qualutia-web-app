import React, { useState } from 'react'
import styles from '../styles/menu.module.css';

export function Menu({ children }) {
    return (
        <ul className={styles.menu}>
            {children}
        </ul>
    )
}

export function MenuItem({ name, href }){

    const[isOver, setIsOver] = useState(false)

    const item = {
        color: isOver ? "rgb(240,240,240)" : "var(--color-80)",
        backgroundColor: isOver ? "var(--color-accent)" : "",
        width: "auto",
        padding: "0px 8px 0px 8px",
        position: "relative",
        height: "32px",

    }

    return(
        <a className={styles.item}  href={href} onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)} >
            {name}
        </a>
    )
}