"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Lottie from "lottie-react";
import signUpImage from "../../../public/images/chat.png"
import Image from "next/image";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';


export default function signupPage(){

    const router = useRouter();
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const[loding,setLoding] = React.useState(false)
    const[user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })

    const onSignup = async () =>{

      try {
        setLoding(true);
        const response = await axios.post("/api/users/signup",user)
        console.log("signup sucess", response.data)
        router.push("/login")
        
      } catch (err:any) {
         
        toast.error(err.message)
        console.log("signup failed");

        
      }
      finally{

        setLoding(false);

      }

    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
          setButtonDisabled(false);
        }
        else{
          setButtonDisabled(true);
        }
    },[user]);

    return(
        <div className="min-h-screen w-full bg-white flex items-center justify-center ">
          
          <div className="flex flex-col w-[50%] h-full rounded-md px-48  ">

            <div className=" w-full text-left font-semibold mt-10 text-xl ">
              <p><span className="text-indigo-600">Create</span> Your account here</p>
            </div>

            <div className=" w-full text-center mt-5 ">
              <input type="text"
               placeholder="username"
               value={user.username}
               onChange={(e)=>setUser({...user,username:e.target.value})}
               className=" outline-none w-full  p-2 border-b-2 border-gray-500 placeholder:text-black placeholder:text-sm" 
              />
            </div>

            <div className=" flex justify-center mt-5 ">
              <input type="email"
               placeholder="email"
               value={user.email}
               onChange={(e)=>setUser({...user,email:e.target.value})}
               className=" outline-none w-full p-2 border-b-2 border-gray-500 placeholder:text-black placeholder:text-sm" 
              />
            </div>

            <div className=" flex  justify-center mt-5 ">
              <input type="password"
               placeholder="password"
               value={user.password}
               onChange={(e)=>setUser({...user,password:e.target.value})}
               className=" outline-none w-full p-2 border-b-2 border-gray-500 placeholder:text-black placeholder:text-sm" 
              />
            </div>

            <div className="text-center mt-8">
                <button 
                onClick={onSignup}
                className="w-full h-[46px] bg-indigo-600 rounded-md text-white active:scale-95"
                >{buttonDisabled ? "No signup":"Create Account"}</button>
            </div>
            
                <Link  href="/login" className="text-left text-sm   mt-6"> Already have account <span className="text-indigo-600">login here</span></Link>
            
            
          </div>  


          {/* second part of signup form */}

          <div className="w-[50%] ">

            <div>
              <Image
               src={signUpImage}
               width={600}
               height={600}
               alt="this is a image"
              />
            </div>

          </div>  
          
        </div>
    )
}