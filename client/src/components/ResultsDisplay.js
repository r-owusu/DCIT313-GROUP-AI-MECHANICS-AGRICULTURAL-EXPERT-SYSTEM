import React from 'react';

function ResultsDisplay({ result }) {
    if (!result) return null;

    return (
        <div className="results">
            <h2>💡 Diagnosis Result</h2>
            
            <div className="result-item">
                <div className="result-label">🦠 Disease Identified</div>
                <div className="result-content">{result.disease}</div>
            </div>
            
            <div className="result-item">
                <div className="result-label">💊 Recommended Treatment</div>
                <div className="result-content">{result.treatment}</div>
            </div>
            
            <div className="result-item">
                <div className="result-label">🛡️ Preventive Advice</div>
                <div className="result-content">{result.prevention}</div>
            </div>
            
            {result.explanation && (
                <div className="result-item">
                    <div className="result-label">📋 Reasoning</div>
                    <div className="result-content">{result.explanation}</div>
                </div>
            )}
        </div>
    );
}

export default ResultsDisplay;
