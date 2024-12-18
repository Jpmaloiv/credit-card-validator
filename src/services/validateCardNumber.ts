export const validateCardNumber = (cardNumber: string): boolean => {
    const len = cardNumber.length;
    let sum = 0;
  
    for (let i = len - 1; i >= 0; i--) {
      let num = Number(cardNumber[i]);
  
      // Double every second digit from the right
      if ((len - i) % 2 === 0) {
        num *= 2;
        if (num > 9) {
          // Adds both digits together
          num = Math.floor(num / 10) + (num % 10);
        }
      }
  
      sum += num;
    }
  
    // Check if sum ends in a 0
    return sum % 10 === 0;
  };
  