import {
  VStack,
  StackDivider,
  Box,
  Text,
  Flex,
  Button,
  Input,
  ListItem,
  Editable,
} from "@chakra-ui/react";
import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  EditableListElement,
  GetLisElement,
  GetListData,
  ItemPostResponse,
} from "../intefaces/GetListData";
import { Item } from "../components/item";
import { BASE_URL } from "../constants";
import { NewItem } from "../components/newItem";
export const IndexPage: React.FC = (props) => {
  useEffect(() => {
    if (items.length != 0) {
      return;
    }
    axios
      .get<GetListData>(`${BASE_URL}/items`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.body);
        let data:[GetLisElement] = JSON.parse(response.data.body)
        // const data = JSON.parse(response.data)
        setItems(
          data.map((getListElemnet) => ({
            element: getListElemnet,
            editable: false,
          }))
        );
      });
  });

  function postItem(name: string, price: number) {
    axios
      .post<ItemPostResponse>(`${BASE_URL}/items`, {
        headers: {
          Accept: "application/json",
        },
        body: {
          name: name,
          price: price,
        },
      })
      .then((response) => {
        let newItems = items.filter(item => item.element.name!==name)
        let newItem:EditableListElement = {editable:false, element:
          {name: name,
          price: price}  
        }
        newItems.push(newItem)
        setItems(newItems)
      });
  }

  function deleteItem(name: string) {
    axios
      .delete<ItemPostResponse>(`${BASE_URL}/items/${name}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        let newItems = items.filter(item => item.element.name!==name)
        setItems(newItems)
      });
  }

  const [items, setItems] = React.useState<EditableListElement[]>([]);

  function updateItems(name: string, newPrice: number) {
    postItem(name,newPrice)

    setItems(
      items.map((item) => {
        if (item.element.name == name) {
          let newItem = item;
          newItem.element.price = newPrice;
          return newItem;
        } else {
          return item;
        }
      })
    );
  }

  function toggleItems(name: string) {
    setItems(
      items.map((item) => {
        if (item.element.name == name) {
          let newItem = item;
          newItem.editable = !item.editable;
          return newItem;
        } else {
          return item;
        }
      })
    );
  }

  function createItem(name:string, price:number){
    postItem(name,price)
    // let newItem:EditableListElement = {editable:false, element: {name: name, price: price}}
    // let newItems = [...items,newItem]
    // setItems(newItems)
  }
  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        px={5}
      >
        <NewItem newItem={createItem}></NewItem>
        {items.map((item) => (
          <Item
            item={item}
            updateItems={updateItems}
            toggleItems={toggleItems}
            deleteItem={deleteItem}
          ></Item>
        ))}
      </VStack>
    </>
  );
};
