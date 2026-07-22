// Receives Stripe webhook events and verifies them with the signing secret
// before trusting anything in the payload. Extend the switch below as you
// need — e.g. notify yourself on a new Care Plan subscription, or mark a
// project as paid once a one-off Logo Creation payment comes in.
const Stripe = require("stripe");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = event.headers["stripe-signature"];
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, "base64")
    : event.body;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  switch (stripeEvent.type) {
    case "checkout.session.completed": {
      const session = stripeEvent.data.object;
      console.log(
        `Checkout completed: ${session.customer_details?.email}, mode=${session.mode}, amount=${session.amount_total}`
      );
      // TODO: e.g. call a notification webhook (Slack/Zapier) here.
      break;
    }
    case "invoice.paid": {
      const invoice = stripeEvent.data.object;
      console.log(`Invoice paid: ${invoice.customer_email}, ${invoice.amount_paid}`);
      break;
    }
    default:
      console.log(`Unhandled Stripe event: ${stripeEvent.type}`);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
