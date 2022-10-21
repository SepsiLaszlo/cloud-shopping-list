export interface Item {
  name: string;
  price: number;
}

export interface ItemPostResponse {
    message:string
}

export interface Response {
  data:ResponseData
}
export interface ResponseData {
  statusCode:number
  body: string
}