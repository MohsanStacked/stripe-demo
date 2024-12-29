# Stripe Checkout Demo

This project demonstrates how to integrate **Stripe Checkout** using **Node.js** and **Express**.

---

## **Setup Instructions**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Create a `.env` File

Create a `.env` file in the root directory of the project and add the following environment variables:
```
STRIPE_SECRET_KEY=your-stripe-secret-key
LOCAL_URL=http://localhost:3000
```
Replace `your-stripe-secret-key` with your **Stripe Secret Key**.

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Server
```bash
npm run start
```

### 5. Open in Browser
Visit:
```
http://localhost:3000/
```

---

## **Dependencies**
- express
- cors
- stripe

---

## **Notes**
Make sure your Stripe account is set up and you have valid API keys.

For testing payments, use Stripe's **test card number**: `4242 4242 4242 4242` with any future expiration date and CVC.

