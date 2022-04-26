import { APIClient } from "../api-client";
import { Appointment, AppointmentAttributes, AppointmentResponse, AppointmentsResponse, AppointmentsData, PagedAppointments } from "./types";

export class Appointments {
  private APIClient: APIClient;

  constructor(APIClient: APIClient) {
    this.APIClient = APIClient;
  }
  async createAppointment(attributes: AppointmentAttributes): Promise<Appointment> {
    try {
      const response = await this.APIClient.request<AppointmentResponse>("/bookingapi/appointment/create", { method: "POST", body: JSON.stringify(attributes) });
      if (response.response && response.msg == "Appointment created successfully") {
        return response.data.appointment;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async updateAppointmentLabel(appointmentKey: string, label: string): Promise<Appointment> {
    try {
      const response = await this.APIClient.request<AppointmentResponse>("/bookingapi/appointments/" + appointmentKey + "/label", { method: "POST", body: JSON.stringify({ label: label }) });
      if (response.response) {
        return response.data.appointment;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async getAppointments(startDate: string, endDate: string, staff_key?: string, customerDetails?: boolean): Promise<AppointmentsData[]> {
    var requestUrl = "/bookingapi/appointments?startDate=" + startDate + "&endDate=" + endDate;
    if (staff_key) requestUrl += "&staff_key=" + staff_key;
    if (customerDetails) requestUrl += "&customerDetails=" + customerDetails;
    console.log(requestUrl);
    try {
      const response = await this.APIClient.request<AppointmentsResponse>(requestUrl, { method: "GET" });
      if (response.response) {
        console.log(response.data);
        return response.data.appointments;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async getPagedAppointments(startDate: string, endDate: string, cursor?: string, staff_key?: string, customerDetails?: boolean): Promise<PagedAppointments> {
    var requestUrl = "/bookingapi/appointments?startDate=" + startDate + "&endDate=" + endDate;
    if (cursor) requestUrl += "&cursor=" + cursor;
    if (staff_key) requestUrl += "&staff_key=" + staff_key;
    if (customerDetails) requestUrl += "&customerDetails=" + customerDetails;
    try {
      const response = await this.APIClient.request<AppointmentsResponse>(requestUrl, { method: "GET" });
      if (response.response) {
        if (response.data.cursor) {
          return { cursor: response.data.cursor, appointments: response.data.appointments };
        }
        return { cursor: null, appointments: response.data.appointments };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
