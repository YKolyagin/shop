class ShopingCart {
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
                    $('.sub').html(`$${this.amount}`);
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
        $('.sub').html(`$${this.amount}`);
        $('.grand').html(`$${this.amount}`);
    }
    _renderItem(product){
        let $cartItemsDiv = $('<div/>', {
            class: 'product-shop-cart',
            'data-product': product.id,
            'data-price': product.price,
            'data-title': product.title
        });
        let $totalProducts = $('<div/>', {
            class: 'product-img'
        });
        let $img = $('<img/>', {
            class: 'product-img',
            alt: 'layer_43',
            src: product.img
        });
        let $totalPrice = $('<div/>', {
            class: 'product-text'
        });
        let $textItem = '<a href="#"><p class="product-name">Mango  People  T-shirt</p></a><p class="stars-cart"> ' +
            '<i class="fas fa-star"></i>' +
            '<i class="fas fa-star"></i>' +
            '<i class="fas fa-star"></i>' +
            '<i class="fas fa-star"></i>' +
            '<i class="fas fa-star-half-alt"></i></p>' +
            '<p class="color">Color:<span class="size">Red</span></p>' +
            '<p class="color-1">Size: <span class="size">Xll</span></p>';
        let $productPrice = `<div class="product-price"><p>$${product.price}</p></div>`;
        let $productQuantity = `<div class="product-quantity"><label>
                <input class="product-quantity-input" data-product="${product.id}" type="number" value="${product.quantity}">
                </label></div>`;
        let $shiping = `<div class="product-shiping">FREE</div>`;
        let $subtotal = `<div class="product-subtotal">$${product.price * product.quantity}</div>`;
        let $deleteItem = $('<div/>', {
            class: 'product-delete  product-action',
            'data-product': product.id,
        });
        let $del = $('<i/>', {
            class: 'fas fa-times-circle',
            'data-id': product.id,
        });
        $img.appendTo($totalProducts);
        $totalProducts.appendTo($cartItemsDiv);
        $totalPrice.append($textItem);
        $totalPrice.appendTo($cartItemsDiv);
        $cartItemsDiv.append($productPrice);
        $cartItemsDiv.append($productQuantity);
        $cartItemsDiv.append($shiping);
        $cartItemsDiv.append($subtotal);
        $del.appendTo($deleteItem);
        $deleteItem.appendTo($cartItemsDiv);
        $cartItemsDiv.prependTo($(this.container));
    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.id}"]`);
        $container.find('.price-card').html(`${product.quantity} <span class="x">x</span> $ ${product.price}`);
        $('.sub').html(`$${this.amount}`);
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
        $('.clear-button').click('click', event => {
            $('#shopingCart').remove();
            localStorage.clear();
            $('.sub').html(`$0`);
            $('.grand').html(`$0`);

        });
        $(`${this.container}`).click('click', event => {
            if (event.target.className === 'product-delete product-action' || event.target.tagName === 'I') {
                let productId = +$(event.target).data('id');
                let find = this.cartItems.find(product => product.id === productId);
                if (find.quantity > 1){
                    find.quantity--;
                    $(`input[data-product='${productId}']`).val(find.quantity);
                    $('.product-subtotal').html(`$${find.quantity * find.price}`);
                    this.countGoods--;
                    this.amount -= +find.price;
                    this._updateCart(find);
                } else {
                    $(`.product-shop-cart[data-product='${productId}']`).remove();
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