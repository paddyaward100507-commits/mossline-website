// Creates a Stripe Checkout Session for one of a fixed set of plans defined
// in environment variables. The client only ever sends a plan *key*
// ("logo", "careplan") — never a price or amount — so nobody can tamper with
// what gets charged by editing the request in devtools.
const Stripe = require("stripe");

const PLANS = {
  logo: {
    priceEnvVar: "STRIPE_PRICE_LOGO",
    mode: "payment",
  },
  careplan: {
    // STRIPE_PRICE_CAREPLAN is the entry-level €100/mo tier only — larger
    // sites are quoted individually and moved to a different Stripe Price
    // (or a manual invoice) outside of this instant-checkout flow.
    priceEnvVar: "STRIPE_PRICE_CAREPLAN",
    mode: "subscription",
  },
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let plan;
  try {
    plan = JSON.parse(event.body || "{}").plan;
  } catch (err) {
    return { statusCode: 400, body: "Invalid JSON body" };
  }

  const config = PLANS[plan];
  if (!config) {
    return { statusCode: 400, body: `Unknown plan "${plan}"` };
  }

  const priceId = process.env[config.priceEnvVar];
  const siteUrl = process.env.SITE_URL;
  if (!priceId || !siteUrl) {
    return {
      statusCode: 500,
      body: "Server is missing required Stripe configuration.",
    };
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: config.mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel.html`,
      billing_address_collection: "auto",
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe checkout session creation failed:", err.message);
    return { statusCode: 502, body: "Could not start checkout." };
  }
};
