import { EVENTS } from './components/GitHubAvatar.js';

const ERROR_IMAGE = 'ERROR';
const LOADING_IMAGE = 'LOADING';

document
    .querySelectorAll('github-avatar')
    .forEach(avatar => {
        avatar
            .addEventListener(
                EVENTS.AVATAR_LOAD_COMPLETE,
                e=> {
                    console.log(
                        'Avatar load',
                        e.detail.avatar
                    )
                }
            )

            avatar
            .addEventListener(
                EVENTS.AVATAR_LOAD_ERROR,
                e=> {
                    console.log(
                        'Avatar loading ERROR',
                        e.detail.error
                    )
                }
            )
    })



const getGithubAvatarUrl = async user => {
    if(!user) {
        return 
    }

    const url = `https://api.github.com/users/${user}`;

    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(response.statusText)
    }

    const data = await response.json();
    return data.avatar_url;

}

export default class GitHubAvatar extends HTMLElement {
    constructor() {
        super();
        this.url = LOADING_IMAGE;
    }

    get user () {
        return this.getAttribute('user');
    } 

    set user (value) {
        this.setAttribute('user', value);
    }

    render() {
        window.requestAnimationFrame(()=>{
            this.innerHTML = '';
            const img = document.createElement('img');
            img.src = this.url;
            this.appendChild(img);
        });
    }

    async loadNewAvatar () {
        const { user } = this;
        if(!user) {
            return;
        }
        try {
            this.url = await getGithubAvatarUrl(user);
            this.onLoadAvatarComplete();
        } catch (e) {
            this.url = ERROR_IMAGE;
            this.onLoadAvatarError(e);
        }

        this.render();
    }

    connectedCallback() {
        this.render();
        this.loadNewAvatar();
    }

    onLoadAvatarComplete () {
        const event = new CustomEvent(AVATAR_LOAD_COMPLETE,
            {
                detail: {
                    avatar: this.url
                }
            }
            
            );
        
        this.dispatchEvent(event);
    }

    onLoadAvatarError () {
        const event = new CustomEvent(AVATAR_LOAD_ERROR,
            {
                detail: {
                    avatar: this.url
                }
            }
            
            );

            this.dispatchEvent(event);
    }
}

