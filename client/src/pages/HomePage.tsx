import { Button, HStack, Link, VStack } from "@chakra-ui/react";
import * as React from "react";
import { Text } from "@chakra-ui/react";
import { LOGIN_URL } from "../constants";

export const HomePage: React.FC = (props) => {
  return (
    <VStack mt={100}>
      <Text mb={10}>Az alkalmazás használatához kérlek jelentkezz be!</Text>
      <Link href={LOGIN_URL} bgColor='gray.100' py={2} px={4} borderRadius={5} fontWeight="bold" isExternal >
        Bejelentkezés
      </Link>
    </VStack>
  );
};
