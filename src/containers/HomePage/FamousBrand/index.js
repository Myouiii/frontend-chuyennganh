import { Col, Row } from 'antd';
import React from 'react';
import './index.scss';

// fn: hiển thị danh sách thương hiệu
function showBrandList(list) {
  return list.map((item, index) => (
    <Col span={12} md={6} key={index}>
      <div className="brand-item text-center">
        <a href={item.link} target="blank">
          <img className="shadow-black/30" width="100%" src={item.src} alt="Photo" />
        </a>
        <h4 className="text-[18px]">{item.title}</h4>
        <span className="text-[16px]">{item.desc}</span>
      </div>
    </Col>
  ));
}

// danh sách thương hiệu
const list = [
  {
    link: 'https://www.apple.com/vn/iphone/',
    src:
      'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669993728/banner/poster/images_dpptdk.jpg',
    title: 'IPHONE',
    desc: 'Trái táo nhỏ dễ thương',
  },
  {
    link: 'https://www.samsung.com/vn/',
    src:
      'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669993395/banner/poster/samsung-galaxy-a03s_1_t1jz54.jpg',
    title: 'SAMSUNG',
    desc: 'Điện thoại siêu cấp vip pro',
  },
  {
    link: 'https://www.oppo.com/vn/',
    src:
      'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669994243/banner/poster/reno6z-2_800x449-600x400_bllvre.jpg',
    title: 'OPPO',
    desc: 'Siêu ưu đãi cùng với OPPO',
  },
  {
    link: 'https://www.nokia.com/phones/vi_vn',
    src:
      'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669994608/banner/poster/banner-1200x630px_hb0lte.jpg',
    title: 'NOKIA',
    desc: 'Sản phẩm siêu chất lượng',
  },
];

// rendering ...
function FamousBrand() {
  return (
    <div className="p-4 Famous-Brand">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2 className="font-bold">Thương hiệu nổi bật</h2>
          <div className="underline-title"></div>
        </Col>
        {showBrandList(list)}
      </Row>
    </div>
  );
}

export default FamousBrand;
