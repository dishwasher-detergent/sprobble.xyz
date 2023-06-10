import Image from "next/image";

interface HeaderProps {
  title: string;
  subTitle?: string;
  artwork?: string;
  artwork_name?: string;
}

export function Header({
  artwork,
  artwork_name,
  title,
  subTitle,
}: HeaderProps) {
  return (
    <div className="relative flex flex-col gap-6 md:flex-row">
      {artwork && artwork_name && (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-300 md:h-64 md:w-64">
          <Image src={artwork} fill alt={artwork_name} />
        </div>
      )}
      <div className="flex-1">
        <p className="text-lg font-bold">{subTitle}</p>
        <h2 className="text-3xl font-black dark:text-white md:text-8xl">
          {title}
        </h2>
      </div>
    </div>
  );
}
