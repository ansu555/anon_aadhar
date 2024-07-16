import MetaMaskButton from './MetaMaskButton';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";

type HomeProps = {
  setUseTestAadhaar: (state: boolean) => void;
  useTestAadhaar: boolean;
  switchAadhaar: () => void;
};

const Home: React.FC<HomeProps> = ({ setUseTestAadhaar, useTestAadhaar, switchAadhaar }) => {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(anonAadhaar.status);
    }
  }, [anonAadhaar]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <MetaMaskButton />
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
            <p className="text-green-500">✅ Proof is valid</p>
            <p>Got your Aadhaar Identity Proof</p>
            <p>Welcome anon!</p>
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
