const userPostTemplate = document.createElement('template');
userPostTemplate.innerHTML = `
    <section class="comment">
        <div class="comment__email__wrapper">
            <h3  class="comment__email">
                <slot id="comment-email" name="comment-email"></slot>
            </h3>
        </div>
        <div class="comment__title__wrapper">
            <h3  class="comment__title">
                <slot id="comment-title" name="comment-title"></slot>
            </h3>
        </div>
        <div class="comment__descr__wrapper">
            <p class="comment__descr">
                <slot id="comment-descr" name="comment-descr"></slot>
            </p>
        </div>
    </section>
    <style>
        .comment {
            background-color: #DE5F5BFF;
            font-size: 0.75em;
            padding: 10px;
            border-radius: 25px;
            margin-bottom: 10px
        }
    </style>
`;

export class Comment extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(userPostTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.setCommentDetails();
    }

    setCommentDetails() {
        const {
            email,
            title,
            descr
        } = JSON.parse(this.dataset.comment);
        
        const commentEmail = this._shadowRoot.getElementById('comment-email');
        const commentTitle = this._shadowRoot.getElementById('comment-title');
        const commentDescr = this._shadowRoot.getElementById('comment-descr');

        commentEmail.innerHTML = email;
        commentTitle.innerHTML = title;
        commentDescr.innerHTML = descr;
    }
}