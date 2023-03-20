const formatPrice = (price: number) => {
  const priceString = price.toFixed(2).replace('.', ',');
  return `R$ ${priceString}`;
};
export default formatPrice;
