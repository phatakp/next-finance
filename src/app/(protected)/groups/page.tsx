import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Groups | Expensio",
  description: "Personal Expense Tracker Groups",
};

type GroupsPageProps = {};

const GroupsPage: FC<GroupsPageProps> = ({}) => {
  return <div>GroupsPage</div>;
};

export default GroupsPage;
