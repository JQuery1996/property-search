export type TFilterSettings = {
  sources: string[];
  amenities: string[];
  property_types: { [key: string]: string[] };
  price_periods: string[];
};
