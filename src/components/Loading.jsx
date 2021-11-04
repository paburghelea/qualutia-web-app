import React from 'react'
import styles from '../styles/Loading.module.css'

export default function Loading() {

    const size = 32;
    const radius = 10;
    const perimeter = Math.PI * (2 * radius);
    const percent = Math.random() * 100;

    return (
        <div className={styles.wrapper}>
            <span>LOADING</span>
            {/* <span className={styles.dot} styles={{animationNmae: "spawnIn-1"}}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span> */}
            <span className={styles.circle}>

                <svg  viewBox={"0 0 32px 32px" } xmlns="http://www.w3.org/2000/svg" >
                    <g transform={"rotate(-90," + size/2 + ',' + size/2 + ")"}>
                        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--color-20)" strokeWidth="6" />
                        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeDasharray={String(perimeter*(percent / 100)) + ' ' + String(perimeter*((100 - percent) / 100))}  />
                    </g>
                </svg>
            </span>

        </div>
    )
}
