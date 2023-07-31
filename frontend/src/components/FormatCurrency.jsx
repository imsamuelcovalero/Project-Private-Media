// cria e exporta a função formatCurrency
export default function formatCurrency(value) {
  const currencyOnString = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  const currency = `${currencyOnString}`;

  return currency;
}
