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
import { EditableListElement } from "../intefaces/GetListData";

export const NewItem: React.FC<{
  newItem: (name: string, price: number) => void;
}> = ({ newItem }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function save() {
    setName('')
    setPrice('')
    newItem(name, Number(price));
  }
  function changeNameHandler(e: any) {
    setName(e.target.value);
  }
  function changePriceHandler(e: any) {
    setPrice(e.target.value);
  }
  return (
    <Stack>
      <Text>Név</Text>
      <Input value={name} onChange={changeNameHandler}></Input>
      <Text>Ár</Text>
      <Input value={price} onChange={changePriceHandler}></Input>
      <Button mx={3} onClick={save}>
        Létrehoz
      </Button>
    </Stack>
  );
};
