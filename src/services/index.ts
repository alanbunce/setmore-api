import { Base } from "../base";
import { ServicesResponse, ServiceCategoryResponse, Service, ServiceCategory } from "./types";

export class Services extends Base {
  async getAllServices(): Promise<Service[]> {
    try {
      const response = await this.request<ServicesResponse>("/bookingapi/services");
      return response.data.services;
    } catch (error) {
      throw error;
    }
  }
  async getServiceCategories(): Promise<ServiceCategory[]> {
    try {
      const response = await this.request<ServiceCategoryResponse>("/bookingapi/services/categories");
      return response.data.service_categories;
    } catch (error) {
      throw error;
    }
  }
  async getServicesByCategory(categoryKey: string): Promise<Service[]> {
    try {
      const response = await this.request<ServicesResponse>("/bookingapi/services/categories/" + categoryKey);
      if (response.response) {
        return response.data.services;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
