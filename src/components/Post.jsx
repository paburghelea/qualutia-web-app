import Footer from "./Footer";
import Navbar, { NavbarItem } from "./Navbar";
import sanityClient from "../client";
import styles from '../styles/post.module.css'
import React, { useEffect, useState } from "react";
import Mozaic from "./Mozaic";
import { Link, useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import Loading from "./Loading";
import "animate.css/animate.min.css";
// import BlockContent from "@sanity/block-content-to-react";


const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Post() {

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    
    console.log(post)

    useEffect(() => {
        sanityClient
          .fetch(
            `*[_type == "post" && slug.current == $slug][0]{
                _id,
                
                span,
                links[]{
                    type,
                    link
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
            }`,
            { slug }
          )         
          .then((data) => setPost(data))
          .catch(console.error);
      }, []); 


    if (!post) return (
        <React.Fragment>
            <Navbar>
                <NavbarItem href="/"> <Link to="/">
                    <svg viewBox="0 0 64 64"><title>back</title><path d="M48,23.93V40.07A7.94,7.94,0,0,1,40.07,48H23.93a7.86,7.86,0,0,1-4.11-1.15,8.06,8.06,0,0,1-1.49-1.18A7.86,7.86,0,0,1,16,40.07V32h4.38v8.07a3.68,3.68,0,0,0,.32,1.49h0a3.16,3.16,0,0,0,.55.83,2.73,2.73,0,0,0,.34.34,3.16,3.16,0,0,0,.83.55h0a3.68,3.68,0,0,0,1.49.32H40.07a3.55,3.55,0,0,0,3.55-3.55V23.93a3.68,3.68,0,0,0-.32-1.49h0a3.16,3.16,0,0,0-.55-.83,2.73,2.73,0,0,0-.34-.34,3.16,3.16,0,0,0-.83-.55h0a3.68,3.68,0,0,0-1.49-.32H33.4l3.52,3.52-2.84,2.83-8.55-8.55,8.55-8.53,2.84,2.83L33.4,16h6.67a7.86,7.86,0,0,1,4.11,1.15,8.06,8.06,0,0,1,1.49,1.18A7.88,7.88,0,0,1,48,23.93Z"/></svg>
                    </Link>
                </NavbarItem>
            </Navbar>
            <Loading/>
        </React.Fragment>
    );

console.log(post)
    return (
        <React.Fragment>
            <Navbar>
                <NavbarItem href="/"> 
                    <Link to="/#work">
                        <svg viewBox="0 0 64 64"><title>back</title><path d="M48,23.93V40.07A7.94,7.94,0,0,1,40.07,48H23.93a7.86,7.86,0,0,1-4.11-1.15,8.06,8.06,0,0,1-1.49-1.18A7.86,7.86,0,0,1,16,40.07V32h4.38v8.07a3.68,3.68,0,0,0,.32,1.49h0a3.16,3.16,0,0,0,.55.83,2.73,2.73,0,0,0,.34.34,3.16,3.16,0,0,0,.83.55h0a3.68,3.68,0,0,0,1.49.32H40.07a3.55,3.55,0,0,0,3.55-3.55V23.93a3.68,3.68,0,0,0-.32-1.49h0a3.16,3.16,0,0,0-.55-.83,2.73,2.73,0,0,0-.34-.34,3.16,3.16,0,0,0-.83-.55h0a3.68,3.68,0,0,0-1.49-.32H33.4l3.52,3.52-2.84,2.83-8.55-8.55,8.55-8.53,2.84,2.83L33.4,16h6.67a7.86,7.86,0,0,1,4.11,1.15,8.06,8.06,0,0,1,1.49,1.18A7.88,7.88,0,0,1,48,23.93Z"/></svg>
                    </Link>
                </NavbarItem>
            </Navbar>

            <div className={styles.wrapper}>
                <section className={styles.container} id="gallery" style={{gridArea: "gallery"}}>
                    <Mozaic items={post.gallery}/>
                </section>

                <section className={styles.container} id="presentation" style={{gridArea: "presentation"}}>
                    
                    <h1 className={styles.title}>
                        <b>{post.name}</b> {post.subtitle}
                    </h1>
                    
                        <section className={styles.section}>
                            <h2>Summary</h2>
                            <div className={styles.section_content}>
                                <div className={styles.field}>
                                    
                                    
                                    {post.span}

                                </div>


                                <div className={styles.field}>

                                    {post.links?.map((link)=> <Button link={link.link} type={link.type}/> )}
                                
                                </div>


                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2>Description</h2>
                            <div className={styles.section_content}>
                        

                                {/* {post.description[]} */}

                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2>References</h2>
                            <div className={styles.section_content}>
                                
                            </div>
                        </section>
            
                    

                </section>
                <Footer/>
            </div>
        </React.Fragment>
    )
};


function Button({ type, link }){

    const button = {
        backgroundColor: "rgb(50,50,50)"
    }



    function Icon(type){
        switch (type) {
            case "github":
                return(<svg viewBox="0 0 48px 48px" style={{ width: "33px", height: "33px" }} ><path d="M24,7.44a17,17,0,0,0-5.37,33.09c.85.15,1.16-.37,1.16-.82s0-1.47,0-2.89c-4.72,1-5.72-2.27-5.72-2.27a4.54,4.54,0,0,0-1.88-2.49c-1.55-1.05.11-1,.11-1a3.55,3.55,0,0,1,2.6,1.75,3.61,3.61,0,0,0,4.94,1.41,3.69,3.69,0,0,1,1.08-2.27c-3.77-.43-7.73-1.88-7.73-8.39A6.53,6.53,0,0,1,14.92,19a6.1,6.1,0,0,1,.16-4.5s1.43-.45,4.67,1.74a16.13,16.13,0,0,1,8.5,0c3.24-2.19,4.67-1.74,4.67-1.74a6.1,6.1,0,0,1,.16,4.5,6.53,6.53,0,0,1,1.75,4.55c0,6.52-4,8-7.75,8.38a4,4,0,0,1,1.15,3.14c0,2.27,0,4.1,0,4.66s.31,1,1.17.82A17,17,0,0,0,24,7.44Z" /></svg>)
            default:
                break;
        }
    }

    return(
        <button className={styles.link_button} onClick={()=> window.open(link)} style={button}>
            {Icon(type)}GitHub
        </button>
    )
}