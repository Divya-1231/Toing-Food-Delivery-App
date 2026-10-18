
let cart = [];

function showSection(sectionId) {
    let sections = document.querySelectorAll(".page-section");

    sections.forEach(function(section) {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";

    if (sectionId === "cart") {
        displayCart();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function addToCart(name, price) {
    let existingItem = cart.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
    updateCartCount();
}

function displayCart() {
    let cartItems = document.getElementById("cart-items");
    let totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
        totalElement.innerText = "Total: ₹0";
        return;
    }

    cart.forEach(function(item, index) {
        let itemTotal = item.price * item.quantity;

        total = total + itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>

                <div class="quantity">
                    <button onclick="decreaseQuantity(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>

                <p>Item Total: ₹${itemTotal}</p>

                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalElement.innerText = "Total: ₹" + total;
}

function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
    updateCartCount();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    displayCart();
    updateCartCount();
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
    updateCartCount();
}

function updateCartCount() {
    let count = 0;

    cart.forEach(function(item) {
        count = count + item.quantity;
    });

    document.getElementById("cart-count").innerText = count;
}

showSection("home");

