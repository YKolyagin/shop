$(document).ready(() => {

    // Товары
    let product = new ProductList('product.json', '#products', 8);
    // Корзина
    let cart = new Cart('product.json', '#cart');

    // Добавление товара в корзину
    $('.items-up').click(e => {
        if (e.target.nodeName === 'BUTTON') {
            cart.addProduct(e.target);
        } else if (e.target.parentNode.nodeName === 'BUTTON') {
            cart.addProduct(e.target.parentNode);
        }
    });

    // выпадающий browse
    $('.drop-browseOn').click(e => {
        if (e.target.nodeName === 'LI') {
            $('#textBrows').text(e.target.innerHTML);
        } else if (e.target.nodeName === 'P') {
            return;
        } else {
            $('.drop-browseOn').attr('class', 'drop-browse');
        }
    });

    // отзывы
    let comment = new Comments('comments.json', 'comment');
});