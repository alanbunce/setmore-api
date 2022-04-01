import { APIClient, Pages } from "../api-client";
import { StaffResponse, StaffMember } from "./types";

export class Staff {
  private APIClient: APIClient;

  constructor(APIClient: APIClient) {
    this.APIClient = APIClient;
  }

  async getStaffMembers(pages?: Pages): Promise<StaffMember[]> {
    try {
      const response = await this.APIClient.request<StaffResponse>("/bookingapi/staffs");
      return response.data.staffs;
    } catch (error) {
      throw error;
    }
  }
}
