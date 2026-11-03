import { articles } from "@/data/articles";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArticleCard } from "@/components/ui/ArticleCard";

export function ArticlesSection() {
  const sortedArticles = [...articles].sort((a, b) => {
    const idA = parseInt(String(a.id).replace(/\D/g, ""), 10);
    const idB = parseInt(String(b.id).replace(/\D/g, ""), 10);
    return idB - idA;
  });

  return (
    <section className="section">
      <div className="container-custom">
        
        <SectionTitle
          eyebrow="Articles"
          title="My writings and insights"
          description="A collection of articles I have written on IoT, cloud technologies, and practical engineering concepts."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

      </div>
    </section>
  );
}