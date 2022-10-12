import {
  VStack,
  StackDivider,
  Box,
  Text,
  Flex,
  Button,
  Input,
  ListItem,
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
        console.log(response.data.items);
        setItems(
          response.data.items.map((getListElemnet) => ({
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
        console.log(response);
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

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {items.map((item) => (
          <Item
            item={item}
            updateItems={updateItems}
            toggleItems={toggleItems}
          ></Item>
        ))}
      </VStack>
    </>
  );
};
