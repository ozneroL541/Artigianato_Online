/**
 * This component is used to create the page layout with a navbar, a footer and a dynamic title.
 * @author Leonardo Basso
 */
class UserMessage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const title = this.getAttribute("msg-title") || "Nessun titolo";
        const description = this.getAttribute("msg-desc") || "Nessuna descrizione";
        const product = this.getAttribute("msg-prod") || " ";
        const date = this.getAttribute("msg-date") || "Nessuna Data";

        this.shadowRoot.innerHTML = `
            <section class="message" onclick="console.log('click')">
            <header class="message__header">
                <h2 class="message__title">${title}</h2>
                <small class="message__product">${product}</small>
            </header>
                <p class="message__description">${description}</p>
            </section>
            <dialog class="message__modal">
                
            </dialog>
            <style>
                * {
                   margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: system-ui, serif;
                }
                .message {
                    width: 100%;
                    max-width: 600px; /* Imposta una larghezza massima per il messaggio */
                    border: 1px solid rgba(238,238,238,0.03);
                    background-color: rgba(238,238,238,0.05);
                    padding: .5rem;
                    border-radius: .5rem;
                }
                .message__title {
                    font-size: 1.2rem;
                    color: #eee;
                }
                .message__description, .message__product {
                    color: rgba(238,238,238,.5);
                }
                .message__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .message__description, .message__title {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            </style>
        `;
    }
}

customElements.define("user-message", UserMessage);
