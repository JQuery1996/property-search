"use client";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import Link from "next/link";
import PhoneInput from "antd-phone-input";
import { LockOutlined } from "@ant-design/icons";
import { CustomText } from "@/components";

export function LoginForm() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      name="loginForm"
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      requiredMark={false}
    >
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Please enter a phone number",
          },
        ]}
      >
        <PhoneInput enableSearch placeholder="Phone Number" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center" wrap gap={8}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ textWrap: "nowrap" }}>Remember me</Checkbox>
          </Form.Item>
          <CustomText type="secondary" style={{ textWrap: "nowrap" }}>
            Forget your password?
            <Link href="/reset-password" passHref>
              <CustomText type="primary" style={{ cursor: "pointer" }}>
                {" "}
                Reset Password
              </CustomText>
            </Link>
          </CustomText>
        </Flex>
      </Form.Item>
      <Form.Item style={{ marginLeft: "20px", marginRight: "20px" }}>
        <Button block htmlType="submit" size="large" type="default">
          Log in
        </Button>
      </Form.Item>
      <Form.Item
        style={{ marginLeft: "20px", marginRight: "20px", marginTop: "40px" }}
      >
        <Button block variant="outlined" color="primary" size="large">
          Create as Client
        </Button>
      </Form.Item>
    </Form>
  );
}
