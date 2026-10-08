import { Link } from 'react-router-dom'

type ResourceType =
  | 'academic'
  | 'focus'
  | 'change'
  | 'relationships'
  | 'money'
  | 'support'
  | 'sleep'
  | 'confidence'
  | 'habits'

type Section = {
  title: string
  text?: string
  items?: string[]
}

type Resource = {
  label: string
  title: string
  description: string
  sections: Section[]
}

type Props = {
  type: ResourceType
}

const resourceData: Record<ResourceType, Resource> = {
  academic: {
    label: 'Study & Well-being',
    title: 'Academic Pressure',
    description:
      'Practical ideas for exams, deadlines, assignments, procrastination, performance pressure and fear of failure.',
    sections: [
      {
        title: 'Understanding academic pressure',
        text: 'Academic pressure can come from exams, deadlines, expectations, competition or worries about performance. Understanding what is causing the pressure is an important first step.',
      },
      {
        title: 'When studies feel overwhelming',
        text: 'Break large tasks into smaller steps. Decide what needs attention first and set realistic study goals instead of trying to complete everything at once.',
      },
      {
        title: 'Dealing with fear of failure',
        text: 'A difficult result does not define your ability or your future. Focus on what you can learn from the experience and what you can improve next.',
      },
      {
        title: 'Simple steps that can help',
        items: [
          'Choose one important task to start with.',
          'Break assignments into smaller tasks.',
          'Keep a realistic daily study plan.',
          'Take short breaks during longer study sessions.',
          'Talk to someone you trust when pressure becomes difficult to manage.',
        ],
      },
    ],
  },

  focus: {
    label: 'Study & Productivity',
    title: 'Focus & Productivity',
    description:
      'Simple approaches to concentration, planning, procrastination and getting things done without burning yourself out.',
    sections: [
      {
        title: 'Start with one task',
        text: 'Trying to handle many tasks at once can make it harder to begin. Choose one clear task and work on that first.',
      },
      {
        title: 'Break work into smaller steps',
        text: 'Large assignments can feel difficult when viewed as one task. Divide them into smaller actions that are easier to start and finish.',
      },
      {
        title: 'Managing procrastination',
        text: 'Instead of waiting until you feel motivated, try starting with a very small step. Getting started is often easier once the task feels manageable.',
      },
      {
        title: 'Simple ways to improve focus',
        items: [
          'Keep your study area organised.',
          'Put unnecessary phone notifications away.',
          'Set one clear goal for each study session.',
          'Take regular short breaks.',
          'Keep your daily workload realistic.',
        ],
      },
    ],
  },

  change: {
    label: 'Life & Transitions',
    title: 'Managing Change',
    description:
      'Support for transitions such as starting university, moving away from home, changing courses or entering a new phase of life.',
    sections: [
      {
        title: 'Change can feel uncomfortable',
        text: 'Starting something new can bring uncertainty, excitement and stress at the same time. These reactions are normal when familiar routines change.',
      },
      {
        title: 'Give yourself time',
        text: 'You do not need to adjust to every change immediately. Allow yourself time to understand your new situation and build new routines.',
      },
      {
        title: 'Focus on what you can control',
        text: 'When a situation feels uncertain, focus on the things you can influence today rather than trying to solve everything at once.',
      },
      {
        title: 'Helpful steps',
        items: [
          'Keep some familiar routines.',
          'Set small goals for the new situation.',
          'Stay connected with people you trust.',
          'Ask questions when something is unclear.',
          'Give yourself time to adapt.',
        ],
      },
    ],
  },

  relationships: {
    label: 'Relationships & Social Well-being',
    title: 'Relationships & Friendship',
    description:
      'Thoughtful guidance around friendships, boundaries, communication, loneliness and social pressure.',
    sections: [
      {
        title: 'Healthy relationships',
        text: 'Healthy friendships are built on respect, communication and understanding. It is okay for people to have different opinions, interests and boundaries.',
      },
      {
        title: 'Setting boundaries',
        text: 'A boundary helps communicate what you are comfortable with. You can respectfully say no when something does not feel right for you.',
      },
      {
        title: 'Dealing with loneliness',
        text: 'Feeling lonely can happen even when other people are around. Small steps such as talking to someone, joining an activity or reconnecting with a friend can help.',
      },
      {
        title: 'Helpful steps',
        items: [
          'Communicate honestly and respectfully.',
          'Respect your own boundaries and those of others.',
          'Spend time with people who make you feel supported.',
          'Do not feel pressured to please everyone.',
          'Reach out when you need support.',
        ],
      },
    ],
  },

  money: {
    label: 'Student Life',
    title: 'Money & Student Life',
    description:
      'Information and practical ideas for handling financial pressure, budgeting and common student-life concerns.',
    sections: [
      {
        title: 'Understanding student finances',
        text: 'Managing money can feel difficult when there are many expenses. Knowing where your money goes can make financial decisions easier.',
      },
      {
        title: 'Create a simple budget',
        text: 'Start by listing your regular income and essential expenses. Then identify flexible spending that you can adjust when needed.',
      },
      {
        title: 'Avoid unnecessary financial stress',
        text: 'You do not need a complicated system. A simple record of your spending can help you notice patterns and make better decisions.',
      },
      {
        title: 'Helpful steps',
        items: [
          'Track your regular expenses.',
          'Separate essential and optional spending.',
          'Plan for upcoming expenses.',
          'Avoid spending impulsively when possible.',
          'Ask a trusted person for help with difficult financial decisions.',
        ],
      },
    ],
  },

  support: {
    label: 'Support & Help',
    title: 'Finding Support',
    description:
      'Understand when reaching out may help and explore ways to find trusted people and professional support.',
    sections: [
      {
        title: 'You do not have to handle everything alone',
        text: 'When problems become difficult to manage, talking to someone you trust can be an important first step.',
      },
      {
        title: 'Who can you talk to?',
        text: 'Depending on the situation, you might talk to a trusted friend, family member, teacher, college staff member, counsellor or another trusted adult.',
      },
      {
        title: 'When to seek additional help',
        text: 'If something is seriously affecting your everyday life or feels too difficult to manage on your own, consider reaching out to a qualified professional or an appropriate support service.',
      },
      {
        title: 'Helpful steps',
        items: [
          'Choose someone you trust.',
          'Explain what you are dealing with honestly.',
          'Ask for practical help when you need it.',
          'Use college or community support services when available.',
          'Remember that asking for help is a valid step.',
        ],
      },
    ],
  },

  sleep: {
    label: 'Sleep & Well-being',
    title: 'Sleep & Rest',
    description:
      'Practical ideas for building healthier sleep routines, getting enough rest and understanding the importance of recovery.',
    sections: [
      {
        title: 'Why sleep matters',
        text: 'Good sleep supports concentration, learning, mood and everyday functioning. Regular rest can make it easier to manage academic and personal responsibilities.',
      },
      {
        title: 'Build a consistent routine',
        text: 'Try to keep your sleep and wake times reasonably consistent. A predictable routine can help your body recognise when it is time to rest.',
      },
      {
        title: 'Create a better sleep environment',
        text: 'Keep your sleeping space comfortable and reduce distractions when possible. Limiting stimulating activities close to bedtime may also help.',
      },
      {
        title: 'Helpful habits',
        items: [
          'Keep a regular sleep schedule.',
          'Reduce unnecessary screen use before bed.',
          'Avoid studying in bed when possible.',
          'Give yourself enough time to rest.',
          'Talk to a trusted person or professional if sleep problems persist.',
        ],
      },
    ],
  },

  confidence: {
    label: 'Confidence & Well-being',
    title: 'Confidence & Self-Esteem',
    description:
      'Practical ways to develop self-confidence, recognise your strengths and handle self-doubt.',
    sections: [
      {
        title: 'Understanding self-esteem',
        text: 'Self-esteem is influenced by how you view yourself, your experiences and the way you respond to successes and setbacks.',
      },
      {
        title: 'Focus on progress',
        text: 'Confidence can grow through small experiences of learning and improvement. Notice the skills you are developing rather than expecting yourself to be perfect.',
      },
      {
        title: 'Handle self-doubt',
        text: 'Everyone experiences uncertainty sometimes. When self-doubt appears, try to look at the situation realistically and focus on what you can do next.',
      },
      {
        title: 'Helpful steps',
        items: [
          'Recognise your strengths and achievements.',
          'Set small achievable goals.',
          'Learn from mistakes instead of defining yourself by them.',
          'Spend time with supportive people.',
          'Challenge unrealistic expectations of yourself.',
        ],
      },
    ],
  },

  habits: {
    label: 'Health & Well-being',
    title: 'Healthy Habits',
    description:
      'Simple guidance for building balanced routines around daily activities, movement, nutrition, rest and personal well-being.',
    sections: [
      {
        title: 'Start with small changes',
        text: 'Healthy routines are easier to maintain when changes are realistic. Choose a few habits that fit your daily schedule instead of trying to change everything at once.',
      },
      {
        title: 'Keep a balanced routine',
        text: 'A balanced routine can include regular meals, movement, sleep, study time, relaxation and time with supportive people.',
      },
      {
        title: 'Consistency matters',
        text: 'Missing a day does not mean you have failed. Focus on returning to your routine and making gradual progress.',
      },
      {
        title: 'Helpful habits',
        items: [
          'Keep regular daily routines.',
          'Eat regular, balanced meals.',
          'Include comfortable physical activity in your day.',
          'Make time for adequate rest.',
          'Stay connected with supportive people.',
        ],
      },
    ],
  },
}

function ResourceGuide({ type }: Props) {
  const resource = resourceData[type]

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            {resource.label}
          </p>

          <h1 className="mb-4 text-4xl font-bold text-slate-900">
            {resource.title}
          </h1>

          <p className="mb-10 text-lg leading-8 text-slate-600">
            {resource.description}
          </p>

          <div className="space-y-8">
            {resource.sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                  {section.title}
                </h2>

                {section.text && (
                  <p className="leading-7 text-slate-600">
                    {section.text}
                  </p>
                )}

                {section.items && (
                  <ul className="list-disc space-y-2 pl-6 text-slate-600">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6">
            <Link
              to="/resources"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Back to Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourceGuide