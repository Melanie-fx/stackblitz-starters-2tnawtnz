// app/videos/news-section.tsx
'use client';
import type { NewsData } from '@/utils/api';

export default function NewsSection({ news }: { news: NewsData }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-800">Latest News</h2>
      <div className="space-y-6">
        {news?.articles?.slice(0, 5).map((article: any, index: number) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-100"
          >
            <h3 className="text-lg font-medium dark:text-gray-800">{article.title}</h3>
            <p className="text-sm text-gray-400 mt-2 dark:text-gray-600">{article.description}</p>
            <a
              href={article.url}
              className="text-blue-400 hover:underline mt-2 inline-block dark:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
        )) || <p className="text-red-400 dark:text-red-600">News unavailable</p>}
      </div>
    </section>
  );
}
