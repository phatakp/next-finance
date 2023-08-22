import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Activity | Expensio",
  description: "Personal Expense Tracker Activity",
};

type ActivityPageProps = {};

const ActivityPage: FC<ActivityPageProps> = ({}) => {
  return <div>ActivityPage</div>;
};

export default ActivityPage;
