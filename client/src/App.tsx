import React, { useState } from 'react';
import './App.css';
import './api/base'
import axios from 'axios';

function App() {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<'success' | 'error' | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const validateCard = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/card/validate', { cardNumber });
      const { valid } = response.data;

      setMessage(valid ? 'Card validated!' : 'Invalid Card');
      setType(valid ? 'success' : 'error');
      setIsVisible(true);

      // Start fade-out after 2.5 seconds
      setTimeout(() => {
        setIsVisible(false); // Triggers CSS fade-out
        setTimeout(() => {
          setMessage(null); // Removes the message after the fade
          setType(null);
        }, 500); // Match fade-out duration in CSS
      }, 2500);
    } catch {
      setMessage('Error validating card. Please try again.');
      setType('error');
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setMessage(null);
          setType(null);
        }, 500);
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="modal">
        <h3 className="modal-title">Credit Card Validator</h3>
        <p className="modal-subtitle">Please enter your credit card number below.</p>
        <div className="input-container">
          <input
            placeholder="Enter your credit card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            className="credit-input"
            disabled={loading} /* Disable input while loading */
          />
          <button
            onClick={validateCard}
            disabled={cardNumber.length < 13 || loading} /* Disable button while loading or if input is invalid */
            className="validate-btn"
          >
            {loading ? <span className="spinner"></span> : 'Submit'}
          </button>
        </div>

        <div className="response-message-container">
          <div className={`response-message ${type} ${isVisible ? 'visible' : ''}`}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
