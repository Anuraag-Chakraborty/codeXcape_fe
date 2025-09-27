import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center team-info-panel p-8 rounded-xl">
        <h1 className="mb-4 text-6xl font-bold font-space text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">404</h1>
        <p className="mb-4 text-xl text-muted-foreground font-space">Portal Access Denied</p>
        <p className="mb-6 text-muted-foreground">The requested pathway does not exist in our system.</p>
        <Link 
          to="/" 
          className="cyber-button inline-flex items-center px-6 py-3 rounded-lg font-space tracking-wider transition-all duration-300"
        >
          RETURN TO HUB
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
