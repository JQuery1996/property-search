"use client"; // Ensure this is a client-side component
import { Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { SearchProps } from "antd/es/input"; // Updated imports

export function SearchInput({ ...props }: SearchProps) {
  const translate = useTranslations("Common");
  const router = useRouter(); // Next.js router
  const searchParams = useSearchParams(); // Access query parameters
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search when pressing "Enter"
  const handleSearch = () => {
    // Create a new URLSearchParams object from the current query parameters
    const params = new URLSearchParams();

    // Update the `search_key` query parameter
    params.set("search_key", searchQuery.trim());

    // Navigate to the updated URL
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Sync the input value with the query parameter on component mount
  useEffect(() => {
    const searchKey = searchParams.get("search_key");
    if (searchKey) {
      setSearchQuery(searchKey);
    }
  }, [searchParams]);

  return (
    <Input.Search
      placeholder={translate("search")}
      value={searchQuery}
      onChange={handleInputChange}
      onSearch={handleSearch}
      allowClear // Adds a clear button
      size="large"
      {...props}
    />
  );
}
