"use client";
import { Button, Flex, Input, Badge } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "regenerator-runtime/runtime";
import { FilterModal } from "./FilterModal";
import { TFilterSettings } from "@/types";
import { flattenFilters } from "@/helpers";
import { PAGES } from "@/constants";

export function Filter({
  filterSettings,
}: {
  filterSettings: TFilterSettings;
}) {
  const translate = useTranslations("HomePage.Filter");
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query_text") || "",
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const pathname = usePathname();
  const isHolidayHomesPage = pathname.includes(PAGES.HOLIDAY_HOMES);

  // Set the default value of the search input to the "query_text" query parameter
  useEffect(() => {
    const query_text = searchParams.get("query_text") || "";
    setSearchValue(query_text);
  }, [searchParams]);

  // Handle search submission
  const handleSearch = async (value: string) => {
    setSearchLoading(true);
    // Step 1: Call the Engine API to fetch filters
    const response = await fetch(
      `/api/searchEngine?query_text=${encodeURIComponent(value.trim())}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // cache: "force-cache", // Cache the response indefinitely
      },
    );

    const engineFilters = await response.json();

    console.log({ engineFilters });

    // Step 2: Flatten the filters to remove null/undefined values
    const flattenedFilters = flattenFilters({
      query_text: value,
      ...engineFilters,
    });

    // Step 3: Create a new URLSearchParams object
    const newSearchParams = new URLSearchParams(flattenedFilters);

    // Step 4: Push the new URL with the flattened filters
    push(
      `${isHolidayHomesPage ? PAGES.HOLIDAY_HOMES : PAGES.PROPERTIES}?${newSearchParams.toString()}`,
    );

    setSearchLoading(false);
  };

  function handleFilterOpen() {
    setIsFilterModalOpen(true);
  }

  // Count the number of query parameters
  const countQueryParams = () => {
    const params = new URLSearchParams(searchParams);
    let count = 0;
    params.forEach((value, key) => {
      if (!["page", "per_page", "query_text"].includes(key)) {
        // Exclude 'page' parameter from the count
        count++;
      }
    });
    return count;
  };

  return (
    <>
      <Flex
        style={{
          padding: "20px",
          backgroundColor: "#E54F8E99",
          borderRadius: "12px",
          width: "90%",
          alignItems: "center",
        }}
        gap={12}
      >
        <Input.Search
          size="large"
          placeholder={translate("searchProperty")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          loading={searchLoading}
        />
        <Badge
          count={countQueryParams()}
          color="white"
          size="small"
          style={{ color: "black", fontWeight: "bold" }}
        >
          <Button
            type="text"
            style={{ width: "32px", height: "40px" }}
            icon={
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
                src="/images/icons/filter.svg"
                alt="filter icon"
              />
            }
            styles={{
              icon: { width: 32, height: 40 },
            }}
            onClick={handleFilterOpen}
          />
        </Badge>
      </Flex>

      {/* Modal for voice recognition */}
      <FilterModal
        isOpen={isFilterModalOpen}
        setIsOpen={setIsFilterModalOpen}
        filterSettings={filterSettings}
      />
    </>
  );
}
