'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../dashboard/styles/styles.css';

const CafeteriaMenu: React.FC = () => {
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Handle search input changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Fetch search results based on the query
    const fetchSearchResults = async (query: string) => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8080/allmenusearch',
                { name: query },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true,
                }
            );
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Map categories to their corresponding SVG files
    const categoryIcons: { [key: string]: string } = {
        breakfast: '/breakfast.svg',
        lunch: '/lunch.svg',
        dinner: '/dinner.svg',
        drink: '/drinks.svg',
        dessert: '/dessert.svg',
    };

    // Fetch cafeteria menu data
    const fetchMenuData = async () => {
        console.log('Fetching menu data...');
        try {
            const response = await fetch('http://localhost:8080/cafmenuread', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            console.log('Fetched menu items:', data);
            setMenuItems(data);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };

    // Filter items by category
    const getItemsByCategory = (category: string) => {
        const filteredItems = menuItems.filter((item) => item.category === category);
        console.log(`Items for category ${category}:`, filteredItems);
        return filteredItems;
    };

    // Fetch menu data on component mount
    useEffect(() => {
        fetchMenuData();
    }, []);

    // Fetch search results with a debounce effect
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchSearchResults(searchTerm);
        }, 500);
        return () => clearTimeout(delay);
    }, [searchTerm]);

    const handleAddToCart = async (item: any) => {
            try {
              const response = await axios.post('http://localhost:8080/cartadd', {
                id: item.id,
                source: item.source,
                name: item.name,
                price: item.price,
                quantity: 1
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }, withCredentials: true
              });
            } catch (error) {
              console.error("Error adding to cart.", error);
            }
            alert("Added one " + item.name + " to cart.");
        };
        
        const handleRemoveFromCart = async (item: any) => {
          try {
            const response = await axios.post('http://localhost:8080/cartdelete', {
              id: item.id,
              source: item.source
            }, {
              headers: {
                'Content-Type': 'application/json'
              }, withCredentials: true
            });
          } catch (error) {
            console.error("Error removing from cart.", error);
          }
          alert("All " + item.name + " items removed from cart.");
        };

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
                        <input
                            type="search"
                            placeholder="Search for something..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="search-button">
                            <img src="/search.svg" className="icon" alt="Search" />
                        </button>

                        {searchTerm && (
                            <ul className="search-results">
                                {isLoading ? (
                                    <li className="search-item">Loading...</li>
                                ) : results.length > 0 ? (
                                    results.map((result, index) => (
                                        <li className="search-item" key={index}>
                                            <a href={`/${result.source}menu`} className="full-link">
                                                {result.name}
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li className="search-item">No results found</li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="nav-menu">
                        <ul>
                            <li>
                                <a href="/cart" title="Cart">
                                    <img src="/cart.svg" className="icon" alt="Cart" />
                                    <span className="nav-text">Cart</span>
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
                    <h3>Cafeteria Menu</h3>
                    {['breakfast', 'lunch', 'dinner', 'dessert', 'drink'].map((category) => (
                        <div className="products-container" key={category}>
                            {/* Display the SVG icon for the category */}
                            <img
                                src={categoryIcons[category]}
                                alt={`${category} icon`}
                                className="category-icon"
                            />
                            <div className="placeholder-products">
                                {getItemsByCategory(category).map((item: any) => {
                                    console.log('Rendering item:', item);
                                    return (
                                        <div className="product" key={item.id}>
                                            <div className="product-info">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="product-image"
                                                />
                                                <h4>{item.name}</h4>
                                                <p>${item.price}</p>
                                                <p>{item.restaurant}</p>
                                            </div>
                                            <div className="product-buttons">
                                                <button
                                                    className="add-to-bag"
                                                    onClick={() => handleAddToCart(item)}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    className="remove-from-bag"
                                                    onClick={() => handleRemoveFromCart(item)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            {/* Footer */}
            <footer></footer>
        </>
    );
};

export default CafeteriaMenu;