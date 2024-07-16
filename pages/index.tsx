import { useState } from 'react';
import Home from './Home'; // Adjust the path according to your project structure

export default function IndexPage() {
  const [useTestAadhaar, setUseTestAadhaar] = useState(false);

  const switchAadhaar = () => {
    setUseTestAadhaar((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        minHeight: '100vh', // Ensures the background covers the entire viewport
        backgroundColor: '#f7fafc', // Fallback background color
      }}
    >
      <Home setUseTestAadhaar={setUseTestAadhaar} useTestAadhaar={useTestAadhaar} switchAadhaar={switchAadhaar} />
    </div>
  );
}
