class Comments {
    constructor(source, container) {
        this.source = source;
        this.container = container;
        this.comments = [];
        this._init(this.source);
    }
    _init(source) {
        $(document).ready(() => {
            fetch(source)
                .then(result => result.json())
                .then(data => {
                    for (let comment of data) {
                        this.comments.push(comment);
                    }
                });
            $('#comment').on("click", event => {
                if (event.target.tagName === "IMG") {
                    let comImg = $('.com-img');
                    let commentText1 = $('.comment-text1');
                    let commentText2 = $('.comment-text2');
                    switch (event.target.id) {
                        case 'comm1':
                            comImg.attr('src', this.comments[this.comments.length - 1].img);
                            commentText1.html(`<p>${this.comments[this.comments.length - 1].comment}</p>`);
                            commentText2.html(`<p><span class="bin">${this.comments[this.comments.length - 1].name}</span>
                                ${this.comments[this.comments.length - 1].city}
                                </p>`);
                            break;
                        case 'comm2':
                            comImg.attr('src', this.comments[this.comments.length - 2].img);
                            commentText1.html(`<p>${this.comments[this.comments.length - 2].comment}</p>`);
                            commentText2.html(`<p><span class="bin">${this.comments[this.comments.length - 2].name}</span>
                                ${this.comments[this.comments.length - 2].city}
                                </p>`);
                            break;
                        case 'comm3':
                            comImg.attr('src', this.comments[this.comments.length - 3].img);
                            commentText1.html(`<p>${this.comments[this.comments.length - 3].comment}</p>`);
                            commentText2.html(`<p><span class="bin">${this.comments[this.comments.length - 3].name}</span>
                                ${this.comments[this.comments.length - 3].city}
                                </p>`);
                            break;
                    }
                }
            });
        });
    }

}