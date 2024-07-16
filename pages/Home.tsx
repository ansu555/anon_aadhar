import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import LoginPage from '../pages/LoginPage';
import ToggleSwitch from '../pages/ToggleSwitch';

type HomeProps = {
  setUseTestAadhaar: (state: boolean) => void;
  useTestAadhaar: boolean;
  switchAadhaar: () => void;
};

const Home: React.FC<HomeProps> = ({ setUseTestAadhaar, useTestAadhaar, switchAadhaar }) => {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const [fields, setFields] = useState({
    ageAbove18: true,
    gender: true,
    pinCode: true,
    state: true,
  });

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(anonAadhaar.status);
    }
  }, [anonAadhaar]);

  const handleMetaMaskConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsMetaMaskConnected(true);
      } catch (error) {
        console.error("MetaMask connection error:", error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  const toggleField = (field: keyof typeof fields) => {
    setFields((prevFields) => ({ ...prevFields, [field]: !prevFields[field] }));
  };

  if (!isMetaMaskConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <button
          onClick={handleMetaMaskConnect}
          type="button"
          className="rounded bg-blue-500 text-white px-4 py-2 mt-2 shadow hover:bg-blue-600 transition"
        >
          Connect MetaMask Wallet
        </button>
      </div>
    );
  }

  if (anonAadhaar.status !== "logged-in") {
    return <LoginPage />;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundColor: '#f7fafc', // Fallback background color
      }}
    >
      <motion.main
        className="flex flex-col items-center gap-8 bg-white rounded-2xl shadow-lg max-w-screen-sm mx-auto h-[24rem] md:h-[20rem] p-8 transition-transform transform hover:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-bold text-2xl text-gray-800">Welcome to Anon Aadhaar Example</h1>
        <p className="text-gray-600">Prove your Identity anonymously using your Aadhaar card.</p>

        <LogInWithAnonAadhaar nullifierSeed={1234} />

        <p className="text-gray-600">
          You&apos;re using the <strong>{useTestAadhaar ? "test" : "real"}</strong> Aadhaar mode
        </p>

        <button
          onClick={switchAadhaar}
          type="button"
          className="rounded bg-blue-500 text-white px-4 py-2 mt-2 shadow hover:bg-blue-600 transition"
        >
          Switch for {useTestAadhaar ? "real" : "test"}
        </button>
      </motion.main>
      <motion.div
        className="flex flex-col items-center gap-4 rounded-2xl shadow-lg bg-white max-w-screen-sm mx-auto p-8 transition-transform transform hover:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {anonAadhaar.status === "logged-in" && (
          <>
            <p className="text-green-500">✅ YOUR QR CODE IS VERIFIED!</p>
            <p className="text-gray-700">Data you are sharing to the current application:</p>
            <ToggleSwitch
              label="Age Above 18"
              isChecked={fields.ageAbove18}
              onChange={() => toggleField('ageAbove18')}
            />
            <ToggleSwitch
              label="Gender"
              isChecked={fields.gender}
              onChange={() => toggleField('gender')}
            />
            <ToggleSwitch
              label="PIN Code"
              isChecked={fields.pinCode}
              onChange={() => toggleField('pinCode')}
            />
            <ToggleSwitch
              label="State"
              isChecked={fields.state}
              onChange={() => toggleField('state')}
            />
            <p className="text-gray-500">No Aadhaar data ever leaves your device!</p>
            {latestProof && typeof latestProof === 'object' && (
              <AnonAadhaarProof
                code={JSON.stringify(latestProof, null, 2)}
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Home;
