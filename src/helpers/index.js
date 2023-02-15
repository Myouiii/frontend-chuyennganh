/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-expressions */
import constants from '../constants';

// fn: chuyển đổi 1 số keyword sang mongo key, ex: "lonhon-" => "$gte:"
const replaceMongoKeyword = (value = '') => {
  let result = value;
  constants.PAIR_CONVERT_KEY.forEach((pair) => {
    result = result.replaceAll(pair.l, pair.r);
  });
  return result;
};

// fn: query string: ?t=0&key=1 => [{ t:0 }, { key: 1 }]
const queryString = (query = '') => {
  if (!query || query === '') return [];
  let result = [];
  let q = query;
  // xoá ký tự '?' nếu có
  if (q[0] === '?') q = q.slice(1, q.length);
  // tách các cụm query ['t=0', 'key=1']
  const queryList = q.split('&');
  result = queryList.map((str) => {
    let res = {};
    let temp = str.split('=');
    if (temp.length <= 1) res[temp[0]] = '';
    else res[temp[0]] = temp[1];
    return res;
  });

  return result;
};

// fn: phân tích query param url
// vd: key = p-reg-brand, value = Apple => {brand: {$regex: /^Apple$/i}}
// option p- là thuộc tính trong Product Model
const analysisQuery = (key = '', value = '') => {
  try {
    if (key === '') return;
    let result = {};

    // split '-' => ["p", "reg", "brand"]
    const options = key.split('-');

    // lấy main key là phần tử cuối trong mảng
    const mainKey = options[options.length - 1];

    // Note:nếu tồn tại "p" thì là thuộc tính của product model
    const isProductAttr = options.indexOf('p') === -1 ? false : true;

    // Note: nếu tồn tại "reg" tức là chuỗi cần bỏ vào regex
    const isRegex = options.indexOf('reg');

    // Note: nếu tồn tại "o" tức chuỗi là 1 object
    const isObject = options.indexOf('o');

    // value tồn tại ";" tức là đa giá trị
    const compositeValues = value.split(';');
    if (compositeValues.length <= 1) {
      // Note: đơn giá trị
      if (isRegex !== -1) {
        // giá trị value là 1 regex
        const newObj = {};
        newObj[mainKey] = { $regex: `${value}` };
        Object.assign(result, newObj);
      } else if (isObject !== -1) {
        //  giá trị value là 1 object
        const newObj = JSON.parse(`{${value}}`);
        result[mainKey] = newObj;
      } else {
        // không chứa key đặc biệt
        result[mainKey] = `${value}`;
      }
    } else {
      // Note: nhiều giá trị [values]
      result['$or'] = [];
      if (isRegex !== -1) {
        // giá trị value là 1 regex
        compositeValues.forEach((valueItem) => {
          const newObj = {};
          newObj[mainKey] = { $regex: `${valueItem}` };
          result['$or'].push(newObj);
        });
      } else if (isObject !== -1) {
        //  giá trị value là 1 object
        compositeValues.forEach((valueItem) => {
          const newObj = {};
          newObj[mainKey] = JSON.parse(`{${valueItem}}`);
          result['$or'].push(newObj);
        });
      } else {
        // không chứa key đặc biệt
        compositeValues.forEach((valueItem) => {
          const newObj = {};
          newObj[mainKey] = `${valueItem}`;
          result['$or'].push(newObj);
        });
      }
    }

    // return
    return { isProductAttr, result };
  } catch (error) {
    // error
    return { isProductAttr: true, result: {} };
  }
};

// fn: định dạng chuỗi truy vấn
const formatQueryString = (str = '') => {
  let result = str;
  // xoá tất cả ký tự đặc biệt
  result = str.replace(/[`~!@#$%^&*()_|+\-=?;:<>\{\}\[\]\\\/]/gi, '');
  // thay khoảng trắng thành dấu cộng
  result = result.replace(/[\s]/gi, '+');
  return result;
};

// fn: hàm rút gọn tên sản phẩm
const reduceProductName = (name, length = 64) => {
  let result = name;
  if (name && name.length >= length) {
    result = name.slice(0, length) + ' ...';
  }
  return result;
};

// fn: hàm format giá sản phẩm
const formatProductPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

// fn: tính tỉ lệ sao của sản phẩm [1,2,3,4,5]
const calStar = (rates) => {
  const total = rates.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  let rateTotal = 0;
  for (let i = 0; i < 5; ++i) {
    rateTotal += rates[i] * (i + 1);
  }
  return rateTotal / total;
};

// fn: chuyển key product thành tiếng Việt, vd: color => màu sắc
const convertProductKey = (key) => {
  switch (key) {
    case 'brand':
      return 'Thương hiệu';
    case 'resolution':
      return 'Độ phân giải';
    case 'warranty':
      return 'Bảo hành';
    case 'connectionStd':
      return 'Chuẩn kết nối';
    case 'frameSpeed':
      return 'Tốc độ khung hình';
    case 'capacity':
      return 'Dung lượng';
    case 'size':
      return 'Kích thước';
    case 'type':
      return 'Loại';
    case 'readSpeed':
      return 'Tốc độ đọc';
    case 'writeSpeed':
      return 'Tốc độ ghi';
    case 'rpm':
      return 'Tốc độ vòng quay';
    case 'manufacturer':
      return 'Nhà sản xuất';
    case 'chipBrand':
      return 'Nhãn hiệu chip';
    case 'processorCount':
      return 'Số lượng cpu';
    case 'series':
      return 'Series';
    case 'detail':
      return 'Chi tiết khác';
    case 'displaySize':
      return 'Kích thước màn hình';
    case 'display':
      return 'Card màn hình';
    case 'operating':
      return 'Hệ điều hành';
    case 'disk':
      return 'Ổ cứng';
    case 'ram':
      return 'RAM (GB)';
    case 'rom':
      return 'Bộ nhớ trong (GB)';
    case 'pin':
      return 'Dung lượng pin';
    case 'weight':
      return 'Khối lượng';
    case 'chipset':
      return 'Chip set';
    case 'socketType':
      return 'Loại socket';
    case 'bus':
      return 'Loại bus';
    case 'numberOfPort':
      return 'Số lượng cổng';
    case 'color':
      return 'Màu sắc';
    case 'cpu':
      return 'Cpu';
    case 'before':
      return 'Camera trước';
    case 'after':
      return 'Camera sau';
    case 'voltage':
      return 'Loại sạc';
    case 'ledColor':
      return 'Màu led';
    case 'frequency':
      return 'Tần số quét';
    case 'port':
      return 'Cổng';
    case 'bgPlate':
      return 'Tấm nền';
    case 'isLed':
      return 'Loại led';
    case 'bandwidth':
      return 'Băng thông';
    case 'strong':
      return 'Độ mạnh ăng-ten';
    case 'connectionPort':
      return 'Cổng kết nối';
    case 'wattage':
      return 'Công suất';
    default:
      return 'Chi tiết khác';
  }
};

// fn: chuyên width màn hình window -> size theo ant design
const convertWidthScreen = (size = 576) => {
  if (size < 576) return 'xs';
  if (size >= 576 && size < 768) return 'sm';
  if (size >= 768 && size < 992) return 'md';
  if (size >= 992 && size < 1200) return 'lg';
  if (size >= 1200 && size < 1600) return 'xl';
  return 'xxl';
};

// fn: Hàm chuyển rate thành text
const convertRateToText = (rate = 0) => {
  switch (rate) {
    case 0:
      return 'Sản phẩm quá tệ';
    case 1:
      return 'Sản phẩm không tốt';
    case 2:
      return 'Sản phẩm bình thường';
    case 3:
      return 'Sản phẩm tốt';
    case 4:
      return 'Cực kỳ hài lòng';
    default:
      return 'Sản phẩm bình thường';
  }
};

// fn: format thời gian
const formatDate = (date = new Date().getTime()) => {
  const d = new Date(date);
  const y = d.getFullYear(),
    m = d.getMonth(),
    day = d.getDate();

  return `${day} tháng ${m + 1}, ${y}`;
};

//fn: chuyển loại sản phẩm từ số thành Model
const convertProductType = (type = 0) => {
  switch (type) {
    case 0:
      return 'Điện thoại';
    case 1:
      return 'Sạc dự phòng';
    case 2:
      return 'Tai nghe';
    
    default:
      return 'Khác';
  }
};



// fn: random màu
const randomColor = () => {
  let r = Math.round(Math.random() * 254 + 1);
  let g = Math.round(Math.random() * 254 + 1);
  let b = Math.round(Math.random() * 254 + 1);
  return `rgb(${r},${g},${b})`;
};

// fn: generate autocomplete search options
const autoSearchOptions = () => {
  let result = [];
  // phone
  constants.FILTER_BRAND_MOBILE.map((item) => {
    result.push({ value: `Điện thoại ${item.title}` });
  });
  constants.FILTER_TYPE_HEADPHONE.map((item) => {
    result.push({ value: `Tai nghe ${item.title}` });
  });
  return result;
};



// fn: chuyên đổi loại tai nghe
const convertHeadphoneType = (type = 0) => {
  switch (type) {
    case 0:
      return 'Over-ear';
    case 1:
      return 'In-ear';
    case 2:
      return 'On-ear';
    case 3:
      return 'KHT';
    default:
      return 'Khác';
  }
};

// fn: Chuyển đổi chuẩn kết nối tai nghe
const convertHeadphoneConnectionStd = (std = 0) => {
  switch (std) {
    case 0:
      return '3.5mm';
    case 1:
      return 'Bluetooth';
    case 2:
      return 'USB';
    case 3:
      return 'Bluetooth 4.0';
    case 4:
      return 'Bluetooth 5.0';
    case 5:
      return '2.4 GHz Wireless';
    default:
      return 'Khác';
  }
};


// fn: Chuyển đổi giá trị product từ number sang string
const convertProductValue = (type = 0, product) => {
  if (product === null || product === undefined) return product;
  switch (type) {
    
    // mobile
    case 0:
      const newOps = product.operating ? 'IOS' : 'Android';
      return { ...product, operating: newOps };
    // headphone
    case 1:
      const newHeadphoneType = convertHeadphoneType(product.type);
      const newHPConnectionStd = convertHeadphoneConnectionStd(
        product.connectionStd,
      );
      return {
        ...product,
        type: newHeadphoneType,
        connectionStd: newHPConnectionStd,
      };
    
    default:
      return product;
  }
};

// fn: chuyển đổi thời gian now -> dd/mm/yyyy
const formatOrderDate = (date = Date.now(), flag = 0) => {
  const newDate = new Date(date);
  const d = newDate.getDate(),
    m = newDate.getMonth() + 1,
    y = newDate.getFullYear();
  return flag === 0
    ? `${d}/${m}/${y}`
    : `${newDate.getHours()}:${newDate.getMinutes()} ${d}/${m}/${y}`;
};

// fn: chuyển đổi tình trạng đơn hàng
const convertOrderStatus = (orderStatus = 0) => {
  switch (orderStatus) {
    case 0:
      return 'Đặt hàng thành công';
    case 1:
      return 'Đã tiếp nhận';
    case 2:
      return 'Đang lấy hàng';
    case 3:
      return 'Đóng gói xong';
    case 4:
      return 'Đang giao vận chuyển';
    case 5:
      return 'Đang vận chuyển';
    case 6:
      return 'Giao hàng thành công';
    default:
      return 'Đặt hàng thành công';
  }
};

// fn: chuyển đổi phương thức thanh toán
const convertPaymentMethod = (payMethod = 0) => {
  switch (payMethod) {
    case 0:
      return 'Thanh toán tiền mặt khi nhận hàng';
    case 1:
      return 'Thanh toán online';
    default:
      return 'Thanh toán tiền mặt khi nhận hàng';
  }
};

// fn: tính tổng phí đơn hàng
const calTotalOrderFee = (order) => {
  const { transportFee, orderProd, numOfProd } = order;
  const total =
    transportFee +
    (orderProd.price * numOfProd -
      (orderProd.price * numOfProd * orderProd.discount) / 100);
  return total;
};

export default {
  replaceMongoKeyword,
  formatQueryString,
  queryString,
  analysisQuery,
  convertProductValue,
  reduceProductName,
  formatProductPrice,
  calStar,
  convertProductKey,
  convertWidthScreen,
  convertRateToText,
  convertProductType,
  formatDate,
  randomColor,
  autoSearchOptions,
  formatOrderDate,
  convertOrderStatus,
  convertPaymentMethod,
  calTotalOrderFee,
};
