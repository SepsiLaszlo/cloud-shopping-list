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
  Button,
  ButtonGroup,
  Heading,
  Spacer,
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
import { NavBar } from "./components/navbar";
import { UserContext } from "./contexts/user.context";
import { Subject } from "rxjs";
import { User } from "./intefaces/interfaces";
import { UserPage } from "./pages/UserPage";
import { ActiveListPage } from "./pages/ActiveListPage";
import { AllListsPage } from "./pages/AllListPage";

const router = createBrowserRouter([
  {
    path: "/list",
    element: <ListPage></ListPage>,
  },
  {
    path: "/active",
    element: <ActiveListPage></ActiveListPage>,
  },
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/callback",
    element: <CallbackPage></CallbackPage>,
  },
  {
    path: "/user",
    element: <UserPage></UserPage>,
  },
  {
    path: '/lists',
    element: <AllListsPage></AllListsPage>
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
        color: "teal.500",
      },
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box maxWidth="1000px" mx="auto" padding={3}>
      <UserContext.Provider value={new Subject<User>()}>
        <NavBar></NavBar>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </Box>
  </ChakraProvider>
);
