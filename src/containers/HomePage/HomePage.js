import { Col, Row } from 'antd';
import AllProduct from './AllProduct';
import FamousBrand from './FamousBrand';
import "./HomePage.scss"
import SaleOff from './SaleOff';
function Home() {
    document.querySelector('body').scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
    return (
        <div className="Home">
            <div className="relative">
                <SaleOff />
            </div>
            <Row className="main mx-auto">
                {/* Thương hiệu nổi bật */}
                <Col span={24} className="my-8 bg-white shadow-black/30 rounded-lg">
                    <FamousBrand />
                </Col>
                <Col span={24} className="adv shadow-black/30 rounded mb-8">
                    <a href="https://www.apple.com/iphone/" target="blank">
                        <img
                            className="adv-img w-full rounded"
                            src="https://res.cloudinary.com/dn6u4r97x/image/upload/v1669992153/banner/poster/tra-gop-0_-lai-suot-trong-3-thang-mobi-banner-viettablet_zmrh7r.jpg"
                            alt="poster"
                        />
                    </a>
                </Col>
                {/* Tổng hợp sản phẩm */}
                <Col span={24} className="mb-8 mt-4 gap-4 bg-white shadow-lg shadow-black/30 rounded-lg">
                    <AllProduct />
                </Col>
                
            </Row>

        </div>
    );
}

export default Home;