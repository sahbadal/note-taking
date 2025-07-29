import {Route, Routes} from 'react-router-dom'
import SignUp from './pages/SignUp.tsx'
import SignIn from './pages/SignIn.tsx'
import Dashboard from './pages/Dashboard.tsx'
import PrivateRoute from './routes/PrivateRoute.tsx'
import OAuthRedirect from './pages/OAuthRedirect.tsx'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/oauth-redirect" element={<OAuthRedirect />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
    </>
  )
}

export default App