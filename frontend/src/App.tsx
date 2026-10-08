import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Resources from './pages/Resources/Resources'
import Support from './pages/Support/Support'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Information from './pages/Support/Information'
import TalkToSomeone from './pages/Support/TalkToSomeone'
import Profile from './pages/Profile'

import StressAndOverwhelm from './pages/Resources/StressAndOverwhelm'
import ResourceGuide from './pages/Resources/ResourcesGuide'
import CheckIn from './pages/CheckIn/CheckIn'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />

        <Route
          path="/resources/stress-and-overwhelm"
          element={<StressAndOverwhelm />}
        />

        <Route
          path="/resources/academic-pressure"
          element={<ResourceGuide type="academic" />}
        />

        <Route
          path="/resources/focus-and-productivity"
          element={<ResourceGuide type="focus" />}
        />

        <Route
          path="/resources/managing-change"
          element={<ResourceGuide type="change" />}
        />

        <Route
          path="/resources/relationships-and-friendship"
          element={<ResourceGuide type="relationships" />}
        />

        <Route
          path="/resources/money-and-student-life"
          element={<ResourceGuide type="money" />}
        />

        <Route
          path="/resources/finding-support"
          element={<ResourceGuide type="support" />}
        />

        <Route
          path="/resources/sleep-and-rest"
          element={<ResourceGuide type="sleep" />}
        />

        <Route
          path="/resources/confidence-and-self-esteem"
          element={<ResourceGuide type="confidence" />}
        />

        <Route
          path="/resources/healthy-habits"
          element={<ResourceGuide type="habits" />}
        />

        <Route path="/support" element={<Support />} />
        <Route path="/support/information" element={<Information />} />
        <Route path="/support/talk" element={<TalkToSomeone />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App