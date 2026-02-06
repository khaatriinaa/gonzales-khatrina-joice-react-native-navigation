export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  description?: string;   // optional – you have it in some items
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Brooklyn Graphic Tee",
    price: 499,
    stock: 10,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT1UgCXuX_dA-PqgUdl0k6bf_bz0kVAplEsmlTIGEUb_JggyHdT3uifz_46fxkVN3REuQGaxyFDca7Z-B_w5jSWxmWPVE93Wg",
    description: `Street-inspired cotton tee with a relaxed fit.
- Lightweight and breathable
- Durable stitching for everyday wear
- Perfect for casual streetwear looks`,
  },
  {
    id: 2,
    name: "Winner Oversized Shirt",
    price: 729,
    stock: 15,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT71a2O9-zd8bNUnuAv8-KAal-Ul7La8B9AGuulvJVJgcNhoUaXBDh0P9XpgQZirHe8pThCoUnBr77b6ssPt49VUVrh6eoTrTAA_OvYB98maEvV8jsdA-aWXg",
    description: `Oversized shirt for a relaxed street style.
- Soft cotton fabric
- Roomy fit for layering
- Trendy graphic design detail`,
  },
  {
    id: 3,
    name: "Minimal Cotton Top",
    price: 599,
    stock: 5,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSRmwSOhMQ1sfjsEFIvJ9_bnvpnvMDPTD6pCRJiiP3tNXvXfY03-DO1R_AJrUygNO5E_10fmgtts1pS5jOnaKsUWzVV9LoA9qSXsY2E7VXOZMSn_0Kndf9Y",
    description: `Minimalist cotton top, perfect for casual wear.
- Soft and breathable fabric
- Timeless, simple design
- Easy to pair with jeans or skirts`,
  },
  {
    id: 4,
    name: "Classic White Tee",
    price: 399,
    stock: 2,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTE5ysQboNuXxtPPryF4o_6nZCweuZNwdto64-5EFAWrKPlB8bWzVBLUvuR15dWOHslnmnLcfBCpGf1XTEWgMWQBsKKhGDhr8wRcUWAbwvo0ewykM5ziaJkqQ",
    description: `Essential white tee for every wardrobe.
- Classic round neckline
- Soft cotton material
- Versatile and timeless piece`,
  },
  {
    id: 5,
    name: "Urban Black Shirt",
    price: 549,
    stock: 19,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRtEbBpBQajpBVM8LrBHwZqe_N_ExW8xcZdTLfkRlM_hyFq2P7bgV-mgYwoWKKumDnGcL2Q8nGVm14hUQfqObqq6scEJqMXfm30vh80yVVyJVcwVBskaSSV",
    description: `Sleek black shirt for urban style.
- Breathable cotton blend
- Slim fit cut
- Perfect for casual or semi-formal occasions`,
  },
  {
    id: 6,
    name: "Oversized Beige Tee",
    price: 679,
    stock: 16,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQSyiS9RYnb9pnx__J4KlaoyIKpCifmhIN9INFS79f79-qTqxzPa-8Vj1UHZpbxxqPhkXZqOpC1fFnzWwtB7og3jCgDfRBiL3cxcKG5eMkhfOYABYgYEqg-ln4",
    description: `Comfortable oversized beige tee.
- Soft cotton fabric
- Loose fit for ultimate comfort
- Neutral tone for versatile styling`,
  },
  {
    id: 7,
    name: "Streetwear Graphic Tee",
    price: 799,
    stock: 22,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRNVMuik4h4526ZAxRH7EivSkClaCFvGQhjiNrYM0cFO0nXupdaOB-NjfZnQS_gQX3Gj96ORfr3DC4lG5H9OmqONfCMkks34Upgw1R-IeoTTccoQEroU-8yFqsR",
    description: `Bold streetwear graphic tee.
- Premium cotton material
- Vibrant printed design
- Ideal for casual outings and layering`,
  },
  {
    id: 8,
    name: "Vintage Desk Lamp",
    price: 699,
    stock: 10,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYx_Ss3YcRjPBlFJO1dfoYrxC9DyH1LxmTSg&s",
    description: `Vintage-style desk lamp for ambient lighting.
- Adjustable neck and head
- Retro metal design
- Perfect for study or office desk`,
  },
  {
    id: 9,
    name: "Minimalist Wall Clock",
    price: 459,
    stock: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYph5Rc0yVgzoRd-StGQdDV7XCQ_SUISdsQ&s",
    description: `Minimalist wall clock with clean design.
- Silent quartz movement
- Easy-to-read markers
- Complements modern interiors`,
  },
  {
    id: 10,
    name: "Relaxed Cotton Throw Pillow",
    price: 529,
    stock: 6,
    image: "https://cb.scene7.com/is/image/Crate/RelaxWshCtVlv20inMoonPlwVNS26?$web_pdp_main_carousel_med$",
    description: `Soft cotton throw pillow for relaxation.
- Plush and comfortable
- Machine-washable cover
- Adds cozy charm to living spaces`,
  },
  {
    id: 11,
    name: "Goojodoq Mini Fan",
    price: 749,
    stock: 7,
    image: "https://down-ph.img.susercontent.com/file/cn-11134207-820l4-mhpysgsy6m8085",
    description: `Portable mini fan for personal cooling.
- USB rechargeable
- Lightweight and compact
- Adjustable wind speed settings`,
  },
  {
    id: 12,
    name: "iClever Wireless Bluetooth Mouse",
    price: 689,
    stock: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPm_OTtRPKePMDyowpfghTc_M6byP4miPFjA&s",
    description: `Ergonomic wireless Bluetooth mouse.
- Smooth optical tracking
- Long battery life
- Comfortable for daily use`,
  },
  {
    id: 13,
    name: "Earth Tone Ceramic Mug",
    price: 599,
    stock: 7,
    image: "https://static1.squarespace.com/static/5f3732ae06f04f5803ed1e7d/5f39db45e734c879bccc113f/6619abe5420b87505f01795c/1765580055859/DSCF0457.jpg?format=1500w",
    description: `Handcrafted ceramic mug in earthy tones.
- Durable and microwave safe
- Holds 350ml
- Ideal for coffee or tea lovers`,
  },
  {
    id: 14,
    name: "Aztrid Mini Hobo Bag",
    price: 629,
    stock: 10,
    image: "https://aztrid.com.ph/cdn/shop/collections/image.jpg?v=1711073407",
    description: `Compact and stylish mini hobo bag.
- Soft PU leather
- Adjustable strap for crossbody wear
- Perfect for casual outings`,
  },
  {
    id: 15,
    name: "Aquaflask Water Bottle",
    price: 499,
    stock: 5,
    image: "https://aquaflask.com/wp-content/uploads/2025/03/Support-KVMain-KV-001-1x1-1.jpg",
    description: `Durable and eco-friendly water bottle.
- Stainless steel, double-walled
- Keeps drinks cold or hot for hours
- Leak-proof cap for portability`,
  },
  {
    id: 16,
    name: "Premium Wireless Speaker",
    price: 899,
    stock: 5,
    image: "https://images.philips.com/is/image/philipsconsumer/eba76e5f4b4043f18b0cb0cc00817c74?wid=700&hei=700&$pnglarge$",
    description: `High-quality portable wireless speaker.
- Bluetooth connectivity
- Rich stereo sound
- Long battery life for outdoor use`,
  },
  {
    id: 17,
    name: "BELO Tinted Sunscreen",
    price: 769,
    stock: 8,
    image: "https://down-ph.img.susercontent.com/file/ph-11134207-7rasb-m40a1862h4hl7f",
    description: `Tinted sunscreen for daily protection.
- SPF 50+ broad-spectrum
- Lightweight and non-greasy
- Adds subtle tint for even skin tone`,
  },
  {
    id: 18,
    name: "Borussia Dortmund Digital Watch",
    price: 659,
    stock: 9,
    image: "https://s.alicdn.com/@sc04/kf/Hce8660ee11624fbea3bd6e3062cfa6e6u/New-Watches-C3-12-Football-Wrist-Watches-LED-Digital-for-Child-Sports-Watch-Electronic-Clock-Hodinky-Reloj-Hombre.png_300x300.jpg",
    description: `Official Borussia Dortmund digital watch.
- LED digital display
- Water-resistant
- Sporty design with team branding`,
  },
  {
    id: 19,
    name: "Orashare Powerbank 20000 mAh",
    price: 579,
    stock: 25,
    image: "https://ph-test-11.slatic.net/p/1448a5aa29d8c81c16422e1514f421f9.jpg",
    description: `High-capacity powerbank for all devices.
- 20000 mAh battery
- Dual USB output
- Compact and portable`,
  },
  {
    id: 20,
    name: "Pattern iPhone Phone Case",
    price: 150,
    stock: 35,
    image: "https://img.kwcdn.com/product/open/2023-06-20/1687275695277-1ced512503714feea1f7cabc491ce0b2-goods.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
    description: `Protective patterned phone case for iPhone.
- Shock-absorbent material
- Slim and lightweight
- Stylish printed design`,
  },
];
