import './App.css'
import { BrowserRouter, Route } from 'react-router'
import { Routes } from 'react-router'
import Home from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import CategoryPage from './pages/category'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import ProfilePage from './pages/profile'
import DashboardPage from './pages/dashboard'

function App() {
  const { authData } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!authData.jwt;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/category"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App