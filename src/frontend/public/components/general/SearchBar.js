import {getCategories, populateSelectMenu} from "../../script/utils.js";
import {prepareSearch} from "../../script/crud/products/search.js";

/**
 * This component implements a searchbar with the following inputs: `name`, `category`, `minimum price`, `maximum price`
 * and `minimum available products`
 *
 * The search redirects the user to the following url: <i>/products/search?params</i>
 * @author Leonardo Basso
 */
class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = `
            <span id="searchbar" role="search" aria-expanded="false">
                <label class="homepage__product__search">
                    <span class="homepage__product__search__top">
                        <input type="text" class="homepage__product__search__input" placeholder="Nome" id="searchProductName">
                        <button class="homepage__product__search__button" id="searchProductButton">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </button>
                    </span>
                    <span class="homepage__product__search__bottom">
                        <select id="searchProductCategory" class="homepage__product__search__category" >
                            <option value="">All Categories</option>
                        </select>
                        <input id="searchProductMinPrice" type="number" class="homepage__product__search__input" placeholder="Minimo Prezzo">
                        <input id="searchProductMaxPrice" type="number" class="homepage__product__search__input" placeholder="Massimo Prezzo">
                        <input id="searchProductStock" type="number" class="homepage__product__search__input" placeholder="Disponibilita">
                    </span>
                </label>
            </span>


            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                input, button, select, option {
                    border: 1px solid rgba(238, 238, 238, 0.03);
                    padding: .5rem 1rem;
                    background-color: rgba(238, 238, 238, 0.05);
                    border-radius: .5rem;
                    color: #eee;
                }
                button {cursor: pointer}
                .homepage__product__search {
                    display: grid;
                    width: 90vw;
                    max-width: 1200px;
                    gap: .3rem;
                    margin: .5rem auto;
                }
                .homepage__product__search__top,
                .homepage__product__search__bottom {
                    display: flex;
                    gap: .3rem;
                    width: 100%;
                }
                .homepage__product__search__input,
                .homepage__product__search__category {
                    width: 100%;
                    min-height: 40px;
                }
                .homepage__product__search__bottom {
                    gap: .3rem;
                    max-height: 0;
                    opacity: 0;
                    overflow: hidden;
                    transform: translateY(-10px);
                    transition: max-height 1s ease-in-out, opacity 0.4s ease, transform 0.4s ease;
                }
                
                .homepage__product__search__bottom.visible {
                    max-height: 100vh;
                    opacity: 1;
                    transform: translateY(0);
                }

            </style>
        `;

        const searchNameInput = this.shadowRoot.getElementById('searchProductName');
        const searchButton = this.shadowRoot.querySelector('.homepage__product__search__button');
        const searchBottom = this.shadowRoot.querySelector('.homepage__product__search__bottom');
        const selectProductCategory = this.shadowRoot.getElementById('searchProductCategory');

        // Shows the full searchbar at click
        const handleFocus = () => {
            searchBottom.classList.add('visible');
            searchNameInput.removeEventListener('focus', handleFocus);
            const searchbar = this.shadowRoot.getElementById('searchbar');
            searchbar.ariaExpanded = "true"
        };
        searchNameInput.addEventListener('focus', handleFocus);

        // Populates the category menu
        const categories = await getCategories();
        populateSelectMenu(categories.categories, selectProductCategory);

        // Send search data to /search
        searchButton.addEventListener('click', () => {
            const productName = this.shadowRoot.getElementById('searchProductName').value;
            const category = selectProductCategory.value;
            const minPrice = this.shadowRoot.getElementById('searchProductMinPrice').value;
            const maxPrice = this.shadowRoot.getElementById('searchProductMaxPrice').value;
            const availability = this.shadowRoot.getElementById('searchProductStock').value;
            prepareSearch(productName, category, minPrice, maxPrice, availability)
        });
    }
}

customElements.define("search-bar", SearchBar);
