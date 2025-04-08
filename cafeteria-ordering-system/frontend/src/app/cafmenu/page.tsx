'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../dashboard/styles/styles.css';

const CafeteriaMenu: React.FC = () => {
	const [menuItems, setMenuItems] = useState<any[]>([]);

	useEffect(() => {
		const fetchMenuData = async () => {
			try {
				const response = await fetch('http://localhost:8080/cafmenuread');
				const data = await response.json();
				setMenuItems(data);
			} catch (error) {
				console.error('Error fetching menu data:', error);
			}
		};
		fetchMenuData();
	}, []);

	const handleAddToCart = async (item: any) => {
		console.log("Item to be added:", item);
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
		      }
		    });
		  } catch (error) {
		    console.error("Error adding to cart.", error);
		  }
	};

	const handleRemoveFromCart = async (item: any) => {
		try {
			const response = await axios.post('http://localhost:8080/cartdelete', {
				id: item.id,
				source: item.source
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
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
                            {menuItems.map((item: any) => (
                                <div className="placeholder-product" key={item.id}>
                                    <div className="product-buttons">
                                    	<h4>{item.name}</h4>
                                    	<p>${item.price}</p>
                                        <button className="add-to-bag"
                                        onClick={() => handleAddToCart(item)}
                                        >Add</button>
                                        <button className="remove-from-bag"
                                        onClick={() => handleRemoveFromCart(item)}
                                        >Remove</button>
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
