import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const foodItems = [
  {
    id: 1,
    name: 'Pizza',
    price: 'Rs 100',
    image: 'https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg',
  },
  {
    id: 2,
    name: 'Burger',
    price: 'Rs 80',
    image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg',
  },
  {
    id: 3,
    name: 'Sushi',
    price: 'Rs 250',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
  },
  {
    id: 4,
    name: 'Pasta',
    price: 'Rs 200',
    image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      alert('You must login first to add items to cart!');
      navigate('/login');
    } else {
      alert(`Added ${item.name} to cart!`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    alert('Logged out!');
    navigate('/');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Food Plaza</h1>

      <div className="button-group">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Our Delicious Menu</h2>

      <div className="food-grid">
        {foodItems.map(item => (
          <div key={item.id} className="food-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;



