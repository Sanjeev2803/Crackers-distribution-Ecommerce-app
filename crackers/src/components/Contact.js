import React, { useState } from 'react';
import './Contact.css';
import {toast,Toaster} from 'sonner'
function Contact() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwW4rg9qxb66CzhmLcKDMGSPZXlRqnoobX4k2wmLhS92far2jTM5aK7Cl-lIidFEBmDiw/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
          mode: 'no-cors',
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Form submitted successfully");
      setTimeout(() => {
        toast.success('we will get back to you shortly!')
      }, 3000);
      
      // Clear form fields
      setFormData({
        Name: '',
        Email: '',
        Message: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  
  

  return (
    <div>
      <div className="contact-form-wrapper d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="contact-form">
          <h5 className="title">Contact us</h5>
          <p className="description">Feel free to contact us if you need any assistance, any help or another question.
          </p>
          <div>
            <input
              type="text"
              className="form-control rounded border-white mb-3 form-input"
              id="name"
              name="Name"
              placeholder="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              className="form-control rounded border-white mb-3 form-input"
              id="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <textarea
              id="message"
              className="form-control rounded border-white mb-3 form-text-area"
              rows="5"
              cols="30"
              name="Message"
              placeholder="Message"
              value={formData.Message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="submit-button-wrapper">
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
      <Toaster richColors />
    </div>
  );
}

export default Contact;
