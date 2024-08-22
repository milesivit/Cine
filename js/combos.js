document.addEventListener('DOMContentLoaded', function() {
    var cart = [];

    var addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var name = button.dataset.name;
            var price = parseFloat(button.dataset.price);

            cart.push({ name: name, price: price });
            renderCart();
        });
    });

    function renderCart() {
        var total = 0;
        var cartHtml = '';

        cart.forEach(function(item, i) {
            cartHtml += '<li class="list-group-item">' + item.name + ' $' + item.price.toFixed(2) +
                '<button class="btn btn-outline-danger btn-sm float-right btn-remove-from-cart ms-2" data-i="' + i + '"><i class="bi bi-x-lg"></i></button></li>';
            total += item.price;
        });

        document.getElementById('cart').innerHTML = cartHtml;
        document.getElementById('total').textContent = total.toFixed(2);

        var removeButtons = document.querySelectorAll('.btn-remove-from-cart');
        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var i = button.dataset.i;
                cart.splice(i, 1);
                renderCart();
            });
        });
    }

    document.getElementById('clear-cart').addEventListener('click', function() {
        cart = [];
        renderCart();
    });
});
