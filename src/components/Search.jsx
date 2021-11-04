import React from "react";
import styles from '../styles/Search.module.css'

export default function Search({ onChange }) {

    return(

        <div className={styles.container}>
            <svg className={styles.icon} viewBox="0 0 64 64">
                <path d="M46.23,24.14l-6.36-6.35a5,5,0,0,0-3.55-1.47,5,5,0,0,0-3.56,1.47l-6.34,6.34A5,5,0,0,0,25,27.69a5,5,0,0,0,1.45,3.54l1.24,1.24-1.43,1.44H26a2.68,2.68,0,0,0-1.91.78l-6.94,6.93a2.75,2.75,0,0,0,0,3.87l1.4,1.41a2.77,2.77,0,0,0,1.94.79,2.71,2.71,0,0,0,1.93-.79L29.32,40a2.75,2.75,0,0,0,.78-2.18l1.43-1.44,1.23,1.24a5.09,5.09,0,0,0,3.55,1.46,5,5,0,0,0,3.55-1.45l6.36-6.36a5,5,0,0,0,1.46-3.55A5.09,5.09,0,0,0,46.23,24.14Zm-2.75,4.35-6.36,6.35a1.17,1.17,0,0,1-1.61,0l-6.34-6.35a1.12,1.12,0,0,1-.33-.81,1.08,1.08,0,0,1,.33-.8l6.34-6.34a1.15,1.15,0,0,1,.81-.35,1.11,1.11,0,0,1,.8.34l6.36,6.35a1.16,1.16,0,0,1,.33.8A1.2,1.2,0,0,1,43.48,28.49Z"/>
            </svg>
            <input className={styles.field} autoCapitalize="false" autoComplete="false" autoCorrect="false" onChange={(event)=> onChange(event.target.value)} placeholder="Search..."/>
        </div>
    )
    
}
