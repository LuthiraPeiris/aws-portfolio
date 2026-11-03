type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: Props) {
  return (
    <div className="max-w-2xl">
      
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base text-slate-600 leading-7">
          {description}
        </p>
      )}
    </div>
  );
}