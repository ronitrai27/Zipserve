import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-primary to-secondary text-white">
      <motion.h1
        className="text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        404 - Not Found
      </motion.h1>
      <motion.p
        className="text-xl mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <motion.div
        className="text-4xl font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className="text-white text-5xl">Zip</span>
        <span className="text-white text-5xl">Serve</span>
      </motion.div>
      <motion.button
        className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        onClick={() => navigate("/")}
      >
        Go Back
      </motion.button>
    </div>
  );
};

export default NotFound;
