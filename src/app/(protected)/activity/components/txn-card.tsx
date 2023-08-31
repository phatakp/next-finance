import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { APITxnResponse, FormAction } from "@/types/app";
import { Copy, Edit, Trash } from "lucide-react";
import { FC } from "react";
import TxnDetailCard from "./txn-detail";
import TxnButton from "./txn-form/txn-button";
import TxnRowItem from "./txn-row";

type TxnCardProps = {
  txn: APITxnResponse;
};

const TxnCard: FC<TxnCardProps> = ({ txn }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={txn.id}>
        <AccordionTrigger className="w-fit">
          <TxnRowItem txn={txn} />
        </AccordionTrigger>
        <AccordionContent className="col-span-4 lg:col-span-5">
          <Card className="my-2">
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <TxnDetailCard txn={txn} />
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-2 md:gap-4 w-full">
              <TxnButton
                variant="default"
                action={FormAction.Add}
                text="Copy"
                icon={<Copy className="w-5 h-5" />}
                txn={txn}
              />
              <TxnButton
                variant="secondary"
                action={FormAction.Update}
                icon={<Edit className="w-5 h-5" />}
                txn={txn}
              />
              <TxnButton
                variant="destructive"
                action={FormAction.Delete}
                icon={<Trash className="w-5 h-5" />}
                txn={txn}
              />
            </CardFooter>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TxnCard;
