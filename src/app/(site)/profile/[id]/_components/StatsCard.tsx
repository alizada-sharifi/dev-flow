import Image from "next/image";

type props = {
  image: string;
  value: number;
  title: string;
  alt: string;
};

function StatsCard({ image, value, title, alt }: props) {
  return (
    <div className="border bg-white dark:bg-dark-300 flex flex-wrap items-center justify-start gap-4 rounded-md p-6 shadow-light-100 dark:shadow-dark-200">
      <Image src={image} alt={alt} width={40} height={50} />

      <div>
        <p className="paragraph-semibold text-dark-200 dark:text-white">
          {value}
        </p>
        <p className="body-medium text-dark-400 dark:text-light-700">{title}</p>
      </div>
    </div>
  );
}

export default StatsCard;
