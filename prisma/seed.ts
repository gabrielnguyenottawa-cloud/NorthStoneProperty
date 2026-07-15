import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const provinces: { name: string; code: string; cities: string[] }[] = [
  {
    name: "Ontario",
    code: "ON",
    cities: [
      "Toronto", "Ottawa", "Mississauga", "Hamilton", "London", "Windsor",
      "Kingston", "Kitchener", "Waterloo", "Cambridge", "Barrie", "Oshawa",
      "Sudbury", "Thunder Bay",
    ],
  },
  {
    name: "British Columbia",
    code: "BC",
    cities: [
      "Vancouver", "Surrey", "Burnaby", "Richmond", "Kelowna", "Victoria",
      "Kamloops", "Nanaimo", "Abbotsford",
    ],
  },
  {
    name: "Alberta",
    code: "AB",
    cities: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Medicine Hat", "Grande Prairie"],
  },
  {
    name: "Nova Scotia",
    code: "NS",
    cities: ["Halifax", "Sydney", "Truro", "New Glasgow", "Kentville"],
  },
];

function cityIntro(city: string, province: string) {
  return `Selling a house in ${city} doesn't have to mean months of showings, repairs, and uncertainty. We buy houses across ${city} and the surrounding ${province} region directly from homeowners — in any condition, on your timeline, with no agent commissions and no fees. Whether you've inherited a property, are going through a major life change, or simply need a fast, certain sale, we make a fair cash offer within 24 hours and can close in as little as 14 days.`;
}

function cityMarket(city: string) {
  return `## The ${city} market, in plain terms\n\nEvery neighbourhood in ${city} moves at its own pace. Homes in move-in condition may sell quickly on the open market, but properties that need work, have tenants in place, or are tied up in probate often sit — or sell far below asking after repeated price cuts.\n\nA direct sale removes that uncertainty. We evaluate your property based on its location, condition, and current ${city} comparables, then present a written cash offer with no conditions on financing or inspection. You choose the closing date.\n\n**When a direct sale makes sense in ${city}:**\n\n- The property needs repairs you don't want to fund\n- You've inherited a home and live elsewhere\n- You're facing foreclosure, separation, or another deadline\n- The home has problem tenants or has been sitting vacant\n- You value certainty over squeezing out the last dollar`;
}

const cityFaqs = (city: string) => [
  {
    question: `How fast can you buy my house in ${city}?`,
    answer: `In most cases we present a written cash offer within 24 hours of seeing the property and can close in as little as 14 days. If you need more time, we close on the date you choose — some sellers prefer 60 or 90 days.`,
  },
  {
    question: `Do I need to make repairs before selling in ${city}?`,
    answer: `No. We buy houses in ${city} completely as-is. Leave behind anything you don't want — we handle cleanouts, repairs, and even properties with fire, water, or structural damage.`,
  },
  {
    question: `Are there any fees or commissions?`,
    answer: `None. There are no agent commissions, no closing fees charged to you, and no hidden deductions. The offer we present is the amount you receive, subject only to standard legal payouts like your existing mortgage.`,
  },
  {
    question: `How do you calculate your offer for my ${city} property?`,
    answer: `We look at recent comparable sales in your neighbourhood, the current condition of the property, and the cost of any required repairs. We walk you through the numbers so you can see exactly how we arrived at the offer.`,
  },
];

const globalFaqs = [
  {
    question: "Is selling to a cash home buyer legitimate in Canada?",
    answer:
      "Yes. Direct home purchases are standard real estate transactions completed through licensed Canadian real estate lawyers. You receive a written purchase agreement, funds are transferred through your lawyer's trust account, and you're free to have independent legal advice before signing anything.",
  },
  {
    question: "Will I get less money than listing with a realtor?",
    answer:
      "A cash offer is typically below full retail value — that's the trade-off for speed, certainty, and selling as-is. But when you account for agent commissions (often 4–5%), repairs, staging, carrying costs during months on market, and the risk of a financed deal falling through, the net difference is often smaller than sellers expect. We encourage you to compare both paths.",
  },
  {
    question: "What types of properties do you buy?",
    answer:
      "Detached homes, semis, townhouses, condos, duplexes and small multi-family buildings, and vacant land — in any condition, including hoarder homes, fire-damaged properties, homes with tenants, and estates in probate.",
  },
  {
    question: "Am I obligated to accept your offer?",
    answer:
      "Never. Our offers are 100% no-obligation. Many homeowners use our offer as a benchmark while exploring other options, and we're comfortable with that.",
  },
  {
    question: "Who pays the legal fees?",
    answer:
      "We cover standard closing costs, and you'll always have your own independent lawyer represent you in the transaction.",
  },
];

const situations = [
  {
    title: "Sell an Inherited House",
    slug: "inherited-property",
    intro:
      "Inheriting a property is often as stressful as it is unexpected — especially if you live in another city, the home needs work, or multiple family members are involved. We buy inherited houses as-is and work directly with your estate lawyer so the process stays simple.",
    content:
      "## Selling an inherited home in Canada\n\nBefore an inherited property can be sold, the estate usually needs a grant of probate (unless the home was held in joint tenancy). Once the executor has authority to sell, you have two paths: prepare and list the property on the open market, or sell directly to a buyer like us.\n\n### Why families choose a direct sale\n\n- **No cleanout required.** Take the belongings that matter; we handle the rest.\n- **No repairs.** Older estate homes often need updates that eat into the sale price anyway.\n- **One closing date the whole family can plan around.** No conditional offers or financing surprises.\n- **We coordinate with your estate lawyer** so paperwork and trust payouts run through the proper channels.\n\n### Capital gains on inherited property\n\nIf the home was the deceased's principal residence, the estate generally doesn't pay capital gains up to the date of death, but any appreciation afterward may be taxable. Speak with an accountant — and note that a faster sale usually means a smaller taxable gain window.",
  },
  {
    title: "Selling During Divorce or Separation",
    slug: "divorce",
    intro:
      "When a relationship ends, the house is often the biggest asset — and the biggest source of friction. A direct sale gives both parties a clean number, a firm closing date, and a way to move forward without months of showings.",
    content:
      "## A neutral, fast path for both parties\n\nListing a home during a separation means agreeing on an agent, a price, staging, showings, and negotiations — every step a potential conflict. A direct cash sale replaces all of that with one written offer both parties (and their lawyers) can evaluate on its own merits.\n\n### How it works\n\n1. Either party requests an offer — we're happy to communicate with both sides or through counsel.\n2. We present a written, unconditional cash offer.\n3. Proceeds are disbursed through lawyers according to your separation agreement.\n\nNo lockboxes, no strangers walking through the house, no deal collapsing at the financing stage while legal fees mount.",
  },
  {
    title: "Avoid Foreclosure / Power of Sale",
    slug: "foreclosure",
    intro:
      "If you've fallen behind on mortgage payments, acting early protects your equity and your credit. A fast direct sale can pay out the lender before a power of sale or foreclosure erases what you've built.",
    content:
      "## You have more options than the bank letter suggests\n\nIn most provinces lenders use **power of sale** (Ontario) or **judicial foreclosure** (BC, Alberta, Nova Scotia) to recover what they're owed. Either way, the process involves legal costs that come out of *your* equity — and lender sales rarely achieve top market value.\n\n### Why a direct sale can protect you\n\n- **Speed.** We can close before the lender's process completes, paying out the mortgage in full.\n- **You keep the remaining equity** instead of losing it to legal fees and a below-market forced sale.\n- **Your credit takes a far smaller hit** from a normal sale than from a completed foreclosure.\n\nIf you've received a demand letter or notice of sale, contact us immediately — timelines matter, and there is no cost to finding out what your options are.",
  },
  {
    title: "Sell a House with Problem Tenants",
    slug: "tenants",
    intro:
      "Non-paying tenants, damaged units, or an LTB backlog can make a rental property feel impossible to sell. We buy tenanted properties as-is — tenants and all — so you don't have to wait for vacancy.",
    content:
      "## Yes, you can sell with tenants in place\n\nIn every province we operate in, a property can be sold with tenants — the lease simply transfers to the new owner. Most retail buyers won't touch a tenanted property, which is why they stall on the open market. We will.\n\n### What we take off your plate\n\n- Ongoing hearings, arrears, and enforcement\n- Repairs and unit turnover\n- Coordinating showings around uncooperative tenants (we typically need just one visit)\n\nBring us the lease, the arrears situation, and the condition — we'll price it accordingly and close on your schedule.",
  },
  {
    title: "Sell a Fire or Water Damaged Home",
    slug: "damaged-property",
    intro:
      "After a fire or flood, the gap between the insurance payout and the true cost of restoration can be enormous. Selling as-is lets you take the insurance proceeds and the sale proceeds and move on.",
    content:
      "## Restoration isn't your only option\n\nRebuilding after major damage means contractors, permits, months of carrying costs, and frequent budget overruns. Many owners come out ahead by selling the property as-is and letting a buyer who renovates for a living absorb that risk.\n\n### How we evaluate damaged properties\n\nWe assess the structure, the scope of remediation, and the after-repair value in your neighbourhood, then make a cash offer that reflects a fair split of the remaining value. No inspections to pass, no financing conditions — insurers and lenders often won't finance damaged homes for retail buyers, which is exactly why cash matters here.",
  },
  {
    title: "Sell a Hoarder Home",
    slug: "hoarder-home",
    intro:
      "A home filled to the ceiling can feel unsellable. It isn't. We buy hoarder homes exactly as they stand — no cleanout, no judgment, no photographs on the open market.",
    content:
      "## Sell with dignity and zero cleanup\n\nListing a hoarder property publicly means photos online, strangers touring the home, and pressure to spend thousands on cleanout and repairs first. A direct sale is private: one visit, one written offer, and you take only what you want to keep.\n\nWe handle everything left behind — furniture, belongings, vehicles, anything. Many of our sellers are family members helping a parent transition to assisted living; we work at whatever pace the situation needs.",
  },
  {
    title: "Sell a Vacant Property",
    slug: "vacant-property",
    intro:
      "Vacant homes bleed money — taxes, insurance, utilities, maintenance — and attract vandalism and municipal vacancy taxes in some cities. Convert a liability into cash on a date you choose.",
    content:
      "## The real cost of an empty house\n\nBetween property taxes, vacant-home insurance premiums (often 50%+ higher), utilities, maintenance, and vacancy taxes in cities like Toronto and Vancouver, an empty property can cost well over $1,000 a month before anything breaks. Every month on the market is money out.\n\nA direct sale ends the bleed in weeks. We're particularly experienced with out-of-town owners — the entire transaction, including signing, can be completed remotely through your lawyer.",
  },
  {
    title: "Downsizing or Estate Sale",
    slug: "downsizing",
    intro:
      "Moving to a smaller home, a retirement residence, or closer to family should be exciting — not buried under repairs, staging, and open houses. Sell on your timeline, keep what you love, leave the rest.",
    content:
      "## A gentler way to transition\n\nDecades in a family home usually means decades of belongings and a list of 'we should really fix that' projects. We remove both obstacles: sell completely as-is, take only what's coming with you, and pick a closing date that lines up with your move — whether that's three weeks or three months away.\n\nFamilies coordinating on behalf of aging parents: we're happy to work with powers of attorney and keep every family member informed throughout.",
  },
];

const samplePosts = [
  {
    title: "How to Sell a House Fast in Ottawa (2026 Guide)",
    slug: "sell-house-fast-ottawa",
    targetKeyword: "sell house fast Ottawa",
    excerpt:
      "Every realistic option for selling an Ottawa home quickly — realtor, FSBO, auction, and direct cash sale — with honest timelines, costs, and trade-offs for each.",
    category: "Selling Fast",
    relatedCitySlugs: ["ontario/ottawa", "ontario/kingston", "ontario/toronto"],
    content:
      "If you need to sell an Ottawa house quickly, you have four realistic paths — and the right one depends on your timeline, the condition of the property, and how much certainty you need.\n\n## Option 1: List with a realtor\n\nThe traditional route nets the highest price for move-in-ready homes in desirable neighbourhoods like Westboro, the Glebe, or Barrhaven. Expect 30–90 days on market plus a 30–60 day closing, commissions of roughly 4–5%, and the risk of financing conditions falling through.\n\n## Option 2: For sale by owner\n\nYou save the listing commission but still typically pay the buyer's agent, handle your own showings and paperwork, and FSBO homes statistically sell for less and slower.\n\n## Option 3: Price aggressively below market\n\nUnderpricing can generate fast offers, but you're still exposed to conditions, inspections, and appraisal gaps — speed is not guaranteed, only interest.\n\n## Option 4: Sell directly to a cash buyer\n\nA written offer in 24 hours, no conditions, no repairs, closing in as little as two weeks. The offer will be below full retail — the honest trade-off for certainty and speed. For inherited homes, properties needing work, or hard deadlines, it's frequently the strongest net outcome once commissions and carrying costs are counted.\n\n## Which should you choose?\n\nIf your home is in good condition and you can wait 3–4 months for the full process, list it. If the property needs work, you're on a deadline, or you simply want it done, get a cash offer first — it costs nothing and gives you a real number to compare against.",
    faqs: [
      {
        question: "What's the fastest a house sale can close in Ottawa?",
        answer:
          "With a cash buyer and a responsive lawyer, 10–14 days is realistic. Financed purchases almost never close in under 30 days.",
      },
      {
        question: "Do cash buyers pay fair prices in Ottawa?",
        answer:
          "Reputable buyers price from recent comparable sales minus repair costs and a margin, and will show you the math. Always get the offer in writing and have your own lawyer review it.",
      },
    ],
  },
  {
    title: "Should I Sell My House to an Investor or a Realtor?",
    slug: "investor-vs-realtor",
    targetKeyword: "sell house to investor or realtor",
    excerpt:
      "A side-by-side comparison of selling to a real estate investor versus listing with an agent: net proceeds, timelines, risk, and which situations favour each.",
    category: "Selling Guides",
    relatedCitySlugs: ["ontario/toronto", "alberta/calgary", "british-columbia/vancouver"],
    content:
      "The realtor-vs-investor question isn't about which is 'better' — it's about which matches your property and your situation.\n\n## The math most sellers skip\n\nSay your home would list at $500,000 but needs $30,000 of work to get there. Listing: after repairs, ~4.5% commission (~$21,000), and 3 months of carrying costs, your net might land around $440,000 — *if* the deal doesn't fall through. An investor might offer $430,000–$445,000 as-is, closing in two weeks. The gap is often far smaller than the sticker prices suggest.\n\n## Choose a realtor when\n\n- The home is in good condition\n- You're not under time pressure\n- Your market is active for your property type\n\n## Choose an investor when\n\n- The property needs significant repairs\n- You've inherited it, live far away, or it has tenants\n- You need a firm date for a move, separation, or debt deadline\n- Privacy matters — no photos online, no showings\n\n## Protecting yourself either way\n\nGet everything in writing, never pay upfront fees, and always use your own lawyer. A legitimate investor welcomes both.",
    faqs: [
      {
        question: "Do investors charge commission?",
        answer:
          "No. There are no commissions or fees in a direct sale — the buyer's offer is your gross proceeds before standard legal payouts like your mortgage.",
      },
    ],
  },
  {
    title: "Probate in Canada: A Plain-Language Guide for Selling an Estate Property",
    slug: "probate-property-guide-canada",
    targetKeyword: "selling probate property Canada",
    excerpt:
      "What probate is, how long it takes in each province, what executors can and can't do before the grant, and how to sell an estate property with the least friction.",
    category: "Inherited Property",
    relatedCitySlugs: ["ontario/toronto", "nova-scotia/halifax", "british-columbia/victoria"],
    content:
      "Probate is the court process that confirms a will is valid and gives the executor legal authority to deal with the estate — including selling real estate.\n\n## When probate is required\n\nIf the home was owned solely by the deceased (or as tenants-in-common), you'll almost always need probate before title can transfer. Jointly-held homes with right of survivorship generally pass outside the estate.\n\n## Timelines by province (typical)\n\n- **Ontario:** 2–8 months for a Certificate of Appointment, depending on the court\n- **British Columbia:** 3–6 months, plus a mandatory 21-day notice period\n- **Alberta:** 2–4 months for a Grant of Probate\n- **Nova Scotia:** 2–6 months\n\n## Can you sell before probate is granted?\n\nYou can *list* and even accept a conditional offer, but closing must wait for the grant. Experienced direct buyers will sign now and set closing 'X days after grant of probate' — locking in your price while the court process runs.\n\n## Executor tips\n\n1. Secure and insure the property immediately (vacant-home insurance).\n2. Get a written valuation at date of death for tax purposes.\n3. Keep beneficiaries informed in writing.\n4. Don't fund major renovations from your own pocket — sell as-is or use estate funds with beneficiary agreement.",
    faqs: [
      {
        question: "How much does probate cost?",
        answer:
          "Probate fees (estate administration tax) vary by province — roughly 1.5% of estate value in Ontario, 1.4% in BC over $50,000, flat tiered fees in Alberta, and a percentage-based scale in Nova Scotia — plus legal fees.",
      },
      {
        question: "Can one executor sell without the others agreeing?",
        answer:
          "No. Co-executors must act unanimously unless the will says otherwise. Disagreements should be resolved before listing or accepting an offer.",
      },
    ],
  },
];

const testimonials = [
  { name: "Diane M.", location: "Ottawa, ON", quote: "After my mother passed, the last thing I could face was clearing out and renovating her house from three provinces away. They handled everything, kept me informed weekly, and we closed exactly on the date my lawyer suggested. Professional from the first call.", featured: true },
  { name: "Robert & Susan T.", location: "Hamilton, ON", quote: "We were skeptical of 'cash for houses' companies, honestly. What changed our minds was that they showed us exactly how they calculated the offer and told us to have our lawyer review everything. No pressure at any point.", featured: true },
  { name: "Priya K.", location: "Surrey, BC", quote: "Our rental had tenants who hadn't paid in eight months and the LTB hearing kept getting pushed. They bought it with the tenants in place. I still can't believe how simple the closing was.", featured: true },
  { name: "James L.", location: "Calgary, AB", quote: "Job relocation gave us six weeks. Offer in a day, closed in nineteen. The offer was fair — we'd had the house appraised, so we knew.", featured: false },
  { name: "Marie C.", location: "Halifax, NS", quote: "Dad's house hadn't been updated since 1978 and needed a new roof. Selling as-is saved us months of family arguments about who would manage renovations. Everyone got their share quickly and fairly.", featured: true },
];

async function main() {
  console.log("Seeding provinces and cities…");
  for (const p of provinces) {
    const province = await prisma.province.upsert({
      where: { code: p.code },
      update: {},
      create: { name: p.name, slug: slugify(p.name), code: p.code },
    });
    for (const cityName of p.cities) {
      const slug = slugify(cityName);
      const city = await prisma.city.upsert({
        where: { provinceId_slug: { provinceId: province.id, slug } },
        update: {},
        create: {
          name: cityName,
          slug,
          provinceId: province.id,
          heroHeadline: `Sell Your House Fast in ${cityName}`,
          metaTitle: `Sell Your House Fast in ${cityName} | Cash Home Buyers ${cityName}`,
          metaDescription: `We buy houses in ${cityName}, ${p.code} in any condition. Get a fair, no-obligation cash offer in 24 hours and close in as little as 14 days. No fees, no commissions, no repairs.`,
          intro: cityIntro(cityName, p.name),
          marketInsights: cityMarket(cityName),
        },
      });
      const existing = await prisma.faq.count({ where: { cityId: city.id } });
      if (existing === 0) {
        await prisma.faq.createMany({
          data: cityFaqs(cityName).map((f, i) => ({ ...f, cityId: city.id, sortOrder: i })),
        });
      }
    }
  }

  console.log("Seeding global FAQs…");
  if ((await prisma.faq.count({ where: { isGlobal: true } })) === 0) {
    await prisma.faq.createMany({
      data: globalFaqs.map((f, i) => ({ ...f, isGlobal: true, sortOrder: i })),
    });
  }

  console.log("Seeding situation pages…");
  for (const s of situations) {
    await prisma.situationPage.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        ...s,
        metaTitle: `${s.title} | Fair Cash Offer, No Fees`,
        metaDescription: s.intro.slice(0, 155),
      },
    });
  }

  console.log("Seeding categories and posts…");
  for (const post of samplePosts) {
    const category = await prisma.category.upsert({
      where: { slug: slugify(post.category) },
      update: {},
      create: { name: post.category, slug: slugify(post.category) },
    });
    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        targetKeyword: post.targetKeyword,
        metaDescription: post.excerpt.slice(0, 155),
        status: "PUBLISHED",
        publishedAt: new Date(),
        categoryId: category.id,
        relatedCitySlugs: post.relatedCitySlugs,
      },
    });
    if ((await prisma.faq.count({ where: { postId: created.id } })) === 0 && post.faqs) {
      await prisma.faq.createMany({
        data: post.faqs.map((f, i) => ({ ...f, postId: created.id, sortOrder: i })),
      });
    }
  }

  console.log("Seeding testimonials…");
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({ data: testimonials });
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
