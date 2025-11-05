import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function UserAvatar() {
  return (
    <Link href={"/"}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
}

export default UserAvatar;
