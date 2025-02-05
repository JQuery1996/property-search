"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, COUNTRIES_LIST, MEASUREMENT_LIST } from "@/constants";

// Define the shape of the settings data
type TSettingsContext = {
  countries: { id: number; code: string; name_ar: string; name_en: string }[];
  measurements: { id: number; name_ar: string; name_en: string }[];
  loading: boolean;
  error: string | null;
};

// Create the context
const SettingsContext = createContext<TSettingsContext | null>(null);

// Custom hook to use the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<any[]>([]);
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesResponse, measurementsResponse] = await Promise.all([
          fetch(BASE_URL + COUNTRIES_LIST, {
            next: { revalidate: 86400 },
          })
            .then((res) => res.json())
            .then((res) => res.data),
          fetch(BASE_URL + MEASUREMENT_LIST, {
            next: { revalidate: 86400 },
          })
            .then((res) => res.json())
            .then((res) => res.data),
        ]);

        setCountries(countriesResponse);
        setMeasurements(measurementsResponse);
      } catch (err: any) {
        setError(err?.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SettingsContext.Provider
      value={{ countries, measurements, loading, error }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
