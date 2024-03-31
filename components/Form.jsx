"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react'

const backend = 'http://localhost:5000/'



const Form = ({request, setRequest, submit, handleSubmit }) => {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const send = (e) => {
        let data = {"essay": e.target.value};
        console.log("here");
        console.log(e.target.value)
        fetch(backend + 'api/request/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        //mode: "no-cors"
      })
          .then(res => res.json())
          .then(data => {
              setMessage(data.message);
              console.log(data.message)
              setLoading(false);
          })
     }
  return (
    <section className = "w-full max-w-full flex-start flex-col">
        <h1 className = "head_text text-left">
            <span className = "green_gradient">
                Enter an Essay
            </span>
        </h1>
        <p className = "desc text-left max-w-md">
            and sit back and relax as the AI evaluates and grades the text!
        </p>

        <form 
            onSubmit = {handleSubmit}
            className = "mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
                <label>
                    <span className = "font-inter font-semibold text-base text-gray-800">
                        Type or paste your essay here:
                    </span>

                    <textarea
                        value = {request.prompt}
                        onChange = {(e) => setRequest({ ...request, prompt: e.target.value })}
                        placeholder = "Enter your text here..."
                        required
                        className = "form_textarea"
                    />
                </label>
                    <div className = "flex-end mx-3 mb-5 gap-4">
                        <button onClick = {send(e)}  className = "black_btn">
                            Grade Essay
                        </button>
                    </div>
        </form>
    </section>
  )
}

export default Form