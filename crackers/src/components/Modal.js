import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'; // Import modal component from React Bootstrap
import Banner from '../Images/BannerAd.png';
import { IoMdCloseCircle } from "react-icons/io";
function BannerModal() {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Function to handle closing modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setShowModal(true); // Show modal by default when component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
   <div></div>
  );
}

export default BannerModal;
