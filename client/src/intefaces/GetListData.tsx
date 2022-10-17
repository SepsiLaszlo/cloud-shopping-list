export interface GetListData {
  body: string;
  
}

export interface GetLisElement {
  name: string;
  price: number;
}

export interface EditableListElement {
  element: GetLisElement;
  editable: boolean;
//   updateFn: (name: string) => string;
}

export interface ItemPostResponse {
    message:string
}