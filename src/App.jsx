import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import { AppProvider } from '@contexts/AppProvider'
import { AuthProvider } from '@contexts/AuthProvider'
import { AdminProvider } from '@contexts/AdminProvider'

import LoginPage from '@pages/LoginPage'
import Auth from '@layouts/Auth'
import PrivateRoute from '@routes/PrivateRoute'
import Dashboard from '@layouts/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <AdminProvider>
            <Routes>
              {/** Rutas publicas **/}
              <Route path='/' element={<Auth />} >
                <Route index element={<LoginPage />} />
              </Route>

              {/** Rutas privadas **/}
              <Route path='/dashboard' element={<PrivateRoute />} >
                <Route element={<Dashboard />} >
                  <Route index element={<span>Dashboard</span>} />
                </Route>
              </Route>
            </Routes>
          </AdminProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App