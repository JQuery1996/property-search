"use client";
import { App, Button, Flex, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PhoneInput from "antd-phone-input";
import { CustomText, CustomUpload } from "@/components";
import { Link, useRouter } from "@/i18n/routing";
import { PAGES, ROLES } from "@/constants";
import { TPhone } from "@/types";
import { phoneNumberFormation } from "@/helpers";
import { axiosInstance } from "@/client";
import { useState } from "react";

export function RealEstateAgentForm() {
  const [form] = Form.useForm();
  // const { login } = useAuth();
  const { message } = App.useApp();
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);
  const translate = useTranslations("Form");

  const onFinish = async (values: {
    name: string;
    phone: TPhone;
    email: string;
    password: string;
    password_confirmation: string;
    license: any[];
  }) => {
    // start loading
    setLoading(true);
    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", phoneNumberFormation(values.phone));
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    formData.append("fcm_token", "xxx");
    formData.append("account_role", ROLES.normalCompany);

    // Append file
    if (values.license?.length) {
      formData.append("license", values.license[0].originFileObj);
    }
    try {
      await axiosInstance.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const { token: authToken, user } = response.data;
      // login(authToken, user);
      message.success(translate("Validations.registerSuccess"));
      message.warning(translate("waitForApprove"));
      replace(PAGES.LOGIN);
    } catch (error: any) {
      message.error(
        error.response?.data?.message ||
          translate("Validations.registerFailed"),
      );
    } finally {
      setLoading(false);
    }
  };
  function handleRemoveFile() {
    form.resetFields(["license"]);
  }
  return (
    <Form
      disabled={loading}
      form={form}
      layout="vertical"
      name="RealEstateAgentForm"
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
            message: translate("Validations.fullNameRequired"),
          },
        ]}
      >
        <Input
          placeholder={translate("fullName")}
          prefix={
            <Image
              src="/images/icons/account_circle.svg"
              alt="Account Icon"
              width={20} // Adjust the size as needed
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
            message: translate("Validations.phoneNumberRequired"),
          },
        ]}
      >
        <PhoneInput enableSearch />
      </Form.Item>
      <Form.Item
        name="email"
        label={translate("email")}
        rules={[
          {
            type: "email",
            required: true,
            message: translate("Validations.emailRequired"),
          },
        ]}
      >
        <Input
          placeholder={translate("email")}
          prefix={
            <Image
              src="/images/icons/mail.svg"
              alt="Mail Icon"
              width={20} // Adjust the size as needed
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
            message: translate("Validations.passwordRequired"),
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
              width={20} // Adjust the size as needed
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
            message: translate("Validations.confirmPassword"),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(translate("Validations.confirmNotMatch")),
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
              width={20} // Adjust the size as needed
              height={20}
            />
          }
          autoComplete="new-password"
        />
      </Form.Item>
      <CustomUpload
        placeholder={translate("tradeLicense")}
        onRemoveAction={handleRemoveFile}
      />
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        <Form.Item style={{ width: "100%" }}>
          <Button block size="large" htmlType="submit" loading={loading}>
            {translate("signUp")}
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
