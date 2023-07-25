"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Lottie from "lottie-react";
import signInImage from "../../../public/images/signin.png"
import Image from "next/image";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';




export default function LoginPage(){

    const router = useRouter();
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const[loding,setLoding] = React.useState(false)

    const[user,setUser] = React.useState({
        email:"",
        password:"",
        
    })

    

    const onLogin = async () =>{

      try {
        

        setLoding(true);
        const response = await axios.post("api/users/login",user);
        console.log(response.data + "login sucesss")
        toast.success("login done properly");
        router.push("/profile")
        

        
      } catch (err:any) {
          console.log("login failed " + err.message)
          toast.error(err.message)
          setUser({
            email:"",
            password:""
          })
      }
      finally{
        setLoding(false);
      }

    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
             setButtonDisabled(false)
        }
        else{
          setButtonDisabled(true);
        }
    },[user])

    return(
        <div className="min-h-screen w-full bg-white flex items-center justify-center ">
          <div className="flex flex-col w-[50%] h-full rounded-md px-48  ">

            <div className=" w-full text-left font-semibold mt-10 text-xl ">
              <p>{loding ? "processing" : "enter data"}</p>
              <p><span className="text-indigo-600">Login</span> to Your account here</p>
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
                onClick={onLogin}
                className="w-full h-[46px] bg-indigo-600 rounded-md text-white active:scale-95"
                >Login</button>
            </div>
            
                <Link  href="/signup" className="text-left text-sm   mt-6"> first tym here <span className="text-indigo-600">signup here</span></Link>
            
            
          </div>  


          {/* second part of signup form */}

          <div className="w-[50%] ">

            <div>
              <Image
               src={signInImage }
               width={600}
               height={600}
               alt="this is a image"
              />
            </div>

          </div>  
          
        </div>
    )
}