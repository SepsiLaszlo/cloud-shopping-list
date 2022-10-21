import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { Item } from "../intefaces/GetListData";

export const ItemComponent: React.FC<{
  item: Item;
  editable: boolean;
  updateItems: (name: string, newPrice: number) => void;
  toggleItems: (name: string) => void;
  deleteItem: (name: string) => void;
}> = ({ item, editable, updateItems, toggleItems, deleteItem }) => {
  const [input, setInput] = useState("");

  function changeHandler(e: any) {
    setInput(e.target.value);
  }

  function save() {
    updateItems(item.name, Number(input));
    toggle();
  }

  function toggle() {
    toggleItems(item.name);
  }

  function remove(){
    deleteItem(item.name)
  }
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        {editable && (<>Editing</>)}
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
            <Button m={3} onClick={toggle}>
              Szerkeszt
            </Button>
          )}

          {editable ? (
            <Button onClick={toggle}>Mégsem</Button>
          ) : (
            <Button onClick={remove}>Töröl</Button>
          )}
        </Box>
      </Flex>
    </>
  );
};
