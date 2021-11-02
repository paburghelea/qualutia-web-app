import React, { useState, useContext, useMemo, useEffect } from 'react';
import sanityClient from '../client';
import styles from '../styles/work.module.css'
import imageUrlBuilder from "@sanity/image-url";
import { BrowserRouter, Route, Link} from "react-router-dom";
import Search from './Search';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

export function Work( { children, items } ){


    const[current, setCurrent] = useState(0);
    const[posts, setPosts] = useState([]);

    const[options, setOptions] = useState("architecture")

    const[search, setSearch] = useState("");
    const[searchResults, setSearchResults] = useState([]);
   

    useEffect(() => {
        
        function makeSearch(search_data, search_term) {
            return search_data.filter((item) =>  item.name.toLowerCase().includes(search_term.toLowerCase()));
        };
        
        let frame = makeSearch(posts, search)
        setSearchResults(frame);
    
    }, [search]);
    
    useEffect(() => {
        sanityClient
          .fetch(
            `*[_type == "post"]{
                _id,
                dates{
                    start,
                    end
                },
                name,
                description,
                group,
                slug,
                gallery[]{
                  group,
                  height,
                  width,
                  title,
                  image{
                    asset{
                      _ref
                    }
                  }
                }
            }`
          )
          .then((data) => setPosts(data))
          .catch(console.error);
    }, []);

    // setOptions(clearList(posts))

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

    const content = {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        // justifyContent: "center",
        gridTemplateColumns: "repeat(4, minmax(56px, 224px))",
        gridAutoRows: "minmax(48px, 156px)",
        gridGap: "14px",
        padding: "18px 0px 8px 0px",

        // backgroundColor: "var(--color-contrast-lower)",
    }; 


    function Item({ data }){
        
        const[isOver, setIsOver] = useState(false);
    
        const cover_image = useMemo(() => {return  data.gallery.filter((item)=> item.group=="Cover")[0]}, [data])
    
        const builder = imageUrlBuilder(sanityClient);
    
        const even_index = items.map((item)=> item.slug.current).indexOf(data.slug.current) % 2 === 0 ? true : false

        function urlFor(source) {
            return builder.image(source);
          }
    

    


        const container = {
            gridColumn: "span ", 
            gridRow: "span 2",
            overflow: "hidden",
            animation: "",
            transition: "transform 0.2s",
            // flexDirection: even_index ? "row" : "row-reverse"
        };

        
        //#endregion 
    
        return(
    
            <Link to={'/' + data.slug.current}  onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)} className={styles.item_container} style={container}>
                <div className={styles.image}>
                    <img style={{width: "100%", height: "100%", borderRadius: "8px", objectFit: "cover"}} src={urlFor(cover_image ? cover_image.image.asset._ref : null).url()}/>
                </div>
                
                <div  className={styles.title}>
                    {data.name}
                </div>
                
            </Link>
        )
    };



    function Tag({ title, onClick, tags, children }) { 
        

        const[isOver, setIsOver] = useState(false);

        const tag = {
            height: "24px",
            backgroundColor: isOver ? "var(--color-accent)" : "var(--color-contrast-lower)",
            borderRadius: "4px",
            padding: "0px 8px 0px 8px"
        }
        
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
            color: "var(--color-80)",
 
        };
    
        // function handleClick(){

        //     const isIncluded = false;

        //     tags.includes((item)=> item === title ? isIncluded=true)
        // }
    

        
        
        return(
            <div className={styles.tag} onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)}>
                <div style={text}>
                    {children}
                </div>
            </div>
        )
    }

    return(

        <div className={styles.main_wrapper}>
            <Search onChange={(event)=> setSearch(event)}/>
            <div className={styles.tags_container} onClick={()=> handleClick()} >
                <Tag name="Architecture">
                    ARCH
                </Tag>
            </div>

            <div style={content}>
                {
                    searchResults.map((item)=> {
                        // if(item.type == options[current]){
                            return(
                                <Item data={item} key={item._id}/>
                            )
                        // }
                    }   
                )}
            </div>

        </div>

    )
};


