"use client";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import Image from "next/image";
import PhoneInput from "antd-phone-input";
import { CustomText } from "@/components";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PAGES } from "@/constants";

export function ClientRegisterForm() {
  const [form] = Form.useForm();
  const translate = useTranslations("Form");
  return (
    <Form
      form={form}
      layout="vertical"
      name="clientRegisterForm"
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
        />
      </Form.Item>
      <Flex vertical gap={4}>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox style={{ textWrap: "nowrap" }}>
            {translate("rememberMe")}
          </Checkbox>
        </Form.Item>
        <Form.Item name="terms" valuePropName="checked" noStyle>
          <Checkbox style={{ textWrap: "nowrap" }}>
            <CustomText type="primary">{translate("agree_terms")}</CustomText>
          </Checkbox>
        </Form.Item>
        <Form.Item name="follow" valuePropName="checked" noStyle>
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
          <Button block size="large" htmlType="submit">
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