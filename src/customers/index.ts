import { Base } from "../base";
import { Customer, CustomerResponse } from "./types";

export class Customers extends Base {
  async createCustomer(customer: Customer): Promise<Customer> {
    try {
      const response = await this.request<CustomerResponse>("/bookingapi/customer/create", { method: "POST", body: JSON.stringify(customer) });
      return response.data.customer;
    } catch (error) {
      console.log(error);
    }
  }
}
