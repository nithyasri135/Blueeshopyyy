

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description: "High quality wireless headphones with powerful sound."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        description: "Smart watch with fitness tracking and notifications."
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        description: "Comfortable running shoes for daily workouts."
    },

    {
        id: 4,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 799,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        description: "Comfortable cotton T-shirt for everyday use."
    },

    {
        id: 5,
        name: "Backpack",
        category: "accessories",
        price: 1299,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        description: "Durable backpack suitable for college and travel."
    },

    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        description: "Stylish sunglasses with UV protection."
    },

    {
        id: 7,
        name: "Denim Jacket",
        category: "fashion",
        price: 2299,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        description: "Modern denim jacket with a stylish design."
    },

    {
        id: 8,
        name: "Sneakers",
        category: "shoes",
        price: 1799,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        description: "Trendy sneakers designed for everyday comfort."
    }

];



let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

let wishlist = JSON.parse(
    localStorage.getItem("wishlist")
) || [];



const productContainer =
    document.getElementById("productContainer");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortPrice =
    document.getElementById("sortPrice");




function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML =
            "<h3>No products found.</h3>";

        return;
    }


    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        const isLiked =
            wishlist.includes(product.id);


        card.innerHTML = `

            <img
                src="${product.image}"
                class="product-image"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <div class="product-buttons">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add
                    </button>

                    <button
                        class="wishlist"
                        onclick="toggleWishlist(${product.id})"
                    >
                        ${isLiked ? "❤️" : "♡"}
                    </button>

                </div>

                <br>

                <button
                    onclick="showProduct(${product.id})"
                >
                    View Details
                </button>

            </div>

        `;

        productContainer.appendChild(card);

    });

}



function filterProducts() {

    const searchText =
        searchInput.value.toLowerCase();

    const category =
        categoryFilter.value;

    const sort =
        sortPrice.value;


    let filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });



    if (sort === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (sort === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }


    displayProducts(filtered);
}


searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);

sortPrice.addEventListener(
    "change",
    filterProducts
);


function addToCart(id) {

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({
            id: id,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    alert("Product added to cart!");
}


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(
                            ${product.id},
                            -1
                        )"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            ${product.id},
                            1
                        )"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(
                        ${product.id}
                    )"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(div);

    });


    document.getElementById(
        "cartTotal"
    ).textContent = total;


    document.getElementById(
        "cartCount"
    ).textContent =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

}



function changeQuantity(id, amount) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    updateCart();

}



function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCart();

}


document.getElementById(
    "cartBtn"
).addEventListener(
    "click",
    () => {

        document
            .getElementById("cartSidebar")
            .classList.add("active");

    }
);


function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

}


function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(
                item => item !== id
            );

    }

    else {

        wishlist.push(id);

    }


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    updateWishlist();

    filterProducts();

}




function updateWishlist() {

    const container =
        document.getElementById(
            "wishlistItems"
        );


    container.innerHTML = "";


    wishlist.forEach(id => {

        const product =
            products.find(
                p => p.id === id
            );


        const div =
            document.createElement("div");


        div.className =
            "wishlist-item";


        div.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price}
                </p>

                <button
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;


        container.appendChild(div);

    });


    document.getElementById(
        "wishlistCount"
    ).textContent =
        wishlist.length;

}


document.getElementById(
    "wishlistBtn"
).addEventListener(
    "click",
    () => {

        document
            .getElementById("wishlistSidebar")
            .classList.add("active");

    }
);


function closeWishlist() {

    document
        .getElementById("wishlistSidebar")
        .classList.remove("active");

}



function showProduct(id) {

    const product =
        products.find(
            p => p.id === id
        );


    const modalProduct =
        document.getElementById(
            "modalProduct"
        );


    modalProduct.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
        >

        <h2>
            ${product.name}
        </h2>

        <p class="category">
            Category: ${product.category}
        </p>

        <h3>
            ₹${product.price}
        </h3>

        <br>

        <p>
            ${product.description}
        </p>

        <br>

        <button
            class="add-cart"
            onclick="addToCart(${product.id})"
        >
            Add to Cart
        </button>

    `;


    document
        .getElementById("productModal")
        .classList.add("active");

}


function closeModal() {

    document
        .getElementById("productModal")
        .classList.remove("active");

}



document.getElementById(
    "themeBtn"
).addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const isDark =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

    }
);



if (
    localStorage.getItem("theme") ===
    "dark"
) {

    document.body.classList.add("dark");

}


document.getElementById(
    "checkoutForm"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        let valid = true;


        
        const name =
            document.getElementById(
                "name"
            ).value.trim();


        if (name.length < 3) {

            document.getElementById(
                "nameError"
            ).textContent =
                "Enter a valid name.";

            valid = false;

        }

        else {

            document.getElementById(
                "nameError"
            ).textContent = "";

        }



        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            document.getElementById(
                "emailError"
            ).textContent =
                "Enter a valid email.";

            valid = false;

        }

        else {

            document.getElementById(
                "emailError"
            ).textContent = "";

        }


       

        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        const phonePattern =
            /^[0-9]{10}$/;


        if (!phonePattern.test(phone)) {

            document.getElementById(
                "phoneError"
            ).textContent =
                "Enter a valid 10-digit phone number.";

            valid = false;

        }

        else {

            document.getElementById(
                "phoneError"
            ).textContent = "";

        }


       

        const address =
            document.getElementById(
                "address"
            ).value.trim();


        if (address.length < 10) {

            document.getElementById(
                "addressError"
            ).textContent =
                "Enter a valid address.";

            valid = false;

        }

        else {

            document.getElementById(
                "addressError"
            ).textContent = "";

        }


        if (valid) {

            alert(
                "🎉 Order placed successfully!"
            );


            cart = [];

            saveCart();

            updateCart();

            this.reset();

        }

    }
);



function goToCheckout() {

    closeCart();

    document
        .getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}



displayProducts(products);

updateCart();

updateWishlist();