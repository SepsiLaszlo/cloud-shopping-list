import axios from "axios";
import { BASE_URL } from "../constants";
import { Item, ItemPostResponse, PutItemBody } from "../intefaces/interfaces";

export class AppService {
  public async getItemList() {
    if (!this.getAccessToken()) {
      return { data: [] };
    }

    return axios.get<Item[]>(`${BASE_URL}/items`, {
      headers: this.authorizationHeader(),
    });
  }

  public postItem(body: PutItemBody) {
    return axios.post<ItemPostResponse>(
      `${BASE_URL}/items`,
      {
        body: body,
      },
      {
        headers: this.authorizationHeader(),
      }
    );
  }

  private authorizationHeader() {
    return { Authorization: this.getAccessToken() || "" };
  }
  private getAccessToken() {
    return localStorage.getItem("accessToken");
  }
}
