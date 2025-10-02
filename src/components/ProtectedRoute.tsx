
import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, loading, onboardingCompleted } = useAuth();
  const location = useLocation();
  
  // Don't render anything until authentication state is checked
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // If authenticated but onboarding not completed, redirect to onboarding
  // except for the onboarding page itself and auth page
  if (!onboardingCompleted && 
      !location.pathname.startsWith('/onboarding') && 
      !location.pathname.startsWith('/auth')) {
    return <Navigate to="/onboarding" replace />;
  }
  
  // User is authenticated and has completed onboarding
  return <Outlet />;
};

export default ProtectedRoute;
