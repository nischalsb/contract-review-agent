import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sessionOptions, SessionData } from "@/lib/auth"
import Link from "next/link"

export default async function DashboardPage() {
    const session = await getIronSession<SessionData>(
        await cookies() as any,
        sessionOptions
      )

  if (!session.isLoggedIn) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <nav className="flex items-center justify-between px-10 py-6 max-w-6xl mx-auto border-b border-gray-100">
        <span className="text-lg font-semibold tracking-tight">ContractAI</span>
        <p className="text-sm text-gray-500">{session.email}</p>
      </nav>

      <main className="max-w-6xl mx-auto px-10 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900"
          style={{ fontFamily: "Georgia, serif" }}>
          Your contracts
        </h1>
        <p className="mt-3 text-gray-500">
          Upload a contract to get started.
        </p>
      </main>
    </div>
  )
}