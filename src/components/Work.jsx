import React, { useState, useContext, useMemo, useEffect } from 'react';
import sanityClient from '../client';
import styles from '../styles/work.module.css'
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";
import Search from './Search';
import "animate.css/animate.min.css";
import useStore from "../store";







export function Work(){


    const[current, setCurrent] = useState(0);
    const[posts, setPosts] = useState([]);

    const[tags, setTags] = useState([]);


    const[options, setOptions] = useState([])

    const[search, setSearch] = useState("");
    const[searchResults, setSearchResults] = useState([]);
   




    useEffect(() => {
        

        const current_posts = posts;
        let updated_posts;
        let result;
        //Filter all the posts by tags


        if(tags.length == 0){
            updated_posts = current_posts;
        }
        // || current_posts.map((post)=> post.tags.map((tag)=> tag.tag)).some((element)=> tags.includes(element))
        else if(tags != null){

           function filterByTags(post_list){ 

                const temp_posts = [];

                post_list.map((post)=>{
                    if(post.tags.map((item)=> item.tag).some((element)=> tags.includes(element))){
                        temp_posts.push(post)
                    }
                })
                return temp_posts
            }

            updated_posts = filterByTags(current_posts);
            
        }

        function makeSearch(search_data, search_term) {

            if(search === ""){
                return updated_posts;
            }
            else{
                return search_data.filter((item) =>  item.name.toLowerCase().includes(search_term.toLowerCase()));
            }
        };
        


        result = makeSearch(updated_posts, search)

        setSearchResults(result);
    
    }, [search, tags]);
    

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
                tags[]{
                    tag
                },
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


    function handleTag(tag){

        let current_tags = tags;
        let updated_tags;

        if(typeof tag == "string"){
            if(current_tags.includes(tag)){

                updated_tags = current_tags.filter((item) => item !== tag)
            }
            else{
                current_tags.push(tag)
                updated_tags = current_tags
            }
        
        }



        setTags(updated_tags)

    };


  
    const content = {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        // justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gridAutoFlow: "dense",
        gridAutoRows: "minmax(64px, 264px)",
        gridGap: "14px",
        padding: "18px 0px 8px 0px",

        // backgroundColor: "var(--color-contrast-lower)",
    }; 



   

    return(

        <div className={styles.main_wrapper}>
            <Search onChange={(event)=> setSearch(event)}/>
            {/* <div className={styles.tags_container}>
                
                <Tag name="architecture" onClick={(event)=> handleTag(event)}>
                    RAND
                </Tag>
                <Tag name="computation" onClick={(event)=> handleTag(event)}>
                    COMP
                </Tag>
                <Tag name="web development" onClick={(event)=> handleTag(event)}>
                    WEB
                </Tag>
                
            </div> */}

            <div style={content}>
                {
                    searchResults.map((item)=> { return(<Item data={item} posts={posts} key={item._id}/>)})
                }
            </div>

        </div>

    )
};

// Clears the array from all duplicate values
// function clearList(array){
//     const mergedArray = [];

//     for(let i = 0; i < array.length; i++){
//         mergedArray.push(array[i].type);
//     }

//     return [...new Set(mergedArray)]
// };

function Tag({ name, onClick, children }) { 

    const[isActive, setIsActive] = useState(false);

    return(
        <div className={styles.tag} style={isActive ? {backgroundColor: "var(--color-accent)"} : {backgroundColor: "var(--color-0)"}} onClick={()=> {setIsActive(!isActive); onClick(name)}}>
            {children}
        </div>
    )
};  


function Item({ data, posts }){
        
    const[isOver, setIsOver] = useState(false);

    const cover_image = useMemo(() => {return  data.gallery.filter((item)=> item.group=="Cover")[0]}, [data])

    const builder = imageUrlBuilder(sanityClient);

    const even_index = posts.map((item)=> item.slug.current).indexOf(data.slug.current) % 2 === 0 ? true : false

    function urlFor(source) {
        return builder.image(source);
      }

    const container = {

        overflow: "hidden",
        animation: "",
        transition: "transform 0.2s",
    };
    
    //#endregion 

    return(

        <Link to={'/' + data.slug.current}  onMouseEnter={()=> setIsOver(true)} onMouseLeave={()=> setIsOver(false)} className={styles.item_container} style={container}>
            <div  className={styles.title} style={{bottom: even_index ? "0px" : "", top: !even_index ? "0" : ""}}>
                {data.name}
            </div>
            <div className={styles.image} style={{bottom: even_index ? "24px" : "", top: !even_index ? "24px" : ""}}>
                <img style={{width: "100%", height: "100%", objectFit: "cover"}} src={urlFor(cover_image ? cover_image.image.asset._ref : null).url()}/>
            </div>
        </Link>
    )
};