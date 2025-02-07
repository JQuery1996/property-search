"use client";
import { App, Button, Form, Tooltip, Upload } from "antd";
import { useState } from "react";
import { colors } from "@/theme/colors";
import Image from "next/image";
import { CustomText, CustomTitle } from "@/components";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import styles from "./style.module.css";

type TCustomUpload = {
  placeholder: string;
  onRemoveAction: () => void;
  acceptedExtensions?: string[];
  maxSize?: number;
};
export function CustomUpload({
  placeholder,
  onRemoveAction,
  acceptedExtensions = ["png", "jpg", "jpeg", "pdf"],
  maxSize = 2,
}: TCustomUpload) {
  const translate = useTranslations("Form");
  const { message } = App.useApp();
  const [preview, setPreview] = useState<{
    type: "file" | "image";
    content: string | ArrayBuffer | null | undefined;
  }>({
    type: null!,
    content: null,
  });

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleFileChange = ({ file }: { file: any }) => {
    if (file.type.startsWith("image/")) {
      // If the file is an image
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview({ type: "image", content: e?.target?.result });
      };
      reader.readAsDataURL(file);
    } else {
      // If the file is not an image
      setPreview({ type: "file", content: file.name });
    }
  };

  function handleRemove() {
    setPreview({ type: null!, content: null });
    onRemoveAction();
  }
  function handleBeforeUpload(file: File) {
    const isAllowedExtension = acceptedExtensions.some((ext) =>
      file.type.includes(ext),
    );
    if (!isAllowedExtension) {
      message.error(
        translate("Validations.acceptedExtensions") +
          " " +
          acceptedExtensions.join(", "),
      );
      return Upload.LIST_IGNORE;
    }
    const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtMaxSize) {
      message.error(
        translate("Validations.fileSizeLessThan") + " " + `${maxSize}MB!`,
      );
      return Upload.LIST_IGNORE;
    }

    return false;
  }

  return (
    <>
      <div
        className={styles.uploadContainer}
        style={{
          border: `2px solid ${colors.pink.dark}`,
          ...(preview.type === "image" && {
            backgroundImage: `url(${preview.content})`,
          }),
        }}
      >
        {!preview.content && (
          <CustomTitle level={2} type="secondary" className={styles.title}>
            {placeholder}
          </CustomTitle>
        )}
        {preview?.type !== "image" && preview?.content && (
          <span className={styles.filePreview}>
            {preview.content as string}
          </span>
        )}
        <Form.Item
          name="license"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          className={styles.formItem}
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Upload
            beforeUpload={handleBeforeUpload} // Prevent automatic upload
            maxCount={1} // Restrict to one file
            showUploadList={false} // Disable preview and progress UI
            onChange={handleFileChange} // Handle file change
            accept={acceptedExtensions.map((ext) => `.${ext}`).join(",")}
          >
            <Image
              alt="upload file"
              src="/images/icons/camera.svg"
              width="48"
              height="48"
              style={{ cursor: "pointer" }}
            />
          </Upload>
        </Form.Item>
        {preview.content && (
          <Tooltip title={translate("remove")}>
            <Button
              onClick={handleRemove}
              size="middle"
              type="text"
              icon={<CloseOutlined />}
              className={styles.removeButton}
            />
          </Tooltip>
        )}
      </div>
      {/* Display Error Message Below */}
      <Form.Item shouldUpdate style={{ margin: 0 }}>
        {({ getFieldError }) => {
          const errors = getFieldError("license");
          return errors.length > 0 ? (
            <CustomText type="danger">
              {translate("Validations.licenseRequired")}
            </CustomText>
          ) : null;
        }}
      </Form.Item>
    </>
  );
}
