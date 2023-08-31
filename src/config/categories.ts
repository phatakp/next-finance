import { v4 as uuid } from "uuid";
import { CatType, Category } from "../types/app";

const categories = [
  { type: CatType.Food, names: ["Groceries", "Restaurant", "Online", "Other"] },
  {
    type: CatType.Utilities,
    names: ["Gas", "Internet", "Electricity", "Mobile", "Other", "Dth"],
  },
  {
    type: CatType.Transportation,
    names: [
      "Fuel",
      "Service-Repairs",
      "Insurance",
      "Flight",
      "Train",
      "Cab",
      "Other",
    ],
  },
  {
    type: CatType.Household,
    names: ["Maid", "Maintenance", "Property-Tax", "Goods", "Rent", "Other"],
  },
  {
    type: CatType.Health,
    names: ["Medicines", "Hospital", "Doctor", "Insurance", "Other"],
  },
  {
    type: CatType.Personal,
    names: [
      "Shopping",
      "Subscription",
      "Fitness",
      "Vacation",
      "Beauty",
      "Gift-Donation",
      "Other",
    ],
  },
  {
    type: CatType.Income,
    names: ["Salary", "Cashback", "Credit", "Other"],
  },
  {
    type: CatType.Transfer,
    names: [
      "Acct-to-Acct",
      "CC-Payment",
      "ATM-Withdrawal",
      "Wallet-Recharge",
      "Investment",
      "Other",
    ],
  },
];

const catData = categories.map(({ type, names }) =>
  names.map((name) => ({
    id: uuid(),
    name,
    type,
  }))
);
export default catData.flatMap((d) => d) as Category[];
