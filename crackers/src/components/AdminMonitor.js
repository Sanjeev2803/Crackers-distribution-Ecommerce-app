// import React, { useEffect, useState } from 'react';
// import './AdminMonitor.css';
// import axios from 'axios'

// function AdminMontor() {
//     const [usersData, setUsersData] = useState([]);
//     const [sellersData, setSellersData] = useState([]);
//     const [totalproducts,settotalproducts]=useState(0)
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const userDataResponse = await axios.get('http://localhost:4000/user-api/users');
//                 setUsersData(userDataResponse.data.payload);
//                console.log(usersData.length)
//                 const sellerDataResponse = await axios.get('http://localhost:4000/user-api/sellers');
//                 setSellersData(sellerDataResponse.data.payload);
//                 console.log(sellerDataResponse)
//                 let count=0;
//                 sellersData.map((seller)=>{
                  
//                   count+=seller.Products.length
               
//                 })
//                 settotalproducts(count)
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();

//         // Cleanup function can be added here if needed
//     }, []);
  
//   return (
//     <div className="container-fluid">
//       <div className="row">
        
//         <nav className="col-md-2">
//           <div className="sidebar">
//             <ul className="nav flex-column">
//               <li className="nav-item">
//                 <a className="nav-link active" href="#">
//                   <i className="zmdi zmdi-widgets"></i>
//                   Dashboard <span className="sr-only">(current)</span>
//                 </a>
//               </li>
              
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   <i className="zmdi zmdi-shopping-cart"></i>
//                   Products
//                 </a>
//               </li>
             
             
             
//             </ul>

//             <h6 className="sidebar-heading d-flex justify-content-between align-items-center pl-3 mt-4 mb-1 text-muted">
//               <span>Saved reports</span>
//               <a className="d-flex align-items-center text-muted" href="#">
//                 <i className="zmdi zmdi-plus-circle-o"></i>
//               </a>
//             </h6>
//             <ul className="nav flex-column mb-2">
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   <i className="zmdi zmdi-file-text"></i>
//                   Current month
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   <i className="zmdi zmdi-file-text"></i>
//                   Last quarter
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   <i className="zmdi zmdi-file-text"></i>
//                   Social engagement
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   <i className="zmdi zmdi-file-text"></i>
//                   Year-end sale
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </nav>
//         <main role="main" className="col-md-10 ml-auto my-3">
//           <div className="card-list">
//             <div className="row">
//               <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
//                 <div className="card blue">
//                   <div className="title">all products</div>
//                   <i className="zmdi zmdi-upload"></i>
//                   <div className="value">{totalproducts}</div>
                  
//                 </div>
//               </div>
//               <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
//                 <div className="card green">
//                   <div className="title">Registered Members</div>
//                   <i className="zmdi zmdi-upload"></i>
//                   <div className="value">{usersData.length+sellersData.length}</div>

//                 </div>
//               </div>
//               <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
//                 <div className="card orange">
//                   <div className="title">Registered Sellers</div>
//                   <i className="zmdi zmdi-download"></i>
//                 <div className="value">{sellersData.length}</div>
                 
//                 </div>
//               </div>
//               <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
//                 <div className="card red">
//                   <div className="title">Registered Users</div>
//                   <i className="zmdi zmdi-download"></i>
//                   <div className="value">{usersData.length}</div>
                 
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="projects mb-4">
//             <div className="projects-inner">
//               <header className="projects-header">
//                 <div className="title">Active Sellers</div>
//                 <div className="count">({sellersData.length})</div>
//                 <i className="zmdi zmdi-download"></i>
//               </header>
//               <table className="projects-table table-responsive">
//                 <thead>
//                   <tr>
//                     <th>SellerName</th>
//                     <th>Company</th>
//                     <th>Seller Pic</th>
//                     <th>Products Owned</th>
//                     <th>Status</th>
//                     <th className="text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
                
//                   {/* Additional project rows */}
//                   {
//                     sellersData.map((seller)=>(
// <tr>
//                     <td>
//                       <p>{seller.FirstName}</p>
                    
//                     </td>
//                     <td>
//                       <p>{seller.Company}</p>
                      
//                     </td>
//                     <td className="member">
//                       <figure><img src={seller.profileImageUrl} alt="user" /></figure>
//                       <div className="member-info">
                        
//                       </div>
//                     </td>
//                     <td>
//                       <p>{seller.Products.length}</p>
                   
//                     </td>
//                     <td className="status">
//                       <span className="status-text status-green">active</span>
//                     </td>
//                     <td>
//                      <p>View</p>
//                     </td>
//                   </tr>
//                     )
//                     )
//                   }
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminMontor;
