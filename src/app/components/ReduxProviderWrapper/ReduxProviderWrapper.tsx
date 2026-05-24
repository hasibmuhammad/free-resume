"use client";
import { DraftManager } from "../DraftManager/DraftManager";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const ReduxProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <DraftManager />
      {children}
    </Provider>
  );
};

export default ReduxProviderWrapper;
