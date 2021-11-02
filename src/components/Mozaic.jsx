import React, { useState, useRef, useEffect } from 'react'
import sanityClient from '../client';
import imageUrlBuilder from "@sanity/image-url";

export default function Mozaic({ items }) {
    
    const containerRef = useRef();


    const[showLabel, setShowLabel] = useState(false)
    const[position, setPosition] = useState([])
    const[current, setCurrent] = useState("")
    const[dividers, setDividers] = useState(["Study"]);
    

    

    useEffect(() => {
        const temp_names = [];

        for(let i = 0; i < items.length; i++){

            if(!temp_names.includes(items[i].group)){
                temp_names.push(items[i].group)
            }

        }
        setDividers(temp_names)
    }, [])


    const wrapper = {
        width: "100%",
        position: "relative",
    };

    const container = {
        width: "100%",
        position: "relative",

    };



    return (

        <div style={wrapper}>

            <div style={container} ref={containerRef} onMouseMove={(event)=> setPosition([(event.clientX - containerRef.current.getBoundingClientRect().left), ( event.clientY - containerRef.current.getBoundingClientRect().top)])}>

                {/* {dividers.map((divider)=>{
                    return( */}
                        <Divider title={null}>
                            {items.map((item)=> {
                                // item.group != divider ? null : 
                                    return(<Item data={item} key={item.id} toggle={(event)=> setShowLabel(event)} lastLabel={(event)=> setCurrent(event)}/>)
                                })}
                        </Divider>
                    
                {/* })} */}
                

                <Label
                    title={current}
                    show={showLabel}
                    position={position}
                />
            
            </div>          

        </div>
    )
};

function Item({ toggle, lastLabel, data }) {

    const[isOver, setIsOver] = useState(false);


    const duration = Math.random() + 0.2
    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
        return builder.image(source);
      }

    const container = {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "2px",
        animation: "spawnIn",
        animationDuration: duration + "s",
        animationIterationCount: "1",
        animationFillMode: "forwards",
        animationTimingDuration: "ease-out",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        filter: "drop-shadow(0px 2px 2px var(--color-shadow))"
    };

    const wrapper = {
        position: "relative",
        cursor: "pointer",
        width: "100%",
        height: "100%",
        gridColumn: "span " + data.width,
        gridRow: "span " + data.height,
        transition: "0.2s",
    };

    const containerSpacing = {
        position: "relative",
        width: "100%",
        height: "100%",
        padding: isOver ? "2px" : "8px",
        transition: "0.2s",
    };

    const img = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        backgroundColor: "grey"
    };

    const svg = {
        width: "64px",
        height: "64px",
        fill: "var(--color-contrast-lowest)",
        transition: "0.2s"
    };

    return(
      
        <div style={wrapper} 
            onMouseEnter={()=> [setIsOver(true), toggle(true), lastLabel(data.title)]} 
            onMouseLeave={()=> [setIsOver(false), toggle(false)]} 
            
        >
            <div style={containerSpacing}>                

                <div style={container}>
                    <img style={img} src={urlFor(data?.image.asset._ref).url()}/>
                    {data.name}
                </div>
                {/* </Link> */}
            </div>
            
        </div>
     
    )
};

function Divider({ children, title }) {

    const container = {
        marginTop: "22px",
        marginBottom: "44px",
        width: "100%"
    };

    const content = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(48px, 80px))",
        gridAutoRows: "minmax(48px, 80px)",
        width: "100%",
        
    };

    const text = {
        marginLeft: "12px",
        marginBottom: "12px",
        color: "var(--color-contrast-high)",
        fontFamily: "var(--font-family-special)",
        fontSize: "var(--font-size-largest)",
    };

    
    return(
        <div style={container}>
            <div style={text}>
                {title}
            </div>
            <div style={content}>
                {children}
            </div>
        </div>
    );
};

export function Label({ show, position, title }){
    
    const info = {
        position: "absolute",
        left: position[0] + 16 + "px",
        top: position[1] + 16 + "px",
        fontSize: "var(--font-size-medium)",
        color: "var(--color-contrast-lowest)",
        padding: "4px",
        backgroundColor: "var(--color-contrast-high)",
        animation: "spawnIn 0.2s",
        borderRadius: "2px",
        zIndex: 99,
        pointerEvents: "none",
        transition: "0.1s"
    };
    
    
    return(
        show ? 
            <div style={info}>
                {title}
            </div>
        : null
    )
};

// function Button( { onClick, title, current, color } ){

//     const[isOver, setIsOver] = useState(false);

//     const container = {
//         height: "100%",
//         background: "none",
//         borderRadius: "2px",
//         color: isOver ? "var(--color-contrast-high)" :  current === title ? color : "var(--color-contrast-higher)",
//         marginLeft: "8px",
//         marginRight: "8px",
//         textTransform: "uppercase",
//         fontWeigth: "bold",
//         fontSize: "var(--font-size-larger)",
//         fontFamily: "var(--font-family-special)",
//         border: "none",
//         cursor: "pointer",
//         animation: "spawnIn 0.5s",
//         transition: "var(--transition-fast)"
//     };

//     return(
//         <button style={container} onClick={()=> onClick()} onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)}>
//             {title}
//         </button>
//     );
// };

// function Menu( { children } ){

//     // const[isOver, setIsOver] = useState(false);
//     // const[value, setValue] = useState("chronological");
    
//     const wrapper = {
//         position: "fixed",
//         width: "100%",
//         height: "55px",
//         left: "0px",
//         bottom: "0px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 99,
//         backgroundColor: "var(--color-contrast-lowest)"
//     };
    
//     return(
//         <div style={wrapper}>
//             {children}
//         </div>
//     );
// };