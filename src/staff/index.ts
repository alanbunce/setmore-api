import { Base, Pages } from "../base";
import { StaffResponse, StaffMember } from "./types";

export class Staff extends Base {
  async getStaffMembers(pages?: Pages): Promise<StaffMember[]> {
    try {
      const response = await this.request<StaffResponse>("/bookingapi/staffs");
      return response.data.staffs;
    } catch (error) {
      throw error;
    }
  }
}
