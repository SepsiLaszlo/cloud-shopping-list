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

  public getActiveList() {
    const userSub = this.getUserSub()
    if (!userSub) {
      return  ;
    }
    
    return axios.get<List>(`${BASE_URL}/lists/${userSub}/active`, {
      headers: this.authorizationHeader(),
    });
  }

  public getAllList() {
    const userSub = this.getUserSub()
    if (!userSub) {
      return ;
    }
    
    return axios.get<List[]>(`${BASE_URL}/lists/${userSub}`, {
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
    return { Authorization: this.getIdToken() || "" };
  }
  private getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  private getIdToken() {
    // return 'eyJraWQiOiJoeXdqank0ayt5d2tQZllPQ1FLVE9qZEJFSFdUcmFUNXZrZUQ0T1czZWRrPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiNHJKSUlzbHd5cHVXbXVONEFEcEhJUSIsInN1YiI6IjlhYzFmNWM5LTA0MjEtNGM2NC1hMjZhLTFlZGI0YTk1Y2MwOCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV83MVpDaEQxbE8iLCJjb2duaXRvOnVzZXJuYW1lIjoibGFjaSIsImF1ZCI6IjJuYjNnaHJmcmNybDZjNjA3cXNmN2pmYXJoIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Njk0NzM2NDYsImV4cCI6MTY2OTQ3NzI0NiwiaWF0IjoxNjY5NDczNjQ2LCJqdGkiOiJiNGQ5NTBmYi0yOTMwLTQ2ODYtOTQxYy05NWQzMzE3ZjBlOGQiLCJlbWFpbCI6InNlcHNpLmxhc3psbzk5QGdtYWlsLmNvbSJ9.glZVVbLdfuKAXcCRc5cxQPgiw4E7RsbHbl-A1aqR4m0GnSNv7qb6pDHc0LSiuPkfO-Y3lDZ9ZvHMBlEQ7UI2upDuX5RofdbL2ZhxwkagdavQcEP8U75l2ult57nMIbINABRcS9keim1BQNtB6eqH7B-xdLPqRdAOjFzjuVJrLnO9-WREAkl_yY6UZPzER9l3xhm-lrVmszTu2fzCfDlYgt1xs2r95gdzCMrBbCGuif2pckIYfeSuSBgMWQWCwcv1dqskDiLIGt3CPvKccxUgVzPJySOqZ3bdBUew4OT11bYUNV9h1MzMR5Ld6EgXVpaTWyLfp2iLSG_bhhICrDK4Tg'

    return localStorage.getItem("idToken");
  }

}
