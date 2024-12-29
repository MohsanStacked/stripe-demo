
const checkoutForm = document.getElementById('checkout-form');
const priceInput = document.getElementById('product-price');
const quantityInput = document.getElementById('product-quantity');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const loadingIcon = document.querySelector('.loading');

function updateSummary() {
    const price = parseFloat(priceInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;

    const subtotal = price * quantity;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

priceInput.addEventListener('input', updateSummary);
quantityInput.addEventListener('input', updateSummary);

checkoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const unitAmount = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);

    // Reset errors
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');

    // Validate inputs
    let hasError = false;
    if (!name) {
        document.getElementById('name-error').style.display = 'block';
        hasError = true;
    }
    if (!unitAmount || unitAmount <= 0) {
        document.getElementById('price-error').style.display = 'block';
        hasError = true;
    }
    if (!quantity || quantity <= 0) {
        document.getElementById('quantity-error').style.display = 'block';
        hasError = true;
    }

    if (hasError) return;

    // Show loading state
    const button = checkoutForm.querySelector('button');
    button.disabled = true;
    loadingIcon.style.display = 'inline-block';
    button.querySelector('span').textContent = 'Processing...';

    try {
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, unitAmount, quantity })
        });

        const session = await response.json();

        if (session.url) {
            window.location.href = session.url;
        } else {
            throw new Error('Unable to create checkout session');
        }
    } catch (error) {
        console.error('Error:', error);
        button.disabled = false;
        loadingIcon.style.display = 'none';
        button.querySelector('span').textContent = 'Proceed to Payment';
        alert('Something went wrong. Please try again.');
    }
});
