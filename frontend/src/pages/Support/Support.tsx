import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  MessageCircleHeart,
  Phone,
  Send,
  ShieldAlert,
  ShieldCheck,
  Siren,
} from 'lucide-react'

import supportIllustration from '../../assets/support-illustration.png'

function Support() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSuccess('')
    setError('')

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit request.')
      }

      setSuccess(
        `Support request submitted successfully. Request ID: ${data.request?.id || ''}`
      )

      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#edf8f5] via-[#faf8f5] to-[#f5f1fa] text-slate-800">

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-8 lg:px-12">

        <div className="relative overflow-hidden rounded-[32px] border border-white bg-[#f5f1e9] shadow-sm">

          <div className="grid min-h-[350px] lg:grid-cols-2">

            {/* Text */}
            <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-12">

              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-xs font-semibold text-teal-700">
                <HeartHandshake size={16} />
                Support
              </div>

              <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">
                You don't have to handle{' '}
                <span className="text-teal-600">
                  everything alone.
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                Find helpful information, connect with support, or send us a
                message if you need assistance.
              </p>

            </div>

            {/* Image */}
            <div className="relative min-h-[240px] overflow-hidden">
              <img
                src={supportIllustration}
                alt="People talking in a supportive setting"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f5f1e9] to-transparent" />
            </div>

          </div>
        </div>

        {/* Support Options */}
        <section className="mt-10">

          <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Choose an option
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">

            <Link
              to="/support/information"
              className="group rounded-[26px] border border-blue-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BookOpen size={27} />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Information & Advice
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Trusted information and helpful guidance about mental
                wellbeing.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
                Explore
                <ArrowRight size={17} />
              </div>

            </Link>

            <Link
              to="/support/talk"
              className="group rounded-[26px] border border-teal-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <MessageCircleHeart size={27} />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Talk to Someone
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Learn how to reach out and start a conversation when things
                feel difficult.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-teal-600">
                Learn more
                <ArrowRight size={17} />
              </div>

            </Link>

          </div>

        </section>

        {/* Support Request Form */}
        <section className="mt-10 rounded-[30px] border border-teal-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-7">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <MessageCircleHeart size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-600">
                  Contact Support
                </p>

                <h2 className="text-2xl font-bold text-slate-800">
                  Send a Support Request
                </h2>
              </div>

            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Fill in the form below and your request will be securely
              submitted to the support system.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                rows={5}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
            >
              <Send size={18} />

              {loading ? 'Submitting...' : 'Submit Request'}
            </button>

          </form>

        </section>

        {/* Urgent Help */}
        <section className="mt-10 rounded-[30px] border border-red-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <ShieldAlert size={25} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                Urgent Help
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                Need help right now?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                If you are facing an immediate emergency, contact appropriate
                emergency or professional support services.
              </p>
            </div>

          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">

            {/* 112 */}
            <a
              href="tel:112"
              className="rounded-2xl border border-red-100 bg-red-50/50 p-5 transition hover:shadow-md"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Siren size={22} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-red-500">
                    Emergency Services
                  </p>

                  <h3 className="text-lg font-bold text-slate-800">
                    Call 112
                  </h3>
                </div>

              </div>

              <p className="mt-3 text-sm text-slate-500">
                For immediate emergencies.
              </p>

            </a>

            {/* Tele-MANAS */}
            <a
              href="tel:14416"
              className="rounded-2xl border border-rose-100 bg-rose-50/50 p-5 transition hover:shadow-md"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                  <Phone size={22} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-rose-500">
                    Mental Health Support
                  </p>

                  <h3 className="text-lg font-bold text-slate-800">
                    Call Tele-MANAS
                  </h3>
                </div>

              </div>

              <p className="mt-3 text-sm text-slate-500">
                National mental-health support service.
              </p>

            </a>

          </div>

        </section>

        {/* Privacy */}
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-violet-500">
          <ShieldCheck size={16} />
          <span>Your wellbeing and privacy matter.</span>
        </div>

      </section>

    </main>
  )
}

export default Support