"use client";
import Link from 'next/link'

import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';

const backend = 'http://127.0.0.1:5000/'



const Form = ({request, setRequest, submit, handleSubmit }) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    var message_request = 0;

    const send = (e) => {
        e.preventDefault();

        // Read the form data
        const form = e.target;
        //let data = {"essay": form.postContent};
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries());

        //let data = {"essay": e.target.value};
        console.log("here");
        //console.log(e.target.value)
        fetch(backend + 'api/request/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formJson),//formData,
        //mode: "no-cors"
        })
            .then(res => res.json())
            .then(data => {
                setMessage(data.message);
                message_request = data.message;
                setLoading(false);
                setRequest(data.message);
                document.getElementById("alert").textContent = "Your essay score is " + message_request;
                document.getElementById("alert").style.display = "block";
                // alert("Your essay score is " + message_request);
              //go to result and give it data.message
                
              //navigate('/result', { replace: true });
             
            })
            //useNavigate('/result/${request}')
            //useNavigate('/result',{state:{value:request}});
            // return (
                
            //     <Result 
            //         value = {request}
            //         />

            // )
     }
  return (
    <section className = "w-full max-w-full flex-start flex-col">
        <h1 className = "head_text text-left">
            <span className = "green_gradient">
                Enter an Essay
            </span>
        </h1>
        <p className = "desc text-left max-w-md">
            ...and sit back and relax as the AI evaluates and grades the text!
        </p>

        <div
            //onSubmit = {handleSubmit}
            className = "mt-10 w-full max-w-4xl flex flex-col gap-7 glassmorphism">
                <label>
                    <span className = "font-inter font-semibold text-base text-gray-800">
                        Type or paste your essay here:
                    </span>
                    <form method="post" onSubmit={send}>
                        <label>
                            <textarea
                                name="postContent"
                            defaultValue=""
                            rows={12}
                            cols={114}
                            />
                        </label>
                        <button type="submit" className = "black_btn">Grade Essay</button>
                    </form>

                    {/* <textarea
                        value = {request.prompt}
                        onChange = {(e) => setRequest({ ...request, prompt: e.target.value })}
                        placeholder = "Enter your text here..."
                        required
                        className = "form_textarea"
                   > / */}
                </label>
                    {/* <div className = "flex-end mx-3 mb-5 gap-4">
                        <button onClick = {send(e)}  className = "black_btn">
                            Grade Essay
                        </button>
                    </div> */}
        </div>
        <Alert severity="success" id = "alert" style = {{display:"none"}}>This is a success Alert.</Alert>
    </section>
  )
}

export default Form