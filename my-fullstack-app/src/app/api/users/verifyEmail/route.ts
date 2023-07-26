import { NextResponse } from "next/server";
import {connect} from "@/dbconfig/dbconfig";
import { NextRequest } from "next/server";
import User from "@/models/userModel";


connect();


export async function POST(request:NextRequest) {

    try {

        const requestBody = await request.json();
        const{token} = requestBody;
        console.log(token);
        const user = await User.findOne({varifyToken:token,varifyTokenExpiry:{$gt:Date.now()}})
        if(!user){
            return NextResponse.json({error:"invalid token"},{status:400});
        }
        console.log(user);
        user.isVarified = true;
        user.varifyToken = undefined;
        user.varifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message:"email verified"
        })
        
         
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
    
}
