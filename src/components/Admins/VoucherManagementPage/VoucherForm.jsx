import React from "react";
import { Form, Input, DatePicker, InputNumber, Button } from "antd";
import PropTypes from "prop-types";
import moment from "moment";

const VoucherForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="voucherForm"
      initialValues={
        initialValues
          ? {
              ...initialValues,
              expiryDate: initialValues.expiryDate
                ? moment(initialValues.expiryDate, "YYYY-MM-DD")
                : null,
            }
          : {}
      }
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Voucher Name"
        rules={[{ required: true, message: "Please enter voucher name!" }]}
      >
        <Input placeholder="Enter voucher name" />
      </Form.Item>

      <Form.Item
        name="code"
        label="Voucher Code"
        rules={[{ required: true, message: "Please enter voucher code!" }]}
      >
        <Input placeholder="Enter voucher code" disabled={!!initialValues} />
      </Form.Item>

      <Form.Item
        name="expiryDate"
        label="Expiry Date"
        rules={[{ required: true, message: "Please select expiry date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="discount"
        label="Discount (%)"
        rules={[
          { required: true, message: "Please enter discount percentage!" },
          {
            type: "number",
            min: 1,
            max: 100,
            message: "Discount must be between 1% and 100%",
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={1}
          max={100}
          placeholder="Enter discount (%)"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          {initialValues ? "Update" : "Add New"}
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

VoucherForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
    expiryDate: PropTypes.string,
    discount: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default VoucherForm;
