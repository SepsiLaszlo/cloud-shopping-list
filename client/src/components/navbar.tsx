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
  const [userName, setUserName] = useState<string>("");
  userSubject.subscribe((name) => setUserName(name));

  const appService = new AppService();
  useEffect(() => {
    if (userName) {
      return;
    }
    const savedUser = appService.getUser();
    if (!savedUser) {
      return;
    }
    setUserName(savedUser["cognito:username"]);
  });

  function logout() {
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  }

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" mb={30}>
      <Box p="2">
        <Heading size="md">Cloud Shopping List</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        {userName && (
          <>
            <Button>{userName}</Button>

            <Button onClick={logout}>Kilépés</Button>
          </>
        )}
      </ButtonGroup>
    </Flex>
  );
};
