import {
  AuthContext,
  AuthContextType,
  AuthProvider,
} from "@/contexts/AuthContext";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

const defaultAuthValue: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const renderWithAuth = (
  ui: ReactElement,
  authValue?: Partial<AuthContextType>,
) => {
  return render(
    authValue ? (
      <AuthContext.Provider value={{ ...defaultAuthValue, ...authValue }}>
        {ui}
      </AuthContext.Provider>
    ) : (
      <AuthProvider>{ui}</AuthProvider>
    ),
  );
};
