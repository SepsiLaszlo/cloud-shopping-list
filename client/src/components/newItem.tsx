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
  const [item, setItem] = useState<Item>({ name: "", price: 0, bought: false });

  function save() {
    newItem(item);
    setItem({ name: "", price: 0,  bought: false })
  }
  function changeNameHandler(e: any) {
    setItem({ name: e.target.value, price: item.price, bought: item.bought });
  }
  function changePriceHandler(e: any) {
    setItem({ name: item.name, price: e.target.value,  bought: item.bought });
  }
  return (
    <Stack borderColor='primary' borderWidth={4} padding={2} borderRadius={10}>
      <Text fontSize='xl'>Termék felvétele</Text>
      <Text>Termék neve</Text>
      <Input value={item.name} onChange={changeNameHandler}></Input>
      <Text>Ár (Ft)</Text>
      <Input value={item.price} onChange={changePriceHandler}></Input>
      <Button mx={3} onClick={save}>
        Létrehoz
      </Button>
    </Stack>
  );
};
