import { db } from "@/lib/prismadb"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"



export async function POST(req:Request){
    const {name, email, password} = await req.json()
    try {
        if(!name || !email || !password ) {
            return NextResponse.json("All fields are required", {status: 401})
        }

        const existUser = await db.user.findFirst({
            where: {
                email,
            }
        })

        if(existUser){
            return NextResponse.json("Already user exist with thisemail", {status: 404})
        }

        const hashPassword = await bcrypt.hashSync(password, 10)

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })

        return NextResponse.json(user, {status: 200})
} catch (error) {
    return NextResponse.json("Something went wrong", {status :500})
  }
}