import React, { useRef, useState, useEffect } from 'react'
import '../styles/wrapper.module.css'


export function Wrapper({ children, slider, getPosition, addStyles, showLocation }) {
    
    const wrapper = {
        position: "relative",
        width: "100%",
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        ...addStyles
    }
    
    const[isScrolling, setIsScrolling] = useState(false)

    const containerRef = useRef();

    const[position, setPosition] = useState(0);
  

    useEffect(() => {
        const position = Math.round(Math.abs((100 / (containerRef.current.scrollHeight - containerRef.current.clientHeight)) * containerRef.current.scrollTop))
  
        setPosition(position)
        getPosition(position)
        setIsScrolling(false)

    }, [isScrolling])

    
    return (
        <main className={wrapper} ref={containerRef} onScroll={()=> slider ? setIsScrolling(true) : null}>
            {children}
            {showLocation ? <Location percent={position} radius={30} size={80}/> : null}
        </main>
    )
}

export function Content({ children, addStyles }){


    const content = {
        paddingLeft: "var(--padding-general)",
        paddingRight: "var(--padding-general)",
        display: "flex",
        flexDirection: "column",
        ...addStyles
        // display: "grid"
    }

    
    return(
        <div style={content}>
            {children}
        </div>
    )
}

export function Location({ percent, radius, size }){


    const wrapper = {
        
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        right: "64px",
        bottom: "64px",
        pointerEvents: "none",
        zIndex: 100
    };

    const perimeter = Math.PI * (2 * radius);


    return(
        <div style={wrapper}>
            <div style={{position: "absolute", color: "var(--color-accent)", fontWeight: "bold"}}>
                {percent}
            </div>
            <svg viewBox={"0 0 " + size + ' ' + size } xmlns="http://www.w3.org/2000/svg" >
                <g transform={"rotate(-90," + size/2 + ',' + size/2 + ")"}>
                    <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--color-20)" strokeWidth="6" />
                    <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeDasharray={String(perimeter*(percent / 100)) + ' ' + String(perimeter*((100 - percent) / 100))}  />
                </g>
            </svg>
        </div>
    )
}