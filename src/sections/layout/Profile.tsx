import { Avatar, Button, Dropdown, Flex, type MenuProps, theme } from "antd";
import { PROFILE_ITEMS } from "@/constants";
import { useTranslations } from "next-intl"; // Import useTranslations
import Image from "next/image";
import { CustomText } from "@/components";
import { PlusOutlined } from "@ant-design/icons";
const { useToken } = theme;

export function Profile() {
  const { token } = useToken();
  const translate = useTranslations("Layout.Header.Profile"); // Use the appropriate namespace

  // Recursive function to translate labels and render icons
  const translateAndRenderIcons = (
    items: NonNullable<MenuProps["items"]>,
  ): NonNullable<MenuProps["items"]> => {
    return items.map((item: any) => ({
      ...item,
      label: translate(item.label), // Translate the label
      icon: item.icon ? (
        <Image
          src={item.icon} // Use the icon path as the src
          width={16} // Set the width of the icon
          height={16} // Set the height of the icon
          alt={item.label} // Use the label as the alt text
        />
      ) : null, // If no icon, render null
      children: item.children
        ? translateAndRenderIcons(item.children)
        : undefined, // Recursively handle children
    }));
  };

  // Translate the labels and render icons for all items (including nested ones)
  const translatedItems = translateAndRenderIcons(PROFILE_ITEMS);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const menuProps: MenuProps = {
    items: translatedItems,
    onClick: handleMenuClick,
    forceSubMenuRender: true,
    style: { boxShadow: "none" },
  };

  return (
    <Dropdown
      overlayStyle={{
        background: "#ffffff",
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        borderRadius: 5,
      }}
      menu={menuProps}
      trigger={["click"]}
      // placement="bottomLeft"
      arrow
      dropdownRender={(menus) => (
        <div>
          {menus}

          <Flex
            wrap
            gap={8}
            justify="center"
            style={{
              margin: 10,
              padding: 10,
              backgroundColor: token.pinkLighter,
              borderRadius: 5,
            }}
          >
            <Image
              src="/images/icons/user-add.svg"
              alt="create account"
              width={20}
              height={20}
            />
            <CustomText>You don’t have an accounts</CustomText>
            <Button
              type="primary"
              icon={<PlusOutlined style={{ margin: 0, padding: 0 }} />}
              size="small"
              style={{ padding: 5, gap: 2 }}
            >
              <CustomText style={{ color: "white" }}>Account</CustomText>
            </Button>
          </Flex>
        </div>
      )}
    >
      <Avatar
        style={{
          verticalAlign: "middle",
          textAlign: "center",
          cursor: "pointer",
        }}
        size="default"
        gap={2}
      >
        K
      </Avatar>
    </Dropdown>
  );
}
