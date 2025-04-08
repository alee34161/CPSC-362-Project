import React from 'react';
import '../dashboard/styles/styles.css';

const CafeteriaMenu: React.FC = () => {
    return (
        <>
            {/* Header */}
            <header>
                <div className="navbar-container">
                    {/* Logo */}
                    <div className="logo">
                        <a href="/dashboard">
                            <h1>Cafe CSUF</h1>
                        </a>
                    </div>

                    {/* Search Container */}
                    <div className="search-container">
                        <input type="search" placeholder="Search for something..." />
                        <button className="search-button">
                            <img src="/search.svg" className="icon" alt="Search" />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="nav-menu">
                        <ul>
                            <li>
                                <a href="/cart" title="Cart">
                                    <img src="/cart.svg" className="icon" alt="Cart" />
                                    <span className="nav-text">Bag</span>
                                </a>
                            </li>
                            <li>
                                <a href="/user" title="Account">
                                    <img src="/account.svg" className="icon" alt="Account" />
                                    <span className="nav-text">Account</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Hamburger Menu */}
                    <button className="hamburger-menu" aria-label="Toggle menu">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {/* Products Section */}
                <section className="products">
                    <h3>Cafe CSUF Menu</h3>
                    <div className="products-container">
                        <img src="/breakfast.svg" className="categories-food" alt="Breakfast" />
                        <div className="placeholder-products">
                            {[...Array(6)].map((_, index) => (
                                <div className="placeholder-product" key={index}>
                                    <div className="product-buttons">
                                        <button className="add-to-bag">Add</button>
                                        <button className="remove-from-bag">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer></footer>
        </>
    );
};

export default CafeteriaMenu;
