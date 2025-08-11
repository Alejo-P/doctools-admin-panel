import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import { AppProvider } from '@contexts/AppProvider'

import LoginPage from '@pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route index element={<LoginPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App