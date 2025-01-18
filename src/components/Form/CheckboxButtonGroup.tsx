import { Button, Checkbox, theme } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";

const { useToken } = theme;

type CheckboxButtonGroupProps = Omit<CheckboxGroupProps, "options"> & {
  options: { label: string; value: string }[];
};

export const CheckboxButtonGroup = ({
  options,
  ...props
}: CheckboxButtonGroupProps) => {
  const { token } = useToken();

  return (
    <Checkbox.Group
      {...props}
      style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
    >
      {options.map((option) => (
        <Checkbox
          key={option.value}
          value={option.value}
          className="custom-checkbox-button"
        >
          <Button
            style={{
              margin: 0,
              borderRadius: 20,
              border: "1px solid #d9d9d9",
              padding: "8px 16px",
              backgroundColor: props.value?.includes(option.value)
                ? token.colorPrimary
                : "#fff",
              color: props.value?.includes(option.value)
                ? "#fff"
                : token.colorText,
            }}
          >
            {option.label}
          </Button>
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};
