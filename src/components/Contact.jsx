import React from 'react'
import styles from '../styles/contact.module.css'
import emailjs from 'emailjs-com';



export default function Contact() {

    
    const id = {
        service: String(process.env.REACT_APP_EMAIL_SERVICE),
        template: String(process.env.REACT_APP_EMAIL_TEMPLATE),
        user: String(process.env.REACT_APP_EMAIL_USER)
    }

    
    function sendEmail(event) {
        event.preventDefault();
    
        emailjs.sendForm(id.service, id.template, event.target, id.user)
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
        })
    };

    return (
        <div className={styles.main_wrapper}>
            <form className={styles.form} onSubmit={sendEmail}>
                <input type="hidden" name="contact_number" />

                <label className={styles.label} placeholder="Your email">Name</label>
                <input className={styles.field} type="text" name="name" />

                <label className={styles.label} placeholder="Your email">Email</label>
                <input className={styles.field} type="email" name="email" />

                <label className={styles.label} placeholder="Enter your message" maxLength="2000">Message</label>
                <textarea className={styles.textarea} name="message"/>
                <button>Submit</button>
            </form>
        </div>
    )
};