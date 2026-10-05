// Full menu — 24 dishes across 5 categories
export const CATEGORIES = {
  bowls: { id: 'bowls', label: 'Protein Chicken Bowls', short: 'Chicken Bowls', kind: 'chicken',
    blurb: '100% boneless chicken breast, 150g & 200g portions, sautéed in house masalas. 42–60g protein per bowl.' },
  mac: { id: 'mac', label: 'The Tadka Mac Series', short: 'Mac Series', kind: 'chicken',
    blurb: 'High-protein comfort food with 150g cooked chicken and no heavy cream. 50–52g protein per bowl.' },
  salads: { id: 'salads', label: 'Lean Chicken Salads', short: 'Chicken Salads', kind: 'chicken',
    blurb: 'Fresh crisp greens with in-house dressings and zero seed oils. 45g protein per bowl.' },
  tofu: { id: 'tofu', label: 'Protein Tofu Bowls', short: 'Tofu Bowls', kind: 'veg',
    blurb: '200g of fresh tofu in every bowl, golden-grilled and marinated. 30–34g protein, 100% pure veg.' },
  'tofu-salads': { id: 'tofu-salads', label: 'Protein Tofu Salads', short: 'Tofu Salads', kind: 'veg',
    blurb: 'Five fresh tofu salads over crisp greens with bold dressings. 100% pure veg.' },
};

export const CATEGORY_ORDER = ['bowls', 'mac', 'salads', 'tofu', 'tofu-salads'];

export const MENU = [
  // ---- Protein Chicken Bowls ----
  { id: 'og-power-bowl', name: 'The OG Power Bowl', cat: 'bowls', kind: 'chicken', tag: 'Best Seller', protein: 45, kcal: 550, price: 269, img: 'bowl-og.webp',
    desc: 'Grilled chicken breast, basmati rice, broccoli, bell peppers, sweet corn, carrots, pickled onions, signature sauce & fresh herbs.' },
  { id: 'cali-fire-bowl', name: 'Cali Fire Bowl', cat: 'bowls', kind: 'chicken', tag: 'Hot', protein: 45, kcal: 570, price: 279, img: 'bowl-cali.webp',
    desc: 'Peri-peri grilled chicken, cilantro lime rice, black beans, sweet corn, pico de gallo, lettuce, jalapeños & smoky chipotle yogurt.' },
  { id: 'smoky-tandoori-bowl', name: 'Smoky Tandoori Bowl', cat: 'bowls', kind: 'chicken', tag: 'Flame', protein: 45, kcal: 540, price: 279, img: 'bowl-tandoori.webp',
    desc: 'Smoky tandoori chicken, jeera rice, broccoli, grilled bell peppers, cucumber, pickled onions & mint yogurt dressing.' },
  { id: 'creamy-afghani-bowl', name: 'Creamy Afghani Protein Bowl', cat: 'bowls', kind: 'chicken', tag: 'Special', protein: 45, kcal: 595, price: 289, img: 'bowl-afghani.webp',
    desc: 'Creamy Afghani-marinated chicken, garlic herb rice, grilled vegetables, caramelised onions & mint yogurt sauce.' },
  { id: 'seoul-bbq-bowl', name: 'Seoul BBQ Bowl', cat: 'bowls', kind: 'chicken', tag: 'Korean', protein: 45, kcal: 565, price: 289, img: 'bowl-seoul.webp',
    desc: 'Korean-style BBQ chicken, sesame rice, kimchi, cucumber, edamame, carrots, sesame seeds & gochujang mayo.' },

  // ---- Tadka Mac Series ----
  { id: 'tandoori-fuel-mac', name: 'Tandoori Fuel Mac', cat: 'mac', kind: 'chicken', tag: 'Clean Fuel', protein: 50, kcal: 550, price: 299, img: 'mac-tandoori.webp',
    desc: 'Tandoori chicken mac, no cheese, all protein. Clean, wholesome fuel with zero heavy cream.' },
  { id: 'tikka-tadka-mac', name: 'Tikka Tadka Cheese Mac', cat: 'mac', kind: 'chicken', tag: 'Classic', protein: 52, kcal: 600, price: 329, img: 'mac-tikka.webp',
    desc: 'Chicken tikka in a creamy cheese sauce. Classic, bold, packed with 52g protein and no heavy cream.' },
  { id: 'peri-peri-mac', name: 'Peri Peri Punch Mac', cat: 'mac', kind: 'chicken', tag: 'Fiery', protein: 52, kcal: 590, price: 329, img: 'mac-peri.webp',
    desc: 'Peri-peri chicken with a spicy cheesy kick. Fiery, creamy & delicious with 52g protein.' },
  { id: 'makhani-melt-mac', name: 'Makhani Melt Mac', cat: 'mac', kind: 'chicken', tag: 'Premium Pick', protein: 52, kcal: 610, price: 339, img: 'mac-makhani.webp',
    desc: 'Makhani sauce, melted cheese & juicy chicken. Rich, authentic taste without the guilt.' },
  { id: 'mexican-masala-mac', name: 'Mexican Masala Mac', cat: 'mac', kind: 'chicken', tag: 'Fusion', protein: 51, kcal: 620, price: 339, img: 'mac-mexican.webp',
    desc: 'Mexican spices, sweet corn, bell peppers & cheesy goodness loaded with 150g tender chicken.' },

  // ---- Lean Chicken Salads ----
  { id: 'farmer-salad', name: 'The Farmer Salad', cat: 'salads', kind: 'chicken', tag: 'Fresh & Lean', protein: 45, kcal: 490, price: 199, img: 'salad-farmer.webp',
    desc: 'Mixed greens, grilled chicken breast, cucumber, cherry tomatoes, bell peppers, sweet corn, olives, onions & lemon olive oil dressing.' },
  { id: 'hulk-salad', name: 'The Hulk Salad', cat: 'salads', kind: 'chicken', tag: 'Super High Protein', protein: 45, kcal: 510, price: 209, img: 'salad-hulk.webp',
    desc: 'Mixed greens, creamy grilled chicken, broccoli, capsicum, cucumber, edamame & mint yogurt dressing.' },
  { id: 'chicken-crunch-salad', name: 'Chicken Crunch Salad', cat: 'salads', kind: 'chicken', tag: 'Crunch', protein: 45, kcal: 515, price: 209, img: 'salad-crunch.webp',
    desc: 'Mixed greens, peri-peri grilled chicken, sweet corn, bell peppers, cherry tomatoes, cucumber, crunchy seeds & vinaigrette.' },
  { id: 'herbed-chicken-salad', name: 'Herbed Grilled Chicken Salad', cat: 'salads', kind: 'chicken', tag: 'Herbed', protein: 45, kcal: 490, price: 209, img: 'salad-herbed.webp',
    desc: 'Mixed greens, herbed grilled chicken, carrot, grilled bell peppers, cucumber, onions & herb mayo dressing.' },

  // ---- Protein Tofu Bowls (Pure Veg) ----
  { id: 'tofu-masala-bowl', name: 'Tofu Masala Bowl', cat: 'tofu', kind: 'veg', tag: 'New', protein: 32, kcal: 560, price: 289, img: 'tofu-masala.webp',
    desc: 'Masala tofu, basmati rice, sautéed veggies, house masala & desi tadka sauce.' },
  { id: 'punjabi-tadka-bowl', name: 'Punjabi Tadka Bowl', cat: 'tofu', kind: 'veg', tag: 'Bestseller', protein: 33, kcal: 575, price: 289, img: 'tofu-punjabi.webp',
    desc: 'Tadka tofu, basmati rice, sautéed veggies, punjabi masala & in-house sauce.' },
  { id: 'achari-tofu-bowl', name: 'Achari Tofu Bowl', cat: 'tofu', kind: 'veg', tag: 'Popular', protein: 31, kcal: 550, price: 289, img: 'tofu-achari.webp',
    desc: 'Achari spiced tofu, basmati rice, sautéed veggies & achari masala.' },
  { id: 'desi-tandoori-bowl', name: 'Desi Tandoori Bowl', cat: 'tofu', kind: 'veg', tag: 'Smoky', protein: 33, kcal: 545, price: 289, img: 'tofu-tandoori.webp',
    desc: 'Tandoori tofu, basmati rice, sautéed veggies, mint chutney & in-house sauce.' },
  { id: 'butter-gravy-tofu-bowl', name: 'Butter Gravy Tofu Bowl', cat: 'tofu', kind: 'veg', tag: 'Creamy', protein: 30, kcal: 580, price: 299, img: 'tofu-butter.webp',
    desc: 'Creamy butter gravy tofu, basmati rice, sautéed veggies & butter gravy.' },

  // ---- Protein Tofu Salads (Pure Veg) ----
  { id: 'garden-tofu-salad', name: 'Fresh Garden Tofu Salad', cat: 'tofu-salads', kind: 'veg', tag: 'Lean & Fresh', protein: 30, kcal: 320, price: 229, img: 'tsalad-garden.webp',
    desc: 'Tofu, mixed greens, cucumber, tomato, sweet corn & lemon vinaigrette.' },
  { id: 'herby-green-tofu-salad', name: 'Herby Green Tofu Salad', cat: 'tofu-salads', kind: 'veg', tag: "Chef's Pick", protein: 32, kcal: 340, price: 239, img: 'tsalad-herby.webp',
    desc: 'Herb-marinated tofu, mixed greens, bell peppers, broccoli & herb dressing.' },
  { id: 'tofu-tikka-crunch-salad', name: 'Tofu Tikka Crunch Salad', cat: 'tofu-salads', kind: 'veg', tag: 'High Fiber', protein: 31, kcal: 350, price: 239, img: 'tsalad-tikka.webp',
    desc: 'Tikka tofu, mixed greens, onions, capsicum, roasted seeds & mint dressing.' },
  { id: 'tandoori-tofu-salad', name: 'Tandoori Tofu Salad', cat: 'tofu-salads', kind: 'veg', tag: 'Fitness Favourite', protein: 33, kcal: 345, price: 239, img: 'tsalad-tandoori.webp',
    desc: 'Tandoori tofu, crisp greens, grilled onions, capsicum & mint yogurt dressing.' },
  { id: 'pepper-garlic-tofu-salad', name: 'Pepper Garlic Tofu Salad', cat: 'tofu-salads', kind: 'veg', tag: 'Low Calorie', protein: 30, kcal: 330, price: 229, img: 'tsalad-pepper.webp',
    desc: 'Pepper garlic tofu, mixed greens, broccoli, zucchini, cherry tomato & balsamic dressing.' },
];

export const MENU_BY_ID = Object.fromEntries(MENU.map((m) => [m.id, m]));

export const PLANS = [
  { id: 'starter', name: 'Starter Pack', price: 1299, meals: 5, per: Math.round(1299 / 5),
    desc: 'Perfect for testing the waters or eating clean a couple of days a week.',
    features: ['5 protein meals of your choice', 'Mix chicken & tofu bowls freely', 'Free delivery on all 5 meals', 'Valid for 14 days', 'WhatsApp ordering support'] },
  { id: 'weekly', name: 'Weekly Warrior', price: 2199, meals: 10, per: Math.round(2199 / 10), featured: true,
    desc: 'Our most-loved plan. Built for people who train consistently and eat protein daily.',
    features: ['10 protein meals of your choice', 'Choose any 2 delivery days', 'Free delivery + priority kitchen slot', 'Save up to 18% vs. one-off orders', 'Pause, swap or skip anytime', 'Dedicated WhatsApp concierge'] },
  { id: 'monthly', name: 'Monthly Machine', price: 3999, meals: 20, per: Math.round(3999 / 20),
    desc: 'For the ones who never skip a meal. Maximum value, maximum convenience.',
    features: ['20 protein meals of your choice', 'Choose any 4 delivery days', 'Free delivery on every order', 'Save up to 26% vs. one-off orders', 'Priority customisation for macros', 'Monthly macro check-in with our team'] },
];

export const DELIVERY_AREAS = [
  ['GTB Nagar', '12–20 min', 'Within our home turf. Fastest delivery zone.'],
  ['Hudson Lane', '15–25 min', 'Regular daily slots, 11 AM and 7 PM batches.'],
  ['Model Town', '20–30 min', 'Free delivery on orders above ₹599.'],
  ['Kamla Nagar', '25–35 min', 'Neighbourhood kitchen zone near North Campus.'],
  ['Punjabi Bagh', '30–40 min', 'Wide coverage including Rajouri Garden side.'],
  ['Connaught Place', '30–45 min', 'Office lunch drops available on request.'],
];

export const TESTIMONIALS = [
  { initials: 'AR', name: 'Aditya R.', role: 'Strength Coach, GTB Nagar',
    quote: "I've tried every 'healthy' delivery in Delhi. Protein Tadka is the only one where the food tastes like actual desi cooking but still fits my macro plan. The OG Power Bowl is a weekly staple now." },
  { initials: 'SN', name: 'Sneha N.', role: 'Marathon Runner, Model Town',
    quote: "As a vegetarian, I'm used to getting the boring paneer option. The Punjabi Tadka Tofu Bowl has 33g protein and honestly tastes better than any paneer dish I've had delivered. Huge respect." },
  { initials: 'KM', name: 'Karthik M.', role: 'Powerlifter, Kamla Nagar',
    quote: "The Tikka Tadka Mac is dangerous. It tastes like a cheat meal, but it's 52g protein with no cream. I order it after every heavy leg day and never feel sluggish. Packaging is premium too." },
];

export const FAQ_GROUPS = [
  { title: 'Ordering & Delivery', items: [
    ['How do I place an order?', "The fastest way is WhatsApp — tap any \"Order Now\" button, build your cart and send it through. You can also call us directly. We'll confirm your address and start cooking immediately."],
    ['What is the minimum order value?', 'There\'s no minimum order value. Delivery is free on orders above ₹599; below that a flat ₹39 charge applies.'],
    ['How long will my order take?', 'Typical delivery is 35–50 minutes depending on your area and kitchen load. We cook to order, so this is real cooking time — not a pre-made heat-up.'],
    ['Can I schedule an order for later?', "Yes. Just tell us your preferred delivery window on WhatsApp when you order and we'll time the kitchen accordingly. This is especially useful for meal plans."],
    ['How do I track my order?', 'We message you twice on WhatsApp — once when your order enters the kitchen and again when it leaves for your address.'],
  ]},
  { title: 'Food & Ingredients', items: [
    ['What protein sources do you use?', '100% boneless chicken breast and fresh tofu. No minced or processed meat, no powders, no "protein boosters".'],
    ['Is the tofu really fresh?', "Yes. Every veg bowl contains a full 200g of fresh tofu, marinated and golden-grilled to order. It's never frozen or pre-portioned."],
    ['Do you use any seed oils or heavy cream?', 'Never. We cook in cold-pressed oils only and build all creamy sauces and dressings from yogurt and milk solids. No heavy cream, no industrial seed oils.'],
    ['How spicy is the food?', "Most dishes are medium. Peri Peri and Cali Fire lean hot; Afghani, Makhani and Herbed options are mild. Tell us your heat preference when ordering and we'll adjust."],
    ['Can I customise ingredients?', "Absolutely. You can request less rice, more greens, extra protein, no cheese, or a different sauce. Just add a note with your order."],
  ]},
  { title: 'Macros & Health', items: [
    ['Are the macros accurate?', 'Yes. We weigh every protein portion to the gram, so the protein and calorie numbers on the menu and on your box lid are what you actually receive.'],
    ['Can I fit this into a cutting diet?', 'Easily. Our lean salads are 320–515 kcal with 30–45g of protein. Many customers use the Farmer and Tofu salads as their cut-phase staples.'],
    ['Is this suitable for bulking?', 'Very. The mac series delivers 50–52g of protein and 550–620 kcal per bowl — ideal for a surplus. Pair a chicken bowl with a mac for a high-calorie high-protein day.'],
    ['Do you have low-carb options?', 'Yes. All our salads are naturally lower in carbohydrate. You can also ask for less rice in any bowl, replaced with extra greens.'],
  ]},
  { title: 'Plans & Payments', items: [
    ['How do meal plans work?', 'Choose a plan (5, 10 or 20 meals), tell us your delivery days, and pick your dishes each week. You save per meal and skip the daily decision-making entirely.'],
    ['Can I pause or cancel a plan?', "Yes, anytime, with no fees. Message us on WhatsApp and we'll pause or cancel your plan immediately."],
    ['What payment methods do you accept?', 'UPI, cards on delivery, and cash. For meal plans we usually set up UPI auto-pay or manual weekly transfer — whichever suits you.'],
    ['Do you offer bulk or corporate orders?', 'Yes. We handle gym bulk orders, office lunch runs and events. Message us with your headcount and date for a custom quote and bulk pricing.'],
  ]},
];

/* ============================================================
   Real client media — supplied by Protein Tadka Co.
   ============================================================ */

// The making-of film shown on the home page.
export const MAKING_VIDEO = {
  src: 'making-grill.mp4',
  poster: 'poster-making.jpg',
  badge: '60g+ protein · one bowl',
  caption: 'How a Protein Tadka bowl actually gets built',
  eyebrow: 'Behind The Pass',
  title: 'From Grill To Bowl In Minutes',
  lead: 'No stock footage, no food stylists. This is our kitchen at 7pm on a weekday — chicken weighed on the scale, vegetables prepped fresh, and the bowl assembled to order.',
  stats: [
    ['150g', 'Chicken weighed per bowl'],
    ['60g+', 'Protein in this build'],
    ['0', 'Seed oils used'],
  ],
  steps: [
    ['Marinate', 'Overnight in our house masala — no powders, no shortcuts.'],
    ['Grill', 'Chargrilled to order so the edges catch and the inside stays juicy.'],
    ['Weigh', 'Every portion goes on the scale before it goes in the bowl.'],
    ['Build', 'Rice, greens, pickles and sauce layered so it travels well.'],
  ],
};

// Real customer review clips.
export const REVIEW_VIDEOS = [
  {
    id: 'review-gym',
    video: 'review-gym.mp4',
    poster: 'poster-gym.jpg',
    badge: 'Post-workout',
    title: 'Straight from the gym floor',
    initials: 'VK',
    name: 'Vikram K.',
    role: 'Powerlifter',
    area: 'Model Town',
    lang: 'Filmed at his gym',
    quote: "I train six days a week and the hardest part was always eating enough protein without cooking twice a day. I pack a Protein Tadka bowl in my bag, eat it right after my session, and I'm done. The chicken is grilled properly — it doesn't taste like diet food, it tastes like something I'd actually order on a cheat day.",
  },
  {
    id: 'review-testimonial',
    video: 'review-testimonial.mp4',
    poster: 'poster-testimonial.jpg',
    badge: 'Full review',
    title: 'The full honest review',
    initials: 'AS',
    name: 'Arjun S.',
    role: 'Bodybuilding athlete',
    area: 'Kamla Nagar',
    lang: 'Spoken in Hindi',
    quote: "Main vegetarian hoon, so mujhe har jagah options nahi milte. Most places give you one sad paneer dish and call it a veg option. Yahan 200g tofu milta hai, properly marinated, aur taste bhi acha hai. Bahut jagah khaya, par jise taste aur protein dono ka compromise na karna pade — woh option yahi mila. Time bhi sabse best hai.",
  },
  {
    id: 'review-event',
    video: 'review-event.mp4',
    poster: 'poster-event.jpg',
    badge: 'Live event',
    title: 'Feeding the whole gym',
    initials: 'AF',
    name: 'Apex Fitness',
    role: 'Community partner',
    area: 'Jai Hind Road',
    lang: 'Protein Tadka Co × Apex Fitness',
    quote: "We partnered with Protein Tadka for a full community event — over a hundred bowls served hot, on time, and every single one weighed and labelled. Nobody had to ask what was in it. That's the part that matters when you're feeding athletes who read labels for a living.",
  },
];

// Roundel tagline used by the new badge lockup.
export const BRAND_BADGE = {
  top: 'Desi Fuel',
  main: 'Protein Tadka',
  sub: 'High Protein · Delhi',
};
