import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatarProps {
  name?: string;
  avatar: string;
  className?: string;
}

export default function UserAvatar({
  name,
  avatar,
  className,
}: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={avatar} />
      <AvatarFallback>
        {name != undefined ? name.split("").slice(0, 2).join() : ""}
      </AvatarFallback>
    </Avatar>
  );
}
