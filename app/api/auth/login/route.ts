import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { sessionOptions, SessionData } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // 1. Get email and password from request body
    const { email, password } = await request.json()

    // 2. Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // 3. Check if user exists
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // 4. Compare password against hash
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // 5. Create session
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    )

    session.userId = user.id
    session.email = user.email
    session.isLoggedIn = true
    await session.save()

    return NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}