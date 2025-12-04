import { UserAvatar } from "@/components";
import ROUTES from "@/constants/route";
import { BlogType } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  blog: BlogType;
};

function BlogCard({
  blog: { imageUrl, title, date, description, author, role, authorImage, _id },
}: Props) {
  return (
    <Link
      href={ROUTES.VIEWBLOG(_id)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-light-800 dark:bg-dark-500 border border-gray-300 dark:border-dark-400 transition-colors duration-300 hover:border-white/20"
    >
      <div className="relative w-full h-60 aspect-video sm:aspect-2/1 lg:aspect-3/2 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="object-cover size-full"
          width={100}
          height={100}
        />
      </div>

      <div className="flex w-full flex-col justify-between p-6">
        <div className="text-xs text-light-400 dark:text-light-500">
          {/* <time datetime=""></time> */}
          <p>{date}</p>
        </div>

        <div className="group relative mt-3 grow">
          <h3 className="text-lg font-semibold  group-hover:text-dark/80 dark:group-hover:text-white/80 transition-all line-clamp-2">
            {title}
          </h3>

          <p className="mt-4 line-clamp-3 text-sm text-gray-400">
            {description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-x-4">
          <UserAvatar
            className="size-10"
            image={authorImage}
            name={author}
            id="/"
          />

          <div className="text-sm">
            <p className="font-semibold">{author}</p>

            <p className="text-light-400 dark:text-light-500">{role}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
