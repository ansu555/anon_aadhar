// src/pages/LoginPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { LogInWithAnonAadhaar } from '@anon-aadhaar/react'; // Ensure this is correctly imported

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"
    style={{ backgroundImage: 'url("/background.jpg")', backgroundSize: 'cover' }}
    >
      <motion.div
        className="flex flex-col items-center gap-8 bg-white rounded-2xl shadow-lg max-w-screen-sm mx-auto p-8 transition-transform transform hover:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-bold text-2xl text-gray-800">Log In to Anon Aadhaar</h1>
        <p className="text-gray-600">Please log in using your Aadhaar card to continue.</p>
        
        <LogInWithAnonAadhaar nullifierSeed={1234} />
        
        <p className="text-gray-600">Your privacy is our priority.</p>
      </motion.div>
    </div>
  );
}

export default LoginPage;





