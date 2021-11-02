import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Navbar from './components/Navbar'
import {Menu, MenuItem} from './components/Menu'
import Scene from './components/Scene';
import Footer from './components/Footer'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import { Work } from './components/Work';
import sanityClient from './client';
import Contact from './components/Contact';
import Skills from './components/Skills'
import Post from './components/Post';
import useStore from "./store";
import { Wrapper } from './components/Wrapper';




function App() {

  const aboutRef = useRef()

  const position = useStore((state)=> state.position)
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

  //Query database for specific user
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

  

  return (
    <Wrapper>
    

    <BrowserRouter>
      
      <Switch>

      <Route component={Post} path="/:slug" />

      <Route path="/">  
        <Navbar/>
        
        <Menu>
          <MenuItem name="About" href="#about"/>
          <MenuItem name="Work" href="#work"/>
          <MenuItem name="Skills" href="#skills"/>
          <MenuItem name="Contact" href="#contact"/>
        </Menu>
        <div className={styles.content}>

        {/* About Me Section */}
        <section className={styles.section} ref={aboutRef} style={{gridArea: "about", pointerEvents: "none"}} id="about">
          <ScrollAnimation style={{maxWidth: "100%"}} animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1}>
            <h1>Researcher <b>/</b> Developer</h1>
          </ScrollAnimation>
          <ScrollAnimation style={{maxWidth: "100%"}} animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1.4}>
            <h2>Exceptional computational, software and research skills with design experience.</h2>
          </ScrollAnimation>
        </section>

        {/* My Work Section */}
        <section className={styles.section} style={{gridArea: "work"}} id="work">
          <ScrollAnimation animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1}>
            <h1><b>Work</b> Projects</h1>
          </ScrollAnimation>
          <ScrollAnimation animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1.4}>
            <h2>Query my portfolio below.</h2>
          </ScrollAnimation>

          <Work items={posts}/>
            
        </section>

        <section className={styles.section} style={{gridArea: "skills"}} id="skills">
          <ScrollAnimation animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1}>
            <h1>Skills</h1>
          </ScrollAnimation>
          

          <ScrollAnimation animateIn='animate__fadeInDown' animateOut='animate__fadeOutUp' duration={1.4}>
            <h2>Expericenced with a large set of <mark>3D modelling</mark> software, libraries and programming languages such as <mark>JavaScript</mark> <mark>C#</mark></h2>
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
            You can download my resume <a>here</a>.
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

    </Wrapper>

  );
}

export default App;