"use client";
import { App, Button, Checkbox, Flex, Form, Input } from "antd";
import Image from "next/image";
import PhoneInput from "antd-phone-input";
import { CustomText } from "@/components";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { PAGES, ROLES } from "@/constants";
import { useAuth } from "@/contexts";
import { useState } from "react";
import { axiosInstance } from "@/client";
import { phoneNumberFormation } from "@/helpers";
import { TPhone } from "@/types";

export function ClientRegisterForm() {
  const [form] = Form.useForm();
  const translate = useTranslations("Form");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { replace } = useRouter();
  const { message } = App.useApp();
  const onFinish = async (values: {
    name: string;
    phone: TPhone;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/register", {
        name: values.name,
        phone: phoneNumberFormation(values.phone),
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        fcm_token: "xxxx",
        account_role: ROLES.user,
      });

      const { token: authToken, user } = response.data;
      login(authToken, user);
      message.success("Login successful!");
      replace("/");
    } catch (error: any) {
      console.log({ error });
      console.error("Login failed:", error);
      message.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      name="clientRegisterForm"
      autoComplete="off"
      requiredMark="optional"
      onFinish={onFinish}
    >
      <Form.Item
        label={translate("fullName")}
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter your full name",
          },
        ]}
      >
        <Input
          placeholder={translate("fullName")}
          prefix={
            <Image
              src="/images/icons/account_circle.svg"
              alt="Account Icon"
              width={20}
              height={20}
            />
          }
        />
      </Form.Item>

      <Form.Item
        label={translate("phoneNumber")}
        name="phone"
        rules={[
          {
            required: true,
            message: "Please enter a phone number",
          },
        ]}
      >
        <PhoneInput enableSearch />
      </Form.Item>
      <Form.Item
        name="email"
        label={translate("email")}
        rules={[{ type: "email", required: true }]}
      >
        <Input
          placeholder={translate("email")}
          prefix={
            <Image
              src="/images/icons/mail.svg"
              alt="Mail Icon"
              width={20}
              height={20}
            />
          }
          autoComplete="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={translate("password")}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          placeholder={translate("password")}
          prefix={
            <Image
              src="/images/icons/key.svg"
              alt="Mail Icon"
              width={20}
              height={20}
            />
          }
          autoComplete="new-password"
        />
      </Form.Item>
      <Form.Item
        name="password_confirmation"
        label={translate("confirmPassword")}
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!"),
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder={translate("confirmPassword")}
          prefix={
            <Image
              src="/images/icons/key.svg"
              alt="Mail Icon"
              width={20}
              height={20}
            />
          }
          autoComplete="new-password"
        />
      </Form.Item>
      <Flex vertical gap={4}>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox style={{ textWrap: "nowrap" }}>
            {translate("rememberMe")}
          </Checkbox>
        </Form.Item>
        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[{ required: true }]}
          style={{ margin: 0 }}
        >
          <Checkbox style={{ textWrap: "nowrap" }}>
            <CustomText type="primary">{translate("agree_terms")}</CustomText>
          </Checkbox>
        </Form.Item>
        <Form.Item
          name="follow"
          valuePropName="checked"
          rules={[{ required: true }]}
        >
          <Checkbox style={{ textWrap: "wrap" }}>
            {translate("allowFastHome")}
          </Checkbox>
        </Form.Item>
      </Flex>

      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "40px",
        }}
      >
        <Form.Item style={{ width: "100%" }}>
          <Button block size="large" htmlType="submit" loading={loading}>
            {translate("createAnAccount")}
          </Button>
        </Form.Item>
        <CustomText>
          {translate.rich("alreadyMember", {
            span: (chunks) => (
              <Link href={PAGES.LOGIN}>
                <CustomText type="primary">{chunks}</CustomText>
              </Link>
            ),
          })}
        </CustomText>
      </Flex>
    </Form>
  );
}
