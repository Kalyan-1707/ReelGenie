import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * Handles rendering a 404 page when a user attempts to access a non-existent route.
 * The component logs a console error with the attempted route's path and displays a
 * basic 404 page with a link to return to the home route.
 *
 * @returns {JSX.Element}
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
