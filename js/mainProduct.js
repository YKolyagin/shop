$(document).ready(() => {

    // Товары
    let product = new ProductList('product.json', '#products', 9);
    // Корзина
    let cart = new Cart('product.json', '#cart');

    // отзывы
    let comment = new Comments('comments.json', 'comment');

    // Добавление товара в корзину
    $('.items-up').click(e => {
        if (e.target.nodeName === 'BUTTON') {
            cart.addProduct(e.target);
        } else if (e.target.nodeName === 'IMG') {
            cart.addProduct(e.target.parentNode);
        }
    });

    //slider-range
    $( () => {
        let sliderRange = $( "#slider-range" );
        let amount = $( "#amount" );
        let amount1 = $( "#amount1" );
        sliderRange.slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 52, 400 ],
            slide: function( event, ui ) {
                amount.html( "$" + ui.values[ 0 ]);
                amount1.html( "$" + ui.values[ 1 ]);
            }
        });
        amount.html( "$" + sliderRange.slider( "values", 0 ));
        amount1.html( "$" + sliderRange.slider( "values", 1 ));
    } );

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
});