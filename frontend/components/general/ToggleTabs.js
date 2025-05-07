/**
 * This component is used to create a tab interface with dynamic tabs.
 * In order for an html element to be considered a tab it needs to have data-type="tab", other elements
 * will be shown in all tabs.
 *
 * @author Leonardo Basso
 */
class ToggleTabs extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        // Get the tabs attribute and parse it as JSON
        const tabsAttribute = this.getAttribute('tabs');
        const tabs = tabsAttribute ? JSON.parse(tabsAttribute) : [];

        // Filter tabs to only include those with corresponding content
        const availableTabs = tabs.filter(tabName => this.querySelector(`#${tabName}[data-type="tab"]`));

        // Generate the tab buttons dynamically based on the available tabs
        const buttons = availableTabs.map(tab => `<button class="tab__button" data-tab="${tab}">${tab}</button>`).join('');

        this.shadowRoot.innerHTML = `
            <header class="tab__buttons">
                ${buttons}
            </header>
            <section id="tabs-content">
                <slot></slot>
            </section>
            <style>
                .tab__content {
                    display: none;
                }
                .tab__content[aria-selected="true"] {
                    display: block;
                }
                .tab__buttons {
                    background-color: rgba(238, 238, 238, 0.04);
                    color: #eeeeee;
                    border: 1px solid rgba(238, 238, 238, 0.04);
                    padding: .5rem 1rem;
                    cursor: pointer;
                    margin-right: .2rem;
                    border-radius: .5rem;
                }
                .tab__button {
                    border: none;
                    background: none;
                    color: #eee;
                    cursor: pointer;
                    opacity: 0.5;
                    transition: opacity .3s ease;
                }
                .tab__button.active {
                    opacity: 1;
                }
            </style>
        `;

        // Adds event listeners to the buttons
        this.shadowRoot.querySelectorAll('.tab__button').forEach(button => {
            button.addEventListener('click', (event) => {
                this.openTab(event.target.dataset.tab);
            });
        });

        // Shows by default the first tab
        if (availableTabs.length > 0) {
            this.openTab(availableTabs[0]);
        }
    }

    /**
     * This method is used to toggle between the content of the tabs
     * @param tabName the name of the tab to open
     * @author Leonardo Basso
     */
    openTab(tabName) {
        // Hide all tab contents
        const tabContents = this.querySelectorAll('[data-type="tab"]');
        tabContents.forEach(tabContent => {
            tabContent.setAttribute('aria-selected', 'false');
            tabContent.style.display = 'none';
        });

        // Show the selected tab content
        const selectedTab = this.querySelector(`#${tabName}`);
        if (selectedTab) {
            selectedTab.setAttribute('aria-selected', 'true');
            selectedTab.style.display = 'block';
        }

        // Styles the active button
        this.shadowRoot.querySelectorAll('.tab__button').forEach(button => {
            button.classList.remove('active');
            if (button.dataset.tab === tabName) {
                button.classList.add('active');
            }
        });
    }
}

customElements.define("toggle-tabs", ToggleTabs);
