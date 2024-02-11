import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string | React.ReactNode;
  sub?: string | React.ReactNode;
  altSub?: React.ReactNode;
  className?: string;
}

export function Header({ title, sub, altSub, className }: HeaderProps) {
  return (
    <section
      className={cn(
        "relative mb-12 flex flex-col items-center rounded-3xl px-4 pb-36 pt-24 xl:pb-64",
        className,
      )}
    >
      {sub && (
        <p className="text-primary relative z-10 text-center text-xl font-bold md:text-3xl">
          {sub}
        </p>
      )}
      <h1 className="flex flex-col pb-4 text-center text-6xl font-black md:text-7xl lg:text-8xl">
        {title}
      </h1>
      {altSub}
      <div className="aurora absolute inset-0 rounded-3xl opacity-30 xl:-ml-[5%] xl:w-[110%]" />
    </section>
  );
}
