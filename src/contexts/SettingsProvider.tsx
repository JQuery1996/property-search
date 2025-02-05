"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, COUNTRIES_LIST, MEASUREMENT_LIST } from "@/constants";

// Define the shape of the settings data
type TCountry = { id: number; code: string; name_ar: string; name_en: string };
type TMeasurement = { id: number; name_ar: string; name_en: string };

type TSettingsContext = {
  countries: TCountry[];
  measurements: TMeasurement[];
  countryId: number | null;
  measurementId: number | null;
  updateCountry: ({ id }: { id: number }) => void;
  updateMeasurement: ({ id }: { id: number }) => void;
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
  const [countries, setCountries] = useState<TCountry[]>([]);
  const [measurements, setMeasurements] = useState<TMeasurement[]>([]);
  const [measurementId, setMeasurementId] = useState<number | null>(null);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function updateCountry({
    id,
    _countries,
  }: {
    id: number | null;
    _countries?: TCountry[];
  }) {
    if (!id) {
      const stored = localStorage.getItem("countryId");
      if (stored && _countries?.some((c) => c.id.toString() === stored)) {
        setCountryId(parseInt(stored));
      } else {
        const value = _countries?.[0]?.id;
        if (value) {
          setCountryId(value!);
          localStorage.setItem("countryId", value.toString());
        }
      }
    } else {
      setCountryId(id);
      localStorage.setItem("countryId", id.toString());
    }
  }

  function updateMeasurement({
    id,
    _measurements,
  }: {
    id: number | null;
    _measurements?: TMeasurement[];
  }) {
    if (!id) {
      const stored = localStorage.getItem("measurementId");
      if (stored && _measurements?.some((m) => m.id.toString() === stored)) {
        setMeasurementId(parseInt(stored));
      } else {
        const value = _measurements?.[0]?.id;
        if (value) {
          setMeasurementId(value);
          localStorage.setItem("measurementId", value.toString());
        }
      }
    } else {
      setMeasurementId(id);
      localStorage.setItem("measurementId", id.toString());
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesResponse, measurementsResponse] = await Promise.all([
          fetch(BASE_URL + COUNTRIES_LIST, {
            next: { revalidate: 86400 },
          })
            .then((res) => res.json())
            .then((res) => res.data as TCountry[]),
          fetch(BASE_URL + MEASUREMENT_LIST, {
            next: { revalidate: 86400 },
          })
            .then((res) => res.json())
            .then((res) => res.data as TMeasurement[]),
        ]);

        setCountries(countriesResponse);
        updateCountry({ id: null, _countries: countriesResponse });
        setMeasurements(measurementsResponse);
        updateMeasurement({ id: null, _measurements: measurementsResponse });
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
      value={{
        countries,
        measurements,
        loading,
        error,
        measurementId,
        countryId,
        updateMeasurement,
        updateCountry,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
