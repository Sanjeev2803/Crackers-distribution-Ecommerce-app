import React, { useState } from 'react';
import {
  FaPencilAlt,
  FaEye,
} from 'react-icons/fa';
import './AdminDashboard.css';
import { IoBagAddSharp } from 'react-icons/io5';
import addProductImg from '../Images/Addproduct.jpg';
import viewProductImg from '../Images/viewProducts.jpg';
import { Row, Col, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Addproducts from './addProducts';

const AdminDashboard = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false); // State to control modal visibility
  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };
  const handleShowAddProductModal = () => {
    setShowAddProductModal(true);
  };
  const Navigate = useNavigate();
  const sellerData = useSelector((state) => state.login.currentUser);

  return (
    <div className="grey-bg container-fluid">
      <section id="minimal-statistics mt-2">
        <p className="display-5 d-flex justify-content-center">{`welcome ${sellerData.FirstName}👋`}</p>
        <Row className="justify-content-center">
          <Col xl={3} lg={6} md={6} sm={6} xs={12} className="mb-3">
            <div className="card" onClick={handleShowAddProductModal}>
              <img className="card-img-top img-fluid" src={addProductImg} alt="Card image cap" />
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <IoBagAddSharp className="icon-pencil primary font-large-2 float-left" />
                    </div>
                    <div className="media-body text-right">
                      <span>Add Products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col xl={3} lg={6} md={6} sm={6} xs={12} className="mb-3" onClick={() => Navigate('/viewProduct')}>
            <div className="card">
              <img className="card-img-top img-fluid" src={viewProductImg} alt="Card image cap" />
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <FaEye className="icon-pencil primary font-large-2 float-left mx-1" />
                    </div>
                    <div className="media-body text-right">
                      <span>View Products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* You can add more rows and columns here for additional cards */}
      </section>

      <Modal show={showAddProductModal} onHide={handleCloseAddProductModal} centered>
        <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center' }}>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Addproducts />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
