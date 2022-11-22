import React from "react";
import { Subject } from "rxjs";
import { User } from "../intefaces/interfaces";
const user =new Subject<User>()
export const UserContext = React.createContext(user)