import { Carousel } from 'antd';
import React from 'react';
import './index.scss';

// Do cả chương trình chỉ có 1 list carousel
// Nên lưu thẳng vào đây để đỡ tốn chi phí query
const list = [
  'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669990203/banner/3_wwgin5_bokmea.webp',
  'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669990324/banner/TRA-GOP-MPOS-1-min_avrltz.png',
  'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669990493/banner/4_amgb7n_qzf8t2.webp',
  'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669990539/banner/5_kfuyu2_siic6f.webp',
  'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669990625/banner/1_ggor4n_eoexxl.webp',
  'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669990659/banner/6_kt4deu_zrosid.webp',
  'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669990698/banner/7_gokjlq_m8ropn.webp',
  'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669990722/banner/9_qq407q_upwjn1.webp',
  'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669990778/banner/10_pcgl2j_rbxxhk.webp',
 
];

function SaleOff() {
  return (
    <Carousel className="Sale-Off" autoplay>
      {list.map((item, index) => (
        <img className="Sale-Off-img" src={item} key={index} />
      ))}
    </Carousel>
  );
}

export default SaleOff;
