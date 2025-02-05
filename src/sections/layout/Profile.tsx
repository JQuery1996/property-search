"use client";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  type MenuProps,
  Spin,
  theme,
} from "antd";
import { useTranslations } from "next-intl"; // Import useTranslations
import Image from "next/image";
import { CustomText } from "@/components";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth, useSettings } from "@/contexts";
import { useLocale } from "use-intl";
import { useResponsive } from "antd-style";
import { ALL_LOCALES } from "@/constants";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
const { useToken } = theme;

export function Profile() {
  const { token } = useToken();
  const { user, isAuthenticated } = useAuth();
  const { countries, measurements, loading } = useSettings();
  const locale = useLocale();
  const { mobile } = useResponsive();
  const translate = useTranslations("Layout.Header.Profile"); // Use the appropriate namespace
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  // Recursive function to translate labels and render icons
  const translateAndRenderIcons = (
    items: NonNullable<MenuProps["items"]>,
    renderIcon = true,
  ): NonNullable<MenuProps["items"]> => {
    return items.map((item: any) => ({
      ...item,
      icon:
        item.icon && renderIcon ? (
          <Image
            src={item.icon} // Use the icon path as the src
            width={20} // Set the width of the icon
            height={20} // Set the height of the icon
            alt={item.label} // Use the label as the alt text
          />
        ) : null, // If no icon, render null
      children: item.children
        ? translateAndRenderIcons(item.children, !mobile)
        : undefined, // Recursively handle children
    }));
  };

  const profileItems = [
    {
      key: "1",
      label: translate("profile"),
      icon: "/images/icons/user-edit.svg",
    },
    {
      key: "2",
      label: translate("country"),
      icon: "/images/icons/city.svg",
      children: countries.map((country) => ({
        key: `5-${country.id}`,
        label: (country as any)[`name_${locale}`],
        icon: `/images/icons/${country.code.toLowerCase()}.svg`,
      })),
    },
    {
      key: "3",
      label: translate("notificationSettings"),
      icon: "/images/icons/notification.svg",
    },
    {
      key: "4",
      label: translate("savedItems"),
      icon: "/images/icons/save-item.svg",
    },
    {
      key: "5",
      label: translate("measurementSystem"),
      icon: "/images/icons/measurement.svg",
      children: measurements.map((measurement) => ({
        key: `5-${measurement.id}`,
        label: (measurement as any)[`name_${locale}`],
        icon: measurement.name_en.includes("Imperial")
          ? "/images/icons/imperial.svg"
          : "/images/icons/metric.svg",
      })),
    },
    {
      key: "6",
      label: translate("language"),
      icon: "/images/icons/language.svg",
      disabled: isPending,
      children: [
        {
          key: "6-en",
          label: translate("english"),
          icon: "/images/icons/language.svg",
          disabled: isPending,
        },
        {
          key: "6-ar",
          label: translate("arabic"),
          icon: "/images/icons/language.svg",
          disabled: isPending,
        },
        {
          key: "6-ru",
          label: translate("russian"),
          icon: "/images/icons/language.svg",
          disabled: isPending,
        },
        {
          key: "6-ch",
          label: translate("chinese"),
          icon: "/images/icons/language.svg",
          disabled: isPending,
        },
      ],
    },
  ];
  // Add the logout option only if the user exists
  if (isAuthenticated) {
    profileItems.push({
      key: "7",
      label: translate("logout"),
      icon: "/images/icons/logout.svg",
      danger: true,
    } as any);
  }
  // Translate the labels and render icons for all items (including nested ones)
  const translatedItems = translateAndRenderIcons(profileItems);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key[0]) {
      case "1":
        console.log("from one");
        break;
      case "6":
        const language = e.key.split("-")[1];
        startTransition(() => {
          router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale: language },
          );
        });
        break;
      default:
        console.log("from default");
    }
  };

  const menuProps: MenuProps = {
    items: translatedItems,
    onClick: handleMenuClick,
    forceSubMenuRender: true,
    style: { boxShadow: "none" },
    defaultSelectedKeys: [`5-${user?.measurement?.id ?? 1}`, `6-${locale}`],
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
      placement="bottomLeft"
      arrow
      dropdownRender={(menus) =>
        loading ? (
          <Spin />
        ) : (
          <div>
            {menus}
            {!isAuthenticated && (
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
            )}
          </div>
        )
      }
    >
      {user?.name ? (
        <Avatar
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: token.colorPrimary,
            color: "white",
          }}
          size="default"
          gap={2}
        >
          {user.name[0].toUpperCase()}
        </Avatar>
      ) : (
        <Avatar
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: token.colorPrimary,
            color: "white",
          }}
          size="default"
          gap={2}
          icon={<UserOutlined />}
        />
      )}
    </Dropdown>
  );
}
