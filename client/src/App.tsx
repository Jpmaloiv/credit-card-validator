import React, { useState, useEffect } from 'react';
import './App.css';
import './api/base';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';


function App() {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<'success' | 'error' | null>(null);

  // Handles message fade timing
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const validateCard = async () => {
    // Prevents simultaneous requests
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post('/card/validate', { cardNumber });
      const { valid } = response.data;

      setMessage(valid ? 'Card validated!' : 'Invalid Card');
      setType(valid ? 'success' : 'error');
    } catch {
      setMessage('Error validating card. Please try again.');
      setType('error');
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
            disabled={loading}
          />
          <button
            onClick={validateCard}
            disabled={cardNumber.length < 13 || loading}
            className="validate-btn"
          >
            {loading ? <span className="spinner"></span> : 'Submit'}
          </button>
        </div>

        <div className="response-message-container">
          <AnimatePresence>
            {message && (
              <motion.div
                key="response-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className={`response-message ${type}`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
