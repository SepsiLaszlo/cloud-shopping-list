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

  useEffect(() => {
    if (items.length != 0) {
      return;
    }
    axios
      .get<Item[]>(`${BASE_URL}/items`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setItems(response.data);
      });
  });

  function postItem(name: string, price: number) {
    // axios
    //   .post<ItemPostResponse>(`${BASE_URL}/items`, {
    //     headers: {
    //       Accept: "application/json",
    //     },
    //     body: {
    //       name: name,
    //       price: price,
    //     },
    //   })
    //   .then((response) => {
    //     let newItems = items.filter(item => item.element.name!==name)
    //     let newItem:EditableListElement = {editable:false, element:
    //       {name: name,
    //       price: price}
    //     }
    //     newItems.push(newItem)
    //     setItems(newItems)
    //   });
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

  function updateItems(name: string, newPrice: number) {
    postItem(name, newPrice);

    setItems(
      items.map((item) => {
        if (item.name == name) {
          let newItem = item;
          newItem.price = newPrice;
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
        if (item.name == name) {
          let newItem = item;
          // newItem.editable = !item.editable;
          return newItem;
        } else {
          return item;
        }
      })
    );
  }

  function createItem(name: string, price: number) {
    postItem(name, price);
  }
  const [seletedForEdit, setSeletedForEdit] = React.useState<string>("");

  function ed() {
    if (seletedForEdit == "") {
      setSeletedForEdit("alma");
    } else {
      setSeletedForEdit("");
    }
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
          <ItemComponent
            key={item.name}
            item={item}
            updateItems={updateItems}
            toggleItems={toggleItems}
            deleteItem={deleteItem}
            editable={seletedForEdit == item.name}
          ></ItemComponent>
        ))}
      </VStack>
    </>
  );
};
