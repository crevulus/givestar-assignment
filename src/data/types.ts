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
