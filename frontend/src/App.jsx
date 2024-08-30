import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/auth/Dashboard'
import Logout from './views/auth/Logout'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import StoreHeader from './views/base/StoreHeader'
import StoreFooter from './views/base/StoreFooter'
import MainWrapper from './layout/MainWrapper'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <StoreHeader />
      {/* <MainWrapper> */}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-new-password' element={<CreatePassword />} /> {/*path here must be must be same as the one provided in link of PasswordResetEmailVerify class backend/userauths/views.py*/}

        </Routes>
        <StoreFooter />
      {/* </MainWrapper> */}
    </BrowserRouter>
  )
}

export default App
