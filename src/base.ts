import fetch from "isomorphic-unfetch";

export type Config = {
  apiKey: string;
  basePath: string;
  token: string;
  tokenRefresh: number;
};

export type Pages = {
  cursor: string;
};

export abstract class Base {
  private apiKey: string;
  protected basePath: string;
  private token: string;
  private tokenRefresh: number;

  protected constructor(config: Config) {
    this.apiKey = config.apiKey;
    this.basePath = config.basePath;
    this.token = config.token;
    this.tokenRefresh = config.tokenRefresh;
  }

  protected tokenValid(): boolean {
    if (Date.now() <= this.tokenRefresh - 250) {
      return true;
    }
    return false;
  }

  protected async refreshToken() {
    const time = Date.now();
    const response = await fetch("https://developer.setmore.com/api/v1/o/oauth2/token?refreshToken=" + this.apiKey, {
      method: "GET",
    });
    const jsonResponse = await response.json();
    this.token = jsonResponse.data.token.access_token;
    this.tokenRefresh = time + parseInt(jsonResponse.data.token.expires_in) * 1000;
  }

  protected async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    if (!this.tokenValid()) {
      await this.refreshToken();
    }
    const url = this.basePath + endpoint;
    const headers = {
      Authorization: "Bearer " + this.token,
      "Content-type": "application/json",
    };

    const config = {
      ...options,
      headers,
    };

    return fetch(url, config).then((r) => {
      if (r.ok) {
        return r.json();
      }
      throw new Error(r.statusText);
    });
  }
}
