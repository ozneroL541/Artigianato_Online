import { getCategories, populateSelectMenu } from "../../script/utils.js";

/**
 * This component is used to display a searchbar and perform search operations
 * @author Leonardo Basso
 */
class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = `
            <label class="homepage__product__search">
                <span class="homepage__product__search__top">
                    <input type="text" class="homepage__product__search__name" placeholder="Product Name">
                    <button class="homepage__product__search__button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </span>
                <span class="homepage__product__search__bottom">
                    <select id="searchProductCategory" class="homepage__product__search__category"></select>
                    <input type="number" class="homepage__product__search__name" placeholder="Price">
                    <input type="number" class="homepage__product__search__name" placeholder="in stock">
                </span>
            </label>

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
                option {
                    background-color: #232529;
                }
                .homepage__product__search {
                    display: grid;
                    width: 90vw;
                    max-width: 1000px;
                    gap: .3rem;
                    margin: .5rem auto;
                }

                .homepage__product__search__top,
                .homepage__product__search__bottom {
                    display: flex;
                    gap: .3rem;
                    width: 100%;
                }

                .homepage__product__search__name,
                .homepage__product__search__category {
                    width: 100%;
                    min-height: 40px;
                }

                .homepage__product__search__bottom {
                    display: none;
                    max-height: 0;
                    opacity: 0;
                    overflow: hidden;
                    transition: all 0.3s ease-out;
                }

                .visible {
                    display: flex;
                    max-height: 200px;
                    opacity: 1;
                }
            </style>
        `;

        // Shows at click the hidden search parameters
        const searchNameInput = this.shadowRoot.querySelector('.homepage__product__search__top .homepage__product__search__name');
        const searchBottom = this.shadowRoot.querySelector('.homepage__product__search__bottom');
        const selectProductCategory = this.shadowRoot.getElementById('searchProductCategory');

        searchNameInput.addEventListener('click',() =>{
            searchBottom.classList.add('visible');
        })

        const categories = await getCategories();
        populateSelectMenu(categories.categories, selectProductCategory);
    }
}

customElements.define("search-bar", SearchBar);
