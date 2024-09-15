document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;
    const cartItemsElement = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    const orderNumberElement = document.getElementById('order-number');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartIvaElement = document.getElementById('cart-iva');
    const cartTotalElement = document.getElementById('cart-total');
    const invoiceButton = document.getElementById('invoice-button');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const today = new Date();
    const orderNumber = `RC${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

    function formatCurrency(value) {
        return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    }

    function renderCart() {
        cartItemsElement.innerHTML = '';
        let subtotal = 0;
        let totalIva = 0;
        let totalAmount = 0;

        cart.forEach((item, index) => {
            const price = item.price;
            const iva = parseFloat((price * 0.19).toFixed(2));
            const total = parseFloat((price + iva).toFixed(2));

            subtotal += price;
            totalIva += iva;
            totalAmount += total;

            const row = cartItemsElement.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${formatCurrency(price)}</td>
                <td>${formatCurrency(iva)}</td>
                <td>${formatCurrency(total)}</td>
            `;
        });

        const formattedSubtotal = formatCurrency(subtotal);
        const formattedTotalIva = formatCurrency(totalIva);
        const formattedTotalAmount = formatCurrency(totalAmount);

        orderNumberElement.textContent = `Nro de Compra: ${orderNumber}`;
        cartSubtotalElement.textContent = `Subtotal: ${formattedSubtotal}`;
        cartIvaElement.textContent = `IVA 19%: ${formattedTotalIva}`;
        cartTotalElement.textContent = `Total a pagar: ${formattedTotalAmount}`;
    }

    function generatePDF() {
        const doc = new jsPDF();
        const storeName = "Perfumería Juan Aguirre";
        const formattedOrderNumber = orderNumber;

        doc.setFontSize(16);
        doc.text(storeName, 105, 10, { align: 'center' });
        doc.setFontSize(14);
        doc.text(`Recibo de Compra: ${formattedOrderNumber}`, 105, 20, { align: 'center' });

        let y = 30;
        doc.setFontSize(12);
        doc.text('Resumen de Compra:', 10, y);
        y += 10;

        // Encabezados de tabla en PDF
        doc.text('Ítem', 10, y);
        doc.text('Descripción', 40, y);
        doc.text('Precio', 100, y);
        doc.text('IVA', 130, y);
        doc.text('Total', 160, y);
        y += 10;

        let subtotal = 0;
        let totalIva = 0;
        let totalAmount = 0;

        cart.forEach((item, index) => {
            const price = item.price;
            const iva = parseFloat((price * 0.19).toFixed(2));
            const total = parseFloat((price + iva).toFixed(2));

            subtotal += price;
            totalIva += iva;
            totalAmount += total;

            doc.text(`${index + 1}`, 10, y);
            doc.text(`${item.name}`, 40, y);
            doc.text(formatCurrency(price), 100, y);
            doc.text(formatCurrency(iva), 130, y);
            doc.text(formatCurrency(total), 160, y);
            y += 10;
        });

        // Totales en PDF
        const formattedSubtotal = formatCurrency(subtotal);
        const formattedTotalIva = formatCurrency(totalIva);
        const formattedTotalAmount = formatCurrency(totalAmount);

        doc.text(`Subtotal: ${formattedSubtotal}`, 130, y);
        y += 10;
        doc.text(`IVA 19%: ${formattedTotalIva}`, 130, y);
        y += 10;
        doc.text(`Total a pagar: ${formattedTotalAmount}`, 130, y);
        y += 10;
        doc.text("Gracias por tu compra, te esperamos pronto.", 105, y, { align: 'center' });
        y += 20;

        // Información de contacto
        doc.text("Atendido por Juan Alexander Aguirre", 105, y, { align: 'center' });
        y += 10;
        doc.text("Nequi: 3142492133", 105, y, { align: 'center' });
        y += 10;
        doc.text("Daviplata: 3142492133", 105, y, { align: 'center' });
        y += 10;
        doc.text("WhatsApp: 3118357929", 105, y, { align: 'center' });
        y += 10;
        doc.text("Bogotá – Colombia", 105, y, { align: 'center' });
        doc.text("2024", 105, y + 10, { align: 'center' });

        doc.save(`RC${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}.pdf`);
    }

    invoiceButton.addEventListener('click', function() {
        generatePDF();
        localStorage.removeItem('cart');
        window.location.href = '../catalogo/catalogo.html';
    });

    renderCart();
});
