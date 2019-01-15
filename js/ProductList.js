class ProductList {
    constructor(source, container, number){
        this.source = source;
        this.container = container;
        this.number = number;
        this._init(this.source);
    }
    _init(source){
        $(document).ready(() => {
            fetch(source)
                .then(result => result.json())
                .then(data => {
                    let i = 0;
                    for (let product of data){
                        if (i < this.number) {
                            let product1 = new Product(
                                product.id,
                                `${product.name}`,
                                product.price,
                                `${product.img}`,
                                this.container
                            );
                            i++
                        }
                    }
                });
        });
    }
}
