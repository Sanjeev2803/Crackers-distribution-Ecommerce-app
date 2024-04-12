import React from 'react'
const bodyStyle = {
    fontFamily: 'Nunito, sans-serif',
    width: '100wh',
    padding:'10px',
    color: '#fff',
    background: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
    backgroundSize: '400% 400%',
    WebkitAnimation: 'Gradient 15s ease infinite',
    MozAnimation: 'Gradient 15s ease infinite',
    animation: 'Gradient 15s ease infinite'
  };
  
  const productStyle = {
    backgroundColor: 'rgba(0,0,0,0.1)',
    border: '1px solid rgba(0,0,0,0.1)',
    padding: '20px'
  };
  
  const imageStyle = {
    width: '100%',
    transition: 'all .2s ease',
    clipPath: 'polygon(0 100%, 0 0, 100% 0, 100% 70%)'
  };
  
  const priceStyle = {
    textAlign: 'center',
    fontSize: '20px',
    marginTop: '25px',
    color: 'darkblue',
    background: 'lightblue',
    border: '1px solid blue',
    borderRadius: '10px',
    padding: '10px'
  };
function Wishlist() {
  return (
    <div style={bodyStyle} className="container-fluid">
    <div className="row">
      <div className="col-md-4 col-sm-6">
        <div className="product" style={productStyle}>
          <img src="https://i.imgur.com/WwkgPd5.jpg" alt="Metin2 Refine Window" style={imageStyle} />
          <h1 style={{ lineHeight: '20px', fontSize: '20px', marginTop: '15px' }}>Metin2 Refine Window</h1>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
          <div className="price" style={priceStyle}>
            PRICE: $199
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-6">
        <div className="product" style={productStyle}>
          <img src="https://i.imgur.com/WwkgPd5.jpg" alt="Metin2 Refine Window" style={imageStyle} />
          <h1 style={{ lineHeight: '20px', fontSize: '20px', marginTop: '15px' }}>Metin2 Refine Window</h1>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
          <div className="price" style={priceStyle}>
            PRICE: $199
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-6">
        <div className="product" style={productStyle}>
          <img src="https://i.imgur.com/WwkgPd5.jpg" alt="Metin2 Refine Window" style={imageStyle} />
          <h1 style={{ lineHeight: '20px', fontSize: '20px', marginTop: '15px' }}>Metin2 Refine Window</h1>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
          <div className="price" style={priceStyle}>
            PRICE: $199
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Wishlist