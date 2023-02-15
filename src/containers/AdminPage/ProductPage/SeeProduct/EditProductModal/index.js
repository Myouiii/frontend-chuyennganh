import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Tooltip,
  Upload,
} from 'antd';
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import adminApi from '~/apis/adminApi';
import constants from '~/constants/index';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Compressor from 'compressorjs';
import "./index.scss"
import productApi from '~/apis/productApi';
function EditProductModal(props) {
  const [productDesc, setProductDesc] = useState([]);
  const [content, setContent] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [form] = Form.useForm();
  const { visible, onClose, product } = props;
  const compFileList = useRef(new Array(5));

  const { _id, code, name, brand, discount, price, stock, type } = product
    ? product
    : {};
  const { title, desc } = productDesc ? productDesc : {};


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initValues = { _id, code, name, brand, discount, price, stock, type, title, content };
  useEffect(() => {
    form.resetFields();
  }, [form, initValues])
  // lấy sản phẩm
  useEffect(() => {
    let isSubscribe = true;

    const getProduct = async (id) => {
      try {
        if (id) {
          const result = await productApi.getProduct(id);
          if (result && isSubscribe) {
            const { data } = result;
            
            setContent(data.productDesc.desc ? data.productDesc.desc : []);
            console.log("contents: ", data.productDesc.desc);
          }
         
        }

      } catch (error) {
      }
    };

    getProduct(_id);

    return () => (isSubscribe = false);
  }, [_id]);
  // event: Sửa chữa sản phẩm
  const onEdit = async (value) => {
    try {
      console.log("value: ", value);
      setIsUpdating(true);
      const response = await adminApi.updateProduct(value);
      if (response && response.status === 200) {
        message.success('Cập nhật thành công');
        onClose(value);
      }
    } catch (error) {
      message.error('Cập nhật thất bại');
    }
    setIsUpdating(false);
  };
  // fn: nén ảnh sản phẩm, type: 0 - avt, type: 1 - picture List
  const onCompressFile = async (file, index) => {
    new Compressor(file, {
      quality: constants.COMPRESSION_RADIO,
      convertSize: constants.COMPRESSION_RADIO_PNG,
      success(fileCompressed) {
        const reader = new FileReader();
        reader.readAsDataURL(fileCompressed);
        reader.onloadend = async () => {
          compFileList.current[index] = reader.result;
        };
      },
      error(err) {
        message.error('Lỗi: ', err);
      },
    });
  };
  return (
    <Modal
      forceRender
      destroyOnClose={false}
      maskClosable={false}
      open={visible}
      okText="Cập nhật"
      cancelText="Huỷ bỏ"
      onCancel={onClose}
      okButtonProps={{ form: 'editForm', htmlType: 'submit', className: "edit-product-modal" }}
      title="Chỉnh sửa thông tin sản phẩm"
      confirmLoading={isUpdating}
      width={1000}
      centered>
      <Form
        form={form}
        initialValues={initValues}
        name="editForm"
        onFinish={(value) => onEdit(value)}>
        <Row gutter={[16, 16]}>
          {/* Id */}
          <Col span={12}>
            <Form.Item name="_id" label="ID" >
              <Input disabled size="large" placeholder="ID" />
            </Form.Item>
          </Col>

          {/* Mã sản phẩm */}
          <Col span={12}>
            <Form.Item
              label="Mã"
              name="code"
              rules={[
                { required: true, message: 'Bắt buộc', whitespace: true },
              ]}>
              <Input size="large" placeholder="Mã sản phẩm *" />
            </Form.Item>
          </Col>

          {/* Tên sản phẩm */}
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên"
              rules={[
                { required: true, message: 'Bắt buộc', whitespace: true },
              ]}>
              <Input size="large" placeholder="Tên sản phẩm *" />
            </Form.Item>
          </Col>

          {/* Giá sản phẩm */}
          <Col span={12}>
            <Form.Item
              name="price"
              label="Giá "
              rules={[{ required: true, message: 'Bắt buộc' }]}>
              <InputNumber
                min={0}
                max={9000000000}
                step={100000}
                size="large"
                style={{ width: 150 }}
                placeholder="Giá sản phẩm *"
              />
            </Form.Item>
          </Col>

          {/* Loại sản phẩm */}
          <Col span={12}>
            <Form.Item
              name="type"
              label="Loại "
              rules={[{ required: true, message: 'Bắt buộc' }]}>
              <Select size="large" placeholder="Loại sản phẩm *">
                {constants.PRODUCT_TYPES.map((item, index) => (
                  <Select.Option value={item.type} key={index}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Thương hiệu */}
          <Col span={12}>
            <Form.Item
              name="brand"
              label="Thương hiệu"
              rules={[
                { required: true, message: 'Bắt buộc', whitespace: true },
              ]}>
              <Input size="large" placeholder="Thương hiệu *" />
            </Form.Item>
          </Col>

          {/* Tồn kho */}
          <Col span={12}>
            <Form.Item
              name="stock"
              label="Tồn kho"
              rules={[{ required: true, message: 'Bắt buộc' }]}>
              <InputNumber
                style={{ width: '100%' }}
                step={1}
                size="large"
                min={0}
                max={100000}
                placeholder="Tồn kho *"
              />
            </Form.Item>
          </Col>

          {/* Mức giảm giá */}
          <Col span={12}>
            <Form.Item
              name="discount"
              label="Mức giảm giá"
              rules={[{ required: true, message: 'Bắt buộc' }]}>
              <InputNumber
                style={{ width: '100%' }}
                step={1}
                size="large"
                min={0}
                max={100}
                placeholder="Mức giảm giá *"
              />
            </Form.Item>
          </Col>
          {/* Tiêu đề, tên sp */}
          <Col span={24}>
            <Form.Item
              name="title"
              rules={[
                { required: true, message: 'Bắt buộc', whitespace: true },
              ]}>
              <Input
                size="large"
                placeholder="Tiêu đề, tên sp *"
                suffix={
                  <Tooltip title="Laptop Apple MacBook 13.3 MPXR2ZP/A">
                    <InfoCircleOutlined style={{ color: '#ccc' }} />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Col>
          {/* Desc */}
          
          {/* List mô tả */}
          <Col span={24}>
            <Form.List
              name="content"
              >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {/* render des form */}
                  {fields.map((field, index, ...restField) => {
                    return (
                      <Row key={index}>
                        <Col span={24}>
                          <Form.Item
                            className="mb-0"
                            name={[field.name]}
                            rules={[
                              {
                                required: true,
                                message: 'Bắt buộc',
                                whitespace: true,
                              },
                            ]}>
                            <div className="flex">
                              <Input.TextArea
                                className="flex-grow"
                                rows={5}
                                placeholder={`Đoạn mô tả ${index + 1} *`}
                                maxLength={2000}
                                showCount
                              />
                              <MinusCircleOutlined
                                style={{
                                  flexBasis: '36px',
                                  alignSelf: 'center',
                                }}
                                onClick={() => {
                                  remove(field.name);
                                  compFileList.current[index] = null;
                                }}
                              />
                            </div>
                          </Form.Item>
                        </Col>
                        <Col span={24} className="m-b-16">
                          <Upload
                            listType="picture"
                            onRemove={() => {
                              compFileList.current[index] = null;
                            }}
                            beforeUpload={(file) => {
                              onCompressFile(file, index);
                              return false;
                            }}>
                            <Button size="large" icon={<UploadOutlined />}>
                              {`Thêm hình ảnh ${index + 1}`}
                            </Button>
                          </Upload>
                        </Col>
                      </Row>
                    )
                  })}

                  {/* Add description button */}
                  <Form.ErrorList errors={errors} />
                  {fields.length < 5 && (
                    <Form.Item>
                      <Button
                        type="dashed"
                        className="w-100"
                        size="large"
                        onClick={() => add()}
                        icon={<PlusOutlined />}>
                        Thêm đoạn mô tả
                      </Button>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>


          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

EditProductModal.propTypes = {
  onClose: PropTypes.func,
  product: PropTypes.object,
  visible: PropTypes.bool,
};

export default EditProductModal;
