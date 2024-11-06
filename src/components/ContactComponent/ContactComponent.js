// src/components/ContactComponent/ContactComponent.js
import React, { useState } from "react";
import "./Contact.scss";

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu đến API của bạn
    console.log("Contact Form Data:", formData);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-wrap -mx-4">
        {/* Form Liên Hệ */}
        <div className="w-full md:w-1/2 px-4 mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Your Name (required)
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mt-1.5 md:mt-0">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Your Email (required)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-red-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline hover:bg-red-700 transition duration-300"
              >
                SEND A MESSAGE
              </button>
            </div>
          </form>
        </div>

        {/*  thông tin liên hệ */}
        <div className="w-full md:w-1/2 px-4">
          <p className="subtitle mb-4">
            Giáo dục - Trí tuệ - Giải trí - An toàn
          </p>
          <h2 className="title text-2xl font-bold mb-4">
            ĐỒ CHƠI GIÁO TRÍ BRAINTOTS
          </h2>

          <p style={{ marginBottom: "20px" }}>
            <strong>BRAINTOTS </strong>
            Đồ chơi giáo trí: Giáo dục – Giải trí – Trí tuệ. Giúp trẻ em Việt
            Nam phát triển một cách toàn diện thông qua những sản phẩm mang tính
            chất giáo trí, an toàn, chất lượng.
          </p>

          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>HCM Store:</strong> 958/14 Âu Cơ, Phường 14, Quận Tân
              Bình, HCM
            </li>
            <li>
              <strong>Cần thơ:</strong> 600 Nguyễn Văn Cừ Nối Dài, An Bình ,
              Bình Thủy, Cần thơ 900000, Việt Nam
            </li>
          </ul>
          <h2 className="text-2xl font-bold mb-4">LIÊN HỆ</h2>
          {/* <span class="right-lane"></span> */}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <i className="fas fa-paper-plane text-xl mr-2"></i>
              <p>
                Tel: <span className="text-red-600">0333 090 091</span>
              </p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-paper-plane text-xl mr-2"></i>
              <p>Braintots.co@gmail.com</p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-paper-plane text-xl mr-2"></i>
              <p>
                600 Nguyễn Văn Cừ Nối Dài, An Bình , Bình Thủy, Cần thơ , Việt
                Nam
              </p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-paper-plane text-xl mr-2"></i>
              <p>Hỗ trợ giao hàng trên Toàn Quốc</p>
            </div>
          </div>

          {/* Bản đồ */}
          <div className="mt-8 map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.053354256999!2d105.72985667489695!3d10.012451790093621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0882139720a77%3A0x3916a227d0b95a64!2sFPT%20University!5e0!3m2!1svi!2sus!4v1730545334997!5m2!1svi!2sus"
              width="600"
              height="450"
              style={{ border: "0" }} // sửa ở đây
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
