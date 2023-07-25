
import { getDatafromToken } from "@/helpers/getdatafromToken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();
export async function GET(request:NextRequest){
    try {

      const userId =  await getDatafromToken(request);
      const user =   await User.findOne({_id:userId}).
      select("-password");
      return NextResponse.json(
        {message:"userfound",data:user}
        
      )

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
        
    }
}


