export function convertPriceToCurrency(price: number) {
  const priceString = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    price
  );
  return priceString.replaceAll('.', ',');
}
