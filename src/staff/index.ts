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
      return response.response ? response.data.staffs : null;
    } catch (error) {
      throw error;
    }
  }
}
