import { useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Brain,
  BookOpen,
  Heart,
  Moon,
  Target,
  Sparkles,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Category =
  | 'academic'
  | 'relationship'
  | 'stress'
  | 'sleep'
  | 'confidence'

type Result = {
  category: Category
  score: number
}

const questions: {
  id: number
  text: string
  category: Category
}[] = [
  {
    id: 1,
    text: 'How often do you feel overwhelmed by assignments, exams, or academic workload?',
    category: 'academic',
  },
  {
    id: 2,
    text: 'How much does academic pressure affect your concentration or daily routine?',
    category: 'academic',
  },
  {
    id: 3,
    text: 'How often do problems with friends or relationships affect your mood?',
    category: 'relationship',
  },
  {
    id: 4,
    text: 'How difficult is it for you to communicate your feelings with people close to you?',
    category: 'relationship',
  },
  {
    id: 5,
    text: 'How often do you feel stressed, tense, or mentally overwhelmed?',
    category: 'stress',
  },
  {
    id: 6,
    text: 'How difficult is it for you to relax when you have several things going on?',
    category: 'stress',
  },
  {
    id: 7,
    text: 'How often do poor sleep or lack of rest affect your energy during the day?',
    category: 'sleep',
  },
  {
    id: 8,
    text: 'How difficult is it for you to maintain a healthy sleep and rest routine?',
    category: 'sleep',
  },
  {
    id: 9,
    text: 'How often do self-doubt or fear of failure affect your decisions?',
    category: 'confidence',
  },
  {
    id: 10,
    text: 'How often do you compare yourself with others and feel that you are not doing enough?',
    category: 'confidence',
  },
]

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'A little', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Very often', value: 4 },
]

const categoryInfo: Record<
  Category,
  {
    name: string
    resourcePath: string
    resourceName: string
    icon: ReactNode
    points: string[]
  }
> = {
  academic: {
    name: 'Academic Pressure',
    resourcePath: '/resources/academic-pressure',
    resourceName: 'Academic Pressure Guide',
    icon: <BookOpen size={22} />,
    points: [
      'Break large academic tasks into smaller, manageable steps.',
      'Choose your most important 2–3 tasks instead of trying to finish everything at once.',
      'Use focused study sessions with short breaks between them.',
    ],
  },

  relationship: {
    name: 'Relationships & Friendship',
    resourcePath: '/resources/relationships-and-friendship',
    resourceName: 'Relationships & Friendship Guide',
    icon: <Heart size={22} />,
    points: [
      'Give yourself time to understand what you are feeling before reacting.',
      'Communicate your concerns clearly and respectfully.',
      'Talk to someone you trust when a relationship problem feels difficult to handle alone.',
    ],
  },

  stress: {
    name: 'Stress & Overwhelm',
    resourcePath: '/resources/stress-and-overwhelm',
    resourceName: 'Stress & Overwhelm Guide',
    icon: <Brain size={22} />,
    points: [
      'Focus on one manageable task instead of everything at once.',
      'Take short pauses when you notice stress building up.',
      'Write down your concerns and separate what you can control from what you cannot.',
    ],
  },

  sleep: {
    name: 'Sleep & Rest',
    resourcePath: '/resources/sleep-and-rest',
    resourceName: 'Sleep & Rest Guide',
    icon: <Moon size={22} />,
    points: [
      'Try to keep your sleep and wake times reasonably consistent.',
      'Give yourself quiet time to wind down before sleeping.',
      'Avoid letting unfinished work completely take over your rest time.',
    ],
  },

  confidence: {
    name: 'Confidence & Self-Esteem',
    resourcePath: '/resources/confidence-and-self-esteem',
    resourceName: 'Confidence & Self-Esteem Guide',
    icon: <Target size={22} />,
    points: [
      'Set small goals that you can realistically complete.',
      'Notice your progress instead of focusing only on mistakes.',
      'Try to compare your current progress with your own previous progress rather than with others.',
    ],
  },
}

function CheckIn() {
  const navigate = useNavigate()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<Result[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const question = questions[currentQuestion]

  const handleAnswer = (value: number) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: value,
    }))
  }

  const calculateResults = async () => {
    const scores: Record<Category, number> = {
      academic: 0,
      relationship: 0,
      stress: 0,
      sleep: 0,
      confidence: 0,
    }

    questions.forEach((q) => {
      const answer = answers[q.id] ?? 0
      scores[q.category] += answer
    })

    const calculatedResults: Result[] = Object.entries(scores)
      .map(([category, score]) => ({
        category: category as Category,
        score,
      }))
      .sort((a, b) => b.score - a.score)

    const primary = calculatedResults[0]
    const secondary = calculatedResults[1]

    // Get the currently logged-in user
    const storedUser = localStorage.getItem('user')

    if (!storedUser) {
      alert('Please log in before taking the check-in.')
      navigate('/login')
      return
    }

    let user

    try {
      user = JSON.parse(storedUser)
    } catch (error) {
      console.error('Invalid user data:', error)
      alert('User session is invalid. Please log in again.')
      localStorage.removeItem('user')
      navigate('/login')
      return
    }

    if (!user.id) {
      alert('User ID not found. Please log in again.')
      navigate('/login')
      return
    }

    setSaving(true)

    try {
      const response = await fetch(
        'http://localhost:5000/api/checkins',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.id,

            academic_score: scores.academic,
            relationship_score: scores.relationship,
            stress_score: scores.stress,
            sleep_score: scores.sleep,
            confidence_score: scores.confidence,

            primary_category: primary.category,
            secondary_category: secondary.category,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        console.error('Check-in save error:', data)
        alert('Could not save your check-in. Please try again.')
        return
      }

      console.log('Check-in saved:', data)

      setResults(calculatedResults)
      setSubmitted(true)
    } catch (error) {
      console.error('Check-in save error:', error)
      alert('Unable to connect to the server.')
    } finally {
      setSaving(false)
    }
  }

  const handleNext = () => {
    if (answers[question.id] === undefined) {
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1)
    } else {
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1)
    }
  }

  const resetCheckIn = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setResults([])
    setSubmitted(false)
  }

  if (submitted) {
    const primary = results[0]
    const secondary = results[1]

    const primaryInfo = categoryInfo[primary.category]
    const secondaryInfo = categoryInfo[secondary.category]

    return (
      <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2
                  size={34}
                  className="text-emerald-600"
                />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-teal-600">
                Thrive Wellbeing Assessment
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">
                Your personalised results
              </h1>

              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Your responses suggest that these areas may be most useful
                for you to explore right now.
              </p>
            </div>

            {/* Primary Concern */}
            <div className="mt-10 rounded-3xl border border-teal-100 bg-teal-50/60 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600">
                  {primaryInfo.icon}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-teal-600">
                        Primary area
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-slate-800">
                        {primaryInfo.name}
                      </h2>
                    </div>

                    <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-teal-700">
                      {primary.score}/8
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="font-semibold text-slate-800">
                      Points that may help
                    </h3>

                    <div className="mt-3 space-y-2">
                      {primaryInfo.points.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-xl bg-white p-3"
                        >
                          <span className="mt-0.5 text-teal-600">
                            ✓
                          </span>

                          <p className="text-sm leading-6 text-slate-600">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(primaryInfo.resourcePath)
                    }
                    className="mt-5 flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-medium text-white transition hover:bg-teal-700"
                  >
                    Open {primaryInfo.resourceName}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Concern */}
            {secondary.score > 0 && (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                    {secondaryInfo.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          Another area to explore
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-slate-800">
                          {secondaryInfo.name}
                        </h2>
                      </div>

                      <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                        {secondary.score}/8
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {secondaryInfo.points.slice(0, 2).map(
                        (point, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <span className="text-slate-400">
                              •
                            </span>

                            <p className="text-sm leading-6 text-slate-600">
                              {point}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(secondaryInfo.resourcePath)
                      }
                      className="mt-4 flex items-center gap-2 font-medium text-teal-600 hover:text-teal-700"
                    >
                      Explore {secondaryInfo.resourceName}
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other Results */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-slate-800">
                Your wellbeing areas
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {results.map((result) => {
                  const info = categoryInfo[result.category]

                  return (
                    <div
                      key={result.category}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-slate-500">
                            {info.icon}
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {info.name}
                          </span>
                        </div>

                        <span className="text-sm font-semibold text-slate-500">
                          {result.score}/8
                        </span>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-teal-500"
                          style={{
                            width: `${(result.score / 8) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={resetCheckIn}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Take Check-In Again
              </button>

              <button
                type="button"
                onClick={() => navigate('/support')}
                className="flex-1 rounded-xl bg-teal-600 px-6 py-3 font-medium text-white transition hover:bg-teal-700"
              >
                Get Support
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500">
              This check-in provides general wellbeing guidance and is
              not a medical diagnosis.
            </p>

          </div>
        </div>
      </main>
    )
  }

  const progress =
    ((currentQuestion + 1) / questions.length) * 100

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-teal-600"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
              Thrive Check-In
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <h1 className="text-3xl font-bold text-slate-800">
                Understand your wellbeing
              </h1>

              <span className="shrink-0 text-sm font-semibold text-slate-500">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>

            <p className="mt-3 text-slate-600">
              Answer honestly. Your responses help Thrive identify which
              wellbeing resources may be most relevant to you.
            </p>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mt-10">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Sparkles size={20} />
              </div>

              <h2 className="text-xl font-bold leading-8 text-slate-800">
                {question.text}
              </h2>
            </div>

            {/* Answers */}
            <div className="mt-8 space-y-3">
              {options.map((option) => {
                const selected =
                  answers[question.id] === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      handleAnswer(option.value)
                    }
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                      selected
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50/30'
                    }`}
                  >
                    <span className="font-medium">
                      {option.label}
                    </span>

                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        selected
                          ? 'border-teal-600 bg-teal-600'
                          : 'border-slate-300'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex justify-between gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || saving}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={
                answers[question.id] === undefined || saving
              }
              className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-medium text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving
                ? 'Saving...'
                : currentQuestion === questions.length - 1
                  ? 'Evaluate My Results'
                  : 'Next'}

              {!saving && <ArrowRight size={18} />}
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}

export default CheckIn