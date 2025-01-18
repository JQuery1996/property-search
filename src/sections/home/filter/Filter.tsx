"use client";
import { Button, Flex, Input, theme, Modal, Badge } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FilterModal } from "./FilterModal";
import { TFilterSettings } from "@/types";
import { flattenFilters } from "@/helpers";
import { PAGES } from "@/constants";

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
    searchParams.get("city") || "",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Ensure Speech Recognition is supported
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("Speech recognition is not supported in this browser.");
    }
  }, [browserSupportsSpeechRecognition]);

  // Update searchValue only when the modal closes
  useEffect(() => {
    if (!listening && isModalOpen) {
      // Add a small delay before closing the modal to ensure the transcript is captured
      const timeoutId = setTimeout(() => {
        setSearchValue(transcript.trim()); // Update searchValue with the final transcript
        setIsModalOpen(false);
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [listening, isModalOpen, transcript]);

  // Set the default value of the search input to the "city" query parameter
  useEffect(() => {
    const city = searchParams.get("city") || "";
    setSearchValue(city);
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
      `/api/searchEngine?query_text=${encodeURIComponent(value)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "force-cache", // Cache the response indefinitely
      },
    );

    const engineFilters = await response.json();

    // Step 2: Flatten the filters to remove null/undefined values
    const flattenedFilters = flattenFilters(engineFilters);

    console.log({ engineFilters, flattenedFilters });
    // Step 3: Create a new URLSearchParams object
    const newSearchParams = new URLSearchParams(flattenedFilters);

    // Step 4: Push the new URL with the flattened filters
    push(`${PAGES.PROPERTIES}?${newSearchParams.toString()}`);

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
      if (!["page", "per_page"].includes(key)) {
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
        <div style={{ textAlign: "center", padding: "20px" }}>
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
            <span style={{ color: "#1890ff", fontSize: "48px" }}>🎤</span>
          </div>
          <p style={{ color: "#666", fontSize: "16px" }}>
            {listening ? "Listening..." : "Press the mic to start"}
          </p>
        </div>
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
