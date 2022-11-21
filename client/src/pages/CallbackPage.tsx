import { Button, Heading, HStack, Link, VStack } from "@chakra-ui/react";
import * as React from "react";
import { Text } from "@chakra-ui/react";
import { LOGIN_URL } from "../constants";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const CallbackPage: React.FC = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    console.log(url)
    const idToken = url.split("#")[1].split("&")[0].split("=")[1];
    const accessToken = url.split("#")[1].split("&")[1].split("=")[1];
    console.log(idToken)
    console.log(accessToken)

    localStorage.setItem("idToken", idToken);
    localStorage.setItem("accessToken", accessToken);
    navigate('/list')
  });

  return (
    <VStack mt={100}>
      <Text fontSize="lg">Bejelentkezés folyamatban ...</Text>
    </VStack>
  );
};
