"use client";
import { Button, Flex, Input, theme, Modal, Badge } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FilterModal } from "./FilterModal";
import { TFilterSettings, TLOCALE } from "@/types";
import { flattenFilters, getFullLocale } from "@/helpers";
import { PAGES } from "@/constants";
import { CustomText } from "@/components";
import { useLocale } from "use-intl";

const { useToken } = theme;

export function Filter({
  filterSettings,
}: {
  filterSettings: TFilterSettings;
}) {
  const { token } = useToken();
  const translate = useTranslations("HomePage.Filter");
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query_text") || "",
  );
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const pathname = usePathname();
  const isHolidayHomesPage = pathname.includes(PAGES.HOLIDAY_HOMES);

  // Ensure Speech Recognition is supported
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("Speech recognition is not supported in this browser.");
    }
  }, [browserSupportsSpeechRecognition]);

  // Handle the transcript after the user finishes speaking
  useEffect(() => {
    if (!listening && isModalOpen) {
      // Add a small delay before closing the modal to ensure the transcript is captured
      const timeoutId = setTimeout(() => {
        setIsModalOpen(false);

        // Call handleSearch only if the transcript is not empty
        if (transcript.trim()) {
          handleSearch(transcript.trim());
        }
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [listening, isModalOpen, transcript]);

  // Set the default value of the search input to the "query_text" query parameter
  useEffect(() => {
    const query_text = searchParams.get("query_text") || "";
    setSearchValue(query_text);
  }, [searchParams]);

  // Start or stop recording
  const toggleRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsModalOpen(false);
    } else {
      resetTranscript(); // Clear previous transcript
      SpeechRecognition.startListening({
        continuous: false, // Stop listening after the user finishes speaking
        language: "en-US",
      });
      setIsModalOpen(true);
    }
  };

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
          backgroundColor: token.colorPrimary,
          borderRadius: "12px",
          width: "90%",
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
          onClick={toggleRecording}
        />
      </Flex>

      {/* Modal for voice recognition */}
      <Modal
        title="Speak now"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          SpeechRecognition.stopListening(); // Stop recording when the modal is closed
        }}
        footer={null} // No footer buttons
        centered
        width={400}
        style={{
          borderRadius: "16px",
          textAlign: "center",
          padding: "20px",
        }}
        closable={false} // Disable the close button (X)
      >
        <Flex vertical justify="center" align="center" gap={12}>
          {/* Pulsating mic icon */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              animation: listening ? "pulse 1.5s infinite" : "none",
            }}
          >
            <Image
              src="/images/icons/microphone.svg"
              width={48}
              height={48}
              alt="mic"
            />
          </div>
          <CustomText style={{ color: "#666", fontSize: "16px" }}>
            {listening ? "Listening..." : transcript}
          </CustomText>
          <CustomText type="secondary">
            {getFullLocale(locale as TLOCALE)}
          </CustomText>
        </Flex>
      </Modal>
      <FilterModal
        isOpen={isFilterModalOpen}
        setIsOpen={setIsFilterModalOpen}
        filterSettings={filterSettings}
      />

      {/* CSS for pulsating animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
