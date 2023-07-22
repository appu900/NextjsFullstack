
import {connect} from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs";



connect()

 export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const{username,email,password} = reqBody;
        console.log(reqBody);

        // check is user already us exist

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"user already exsts"},{status:400})
        }

        // hashpassword

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash
        (password,salt);

       const newUser =  new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
            message:"user created suscefully",
            sucess:true,
            savedUser
        })
        
    } catch (err:any) {
        return NextResponse.json({error:err.message},{status:500})   
    }
}







