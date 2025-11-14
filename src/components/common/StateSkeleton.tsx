import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

type Props = {
  image: {
    light: string;
    dark: string;
    alt: string;
  };
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
};

function StateSkeleton({ image, title, message, button }: Props) {
  return (
    <div className="mt-16 w-full flex flex-col items-center justify-center sm:mt-20 ">
      <>
        <Image
          src={image.dark}
          alt={image.alt}
          width={270}
          height={200}
          className="hidden object-contain dark:block"
        />

        <Image
          src={image.light}
          alt={image.alt}
          width={270}
          height={200}
          className="block object-contain dark:hidden"
        />
      </>

      <h2 className="h2-bold text-dark-200 dark:text-white mt-8">{title}</h2>

      <p className="body-regular text-dark-500 dark:text-light-700 my-3.5 max-w-md text-center ">
        {message}
      </p>
      {button && (
        <Link href={button.href}>
          <Button className="paragraph-medium mt-5 min-h-11 rounded-lg bg-primary-500 px-4 py-2.5 text-white hover:bg-primary-500/70 cursor-pointer">
            {button.text}
          </Button>
        </Link>
      )}
    </div>
  );
}

export default StateSkeleton;
