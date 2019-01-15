class Cart {
    constructor(source, container){
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общее стоимость товаров в корзине
        this.cartItems = []; // Массив со всеми товарами
        this._init(this.source);
    }
    _init(source){
        if (!localStorage.getItem('myCard')) {
            fetch(source)
                .then(result => result.json())
                .then(data => {
                    let i = 0;
                    for (let product of data){
                        if (i < 2) {
                            this.cartItems.push(product);
                            this._renderItem(product);
                            this.countGoods += +product.quantity;
                            this.amount += +product.price;
                            i++
                        }
                    }
                    localStorage.setItem('myCard', JSON.stringify(this.cartItems));
                    localStorage.setItem('countGoods', this.countGoods);
                    localStorage.setItem('amount', this.amount);
                    this._renderSum();
                    this._plus();
                    this._del();
                });
        } else {
            this.cartItems = JSON.parse(localStorage.getItem('myCard'));
            for (let product of this.cartItems) {
                this._renderItem(product);
            }
            this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
            this.amount = JSON.parse(localStorage.getItem('amount'));
            this._renderSum();
            this._plus();
            this._del();
        }
    }
    _renderSum(){
        $('.card-buttom').remove();
        $('.total-500').remove();
        let $total = `<div class="total-500"><p><span class="total">TOTAL</span>$ ${this.amount}</p></div>`;
        let $cardButton = `<div class="card-buttom"><a class="checkout-link" href="#"><div class="checkout">
                           <p>Checkout</p></div></a><a class="checkout-link" href="shoping-cart.html"><div class="checkout">
                           <p>Go to cart</p></div></a></div>`;
        $(this.container).append($total);
        $(this.container).append($cardButton);
    }
    _renderItem(product){
        let $cartItemsDiv = $('<div/>', {
            class: 'product-card',
            'data-product': product.id,
            'data-price': product.price,
            'data-title': product.title
        });
        let $totalProducts = $('<div/>', {
            class: 'img-prod-card'
        });
        let $img = $('<img/>', {
            class: 'imgCard',
            alt: 'layer_43',
            src: product.img
        });
        let $totalPrice = $('<div/>', {
            class: 'product-name-card'
        });
        let $name = $('<p/>', {
            class: 'name-prod-card',
            text: product.name
        });
        let $star = $('<p/>', {
            class: 'stars',
        });
        let $starItem = '<p class="stars">\n' +
            '<i class="fas fa-star"></i>\n' +
            '<i class="fas fa-star"></i>\n' +
            '<i class="fas fa-star"></i>\n' +
            '<i class="fas fa-star"></i>\n' +
            '<i class="fas fa-star-half-alt"></i>\n' +
            '</p>';
        let $priceCard = `<p class="price-card">${product.quantity} <span class="x">x</span> $ ${product.price}.00</p>`;
        let $deleteItem = $('<div/>', {
            class: 'product-delete',
            'data-product': product.id,
        });
        let $del = $('<i/>', {
            class: 'fas fa-times-circle',
            'data-id': product.id,
        });
        $img.appendTo($totalProducts);
        $totalProducts.appendTo($cartItemsDiv);
        $name.appendTo($totalPrice);
        $star.append($starItem);
        $star.appendTo($totalPrice);
        $totalPrice.append($priceCard);
        $totalPrice.appendTo($cartItemsDiv);
        $del.appendTo($deleteItem);
        $deleteItem.appendTo($cartItemsDiv);
        $cartItemsDiv.prependTo($(this.container));
    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.id}"]`);
        $container.find('.price-card').html(`${product.quantity} <span class="x">x</span> $ ${product.price}`);

        $container.find('.total-500').html(`<div class="total-500"><p><span class="total">TOTAL</span>$ ${this.amount}</p></div>`);
    }
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id === productId);
        if (find){
            find.quantity++;
            this.countGoods++;
            this.amount += +find.price;
            this._updateCart(find);
        } else {
            let product = {
                id: productId,
                img: $(element).data('src'),
                price: +$(element).data('price'),
                name: $(element).data('title'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.countGoods++;
            this.amount += +product.price;
            this._renderItem(product);
        }
        localStorage.setItem('myCard', JSON.stringify(this.cartItems));
        localStorage.setItem('countGoods', this.countGoods);
        localStorage.setItem('amount', this.amount);
        this._renderSum();
    }
    _plus() {
        $('#cart').click('click', event => {
            if (event.target.className === 'plus') {
                this.addProduct(event.target);
            }
        });
    }
    _del() {
        $('#cart').click('click', event => {
            if (event.target.className === 'product-delete' || event.target.tagName === 'I') {
                let productId = +$(event.target).data('id');
                let find = this.cartItems.find(product => product.id === productId);
                if (find.quantity > 1){
                    find.quantity--;
                    this.countGoods--;
                    this.amount -= +find.price;
                    this._updateCart(find);
                } else {
                    $(`.product-card[data-product='${productId}']`).remove();
                    let index = this.cartItems.findIndex(product => product.id === productId);
                    this.cartItems.splice(index, 1);
                    this.countGoods--;
                    this.amount -= +find.price;
                }
                localStorage.setItem('myCard', JSON.stringify(this.cartItems));
                localStorage.setItem('countGoods', this.countGoods);
                localStorage.setItem('amount', this.amount);
                this._renderSum();
            }
        });
    }
}