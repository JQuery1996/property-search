import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Button,
  Flex,
  Form,
  Modal,
  Checkbox,
  Radio,
  theme,
  Select,
  Divider,
  Slider,
  Row,
  Col,
  InputNumber,
  Input,
} from "antd";
import { CustomText, CustomTitle } from "@/components";
import { TFilterSettings } from "@/types";
import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { FilterConstants, FilterFormNames, PAGES } from "@/constants";
import { useTranslations } from "next-intl";
import { TFilterParams } from "@/types/TFilterParams";
import { flattenFilters } from "@/helpers";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
const { useToken } = theme;

type TFilterModal = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  filterSettings: TFilterSettings;
};

export function FilterModal({
  isOpen,
  setIsOpen,
  filterSettings,
}: TFilterModal) {
  const { token } = useToken();
  const [form] = Form.useForm();
  const translate = useTranslations("Form");
  const { push } = useRouter();
  const searchParams = useSearchParams();
  // Function to initialize form values from query parameters
  const initializeFormValues = () => {
    const initialValues: any = {};

    // Add values only if they exist in the query parameters
    if (searchParams.has(FilterFormNames.PROPERTY_PURPOSE)) {
      initialValues.type = searchParams.get(FilterFormNames.PROPERTY_PURPOSE);
    }

    if (
      searchParams.has(FilterFormNames.MIN_YEARLY_PRICE) ||
      searchParams.has(FilterFormNames.MAX_YEARLY_PRICE)
    ) {
      initialValues.price_range = [
        parseInt(searchParams.get(FilterFormNames.MIN_YEARLY_PRICE) || "0", 10),
        parseInt(
          searchParams.get(FilterFormNames.MAX_YEARLY_PRICE) || "1000000",
          10,
        ),
      ];
    }

    if (searchParams.has(FilterFormNames.PROPERTY_TYPE)) {
      // Parse comma-separated values
      const propertyTypeParam = searchParams.get(FilterFormNames.PROPERTY_TYPE);
      initialValues.property_type = propertyTypeParam
        ? propertyTypeParam.split(",")
        : [];
    }

    if (searchParams.has(FilterFormNames.PROPERTY_TYPE_CATEGORY)) {
      initialValues.property_type_category = searchParams.get(
        FilterFormNames.PROPERTY_TYPE_CATEGORY,
      );
    }

    if (searchParams.has(FilterFormNames.PRICE_PERIOD)) {
      // Parse comma-separated values
      const pricePeriodParam = searchParams.get(FilterFormNames.PRICE_PERIOD);
      initialValues.price_period = pricePeriodParam
        ? pricePeriodParam.split(",")
        : [];
    }

    if (searchParams.has(FilterFormNames.AMENITIES)) {
      // Parse comma-separated values
      const amenitiesParam = searchParams.get(FilterFormNames.AMENITIES);
      initialValues.amenities = amenitiesParam ? amenitiesParam.split(",") : [];
    }

    if (searchParams.has(FilterFormNames.COMPLETION_STATUS)) {
      // Parse comma-separated values
      const completionStatusParam = searchParams.get(
        FilterFormNames.COMPLETION_STATUS,
      );
      initialValues.completion_status = completionStatusParam
        ? completionStatusParam.split(",")
        : [];
    }

    if (searchParams.has(FilterFormNames.BEDROOMS)) {
      initialValues.bedrooms = searchParams.get(FilterFormNames.BEDROOMS);
    }

    if (searchParams.has(FilterFormNames.BATHROOMS)) {
      initialValues.bathrooms = searchParams.get(FilterFormNames.BATHROOMS);
    }

    if (searchParams.has(FilterFormNames.MIN_SIZE)) {
      initialValues.min_size = parseInt(
        searchParams.get(FilterFormNames.MIN_SIZE) || "0",
        10,
      );
    }

    if (searchParams.has(FilterFormNames.MAX_SIZE)) {
      initialValues.max_size = parseInt(
        searchParams.get(FilterFormNames.MAX_SIZE) || "10000",
        10,
      );
    }

    if (searchParams.has(FilterFormNames.SOURCE)) {
      initialValues.source = searchParams.get(FilterFormNames.SOURCE);
    }

    if (searchParams.has(FilterFormNames.CITY)) {
      initialValues.city = searchParams.get(FilterFormNames.CITY);
    }

    form.setFieldsValue(initialValues);
  };
  useEffect(() => {
    if (isOpen) {
      initializeFormValues();
    }
  }, [isOpen, searchParams]);

  function handleCancel() {
    setIsOpen(false);
  }

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
  function onReset() {
    form.resetFields();
  }
  function onFinish(
    values: { price_range: string[] | number[] } & TFilterParams,
  ) {
    // Destructure the values object
    const { price_range, ...rest } = values;

    // Convert price_range to min_yearly_price and max_yearly_price
    const [min_yearly_price, max_yearly_price] = price_range;

    // Create a new object with the transformed price range
    const transformedValues = {
      ...rest,
      ...(min_yearly_price !== 0 || max_yearly_price !== 1_000_000
        ? { min_yearly_price, max_yearly_price }
        : {}),
    };

    // Use the flattenFilters method to flatten the object
    const flattenedFilters = flattenFilters(transformedValues);
    // Convert the flattened filters to a query string
    const queryString = new URLSearchParams(flattenedFilters).toString();

    push(`${PAGES.PROPERTIES}?${queryString}`);
    handleCancel();
  }
  return (
    <Modal
      centered
      open={isOpen}
      onCancel={handleCancel}
      title={
        <Flex gap={8} justify="space-between" align="center">
          <CustomTitle level={4} style={{ fontWeight: "bold" }}>
            {translate("propertyFilter")}
          </CustomTitle>
          <Button
            shape="circle"
            size="small"
            style={{
              background: "transparent",
              border: "none",
              color: token.colorPrimary,
            }}
            onClick={handleCancel}
            icon={<CloseOutlined />}
          />
        </Flex>
      }
      closeIcon={false}
      width={700}
      footer={false}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        name="filterForm"
        style={{ margin: "25px 0" }}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        {/* Single-select radio button group */}
        <Form.Item name={FilterFormNames.PROPERTY_PURPOSE}>
          <Radio.Group
            block
            optionType="button"
            buttonStyle="solid"
            size="large"
          >
            {FilterConstants.PROPERTY_PURPOSES.map((option) => (
              <Radio.Button
                key={option.value}
                value={option.value}
                style={{
                  margin: "0 5px",
                  borderRadius: 20,
                  border: "1px solid #d9d9d9",
                }}
              >
                {translate(option.label)}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        {/* Property type single-select radio button */}
        <Form.Item
          name={FilterFormNames.PROPERTY_TYPE_CATEGORY}
          label={
            <CustomText style={{ fontWeight: 500 }}>
              {translate("propertyTypeCategory")}
            </CustomText>
          }
        >
          <Radio.Group
            size="middle"
            optionType="button"
            buttonStyle="solid"
            onChange={handlePropertyTypeCategoryChange}
          >
            {Object.keys(filterSettings.property_types).map(
              (option: string) => (
                <Radio.Button
                  key={option}
                  value={option}
                  style={{
                    margin: 3,
                    borderRadius: 20,
                    border: "1px solid #d9d9d9",
                  }}
                  onClick={() =>
                    handleRadioItemClick(
                      FilterFormNames.PROPERTY_TYPE_CATEGORY,
                      option,
                    )
                  }
                >
                  {option}
                </Radio.Button>
              ),
            )}
          </Radio.Group>
        </Form.Item>

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
              <Form.Item
                name="property_type"
                label={
                  <CustomText style={{ fontWeight: 500 }}>
                    {translate("propertyType")}
                  </CustomText>
                }
              >
                <Checkbox.Group style={{ columnGap: 4 }}>
                  {(
                    filterSettings.property_types?.[
                      getFieldValue(FilterFormNames.PROPERTY_TYPE_CATEGORY)
                    ] || []
                  ).map((option: string) => (
                    <Checkbox
                      key={option}
                      value={option}
                      style={{
                        margin: 3,
                        borderRadius: 20,
                        border: "1px solid #d9d9d9",
                        padding: "4px 8px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                      }}
                      className="custom-checkbox"
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            ) : null
          }
        </Form.Item>
        {/* Multiple-select styled checkbox group */}

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => {
            return prevValues.type !== currentValues.type;
          }}
        >
          {({ getFieldValue }) =>
            getFieldValue(FilterFormNames.PROPERTY_PURPOSE) ===
            FilterConstants.PROPERTY_PURPOSES[0].value ? (
              <Form.Item
                name={FilterFormNames.PRICE_PERIOD}
                label={
                  <CustomText style={{ fontWeight: 500 }}>
                    {translate("pricePeriod")}
                  </CustomText>
                }
              >
                <Checkbox.Group style={{ columnGap: 4 }}>
                  {filterSettings.price_periods.map((option: string) => (
                    <Checkbox
                      key={option}
                      value={option}
                      style={{
                        margin: 3,
                        borderRadius: 20,
                        border: "1px solid #d9d9d9",
                        padding: "4px 8px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                      }}
                      className="custom-checkbox"
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            ) : null
          }
        </Form.Item>
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
        <Form.Item
          name={FilterFormNames.PRICE_RANGE}
          label={
            <CustomText style={{ fontWeight: 500 }}>
              {translate("priceRange")}
            </CustomText>
          }
        >
          <Slider range min={0} max={1_000_000} />
        </Form.Item>

        {/* Multiple-select styled checkbox group */}
        <Form.Item
          name={FilterFormNames.COMPLETION_STATUS}
          label={
            <CustomText style={{ fontWeight: 500 }}>
              {translate("completionStatus")}
            </CustomText>
          }
        >
          <Checkbox.Group style={{ columnGap: 4 }}>
            {FilterConstants.COMPLETION_STATUS.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                style={{
                  margin: 3,
                  borderRadius: 20,
                  border: "1px solid #d9d9d9",
                  padding: "4px 8px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                }}
                className="custom-checkbox"
              >
                {translate(option.label)}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name={FilterFormNames.BEDROOMS}
          label={
            <CustomText style={{ fontWeight: 500 }}>
              {translate("bedrooms")}
            </CustomText>
          }
        >
          <Radio.Group size="middle" optionType="button" buttonStyle="solid">
            <Radio.Button
              key="studio"
              value="studio"
              style={{
                margin: 3,
                borderRadius: 20,
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
                key={1 + index}
                value={(1 + index).toString()}
                style={{
                  margin: 3,
                  borderRadius: 20,
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
        <Form.Item
          name={FilterFormNames.BATHROOMS}
          label={
            <CustomText style={{ fontWeight: 500 }}>
              {translate("bathrooms")}
            </CustomText>
          }
        >
          <Radio.Group size="middle" optionType="button" buttonStyle="solid">
            {Array.from({ length: 8 }).map((_, index) => (
              <Radio.Button
                key={1 + index}
                value={(1 + index).toString()}
                style={{
                  margin: 3,
                  borderRadius: 20,
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
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <CustomText style={{ fontWeight: 500 }}>
              {translate("propertySize")}
            </CustomText>
          </Col>
          <Col xs={12}>
            <Form.Item name={FilterFormNames.MIN_SIZE}>
              <InputNumber
                size="middle"
                min={0}
                max={10000}
                style={{ width: "100%" }}
                placeholder={translate("minSize")}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name={FilterFormNames.MAX_SIZE}>
              <InputNumber
                size="middle"
                min={0}
                max={10000}
                style={{ width: "100%" }}
                placeholder={translate("maxSize")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name={FilterFormNames.SOURCE}
          label={
            <CustomText style={{ fontWeight: 500 }}>
              {translate("source")}
            </CustomText>
          }
        >
          <Select
            size="middle"
            options={["any", ...filterSettings.sources].map(
              (option: string) => ({
                label: option,
                value: option,
              }),
            )}
            maxTagCount="responsive"
            placeholder="source"
            allowClear
            showSearch
          />
        </Form.Item>
        <Form.Item
          name={FilterFormNames.CITY}
          label={
            <CustomText style={{ fontWeight: 500 }}>
              {translate("address")}
            </CustomText>
          }
        >
          <Input
            placeholder={translate("address")}
            suffix={
              <Image
                src="/images/icons/address.svg"
                width={25}
                height={25}
                alt="address"
              />
            }
          />
        </Form.Item>
        <Form.Item>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Button type="primary" htmlType="submit" size="large" block>
                {translate("apply")}
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <Button
                variant="outlined"
                htmlType="button"
                size="large"
                style={{ background: "transparent", color: "black" }}
                block
                onClick={onReset}
              >
                {translate("clearAll")}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      {/* Custom CSS for styled checkboxes */}
      <style jsx global>{`
        .custom-checkbox {
          background-color: white;
          border: 1px solid #d9d9d9;
          border-radius: 20px;
          text-align: center;
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
    </Modal>
  );
}
