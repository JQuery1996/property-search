import { Button, Form, Tooltip, Upload } from "antd";
import { useState } from "react";
import { colors } from "@/theme/colors";
import Image from "next/image";
import { CustomTitle } from "@/components";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import styles from "./style.module.css";

type TCustomUpload = {
  placeholder: string;
  onRemoveAction: () => void;
};
export function CustomUpload({ placeholder, onRemoveAction }: TCustomUpload) {
  const translate = useTranslations("Actions");
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
  return (
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
        <span className={styles.filePreview}>{preview.content as string}</span>
      )}
      <Form.Item
        name="file"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        className={styles.formItem}
      >
        <Upload
          beforeUpload={() => false} // Prevent automatic upload
          maxCount={1} // Restrict to one file
          showUploadList={false} // Disable preview and progress UI
          onChange={handleFileChange} // Handle file change
        >
          <Image
            alt="upload file"
            src="/images/icons/camera.svg"
            width="48"
            height="48"
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
  );
}
