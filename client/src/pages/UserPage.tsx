import { VStack, Text, Flex, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import * as React from "react";
import { AppService } from "../services/app.service";

export const UserPage: React.FC = (props) => {
    const appService = new AppService()
    const user = appService.getUser()
  return (
    user &&
    <TableContainer maxWidth='800px' margin='auto'>
      <Table variant="simple">
      <Tbody>
      <Tr>
        <Td>Név</Td>
        <Td textAlign='right'>{user["cognito:username"]}</Td>
      </Tr>
      <Tr>
        <Td>Email</Td>
        <Td textAlign='right'>{user.email}</Td>
      </Tr>
      <Tr>
        <Td>Cognito Id</Td>
        <Td textAlign='right'>{user.sub}</Td>
      </Tr>
      </Tbody>
      </Table>
    </TableContainer>
  );
};
