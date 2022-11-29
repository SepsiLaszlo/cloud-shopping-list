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
    <VStack>
      {lists?.map((list) => (
        <Link href={"/lists/"+ list.id}>{list.name}</Link>
      ))}
    </VStack>
  );
};
