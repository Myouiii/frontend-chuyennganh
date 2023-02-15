import productApi from '~/apis/productApi';
import GlobalLoading from '~/components/Loading/Global';
import ProductDetail from '~/components/ProductDetail';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isNotFoundProduct, setIsNotFoundProduct] = useState(false);

  // lấy sản phẩm
  useEffect(() => {
    let isSubscribe = true;
    const getProduct = async (id) => {
      try {
        const result = await productApi.getProduct(id);
        if (result && isSubscribe) {
          const { data } = result;
          setProduct(data);
        }
      } catch (error) {
        if (isSubscribe) setIsNotFoundProduct(true);
      }
    };
    getProduct(productId);
    if (isSubscribe) setProduct(null);

    return () => (isSubscribe = false);
  }, [productId]);

  return (
    <>
      {product ? (
        <ProductDetail products={product} />
      ) : (
        <GlobalLoading content="Đang tải sản phẩm ..." />
      )}
      {isNotFoundProduct && <Navigate to="/not-found" />}
    </>
  );
}

export default ProductDetailPage;
