export interface  Item {
  id?:string;
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

export interface PutItemBody {
  id:string
  name: string
  price: number
}