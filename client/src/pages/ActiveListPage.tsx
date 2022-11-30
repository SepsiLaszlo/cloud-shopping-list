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
import { Item, ItemPostResponse, List } from "../intefaces/interfaces";
import { ItemComponent } from "../components/item";
import { BASE_URL } from "../constants";
import { NewItem } from "../components/newItem";
import { v4 as uuidv4 } from "uuid";
import { AppService } from "../services/app.service";
import { useParams } from "react-router-dom";

export const ActiveListPage: React.FC = (props) => {
  const [list, setListValue] = React.useState<List>();
  const [seletedForEdit, setSeletedForEdit] = React.useState<string>("");
  const appService = new AppService();
  let { id } = useParams();
  useEffect(() => {
    if (list) {
      return;
    }
    if (id) {
      loadSelectedList();
    } else {
      loadActiveList()?.then((response) => {
        if (response === null) {
          // createNewList();
        }
      });
    }
  });

  function loadSelectedList() {
    appService.getAllList()?.then((response) => {
      if (!response) {
        return;
      }
      setList(response.data.filter((list) => list.id == id)[0]);
    });
  }

  function loadActiveList() {
    return appService.getActiveList()?.then((response) => {
      if (!response || response.data == null) {
        return null;
      } else {
        setList(response.data);
      }
    });
  }

  function setList(list: List) {
    list.items = list.items.sort((a, b) =>
      a.bought && !b.bought ? 1 : !a.bought && b.bought ? -1 : 0
    );
    setListValue(list);
  }

  function putItem(newItem: Item) {
    if (!list) return;

    list.items = list.items.filter((item) => item.name != newItem.name);
    list.items.push(newItem);
    appService.postList(list).then((response) => console.log(response));
    setList({ ...list });
  }

  function deleteItem(name: string) {
    if (!list) return;
    list.items = list.items.filter((item) => item.name !== name);
    appService.postList(list).then((response) => console.log(response));
    setList({ ...list });
  }

  function createNewList() {
    const user_id = appService.getUserSub();
    if (!user_id) {
      return;
    }
    const list: List = {
      name: "--Adj meg egy lista nevet --",
      id: uuidv4(),
      user_id: user_id,
      active: true,
      items: [],
    };
    appService.postList(list).then();
    setListValue({ ...list });
  }
  function finishList() {
    if (!list) {
      createNewList();
      return;
    }
    list.active = false;
    appService
      .postList(list)
      .then((response) => {
        createNewList();
      })
      .then(() => loadActiveList());
  }

  function nameChangeHandler(e: any) {
    if (!list) return;
    list.name = e.target.value;
    setListValue({ ...list });
    putList();
  }

  function putList() {
    if (!list) return;
    appService.postList(list).then();
  }

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        px={5}
      >
        <Input value={list?.name || ""} onChange={nameChangeHandler} />
        <NewItem newItem={putItem}></NewItem>
        <Button onClick={finishList} bgColor="green.400" textColor="white">
          Végeztem a vásárlással
        </Button>
        {list?.items.map((item) => (
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
