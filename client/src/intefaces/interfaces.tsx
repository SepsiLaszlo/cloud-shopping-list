export interface Item {
  id?: string;
  name: string;
  price: number;
  bought: boolean;
}

export interface List {
  id: string;
  user_id: string;
  active: boolean;
  items: Item[];
}

export interface ItemPostResponse {
  message: string;
}

export interface Response {
  data: ResponseData;
}
export interface ResponseData {
  statusCode: number;
  body: string;
}

export interface PutItemBody {
  id: string;
  name: string;
  price: number;
}
export interface User {
  at_hash: string;
  sub: string;
  email_verified: boolean;
  iss: string;
  "cognito:username": string;
  aud: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  email: string;
}
