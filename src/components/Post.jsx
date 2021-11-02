import Footer from "./Footer";
import Navbar, { NavbarItem } from "./Navbar";
import sanityClient from "../client";
import styles from '../styles/post.module.css'
import React, { useEffect, useState } from "react";
import Mozaic from "./Mozaic";
import { Content } from "./Wrapper";
import { Link, useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";

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
                
                start,
                end,
                
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


    if (!post) return <div>Loading...</div>;

    return (
        <React.Fragment>
            <Navbar>
                <NavbarItem href="/"> <Link to="/">
                    <svg viewBox="0 0 64 64"><title>back</title><path d="M48,23.93V40.07A7.94,7.94,0,0,1,40.07,48H23.93a7.86,7.86,0,0,1-4.11-1.15,8.06,8.06,0,0,1-1.49-1.18A7.86,7.86,0,0,1,16,40.07V32h4.38v8.07a3.68,3.68,0,0,0,.32,1.49h0a3.16,3.16,0,0,0,.55.83,2.73,2.73,0,0,0,.34.34,3.16,3.16,0,0,0,.83.55h0a3.68,3.68,0,0,0,1.49.32H40.07a3.55,3.55,0,0,0,3.55-3.55V23.93a3.68,3.68,0,0,0-.32-1.49h0a3.16,3.16,0,0,0-.55-.83,2.73,2.73,0,0,0-.34-.34,3.16,3.16,0,0,0-.83-.55h0a3.68,3.68,0,0,0-1.49-.32H33.4l3.52,3.52-2.84,2.83-8.55-8.55,8.55-8.53,2.84,2.83L33.4,16h6.67a7.86,7.86,0,0,1,4.11,1.15,8.06,8.06,0,0,1,1.49,1.18A7.88,7.88,0,0,1,48,23.93Z"/></svg>
                    </Link>
                
                </NavbarItem>
            </Navbar>
            <div className={styles.content}>
                <section classname={styles.container} id="gallery" styles={{gridArea: "gallery"}}>
                    <Mozaic items={post.gallery}/>
                </section>

                <section classname={styles.container} id="presentation" styles={{gridArea: "presentation"}}>
                    
                    <h1 className={styles.title}>
                        <b>{post.name}</b> {post.subtitle}
                    </h1>
                    <Content addStyles={{height: "100%", width: "100%", paddingLeft: "none"}}>
                    
                        <section className={styles.section}>
                            <h2>Summary</h2>
                            <div className={styles.content}>
                                <div className={styles.field}>
                                    
                                    
                                    {post.start + ' to ' + post.end}
                                </div>



                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2>Description</h2>
                            <div className={styles.content}>
                        
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2>References</h2>
                            <div className={styles.content}>
                                
                            </div>
                        </section>
            
                    </Content>
                    <Footer/>

                </section>
            </div>
        </React.Fragment>
    )
};



function Gallery({ items }){
    
    const [current, setCurrent] = useState(0)


    const content = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(48px, 80px))",
        gridAutoRows: "minmax(48px, 80px)",
        width: "100%",
        
    };

    const div = {
        windth: "100%",
        height: "100%",
        padding: "var(--padding-50)"
    }


    const controls = {
        display: "flex",
        alignItems: "center"
    }

    return(
        <div style={div}>
            <div style={content}>

            </div>
            <div style={controls}>

            </div>
        </div>
    )
}