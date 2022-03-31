export type TimeslotsResponse = {
  response: boolean;
  data: string[];
};

export type TimeslotsAttributes = {
  staff_key: string;
  service_key: string;
  selected_date: string;
  off_hours?: boolean;
  double_booking?: boolean;
  slot_limit?: number;
  timezone?: string;
};
