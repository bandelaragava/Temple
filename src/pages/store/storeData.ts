export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  emoji: string;
  gradient: string;
  shortDesc: string;
  description: string;
  badge?: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  image?: string;
}

export interface CartItem extends Product {
  qty: number;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Items', emoji: '🛕', color: '#800000' },
  { id: 'prasadam', label: 'Prasadam', emoji: '🍬', color: '#FF9933' },
  { id: 'pooja', label: 'Pooja Items', emoji: '🪔', color: '#D4AF37' },
  { id: 'books', label: 'Spiritual Books', emoji: '📖', color: '#5C3317' },
  { id: 'idols', label: 'Idols & Photos', emoji: '🙏', color: '#800000' },
  { id: 'donation', label: 'Donation Kits', emoji: '💝', color: '#C0392B' },
  { id: 'special', label: 'Special Seva', emoji: '⭐', color: '#B8860B' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1, name: 'Govinda Raja Swamy Laddu Prasadam', price: 59, originalPrice: 101,
    category: 'prasadam', emoji: '🍬',
    gradient: 'linear-gradient(135deg,#FF9933,#FFB366)',
    shortDesc: 'Sacred Laddu from the main sanctum',
    description: 'Freshly prepared sacred Laddu Prasadam blessed in the inner sanctum of Sri Govindha Raja Swamy temple. Each box contains 5 pieces of handmade Laddu, offering the divine blessings of Lord Govinda.',
    badge: 'Temple Blessed', inStock: true, rating: 4.8, reviews: 312,
    image: '/assets/store/laddu.png'
  },
  {
    id: 2, name: 'Govinda Raja Swamy Pulihora', price: 49,
    category: 'prasadam', emoji: '🍚',
    gradient: 'linear-gradient(135deg,#FFF9F0,#FFD580)',
    shortDesc: 'Traditional tamarind rice prasadam',
    description: 'Authentic Pulihora (Tamarind Rice) prepared daily by temple priests. Known for its unique divine taste, it is offered to Lord Govinda Raja Swamy before being distributed to devotees.',
    inStock: true, rating: 4.6, reviews: 198,
    image: '/assets/store/pulihora.png'
  },
  {
    id: 3, name: 'Govinda Raja Swamy Pooja Kit', price: 499, originalPrice: 650,
    category: 'pooja', emoji: '🪔',
    gradient: 'linear-gradient(135deg,#D4AF37,#F7EF8A)',
    shortDesc: 'Complete pooja essentials for Lord Govinda',
    description: 'Everything you need for a complete home pooja: brass diya, premium agarbatti, kumkum, turmeric, sacred tulsi mala, and a small idol of Lord Govinda Raja Swamy. Packaged in a beautiful wooden box.',
    badge: 'Best Seller', inStock: true, rating: 4.3, reviews: 445,
    image: '/assets/store/pooja_kit.png'
  },
  {
    id: 4, name: 'Sanku Chakra Namalu Brass Diyas', price: 299,
    category: 'pooja', emoji: '🏺',
    gradient: 'linear-gradient(135deg,#B8860B,#DAA520)',
    shortDesc: 'Brass diyas with Vishnu symbols',
    description: 'Set of 5 traditional brass diyas, intricately engraved with the sacred Sanku, Chakra, and Namalu of Lord Vishnu. Perfect for your daily prayers and aarti.',
    inStock: true, rating: 4.1, reviews: 287,
    image: '/assets/store/brass_diyas.png'
  },
  {
    id: 5, name: 'Sri Venkateswara Suprabhatam (Book & Audio)', price: 199, originalPrice: 250,
    category: 'books', emoji: '📖',
    gradient: 'linear-gradient(135deg,#800000,#B02B2B)',
    shortDesc: 'Sacred morning hymns with meaning',
    description: 'A beautifully printed edition of the Sri Venkateswara Suprabhatam, complete with Sanskrit text, Telugu transliteration, and detailed meanings. Includes a digital audio download link.',
    badge: 'New Edition', inStock: true, rating: 4.3, reviews: 521,
    image: '/assets/store/suprabhatam.png'
  },
  {
    id: 6, name: 'Sri Govinda Nama Sankeertana Book', price: 349,
    category: 'books', emoji: '📚',
    gradient: 'linear-gradient(135deg,#5C3317,#8B4513)',
    shortDesc: 'Collection of divine songs and chants',
    description: 'A comprehensive collection of Annamacharya Keertanas and other sacred hymns dedicated to Lord Govinda. Hardbound edition with clear Telugu script and explanations.',
    inStock: true, rating: 4.3, reviews: 203,
    image: '/assets/store/suprabhatam.png'
  },
  {
    id: 7, name: 'Sri Govindha Raja Swamy Brass Idol', price: 1499, originalPrice: 1800,
    category: 'idols', emoji: '🙏',
    gradient: 'linear-gradient(135deg,#B8860B,#FFD700)',
    shortDesc: 'Handcrafted 6" reclining posture idol',
    description: 'A beautifully crafted 6-inch brass idol depicting Sri Govindha Raja Swamy in His iconic reclining (Anantha Sayanam) posture. Consecrated at the temple before shipping.',
    badge: 'Temple Consecrated', inStock: true, rating: 4.9, reviews: 178,
    image: 'https://tse4.mm.bing.net/th/id/OIP.CxLgp9Sk4vw72XIUwfUtDAHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 8, name: 'Framed Govindha Raja Swamy Photo', price: 599,
    category: 'idols', emoji: '🖼️',
    gradient: 'linear-gradient(135deg,#FF9933,#D4AF37)',
    shortDesc: 'High-resolution framed temple deity art',
    description: 'A stunning 12x16 inch framed photograph of the main deity, Sri Govindha Raja Swamy, adorned in full alankaram. Mounted in a premium gilded frame.',
    inStock: true, rating: 4.2, reviews: 334,
    image: '/FramedGovindhaRajaSwamiPhoto.png'
  },
  {
    id: 9, name: 'Nitya Annadanam Seva Contribution', price: 1001,
    category: 'donation', emoji: '💝',
    gradient: 'linear-gradient(135deg,#C0392B,#E74C3C)',
    shortDesc: 'Support daily food distribution',
    description: 'Your contribution supports the Nitya Annadanam program, providing free meals to visiting devotees. You will receive a blessed prasadam box and your name will be included in the daily sankalpam.',
    badge: 'Punya Seva', inStock: true, rating: 4.7, reviews: 89,
    image: 'https://www.dagadevelopers.com/media/blog/full/2024/6/666d438e9ecb6_1718436750.webp'
  },
  {
    id: 10, name: 'Kalyanotsavam Seva Sponsor', price: 4001,
    category: 'donation', emoji: '👑',
    gradient: 'linear-gradient(135deg,#B8860B,#FFD700)',
    shortDesc: 'Sponsor the divine marriage ritual',
    description: 'Sponsor the celestial wedding (Kalyanotsavam) of Lord Govinda Raja Swamy and His consorts. Donors receive special vastram (clothes), maha prasadam, and VIP darshan access for a family of four.',
    badge: 'Gold Seva', inStock: true, rating: 4.9, reviews: 42,
    image: '/assets/annual_brahmotsavam.png'
  },
  {
    id: 11, name: 'Brahmotsavam Special Hamper', price: 2999, originalPrice: 3501,
    category: 'special', emoji: '🎁',
    gradient: 'linear-gradient(135deg,#FF9933,#800000)',
    shortDesc: 'Exclusive Annual Brahmotsavam kit',
    description: 'A limited edition hamper released during the Annual Brahmotsavam. Includes special laddu, vastram from the deity, a silver coin, and a beautifully illustrated Brahmotsavam guide.',
    badge: '🎉 Festival Special', inStock: true, rating: 4.1, reviews: 67,
    image: '/assets/store/BrahmotsavamSpecialHamper.png'
  },
  {
    id: 12, name: 'Tulsi Mala (108 beads)', price: 599,
    category: 'special', emoji: '📿',
    gradient: 'linear-gradient(135deg,#5C3317,#FF9933)',
    shortDesc: 'Authentic Tulsi mala, temple-blessed',
    description: 'An authentic 108-bead Tulsi mala, essential for chanting Lord Vishnu/Govinda mantras. Each mala is kept at the lotus feet of the deity for blessings before being sent to you.',
    badge: 'Limited Stock', inStock: true, rating: 4.0, reviews: 156,
    image: '/assets/store/TulsiMala.png'
  },
];
