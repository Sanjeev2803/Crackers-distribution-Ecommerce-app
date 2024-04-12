import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Settings() {
    const currentUser = useSelector((state) => state.login.currentUser)
const [isedit,setisedit]=useState(false)
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="profile">
                        <div className="content mb-3 mt-3 ">
                            <div className='d-flex justify-content-center'>
                            <h1 className=''>Edit Profile</h1>
                            </div>
                            <form action="">
                                {/* Photo */}
                                {!isedit&&<div className="form-group row  mb-3 d-flex justify-content-center">
                                  
                                    <div className="col-md-8">
                                        <span className="photo" title="Upload your Avatar!"></span>
                                        <div className='d-flex justify-content-center'>
                                        <img src={currentUser.profileImageUrl} alt="" className='image-fluid' style={{borderRadius:'40%',maxHeight:'100px'}}/>
                                        </div>
                                    </div>
                                </div>}
                                
                               {isedit&& <div className="form-group row  mb-3">
                                    <label htmlFor="avatar" className="col-md-4 col-form-label">Your Photo</label>
                                    <div className="col-md-8">
                                        <span className="photo" title="Upload your Avatar!"></span>
                                        <input type="file" className="btn" />
                                    </div>
                                </div>}
                                {/* First Name */}
                                <div className="form-group row  mb-3">
                                    <label htmlFor="fname" className="col-md-4 col-form-label">First Name</label>
                                    <div className="col-md-8">
                                        <input type="text" id="fname" className="form-control" tabIndex="1" defaultValue={currentUser.FirstName}/>
                                    </div>
                                </div>
                                {/* Last Name */}
                                <div className="form-group row  mb-3">
                                    <label htmlFor="lname" className="col-md-4 col-form-label">Last Name</label>
                                    <div className="col-md-8">
                                        <input type="text" id="lname" className="form-control" tabIndex="2" defaultValue={currentUser.LastName}/>
                                    </div>
                                </div>
                                {/* Description about User */}
                                <div className="form-group row  mb-3">
                                    <label htmlFor="description" className="col-md-4 col-form-label">About you</label>
                                    <div className="col-md-8">
                                        <textarea name="" id="" cols="30" rows="auto" className="form-control" tabIndex="3"></textarea>
                                    </div>
                                </div>
                                {/* Location */}
                                <div className="form-group row  mb-3">
                                    <label htmlFor="location" className="col-md-4 col-form-label">Location</label>
                                    <div className="col-md-8">
                                        <input type="text" id="location" className="form-control" tabIndex="4" defaultValue={currentUser.Locality} />
                                    </div>
                                </div>
                                {/* Country */}
                                <div className="form-group row  mb-3">
                                    <label htmlFor="country" className="col-md-4 col-form-label">Country</label>
                                    <div className="col-md-8">
                                        <input type="text" id="country" className="form-control" tabIndex="5"  defaultValue={currentUser.Country} />
                                    </div>
                                </div>
                                {/* Email */}
                                <div className="form-group row  mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label">Email Address</label>
                                    <div className="col-md-8">
                                        <input type="email" id="email" className="form-control" tabIndex="6" defaultValue={currentUser.email} />
                                    </div>
                                </div>
                                <div className="form-group row  mb-3">
                                    <label htmlFor="mobile" className="col-md-4 col-form-label">Mobile</label>
                                    <div className="col-md-8">
                                        <input type="number" id="mobile" className="form-control" tabIndex="6" defaultValue={currentUser.Mobile} />
                                    </div>
                                </div>
                                {/* Looking for Work */}
                               
                                {/* Highest Qualification */}
                                
                                {/* School */}
                               
                                {/* Company Name */}
                               
                                {/* Job Position */}
                               
                                {/* Linkedin URL */}
                            
                                {/* Github URL */}
                                
                              
                                <div className="form-group row  mb-3">
                                    <div className="col-md-8 col-md-offset-4">
                                        <input type="button" className="Btn cancel" value="Cancel" />
                                        <input type="submit" className="Btn" value="Save Changes" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
