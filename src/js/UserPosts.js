export class UserPosts extends HTMLElement {
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
                this.renderPosts(posts);
                res();
            })
            .catch((error) => rej(error));
        })
    }

    renderPosts(posts) {
        posts.forEach(post => {            
            const postElement = document.createElement('user-post');
        
            const postDetails = {
                id: post.id,
                title: post.title,
                descr: post.body              
            };
    
            console.log(postDetails);
        
            postElement.setAttribute('data-post', JSON.stringify(postDetails));
            this.appendChild(postElement);
        });
    }

}