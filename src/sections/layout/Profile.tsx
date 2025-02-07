"use client";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  type MenuProps,
  Modal,
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
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { PAGES } from "@/constants";
const { useToken } = theme;

export function Profile() {
  const { token } = useToken();
  const { user, isAuthenticated, updateProfile, authLoading, logout } =
    useAuth();
  const {
    countries,
    measurements,
    loading,
    countryId,
    measurementId,
    updateMeasurement,
    updateCountry,
  } = useSettings();
  const locale = useLocale();
  const { mobile } = useResponsive();
  const translate = useTranslations("Common"); // Use the appropriate namespace
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
  const alwaysVisibleItems = [
    {
      key: "2",
      label: translate("country"),
      icon: "/images/icons/city.svg",
      children: countries.map((country) => ({
        key: `2-${country.id}`,
        label: (country as any)[`name_${locale}`],
        icon: `/images/icons/${country.code.toLowerCase()}.svg`,
      })),
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
          key: "6-cn",
          label: translate("chinese"),
          icon: "/images/icons/language.svg",
          disabled: isPending,
        },
      ],
    },
  ];

  const authenticatedItems = [
    {
      key: "1",
      label: translate("profile"),
      icon: "/images/icons/user-edit.svg",
    },
    {
      key: "4",
      label: translate("savedItems"),
      icon: "/images/icons/heart.svg",
    },
    {
      key: "7",
      label: translate("logout"),
      icon: "/images/icons/logout.svg",
      danger: true,
    },
  ];
  const profileItems = (
    isAuthenticated
      ? alwaysVisibleItems.concat(authenticatedItems as any) // Combine arrays if authenticated
      : alwaysVisibleItems
  ) // Otherwise, use only alwaysVisibleItems
    .sort((a, b) => a.key.localeCompare(b.key)); // Sort by key

  // Translate the labels and render icons for all items (including nested ones)
  const translatedItems = translateAndRenderIcons(profileItems);

  function handleGoRegister() {
    router.push(PAGES.REGISTER_CLIENT);
    setOpen(false);
  }
  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    switch (e.key[0]) {
      case "1":
        router.push(PAGES.PROFILE);
        break;
      case "2":
        const country_id = e.key.split("-")[1];
        updateCountry({ id: parseInt(country_id) });
        if (isAuthenticated) updateProfile({ country_id });
        break;
      case "4":
        router.push(PAGES.FAVORITE);
        break;
      case "5":
        const measurement_id = e.key.split("-")[1];
        updateMeasurement({ id: parseInt(measurement_id) });
        if (isAuthenticated) updateProfile({ measurement_id });
        break;
      case "6":
        const language = e.key.split("-")[1];
        if (isAuthenticated) updateProfile({ language });
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
      case "7":
        setIsLogoutModalOpen(true); // Show the logout confirmation modal
        break;
      default:
    }
  };

  const menuProps: MenuProps = {
    items: translatedItems,
    onClick: handleMenuClick,
    forceSubMenuRender: true,
    style: { boxShadow: "none" },
    selectedKeys: [
      `2-${countryId ?? 1}`,
      `5-${measurementId ?? 1}`,
      `6-${locale}`,
    ],
  };

  return (
    <>
      <Dropdown
        open={open}
        onOpenChange={(_open) => setOpen(_open)}
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
          authLoading || loading ? (
            <div
              style={{
                minHeight: 232,
                minWidth: 204,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Spin />
            </div>
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
                    onClick={handleGoRegister}
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
      <Modal
        title={translate("confirmLogout")}
        open={isLogoutModalOpen}
        onOk={() => {
          logout(); // Call the logout function
          setIsLogoutModalOpen(false); // Close the modal
        }}
        onCancel={() => setIsLogoutModalOpen(false)} // Close the modal without logging out
        okText={translate("logout")}
        cancelText={translate("cancel")}
      >
        <p>{translate("logoutMessage")}</p>
      </Modal>
    </>
  );
}
