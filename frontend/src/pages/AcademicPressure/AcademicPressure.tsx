function AcademicPressure() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Study & Well-being
          </p>

          <h1 className="mb-4 text-4xl font-bold text-slate-900">
            Academic Pressure
          </h1>

          <p className="mb-8 text-lg leading-8 text-slate-600">
            Practical ideas for exams, deadlines, assignments, procrastination,
            performance pressure and fear of failure.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="mb-2 text-2xl font-semibold text-slate-900">
                Understanding academic pressure
              </h2>
              <p className="leading-7 text-slate-600">
                Academic pressure can come from exams, deadlines, expectations,
                competition or worries about performance. Recognising what is
                causing the pressure can make it easier to manage.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-2xl font-semibold text-slate-900">
                When studies feel overwhelming
              </h2>
              <p className="leading-7 text-slate-600">
                Break large tasks into smaller steps, decide what needs to be
                done first and give yourself realistic study targets.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-2xl font-semibold text-slate-900">
                Dealing with fear of failure
              </h2>
              <p className="leading-7 text-slate-600">
                A difficult result does not define your ability or your future.
                Focus on what you can learn from the experience and what you
                can improve next.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-2xl font-semibold text-slate-900">
                Simple steps that can help
              </h2>

              <ul className="list-disc space-y-2 pl-6 text-slate-600">
                <li>Choose one important task to start with.</li>
                <li>Break assignments into smaller tasks.</li>
                <li>Take short breaks during longer study sessions.</li>
                <li>Keep a realistic daily study plan.</li>
                <li>Talk to someone you trust when pressure becomes difficult to manage.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcademicPressure