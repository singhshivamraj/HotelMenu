// JavaScript code for order handling
const orderItems = [];
const itemSections = document.querySelectorAll('.category-section');
const totalAmountEl = document.querySelector('.total-amount');
const tableInput = document.getElementById('tableNumber');
const orderListEl = document.createElement('div');
tableInput.insertAdjacentElement('afterend', orderListEl);

itemSections.forEach(section => {
  const select = section.querySelector('select');
  const quantityInput = section.querySelector('input');
  const addButton = section.querySelector('button');

  const errorEl = document.createElement('div');
  errorEl.style.color = 'red';
  errorEl.style.fontSize = '0.85rem';
  section.appendChild(errorEl);



addButton.addEventListener('click', () => {
    errorEl.textContent = '';
    formError.textContent = '';
    formError.style.display = 'none';
  
    const selectedItem = select.value;
    const quantity = parseInt(quantityInput.value);
  
    if (!quantity || quantity <= 0) {
      errorEl.textContent = 'Please enter at least 1 quantity.';
      return;
    }
  
    const itemName = selectedItem.split(' - ₹')[0];
    const itemPrice = parseInt(selectedItem.split(' - ₹')[1], 10);
    const itemTotal = itemPrice * quantity;
  
    orderItems.push({ name: itemName, price: itemPrice, quantity, total: itemTotal });
  
    updateOrderList();
    updateTotalAmount();
    quantityInput.value = '';
  });
  

});

function updateOrderList() {
  orderListEl.innerHTML = '<h3 style="margin-top: 15px; font-size: 1.1rem">Order Summary:</h3>';
  const ul = document.createElement('ul');
  ul.style.marginTop = '8px';
  orderItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} = ₹${item.total}`;
    ul.appendChild(li);
  });
  orderListEl.appendChild(ul);
}

function updateTotalAmount() {
  let total = 0;
  let message = '';

  orderItems.forEach(item => {
    total += item.total;
    message += `${item.name} x${item.quantity} = ₹${item.total}\n`;
  });

  totalAmountEl.textContent = `Total: ₹${total}`;
  totalAmountEl.dataset.whatsappMessage = message + `\nTotal: ₹${total}`;
}

// Place Order via WhatsApp
const placeOrderBtn = document.querySelector('.order-form button[type="submit"]');

const tableNoInput = document.getElementById('tableNumber');
const formError = document.getElementById('formError');

placeOrderBtn.addEventListener('click', () => {
  const tableNo = tableNoInput.value.trim();
  formError.textContent = '';
  formError.style.display = 'none';

  if (orderItems.length === 0) {
    formError.textContent = 'Please add at least one item.';
    formError.style.display = 'block';
    return;
  }


const tableNumberValue = parseInt(tableNo, 10);

if (!tableNo || isNaN(tableNumberValue) || tableNumberValue < 1) {
  formError.textContent = 'Please enter a valid table number.';
  formError.style.display = 'block';
  return;
}



  const message = `🛒 *Hotel Abhilasha Order* 🧾\n\nTable No: ${tableNo}\n\n` +
                  totalAmountEl.dataset.whatsappMessage;

  const whatsappURL = `https://wa.me/917667767155?text=${encodeURIComponent(message)}`;


// Reset the form
// After opening WhatsApp
window.open(whatsappURL, '_blank');

// Reset the form
orderItems.length = 0; // Clear the array
tableNoInput.value = ''; // Clear table number input
formError.style.display = 'none'; // Hide any error message
totalAmountEl.textContent = 'Total: ₹0'; // Reset total
orderListEl.innerHTML = ''; // 


});

