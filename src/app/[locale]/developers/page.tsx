import { DeveloperBanner, DevelopersServer, SearchInput } from "@/sections";
import { Flex } from "antd";
import { CustomTitle, DevelopersSkeleton } from "@/components";
import { Suspense } from "react";
import { ISearchParams } from "@/types";
import { useTranslations } from "next-intl";

export default function Developers({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const translate = useTranslations("developers");
  return (
    <>
      <DeveloperBanner />
      <Flex vertical gap={16} style={{ padding: 48 }}>
        <Flex
          justify="space-between"
          align="center"
          wrap
          style={{ rowGap: 16 }}
        >
          <SearchInput />
          <CustomTitle level={2}>
            {translate("projectsUnderDevelopment")}
          </CustomTitle>
        </Flex>
        <Suspense key={Math.random()} fallback={<DevelopersSkeleton />}>
          <DevelopersServer searchParams={searchParams} />
        </Suspense>
      </Flex>
    </>
  );
}
