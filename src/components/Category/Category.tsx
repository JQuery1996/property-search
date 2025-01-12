import { Card, Flex, theme } from "antd";
import Image from "next/image";
import { CustomText, CustomTitle } from "@/components";
import { Link } from "@/i18n/routing";
import { TCategory } from "@/types";
const { useToken } = theme;

export function Category({ category }: { category: TCategory }) {
  const { token } = useToken();
  return (
    <Card
      hoverable
      styles={{ body: { padding: 20 } }}
      style={{
        borderRadius: "8px 8px 24px 24px",

        ...(category.styles?.bgColor && {
          backgroundColor: category.styles.bgColor,
        }), // Add backgroundColor if it exists
      }}
    >
      <Flex vertical gap={8}>
        <Image src={category.icon} width={30} height={30} priority alt="home" />
        <CustomTitle
          level={5}
          style={{
            fontWeight: "bold",
            ...(category.styles?.color && { color: category.styles.color }),
          }}
        >
          {category.title}
        </CustomTitle>
        <CustomText
          style={{
            ...(category.styles?.color && { color: category.styles.color }),
          }}
        >
          {category.description}
        </CustomText>
        <Link
          href={category.action}
          style={{
            color: category.styles?.color || token.colorPrimary,
            fontWeight: "bold",
          }}
        >
          check it
        </Link>
      </Flex>
    </Card>
  );
}
