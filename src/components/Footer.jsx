import React, {useState} from 'react';

export default function Footer() {

    const container = {
        position: "relative",
        gridArea: "footer",
        // borderTop: "1px solid #eaeaea",
        marginTop: "64px",
        width: "100%",
        height: "var(--height-footer)",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        bottom: "0",
        justifyContent: "space-between",
        display: "flex",
        padding: "16px var(--padding-general) 16px var(--padding-general)",
        pointerEvents: "all"
    };

    const divider = {
        height: "60px",
        display: "flex",
        alignItems: "center",
        color: "var(--color-contrast-low)", 
        fontSize: "var(--font-size-medium)"
    };

    return (
        <footer style={container}>
            <div style={divider}>
                <Reference href="/" height="24px">
                    Qualutia &copy; {new Date().getFullYear()}
                </Reference>
                <Reference text="Privacy Policy" href="/privacy" height="24px" border={false}/>
                <Reference text="Terms of Use" href="/terms" height="24px" border={false}/>
            </div>
            <div style={divider}>
                <Link href="https://www.github.com/qualutia" icon="github" padding="3px" margin="6px" text=""/>
                <Link href="https://www.instagram.com/qualutia" icon="instagram" padding="3px" margin="6px" text=""/>
                <Link href="https://www.youtube.com/channel/UCwjmjH2PW4cSolP1Fu993Sw" icon="youtube" padding="4px" margin="6px" text=""/>
            </div>
        </footer>
    );
};

function Reference(props){
    
    const[isOver, setIsOver] = useState(false)
    
    const container = {
        width: props.width,
        height: props.height,
        color: isOver ? "var(--color-contrast-high)" : "var(--color-contrast-medium)",
        borderLeft: props.border ? "1px solid var(--color-contrast-low)" : "none",
        margin: "8px",
        fontWeight: props.bold ? "bold" : "normal",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap"
    }

    return(
        <a href={props.href} style={container} onMouseOver={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)}>
            {props.text}
            {props.children}
        </a>
    )
}

function Link(props) {

    const[isOver, setIsOver] = useState(false);

    const container = {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        height: "24px",
        width: "24px",
        margin: "0px 6px 0px 6px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isOver ? "var(--color-80)" : "var(--color-50)",
        padding: props.padding,
        transition: "0.1s ease-in-out",
        borderRadius: "4px",
    }
    
    const icon = {
        height: "24px",
        width: "24px",
        fill: "var(--color-0)"
    }

    const renderIcon = (key) => {
        switch (key) {
            case 'github':
                return(<svg style={icon} viewBox="0 0 48 48"><path d="M24,7.44a17,17,0,0,0-5.37,33.09c.85.15,1.16-.37,1.16-.82s0-1.47,0-2.89c-4.72,1-5.72-2.27-5.72-2.27a4.54,4.54,0,0,0-1.88-2.49c-1.55-1.05.11-1,.11-1a3.55,3.55,0,0,1,2.6,1.75,3.61,3.61,0,0,0,4.94,1.41,3.69,3.69,0,0,1,1.08-2.27c-3.77-.43-7.73-1.88-7.73-8.39A6.53,6.53,0,0,1,14.92,19a6.1,6.1,0,0,1,.16-4.5s1.43-.45,4.67,1.74a16.13,16.13,0,0,1,8.5,0c3.24-2.19,4.67-1.74,4.67-1.74a6.1,6.1,0,0,1,.16,4.5,6.53,6.53,0,0,1,1.75,4.55c0,6.52-4,8-7.75,8.38a4,4,0,0,1,1.15,3.14c0,2.27,0,4.1,0,4.66s.31,1,1.17.82A17,17,0,0,0,24,7.44Z" /></svg>)
            
            case 'instagram':
                return(<svg style={icon} viewBox="0 0 48 48"><circle cx="32.38" cy="15.68" r="1.86" /><path d="M24.13,16.21A7.79,7.79,0,1,0,31.92,24,7.79,7.79,0,0,0,24.13,16.21Zm0,12.78a5,5,0,1,1,5-5A5,5,0,0,1,24.13,29Z" /><path d="M30.32,39.82H17.68a9.51,9.51,0,0,1-9.5-9.5V17.68a9.51,9.51,0,0,1,9.5-9.5H30.32a9.51,9.51,0,0,1,9.5,9.5V30.32A9.51,9.51,0,0,1,30.32,39.82ZM17.68,11.15a6.54,6.54,0,0,0-6.53,6.53V30.32a6.54,6.54,0,0,0,6.53,6.53H30.32a6.54,6.54,0,0,0,6.53-6.53V17.68a6.54,6.54,0,0,0-6.53-6.53Z" /></svg>)
    
            case 'youtube':
                return(<svg style={icon} viewBox="0 0 48 48"><path d="M41.47,15.16a4.58,4.58,0,0,0-3.22-3.24C35.4,11.15,24,11.15,24,11.15s-11.4,0-14.25.77a4.58,4.58,0,0,0-3.22,3.24C5.77,18,5.77,24,5.77,24s0,6,.76,8.84a4.58,4.58,0,0,0,3.22,3.24c2.85.77,14.25.77,14.25.77s11.4,0,14.25-.77a4.58,4.58,0,0,0,3.22-3.24c.76-2.87.76-8.84.76-8.84S42.23,18,41.47,15.16ZM20.27,29.42V18.58L29.8,24Z" /></svg>)
        
            default:
                return( null )
        }
    }
    
    return (
        <a style={container} href={props.href} onMouseOver={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)}>
            {renderIcon(props.icon)}
        </a>
    )
}