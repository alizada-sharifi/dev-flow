import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  href?: string;
  title: string;
  Icon: LucideIcon;
};

function ProfileLink({ href, title, Icon }: Props) {
  return (
    <div className="flex items-center justify-center gap-1">
      <Icon size={20} />
      {href ? (
        <Link href={href} className="paragraph-medium text-link-100">
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark-400 dark:text-light-700">
          {title}
        </p>
      )}
    </div>
  );
}

export default ProfileLink;
