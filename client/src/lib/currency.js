export const formatPhp = (value) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(value || 0);
