import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Clubs from './pages/Clubs';
import ClubDetail from './pages/ClubDetail';
import ClubApply from './pages/ClubApply';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Confirmation from './pages/Confirmation';
import Profile from './pages/Profile';
import ProfileSetup from './pages/ProfileSetup';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Main application component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Navbar />
          <div className="pt-2 min-h-[80vh]">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/clubs/:id" element={<ClubDetail />} />
              
              {/* Authentication routes with simpler redirect logic */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/confirmation" element={<Confirmation />} />
              
              {/* Profile setup (only for authenticated users with incomplete profiles) */}
              <Route path="/profile-setup" element={
                <ProtectedRoute requireAuth={true}>
                  <ProfileSetup />
                </ProtectedRoute>
              } />
              
              {/* Protected routes (require authentication) */}
              <Route path="/clubs/:id/apply" element={
                <ProtectedRoute requireAuth={true} requireProfileComplete={true}>
                  <ClubApply />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute requireAuth={true} requireProfileComplete={true}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute requireAuth={true} requireAdmin={true} requireProfileComplete={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/you" element={
                <ProtectedRoute requireAuth={true} requireProfileComplete={true}>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 