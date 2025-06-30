import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-900 text-slate-100">
    <h1 className="text-5xl font-bold mb-4">404 – Page Not Found</h1>
    <Link
      to="/"
      className="mt-2 text-lg text-blue-400 hover:underline hover:text-blue-300 transition"
    >
      Go home
    </Link>
  </div>
);

export default NotFound; 