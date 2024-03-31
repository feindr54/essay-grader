"use client";

import styles from '../styles/globals.css'
import { useEffect, useState } from 'react'

const backend = 'http://localhost:5000/'

const Home = () => {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  
  // useEffect(() => {
  //     fetch(backend + 'api/python/')
  //         .then(res => res.json())
  //         .then(data => {
  //             setMessage(data.message);
  //             setLoading(false);
  //         })
  // }, [])
  let data = {
    "name": "Flask Room",
    "essay": "Talk about Flask here. I love flask. I love next.js. They are so well written!",
  }

  useEffect(() => {
    fetch(backend + 'api/request/', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
      //mode: "no-cors"
    })
        .then(res => res.json())
        .then(data => {
            setMessage(data.message);
            setLoading(false);
        })
}, [])

  

  return (
    <section className = "w-full flex-center flex-col">
        <h1 className = "head_text text-center">
            AI-Powered Essay Grading
            <br className = "max-md:hidden" />
            <span className = "green_gradient text-center">Human-Centric Learning</span>
        </h1>
        <div className={styles.container}>
          <p> {!loading ? message : "Loading.."}</p>

        </div>
    </section>
      
  )
}

export default Home