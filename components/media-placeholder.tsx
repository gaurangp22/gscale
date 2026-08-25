import { ImageSquare } from "@phosphor-icons/react/dist/ssr";

export function MediaPlaceholder({
  label,
  note = "Replace with an approved documentary photograph",
  className = "",
}: {
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={`media-placeholder ${className}`} role="img" aria-label={`${label}. ${note}.`}>
      <ImageSquare size={30} weight="thin" aria-hidden />
      <strong>{label}</strong>
      <span>{note}</span>
    </div>
  );
}
