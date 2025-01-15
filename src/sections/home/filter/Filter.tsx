"use client";
import { Button, Flex, Input, theme } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const { useToken } = theme;

export function Filter() {
  const { token } = useToken();
  const translate = useTranslations("HomePage.Filter");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  // Handler for search
  const handleSearch = () => {
    // Create a new URLSearchParams object from the current search params
    const newSearchParams = new URLSearchParams(searchParams);

    // Update the "city" parameter with the new search value
    newSearchParams.set("city", encodeURIComponent(searchValue.trim()));

    // Reset the "page" parameter to 1
    newSearchParams.delete("page");

    // Navigate to the new URL with updated search params
    router.push(`/properties?${newSearchParams.toString()}`);
  };

  // Set the default value of the search input to the "city" query parameter
  useEffect(() => {
    const city = searchParams.get("city") || ""; // Get the "city" parameter from the URL
    setSearchValue(city); // Set the search input value
  }, [searchParams]); // Re-run when searchParams change

  return (
    <Flex
      style={{
        padding: "20px",
        backgroundColor: token.colorPrimary,
        borderRadius: "12px",
        width: "90%",
      }}
      gap={12}
    >
      <Input
        size="large"
        placeholder={translate("searchProperty")}
        suffix={
          <SearchOutlined
            style={{ cursor: "pointer" }}
            onClick={handleSearch}
          />
        }
        value={searchValue} // Bind the input value to state
        onChange={(e) => setSearchValue(e.target.value)} // Update state on change
        onPressEnter={handleSearch} // Trigger search on Enter key press
      />
      <Button
        type="text"
        style={{ width: "32px", height: "40px" }}
        icon={<Image fill src="/images/icons/filter.svg" alt="filter icon" />}
      />
      <Button
        type="text"
        style={{ width: "32px", height: "40px" }}
        icon={
          <Image
            src="/images/icons/mic.svg"
            alt="mic icon"
            width={28}
            height={23}
          />
        }
      />
    </Flex>
  );
}
