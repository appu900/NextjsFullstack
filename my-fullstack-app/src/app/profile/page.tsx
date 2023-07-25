"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  
  const router = useRouter()
  const[userDetails,setUserDetails] = useState("nothing")
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout sucessfull");
      router.push("/login");

    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
    }

  };

  const getUserDetails = async() =>{
     const res =  await axios.get('/api/users/me')
     console.log(res.data);
     setUserDetails(res.data.data._id);

  }

  return (
    <div className="bg-white min-h-screen">
      <h1>profile</h1>
      <p>profile page</p>
      <p>{userDetails === "nothing" ? "nothing" : <Link href={`/profile/${userDetails}`}>{userDetails}</Link>}</p>
      <div className="mt-4">
        <button
          onClick={logout}
          className="py-2 px-5 bg-indigo-600 ml-10 rounded-md text-white "
        >
          logout
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={getUserDetails}
          className="py-2 px-5 bg-indigo-600 ml-10 rounded-md text-white "
        >
          get user details
        </button>
      </div>


    </div>
  );
}
