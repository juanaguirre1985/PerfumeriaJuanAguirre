// catalogo.js
document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('product-container');
    const cartQuantityElement = document.getElementById('cart-quantity');
    const cartAveragePriceElement = document.getElementById('cart-average-price');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartIvaElement = document.getElementById('cart-iva');
    const cartTotalElement = document.getElementById('cart-total');
    const confirmPurchaseButton = document.getElementById('confirm-purchase');

    const products = [
        { id: 1, name: 'Invictus Pacco Rabanme', price: 220000, image: '../images/Products/invictus.jpg', description: 'Perfume Caballero 100Ml Amaderado-Citrico' },
        { id: 2, name: 'Good Girl Carolina Herrera', price: 180000, image: '../images/Products/GoodGirl.png', description: 'Perfume Dama 100 Ml Amaderado' },
        { id: 3, name: 'One Miliion Pacco Rabanne', price: 215000, image: '../images/Products/million intense.jpg', description: 'Perfume Caballero 100 Ml Amaderado' },
        { id: 4, name: '212 Men Carolina Herrera', price: 210000, image: '../images/Products/212 men.jpg', description: 'Perfume Caballero Citrico-Amaderado 100 Ml' },
        { id: 5, name: 'Orange Huggo Boss', price: 190000, image: '../images/Products/BOSS.jpg', description: 'Perfume Caballero 100 Ml Amaderado-Citrico ' },
        { id: 6, name: '360º Tradicional Dama', price: 150000, image: '../images/Products/360° TRADICIONAL WOMAN.jpg', description: 'Perfume Dama 100 Ml Floral' },
        { id: 7, name: 'Aqua Bulgary', price: 250000, image: '../images/Products/AQUA.jpg', description: 'Perfume Caballero 100 Ml Aromatico-Floral' },
        { id: 8, name: 'La vide es belle', price: 140000, image: '../images/Products/lave bella.jpg', description: 'Perfume Dama 100 ml Amaderado.' },
        { id: 9, name: '212 Rose Carolina Herrera', price: 195000, image: '../images/Products/rose212.jpg', description: 'Perfume Dama 80 Ml Intens Amaderado' },
        { id: 10, name: 'Jean Paul Men', price: 250000, image: '../images/Products/JEAN PAUL.jpg', description: 'Perfume Caballero 100 Ml Amaderado' },
        { id: 11, name: 'Easy Miyaky', price: 230000, image: '../images/Products/set3.jpg', description: 'Perfume Caballero 100 Ml.' },
        { id: 12, name: 'Tommy Hilfiguer', price: 125800, image: '../images/Products/tommy.jpg', description: 'Perfume Deportivo Caballero 100 Ml' },        
        { id: 13, name: 'WILD PARTY 212 VIP DAMA', price: 195000, image: '../images/Products/212 WILPAR.jpg', description: 'Perfume Dama 80Ml Amaderado Carolina Herrera' },
        { id: 14, name: 'WILD PARTY 212 VIP Caballero', price: 180000, image: '../images/Products/212 WILPAR MEN.jpg', description: 'Perfume Dama 80Ml Amaderado Carolina Herrera.' },
        { id: 15, name: 'Olympa Pacco Rabanne', price: 120000, image: '../images/Products/OLIMPA.jpg', description: 'Perfume Dama 80 Ml Amaderado - Precio Especial' },
       /* { id: 16, name: 'Secadora de Ropa 7kg', price: 800000, image: 'images/secadora.jpg', description: 'Secadora con capacidad para 7 kg.' },
        { id: 17, name: 'Horno de Microondas LG 1000W', price: 230000, image: 'images/microondas_lg.jpg', description: 'Microondas LG con 1000W de potencia.' },
        { id: 18, name: 'Procesador de Alimentos', price: 220000, image: 'images/procesador.jpg', description: 'Procesador de alimentos con múltiples funciones.' },
        { id: 19, name: 'Tostadora de Pan 4 Rebanadas', price: 120000, image: 'images/tostadora.jpg', description: 'Tostadora con capacidad para 4 rebanadas.' },
        { id: 20, name: 'Estufa Eléctrica 2 Puestos', price: 180000, image: 'images/estufa_electrica.jpg', description: 'Estufa eléctrica de 2 puestos.' }*/,
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price.toLocaleString()}</p>
                <button class="add" data-id="${product.id}">Agregar</button>
                <button class="remove" data-id="${product.id}">Quitar</button>
            `;
            productContainer.appendChild(productDiv);
        });
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll('.product .add').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
            });
        });

        document.querySelectorAll('.product .remove').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                removeFromCart(product);
            });
        });
    }

    function addToCart(product) {
        const existingProduct = cart.find(p => p.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSummary();
    }

    function removeFromCart(product) {
        const productIndex = cart.findIndex(p => p.id === product.id);
        if (productIndex !== -1) {
            if (cart[productIndex].quantity > 1) {
                cart[productIndex].quantity -= 1;
            } else {
                cart.splice(productIndex, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSummary();
        }
    }

    function updateCartSummary() {
        let quantity = 0;
        let subtotal = 0;

        cart.forEach(item => {
            quantity += item.quantity;
            subtotal += item.price * item.quantity;
        });

        const iva = subtotal * 0.19;
        const total = subtotal + iva;
        const averagePrice = quantity > 0 ? subtotal / quantity : 0;

        cartQuantityElement.textContent = `Cantidad de productos agregados: ${quantity}`;
        cartAveragePriceElement.textContent = `Precio promedio: $${averagePrice.toLocaleString()}`;
        cartSubtotalElement.textContent = `Subtotal: $${subtotal.toLocaleString()}`;
        cartIvaElement.textContent = `IVA 19%: $${iva.toLocaleString()}`;
        cartTotalElement.textContent = `Total a pagar: $${total.toLocaleString()}`;
    }

    confirmPurchaseButton.addEventListener('click', function() {
        window.location.href = '../carrito/carrito.html';
    });

    renderProducts();
    updateCartSummary();
});
