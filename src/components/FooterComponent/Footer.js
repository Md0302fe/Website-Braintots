import React from 'react';

const Footer = () => {
  return (
    <div className='w-full flex justify-center items-center bg-gradient-to-b from-[#fff7ee] to-[#e2d1c3] text-[#3E3E3E mt-[100px]'>
<footer className="Width pt-10 pb-5 ">
      <div className=" container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Cột Thông Tin */}
        <div>
          <h3 className="font-semibold text-lg mb-4">THÔNG TIN</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Giới thiệu</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Tuyển dụng</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Khuyến mãi</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Kids blog</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Liên hệ</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Chính sách</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Đồ chơi trẻ em</a></li>
          </ul>
        </div>
        {/* Cột Đồ Chơi Giáo Dục */}
        <div>
          <h3 className="font-semibold text-lg mb-4">ĐỒ CHƠI GIÁO DỤC</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Đồ chơi giáo dục cho trẻ 1 tuổi</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Đồ chơi giáo dục cho trẻ 1-3 tuổi</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Đồ chơi giáo dục cho trẻ trên 3 tuổi</a></li>
          </ul>
        </div>

        {/* Cột Đồ Chơi Sáng Tạo */}
        <div>
          <h3 className="font-semibold text-lg mb-4">ĐỒ CHƠI SÁNG TẠO</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Đồ chơi sáng tạo cho trẻ 1 tuổi</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Đồ chơi sáng tạo cho trẻ 1-3 tuổi</a></li>
            <li><a href="/" className="hover:underline text-sm max-w-[200px]">Đồ chơi sáng tạo cho trẻ trên 3 tuổi</a></li>
          </ul>
        </div>

        {/* Cột Về WOODO */}
        <div>
          <h3 className="font-semibold text-lg mb-4">VỀ WOODO</h3>
          <p className="mb-4">
            WOODO Đồ chơi giáo trí: Giáo dục – Giải trí – Trí tuệ. Giúp trẻ em Việt Nam phát triển một
            cách toàn diện thông qua những sản phẩm mang tính chất giáo trí, an toàn, chất lượng.
          </p>
          <p>HCM: 958/14 Âu Cơ, P.14, Tân Bình</p>
          <p>Đồng Nai: 86B Đường 2/9, TT Trảng Bom</p>
          <p>Phone: 0933 365 989</p>
        </div>
      </div>
      {/* Phần Tư Vấn và Copyright */}
      <div className="mt-10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center mb-4 md:mb-0">
            <h4 className="font-bold text-xl">TƯ VẤN MUA HÀNG</h4>
            <p className="text-2xl font-semibold text-[#F16E00]">0933 365 989</p>
          </div>
          <div className="text-center">
            <p className="text-sm">© 2020 WOODO. All rights reserved</p>
            <div className="flex justify-center space-x-2 mt-2">
              <img src="visa.png" alt="Visa" className="w-12" />
              <img src="mastercard.png" alt="Mastercard" className="w-12" />
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
