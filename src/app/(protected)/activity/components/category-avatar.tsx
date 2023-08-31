import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { FC } from "react";

interface CategoryIconProps {
  category: { id: string; name: string; type: string } | undefined;
}

const CategoryIcon: FC<CategoryIconProps> = ({ category }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="rounded-full">
          <Avatar className="ring-2 ring-primary">
            <AvatarImage
              src={`https://finance-categories.s3.ap-south-1.amazonaws.com/category/${
                category?.type ?? "not"
              }-${category?.name ?? "tagged"}.png`}
            />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          {`${category?.type ?? "Not"}-${category?.name ?? "Tagged"}`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CategoryIcon;
