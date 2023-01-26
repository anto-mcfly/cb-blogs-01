export class Comments extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.getModel();
    }

    get userId() {
        return this.getAttribute('user-id');
    }

    getModel() {
        return new Promise((res, rej) => {
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(data => data.json())
            .then((json) => {
                const posts = json.filter(post => post.userId.toString() === this.userId.toString());
                this.renderComments(posts);
                res();
            })
            .catch((error) => rej(error));
        })
    }

    renderComments(comments) {
        comments.forEach(comment => {            
            const postElement = document.createElement('comment');
        
            const postDetails = {
                title: comment.title,
                descr: comment.body              
            };
            
            this.appendChild(postElement);
        });
    }

}