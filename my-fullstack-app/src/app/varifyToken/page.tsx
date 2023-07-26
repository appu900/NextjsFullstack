"use client"
import axios from "axios"
import Link from "next/link"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"


export default function varifyEmailPage(){
    const[token,setToken] = useState("");
    const [varified,setvarified] = useState(false);
    const [error,setError] = useState(false);

    const varifyUserEmail = async() =>{

        try {

           await axios.post('/api/users/verifyEmail',{token});
           setvarified(true);



            
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
            
        }

    }

    useEffect(()=>{
         

        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

    },[])

    useEffect(()=>{
        
        if(token.length > 0){
            varifyUserEmail();
        }

    },[token])



    return(
        
        <div>
            <h1 className="text-4xl">verify email</h1>
            <p>{token ? `${token}` : "notoken"}</p>


            {varified && (
                <div>email varifiled u can login
                    <Link href="/login">here</Link>
                </div>
            )}



{error && (
                <div> u cant login
                    
                </div>
            )}
        </div>
    )

}
