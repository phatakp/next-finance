import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { cn } from "@/lib/utils";
import { FC } from "react";

type UserAvatarProps = {
  image: string | null | undefined;
  className?: string;
};

const UserAvatar: FC<UserAvatarProps> = ({ image, className }) => {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={image ?? "https://github.com/shadcn.png"} />
      <AvatarFallback>UA</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
