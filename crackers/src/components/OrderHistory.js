import React, { useState } from 'react'
import './OrderHistory.css'
import { useSelector } from 'react-redux'
import { Accordion } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { clearState } from './Redux/Slices/loginSlice';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
function OrderHistory() {
    const dispatch=useDispatch()
    const Navigate=useNavigate()
    const logout=()=>{
dispatch(clearState())
Navigate('/login')
    }
    const currentUser=useSelector((state)=>state.login.currentUser)
    const OrderDetails=useSelector((state)=>state.login.Orders)
    const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div><section className="my-5">
    <div className="container">
        <div className="main-body">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src={currentUser.profileImageUrl} alt="Admin"
                                    className="rounded-circle p-1 bg-warning" width="110" />
                                <div className="mt-3">
                                    <h4>{currentUser.FirstName}</h4>
                                    <p className="text-secondary mb-1">{currentUser.email}</p>
                                    <p className="text-muted font-size-sm">{currentUser.Locality}</p>
                                </div>
                            </div>
                            <div className="list-group list-group-flush text-center mt-4">
                                <a href="#" className="list-group-item list-group-item-action border-0 active">
                                    Profile Information
                                </a>
                                <Link to='/orderHistory' className="list-group-item list-group-item-action border-0">Orders</Link>
                               
                                <Link to='/settings' className="list-group-item list-group-item-action border-0">Settings</Link>
                                <Link  className="list-group-item list-group-item-action border-0" onClick={logout}>Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {currentUser.Orders?.length<=0&&<div><p className='d-flex justify-content-center fs-lead-7'>No Orders Placed!!</p></div>}

                {currentUser.Orders?.length>0&&<div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="top-status">
                                <h5>{currentUser.Orders[currentUser?.Orders?.length-1].orderId}</h5>
                                <ul>
                                    <li className="active">
                                        <svg xmlns="http://w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                                            viewBox="0 0 512 512" width="50" height="50">
                                            <title> Clock Delivery package </title>
                                            <path
                                                d="M316.96,424.4A96,96,0,1,1,400,472.22,95.391,95.391,0,0,1,316.96,424.4Z"
                                                style={{ fill: "#6fe3ff" }} />
                                            <path
                                                d="M400,135.55V280.22A96.008,96.008,0,0,0,316.96,424.4L208,487.3V246.38L399.98,135.54Z"
                                                style={{ fill: "#c16752" }} />
                                            <polygon
                                                points="208 246.38 141.14 207.78 333.13 96.94 399.98 135.54 208 246.38"
                                                style={{ fill: "#e48e66" }} />
                                            <polygon
                                                points="333.13 96.94 141.14 207.78 92.21 179.53 284.19 68.69 333.13 96.94"
                                                style={{ fill: "#e5d45a" }} />
                                            <polygon
                                                points="208 24.7 284.19 68.69 92.21 179.53 92.2 179.53 16.02 135.54 208 24.7"
                                                style={{ fill: "#af593c" }} />
                                            <polygon
                                                points="208 246.38 208 487.3 16 376.45 16 135.55 16.02 135.54 92.2 179.53 92.2 339.28 115.45 329.68 140.8 358.48 140.8 207.98 141.14 207.78 208 246.38"
                                                style={{ fill: "#e48e66" }} />
                                            <polygon
                                                points="141.14 207.78 140.8 207.98 140.8 358.48 115.45 329.68 92.2 339.28 92.2 179.53 92.21 179.53 141.14 207.78"
                                                style={{ fill: "#f8ec7d" }} />
                                            <path
                                                d="M284.75,269.594l-17.9-18.959a7,7,0,0,0-11.256,1.49l-16.9,31.44a7,7,0,0,0,6.263,9.86h39.73a7,7,0,0,0,6.263-9.86l-16.9-31.44A7,7,0,0,0,284.75,269.594Z"
                                                style={{ fill: "#b3b3b3" }} />
                                            <circle cx="192" cy="64" r="16" style={{ fill: "#b3b3b3" }} />
                                            <path
                                                d="M425,48H87a7,7,0,0,0,0,14H425a7,7,0,0,0,0-14Z"
                                                style={{ fill: "#b3b3b3" }} />
                                            <circle cx="425" cy="64" r="16" style={{ fill: "#b3b3b3" }} />
                                        </svg>
                                        <p>Pending</p>
                                    </li>
                                    <li>
                                        <svg xmlns="http://w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                                            viewBox="0 0 512 512" width="50" height="50">
                                            <title> Clock Delivery package </title>
                                            <path
                                                d="M316.96,424.4A96,96,0,1,1,400,472.22,95.391,95.391,0,0,1,316.96,424.4Z"
                                                style={{ fill: "#6fe3ff" }} />
                                            <path
                                                d="M400,135.55V280.22A96.008,96.008,0,0,0,316.96,424.4L208,487.3V246.38L399.98,135.54Z"
                                                style={{ fill: "#c16752" }} />
                                            <polygon
                                                points="208 246.38 141.14 207.78 333.13 96.94 399.98 135.54 208 246.38"
                                                style={{ fill: "#e48e66" }} />
                                            <polygon
                                                points="333.13 96.94 141.14 207.78 92.21 179.53 284.19 68.69 333.13 96.94"
                                                style={{ fill: "#e5d45a" }} />
                                            <polygon
                                                points="208 24.7 284.19 68.69 92.21 179.53 92.2 179.53 16.02 135.54 208 24.7"
                                                style={{ fill: "#af593c" }} />
                                            <polygon
                                                points="208 246.38 208 487.3 16 376.45 16 135.55 16.02 135.54 92.2 179.53 92.2 339.28 115.45 329.68 140.8 358.48 140.8 207.98 141.14 207.78 208 246.38"
                                                style={{ fill: "#e48e66" }} />
                                            <polygon
                                                points="141.14 207.78 140.8 207.98 140.8 358.48 115.45 329.68 92.2 339.28 92.2 179.53 92.21 179.53 141.14 207.78"
                                                style={{ fill: "#f8ec7d" }} />
                                            <path
                                                d="M284.75,269.594l-17.9-18.959a7,7,0,0,0-11.256,1.49l-16.9,31.44a7,7,0,0,0,6.263,9.86h39.73a7,7,0,0,0,6.263-9.86l-16.9-31.44A7,7,0,0,0,284.75,269.594Z"
                                                style={{ fill: "#b3b3b3" }} />
                                            <circle cx="192" cy="64" r="16" style={{ fill: "#b3b3b3" }} />
                                            <path
                                                d="M425,48H87a7,7,0,0,0,0,14H425a7,7,0,0,0,0-14Z"
                                                    style={{ fill: "#b3b3b3" }} />
                                            <circle cx="425" cy="64" r="16" style={{ fill: "#b3b3b3" }} />
                                        </svg>
                                        <p>Pending</p>
                                    </li>

                                    <li>
                                        <svg xmlns="http://w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                                            viewBox="0 0 512 512" width="50" height="50">
                                            <title> Clock Delivery package </title>
                                            <path
                                                d="M316.96,424.4A96,96,0,1,1,400,472.22,95.391,95.391,0,0,1,316.96,424.4Z"
                                                style={{ fill: "#6fe3ff" }} />
                                            <path
                                                d="M400,135.55V280.22A96.008,96.008,0,0,0,316.96,424.4L208,487.3V246.38L399.98,135.54Z"
                                                style={{ fill: "#c16752" }} />
                                            <polygon
                                                points="208 246.38 141.14 207.78 333.13 96.94 399.98 135.54 208 246.38"
                                                style={{ fill: "#e48e66" }} />
                                            <polygon
                                                points="333.13 96.94 141.14 207.78 92.21 179.53 284.19 68.69 333.13 96.94"
                                                style={{ fill: "#e5d45a" }} />
                                            <polygon
                                                points="208 24.7 284.19 68.69 92.21 179.53 92.2 179.53 16.02 135.54 208 24.7"
                                                style={{ fill: "#af593c" }} />
                                            <polygon
                                                points="208 246.38 208 487.3 16 376.45 16 135.55 16.02 135.54 92.2 179.53 92.2 339.28 115.45 329.68 140.8 358.48 140.8 207.98 141.14 207.78 208 246.38"
                                                style={{ fill: "#e48e66" }} />
                                            <polygon
                                                points="141.14 207.78 140.8 207.98 140.8 358.48 115.45 329.68 92.2 339.28 92.2 179.53 92.21 179.53 141.14 207.78"
                                                style={{ fill: "#f8ec7d" }} />
                                            <path
                                                d="M284.75,269.594l-17.9-18.959a7,7,0,0,0-11.256,1.49l-16.9,31.44a7,7,0,0,0,6.263,9.86h39.73a7,7,0,0,0,6.263-9.86l-16.9-31.44A7,7,0,0,0,284.75,269.594Z"
                                                style={{ fill: "#b3b3b3" }} />
                                            <circle cx="192" cy="64" r="16" style={{ fill: "#b3b3b3" }} />
                                            <path
                                                d="M425,48H87a7,7,0,0,0,0,14H425a7,7,0,0,0,0-14Z"
                                                    style={{ fill: "#b3b3b3" }} />
                                            <circle cx="425" cy="64" r="16" style={{ fill: "#b3b3b3" }} />
                                        </svg>
                                        <p>Pending</p>
                                    </li>                                </ul>
                            </div>
                            <div>
<Accordion defaultActiveKey="0">
      {currentUser.Orders.map((order, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>{`Order #${order.orderId}`}</Accordion.Header>
          <Accordion.Body>
            <div className="card-body p-0 table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Product Image</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderedItems.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.ProductName}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td><img src={item.productImgUrl} alt="product" width="80" className='image-fluid' style={{maxHeight:'100px'}}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  
            <div className="card mt-4">
                <div className="card-body">
                    <h4>Timeline</h4>
                    <ul className="timeline">
                        <li className="active">
                            <h6>PICKED</h6>
                            <p className="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque Lorem ipsum dolor</p>
                            <p className="text-muted">21 March, 2014</p>
                        </li>
                        <li>
                            <h6>PICKED</h6>
                            <p className="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque</p>
                            <p className="text-muted">21 March, 2014</p>
                        </li>
                        <li>
                            <h6>PICKED</h6>
                            <p className="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque</p>
                            <p className="text-muted">21 March, 2014</p>
                        </li>
                        <li>
                            <h6>PICKED</h6>
                            <p className="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque</p>
                            <p className="text-muted">21 March, 2014</p>
                        </li>
                        <li>
                            <h6>PICKED</h6>
                            <p className="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque</p>
                            <p className="text-muted">21 March, 2014</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
                        </div>
                    </div>
                
                </div>
}
            </div>
    
        </div>
    </div>
</section>


</div>
  )
}

export default OrderHistory