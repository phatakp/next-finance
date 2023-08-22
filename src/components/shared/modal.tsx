"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ModalProps {
  trigger: ReactNode;
  title: string;
  desc?: string;
  children: ReactNode;
}

type ModalContextProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  getTitle: (title: string) => void;
};

export const ModalContext = createContext({} as ModalContextProps);

const Modal: FC<ModalProps> = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const getTitle = (title: string) => setTitle(title);

  return (
    <ModalContext.Provider value={{ open, setOpen, getTitle }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="capitalize">{trigger}</DialogTrigger>
        <DialogContent className="p-0 mx-auto sm:max-w-3xl">
          <DialogHeader className="p-4 bg-primary text-primary-foreground font-fira tracking-wide">
            <DialogTitle className="text-3xl capitalize">{title}</DialogTitle>
            <DialogDescription className="tracking-normal">
              {`Confirm details to ${title}`}
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">{children}</div>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};

export default Modal;
