export default function formatCurrency(amount) {
  return priceFormatter.format(amount);
}

const priceFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});
