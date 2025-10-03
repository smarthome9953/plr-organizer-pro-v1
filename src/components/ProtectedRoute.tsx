
import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Don't render anything until authentication state is checked
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Only after loading is complete, decide whether to show the protected content or navigate away
  // Use the replace prop to replace instead of push to history stack
  return user ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default ProtectedRoute;
