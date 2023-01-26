export class Comments extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.getModel();
    }

    get postId() {
        return this.getAttribute('post-id');
    }

    getModel() {
        return new Promise((res, rej) => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`)
            .then(data => data.json())
            .then((json) => {
                const comments = json.filter(comment => comment.postId.toString() === this.postId.toString());
                this.renderComments(comments);
                res();
            })
            .catch((error) => rej(error));
        })
    }

    renderComments(comments) {
        comments.forEach(comment => {            
            const commentElement = document.createElement('post-comment');
        
            const commentDetails = {
                email: comment.email,
                title: comment.name,
                descr: comment.body              
            };
            
            console.log(commentDetails)

            commentElement.setAttribute('data-comment', JSON.stringify(commentDetails));
            this.appendChild(commentElement);
        });
    }

}