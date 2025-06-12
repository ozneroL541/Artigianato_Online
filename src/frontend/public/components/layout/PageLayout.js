import {decodeJWT, getUserType} from "../../script/jwt.js";

/**
 * This component is used to create the page layout with a navbar.
 *
 * This component automatically generates SEO tags for the <title> tag, Twitter and Open Graph using the `page-title` parameter
 * @param {string} page-title The page title
 * @slot - The main content of the page
 * @author Leonardo Basso
 */
class PageLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        // SEO
        const title = this.getAttribute("page-title") || "Artigiani Online";
        document.title = `${title} - Artigiani Online`;

        let metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (!metaTwitterTitle) {
            metaTwitterTitle = document.createElement('meta');
            metaTwitterTitle.name = "twitter:title";
            metaTwitterTitle.content = `${title} - Artigiani Online`;
            document.head.appendChild(metaTwitterTitle);
        } else { metaTwitterTitle.content = `${title} - Artigiani Online`; }

        let metaOgTitle = document.querySelector('meta[property="og:title"]');
        if (!metaOgTitle) {
            metaOgTitle = document.createElement('meta');
            metaOgTitle.property = "og:title";
            metaOgTitle.content = `${title} - Artigiani Online`;
            document.head.appendChild(metaOgTitle);
        } else { metaOgTitle.content = `${title} - Artigiani Online`;}

        // Create Navbar
        const token = window.localStorage.getItem("userToken");
        const payload = getUserType(token);
        const userType = payload ? payload : "unregistered";

        this.shadowRoot.innerHTML = `
        <section class="page__layout">
            <header class="navbar" id="navbar">
                <div class="logo-menu">
                    <h2 class="logo">Artigiani Online</h2>
                    <span class="burger" aria-label="Navigation menu" aria-expanded="false"></span>
                </div>
                <nav class="navbar__links" id="navbar_links">
                    <a class="link" href="/">Home</a>
                    ${userType === "amministratore" || userType === "artigiano" ? '<a class="link" href="/' + userType + '/dashboard">Dashboard</a>' : ''}
                    ${userType !== "unregistered" ? '<a class="link" id="logoutLink" href="#">Logout</a>' : '<a class="link" href="/auth/login">Login</a>'}
                    <a class="link" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                    </a>
                </nav>
            </header>
            <main>
                <slot></slot>
            </main>
        </section>

        <style> ${css} </style>
    `;

        const burger = this.shadowRoot.querySelector('.burger');
        const links = this.shadowRoot.querySelector('.navbar__links');
        const logoutLink = this.shadowRoot.getElementById('logoutLink');

        burger.addEventListener('click', () => {
            links.classList.toggle('links_show');
            // Accessibility
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
        });

        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.clear();
            window.location.href = "/";
        });
    }
}

const css = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: system-ui, serif;
}
header, main, footer {
    padding: .6rem 1rem;
}
.navbar {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.logo-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #fff
}

.navbar__links {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition: max-height 0.8s ease-in-out;
    width: 100%;
    overflow: hidden;
    max-height: 0;
    margin-top: 1rem;
    gap: 1rem;
}
.navbar__links .link, footer p {
    color: #eee;
    text-decoration: none;
}
.burger {
    border-radius: 1rem;
    display: block;
    background-color: black;
    width: 30px;
    height: 4px;
    position: relative;
    cursor: pointer;
    background-color: #eee;
}
.burger:before, .burger:after {
    content: '';
    display: block;
    border-radius: 1rem;
    background: black;
    width: 30px;
    height: 4px;
    position: absolute;
    left: 0;
    background-color: #eee;
}
.burger:before {
    top: -8px;
}
.burger:after {
    bottom: -8px;
}
@media screen and (min-width: 600px) {
    header, main, footer {
        padding: .6rem 2rem;
    }
    .navbar {
        flex-direction: row;
    }
    .navbar__links {
        display: flex;
        flex-direction: row;
        max-height: none;
        margin-top: 0;
    }
    .burger {
        display: none;
    }
}
.links_show {
    max-height: 200px !important;
    overflow: hidden;
}
`

customElements.define("page-layout", PageLayout);
