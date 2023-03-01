interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
      {title}
    </h1>
  );
}
