"use client";

import {
  App,
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  theme,
} from "antd";
import { useTranslations } from "next-intl";
import { FilterConstants, FilterFormNames, PAGES } from "@/constants";
import Image from "next/image";
import {
  CustomText,
  CustomTitle,
  MapWithSearch,
  PropertyUploader,
} from "@/components";
import { TAddProperty, TFilterSettings } from "@/types";
import { axiosInstance } from "@/client";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
const { useToken } = theme;

const ROW = {
  xs: 24,
  lg: 8,
};
export function PropertyForm({
  filterSettings,
}: {
  filterSettings: TFilterSettings;
}) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { token } = useToken();
  const { push } = useRouter();
  const translate = useTranslations("Form");
  const commonTranslate = useTranslations("Common");

  const [loading, setLoading] = useState(false);
  const initialValues = {
    [FilterFormNames.PROPERTY_PURPOSE]:
      FilterConstants.PROPERTY_PURPOSES[0].value,
    [FilterFormNames.PRICE_RANGE]: [0, 1_000_000],
  };

  function handlePropertyTypeCategoryChange() {
    form.setFieldsValue({ [FilterFormNames.PROPERTY_TYPE]: [] });
  }

  function handleRadioItemClick(name: string, value: any) {
    if (form.getFieldValue(name) === value) {
      form.setFieldValue(name, null);
    }
  }
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  async function onFinish(values: TAddProperty) {
    setLoading(true);
    const formData = new FormData();
    formData.append(FilterFormNames.TITLE, values.title);
    formData.append(FilterFormNames.DESCRIPTION, values.description);
    formData.append(FilterFormNames.PROPERTY_LOCATION, values.location);
    formData.append(
      FilterFormNames.PROPERTY_PRICE,
      values.price_value.toString(),
    );
    formData.append(FilterFormNames.PRICE_PERIOD, values.price_period);
    formData.append(FilterFormNames.PROPERTY_TYPE, values.property_type);
    formData.append(FilterFormNames.PROPERTY_PURPOSE, values.property_purpose);
    formData.append(
      FilterFormNames.COMPLETION_STATUS,
      values.completion_status,
    );
    formData.append(FilterFormNames.BEDROOMS, values.bedrooms);
    formData.append(FilterFormNames.BATHROOMS, values.bathrooms);
    formData.append(
      FilterFormNames.PROPERTY_SIZE,
      values.size_value.toString(),
    );
    formData.append(
      FilterFormNames.PROPERTY_LATITUDE,
      values.location_coordinates.lat.toString(),
    );
    formData.append(
      FilterFormNames.PROPERTY_LONGITUDE,
      values.location_coordinates.lng.toString(),
    );

    if (values.amenities && values.amenities.length > 0) {
      values.amenities.forEach((amenity: any) => {
        formData.append(FilterFormNames.AMENITIES + "[]", amenity);
      });
    }
    // Append multiple images
    if (values.images && values.images.length > 0) {
      values.images.forEach((image: any) => {
        formData.append(`images[]`, image.originFileObj);
      });
    }

    try {
      const response = await axiosInstance.post("/listing", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success(translate("propertyHasBeenAddedSuccessfully"));
      push(`${PAGES.PROPERTIES}/${response.data.id}`);
    } catch (error: any) {
      message.error(translate("propertyAddedFailed"));
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="filterForm"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[FilterFormNames.PROPERTY_PURPOSE] !==
            currentValues[FilterFormNames.PROPERTY_PURPOSE]
          }
        >
          {({ getFieldValue }) => (
            <Form.Item
              name={FilterFormNames.PROPERTY_PURPOSE}
              style={{ width: "fit-content" }}
            >
              <Radio.Group
                block
                optionType="button"
                buttonStyle="solid"
                size="middle"
              >
                {FilterConstants.PROPERTY_PURPOSES.map((option) => {
                  const isChecked =
                    getFieldValue(FilterFormNames.PROPERTY_PURPOSE) ===
                    option.value;
                  return (
                    <Radio.Button
                      className="custom-checkbox bg-grey"
                      key={option.value}
                      value={option.value}
                      style={{
                        margin: "0 5px",
                        borderRadius: 6,
                        border: "1px solid #d9d9d9",
                        minWidth: 150,
                      }}
                    >
                      {isChecked ? (
                        <Flex justify="center" align="center" gap={4}>
                          <Image
                            src="/images/icons/checked.svg"
                            alt="checked"
                            width={20}
                            height={20}
                          />
                          {translate(option.label)}
                        </Flex>
                      ) : (
                        translate(option.label)
                      )}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          )}
        </Form.Item>
        <Row gutter={[16, 0]}>
          <Col xs={24} style={{ marginBottom: 20 }}>
            <CustomTitle
              level={5}
              style={{
                backgroundColor: token.pinkLighter,
                width: "fit-content",
                padding: "4px 20px",
                borderRadius: 6,
              }}
            >
              {commonTranslate("generalInformation")}
            </CustomTitle>
          </Col>
          <Col xs={ROW.xs} md={12} lg={8}>
            <Form.Item
              name={FilterFormNames.TITLE}
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("title")}
                </CustomText>
              }
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder={translate("title")} size="middle" />
            </Form.Item>
          </Col>
          <Col xs={ROW.xs}>
            <Form.Item
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("description")}
                </CustomText>
              }
              name={FilterFormNames.DESCRIPTION}
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea rows={3} placeholder={translate("description")} />
            </Form.Item>
          </Col>
          <Col xs={ROW.xs} lg={ROW.lg}>
            <Form.Item
              name={FilterFormNames.PROPERTY_TYPE_CATEGORY}
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("propertyTypeCategory")}
                </CustomText>
              }
              rules={[
                {
                  required: true,
                  message: "this field is required",
                },
              ]}
            >
              <Select
                size="middle"
                options={Object.keys(filterSettings.property_types).map(
                  (option: string) => ({
                    label: option,
                    value: option,
                  }),
                )}
                placeholder={translate("propertyTypeCategory")}
                allowClear
                showSearch
                onChange={handlePropertyTypeCategoryChange}
              />
            </Form.Item>
          </Col>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return (
                prevValues.property_type_category !==
                currentValues.property_type_category
              );
            }}
          >
            {({ getFieldValue }) =>
              getFieldValue(FilterFormNames.PROPERTY_TYPE_CATEGORY) != null ? (
                <Col xs={ROW.xs} lg={ROW.lg}>
                  <Form.Item
                    name={FilterFormNames.PROPERTY_TYPE}
                    label={
                      <CustomText style={{ fontWeight: 500 }}>
                        {translate("propertyType")}
                      </CustomText>
                    }
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <Select
                      size="middle"
                      options={(
                        filterSettings.property_types?.[
                          getFieldValue(FilterFormNames.PROPERTY_TYPE_CATEGORY)
                        ] || []
                      ).map((option: string) => ({
                        label: option,
                        value: option,
                      }))}
                      placeholder={translate("propertyType")}
                      allowClear
                      showSearch
                    />
                  </Form.Item>
                </Col>
              ) : null
            }
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return (
                prevValues.property_purpose !== currentValues.property_purpose
              );
            }}
          >
            {({ getFieldValue }) =>
              getFieldValue(FilterFormNames.PROPERTY_PURPOSE) ===
              FilterConstants.PROPERTY_PURPOSES[0].value ? (
                <Col xs={ROW.xs} lg={ROW.lg}>
                  <Form.Item
                    name={FilterFormNames.PRICE_PERIOD}
                    label={
                      <CustomText style={{ fontWeight: 500 }}>
                        {translate("pricePeriod")}
                      </CustomText>
                    }
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <Select
                      size="middle"
                      options={filterSettings.price_periods.map(
                        (option: string) => ({
                          label: option,
                          value: option,
                        }),
                      )}
                      placeholder={translate("pricePeriod")}
                      allowClear
                      showSearch
                    />
                  </Form.Item>
                </Col>
              ) : null
            }
          </Form.Item>
          <Col xs={ROW.xs} lg={ROW.lg}>
            <Form.Item
              name={FilterFormNames.AMENITIES}
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("amenities")}
                </CustomText>
              }
            >
              <Select
                size="middle"
                mode="multiple"
                options={filterSettings.amenities.map((option: string) => ({
                  label: option,
                  value: option,
                }))}
                maxTagCount="responsive"
                placeholder={translate("amenities")}
                allowClear
                showSearch
              />
            </Form.Item>
          </Col>
          <Col xs={ROW.xs} lg={ROW.lg}>
            <Form.Item
              name={FilterFormNames.BEDROOMS}
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("bedrooms")}
                </CustomText>
              }
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group
                size="middle"
                optionType="button"
                buttonStyle="solid"
              >
                <Radio.Button
                  className="custom-checkbox"
                  key="studio"
                  value="studio"
                  style={{
                    margin: 3,
                    borderRadius: 6,
                    border: "1px solid #d9d9d9",
                  }}
                  onClick={() =>
                    handleRadioItemClick(FilterFormNames.BEDROOMS, "studio")
                  }
                >
                  {translate("studio")}
                </Radio.Button>

                {Array.from({ length: 8 }).map((_, index) => (
                  <Radio.Button
                    className="custom-checkbox"
                    key={1 + index}
                    value={(1 + index).toString()}
                    style={{
                      margin: 3,
                      borderRadius: 6,
                      border: "1px solid #d9d9d9",
                    }}
                    onClick={() =>
                      handleRadioItemClick(FilterFormNames.BEDROOMS, 1 + index)
                    }
                  >
                    {1 + index}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={ROW.xs} lg={ROW.lg}>
            <Form.Item
              name={FilterFormNames.BATHROOMS}
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("bathrooms")}
                </CustomText>
              }
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group
                size="middle"
                optionType="button"
                buttonStyle="solid"
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <Radio.Button
                    className="custom-checkbox"
                    key={1 + index}
                    value={(1 + index).toString()}
                    style={{
                      margin: 3,
                      borderRadius: 6,
                      border: "1px solid #d9d9d9",
                    }}
                    onClick={() =>
                      handleRadioItemClick(FilterFormNames.BATHROOMS, 1 + index)
                    }
                  >
                    {1 + index}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={ROW.xs} lg={ROW.lg}>
            <Form.Item
              name={FilterFormNames.COMPLETION_STATUS}
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("completionStatus")}
                </CustomText>
              }
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Select
                size="middle"
                options={FilterConstants.COMPLETION_STATUS.map(
                  (option: { label: string; value: string }) => ({
                    label: option.label,
                    value: option.value,
                  }),
                )}
                placeholder={translate("completionStatus")}
                allowClear
                showSearch
              />
            </Form.Item>
          </Col>
          <Col xs={ROW.xs} lg={ROW.lg}>
            <Form.Item
              name={FilterFormNames.PROPERTY_SIZE}
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("propertySize")}
                </CustomText>
              }
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <InputNumber
                size="middle"
                min={0}
                style={{ width: "100%" }}
                placeholder={translate("propertySize")}
              />
            </Form.Item>
          </Col>
          <Col xs={ROW.xs} lg={ROW.lg}>
            <Form.Item
              name={FilterFormNames.PROPERTY_PRICE}
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("propertyPrice") + " (AED)"}
                </CustomText>
              }
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <InputNumber
                size="middle"
                min={0}
                style={{ width: "100%" }}
                placeholder={translate("propertyPrice")}
              />
            </Form.Item>
          </Col>

          <Col xs={24} style={{ marginBottom: 20, marginTop: 40 }}>
            <CustomTitle
              level={5}
              style={{
                backgroundColor: token.pinkLighter,
                width: "fit-content",
                padding: "4px 20px",
                borderRadius: 6,
              }}
            >
              {commonTranslate("locationInformation")}
            </CustomTitle>
          </Col>

          <Col xs={ROW.xs} lg={ROW.lg}>
            <Form.Item
              name={FilterFormNames.PROPERTY_LOCATION}
              label={
                <CustomText style={{ fontWeight: 500 }}>
                  {translate("propertyLocation")}
                </CustomText>
              }
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input
                placeholder={translate("propertyLocation")}
                size="middle"
              />
            </Form.Item>
          </Col>
          <Col xs={ROW.xs}>
            <Form.Item
              name={FilterFormNames.PROPERTY_LOCATION_COORDINATES}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              style={{ marginTop: 10 }}
            >
              <MapWithSearch
                onLocationSelect={(lat, lng) => {
                  form.setFieldsValue({
                    [FilterFormNames.PROPERTY_LOCATION_COORDINATES]: {
                      lat,
                      lng,
                    },
                  });
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={ROW.xs} style={{ marginBottom: 20, marginTop: 40 }}>
            <CustomTitle
              level={5}
              style={{
                backgroundColor: token.pinkLighter,
                width: "fit-content",
                padding: "4px 20px",
                borderRadius: 6,
              }}
            >
              {commonTranslate("propertyPhotos")}
            </CustomTitle>
          </Col>
          <Col xs={ROW.xs}>
            <Form.Item
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="images"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <PropertyUploader form={form} />
            </Form.Item>
          </Col>
          <Col xs={ROW.xs} style={{ margin: "20px 0" }}>
            <Form.Item style={{ width: "100%" }}>
              <Button
                block
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
              >
                {commonTranslate("add")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* Custom CSS for styled checkboxes */}
      <style jsx global>{`
        .custom-checkbox {
          background-color: ${token.pinkLight};
          border: 1px solid #d9d9d9;
          border-radius: 6px;
          text-align: center;
          user-select: none;
        }
        .bg-grey {
          background-color: ${token.greyLighter};
        }
        .custom-checkbox .ant-checkbox {
          width: 0 !important;
          height: 0 !important;
          visibility: hidden;
        }
        .custom-checkbox.ant-checkbox-wrapper-checked {
          background-color: ${token.colorPrimary};
          color: white;
          border-color: ${token.colorPrimary};
        }
        .custom-checkbox:hover {
          border-color: ${token.colorPrimary};
        }
        .ant-radio-button-wrapper::before {
          display: none !important; /* Remove the vertical divider */
        }
      `}</style>
    </>
  );
}
