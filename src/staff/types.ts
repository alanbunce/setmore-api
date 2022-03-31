export type StaffMember = {
  key: string;
  company_key: string;
  contact_type: string;
  first_name: string;
  last_name: string;
  email_id: string;
  country_code?: string;
  work_phone?: string;
  image_url?: string;
  comment?: string;
};

export type StaffResponse = {
  response: boolean;
  data: {
    cursor: string;
    staffs: StaffMember[];
  };
};
