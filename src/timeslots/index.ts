import { Base } from "../base";
import { TimeslotsAttributes, TimeslotsResponse } from "./types";

export class Timeslots extends Base {
  async getAllTimeslots(attributes: TimeslotsAttributes): Promise<string[]> {
    try {
      const response = await this.request<TimeslotsResponse>("/bookingapi/slots", { method: "POST", body: JSON.stringify(attributes) });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
