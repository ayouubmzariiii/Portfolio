import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import AdminDashboard from '@/pages/AdminDashboard';
import Login from '@/pages/Login';
import { PortfolioProvider, usePortfolio } from '@/context/PortfolioContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = usePortfolio();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Layout><AdminDashboard /></Layout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <AppRoutes />
      </Router>
    </PortfolioProvider>
  );
}

export default App;
