/**
 * This component is used to create the page layout with a navbar, a footer and a dynamic title.
 * @author Leonardo Basso
 * @slot - The main content of the page
 */
class PageLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const title = this.getAttribute("page-title") || "Artigiani Online";
        document.title = `${title} - Artigiani Online`;

        const isUserLogged = localStorage.getItem('isUserLogged') === 'true';

        this.shadowRoot.innerHTML = `
            <section class="page__layout">
                <header class="navbar" id="navbar">
                    <div class="logo-menu">
                        <h2 class="logo">Artigiani Online</h2>
                        <span class="burger" aria-label="Navigation menu" aria-expanded="false"></span>
                    </div>
                    <nav class="navbar__links" id="navbar_links">
                        <a class="link" href="/">Home</a>
                        ${isUserLogged ? '<a class="link" id="logoutLink" href="#">Logout</a>' : '<a class="link" href="/auth/login">Login</a>'}
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

        burger.addEventListener('click', () => {
            links.classList.toggle('links_show');
            // Accessibility
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
        });

        // Aggiungi un listener per il click sul link "Logout"
        const logoutLink = this.shadowRoot.getElementById('logoutLink');
        if (logoutLink) {
            logoutLink.addEventListener('click', (event) => {
                // Logout code
                event.preventDefault();
                localStorage.setItem("userToken", null);
                localStorage.setItem("userType", null);
                localStorage.setItem("isUserLogged", "false");
                window.location.href = "/"
            });
        }
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
