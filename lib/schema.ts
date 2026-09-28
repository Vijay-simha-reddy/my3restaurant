import { SITE_URL } from "./site";
import { dishes, filters, type CategoryId } from "./data";

// "veg"/"nonveg" are dietary tags, not physical menu sections — every dish also
// carries exactly one course tag (biryani/curries/starters/desserts/drinks), so
// intersecting against `filters` (minus "all") gives each dish exactly one section.
const menuSections = filters
  .filter((f): f is { id: CategoryId; label: string } => f.id !== "all")
  .map((f) => ({
    "@type": "MenuSection",
    name: f.label,
    hasMenuItem: dishes
      .filter((d) => d.cats.includes(f.id))
      .map((d) => ({
        "@type": "MenuItem",
        name: d.name,
        description: d.desc,
        offers: {
          "@type": "Offer",
          price: d.price,
          priceCurrency: "INR",
        },
      })),
  }));

/** Restaurant schema. Every field here must match the Google Business Profile exactly — Google cross-checks them. */
export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "MY3 Family Restaurant",
  url: SITE_URL,
  telephone: "+919010001484",
  image: [`${SITE_URL}/images/biryani-plate.jpg`, `${SITE_URL}/images/interior.jpg`],
  priceRange: "₹₹",
  servesCuisine: ["Indian", "Hyderabadi", "Biryani", "North Indian"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "2nd & 3rd Floor, 9-17, beside St. Joseph's English Medium School",
    addressLocality: "Gajwel",
    addressRegion: "Telangana",
    postalCode: "502278",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:30",
      closes: "00:00",
    },
  ],
  acceptsReservations: true,
  hasMenu: {
    "@type": "Menu",
    name: "MY3 Menu",
    url: `${SITE_URL}/#menu`,
    hasMenuSection: menuSections,
  },
};
