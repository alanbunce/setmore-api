import { Customer } from "../customers/types";

export type Appointment = {
  key: string;
  start_time: string; //ISO-8601 format
  end_time: string; //ISO-8601 format
  duration: number;
  staff_key: string;
  service_key: string;
  customer_key: string;
  cost: number;
  currency: string;
  comment?: string;
  label?: string;
};

export type AppointmentsData = {
  key: string;
  start_time: string;
  end_time: string;
  duration: number;
  staff_key: string;
  service_key: string;
  customer_key: string;
  customer: Customer;
  currency: string;
  cost: number;
  comment: string;
  label: string;
};

export type AppointmentAttributes = {
  staff_key: string;
  service_key: string;
  customer_key: string;
  start_time: string; //ISO-8601 format
  end_time: string; //ISO-8601 format
  comment?: string;
  label?: string;
};

export type AppointmentResponse = {
  response: boolean;
  msg: string;
  data: {
    appointment: Appointment;
  };
};

export type AppointmentsResponse = {
  response: boolean;
  msg: string;
  data: {
    cursor?: string;
    appointments: AppointmentsData[];
  };
};

export type PagedAppointments = {
  cursor?: string;
  appointments: AppointmentsData[];
};
