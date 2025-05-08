
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-keysai-accent mb-4">404</h1>
      <p className="text-xl text-keysai-textBody mb-8">Oops! Page not found</p>
      <p className="text-keysai-textBody max-w-md text-center mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button className="bg-keysai-accent hover:bg-blue-600">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
