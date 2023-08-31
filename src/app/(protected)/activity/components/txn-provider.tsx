"use client";
import { getGrpOptions } from "@/lib/utils";
import {
  APITxnResponse,
  ReactSelectGrpOptions,
  ReactSelectOptions,
} from "@/types/app";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TxnContextProps = {
  grpOptions: ReactSelectOptions | undefined;
  srcOptions: ReactSelectGrpOptions | undefined;
  setSrcOptions: Dispatch<SetStateAction<ReactSelectGrpOptions | undefined>>;
  destOptions: ReactSelectGrpOptions | undefined;
  setDestOptions: Dispatch<SetStateAction<ReactSelectGrpOptions | undefined>>;
  srcBalance: number;
  setSrcBalance: Dispatch<SetStateAction<number>>;
  txns: APITxnResponse[] | undefined;
  setTxns: Dispatch<SetStateAction<APITxnResponse[] | undefined>>;
};
export const TxnContext = createContext({} as TxnContextProps);

export default function TxnContextProvider({
  children,
  initTxns,
}: {
  children: ReactNode;
  initTxns: APITxnResponse[] | undefined;
}) {
  const [txns, setTxns] = useState(initTxns);
  const [srcBalance, setSrcBalance] = useState(0);
  const [grpOptions, setGrpOptions] = useState<ReactSelectOptions | undefined>(
    []
  );
  const [srcOptions, setSrcOptions] = useState<
    ReactSelectGrpOptions | undefined
  >([]);
  const [destOptions, setDestOptions] = useState<
    ReactSelectGrpOptions | undefined
  >([]);

  useEffect(() => {
    async function fetchGrpOptions() {
      const options = await getGrpOptions();
      setGrpOptions(() => options);
    }
    fetchGrpOptions();
  }, []);

  const value = useMemo(
    () => ({
      grpOptions,
      srcOptions,
      setSrcOptions,
      destOptions,
      setDestOptions,
      srcBalance,
      setSrcBalance,
      txns,
      setTxns,
    }),
    [
      grpOptions,
      srcOptions,
      setSrcOptions,
      destOptions,
      setDestOptions,
      srcBalance,
      setSrcBalance,
      txns,
      setTxns,
    ]
  );
  return <TxnContext.Provider value={value}>{children}</TxnContext.Provider>;
}
