"use client";

import styles from '../styles/globals.css'
import { useEffect, useState } from 'react'
import Link from 'next/link';


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
            AI-Powered Essay Grading,
            <br className = "max-md:hidden" />
            <span className = "head_text green_gradient text-center"> Human-Centric Learning</span>
        </h1>
        <div className={styles.container}>
          {/* <p> {!loading ? message : "Loading.."}</p> */}

        </div>
        <p className = "desc text-center">
            NivelMate is an AI-powered educational tool that grades students' essays in an instant, saving hours of time and supporting an unbiased evaluation system.
        </p>
        <br className = "max-md:hidden" />
        <div><br /></div>
        <div className = "flex gap-3 md:gap-5">
                <Link href = "/program" className = "black_btn">
                    Let's Go!
                </Link>
            </div>
    </section>
      
  )
}

export default Home