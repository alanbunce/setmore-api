import { Services } from "./services";
import { Appointments } from "./appointments";
import { Staff } from "./staff";
import { Customers } from "./customers";
import { applyMixins } from "./utils";
import { Base } from "./base";

class SetmoreAPI extends Base {
  static async init(apiKey: string): Promise<SetmoreAPI> {
    const time = Date.now();
    const response = await fetch("https://developer.setmore.com/api/v1/o/oauth2/token?refreshToken=" + apiKey, {
      method: "GET",
    });
    const jsonResponse = await response.json();
    const tokenRefresh = time + parseInt(jsonResponse.data.token.expires_in) * 1000;
    return new SetmoreAPI({
      apiKey: apiKey,
      basePath: "https://developer.setmore.com/api/v1",
      token: jsonResponse.data.token.access_token,
      tokenRefresh: tokenRefresh,
    });
  }
}
interface SetmoreAPI extends Services, Appointments, Staff, Customers {}
applyMixins(SetmoreAPI, [Services, Appointments, Staff, Customers]);

export default SetmoreAPI;
