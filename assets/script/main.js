$(document).ready(function() {

    $('.product-item').show();


    $('.category-navigation a').on('click', function(e) {
        e.preventDefault();
        var category = $(this).text().toLowerCase(); 
        showProducts(category);
    });


    function showProducts(category) {
        if (category === 'all items') {
            $('.product-item').show(); 
        } else {
            $('.product-item').hide(); 
            $('.' + category).show(); 
        }
    }

    showProducts('all items');
});


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.add-button');
    const cart = document.querySelector('.receipt-cart');
    const totalElement = document.getElementById('total');

    buttons.forEach(button => {
        button.addEventListener('click', handleAddButtonClick);
    });

    function handleAddButtonClick() {
        const itemName = this.dataset.name;
        const itemPrice = parseFloat(this.dataset.price);

        // Check if item is already in the cart
        const existingItem = Array.from(cart.children).find(item => item.dataset.name === itemName);

        if (existingItem) {
            const quantityElement = existingItem.querySelector('.item-quantity');
            const newQuantity = parseInt(quantityElement.innerText) + 1;
            quantityElement.innerText = newQuantity;

            // Update the total for the existing item
            updateItemTotal(existingItem, newQuantity);
        } else {
            // Item is not in the cart, create a new entry
            const itemElement = createCartItemElement(itemName, itemPrice);
            cart.appendChild(itemElement);
        }

        // Update total price
        updateTotal();
    }

    function createCartItemElement(itemName, itemPrice) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('receipt-item');
        itemElement.dataset.name = itemName;
        itemElement.innerHTML = `
            <div class="receipt-item-details">
                <p class="item-name">${itemName}</p>
                <p class="item-price">$${itemPrice.toFixed(2)}</p>
            </div>
            <div class="receipt-item-actions">
                <button class="remove-button">Remove</button>
                <div class="receipt-item-quantity">
                    <button class="quantity-button decrement"><i class="fa fa-minus"></i></button>
                    <p class="item-quantity">1</p>
                    <button class="quantity-button increment"><i class="fa fa-plus"></i></button>
                </div>
            </div>`;

        // Add event listener for remove button
        const removeButton = itemElement.querySelector('.remove-button');
        removeButton.addEventListener('click', function() {
            cart.removeChild(itemElement);
            updateTotal();
        });

        // Add event listeners for quantity buttons
        const decrementButton = itemElement.querySelector('.decrement');
        const incrementButton = itemElement.querySelector('.increment');

        decrementButton.addEventListener('click', function() {
            handleQuantityChange(itemElement, -1);
        });

        incrementButton.addEventListener('click', function() {
            handleQuantityChange(itemElement, 1);
        });

        return itemElement;
    }

    function handleQuantityChange(itemElement, change) {
        const currentQuantity = parseInt(itemElement.querySelector('.item-quantity').innerText);
        const newQuantity = currentQuantity + change;

        if (newQuantity > 0) {
            itemElement.querySelector('.item-quantity').innerText = newQuantity;
            updateItemTotal(itemElement, newQuantity);
            updateTotal();
        }
    }

    function updateItemTotal(itemElement, quantity) {
        const itemPrice = parseFloat(itemElement.querySelector('.item-price').innerText.replace('$', ''));
        const itemTotalElement = itemElement.querySelector('.item-total');
        const itemTotal = itemPrice * quantity;
        itemTotalElement.innerText = `$${itemTotal.toFixed(2)}`;
    }

    function updateTotal() {
        const items = document.querySelectorAll('.receipt-item');
        let totalPrice = 0;

        items.forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').innerText.replace('$', ''));
            const quantity = parseInt(item.querySelector('.item-quantity').innerText);
            totalPrice += price * quantity;
        });

        totalElement.innerText = totalPrice.toFixed(2);
    }
});



const products = [
    // Drinks
    { category: "drinks", name: "Blueberry Juice", price: "2$", image: "./assets/images/drinks/blueberry-juice.png" },
    { category: "drinks", name: "Brewed Coffee", price: "2$", image: "./assets/images/drinks/brewed-coffee.png" },
    { category: "drinks", name: "Coke", price: "2$", image: "./assets/images/drinks/coke.png" },
    { category: "drinks", name: "Dark Caramel Brew", price: "2$", image: "./assets/images/drinks/dark-caramel-brew.png" },
    { category: "drinks", name: "Espresso", price: "2$", image: "./assets/images/drinks/espresso.png" },
    { category: "drinks", name: "Iced Chocolate Milk", price: "2$", image: "./assets/images/drinks/iced-chocolate-milk.png" },
    { category: "drinks", name: "Iced Green Tea Latte", price: "2$", image: "./assets/images/drinks/iced-greentea-latte.png" },
    { category: "drinks", name: "Iced Tea", price: "2$", image: "./assets/images/drinks/iced-tea.png" },
    { category: "drinks", name: "Iced Vanilla", price: "2$", image: "./assets/images/drinks/iced-vanilla.png" },
    { category: "drinks", name: "Lemon Juice", price: "2$", image: "./assets/images/drinks/lemon-juice.png" },
    { category: "drinks", name: "Mango Dragonfruit", price: "2$", image: "./assets/images/drinks/mango-dragonfruit.png" },
    { category: "drinks", name: "Matcha Latte", price: "2$", image: "./assets/images/drinks/matcha-latte.png" },
    { category: "drinks", name: "Orange Juice", price: "2$", image: "./assets/images/drinks/orange-juice.png" },
    { category: "drinks", name: "Red Iced Tea", price: "2$", image: "./assets/images/drinks/read-iced -tea.png" },
    { category: "drinks", name: "Rootbeer", price: "2$", image: "./assets/images/drinks/rootbeer.png" },
    { category: "drinks", name: "Sprite", price: "2$", image: "./assets/images/drinks/sprite.png" },
    { category: "drinks", name: "Strawberry", price: "2$", image: "./assets/images/drinks/strawberry.png" },
    { category: "drinks", name: "Watermelon Juice", price: "2$", image: "./assets/images/drinks/watermelon-juice.png" },

    // Burger
    { category: "burger", name: "Bacon Cheese", price: "5$", image: "./assets/images/burger/bacon-cheese.png" },
    { category: "burger", name: "Bacon Mushroom", price: "5$", image: "./assets/images/burger/bacon-mushroom.png" },
    { category: "burger", name: "Baconator Double", price: "5$", image: "./assets/images/burger/baconator-double.png" },
    { category: "burger", name: "Baconator Solo", price: "5$", image: "./assets/images/burger/baconator-solo.png" },
    { category: "burger", name: "BBQ Bacon King", price: "5$", image: "./assets/images/burger/bbq-bacon-king.png" },
    { category: "burger", name: "Big Bacon Mushroom", price: "5$", image: "./assets/images/burger/big-bacon-mushroom.png" },
    { category: "burger", name: "Cheeseburger", price: "5$", image: "./assets/images/burger/cheese-burger.png" },
    { category: "burger", name: "Chicken King", price: "5$", image: "./assets/images/burger/chicken-king.png" },
    { category: "burger", name: "Dave's Solo", price: "5$", image: "./assets/images/burger/daves-solo.png" },
    { category: "burger", name: "Flame-Grilled BBQ Bacon", price: "5$", image: "./assets/images/burger/flame-grilled-bbq-bacon.png" },
    { category: "burger", name: "Flame-Grilled Cheeseburger", price: "5$", image: "./assets/images/burger/flame-grilled-cheeseburger.png.png" },
    { category: "burger", name: "Flame-Grilled Hamburger", price: "5$", image: "./assets/images/burger/flame-grilled-hamburger.png" },
    { category: "burger", name: "Mushroom Swiss King", price: "5$", image: "./assets/images/burger/mushroom-swiss-king.png" },
    { category: "burger", name: "Pepperoni Bacon Whopper", price: "5$", image: "./assets/images/burger/pepperoni-bacon-whopper.png" },
    { category: "burger", name: "Quarter Pound King", price: "5$", image: "./assets/images/burger/quarter-poundking.png" },
    { category: "burger", name: "Whopper Jr", price: "5$", image: "./assets/images/burger/whopper-jr.png" },

    // Pasta
    { category: "pasta", name: "3-Cheese Tortelloni Pesto", price: "8$", image: "./assets/images/pasta/3-Cheese Tortelloni Pesto.png" },
    { category: "pasta", name: "3-Cheese Tortelloni Rosa", price: "8$", image: "./assets/images/pasta/3-Cheese Tortelloni Rosa.png" },
    { category: "pasta", name: "Alfredo MontAmore® with Parmesan-Crusted Chicken", price: "8$", image: "./assets/images/pasta/Alfredo MontAmore® with Parmesan-Crusted Chicken.png" },
    { category: "pasta", name: "Buffalo Chicken Mac", price: "8$", image: "./assets/images/pasta/Buffalo Chicken Mac.png" },
    { category: "pasta", name: "Buttered Noodles", price: "8$", image: "./assets/images/pasta/Buttered Noodles.png" },
    { category: "pasta", name: "Chicken Parmesan", price: "8$", image: "./assets/images/pasta/Chicken Parmesan.png" },
    { category: "pasta", name: "Japanese Pan Noodles", price: "8$", image: "./assets/images/pasta/Japanese Pan Noodles.png" },
    { category: "pasta", name: "Pad Thai with Grilled Chicken", price: "8$", image: "./assets/images/pasta/Pad Thai with Grilled Chicken.png" },
    { category: "pasta", name: "Pad Thai", price: "8$", image: "./assets/images/pasta/Pad Thai.png" },
    { category: "pasta", name: "Pasta Fresca with IMPOSSIBLE™ Chicken", price: "8$", image: "./assets/images/pasta/Pasta Fresca with IMPOSSIBLE™ Chicken.png" },
    { category: "pasta", name: "Pasta Fresca with Shrimp", price: "8$", image: "./assets/images/pasta/Pasta Fresca with Shrimp.png" },
    { category: "pasta", name: "Pasta Fresca", price: "8$", image: "./assets/images/pasta/Pasta Fresca.png" },
    { category: "pasta", name: "Pesto Cavatappi", price: "8$", image: "./assets/images/pasta/Pesto Cavatappi.png" },
    { category: "pasta", name: "Roasted Garlic Cream Tortelloni", price: "8$", image: "./assets/images/pasta/Roasted Garlic Cream Tortelloni.png" },
    { category: "pasta", name: "Spaghetti & Meatballs", price: "8$", image: "./assets/images/pasta/Spaghetti _ Meatballs.png" },
    { category: "pasta", name: "Spaghetti with Marinara", price: "8$", image: "./assets/images/pasta/Spaghetti with Marinara.png" },
    { category: "pasta", name: "Spicy Korean Beef Noodles", price: "8$", image: "./assets/images/pasta/Spicy Korean Beef Noodles.png" },
    { category: "pasta", name: "Wisconsin Mac & Cheese", price: "8$", image: "./assets/images/pasta/Wisconsin Mac _ Cheese.png" },

    // Pizza
    { category: "pizza", name: "Aloha Pizza", price: "10$", image: "./assets/images/pizza/aloha-pizza.png" },
    { category: "pizza", name: "American Bacon", price: "10$", image: "./assets/images/pizza/american-bacon.png" },
    { category: "pizza", name: "Bacon Spinach", price: "10$", image: "./assets/images/pizza/bacon-spinach.png" },
    { category: "pizza", name: "BBQ Chicken", price: "10$", image: "./assets/images/pizza/bbq-chicken.png" },
    { category: "pizza", name: "Carbonara Supreme", price: "10$", image: "./assets/images/pizza/carbonara-supreme.png" },
    { category: "pizza", name: "Cheese Mania", price: "10$", image: "./assets/images/pizza/cheese-mania.png" },
    { category: "pizza", name: "Cheese Supreme", price: "10$", image: "./assets/images/pizza/cheese-supreme.png" },
    { category: "pizza", name: "Chicken BBQ", price: "10$", image: "./assets/images/pizza/chicken-bbq.png" },
    { category: "pizza", name: "Extravaganza", price: "10$", image: "./assets/images/pizza/extravaganzza.png" },
    { category: "pizza", name: "Ham & Cheese", price: "10$", image: "./assets/images/pizza/ham-cheese.png" },
    { category: "pizza", name: "Hawaiian", price: "10$", image: "./assets/images/pizza/hawaiian.png" },
    { category: "pizza", name: "Meat Lovers", price: "10$", image: "./assets/images/pizza/meat-lovers.png" },
    { category: "pizza", name: "Pacific Veggie", price: "10$", image: "./assets/images/pizza/pacific-vegie.png" },
    { category: "pizza", name: "Pepperoni", price: "10$", image: "./assets/images/pizza/pepperoni.png" },
    { category: "pizza", name: "Seafood Supreme", price: "10$", image: "./assets/images/pizza/seafood-supreme.png" },
    { category: "pizza", name: "Supreme Pizza", price: "10$", image: "./assets/images/pizza/supreme-pizza.png" },
    { category: "pizza", name: "Ultimate Pepperoni", price: "10$", image: "./assets/images/pizza/ultimate-pepperoni.png" },
    { category: "pizza", name: "Veggie Lover", price: "10$", image: "./assets/images/pizza/veggie-lover.png" },
];


const productContainer = document.querySelector('.product-container');
function createProductItem(product) {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item', product.category);

    productItem.innerHTML = `
        <img src="${product.image}" alt="">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <div class="quantity-container">
            <div class="quantity">
                <button><i class="fa fa-minus"></i></button>
                <p>0</p>
                <button><i class="fa fa-plus"></i></button>
            </div>
            <div class="add-product">
                <button class="add-button" data-name="${product.name}" data-price="${product.price}">Add</button>
            </div>
        </div>
    `;

    return productItem;
}

products.forEach(product => {
    const productItem = createProductItem(product);
    productContainer.appendChild(productItem);
});

for (const product of products) {
    const imageNameParts = product.image.split('/');
    const imageName = imageNameParts[imageNameParts.length - 1].replace('.png', ''); // Extract the name between slashes and remove '.png'
    product.name = imageName;
}

console.log(products);