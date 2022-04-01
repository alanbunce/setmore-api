import { APIClient } from "../api-client";
import { TimeslotsAttributes, TimeslotsResponse } from "./types";

export class Timeslots{
  private APIClient: APIClient;

  constructor(APIClient: APIClient) {
    this.APIClient = APIClient;
  }

  async getAllTimeslots(attributes: TimeslotsAttributes): Promise<string[]> {
    try {
      const response = await this.APIClient.request<TimeslotsResponse>("/bookingapi/slots", { method: "POST", body: JSON.stringify(attributes) });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
