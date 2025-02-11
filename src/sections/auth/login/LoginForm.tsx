"use client";
import { App, Button, Checkbox, Flex, Form, Input, theme } from "antd";
import PhoneInput from "antd-phone-input";
import { LockOutlined } from "@ant-design/icons";
import { CustomText } from "@/components";
import { Link, useRouter } from "@/i18n/routing";
import { PAGES } from "@/constants";
import { useAuth } from "@/contexts";
import { axiosInstance } from "@/client";
import { useState } from "react";
import { TPhone } from "@/types";
import { phoneNumberFormation } from "@/helpers";
import { useTranslations } from "next-intl";

const { useToken } = theme;

export function LoginForm() {
  const [form] = Form.useForm();
  const { token } = useToken();
  const { login } = useAuth();
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const translate = useTranslations("Form");

  const onFinish = async ({
    phone,
    password,
  }: {
    phone: TPhone;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/login", {
        phone: phoneNumberFormation(phone),
        password: password,
        fcm_token: "xxxx",
      });

      const { token: authToken, user } = response.data;
      login(authToken, user);
      message.success("Login successful!");
      replace("/");
    } catch (error: any) {
      console.log({ error });
      console.error("Login failed:", error);
      message.error(
        error.response?.data?.message || translate("Validations.loginFailed"),
      );
    } finally {
      setLoading(false);
    }
  };
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
      onFinish={onFinish}
    >
      <Form.Item
        label={translate("phoneNumber")}
        name="phone"
        rules={[
          {
            required: true,
            message: translate("Validations.phoneNumberRequired"),
          },
        ]}
      >
        <PhoneInput
          enableSearch
          placeholder={translate("phoneNumber")}
          autoComplete="username"
        />
      </Form.Item>
      <Form.Item
        label={translate("password")}
        name="password"
        rules={[
          {
            required: true,
            message: translate("Validations.passwordRequired"),
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder={translate("password")}
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center" wrap gap={8}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ textWrap: "nowrap" }}>
              {translate("rememberMe")}
            </Checkbox>
          </Form.Item>
          <CustomText type="secondary" style={{ textWrap: "nowrap" }}>
            {translate("forgetPassword")}
            <Link href="" passHref>
              <CustomText type="primary" style={{ cursor: "pointer" }}>
                {" "}
                {translate("resetPassword")}
              </CustomText>
            </Link>
          </CustomText>
        </Flex>
      </Form.Item>
      <Flex
        vertical
        justify="center"
        align="center"
        gap={16}
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "40px",
        }}
      >
        <Form.Item style={{ width: "100%", margin: 0 }}>
          <Button
            block
            htmlType="submit"
            size="large"
            style={{
              backgroundColor: token.greyMain,
              border: "none",
              color: "white",
            }}
            loading={loading}
          >
            {translate("login")}
          </Button>
        </Form.Item>
        <Link href={PAGES.REGISTER_CLIENT} style={{ width: "100%" }}>
          <Button block variant="outlined" color="primary" size="large">
            {translate("createAsClient")}
          </Button>
        </Link>

        <Link href={PAGES.REGISTER_AGENT} style={{ width: "100%" }}>
          <Button block variant="outlined" color="primary" size="large">
            {translate("createAsAgent")}
          </Button>
        </Link>
      </Flex>
    </Form>
  );
}
