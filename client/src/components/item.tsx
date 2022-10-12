import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { EditableListElement } from "../intefaces/GetListData";

export const Item: React.FC<{
  item: EditableListElement;
  updateItems: (name: string, newPrice: number) => void;
  toggleItems: (name: string) => void;
}> = ({ item, updateItems, toggleItems }) => {
  const [input, setInput] = useState("");

  function changeHandler(e: any) {
    setInput(e.target.value);
  }

  function save() {
    updateItems(item.element.name, Number(input));
    toggle();
  }

  function toggle() {
    toggleItems(item.element.name);
  }
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <VStack flex={1} alignItems="start">
          {item.editable ? (
            <>
              <Text>{item.element.name}</Text>
              <Input onChange={changeHandler}></Input>
            </>
          ) : (
            <>
              <Text>{item.element.name}</Text>
              <Text>{Number(item.element.price)}</Text>
            </>
          )}
        </VStack>

        <Box minW={200}>
          {item.editable ? (
            <Button mx={3} onClick={save}>
              Ment
            </Button>
          ) : (
            <Button m={3} onClick={toggle}>
              Szerkeszt
            </Button>
          )}

          {item.editable ? (
            <Button onClick={toggle}>Mégsem</Button>
          ) : (
            <Button>Töröl</Button>
          )}
        </Box>
      </Flex>
    </>
  );
};
