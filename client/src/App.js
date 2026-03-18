import React, { useState } from 'react';
import DiagnoseForm from './components/DiagnoseForm';
import ResultsDisplay from './components/ResultsDisplay';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDiagnosis = async (crop, symptoms) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crop, symptoms }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the diagnosis server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>🌾 Agricultural Expert System</h1>
        <p>Diagnose crop diseases and get expert treatment recommendations</p>
      </div>

      <div className="container">
        <div className="form-card">
          <DiagnoseForm onDiagnose={handleDiagnosis} loading={loading} />
        </div>

        <div>
          {error && <div className="error">{error}</div>}
          {loading && (
            <div className="card">
              <div className="loading">
                <div className="spinner"></div>
                <span>Analyzing symptoms...</span>
              </div>
            </div>
          )}
          {result && <ResultsDisplay result={result} />}
        </div>
      </div>
    </div>
  );
}

export default App;
