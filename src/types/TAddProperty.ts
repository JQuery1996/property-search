export type TAddProperty = {
  title: string;
  description: string;
  location: string;
  price_value: number;
  price_period: string;
  property_type: string;
  property_purpose: string;
  completion_status: string;
  bedrooms: string;
  bathrooms: string;
  size_value: number;
  latitude: number;
  longitude: number;
  amenities: string[];
  images: any[];
  location_coordinates: { lat: number; lng: number };
};
