import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Navbar from './components/Navbar'
import {Menu, MenuItem} from './components/Menu'
import Scene from './components/Scene';
import Footer from './components/Footer'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import { Item, Work } from './components/Work';
import sanityClient from './client';
import Contact from './components/Contact';
import Skills from './components/Skills'
import Post from './components/Post';
import useStore from "./store";




function App() {

  const aboutRef = useRef()
  const workRef = useRef()
  const skillsRef = useRef()
  const contactRef = useRef()
  const wrapperRef = useRef();

  const position = useStore((state)=> state.position)
  const mode = useStore((state)=> state.mode)

  const setPosition = useStore((state)=> state.setPosition)

  // const[position, setPosition] = useState(0);
  const[posts, setPosts] = useState([]);
  const[user, setUser] = useState([]);
  const[current, setCurrent] = useState(0);


  //Query database for all posts
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
  const options = clearList(posts);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "user" && name == "Paul-Andrei Burghelea"]{
          _id,
          name,
          skills[]{
            name,
            type,
            description,
            icon{
              asset{
                _ref
              }
            }
          }
          
        }`
      )
      .then((data) => setUser(data))
      .catch(console.error);
  }, []); 

  // Use effect to track the page scroll
  useLayoutEffect(() => {

    function handleScroll() {
      setPosition(Math.round(Math.abs((100 / (document.body.offsetHeight - window.innerHeight)) * window.pageYOffset)));
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  
  console.log(position, mode)

  return (
    <main className={styles.wrapper}>

<BrowserRouter>
      
      <Switch>

      <Route component={Post} path="/:slug" />
      <Route>  
     
        <Navbar position={position}/>
        

          
        <Menu>
          <MenuItem name="About" href="#about" ref={aboutRef}/>
          <MenuItem name="Work" href="#work"/>
          <MenuItem name="Skills" href="#skills"/>
          <MenuItem name="Contact" href="#contact"/>
        </Menu>
        <div className={styles.content}>

        {/* <Location percent={position} radius={30} size={80}/> */}

        {/* About Me Section */}
        <section className={styles.section} ref={aboutRef} style={{gridArea: "about", pointerEvents: "none"}} id="about">
          <ScrollAnimation style={{maxWidth: "100%"}} animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1}>
            <h1>Researcher <b>/</b> Developer</h1>
          </ScrollAnimation>
          <ScrollAnimation style={{maxWidth: "100%"}} animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1.4}>
            <h2>Researcher and developer with experience as a designer</h2>
          </ScrollAnimation>
        </section>

        {/* My Work Section */}
        <section className={styles.section} style={{gridArea: "work"}} id="work">
          <ScrollAnimation animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1}>
            <h1><b>Work</b> Projects</h1>
          </ScrollAnimation>
          <ScrollAnimation animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1.4}>
            <h2>Researcher and developer with experience as a designer</h2>
          </ScrollAnimation>

          <Work items={posts}/>
            
        </section>

        <section className={styles.section} style={{gridArea: "skills"}} id="skills">
          <ScrollAnimation animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1}>
            <h1>Skills</h1>
          </ScrollAnimation>
          

          <ScrollAnimation animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1.4}>
            <h2>Expericenced with a large set of <mark>3D modelling</mark> software, libraries and programming languages such as <mark>JavaScript</mark> <mark>TypeScript</mark> <mark>C#</mark> a designer</h2>
          </ScrollAnimation>

          <Skills user={user[0]}/>
        </section>

        {/* Contact Me Section */}
        <section className={styles.section} style={{gridArea: "contact"}} id="contact">
          
          <ScrollAnimation style={{width: "100%"}} animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1}>
            <h1>Contact</h1>
          </ScrollAnimation>
          <ScrollAnimation style={{width: "100%"}} animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1.4}>
            <h2>To get in touch send me a message using the form below or send me a <a href="mailto:work@qualutia.com"> direct email</a>.
            Alternativley you can download my resume <a>here</a>.
            </h2>

          </ScrollAnimation>
          <Contact/>
        </section>
          

        <Footer/>
        </div>


        
        <Scene/>

          </Route>

        </Switch>

      </BrowserRouter>

      
    </main>
  );
}

export default App;


function clearList(array){
  const mergedArray = [];

  for(let i = 0; i < array.length; i++){
      mergedArray.push(array[i].type);
  }

  return [...new Set(mergedArray)]
};