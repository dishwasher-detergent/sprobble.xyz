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
        "relative flex flex-col items-center rounded-3xl px-4 pb-20 pt-16 md:pb-36 md:pt-24 xl:pb-56",
        className,
      )}
    >
      {sub && (
        <div className="relative z-10 flex items-center justify-center text-center text-xl font-bold text-primary dark:text-primary-foreground md:text-3xl">
          {sub}
        </div>
      )}
      <div className="jsutify-center flex w-full flex-col items-center overflow-hidden break-words pb-4 text-center text-6xl font-black md:text-7xl lg:text-8xl">
        {title}
      </div>
      {altSub}
      <div className="aurora absolute inset-0 rounded-3xl opacity-30 xl:-ml-[5%] xl:w-[110%]" />
    </section>
  );
}
