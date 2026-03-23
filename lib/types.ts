export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface City {
  name: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  images: string[];
}

export interface Country {
  name: string;
  iso: string; // ISO 3166-1 alpha-3
}

export interface TravelData {
  countries: Country[];
  cities: City[];
}

export interface ResumeEntry {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "work" | "education";
}
