
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="inline-block text-primary hover:text-primary/80 underline">
            Return to Scanner
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;
