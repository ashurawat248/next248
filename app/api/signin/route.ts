import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export async function POST(req:Request) {
    const { email, password} = await req.json()

    console.log(email, password, "pass")

    try {
        
        if(!email || !password) {
            return NextResponse.json("All Fields are Required", {status: 401})
        }

        const user = await db.user.findFirst({
            where: {
                email
            },
            include: {
                purchase: true,
                quizResult: {
                    include: { 
                        mockTest:{
                            include: {
                                sections: {
                                    include: {
                                        questions:true
                                    }
                                }
                            }
                        }
                    },
                }
            }
        })

        if(!user) {
            return NextResponse.json("User doesn't exist with this email", {status: 404})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password,)
        console.log(isPasswordMatch, 'match')

        if(!isPasswordMatch) {
            return NextResponse.json("Unauthorized", {status: 402})
        }

        const tokenData = {
            userId: user.id
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY!,{expiresIn:"1d"})

        const newUser = {
            _id: user.id,
            email: user.email,
            name: user.name,
            purchase: user.purchase,
            userResult: user.quizResult,
            isAdmin: user.isAdmin
        }

        const response = NextResponse.json({
            message: `Welcome back ${user.name}`,
            newUser
        }, { status: 200 });
        
        response.cookies.set("access_token", token, {
            httpOnly: true,
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            sameSite: "strict"
        });

        return response;
        
    } catch (error) {
        return NextResponse.json("Something went wrong", {status:500})
    }
}

export async function GET() {
    try {
        // Create a response and set the cookie to expire immediately
        const response = NextResponse.json({ message: "Logged Out Successfully" }, { status: 200 });

        // Set the cookie to expire
        response.cookies.set("access_token", "", {
            maxAge: 0,
            path: "/", // Ensure the path matches where the cookie was set
            httpOnly: true, // Use httpOnly if the cookie was set with this flag
            secure: process.env.NODE_ENV === 'production', // Secure flag for HTTPS
            sameSite: 'lax' // Adjust sameSite according to your needs
        });

        return response;
    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function PUT(req:Request) {
    const {email, password} = await req.json()

    if(!email || !password){
        return NextResponse.json("Invalid Credentials", {status: 402})
    }

    try {

    const user = await db.user.findFirst({
        where: { email },
    });

    console.log(user, 'user')

    if (!user) {
        return NextResponse.json("User not found", { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

         await db.user.update({
            where: {
                id:user.id
            },
            data: {
                password: hashedPassword
            }
        })

        return NextResponse.json("Password updated successfully", { status: 200 });
    } catch (error) {
        return NextResponse.json("Something went wrong", {status: 500})
    }
}