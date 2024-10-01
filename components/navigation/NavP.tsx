import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import NavLogin from "./NavLogin";
import NavMain from "./NavMain";

export default function NavP() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <NavMain />
      ) : (
        <NavLogin setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
}
