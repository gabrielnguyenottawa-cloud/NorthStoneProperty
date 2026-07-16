// Adds secondary-market Ontario cities as UNPUBLISHED rows (published: false).
// They stay invisible on the live site until flipped at redesign launch.
// Run: node scripts/add-ontario-cities.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = [
  {
    name: "Sarnia",
    slug: "sarnia",
    latitude: 42.97,
    longitude: -82.4,
    intro:
      "From Bright's Grove to the south end, Sarnia homes come to us for all kinds of reasons: a retirement move, an inherited bungalow, a property that needs more work than it's worth listing. We buy houses anywhere in Sarnia-Lambton directly from the owner, in any condition, with a written cash offer within 24 hours and a closing date you choose.",
  },
  {
    name: "Sault Ste. Marie",
    slug: "sault-ste-marie",
    latitude: 46.52,
    longitude: -84.33,
    intro:
      "Selling a house in the Sault can take patience the situation doesn't always allow. Whether it's a family home on the east end, a rental you're done managing, or an estate property you're handling from out of town, we make a fair written cash offer within 24 hours and close on your schedule, as fast as 14 days.",
  },
  {
    name: "North Bay",
    slug: "north-bay",
    latitude: 46.31,
    longitude: -79.46,
    intro:
      "North Bay's market moves at its own pace, and not every house or timeline fits the traditional listing route. We buy homes across North Bay and the surrounding area directly from owners, completely as-is: no repairs, no showings, no commissions, and a written cash offer in your hands within 24 hours.",
  },
  {
    name: "Belleville",
    slug: "belleville",
    latitude: 44.16,
    longitude: -77.38,
    intro:
      "Around the Bay of Quinte, we hear the same thing from sellers: they want certainty without the circus of showings. We buy houses across Belleville and Quinte West directly from homeowners, in any condition, with a fair written cash offer within 24 hours and no fees or commissions of any kind.",
  },
  {
    name: "Brantford",
    slug: "brantford",
    latitude: 43.14,
    longitude: -80.26,
    intro:
      "Brantford has changed fast, but selling a house that needs work is as slow as ever, unless you sell direct. We buy homes across Brantford and Brant County straight from the owner: any condition, any situation, a written cash offer within 24 hours, and a closing date that fits your plans instead of the market's.",
  },
  {
    name: "Peterborough",
    slug: "peterborough",
    latitude: 44.3,
    longitude: -78.32,
    intro:
      "Whether it's a century home near downtown, a bungalow you've inherited, or a cottage-country property you can't keep up with, we buy houses across Peterborough and the Kawarthas directly from owners. Fair written cash offer within 24 hours, no repairs, no commissions, close in as little as 14 days.",
  },
  {
    name: "St. Catharines",
    slug: "st-catharines",
    latitude: 43.16,
    longitude: -79.25,
    intro:
      "In the Garden City, listing a home that needs updates often means months of showings and picky buyers. We skip all of that: we buy St. Catharines houses directly from their owners, in any condition, with a written cash offer within 24 hours and zero fees, commissions, or repair requests.",
  },
  {
    name: "Niagara Falls",
    slug: "niagara-falls",
    latitude: 43.09,
    longitude: -79.08,
    intro:
      "Away from the tourist strip, Niagara Falls is a city of older family homes, and many need more work than their owners want to take on before selling. We buy houses across Niagara Falls completely as-is, directly from the owner, with a fair written cash offer within 24 hours and a closing on your timeline.",
  },
  {
    name: "Guelph",
    slug: "guelph",
    latitude: 43.54,
    longitude: -80.25,
    intro:
      "Guelph's market is strong, but strong markets still leave people stuck: student rentals you're done with, estates to settle, separations that need a clean break. We buy homes across Guelph directly from owners with a written cash offer within 24 hours, no conditions, no commissions, and a date you pick.",
  },
  {
    name: "Cornwall",
    slug: "cornwall",
    latitude: 45.02,
    longitude: -74.73,
    intro:
      "Cornwall homeowners often own their houses outright and want a simple, certain sale without months of strangers walking through. That's exactly what we do: a direct purchase, any condition, a fair written cash offer within 24 hours, funds through your own lawyer, and not a dollar in fees.",
  },
  {
    name: "Chatham-Kent",
    slug: "chatham-kent",
    latitude: 42.4,
    longitude: -82.19,
    intro:
      "From Chatham to Wallaceburg to the lakeshore communities, we buy houses across Chatham-Kent directly from their owners. Farm-town practical: one visit, a written cash offer within 24 hours, no repairs or cleanup expected, and a closing date that works around your life.",
  },
  {
    name: "Timmins",
    slug: "timmins",
    latitude: 48.48,
    longitude: -81.33,
    intro:
      "Selling a house in Timmins from out of town, or selling one that needs winter-worn repairs, can stall for months on the open market. We buy Timmins homes directly from owners in any condition: written cash offer within 24 hours, no showings, no commissions, close in as little as 14 days.",
  },
  {
    name: "Woodstock",
    slug: "woodstock",
    latitude: 43.13,
    longitude: -80.75,
    intro:
      "Woodstock sits on one of Ontario's busiest corridors, but selling a house here still means repairs, staging, and waiting, unless you go direct. We buy homes across Woodstock and Oxford County from their owners as-is, with a fair written cash offer within 24 hours and zero fees.",
  },
  {
    name: "Stratford",
    slug: "stratford",
    latitude: 43.37,
    longitude: -80.98,
    intro:
      "Stratford homes range from stately century properties to post-war bungalows, and not all of them are ready for the open market. We buy houses across Stratford and Perth County directly from owners, in any condition, with a written cash offer within 24 hours and a closing on your terms.",
  },
  {
    name: "Orillia",
    slug: "orillia",
    latitude: 44.61,
    longitude: -79.42,
    intro:
      "Between the lakes, Orillia sellers come to us with cottages that became too much, family homes to settle, and rentals they're ready to leave behind. We buy across Orillia and the surrounding Lake Country directly from owners: fair written cash offer in 24 hours, as-is, no fees.",
  },
  {
    name: "Brockville",
    slug: "brockville",
    latitude: 44.59,
    longitude: -75.68,
    intro:
      "In the City of the Thousand Islands, we buy houses directly from their owners, from downtown heritage homes to north-end splits. Any condition, any situation: a written cash offer within 24 hours, your own lawyer handling the funds, and a closing date you choose.",
  },
];

const ontario = await prisma.province.findFirst({ where: { code: "ON" } });
if (!ontario) throw new Error("Ontario province not found");

let added = 0;
let skipped = 0;
for (const c of cities) {
  const exists = await prisma.city.findFirst({
    where: { provinceId: ontario.id, slug: c.slug },
  });
  if (exists) {
    console.log(`skip (exists): ${c.name}`);
    skipped++;
    continue;
  }
  await prisma.city.create({
    data: { ...c, provinceId: ontario.id, published: false },
  });
  console.log(`added (unpublished): ${c.name}`);
  added++;
}
console.log(`\ndone: ${added} added, ${skipped} skipped`);
await prisma.$disconnect();
