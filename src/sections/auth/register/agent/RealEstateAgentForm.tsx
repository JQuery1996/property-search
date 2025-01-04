"use client";
import { Button, Flex, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PhoneInput from "antd-phone-input";
import { CustomText, CustomUpload } from "@/components";
import { Link } from "@/i18n/routing";
import { PAGES } from "@/constants";

export function RealEstateAgentForm() {
  const [form] = Form.useForm();
  const translate = useTranslations("Form");
  function handleRemoveFile() {
    form.resetFields(["file"]);
  }
  return (
    <Form
      form={form}
      layout="vertical"
      name="RealEstateAgentForm"
      autoComplete="off"
      requiredMark="optional"
    >
      <Form.Item
        label={translate("fullName")}
        name="fullname"
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
              width={20} // Adjust the size as needed
              height={20}
            />
          }
        />
      </Form.Item>
      <Form.Item
        label={translate("phoneNumber")}
        name="phoneNumber"
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
        rules={[{ type: "email" }]}
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
              width={20} // Adjust the size as needed
              height={20}
            />
          }
          autoComplete="new-password"
        />
      </Form.Item>
      <Form.Item
        name="confirm"
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
          marginTop: "40px",
        }}
      >
        <Form.Item style={{ width: "100%" }}>
          <Button block size="large" htmlType="submit">
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
