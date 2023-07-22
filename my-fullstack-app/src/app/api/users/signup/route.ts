
import {connect} from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs";



connect()

export async function POST(request:NextRequest){
    try{
       const reqBody = await request.json()
       const {username,email,password} = reqBody;

    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}