import React, { useState } from "react";

import "../KidsBlogComponent/KidsBlog.scss";

const KidsBlogComponent = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">KIDS BLOG</h1>
            <div className="flex">
                <di className="w-1/4 pr-8">
                <h2 className="text-xl font-bold  mb-4 centered-heading">DANH MỤC SẢN PHẨM</h2>

                    <ul className="mb-8">
                        <li className="mb-2">Đồ chơi tương tác</li>
                        <li className="mb-2">Đồ chơi lắp ráp</li>
                        <li className="mb-2">Đồ chơi trí tuệ</li>
                        <li className="mb-2">Ghế chống gù</li>
                        <li className="mb-2">Đồ chơi gỗ</li>
                        <li className="mb-2">Đồ chơi giáo dục</li>
                        <li className="mb-2">Đồ chơi sáng tạo</li>
                    </ul>
                    <h2 className="text-xl font-bold  mb-4 centered-heading">SẢN PHẨM KHUYẾN MÃI</h2>
                        <div className="mb-4 flex items-center">
                            
                                <img src="https://placehold.co/100x100" alt="Đồ chơi giáo dục ghép tên động vật bằng tiếng anh D202" className="mr-4"/>
                                <div>
                                    <p>Đồ chơi giáo dục ghép tên động vật bằng tiếng anh D202</p>
                                    <p><span className="line-through">160.000 ₫</span> <span className="text-red-500">150.000 ₫</span></p>
                                </div>
                            </div>
                            <div className="flex items-center pb-4">
                                <img src="https://placehold.co/100x100" alt="Đồ chơi xếp hình thông minh cho bé" className="mr-4"/>
                                <div>
                                    <p>Đồ chơi xếp hình thông minh cho bé</p>
                                    <p><span className="line-through">200.000 ₫</span> <span className="text-red-500">180.000 ₫</span></p>
                                </div>
                            </div>
                            <div className="flex items-center " >
                                <img src="https://placehold.co/100x100" alt="Đồ chơi xếp hình thông minh cho bé" className="mr-4"/>
                                <div>
                                    <p>Đồ chơi xếp hình thông minh cho bé</p>
                                    <p><span className="line-through">200.000 ₫</span> <span className="text-red-500">180.000 ₫</span></p>
                                </div>
                            </div>
                        </di>
                <div className="w-3/4">
                    <div className="mb-8">
                        <div className="flex mb-4">
                            <div className="w-1/3 relative">
                                <img src="" alt="A child crying while holding an orange" />
                                <div className="absolute top-0 left-0 bg-white p-2 text-center">
                                    <p className="text-lg font-bold">14</p>
                                    <p>TH10</p>
                                </div>
                            </div>
                            <div className="w-2/3 pl-4">
                                <div className="bg-red-500 text-white inline-block px-2 py-1 mb-2">Góc trẻ em</div>
                                <h2 className="text-2xl font-bold mb-2">Những biểu hiện lạ ở trẻ ba mẹ cần lưu tâm</h2>
                                <p className="mb-2">Viết bởi <span className="text-red-500">Minh Duc</span> / Leave a comment</p>
                                <p className="mb-2">Bạn có bao giờ giật mình vì đột nhiên con bạn có những thay đổi hoàn toàn về mặt tâm lý? Có thể do bạn quá bận rộn với công việc mà sao nhãng...</p>
                                <a href="#" className="text-red-500">Đọc Thêm</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex mb-4">
                            <div className="w-1/3 relative">
                                <img src="https://placehold.co/300x200" alt="A teacher encouraging a child in a classroom" />
                                <div className="absolute top-0 left-0 bg-white p-2 text-center">
                                    <p className="text-lg font-bold">14</p>
                                    <p>TH10</p>
                                </div>
                            </div>
                            <div className="w-2/3 pl-4">
                                <div className="bg-red-500 text-white inline-block px-2 py-1 mb-2">Góc trẻ em</div>
                                <h2 className="text-2xl font-bold mb-2">Khuyến khích trẻ mẫu giáo sử dụng trí tưởng tượng của chúng</h2>
                                <p className="mb-2">Viết bởi <span className="text-red-500">Minh Duc</span> / Leave a comment</p>
                                <p className="mb-2">Trí tưởng tượng là một nền tảng cơ bản giúp hình thành óc sáng tạo của mỗi bé. Thúc đẩy trí tưởng tượng của chúng và khơi dậy một số sáng tạo với các...</p>
                                <a href="#" className="text-red-500">Đọc Thêm</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex mb-4">
                            <div className="w-1/3 relative">
                                <img src="https://placehold.co/300x200" alt="A teacher encouraging a child in a classroom" />
                                <div className="absolute top-0 left-0 bg-white p-2 text-center">
                                    <p className="text-lg font-bold">14</p>
                                    <p>TH10</p>
                                </div>
                            </div>
                            <div className="w-2/3 pl-4">
                                <div className="bg-red-500 text-white inline-block px-2 py-1 mb-2">Góc trẻ em</div>
                                <h2 className="text-2xl font-bold mb-2">Khuyến khích trẻ mẫu giáo sử dụng trí tưởng tượng của chúng</h2>
                                <p className="mb-2">Viết bởi <span className="text-red-500">Minh Duc</span> / Leave a comment</p>
                                <p className="mb-2">Trí tưởng tượng là một nền tảng cơ bản giúp hình thành óc sáng tạo của mỗi bé. Thúc đẩy trí tưởng tượng của chúng và khơi dậy một số sáng tạo với các...</p>
                                <a href="#" className="text-red-500">Đọc Thêm</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default KidsBlogComponent;
