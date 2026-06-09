import Image from "next/image";
{/* Homepage */}
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#1a1a1a]" style={{fontFamily: "'Georgia', serif"}}>

      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-6 max-w-6xl mx-auto">
        <span className="text-lg tracking-tight font-semibold">ContractAI</span>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Sign in
          </Link>
          <Link href="/register" className="text-sm px-5 py-2.5 bg-[#1a1a1a] text-white rounded-full hover:bg-gray-800 transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-10 pt-24 pb-20">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">
          AI-Powered Legal Review
        </p>
        <h1 className="text-6xl font-semibold leading-[1.1] tracking-tight text-[#1a1a1a] max-w-3xl">
          Review contracts in seconds, not hours.
        </h1>
        <p className="mt-8 text-xl text-gray-500 max-w-xl leading-relaxed" style={{fontFamily: "system-ui, sans-serif"}}>
          ContractAI reads every clause, flags what matters, and hands 
          control back to you — before generating a final report.
        </p>
        <div className="flex items-center gap-4 mt-10">
          <Link href="/register" className="px-7 py-3.5 bg-[#1a1a1a] text-white text-sm rounded-full hover:bg-gray-800 transition-colors">
            Start for free →
          </Link>
          <Link href="/login" className="px-7 py-3.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Sign in
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-10">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">

        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">01</p>
          <h3 className="text-lg font-semibold tracking-tight">
            Instant clause analysis
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed" style={{fontFamily: "system-ui, sans-serif"}}>
            Every clause analyzed simultaneously. A 50-clause contract 
            reviewed in seconds — not the three hours it would take manually.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">02</p>
          <h3 className="text-lg font-semibold tracking-tight">
            Risk flagging that explains itself
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed" style={{fontFamily: "system-ui, sans-serif"}}>
            High, medium, and low risk — each with a plain-English explanation 
            and concrete recommendations for revision.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">03</p>
          <h3 className="text-lg font-semibold tracking-tight">
            You stay in control
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed" style={{fontFamily: "system-ui, sans-serif"}}>
            Approve, reject, or annotate every AI finding before anything 
            is finalised. The report reflects your judgment, not just the model's.
          </p>
        </div>

      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-10">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-10 py-24 flex flex-col items-start gap-6">
        <h2 className="text-4xl font-semibold tracking-tight leading-tight">
          Ready to stop reading <br />contracts word by word?
        </h2>
        <p className="text-gray-500 text-lg" style={{fontFamily: "system-ui, sans-serif"}}>
          Join legal teams who let AI do the first pass.
        </p>
        <Link href="/register" className="px-7 py-3.5 bg-[#1a1a1a] text-white text-sm rounded-full hover:bg-gray-800 transition-colors">
          Create free account →
        </Link>
      </section>

    </div>
  )
}