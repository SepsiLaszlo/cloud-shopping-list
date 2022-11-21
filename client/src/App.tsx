import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Center,
  Flex,
  Square,
  background,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { Helmet } from "react-helmet";

import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { HomePage } from "./pages/HomePage";
import { CallbackPage } from "./pages/CallbackPage";

const router = createBrowserRouter([
  {
    path: "/list",
    element: <ListPage></ListPage>,
  },
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/callback",
    element: <CallbackPage></CallbackPage>,
  },
]);

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "white",
        // color: 'white',
      },
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
      p: {
        color: "teal.500",
        // _hover: {
        //   textDecoration: "underline",
        // },
      },
      div: {
        color: "teal.500"
      },
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box maxWidth="1000px" mx="auto" padding={3}>
      <Text textAlign="center" fontSize="4xl" mb={5}>
        Cloud Shopping List
      </Text>
      <RouterProvider router={router} />
    </Box>
  </ChakraProvider>
);
