import React, { useState } from 'react';
import { crops, symptoms as cropSymptoms } from '../data/symptoms';

function DiagnoseForm({ onDiagnose, loading }) {
    const [selectedCrop, setSelectedCrop] = useState(crops[0].value);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const handleCropChange = (e) => {
        setSelectedCrop(e.target.value);
        setSelectedSymptoms([]);
    };

    const handleSymptomChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedSymptoms([...selectedSymptoms, value]);
        } else {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onDiagnose(selectedCrop, selectedSymptoms);
    };

    const currentSymptoms = cropSymptoms[selectedCrop] || [];

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>🌱 Select Crop</label>
                <select value={selectedCrop} onChange={handleCropChange}>
                    {crops.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>🔍 Observed Symptoms</label>
                {currentSymptoms.length === 0 ? (
                    <div className="no-symptoms">No symptoms available for this crop.</div>
                ) : (
                    <>
                        <div style={{fontSize: '0.85rem', color: '#888', marginBottom: '12px'}}>
                            Select all symptoms you observe
                        </div>
                        <div className="symptoms-grid">
                            {currentSymptoms.map(symptom => (
                                <label key={symptom.value} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value={symptom.value}
                                        checked={selectedSymptoms.includes(symptom.value)}
                                        onChange={handleSymptomChange}
                                    />
                                    {symptom.label}
                                </label>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <button type="submit" disabled={loading || selectedSymptoms.length === 0}>
                {loading ? '⏳ Diagnosing...' : '🔬 Diagnose Disease'}
            </button>
        </form>
    );
}

export default DiagnoseForm;
