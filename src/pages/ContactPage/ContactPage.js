// src/pages/ContactPage/ContactPage.js
import React from "react";
import ContactComponent from "../../components/ContactComponent/ContactComponent";
import "./Contact.scss";

const ContactPage = () => {
  return (
    <div className="ContactPage Container flex-center-center">
      <div className="Wrapper Width">
        <ContactComponent />
      </div>
    </div>
  );
};

export default ContactPage;
