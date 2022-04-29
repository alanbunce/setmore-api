import { APIClient } from "../api-client";
import { ServicesResponse, ServiceCategoryResponse, Service, ServiceCategory } from "./types";

export class Services {
  private APIClient: APIClient;

  constructor(APIClient: APIClient) {
    this.APIClient = APIClient;
  }
  async getAllServices(): Promise<Service[]> {
    try {
      const response = await this.APIClient.request<ServicesResponse>("/bookingapi/services");
      return response.response ? response.data.services : null;
    } catch (error) {
      throw error;
    }
  }
  async getServiceCategories(): Promise<ServiceCategory[]> {
    try {
      const response = await this.APIClient.request<ServiceCategoryResponse>("/bookingapi/services/categories");
      return response.response ? response.data.service_categories : null;
    } catch (error) {
      throw error;
    }
  }
  async getServicesByCategory(categoryKey: string): Promise<Service[]> {
    try {
      const response = await this.APIClient.request<ServicesResponse>("/bookingapi/services/categories/" + categoryKey);
      return response.response ? response.data.services : null;
    } catch (error) {
      throw error;
    }
  }
}
