import { useTranslations } from "next-intl";
import { Button, Flex, Modal, Row, Radio, Form, Checkbox } from "antd";
import styles from "./styles.module.css";
import React, { useState } from "react";

const formNames = {
  formStyle: "property_style",
  propertyTypeCategory: "property_type_category",
  propertyType: "property_type",
};

export function Filter({ form, open, onOk, onCancel, onClearAll, props }) {
  const translate = useTranslations("HomePage.Filter");
  const [selectedPropertyCategory, setSelectedPropertyCategory] =
    useState(null);

  const propertiesStyles = [
    { label: translate("rent"), value: "rent" },
    { label: translate("buy"), value: "buy" },
  ];

  const propertyTypesCategories = [
    {
      label: translate("PropertyTypesCategories.commercial"),
      value: "commercial",
      types: [
        {
          label: translate("PropertyTypes.office"),
          value: "office",
        },
        {
          label: translate("PropertyTypes.shop"),
          value: "shop",
        },
        {
          label: translate("PropertyTypes.retail"),
          value: "retail",
        },
        {
          label: translate("PropertyTypes.businessCenter"),
          value: "businessCenter",
        },
        {
          label: translate("PropertyTypes.officeSpace"),
          value: "officeSpace",
        },
        {
          label: translate("PropertyTypes.warehouse"),
          value: "warehouse",
        },
        {
          label: translate("PropertyTypes.factor"),
          value: "factor",
        },
        {
          label: translate("PropertyTypes.laborCamp"),
          value: "laborCamp",
        },
        {
          label: translate("PropertyTypes.commercialVilla"),
          value: "commercialVilla",
        },
        {
          label: translate("PropertyTypes.showroom"),
          value: "showroom",
        },
        {
          label: translate("PropertyTypes.bulkSaleUnit"),
          value: "bulkSaleUnit",
        },
        {
          label: translate("PropertyTypes.bulkUnit"),
          value: "bulkUnit",
        },
      ],
    },
    {
      label: translate("PropertyTypesCategories.residential"),
      value: "residential",
      types: [
        {
          label: translate("PropertyTypes.apartment"),
          value: "apartment",
        },
        {
          label: translate("PropertyTypes.villa"),
          value: "villa",
        },
        {
          label: translate("PropertyTypes.townHouse"),
          value: "townHouse",
        },
        {
          label: translate("PropertyTypes.duplex"),
          value: "duplex",
        },
        {
          label: translate("PropertyTypes.penthouse"),
          value: "penthouse",
        },
        {
          label: translate("PropertyTypes.bungalow"),
          value: "bungalow",
        },
        {
          label: translate("PropertyTypes.residentialPlot"),
          value: "residentialPlot",
        },
        {
          label: translate("PropertyTypes.residentialBuilding"),
          value: "residentialBuilding",
        },
        {
          label: translate("PropertyTypes.compound"),
          value: "compound",
        },
      ],
    },
    {
      label: translate("PropertyTypesCategories.hospital"),
      value: "hospital",
      types: [
        {
          label: translate("PropertyTypes.hotelAndApartment"),
          value: "hotelAndApartment",
        },
        {
          label: translate("PropertyTypes.hotelApartment"),
          value: "hotelApartment",
        },
      ],
    },
    {
      label: translate("PropertyTypesCategories.land"),
      value: "land",
      types: [
        {
          label: translate("PropertyTypes.land"),
          value: "land",
        },
        {
          label: translate("PropertyTypes.farm"),
          value: "farm",
        },
      ],
    },
  ];

  const getItemValue = (name, formNewValue = null, asIs = false) => {
    const formValue = formNewValue ?? form.getFieldValue([name]);

    if (asIs) return formValue;

    let result = null;
    switch (name) {
      case formNames.propertyTypeCategory:
        result = propertyTypesCategories.find(
          (item) => item.value === formValue,
        );
        break;
      case formNames.propertyType:
        result = propertiesStyles.find((item) => item.value === formValue);
        break;
      default:
        result = formValue;
    }
    return result;
  };

  const handlePropertyTypeCategoryChanged = (e) => {
    const selectedItem = getItemValue(
      formNames.propertyTypeCategory,
      e.target.value,
    );
    setSelectedPropertyCategory(selectedItem);
    form.setFieldValue(formNames.propertyType, undefined);
  };

  return (
    <Modal
      open={open}
      title={translate("propertyFilter")}
      onOk={onOk}
      onCancel={onCancel}
      footer={
        // Render Footer
        <Row>
          <Button className={styles.applyBtn} onClick={onOk}>
            {translate("apply")}
          </Button>
          <Button
            className={styles.clearBtn}
            onClick={() => form.resetFields()}
          >
            {translate("clearAll")}
          </Button>
        </Row>
      }
      {...props}
    >
      <Form
        form={form}
        style={{ margin: "25px 0" }}
        // onFieldsChange={() => console.log({ values: form.getFieldsValue() })}
      >
        {/* 1- Rent / Buy Filters */}
        <Form.Item name={formNames.formStyle} style={{ margin: 0 }}>
          <Flex vertical gap="middle">
            <Radio.Group
              defaultValue="a"
              buttonStyle="solid"
              className={styles.propertyStyle}
            >
              {propertiesStyles &&
                propertiesStyles.map((item) => (
                  <Radio.Button
                    value={item.value}
                    className={styles.propertyStyleOption}
                  >
                    {item.label}
                  </Radio.Button>
                ))}
            </Radio.Group>
          </Flex>
        </Form.Item>

        {/* 2 - Property Type Category Filter*/}
        <Form.Item name={formNames.propertyTypeCategory} style={{ margin: 0 }}>
          {propertyTypesCategories?.length > 0 && (
            <div>
              <p className={styles.filterItemTitle}>
                {translate("propertyTypeCategory")}
              </p>
              <Radio.Group
                buttonStyle="solid"
                className={styles.propertyType}
                onChange={handlePropertyTypeCategoryChanged}
              >
                {propertyTypesCategories &&
                  propertyTypesCategories.map((item) => (
                    <>
                      <Radio.Button
                        value={item.value}
                        className={styles.propertyTypeOption}
                      >
                        {item.label}
                      </Radio.Button>
                    </>
                  ))}
              </Radio.Group>
            </div>
          )}
        </Form.Item>
        {/* 2 - Property Type Filter*/}
        <Form.Item name={formNames.propertyType}>
          {selectedPropertyCategory && (
            <div>
              <p className={styles.filterItemTitle}>
                {translate("propertyType")}
              </p>
              <Checkbox.Group
                buttonStyle="solid"
                className={styles.propertyType}
              >
                {selectedPropertyCategory?.types &&
                  selectedPropertyCategory?.types.map((item) => (
                    <>
                      <Checkbox
                        value={item.value}
                        className={styles.propertyTypeOption}
                      >
                        {item.label}
                      </Checkbox>
                    </>
                  ))}
              </Checkbox.Group>
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}
