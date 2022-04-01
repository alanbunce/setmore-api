import { Services } from "./services";
import { Appointments } from "./appointments";
import { Staff } from "./staff";
import { Customers } from "./customers";
import { Timeslots } from "./timeslots";
import { APIClient } from "./api-client";

class SetmoreAPI {
  public appointments: Appointments;
  public services: Services;
  public staff: Staff;
  public customers: Customers;
  public timeslots: Timeslots;

  private constructor(APIClient: APIClient) {
    this.appointments = new Appointments(APIClient);
    this.services = new Services(APIClient);
    this.staff = new Staff(APIClient);
    this.customers = new Customers(APIClient);
    this.timeslots = new Timeslots(APIClient);
  }

  static async init(apiKey: string): Promise<SetmoreAPI> {
    const time = Date.now();
    const response = await fetch("https://developer.setmore.com/api/v1/o/oauth2/token?refreshToken=" + apiKey, {
      method: "GET",
    });
    const jsonResponse = await response.json();
    const tokenRefresh = time + parseInt(jsonResponse.data.token.expires_in) * 1000;
    return new SetmoreAPI(
      new APIClient({
        apiKey: apiKey,
        basePath: "https://developer.setmore.com/api/v1",
        token: jsonResponse.data.token.access_token,
        tokenRefresh: tokenRefresh,
      })
    );
  }
}

export default SetmoreAPI;
