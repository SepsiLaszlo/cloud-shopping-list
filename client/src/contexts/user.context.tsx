import React from "react";
import { Subject } from "rxjs";
const name =new Subject<string>()
export const UserContext = React.createContext(name)