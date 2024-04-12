import React from 'react';
import { Link } from 'react-router-dom';
// import './About.css'; // Create this CSS file for custom styling
import loginBg from '../Images/loginbg.jpg'
function About() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={loginBg}
            className="img-fluid"
            alt="CrackleShop Logo" 
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">About CrackleShop</h2>
          <p>
            Welcome to CrackleShop, your one-stop destination for all your
            fireworks needs. At CrackleShop, we believe in delivering the
            highest quality fireworks to make your celebrations truly
            spectacular.
          </p>
          <p>
            Our collection features a wide range of fireworks, from vibrant
            sparklers to powerful aerial displays. Whether you're celebrating
            Diwali, New Year, or any special occasion, CrackleShop has the
            perfect fireworks to light up your moments.
          </p>
          <p>
            We source our fireworks from trusted suppliers, ensuring safety
            and quality. Our user-friendly website makes it easy for you to
            explore and order your favorite fireworks from the comfort of your
            home.
          </p>
          <p>
            Join us in spreading joy and excitement through the enchanting
            colors and sounds of celebration. Experience the magic of
            CrackleShop – where every celebration is a masterpiece!
          </p>
        </div>
      </div>
      <Link to="/shop" className="btn btn-primary">
            Explore Our Shop
          </Link>
    </div>
  );
};

export default About;
