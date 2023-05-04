import React, { useState, useEffect } from "react";
import "../../styles/NotFound.scss";
function NotFound() {
  const watingTime = 3;
  const [countdown, setCountdown] = useState(watingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The requested page could not be found.</p>
      <p>Redirecting in {countdown} seconds...</p>
    </div>
  );
}

export default NotFound;
