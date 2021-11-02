import React, { useState, useContext } from 'react';
import sanityClient from '../client';
import styles from '../styles/skills.module.css'
import imageUrlBuilder from "@sanity/image-url";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source);
  }

export default function Skills( { user } ){

    const items = user ? user.skills : []
    
    const[current, setCurrent] = useState(0);
    const options = clearList(items);

    const[isOver, setIsOver] = useState(false);


  

    function clearList(array){
        const mergedArray = [];

        for(let i = 0; i < array.length; i++){
            mergedArray.push(array[i].type);
        }

        return [...new Set(mergedArray)]
    };

    function handleClick(){
        if(options.length > 0){

            if(options.length - 1 == current){
                setCurrent(0)
            }

            else{
                setCurrent(current + 1)
            }

        }
    };

    //#region STYLES
    const wrapper = {
        width: "100%",
        padding:"20px",
        backgroundColor: "var(--color-contrast-lower)",
        borderRadius: "8px",
        // border: "1px solid var(--color-contrast-low)"
    };

    const container  = {
        position: "relative",
        width: "100%",
        height: "44px",
        display: "flex",
        alignItems: "center",
        flexWrap: "no-wrap",
        backgroundColor: isOver ? "var(--color-accent)" : "var(--color-50)",
        borderRadius: "2px",
        marginBottom: "22px",
        cursor: "pointer",
        pointerEvents: "all"
    };

    const content = {
        width: "100%",
        display: "inline-grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fill, 92px)",
        gridAutoRows: "92px",
        gridGap: "12px",
        borderRadius: "8px",
        padding: "8px",

        // backgroundColor: "var(--color-contrast-lower)",

    };

    const text = {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-family-special)",
        textTransform: "uppercase",
        fontSize: "var(--font-size-medium)",
        fontWeigth: "bold",
        color: "var(--color-contrast-lowest)",
    };


    const spacing = {
        position: "absolute",
        left: `calc(${ current == 0 ?  "0px" : "100% / " + options.length * current} )`,
        top: "0px",
        width: `calc(100% / ${options.length})`,
        height: "100%",
        padding: "4px",
        transition: "0.5s"
    }

    const overlay = {
        height: "100%",
        width: "100%",
        backgroundColor: "var(--color-contrast-lower)",
        borderRadius: "2px"
    };
    //#endregion



    
    function Item({data}){
        
        const[isOver, setIsOver] = useState(false);

        const icon = {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        };

        const title = {
            height: "24px",
            fontSize: "10px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeigth: "bold",
            color: "var(--color-contrast-high)",
            fontFamily: "var(--font-family-special)",
            marginBottom: "2px"
        };


        //#endregion 

        return(
            <div className={styles.item_container} styles={{opacity: isOver ? "0.8" : "1.0"}} onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)}>
                <div style={icon}>
                    <img style={{maxWidth: "48px", maxHeight: "48px", marginTop: "6px", fill: "var(--color-contrast-high)"}} src={urlFor(data?.icon).url()}/>
                </div>
                <div style={title}>
                    {data.name}
                </div>
            </div>
        )
    };


    return(

        <div className={styles.main_wrapper}>

            <div style={container} onClick={()=> handleClick()} onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)}>

                <div style={text}>
                    Computation
                </div>

                <div style={text}>
                    Design
                </div>
                        

                <div style={spacing}>
                    <div style={overlay}/>
                </div>
            </div>

            <div style={content}>
                {
                    items.map((item)=> {
                        if(item.type == options[current]){
                            return(
                                <Item 
                                    data={item}
                                />
                            )
                        }
                    })
                }
            </div>

        </div>

    )
};