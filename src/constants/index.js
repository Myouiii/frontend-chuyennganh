// gender options
const GENDER_OPTIONS = [
  { value: true, label: 'Nam' },
  { value: false, label: 'Nữ' },
];

// hình thức giao hàng
const TRANSPORT_METHOD_OPTIONS = [
  { value: 0, label: 'Giao hàng tiêu chuẩn', price: 40000 },
  { value: 1, label: 'Giao hàng tiết kiệm', price: 20000 },
  { value: 2, label: 'Giao hàng nhanh', price: 100000 },
];

// product type options
const PRODUCT_TYPES = [
  { type: 0, label: 'Điện thoại' },
  { type: 1, label: 'Sạc dự phòng'  },
  { type: 2, label: 'Tai nghe' },

];

const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/login/forgot-pw',
  PRODUCT: '/product/:productId',
  NOT_FOUND: '/not-found',
  ADMIN: '/admin',
  ACCOUNT: '/account',
  CART: '/cart',
  SEARCH: '/search',
  FILTER: '/filter',
  ACCOUNT_ORDERS: '/account/orders',
  ACCOUNT_ADDRESSES: '/account/addresses',
  ACCOUNT_NOTIFICATIONS: '/account/notifications',
  PAYMENT: '/payment',
};

// FILTERS

// mobile
const FILTER_BRAND_MOBILE = [
  {
    title: 'iPhone',
    to: 'apple',
  },
  {
    title: 'Samsung',
    to: 'samsung',
  },
  {
    title: 'OPPO',
    to: 'oppo',
  },
  {
    title: 'Realme',
    to: 'realme',
  },
  {
    title: 'Xiaomi',
    to: 'xiaomi',
  },
  {
    title: 'Nokia',
    to: 'nokia',
  },
  {
    title: 'Huawei',
    to: 'huawei',
  },
  {
    title: 'Vivo',
    to: 'vivo',
  },
];
const FILTER_PRICE_MOBILE = [
  {
    title: 'Dưới 5 triệu',
    to: 'nhohon-5tr',
  },
  {
    title: '5-10 triệu',
    to: 'lonhon-5tr,nhohon-10tr',
  },
  {
    title: '10-15 triệu',
    to: 'lonhon-10tr,nhohon-15tr',
  },
  {
    title: '15-20 triệu',
    to: 'lonhon-15tr,nhohon-20tr',
  },
  {
    title: 'Trên 20 triệu',
    to: 'lonhon-20tr',
  },
];
const FILTER_ROM_MOBILE = [
  {
    title: '16 GB',
    to: '16GB',
  },
  {
    title: '32 GB',
    to: '32GB',
  },
  {
    title: '64 GB',
    to: '64GB',
  },
  {
    title: '128 GB',
    to: '128GB',
  },
  {
    title: '256 GB',
    to: '256GB',
  },
  {
    title: '512 GB',
    to: '512GB',
  },
];
const FILTER_RAM_MOBILE = [
  {
    title: '1 GB',
    to: '1GB',
  },
  {
    title: '2 GB',
    to: '2GB',
  },
  {
    title: '3 GB',
    to: '3GB',
  },
  {
    title: '4 GB',
    to: '4GB',
  },
  {
    title: '6 GB',
    to: '6GB',
  },
  {
    title: '8 GB',
    to: '8GB',
  },
  {
    title: '12 GB',
    to: '12GB',
  },
];
const FILTER_ACCESSORY_MOBILE = [
  {
    title: 'Ốp lưng',
    to: '/',
  },
];

//headphone
const FILTER_TYPE_HEADPHONE = [
  {
    title: 'Chụp tai không dây',
    to: 'over_ear',
  },
  {
    title: 'Nhét tai',
    to: 'in_ear',
  },
  {
    title: 'Chụp tai có dây',
    to: 'on_ear',
  },
];
const FILTER_CONNECT_STD_HEADPHONE = [
  {
    title: '3.5mm',
    to: '0',
  },
  {
    title: 'Bluetooth',
    to: '1',
  },
  {
    title: 'USB 3.0',
    to: '2',
  },
  {
    title: 'Bluetooth 4.0',
    to: '3',
  },
  {
    title: 'Bluetooth 5.0',
    to: '/',
  },
  {
    title: '2.4 GHz Wireless',
    to: '4',
  },
];

// filter options list
const FILTER_OPTION_LIST = [
  
  // 0: MOBILE
  {
    key: 0,
    root: `${ROUTES.FILTER}?t=0`,
    data: [
      {
        title: 'Thương hiệu',
        subFilters: FILTER_BRAND_MOBILE,
        query: 'p-reg-thuong_hieu=',
      },
      {
        title: 'Theo giá',
        subFilters: FILTER_PRICE_MOBILE,
        query: 'p-o-gia=',
      },
      {
        title: 'Bộ nhớ trong',
        subFilters: FILTER_ROM_MOBILE,
        query: 'rom=',
      },
      {
        title: 'Dung lượng RAM',
        subFilters: FILTER_RAM_MOBILE,
        query: 'ram=',
      },
    ],
  },
  
  // 1: HEADPHONE
  {
    key: 1,
    root: `${ROUTES.FILTER}?t=1`,
    data: [
      {
        title: 'Loại tai nghe',
        subFilters: FILTER_TYPE_HEADPHONE,
        query: 'loai=',
      },
      {
        title: 'Chuẩn kết nối',
        subFilters: FILTER_CONNECT_STD_HEADPHONE,
        query: 'chuan_ket_noi=',
      },
    ],
  },
  
  

 
];

// các cặp chuyển đổi url
const PAIR_CONVERT_KEY = [
  { l: `lonhon-`, r: `"$gte":` },
  { l: `nhohon-`, r: `"$lt":` },
  { l: `GB`, r: '' },
  { l: `loai`, r: `type` },
  { l: `dungluong`, r: `capacity` },
  { l: `chuan_ket_noi`, r: `connectionStd` },
  { l: `kich_thuoc`, r: `size` },
  { l: `Hz`, r: '' },
  { l: `nha_sx`, r: `manufacturer` },
  { l: `NVIDIA`, r: `0` },
  { l: `AMD`, r: `1` },
  { l: `co_day`, r: `0` },
  { l: `khong_day`, r: `1` },
  { l: `led`, r: `isLed` },
  { l: `rgb`, r: `true` },

  { l: `mau`, r: `color` },
  { l: `MauLed`, r: `ledColor` },
  { l: `over_ear`, r: `0` },
  { l: `in_ear`, r: `1` },
  { l: `on_ear`, r: `2` },

];

const constants = {
  REFRESH_TOKEN_KEY: 'refresh_token',
  ACCESS_TOKEN_KEY: 'loc_mobile',
  MAX_VERIFY_CODE: 6,
  TRANSPORT_METHOD_OPTIONS,
  GENDER_OPTIONS,
  // tuổi nhỏ nhất sử dụng app
  MIN_AGE: 8,
  // thời gian delay khi chuyển trang
  DELAY_TIME: 750,
  // số lần đăng nhập sai tối đa
  MAX_FAILED_LOGIN_TIMES: 5,
  ROUTES,
  REFRESH_TOKEN: 'refresh_token',
  PRODUCT_TYPES,
  // tỉ lệ nén ảnh, và nén png 2MB
  COMPRESSION_RADIO: 0.6,
  COMPRESSION_RADIO_PNG: 2000000,
  // số lượng sản phẩm liên quan tối đa cần lấy
  MAX_RELATED_PRODUCTS: 12,
  // Avatar mặc định của user
  DEFAULT_USER_AVT:
    'https://res.cloudinary.com/dn6u4r97x/image/upload/v1669979835/avatar/default-avatar_amkff5_oppof3.jpg',
  // Số comment sản phẩm trên trang
  COMMENT_PER_PAGE: 5,
  // độ dài tối đa của cmt
  MAX_LEN_COMMENT: 1000,
  // key danh sách giỏ hàng
  CARTS: 'carts',
  FILTER_BRAND_MOBILE,
  FILTER_PRICE_MOBILE,
  FILTER_ROM_MOBILE,
  FILTER_RAM_MOBILE,
  FILTER_ACCESSORY_MOBILE,
  FILTER_TYPE_HEADPHONE,
  FILTER_CONNECT_STD_HEADPHONE,
  FILTER_OPTION_LIST,
  PAIR_CONVERT_KEY,
};
export default constants;