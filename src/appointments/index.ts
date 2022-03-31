import { Base } from "../base";
import { Appointment, AppointmentAttributes, AppointmentResponse } from "./types";

export class Appointments extends Base {
  async createAppointment(attributes: AppointmentAttributes): Promise<Appointment> {
    try {
      const response = await this.request<AppointmentResponse>("/bookingapi/appointment/create", { method: "POST", body: JSON.stringify(attributes) });
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
      const response = await this.request<AppointmentResponse>("/bookingapi/appointments/" + appointmentKey + "/label", { method: "POST", body: JSON.stringify({ label: label }) });
      if (response.response) {
        return response.data.appointment;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
