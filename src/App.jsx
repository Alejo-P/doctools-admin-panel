import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import { AppProvider } from '@contexts/AppProvider'
import { AuthProvider } from '@contexts/AuthProvider'
import { AdminProvider } from '@contexts/AdminProvider'

import LoginPage from '@pages/LoginPage'
import DashboardPage from '@pages/DashboardPage'
import UsersPage from '@pages/UsersPage'
import RolesPage from '@pages/RolesPage'
import AvatarPage from '@pages/AvatarPage'
import Auth from '@layouts/Auth'
import PrivateRoute from '@routes/PrivateRoute'
import Dashboard from '@layouts/Dashboard'
import AvatarDetailPage from '@pages/AvatarDetailPage'

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
                  <Route index element={<DashboardPage />} />
                  <Route path='users' element={<UsersPage />} />
                  <Route path='roles' element={<RolesPage />} />
                  <Route path='avatars' element={<AvatarPage />} />
                  <Route path='avatars/:id' element={<AvatarDetailPage />} />
                  <Route path='stats' element={<span>Estadísticas</span>} />
                  <Route path='*' element={<span>404 Not Found</span>} />
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