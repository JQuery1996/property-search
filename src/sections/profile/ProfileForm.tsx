import {
  App,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PhoneInput from "antd-phone-input";
import { useAuth, useSettings } from "@/contexts";
import { useLocale } from "use-intl";
import { TUpdateProfile } from "@/types";

export function ProfileForm() {
  const [form] = Form.useForm();
  const translate = useTranslations("Form");
  const commonTranslate = useTranslations("Common");
  const [submitLoading, setSubmitLoading] = useState(false);
  const { user, updateProfile } = useAuth();
  const locale = useLocale();
  const { message } = App.useApp();
  const {
    countries,
    measurements,
    countryId,
    measurementId,
    loading,
    updateMeasurement,
    updateCountry,
  } = useSettings();

  const initialValues = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    country_id: countryId,
    measurement_id: measurementId,
  };
  function handleReset() {
    form.resetFields();
  }

  useEffect(() => {
    form.setFieldValue("country_id", countryId);
    form.setFieldValue("measurement_id", measurementId);
  }, [countryId, measurementId]);
  async function onFinish(values: TUpdateProfile) {
    setSubmitLoading(true);
    try {
      await updateProfile({
        name: values.name,
        email: values.email,
        country_id: values.country_id,
        measurement_id: values.measurement_id,
      });
      updateCountry({ id: parseInt(values.country_id!) });
      updateMeasurement({ id: parseInt(values.measurement_id!) });
    } catch (error: any) {
      message.error(
        error.response?.data?.message || commonTranslate("operationFailed"),
      );
    } finally {
      setSubmitLoading(false);
    }
  }
  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="vertical"
      name="profileForm"
      autoComplete="off"
      requiredMark="optional"
      onFinish={onFinish}
    >
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
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
        </Col>
        <Col xs={24} md={12}>
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
        </Col>
        <Col xs={24} md={12}>
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
            <PhoneInput enableSearch readOnly />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="password" label={translate("password")} hasFeedback>
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
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="country_id" label={translate("country")}>
            <Select
              placeholder={translate("country")}
              prefix={
                <Image
                  src="/images/icons/city.svg"
                  alt="Mail Icon"
                  width={20}
                  height={20}
                />
              }
              options={countries.map((c) => ({
                value: c.id,
                label: c[`name_${locale}` as "name_en" | "name_ar"],
              }))}
              dropdownRender={(menu) =>
                loading ? (
                  <Flex justify="center" align="center" style={{ height: 50 }}>
                    <Spin />
                  </Flex>
                ) : (
                  <>{menu}</>
                )
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="measurement_id" label={translate("measurement")}>
            <Select
              placeholder={translate("country")}
              prefix={
                <Image
                  src="/images/icons/city.svg"
                  alt="Mail Icon"
                  width={20}
                  height={20}
                />
              }
              options={measurements.map((m) => ({
                value: m.id,
                label: m[`name_${locale}` as "name_en" | "name_ar"],
              }))}
              dropdownRender={(menu) =>
                loading ? (
                  <Flex justify="center" align="center" style={{ height: 50 }}>
                    <Spin />
                  </Flex>
                ) : (
                  <>{menu}</>
                )
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
        }}
      >
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              loading={submitLoading}
            >
              Submit
            </Button>
            <Button
              htmlType="button"
              color="danger"
              size="middle"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </div>
    </Form>
  );
}
