import { Button, HStack, Link, VStack } from "@chakra-ui/react";
import * as React from "react";
import { Text } from "@chakra-ui/react";
import { LOGIN_URL } from "../constants";
import { AppService } from "../services/app.service";
import { useEffect, useState } from "react";
import { List } from "../intefaces/interfaces";

export const AllListsPage: React.FC = (props) => {
  const appService = new AppService();
  const [lists, setLists] = useState<List[]>();
  useEffect(() => {
    if (lists) return;
    appService.getAllList()?.then((response) => {
      setLists(response.data);
    });
  });
  return (
    <VStack width='50%' mx='auto'>
      {lists?.map((list) => (
        <Link
        href={"/lists/"+ list.id}
        bgColor="gray.100"
        py={2}
        px={4}
        borderRadius={5}
        fontWeight="bold"
        width="100%"
        textAlign='center'
      >
        {list.name}
      </Link>
      ))}
    </VStack>
  );
};
