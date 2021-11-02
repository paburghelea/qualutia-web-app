import React from 'react'
import { motion } from 'framer-motion'

export default function Section({ id, children, height, addStyle, addRef, href}) {
    
    

    const container = {
        width: "100%",
        height: "80vh",
        // border: "1px solid red",
        position: "relative",
        zIndex: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center", 
        ...addStyle
    }
    
    
    return (
        // <motion.div 
        //     initial={{opacity: 0, x: -1000}}
        //     animate={{opacity:1, x: 0, transition:{ duration: Math.random(1)*2, ease: 'easeIn' }}}
        //     exit={{opacity: 0}}
        //     >
        <section
            ref={addRef}
            href={href}
            style={container}
            id={id}
        >

            {children}

        </section>
        // </motion.div>
    )
}
