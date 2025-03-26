"use client";
import React, { useEffect } from 'react'; // Import React and useEffect
import './styles/styles.css'; // Import the CSS file for styling

// JavaScript begin
const cafe: React.FC = () => {
    useEffect(() => {
        // JavaScript for hamburger menu toggle for mobile
        const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.nav-menu');

        const toggleMenu = () => {
            // Toggle the 'active' class for the menu and hamburger button
            navMenu?.classList.toggle('active');
            hamburger?.classList.toggle('active');

            // Accessibility - update aria-expanded attribute
            const expanded = navMenu?.classList.contains('active') || false;
            hamburger?.setAttribute('aria-expanded', expanded.toString());
        };

        // Add event listener for the hamburger menu
        hamburger?.addEventListener('click', toggleMenu);

        // Cleanup event listener on component unmount
        return () => {
            hamburger?.removeEventListener('click', toggleMenu);
        };
    }, []); // Empty dependency array ensures this runs only once when the component mounts
    // JavaScript end

    // html begin
    return (
        <>
            {/* Header Section */}
            <header>

                <div className="navbar-container">

                    {/* Logo Section */}
                    <div className="logo">
                        <a href="index.html">
                            <h1>Cafe CSUF</h1>
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="search-container">
                        <input type="search" placeholder="Search for something..." />
                        <button className="search-button">
                            <i className="fa-solid fa-search"></i>
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="nav-menu">
                        <ul>

                            <li>
                                {/* Cart */}
                                <a href="/cart" title="Cart">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className="nav-text">Cart</span>
                                </a>
                            </li>

                            <li>
                                {/* Account */}
                                <a href="/user" title="Account">
                                    <i className="fa-solid fa-circle-user"></i>
                                    <span className="nav-text">Account</span>
                                </a>
                            </li>

                            <li>
                                {/* About */}
                                <a href="/about" title="About">
                                    <i className="fa-solid fa-circle-info"></i>
                                    <span className="nav-text">About</span>
                                </a>
                            </li>

                        </ul>
                    </nav>

                    {/* Hamburger Menu for Mobile Responsiveness */}
                    <button className="hamburger-menu" aria-label="Toggle menu">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>

                </div>

            </header>

            {/* Main Content Section */}
            <main>

                {/* Categories Section */}
                <section className="categories">
                    <div className="categories-container">
                        <h3>Categories</h3>
                        <br />
                        <div className="placeholder-categories">

                            {/* Category: Our Cafeteria */}
                            <div className="category-item">
                                <a href="our_cafeteria.html">
                                    <i
                                        className="fa-solid fa-utensils"
                                        style={{ fontSize: '6.5rem' }}
                                    ></i>
                                    <p>Our Cafeteria</p>
                                </a>
                            </div>

                            {/* Category: Local Restaurants */}
                            <div className="category-item">
                                <a href="local_restaurants.html">
                                    <i
                                        className="fa-solid fa-people-group"
                                        style={{ fontSize: '6.5rem' }}
                                    ></i>
                                    <p>Local Restaurants</p>
                                </a>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Featured Restaurants Section */}
                <section className="products">
                    <div className="products-container">
                        <h3>Featured Restaurants</h3>
                        <div className="placeholder-products">
                            {/* Placeholder for Featured Restaurants */}
                            <div className="placeholder-product"></div>
                            <div className="placeholder-product"></div>
                            <div className="placeholder-product"></div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer Section */}
            <footer></footer>
        </>
    );
    // html end
};

export default cafe; // Export the cafe component for use in other parts of the application
