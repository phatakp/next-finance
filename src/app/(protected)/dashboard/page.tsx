import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Expensio",
  description: "Personal Expense Tracker Dashboard",
};

type DashboardPageProps = {};

const DashboardPage: FC<DashboardPageProps> = ({}) => {
  return <div>DashboardPage</div>;
};

export default DashboardPage;
