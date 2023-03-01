import Link from "next/link";

interface LinkParagraphProps {
  paragraphText: string;
  linkText: string;
  linkHref: string;
}

export default function LinkParagraph({
  paragraphText,
  linkText,
  linkHref,
}: LinkParagraphProps) {
  return (
    <p className="mt-8">
      {paragraphText}{" "}
      <Link
        href={linkHref}
        className="text-blue-500 hover:text-blue-700 font-semibold"
      >
        {linkText}
      </Link>
    </p>
  );
}
