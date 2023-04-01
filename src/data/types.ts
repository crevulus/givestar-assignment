export type ForceType = {
  name: string;
  id: string;
};

type EngagementMethodsType = {
  description: string | null;
  title: string;
  type: string;
  url: string;
};

export type ForceDetailsType = {
  description: string | null;
  engagement_methods: EngagementMethodsType[];
  id: string;
  name: string;
  telephone: string;
  url: string;
};

type ContactDetailsType = {
  [key: string]: string;
};

export type PersonnelType = {
  bio: string;
  contact_details: ContactDetailsType;
  name: string;
  rank: string;
};

export type NeighbourhoodType = {
  id: string;
  name: string;
};

type LinkType = {
  url: string;
  description: any;
  title: string;
};

type CentreType = {
  latitude: string;
  longitude: string;
};

type LocationType = {
  name: string;
  longitude: any;
  postcode: string;
  address: string;
  latitude: any;
  type: string;
  description: any;
};

export type NeighbourhoodDetailsType = {
  url_force: string;
  contact_details: ContactDetailsType;
  name: string;
  links: LinkType[];
  centre: CentreType;
  locations: LocationType[];
  description: string;
  id: string;
  population: string;
};
