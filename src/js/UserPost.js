const userPostTemplate = document.createElement('template');

userPostTemplate.innerHTML = `
    <section class="post">
        <div class="post__title__wrapper">
            <h3  class="post__title">
                <slot id="post-title" name="post-title"></slot>
            </h3>
        </div>
        <div class="post__descr__wrapper">
            <p class="post__descr">
                <slot id="post-descr" name="post-descr"></slot>
            </p>
        </div>
    </section>
`;

export class UserPost extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(userPostTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.setUserCardDetails();
    }

    setUserCardDetails() {
        const {
            id,
            title,
            descr
        } = JSON.parse(this.dataset.post);
        
        const postTitle = this._shadowRoot.getElementById('post-title');
        const postDescr = this._shadowRoot.getElementById('post-descr');
        
        postTitle.innerHTML = title;
        postDescr.innerHTML = descr;
        //postId. = id;
    }
}