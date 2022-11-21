import {
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  Box,
  useControllableState,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { of } from "rxjs";
import { UserContext } from "../contexts/user.context";

export const NavBar: React.FC = () => {
  const userSubject = React.useContext(UserContext);
  const [userName, setUserName] = useState<string>("");
  userSubject.subscribe((name) => setUserName(name));

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" mb={30}>
      <Box p="2">
        <Heading size="md">Cloud Shopping List</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <Button>{userName}</Button>
        <Button>Kilépés</Button>
      </ButtonGroup>
    </Flex>
  );
};
