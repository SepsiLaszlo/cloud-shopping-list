import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { Item } from "../intefaces/interfaces";

export const ItemComponent: React.FC<{
  item: Item;
  editable: boolean;
  updateItems: (item: Item) => void;
  selectForEdit: (name: string) => void;
  deleteItem: (name: string) => void;
}> = ({ item, editable, updateItems, selectForEdit, deleteItem }) => {
  const [input, setInput] = useState("");

  function changeHandler(e: any) {
    item.price = e.target.value;
    setInput(e.target.value);
  }

  function save() {
    updateItems(item);
    selectForEdit("");
  }

  function remove() {
    if (item.id) {
      deleteItem(item.id);
    }
  }
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <VStack flex={1} alignItems="start">
          {editable ? (
            <>
              <Text>{item.name}</Text>
              <Input onChange={changeHandler}></Input>
            </>
          ) : (
            <>
              <Text>{item.name}</Text>
              <Text>{Number(item.price)} Ft</Text>
            </>
          )}
        </VStack>

        <Box minW={200}>
          {editable ? (
            <Button mx={3} onClick={save}>
              Ment
            </Button>
          ) : (
            <Button m={3} onClick={() => selectForEdit(item.name)}>
              Szerkeszt
            </Button>
          )}

          {editable ? (
            <Button onClick={() => selectForEdit("")}>Mégsem</Button>
          ) : (
            <Button onClick={remove}>Töröl</Button>
          )}
        </Box>
      </Flex>
    </>
  );
};
