import { v4 as uuid } from "uuid";
import { AcctType, Bank } from "../types/app";

export const cash = {
  id: "cash",
  type: AcctType.Savings,
  name: "Cash",
};

const banks = [
  {
    type: AcctType.Savings,
    names: [
      "ICICI",
      "HDFC",
      "SBI",
      "AXIS",
      "CITI",
      "HSBC",
      "Bank of Baroda",
      "IndusInd",
      "SBM",
      "RBL",
      "Kotak",
    ],
  },
  {
    type: AcctType.Mortgage,
    names: [
      "ICICI",
      "HDFC",
      "SBI",
      "AXIS",
      "CITI",
      "HSBC",
      "Bank of Baroda",
      "IndusInd",
      "SBM",
      "RBL",
      "Kotak",
      "PhonePe",
    ],
  },
  {
    type: AcctType.CreditCard,
    names: [
      "ICICI",
      "HDFC",
      "SBI",
      "AXIS",
      "CITI",
      "HSBC",
      "Bank of Baroda",
      "IndusInd",
      "SBM",
      "RBL",
      "Amex",
      "Kotak",
    ],
  },
  {
    type: AcctType.Investment,
    names: [
      "ICICI",
      "HDFC",
      "SBI",
      "AXIS",
      "Bank of Baroda",
      "IndusInd",
      "FundsIndia",
      "PhonePe",
      "PayTM",
      "Kotak",
    ],
  },
  {
    type: AcctType.Wallet,
    names: [
      "Amazon Pay",
      "Google Pay",
      "PhonePe",
      "PayTM",
      "SuprDaily",
      "BBDaily",
      "Myntra",
      "Sodexo",
      "Airtel Money",
    ],
  },
];

const banksData = banks.map(({ type, names }) =>
  names.map((name) => ({
    id: uuid(),
    name,
    type,
  }))
);

export default banksData.flatMap((d) => d) as Bank[];
