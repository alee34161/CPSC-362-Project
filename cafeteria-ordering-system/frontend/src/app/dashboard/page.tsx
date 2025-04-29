'use client';
import React, { useState, useEffect } from 'react';
import './styles/styles.css';
import axios from 'axios';

const Cafe: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
            'Accept': 'application/json'
          }, withCredentials: true
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

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

          {/* Order History Button */}
          <nav className="nav-menu">
            <ul>
            <li>
              <a href="/customer-orders" title="History">
              <img src={"/history.svg"} className="icon" alt="History" />
              <span className="nav-text">History</span>
              </a>
            </li>
            <li>
            	<a href='/loyalty' title='Loyalty Points'>
            	<img src={'/loyalty.svg'} className='icon' alt='Loyalty Points' />
            	<span className="nav-text">Loyalty Points</span>
            	</a>
            </li>
            </ul>
          </nav>

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
                  <img src={"/cart.svg"} className="icon" alt="Cart" />
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
                      <a href="/cafeteriamenu">
                        <img
                          src="/menu_1.svg"
                          className="categories-icon"
                          alt="Our Cafeteria"
                        />
                        <p>Our Cafeteria</p>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="category-item">
                      <a href="/restaurantmenu">
                        <img
                          src="/menu_2.svg"
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
    <div className="placeholder-product">
    <a href="/cafeteriamenu">
    <img src="/bbqchicken.jpg" alt="BBQ Chicken" className="product-image"/>
    </a>
    </div>
    <div className="placeholder-product">
	<a href="/cafeteriamenu">
    <img src="/lamb.jpg" alt="Lamb" className="product-image"/>
    </a>
    </div>
    <div className="placeholder-product">
    <a href="/cafeteriamenu">
    <img src="/mochi.jpg" alt="Mochi" className="product-image"/>
    </a>
    </div>
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
