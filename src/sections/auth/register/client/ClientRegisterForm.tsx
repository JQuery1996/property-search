import { Form, Input } from "antd";
import Image from "next/image";
export function ClientRegisterForm() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      name="clientRegisterForm"
      autoComplete="off"
      requiredMark={false}
    >
      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[
          {
            required: true,
            message: "Please enter your full name",
          },
        ]}
      >
        <Input
          placeholder="Full Name"
          prefix={
            <Image
              src="/images/icon/account-circle.svg"
              alt="Account Icon"
              width={20} // Adjust the size as needed
              height={20}
            />
          }
        />
      </Form.Item>
    </Form>
  );
}
