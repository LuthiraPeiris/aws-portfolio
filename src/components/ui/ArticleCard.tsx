import { ExternalLink } from "lucide-react";
import { Article } from "@/data/articles";

type Props = {
  article: Article;
};

export function ArticleCard({ article }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        
        {/* ✅ Updated Image Container (no crop + fixed ratio) */}
        <div className="aspect-3/2 w-full overflow-hidden bg-slate-100">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Article
            </p>
            <ExternalLink className="h-4 w-4 text-slate-400 transition group-hover:text-slate-700" />
          </div>

          <h3 className="mt-3 text-lg font-semibold text-slate-900">
            {article.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600 line-clamp-3">
            {article.summary}
          </p>

          <p className="mt-4 text-xs text-slate-500">
            {new Date(article.publishedAt).toLocaleDateString("en-LK", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}