import axios from "axios";

export default class BaseRouters {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async GET(path: string, headers: object = {}) {
    return await this.request("GET", path, null, headers);
  }

  async POST(path: string, data: object, headers: object = {}) {
    return await this.request("POST", path, data, headers);
  }

  async PUT(path: string, data: object, headers: object = {}) {
    return await this.request("PUT", path, data, headers);
  }

  async DELETE(path: string, headers: object = {}) {
    return await this.request("DELETE", path, null, headers);
  }

  async PATCH(path: string, data: object, headers: object = {}) {
    return await this.request("PATCH", path, data, headers);
  }

  private async request(
    method: string,
    path: string,
    data: object | null,
    headers: object = {}
  ) {
    return await axios.request({
      method,
      url: `${this.apiUrl}${path}`,
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }
}
