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
      key: "country",
      label: translate("country"),
      icon: "/images/icons/city.svg",
      children: countries.map((country) => ({
        key: `country-${country.id}`,
        label: (country as any)[`name_${locale}`],
        icon: `/images/icons/${country.code.toLowerCase()}.svg`,
      })),
      order: 5,
    },
    {
      key: "measurement",
      label: translate("measurementSystem"),
      icon: "/images/icons/measurement.svg",
      children: measurements.map((measurement) => ({
        key: `measurement-${measurement.id}`,
        label: (measurement as any)[`name_${locale}`],
        icon: measurement.name_en.includes("Imperial")
          ? "/images/icons/imperial.svg"
          : "/images/icons/metric.svg",
      })),
      order: 6,
    },
    {
      key: "language",
      label: translate("language"),
      icon: "/images/icons/language.svg",
      disabled: isPending,
      children: [
        {
          key: "language-en",
          label: translate("english"),
          icon: "/images/icons/language.svg",
          disabled: isPending,
        },
        {
          key: "language-ar",
          label: translate("arabic"),
          icon: "/images/icons/language.svg",
          disabled: isPending,
        },
        {
          key: "language-ru",
          label: translate("russian"),
          icon: "/images/icons/language.svg",
          disabled: isPending,
        },
        {
          key: "language-ch",
          label: translate("chinese"),
          icon: "/images/icons/language.svg",
          disabled: isPending,
        },
      ],
      order: 7,
    },
  ];

  const authenticatedItems = [
    {
      key: "profile",
      label: translate("profile"),
      icon: "/images/icons/user-edit.svg",
      order: 1,
    },
    {
      key: "savedItems",
      label: translate("savedItems"),
      icon: "/images/icons/heart.svg",
      order: 4,
    },
    {
      key: "logout",
      label: translate("logout"),
      icon: "/images/icons/logout.svg",
      danger: true,
      order: 8,
    },
  ];

  const roledItems = [
    {
      key: "addNewProperty",
      label: translate("addNewProperty"),
      icon: "/images/icons/add-property.svg",
      order: 2,
    },
    {
      key: "myProperties",
      label: translate("myProperties"),
      icon: "/images/icons/my-property.svg",
      order: 3,
    },
  ];

  let profileItems = [...alwaysVisibleItems];
  if (isAuthenticated) {
    profileItems = [...profileItems, ...authenticatedItems] as any;
    if (user?.account_role !== "user")
      profileItems = [...profileItems, ...roledItems] as any;
  }

  profileItems = profileItems
    .sort((a, b) => a.order - b.order)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ order, ...rest }) => rest) as any;

  // Translate the labels and render icons for all items (including nested ones)
  const translatedItems = translateAndRenderIcons(profileItems);

  function handleGoRegister() {
    router.push(PAGES.REGISTER_CLIENT);
    setOpen(false);
  }
  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    const target = e.key.split("-")[0];
    switch (target) {
      case "profile":
        router.push(PAGES.PROFILE);
        break;
      case "myProperties":
        router.push(PAGES.MY_PROPERTIES);
      case "country":
        const country_id = e.key.split("-")[1];
        updateCountry({ id: parseInt(country_id) });
        if (isAuthenticated) updateProfile({ country_id });
        break;
      case "savedItems":
        router.push(PAGES.FAVORITE);
        break;
      case "measurement":
        const measurement_id = e.key.split("-")[1];
        updateMeasurement({ id: parseInt(measurement_id) });
        if (isAuthenticated) updateProfile({ measurement_id });
        break;
      case "language":
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
      case "logout":
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
      `country-${countryId ?? 1}`,
      `measurement-${measurementId ?? 1}`,
      `language-${locale}`,
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
                  <CustomText>{translate("dontHaveAccount")}</CustomText>
                  <Button
                    type="primary"
                    icon={<PlusOutlined style={{ margin: 0, padding: 0 }} />}
                    size="small"
                    style={{ padding: 5, gap: 2 }}
                    onClick={handleGoRegister}
                  >
                    <CustomText style={{ color: "white" }}>
                      {translate("account")}
                    </CustomText>
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
