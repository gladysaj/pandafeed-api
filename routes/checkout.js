const { Router } = require("express");
const uuid = require('uuid');
const router = Router();

const { veryToken } = require("../utils/auth");

// Stripe checkout
router.post("/checkout", veryToken, async (req, res) => {
  const { token } = req.body;
  const { userId } = req.user;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
      metadata: {
        userId,
      },
    });
  
    const charge = await stripe.charges.create(
      {
        amount: 800,
        currency: 'usd',
        customer: customer.id,
        description: 'Pandafeed PRO',
      },
      {
        idempotency_key: uuid(),
      }
    );

    console.log(JSON.stringify(charge));
    res.status(200).json({ success: true });
  } catch(error) {
    res.status(400).json(error);
  }
});

module.exports = router;
