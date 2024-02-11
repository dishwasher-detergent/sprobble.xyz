import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string | React.ReactNode;
  sub: string;
  className?: string;
}

export function Header({ title, sub, className }: HeaderProps) {
  return (
    <section
      className={cn(
        "relative mb-12 rounded-3xl px-4 pb-36 pt-24 xl:pb-64",
        className,
      )}
    >
      <p className="text-primary relative z-10 text-center text-xl font-bold md:text-3xl">
        {sub}
      </p>
      <h1 className="flex flex-col text-center text-6xl font-black md:text-7xl lg:text-8xl">
        {title}
      </h1>
      <div className="aurora absolute inset-0 rounded-3xl opacity-30 xl:-ml-[5%] xl:w-[110%]" />
    </section>
  );
}
