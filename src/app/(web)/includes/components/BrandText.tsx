import { Fragment } from "react";

const BRAND = "Rhenis Nursing";

export default function BrandText({ text }: { text: string }) {
  const parts = text.split(BRAND);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="font-semibold text-sage">{BRAND}</span>
          )}
        </Fragment>
      ))}
    </>
  );
}
