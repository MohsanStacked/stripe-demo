import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        const { name, unitAmount, quantity } = req.body;

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: name,
                        },
                        unit_amount: unitAmount * 100, // Convert to cents
                    },
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.LOCAL_URL}/api/success`,
            cancel_url: `${process.env.LOCAL_URL}/api/cancel`,
        });

        // Send back the session URL
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export { createCheckoutSession };
