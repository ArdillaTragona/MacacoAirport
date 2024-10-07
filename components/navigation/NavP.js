import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import NavLogin from "./NavLogin";
import TabMain from "./TabMain";

export default function NavP() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <TabMain />
      ) : (
        <NavLogin setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
}
