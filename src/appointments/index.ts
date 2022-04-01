import { APIClient } from "../api-client";
import { Appointment, AppointmentAttributes, AppointmentResponse } from "./types";

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
}
