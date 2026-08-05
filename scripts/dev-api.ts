import express from 'express';
import createCheckoutSession from '../api/create-checkout-session';

const app = express();
app.use(express.json());

app.post('/api/create-checkout-session', (req, res) => {
  void createCheckoutSession(req, res);
});

const port = Number(process.env.PORT || 3010);
app.listen(port, () => {
  console.log(`ORVYN dev API listening on ${port}`);
});
