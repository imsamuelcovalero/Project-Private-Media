/* File: src/helpers/formatCurrency.helper.jsx */
export default function formatCurrency(value) {
  const currencyOnString = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  const currency = `${currencyOnString}`;

  return currency;
}
