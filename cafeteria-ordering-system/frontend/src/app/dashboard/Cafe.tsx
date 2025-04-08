import React from 'react';
import './styles/styles.css';

const Cafe: React.FC = () => {
    return (
        <>
            {/* Header */}
            <header>
                <div className="navbar-container">
                    {/* Logo */}
                    <div className="logo">
                        <a href="cafe.html">
                            <h1>Cafe CSUF</h1>
                        </a>
                    </div>

                    {/* Search Container */}
                    <div className="search-container">
                        <input type="search" placeholder="Search for something..." />
                        <button className="search-button">
                            <img src="images/search.svg" className="icon" alt="Search" />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="nav-menu">
                        <ul>
                            <li>
                                <a href="cart.html" title="Cart">
                                    <img src="images/cart.svg" className="icon" alt="Cart" />
                                    <span className="nav-text">Bag</span>
                                </a>
                            </li>
                            <li>
                                <a href="account.html" title="Account">
                                    <img src="images/account.svg" className="icon" alt="Account" />
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
                {/* Categories Section */}
                <section className="categories">
                    <div className="categories-container">
                        <h3>Welcome!</h3>
                        <br />
                        <div className="placeholder-categories">
                            <nav className="nav-menu">
                                <ul>
                                    <li>
                                        <div className="category-item">
                                            <a href="cafeteria_menu.html">
                                                <img
                                                    src="images/menu_1.svg"
                                                    className="categories-icon"
                                                    alt="Our Cafeteria"
                                                />
                                                <p>Our Cafeteria</p>
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="category-item">
                                            <a href="restaurant_menu.html">
                                                <img
                                                    src="images/menu_2.svg"
                                                    className="categories-icon"
                                                    alt="Local Restaurants"
                                                />
                                                <p>Local Restaurants</p>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Featured Meals Section */}
                <section className="products">
                    <div className="products-container">
                        <h2>Featured Meals</h2>
                        <br />
                        <div className="placeholder-products">
                            <div className="placeholder-product"></div>
                            <div className="placeholder-product"></div>
                            <div className="placeholder-product"></div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer></footer>
        </>
    );
};

export default Cafe;