class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        const name = this.getAttribute('name');
        const category = this.getAttribute('category');
        const artisan = this.getAttribute('artisan')
        const price = this.getAttribute('price');
        const stock = this.getAttribute('stock');

        this.shadowRoot.innerHTML = `

            <article class="product standard-box">
                <div class="product__info text-small">
                    <p class="product__category">${category}</p>
                    <p class="product__stock">${stock} rimasti</p>
                </div>
                <h2 class="product__name">${name}</h2>
                <div class="product__info">
                    <p class="product__artisan text-small">Artigiano: ${artisan}</p>
                </div>
                <p class="product__price">${price}€</p>
                <button class="btn-edit">Compra!</button>
            </article>
            
            <style>
                .standard-box {
                    border: 1px solid rgba(238, 238, 238, 0.03);
                    background-color: rgba(238, 238, 238, 0.05);
                    border-radius: 10px;
                }

                .product {
                    padding: .8rem;
                    display: grid;
                    gap: .4rem;
                    margin-bottom: .5rem;
                    max-height: 200px;
                }
            
                .product__name {
                    font-size: 1.2rem;
                    text-wrap: balance;
                }
            
                .product__info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .product__category {
                    background-color: rgba(238, 238, 238, 0.05);
                    border: 1px solid rgba(238, 238, 238, 0.05);
                    padding: .35rem;
                    border-radius: 100vh;
                }
                
                .btn-edit {
                    border: 1px solid rgba(48, 255, 76, 0.2);
                    background-color: rgba(48, 255, 76, 0.2);
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                input, button, dialog, select, option {
                    border: 1px solid rgba(238, 238, 238, 0.03);
                    padding: .5rem 1rem;
                    background-color: rgba(238, 238, 238, 0.05);
                    border-radius: .5rem;
                }
                
                option { background-color: #232529; }

                .text-small { font-size: 0.75rem; }

                a { text-decoration: none; }
                h1, h2, h3, h4, h5, h6, p, a, span, li, input, textarea, select, button { color: #eee; }
                button {cursor: pointer}
                    @media screen and (min-width: 823px) {
                        .product {
                            width: 250px;
                            margin-bottom: 0;
                        }
                    }
                    @media screen and (min-width: 900px) {
                        .product {
                            width: 300px;
                        }
                }

            </style>
        `;
    }
}

customElements.define('product-card', ProductCard);
