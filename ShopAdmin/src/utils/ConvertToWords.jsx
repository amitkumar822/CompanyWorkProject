// utils.js
import { ToWords } from 'to-words';

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    },
  },
});

export const convertToWords = (amount) => {
  const amountNumber = parseFloat(amount);
  if (!isNaN(amountNumber)) {
    return toWords.convert(amountNumber);
  } else {
    return 'Invalid number';
  }
};
