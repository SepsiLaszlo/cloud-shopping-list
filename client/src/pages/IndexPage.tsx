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
import { Item, ItemPostResponse } from "../intefaces/GetListData";
import { ItemComponent } from "../components/item";
import { BASE_URL } from "../constants";
import { NewItem } from "../components/newItem";
export const IndexPage: React.FC = (props) => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [seletedForEdit, setSeletedForEdit] = React.useState<string>("");

  useEffect(() => {
    if (items.length != 0) {
      return;
    }
    axios.get<Item[]>(`${BASE_URL}/items`).then((response) => {
      setItems(response.data);
    });
  });

  function putItem(newItem: Item) {
    axios
      .post<ItemPostResponse>(`${BASE_URL}/items`, {
        headers: {
          Accept: "application/json",
        },
        body: {
          name: newItem.name,
          price: newItem.price,
        },
      })
      .then((response) => {
        let newItems = items.filter((item) => item.name !== newItem.name);
        newItems.push(newItem);
        setItems(newItems);
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
        let newItems = items.filter((item) => item.name !== name);
        setItems(newItems);
      });
  }

 
  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        px={5}
      >
        <NewItem newItem={putItem}></NewItem>
        {items.map((item) => (
          <ItemComponent
            key={item.name}
            item={item}
            updateItems={putItem}
            selectForEdit={setSeletedForEdit}
            deleteItem={deleteItem}
            editable={seletedForEdit == item.name}
          ></ItemComponent>
        ))}
      </VStack>
    </>
  );
};
