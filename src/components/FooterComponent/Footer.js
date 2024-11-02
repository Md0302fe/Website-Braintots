import React from "react";
import paymentsImg from "../../assets/payments.png";
import logoImg from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-b from-[#fff7ee] to-[#e2d1c3] text-[#3E3E3E mt-[100px]">
      <footer className="Width flex items-center flex-col">
        <div className="LOGO IMAGE FOOTER w-[400px] h-[200px]" style={{
          backgroundImage: `url(${logoImg})`,
          backgroundSize : "cover"
        }
        }></div>
        <div className="container mx-auto px-4 flex justify-between gap-10">
          {/* Cột Thông Tin */}
          <div>
            <h3 className="font-semibold text-lg mb-4 ">THÔNG TIN</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Khuyến mãi
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Kids blog
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Chính sách
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Đồ chơi trẻ em
                </a>
              </li>
            </ul>
          </div>
          {/* Cột Đồ Chơi Giáo Dục */}
          <div>
            <h3 className="font-semibold text-lg mb-4">ĐỒ CHƠI GIÁO DỤC</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Đồ chơi giáo dục cho trẻ 1 tuổi
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Đồ chơi giáo dục cho trẻ 1-3 tuổi
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Đồ chơi giáo dục cho trẻ trên 3 tuổi
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Đồ Chơi Sáng Tạo */}
          <div>
            <h3 className="font-semibold text-lg mb-4">ĐỒ CHƠI SÁNG TẠO</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Đồ chơi sáng tạo cho trẻ 1 tuổi
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Đồ chơi sáng tạo cho trẻ 1-3 tuổi
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline text-sm max-w-[200px]">
                  Đồ chơi sáng tạo cho trẻ trên 3 tuổi
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Về WOODO */}
          <div className="max-w-[40%]">
            <h3 className="font-semibold text-lg mb-4">VỀ BRAINTOTS</h3>
            <p className="mb-4">
              BRAINTOTS Đồ chơi giáo trí: Giáo dục – Giải trí – Trí tuệ. Giúp trẻ em
              Việt Nam phát triển một cách toàn diện thông qua những sản phẩm
              mang tính chất giáo trí, an toàn, chất lượng.
            </p>
            <p>Cần Thơ: Trường đại học FPT , ninh kiều , cần thơ</p>
            <p>Phone: 0333 090 091</p>
          </div>
        </div>
        {/* Phần Tư Vấn và Copyright */}
        <div className="mt-5 py-2">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="uppercase text-black text-2xl mb-4">
                đồ chơi gỗ giáo dục thông minh braintots
              </h1>
              <p className="text-sm">
                braintots.com là website bán lẻ các sản phẩm đồ chơi trẻ em
                theo tiêu chí: Giáo dục, trí tuệ, an toàn, giải trí. Các sản
                phẩm braintots.com cung cấp bao gồm: Đồ chơi gỗ, đồ chơi
                giáo dục, đồ chơi sáng tạo, đồ chơi lắp ráp.. với hơn 300 sản
                phẩm chất lượng, an toàn được làm từ chất liệu gỗ tự nhiên....
                Dochoigiaotri.com áp dụng chế độ bảo hành 3 tháng cho sản phẩm,
                dịch vụ giao hàng COD miễn phí toàn quốc cùng nhiều chương trình
                ưu đãi hấp dẫn được
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center space-x-2 mt-2">
                <img src={paymentsImg} alt="Visa" className="w-48 my-4" />
              </div>
              <p className="text-sm">© 2020 Braintots. All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
