import { APIClient } from "../api-client";
import { Customer, CustomerResponse } from "./types";

export class Customers {
  private APIClient: APIClient;

  constructor(APIClient: APIClient) {
    this.APIClient = APIClient;
  }
  async createCustomer(customer: Customer): Promise<Customer> {
    try {
      const response = await this.APIClient.request<CustomerResponse>("/bookingapi/customer/create", { method: "POST", body: JSON.stringify(customer) });
      return response.data.customer;
    } catch (error) {
      throw error;
    }
  }
}
