"use client";
import { useState } from "react";
import {
  App,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  FormInstance,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { FileType, getBase64 } from "@/helpers";

type TPropertyUploader = {
  acceptedExtensions?: string[];
  maxSize?: number;
  maxCount?: number;
  form: FormInstance<any>;
};

export function PropertyUploader({
  form,
  acceptedExtensions = ["png", "jpg", "jpeg", "pdf"],
  maxSize = 2,
  maxCount = 10,
}: TPropertyUploader) {
  const { message } = App.useApp();
  const translate = useTranslations("Form");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    form.setFieldValue("images", newFileList);
  };
  return (
    <>
      <Upload
        beforeUpload={handleBeforeUpload}
        listType="picture-card"
        maxCount={maxCount}
        accept={acceptedExtensions.map((ext) => `.${ext}`).join(",")}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= maxCount ? null : (
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        )}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}
