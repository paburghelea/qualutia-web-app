import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/navbar.module.css'
import useStore from '../store';

export default function Navbar({ onLanguageChange, children}) {


    


    //#region 
    const[isDark, setIsDark] = useState(false);
    
    const position = useStore((state)=> state.position)
    const setMode = useStore((state)=> state.setMode)

    const enableDarkMode = () => {
        document.body.classList.add("darkmode");
        localStorage.setItem("darkMode", 'enabled');
        setMode("night");
        setIsDark(true);
    };
    
    const disableDarkMode = () => {
        document.body.classList.remove("darkmode");
        localStorage.setItem("darkMode", null);
        setMode("day");
        setIsDark(false);
    };

    const changeMode = () => {
    if(!isDark) {
        enableDarkMode();
    }
    else {
        disableDarkMode();
    }   
    };
    
    useEffect(() => {
        let darkMode = localStorage.getItem("darkMode")
    
        if (darkMode === 'enabled') {
            enableDarkMode();
        }
    }, [isDark]);


    const presets = {
        height: "100%",
        display: "flex",
        alignItems: "center",
        marginRight: "0px",
        marginLeft: "auto",
    };

    const svg = {
        fill: "var(--color-contrast-high)",
        height: "22px"
    };

//#endregion

    return(
        <nav className={styles.navbar} style={{position: "fixed"}}>
            <div style={{width: "100%", height: "4px", backgroundColor: "var(--color-accent)"}}/>
            <div style={{width: `calc(100% / 100 * ${position}`, height: "8px", backgroundColor: "var(--color-accent)"}}/>

            <div style={{ height: "var(--height-navbar)", display: "flex", alignItems: "center", padding: "0 var(--padding-navbar) 0 var(--padding-navbar)" }}>
                <div href="/" style={{display: "flex", height: "100%", alignItems: "center", justifyContent: "center"}}>
                    <svg style={svg} viewBox="0 0 512 64"><path d="M512,16.3V53.67A10.52,10.52,0,0,1,501.47,64.2V40.73a13.74,13.74,0,0,1-5.26,1H482.35v-7h13.86a7,7,0,0,0,5.26-2.39v-16A5.25,5.25,0,0,0,496.21,11H468.49a5.25,5.25,0,0,0-5.26,5.26V64.2A10.52,10.52,0,0,1,452.7,53.67V16.3A15.79,15.79,0,0,1,468.49.51h27.72A15.79,15.79,0,0,1,512,16.3Z"/><path d="M334.83.82h10.53v47.9a15.81,15.81,0,0,1-15.79,15.79H301.85a15.81,15.81,0,0,1-15.8-15.79V.82h10.53v47.9A5.27,5.27,0,0,0,301.85,54h27.72a5.27,5.27,0,0,0,5.26-5.26Z"/><path d="M127.86.82h10.53v47.9A15.8,15.8,0,0,1,122.6,64.51H94.88A15.8,15.8,0,0,1,79.09,48.72V.82H89.62v47.9A5.27,5.27,0,0,0,94.88,54H122.6a5.27,5.27,0,0,0,5.26-5.26Z"/><path d="M15.79,53.67h54A10.52,10.52,0,0,1,59.3,64.2H15.79A15.79,15.79,0,0,1,0,48.41V16.3A15.79,15.79,0,0,1,15.79.51H43.51A15.79,15.79,0,0,1,59.3,16.3V43.15H48.78V16.3A5.26,5.26,0,0,0,43.51,11H15.79a5.25,5.25,0,0,0-5.26,5.26V48.41A5.25,5.25,0,0,0,15.79,53.67Z"/><path d="M242.4,54H274a10.53,10.53,0,0,1-10.53,10.53H242.4a15.79,15.79,0,0,1-15.79-15.79V.82h10.53v47.9A5.25,5.25,0,0,0,242.4,54Z"/><path d="M356.66.82H416V11.35H391.12V54a10.52,10.52,0,0,1-10.53,10.53V11.35H356.66Z"/><path d="M428.56.51h10.53V53.67A10.52,10.52,0,0,1,428.56,64.2Z"/><path d="M211.38,16.3V54a10.52,10.52,0,0,1-10.52,10.53V41a14,14,0,0,1-5.27,1H181.73V35h13.86a7,7,0,0,0,5.27-2.39V16.36a5.3,5.3,0,0,0-5.28-5.29H167.87a5.28,5.28,0,0,0-5.26,5.27V64.51A10.53,10.53,0,0,1,152.08,54V16.36A15.89,15.89,0,0,1,167.93.51h27.66A15.78,15.78,0,0,1,211.38,16.3Z"/></svg>
                </div>

                
                <div style={presets}>
                    

                    {children}

                    <Button  onClick={()=> changeMode()} icon={isDark ? "light" : "dark"} text={isDark ? "light" : "dark"}/>

                    {/* <Language
                        onChange={(event)=> null}
                    /> */}


                    {/* <Button onClick={()=> null} to="/contact" icon="contact" text="about"/> */}
                    

                </div>
                
            </div>
            <div className={styles.background}/>            
        </nav>
    );
}



function Language({ onChange }) {


    
    const[isOver, setIsOver] = useState(false);
    const[isOpen, setIsOpen] = useState(false);
    // const[language, setLanguage] = useState(localStorage.getItem("storeLanguage"));
    const[language, setLanguage] = useState("romanian")
    const[languages, setLanguages] = useState(["english(uk)", "italian", "romanian"]);
    




    
    useEffect(() => {

        let temp_languages = languages;

        const new_languages = [language, ...temp_languages.filter((item)=>  item !== language)]

        setLanguages(new_languages)

        localStorage.setItem("storeLanguage", language);
        onChange(language)
        
    
    }, [language]);



    function Selection({ children, onClick }) {

        const[isOver, setIsOver] = useState(false);

        const button = {
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "20px",
            backgroundColor: isOver ? "var(--color-contrast-lowest)" : "var(--color-contrast-high)",
            cursor: "pointer",
            border: "none",
            color: isOver ? "var(--color-contrast-high)" : "var(--color-contrast-lowest)",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "8px"
        }

        return(
            <button style={button} onClick={()=> onClick()}  onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)} >{ children }</button>
        )
    }



    const button = {
        position: "relative",
        height: "23px",
        width: "23px",
        marginLeft: "10px",
        marginRight: "0px",
        background: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.2s",
        border: "none"

    };

    const slider = {
        position: "absolute",
        width: "100%",
        height: isOpen ? "79px" : "23px",
        top: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        transition: "0.4s",
        overflow: "hidden",
        backgroundColor: "var(--color-contrast-high)",
        borderRadius: "6px",
        border: "2px solid var(--color-contrast-high)"

    };

   

    return(
        <button style={button} onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)} onClick={()=> setIsOpen(!isOpen)}>
            <div style={slider}>
                {languages.map((item, key)=>{
                    return(
                        <Selection key={key} onClick={()=> setLanguage(item)}>
                            {item.slice(0, 2)}
                        </Selection>
                    )
                })}
            </div>
        </button>
    )
};



export function NavbarItem({ name, href, children, onClick, ref }){

    const[isActive, setIsActive]= useState(false)

    const[isOver, setIsOver]= useState(false)


    const container = {
        padding: "0px 16px 0px 16px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-contrast-high)"
    }

    const content = {
        fill: isOver ? "var(--color-accent)" : "var(--color-contrast-high)",
        height: "32px",
        minWidth: "32px",
        transition: "0.2s",
    };


    // React.useEffect(() => {

    //     let options = {
    //         root: ref,
    //         rootMargin: '0px',
    //         threshold: 1.0
    //       }

    //     let observer = new IntersectionObserver(callback, options);

    //     function callback(){
    //         console.log(observer)

    //     }
    
    //   }, []);


    return(
        <Link href={href} style={container}  onMouseOver={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)}>
            <div style={content}>
                {children}
            </div>    
        </Link>
    )
};

export function Button({ onClick, icon, text, to }){

    const[isOver, setIsOver]=useState(false);
    
    //#region 
    const button = {
        height: "54px",
        width: "54px",
        border: "none",
        background: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const svg = {
        fill: isOver ? "var(--color-accent)" : "var(--color-contrast-high)",
        height: "32px",
        width: "32px",
        transition: "0.2s",
    };

    const label = {
        fontFamily: "var(--font-family-special)",
        fontSize: "var(--font-size-medium)",
        textTransform: "uppercase",
        height: "12px",
        color: isOver ? "var(--color-accent)" : "var(--color-contrast-high)",
        transition: "0.2s",
    };

    const wrapper = {
        height: "100%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "12px"
    };
    //#endregion


    function returnIcon(key){
        switch (key) {
            case "blog":
                return(<svg style={svg} viewBox="0 0 64 64"><path d="M46.92,27.26h1.66a2,2,0,0,1,2,2v5.49a2,2,0,0,1-2,2H46.92a0,0,0,0,1,0,0V27.26A0,0,0,0,1,46.92,27.26Z"/><path d="M40.25,14.76a5.91,5.91,0,0,0-3,.87L25,23a7.68,7.68,0,0,0-2.32,2.26H19.46a1.78,1.78,0,0,0-1.78,1.78V37a1.78,1.78,0,0,0,1.78,1.78H22.7A7.68,7.68,0,0,0,25,41l12.23,7.38a5.91,5.91,0,0,0,3,.87,5.35,5.35,0,0,0,5.27-5.53V20.29A5.35,5.35,0,0,0,40.25,14.76Zm.83,29c0,.68-.34,1.08-.83,1.08a1.32,1.32,0,0,1-.69-.22L27.32,37.18a3.47,3.47,0,0,1-1.52-2.69v-5a3.47,3.47,0,0,1,1.52-2.69l12.24-7.39a1.32,1.32,0,0,1,.69-.22c.49,0,.83.4.83,1.08Z"/></svg>)
        
            case "back":
                return(<svg style={svg} viewBox="0 0 64 64"><title>back</title><path d="M48,23.93V40.07A7.94,7.94,0,0,1,40.07,48H23.93a7.86,7.86,0,0,1-4.11-1.15,8.06,8.06,0,0,1-1.49-1.18A7.86,7.86,0,0,1,16,40.07V32h4.38v8.07a3.68,3.68,0,0,0,.32,1.49h0a3.16,3.16,0,0,0,.55.83,2.73,2.73,0,0,0,.34.34,3.16,3.16,0,0,0,.83.55h0a3.68,3.68,0,0,0,1.49.32H40.07a3.55,3.55,0,0,0,3.55-3.55V23.93a3.68,3.68,0,0,0-.32-1.49h0a3.16,3.16,0,0,0-.55-.83,2.73,2.73,0,0,0-.34-.34,3.16,3.16,0,0,0-.83-.55h0a3.68,3.68,0,0,0-1.49-.32H33.4l3.52,3.52-2.84,2.83-8.55-8.55,8.55-8.53,2.84,2.83L33.4,16h6.67a7.86,7.86,0,0,1,4.11,1.15,8.06,8.06,0,0,1,1.49,1.18A7.88,7.88,0,0,1,48,23.93Z"/></svg>)
                
            case "dark":
                return(<svg style={svg} viewBox="0 0 64 64"><path d="M40.07,16H23.93A7.94,7.94,0,0,0,16,23.93V40.07A7.94,7.94,0,0,0,23.93,48H40.07A7.94,7.94,0,0,0,48,40.07V23.93A7.94,7.94,0,0,0,40.07,16Zm3.55,24.07a3.55,3.55,0,0,1-3.55,3.55H23.93a3.58,3.58,0,0,1-3.23-2.06L41.56,20.7a3.58,3.58,0,0,1,2.06,3.23Z"/></svg>)
            
            case "light":
                return(<svg style={svg} viewBox="0 0 64 64"><path d="M40.07,16H23.93A7.94,7.94,0,0,0,16,23.93V40.07A7.94,7.94,0,0,0,23.93,48H40.07A7.94,7.94,0,0,0,48,40.07V23.93A7.94,7.94,0,0,0,40.07,16ZM20.36,23.93a3.57,3.57,0,0,1,3.57-3.57H35.71L20.36,35.71Z"/></svg>)

            case "contact":
                return(<svg style={svg} viewBox="0 0 64 64"><path d="M48,29.47v10.4A8.13,8.13,0,0,1,39.87,48H24.13A8.13,8.13,0,0,1,16,39.87V29.42a.2.2,0,0,1,.31-.17l11.3,7.52a8.47,8.47,0,0,0,8.86,0L47.69,29.3A.2.2,0,0,1,48,29.47Z"/><path d="M48,24.13v.05a.2.2,0,0,1-.09.17L34.26,33.46a4.56,4.56,0,0,1-4.44,0L16.09,24.3a.2.2,0,0,1-.09-.17h0A8.13,8.13,0,0,1,24.13,16H39.87A8.13,8.13,0,0,1,48,24.13Z"/></svg>)

            case "search":
                return(<svg style={svg} viewBox="0 0 64 64"><path d="M46.23,24.14l-6.36-6.35a5,5,0,0,0-3.55-1.47,5,5,0,0,0-3.56,1.47l-6.34,6.34A5,5,0,0,0,25,27.69a5,5,0,0,0,1.45,3.54l1.24,1.24-1.43,1.44H26a2.68,2.68,0,0,0-1.91.78l-6.94,6.93a2.75,2.75,0,0,0,0,3.87l1.4,1.41a2.77,2.77,0,0,0,1.94.79,2.71,2.71,0,0,0,1.93-.79L29.32,40a2.75,2.75,0,0,0,.78-2.18l1.43-1.44,1.23,1.24a5.09,5.09,0,0,0,3.55,1.46,5,5,0,0,0,3.55-1.45l6.36-6.36a5,5,0,0,0,1.46-3.55A5.09,5.09,0,0,0,46.23,24.14Zm-2.75,4.35-6.36,6.35a1.17,1.17,0,0,1-1.61,0l-6.34-6.35a1.12,1.12,0,0,1-.33-.81,1.08,1.08,0,0,1,.33-.8l6.34-6.34a1.15,1.15,0,0,1,.81-.35,1.11,1.11,0,0,1,.8.34l6.36,6.35a1.16,1.16,0,0,1,.33.8A1.2,1.2,0,0,1,43.48,28.49Z"/></svg>)

            case "close":
                return(<svg style={svg} viewBox="0 0 128 128"><path d="M64,18.14A45.86,45.86,0,1,0,109.86,64,45.86,45.86,0,0,0,64,18.14ZM35.44,72.25V55.76H92.56V72.24Z"/></svg>)

            default:
                break;
        };
    };


    return(
        <div to={to} style={wrapper} onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)} onClick={()=> onClick()}>
            <div style={button} >
                {returnIcon(icon)}
            </div>
            {/* <div style={label}>
                {text}
            </div> */}
        </div>
    )
};