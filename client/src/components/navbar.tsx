import {
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  Box,
  useControllableState,
  Text,
  Link,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { of } from "rxjs";
import { UserContext } from "../contexts/user.context";
import { User } from "../intefaces/interfaces";
import { AppService } from "../services/app.service";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

export const NavBar: React.FC = () => {
  const userSubject = React.useContext(UserContext);
  const [user, setUser] = useState<User>();
  userSubject.subscribe((user) => setUser(user));

  const appService = new AppService();
  useEffect(() => {
    if (user) {
      return;
    }
    const savedUser = appService.getUser();
    if (!savedUser) {
      return;
    }
    setUser(savedUser);
  });

  function logout() {
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  }

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" mb={30}>
      <Box p="2">
        <Link href="/">
          <Heading size="md">Cloud Shopping List</Heading>
        </Link>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        {user && (
          <>
            <Link
              href="/user"
              bgColor="gray.100"
              py={2}
              px={4}
              borderRadius={5}
              fontWeight="bold"
            >
              {user["cognito:username"]}
            </Link>

            <Button onClick={logout}>Kilépés</Button>
          </>
        )}
      </ButtonGroup>
    </Flex>
  );
};
