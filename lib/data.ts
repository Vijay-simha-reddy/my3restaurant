import type { StaticImageData } from "next/image";
import { img } from "./images";

/** Doors open 9:00 am, Oct 14 2026 (Gajwel is IST, UTC+5:30). */
export const OPENING_AT = "2026-10-14T09:00:00+05:30";

export function isOpenNow() {
  return Date.now() >= new Date(OPENING_AT).getTime();
}

export type CategoryId = "biryani" | "curries" | "starters" | "veg" | "nonveg" | "desserts" | "drinks";

export type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  rating: number;
  tag: string;
  cats: CategoryId[];
  image: StaticImageData;
  signature?: boolean;
};

export const dishes: Dish[] = [
  { id: "dum-biryani", name: "Hyderabadi Dum Biryani", desc: "Slow-sealed basmati, saffron, fried onions and tender marinated chicken.", price: 329, rating: 4.9, tag: "Signature", cats: ["biryani", "nonveg"], image: img.biryaniPlate, signature: true },
  { id: "pot-biryani", name: "Clay-Pot Veg Biryani", desc: "Garden vegetables and mint, dum-cooked in a sealed earthen handi.", price: 249, rating: 4.7, tag: "Chef's pick", cats: ["biryani", "veg"], image: img.biryaniPot, signature: true },
  { id: "paneer", name: "Paneer Butter Masala", desc: "Soft paneer in a silky tomato-cashew gravy finished with cream.", price: 279, rating: 4.8, tag: "Bestseller", cats: ["curries", "veg"], image: img.paneer, signature: true },
  { id: "butter-chicken", name: "Butter Chicken", desc: "Tandoor-smoked chicken folded into a rich, buttery makhani sauce.", price: 319, rating: 4.9, tag: "Bestseller", cats: ["curries", "nonveg"], image: img.butterChicken, signature: true },
  { id: "mutton", name: "Mutton Masala", desc: "Slow-braised mutton, roasted spices and a fistful of fresh coriander.", price: 389, rating: 4.8, tag: "Slow-cooked", cats: ["curries", "nonveg"], image: img.mutton, signature: true },
  { id: "samosa", name: "Crispy Samosa", desc: "Golden pastry, spiced potato and peas, mint and tamarind chutney.", price: 99, rating: 4.7, tag: "Starter", cats: ["starters", "veg"], image: img.samosa },
  { id: "tikka", name: "Tandoori Tikka Sizzler", desc: "Smoky char-grilled tikka on a hot skillet with peppers and onions.", price: 299, rating: 4.8, tag: "Sizzling", cats: ["starters", "nonveg"], image: img.tikka, signature: true },
  { id: "kebab", name: "Chicken Tikka Skewers", desc: "Yoghurt-marinated chicken grilled over live coals, served hot.", price: 289, rating: 4.8, tag: "Live grill", cats: ["starters", "nonveg"], image: img.kebabGrill },
  { id: "veg-curries", name: "Chef's Veg Curry Tray", desc: "Two seasonal veg curries with steamed basmati and fresh coriander.", price: 259, rating: 4.6, tag: "Vegetarian", cats: ["curries", "veg"], image: img.curries, signature: true },
  { id: "chicken-masala", name: "Chicken Masala", desc: "Home-style chicken curry with onion, tomato and ginger.", price: 269, rating: 4.7, tag: "Comfort", cats: ["curries", "nonveg"], image: img.chickenMasala },
  { id: "lamb-naan", name: "Lamb Curry & Naan", desc: "Rich lamb curry with butter naan hot off the tandoor.", price: 359, rating: 4.8, tag: "Breads", cats: ["curries", "nonveg"], image: img.lambNaan },
  { id: "thali", name: "Curry & Naan Thali", desc: "Two curries, dal, rice, papad and tandoori naan on one platter.", price: 349, rating: 4.7, tag: "Thali", cats: ["curries", "veg"], image: img.thali },
  { id: "mithai", name: "Signature Mithai Box", desc: "Hand-finished Indian sweets with pistachio, saffron and silver leaf.", price: 199, rating: 4.7, tag: "Dessert", cats: ["desserts", "veg"], image: img.mithai },
  { id: "cham-cham", name: "Malai Cham Cham", desc: "Soft, syrup-soaked sweet dumplings filled with thick cream.", price: 149, rating: 4.6, tag: "Dessert", cats: ["desserts", "veg"], image: img.chamCham },
  { id: "kulfi", name: "Berry Kulfi Pops", desc: "Slow-frozen milk kulfi ripple with sweet cherry and berries.", price: 129, rating: 4.5, tag: "Dessert", cats: ["desserts", "veg"], image: img.kulfi },
  { id: "lassi", name: "Fresh Mango Lassi", desc: "Alphonso mango blended with thick yoghurt and a pinch of cardamom.", price: 109, rating: 4.9, tag: "Cooler", cats: ["drinks"], image: img.lassi },
  { id: "chai", name: "Masala Chai", desc: "Assam tea simmered with ginger, cardamom and warm spices.", price: 59, rating: 4.6, tag: "Hot", cats: ["drinks"], image: img.chai },
  { id: "cooler", name: "Mango Cooler", desc: "Chilled mango and cream in a tall glass, sweet and refreshing.", price: 119, rating: 4.5, tag: "Cooler", cats: ["drinks"], image: img.mangoCooler },
];

export const filters: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "biryani", label: "Biryani" },
  { id: "curries", label: "Curries" },
  { id: "starters", label: "Starters" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export const categories: { id: CategoryId; name: string; blurb: string; image: StaticImageData; color: string }[] = [
  { id: "biryani", name: "Biryani", blurb: "Dum-cooked in sealed handis, layered with saffron.", image: img.biryaniPot, color: "#e8a417" },
  { id: "curries", name: "Curries", blurb: "Slow gravies from the north to the coast.", image: img.curries, color: "#c8341c" },
  { id: "starters", name: "Starters", blurb: "Crisp, smoky bites to begin the table.", image: img.samosaClose, color: "#8a9a2b" },
  { id: "veg", name: "Veg", blurb: "Paneer, seasonal vegetables and garden greens.", image: img.paneer, color: "#2f6b3f" },
  { id: "nonveg", name: "Non-Veg", blurb: "Live-grill kebabs, tikkas and slow mutton.", image: img.kebabGrill, color: "#0b2148" },
  { id: "desserts", name: "Desserts", blurb: "Mithai, kulfi and something sweet to finish.", image: img.mithai, color: "#d4577f" },
  { id: "drinks", name: "Drinks", blurb: "Lassis, chai and cooling summer sips.", image: img.lassi, color: "#f0b429" },
];

export const reviews = [
  { name: "Ananya R.", place: "Regular guest", text: "The biryani arrives sealed and the aroma when they open it is unreal. Easily the best dum in the city." },
  { name: "Karthik M.", place: "Family dinner", text: "Butter chicken, warm naan, and a mango lassi that tasted like actual mango. We're back every weekend." },
  { name: "Sneha P.", place: "Birthday table", text: "Beautiful room, quick service, and the mithai box was a lovely surprise for the table." },
  { name: "Imran S.", place: "Takeaway", text: "Ordered the tikka sizzler for six people. Still hot and smoky when I got home. Great packaging too." },
  { name: "Divya L.", place: "Lunch out", text: "The veg curry tray is generous and honest. Nothing heavy, everything fresh and properly spiced." },
];

export const marqueeItems = ["Hyderabadi Biryani", "Butter Chicken", "Tandoori Tikka", "Paneer Butter Masala", "Mutton Masala", "Mango Lassi", "Malai Mithai", "Masala Chai"];
