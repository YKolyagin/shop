class Product {
    constructor(id, title, price, img, container){
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.container = container;
        this._render();
    }
    _render(){
        let $wrapper = $('<div/>', {
            class: 'items-up-1',
            id: this.id
        });
        let $link = $('<a/>', {
            class: 'item',
            href: 'single-page.html'
        });
        // let $wrapper1 = $(`<div class="product"></div>`);
        let $img = $('<img/>', {
            class: 'item-photo',
            alt: 'items-up-1',
            src: this.img
        });
        let $desc = $('<div/>', {
            class: 'product-text-box'
        });
        let $name = $('<p/>', {
            class: 'item-name',
            text: this.title
        });
        let $price = $('<p/>', {
            class: 'price',
            text: `$ ${this.price}`
        });
        let $buyBtn = $('<div/>', {
            class: 'add',
            'data-id': this.id,
        });
        let $imgAdd = $('<img/>', {
            class: 'add-to',
            alt: 'add to',
            src: "img/Forma_1_copy.svg",
            'data-id': this.id,
        });
        let $linkAdd = $('<button/>', {
            text: 'Add to Cart',
            class: 'add-img',
            type: 'button',
            'data-id': this.id,
            'data-price': this.price,
            'data-title': this.title,
            'data-src': this.img
        });


        // Создаем структуру товара (верстку)
        $name.appendTo($desc);
        $price.appendTo($desc);
        $imgAdd.appendTo($linkAdd);
        $linkAdd.appendTo($buyBtn);
        $img.appendTo($link);
        $desc.appendTo($link);
        $buyBtn.appendTo($wrapper);
        $link.appendTo($wrapper);
        $(this.container).append($wrapper);
    }
}