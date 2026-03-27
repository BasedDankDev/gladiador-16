import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles, getArticleBySlug } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-black text-white min-h-screen">
        {/* Hero banner */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10">
            <span className="text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic mt-2 max-w-3xl leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-white/50">
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-20">
          {/* Intro */}
          <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-16 border-l-2 border-gold pl-6">
            {article.intro}
          </p>

          {/* Sections */}
          {article.sections.map((section, i) => (
            <section key={i} className="mb-16">
              <h2 className="text-xl md:text-2xl font-black tracking-tight uppercase italic text-white mb-6">
                {section.subtitle}
              </h2>

              {section.image && (
                <div className="relative w-full aspect-square max-w-sm mx-auto mb-8 bg-white/5 rounded-lg overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.imageAlt || section.subtitle}
                    fill
                    className="object-contain p-4"
                    sizes="400px"
                  />
                </div>
              )}

              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-[15px] md:text-base text-white/60 leading-relaxed mb-4 font-light"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          {/* Back link */}
          <div className="border-t border-white/10 pt-8">
            <Link
              href="/#editorial"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-white transition-colors tracking-wider uppercase"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver a Exclusivas
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
