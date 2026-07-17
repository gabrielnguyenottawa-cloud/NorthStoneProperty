// Adds two SEO blog posts targeting high-intent Ontario keywords.
// Run: node scripts/add-blog-posts.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "power-of-sale-ontario",
    title: "Power of Sale in Ontario: What It Means and How to Protect Your Equity",
    targetKeyword: "power of sale Ontario",
    categorySlug: "selling-fast",
    excerpt:
      "Received a power of sale notice in Ontario? You have more options — and more time — than the letters make it feel like. Here's how the process actually works, what happens to your equity, and every way out.",
    metaTitle: "Power of Sale in Ontario: Timeline, Your Rights & How to Stop It",
    metaDescription:
      "How power of sale works in Ontario, what happens to your home equity, and the options that let you stop the process — including selling on your own terms first.",
    relatedCitySlugs: ["ontario/toronto", "ontario/hamilton", "ontario/oshawa"],
    content: `Getting a power of sale notice is frightening. The letters are cold, the deadlines feel impossible, and it's easy to believe the house is already gone.

It isn't. In Ontario, the power of sale process takes time, you keep important rights throughout it, and in most cases the worst outcome — losing your home *and* your equity — is avoidable if you act early. This guide explains the process in plain language.

*This is general information, not legal advice. If you're facing power of sale, speak with a real estate lawyer — most offer a low-cost initial consultation, and it's money well spent.*

## What is power of sale?

Power of sale is the process most Ontario lenders use when a mortgage goes into default. It lets the lender sell the property to recover what they're owed — without taking ownership of it. This is different from foreclosure (rare in Ontario), where the lender takes the title itself.

The critical detail most homeowners miss: **in a power of sale, the home is still yours until it's sold.** The lender must sell it, pay off the mortgage and costs, and give anything left over back to you. That remainder is your equity — and protecting it is the whole game.

## How the process unfolds

Every situation differs, but the broad sequence looks like this:

1. **Missed payments.** One missed payment won't trigger power of sale, but it starts the clock. This is the cheapest, easiest stage to fix things.
2. **Demand letters.** The lender (or their lawyer) sends formal notice demanding the arrears be paid.
3. **Notice of sale.** A formal legal notice that the lender intends to sell. Strict waiting periods apply before they can act on it.
4. **Legal action and eviction.** If nothing changes, the lender can obtain possession and list the property.
5. **The sale.** The lender sells the home — usually on the open market, but on their timeline, not yours, and with their costs deducted.

Legal fees, real estate commissions, and carrying costs all come out of the sale price before you see a dollar. That's why even when the sale covers the mortgage, homeowners often lose tens of thousands of equity to the process itself.

## Your options, from earliest to latest

**Catch up the arrears.** At almost any point before the sale, you have the right to bring the mortgage back into good standing — arrears plus costs. If family help or refinancing can cover it, this stops everything.

**Refinance or get a second mortgage.** If you have equity, a refinance can pay out the arrears. This works best early, before legal costs pile up and your credit takes more damage.

**Sell the home yourself.** This is the option lenders don't advertise: until the lender completes their sale, you can sell the property on your own, pay off the mortgage from the proceeds, and keep your equity — minus far fewer costs. A conventional listing works if you have months. If you don't, a [direct sale to a cash buyer](/situations/foreclosure) can close in weeks, which is often fast enough to beat the lender's timeline.

**Negotiate with the lender.** Lenders don't want the hassle of a power of sale — they want to be paid. If you have a credible plan (a signed sale agreement, a refinance approval in progress), their lawyer will usually work with you on timing.

## What we do in these situations

We buy Ontario homes directly from owners facing power of sale. A written cash offer within 24 hours, no conditions on financing, and a closing that can beat the lender's schedule — which means the mortgage gets paid out and the remaining equity goes to you instead of evaporating into fees. [Request an offer here](/get-offer) or read more about [how we handle foreclosure and power of sale situations](/situations/foreclosure).

It costs nothing to know your number. Many homeowners use our offer simply as the backstop while they pursue a refinance — and that's a smart way to use it.

## The one mistake to avoid

Doing nothing. Every week of delay adds legal costs that come out of your equity, and every stage of the process removes options. The homeowners who come out of power of sale with their equity intact are the ones who acted in the first weeks, not the last ones.`,
    faqs: [
      {
        question: "Can I still sell my house after receiving a power of sale notice?",
        answer:
          "Yes. Until the lender completes their sale, the home is still yours to sell. Selling it yourself — conventionally or to a direct buyer — pays out the mortgage and preserves your remaining equity.",
      },
      {
        question: "What's the difference between power of sale and foreclosure?",
        answer:
          "In a power of sale the lender sells the home, recovers what they're owed, and must return any surplus to you. In a foreclosure the lender takes ownership of the property itself. Power of sale is by far the more common process in Ontario.",
      },
      {
        question: "Do I get money back after a power of sale?",
        answer:
          "If the sale price exceeds the mortgage balance plus arrears, legal fees, commissions, and costs, the surplus belongs to you. But those costs can be substantial — which is why selling on your own terms usually preserves more equity.",
      },
      {
        question: "How fast can a cash buyer close in a power of sale situation?",
        answer:
          "We can typically close in as little as 14 days in Ontario, which is often fast enough to pay out the lender before their sale proceeds. Every file is different, so the earlier you reach out, the more options exist.",
      },
    ],
  },
  {
    slug: "selling-house-with-tenants-ontario",
    title: "Selling a House With Tenants in Ontario: Your Real Options",
    targetKeyword: "selling house with tenants Ontario",
    categorySlug: "selling-guides",
    excerpt:
      "Tenants don't stop you from selling in Ontario — but they change how. Here's what the law actually requires, what showings look like with tenants in place, and the one option that skips the whole problem.",
    metaTitle: "Selling a House With Tenants in Ontario: Rules, Options & Shortcuts",
    metaDescription:
      "What Ontario landlords need to know before selling a tenanted property: how leases survive a sale, what buyers can and can't require, and how to sell without evicting anyone.",
    relatedCitySlugs: ["ontario/london", "ontario/windsor", "ontario/st-catharines"],
    content: `Being a landlord in Ontario is work. Being a landlord who wants out — while tenants are still in the unit — can feel like a trap: you can't show the place properly, you can't promise vacant possession, and the rules around ending a tenancy are strict and slow.

Here's the honest map of your options.

*This is general information, not legal advice. Tenancy law is enforced by Ontario's Landlord and Tenant Board (LTB), and the details matter — when in doubt, get advice before serving anything.*

## The first thing to know: the sale doesn't end the tenancy

In Ontario, a tenancy survives the sale of the property. The buyer inherits your tenants — same lease, same rent, same rights. Selling is not, by itself, a legal reason for a tenant to leave.

A tenancy can end around a sale in limited ways, the most common being that the **buyer** intends to genuinely live in the unit themselves (or house a close family member). That process runs on specific notice forms, minimum notice periods measured in months, and compensation requirements — and misusing it carries real penalties. Fixed-term leases add another layer: they generally run to their end date regardless.

Translation: if your plan is "list it, sell it vacant, done" — that plan depends on cooperation, timing, and a buyer with the right intentions. It's possible, but it's not quick, and it's not guaranteed.

## Option 1 — Sell on the open market with tenants in place

Legal and common, but be honest about the friction:

- **Showings require proper notice**, and a tenant who's annoyed by the process has little incentive to present the home well.
- **Your buyer pool shrinks** to investors and the minority of buyers willing to inherit tenants.
- **Price follows.** Tenanted properties routinely sell below comparable vacant ones, especially if rent is under market.

If your tenants are great and the rent is strong, this can still work — investors do buy performing rentals. If the tenancy is the reason you're selling, it usually doesn't.

## Option 2 — Negotiate a voluntary end to the tenancy

Cash-for-keys is legal in Ontario when it's a genuine agreement (the standard route is a mutual termination agreement). Many landlords offer a few months' rent, moving costs, or both. It can be far cheaper than months of carrying costs and LTB timelines — but the tenant is fully entitled to say no.

## Option 3 — Sell directly to a buyer who takes the tenants

This is the option that removes the problem instead of managing it: [we buy tenanted properties across Ontario](/situations/tenants) — tenants, lease, and all.

- No showings beyond one visit (we work around your tenants' schedules)
- No requirement for vacant possession — the tenancy simply continues with us
- No eviction process, no cash-for-keys negotiation, no LTB
- A written cash offer within 24 hours and a closing date you pick

We're set up to be landlords; you may be done being one. That mismatch is exactly what a direct sale solves. Difficult tenancies — arrears, disputes, units we can't even see inside — are ones we handle regularly. [Tell us about the property](/get-offer) and we'll give you a real number.

## Which option fits?

- **Great tenants, market rent, no rush** → open-market sale to investors is worth testing.
- **Cooperative tenants, need vacancy for top dollar** → a fair mutual agreement, then list.
- **Difficult tenancy, arrears, or you just want out** → a direct sale with tenants in place is the fastest clean exit.

Whatever you choose, don't serve notices you're not sure about. A defective notice can reset a months-long process back to zero — the most expensive mistake a selling landlord can make.`,
    faqs: [
      {
        question: "Can I evict my tenants because I'm selling the house in Ontario?",
        answer:
          "No — selling is not itself a legal ground to end a tenancy. A tenancy can end around a sale in limited situations, most commonly when the buyer genuinely intends to live in the unit, and that process has strict notice and compensation requirements.",
      },
      {
        question: "Do tenants have to allow showings?",
        answer:
          "Tenants must permit entry when proper legal notice is given, but they don't have to tidy up, leave, or be enthusiastic. In practice, tenant cooperation makes or breaks an open-market sale of a tenanted home.",
      },
      {
        question: "Will I get less money selling with tenants in place?",
        answer:
          "On the open market, usually yes — the buyer pool is smaller and mostly investors, and below-market rent lowers what investors will pay. A direct sale trades peak price for certainty, speed, and zero tenancy risk.",
      },
      {
        question: "Do you buy properties with tenants who aren't paying rent?",
        answer:
          "Yes. Arrears, ongoing disputes, and units we can't fully inspect are situations we price for and take on regularly. The offer reflects the situation honestly, and you're free to compare it against the cost of resolving the tenancy yourself.",
      },
    ],
  },
];

for (const p of posts) {
  const exists = await prisma.blogPost.findUnique({ where: { slug: p.slug } });
  if (exists) {
    console.log(`skip (exists): ${p.slug}`);
    continue;
  }
  const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
  await prisma.blogPost.create({
    data: {
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      targetKeyword: p.targetKeyword,
      status: "PUBLISHED",
      publishedAt: new Date(),
      categoryId: category?.id,
      relatedCitySlugs: p.relatedCitySlugs,
      faqs: { create: p.faqs.map((f, i) => ({ ...f, sortOrder: i })) },
    },
  });
  console.log(`published: ${p.slug}`);
}
await prisma.$disconnect();
