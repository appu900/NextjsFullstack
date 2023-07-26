

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request:NextRequest){
    
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path ==='/signup' || path === 'varifyToken';
    const token = request.cookies.get('token')?.value || '';
    

    //todo if the reqessted path is a public path and userhave a token thn send the homepage 

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }
    if(!isPublicPath  && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }
   
  

}


//todo its the matching part right down

export const config = {
    matcher:[
        '/',
        '/profile',
        '/login',
        '/signup',
        '/varifyToken',

    ]
}