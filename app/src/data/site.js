// Single source of truth for business info
export const SITE = {
  name: 'Protein Tadka',
  tagline: 'Built on Protein. Powered by Tadka.',
  phone: '+91 98765 43210',
  phoneRaw: '+919876543210',
  wa: '919876543210',
  email: 'hello@proteintadka.in',
  addr: 'Shop 24, Ground Floor, Hudson Lane, GTB Nagar, New Delhi 110009',
  insta: 'https://www.instagram.com/proteintadkaco',
  instaHandle: '@proteintadkaco',
  hours: 'Mon–Sun · 11:00 AM – 11:30 PM',
  areas: 'GTB Nagar & North Delhi',
  freeDeliveryAbove: 599,
  deliveryFee: 39,
};

export const money = (n) => '₹' + Number(n).toLocaleString('en-IN');

export const waLink = (msg = '') =>
  `https://wa.me/${SITE.wa}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;
