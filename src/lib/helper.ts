export function convertPriceToCurrency(price: number) {
  const priceString = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    price
  );
  return priceString.replaceAll('.', ',');
}

export const geturlextension = (url: string | undefined) => {
  if (!url) {
    return undefined;
  }
  return url.split(/[#?]/)[0].split('.').pop()?.trim();
};
