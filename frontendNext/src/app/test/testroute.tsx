
// components/SimpleTest.tsx
"use client"
import { useState } from 'react';

  console.log(process.env.NEXT_PUBLIC_BACK_URL + "kekfkekkek")
export default function SimpleTest() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const testGet = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/projects`);
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
    setLoading(false);
  };

  const testPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Project', description: 'Test Description' })
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Test</h1>
      <button onClick={testGet} disabled={loading}>
        Test GET /projects
      </button>
      <button onClick={testPost} disabled={loading} style={{ marginLeft: '10px' }}>
        Test POST /projects
      </button>
      
      {loading && <p>Loading...</p>}
      
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '10px', 
        marginTop: '20px',
        whiteSpace: 'pre-wrap'
      }}>
        {result}
      </pre>
    </div>
  );
}
