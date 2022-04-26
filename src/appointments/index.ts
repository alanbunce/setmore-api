import { APIClient } from "../api-client";
import { Appointment, AppointmentAttributes, AppointmentResponse, AppointmentsResponse, AppointmentsData, PagedAppointments } from "./types";
import { queryStringify } from "../utils/queryStringify";

export class Appointments {
  private APIClient: APIClient;

  constructor(APIClient: APIClient) {
    this.APIClient = APIClient;
  }
  async createAppointment(attributes: AppointmentAttributes): Promise<Appointment> {
    try {
      const response = await this.APIClient.request<AppointmentResponse>("/bookingapi/appointment/create", { method: "POST", body: JSON.stringify(attributes) });
      return response.response ? response.data.appointment : null;
    } catch (error) {
      throw error;
    }
  }
  async updateAppointmentLabel(appointmentKey: string, label: string): Promise<Appointment> {
    try {
      const response = await this.APIClient.request<AppointmentResponse>("/bookingapi/appointments/" + appointmentKey + "/label", { method: "POST", body: JSON.stringify({ label: label }) });
      return response.response ? response.data.appointment : null;
    } catch (error) {
      throw error;
    }
  }
  async getAppointments(startDate: string, endDate: string, staff_key?: string, customerDetails?: boolean): Promise<AppointmentsData[]> {
    const qs = queryStringify({
      startDate: startDate,
      endDate: endDate,
      staff_key: staff_key,
      customerDetails: customerDetails,
    });
    const requestUrl = "/bookingapi/appointments?" + qs;
    try {
      const response = await this.APIClient.request<AppointmentsResponse>(requestUrl, { method: "GET" });
      return response.response ? response.data.appointments : null;
    } catch (error) {
      throw error;
    }
  }
  async getPagedAppointments(startDate: string, endDate: string, cursor?: string, staff_key?: string, customerDetails?: boolean): Promise<PagedAppointments> {
    const qs = queryStringify({
      startDate: startDate,
      endDate: endDate,
      cursor: cursor,
      staff_key: staff_key,
      customerDetails: customerDetails,
    });
    const requestUrl = "/bookingapi/appointments?" + qs;
    try {
      const response = await this.APIClient.request<AppointmentsResponse>(requestUrl, { method: "GET" });
      return response.response
        ? {
            cursor: response.data.cursor || null,
            appointments: response.data.appointments,
          }
        : null;
    } catch (error) {
      throw error;
    }
  }
}
