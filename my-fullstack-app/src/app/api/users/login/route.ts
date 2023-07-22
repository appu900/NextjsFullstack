import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    console.log(requestBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user doesnot exists" },
        { status: 400 }
      );
    }

    //    check passoword is correct

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }

    //   craete a token data
    const tokenData = {
      id: user._id,
      username:user.username,
      email:user.email
    };

    // create a token

    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRETE!,{expiresIn:"1d"})
    const response = NextResponse.json({
        message:"login successful",
        success:true,
    })
    response.cookies.set("token",token,{httpOnly:true})
    return response;






  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
