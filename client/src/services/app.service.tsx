import axios from "axios";
import jwtDecode from "jwt-decode";
import { BASE_URL } from "../constants";
import { Item, ItemPostResponse, List, PutItemBody, User } from "../intefaces/interfaces";
export class AppService {
  public async getItemList() {
    if (!this.getAccessToken()) {
      return { data: [] };
    }

    return axios.get<Item[]>(`${BASE_URL}/items`, {
      headers: this.authorizationHeader(),
    });
  }

  public async getActiveList() {
    const userSub = this.getUserSub()
    if (!userSub) {
      return ;
    }
    
    return axios.get<List>(`${BASE_URL}/lists/${userSub}/active`, {
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

  public postList(body: List) {
    return axios.post<ItemPostResponse>(
      `${BASE_URL}/lists/`,
      {
        body: body,
      },
      {
        headers: this.authorizationHeader(),
      }
    );
  }

  public getUserSub(){
    return this.getUser()?.sub;
  }

  public getUser(): User | null {
    const token = this.getIdToken();
    if (token == null) {
      return null;
    }

    return jwtDecode(token);
  }

  private authorizationHeader() {
    return { Authorization: this.getAccessToken() || "" };
  }
  private getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  private getIdToken() {

    return localStorage.getItem("accessToken");
  }

}
