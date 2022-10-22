import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { Item } from "../intefaces/interfaces";

export const NewItem: React.FC<{
  newItem: (item: Item) => void;
}> = ({ newItem }) => {
  const [item, setItem] = useState<Item>({ name: "", price: 0 });

  function save() {
    newItem(item);
    setItem({ name: "", price: 0 })
  }
  function changeNameHandler(e: any) {
    setItem({ name: e.target.value, price: item.price });
  }
  function changePriceHandler(e: any) {
    setItem({ name: item.name, price: e.target.value });
  }
  return (
    <Stack>
      <Text>Név</Text>
      <Input value={item.name} onChange={changeNameHandler}></Input>
      <Text>Ár (Ft)</Text>
      <Input value={item.price} onChange={changePriceHandler}></Input>
      <Button mx={3} onClick={save}>
        Létrehoz
      </Button>
    </Stack>
  );
};
