"use client";

import { useEffect, useState } from "react";

type TermsSection = {
  title?: string;
  content: string;
};

const sectionStart = /^(?:\d+\.\s+[A-Z]|PLAIN-LANGUAGE SUMMARY:|FOR CLIENTS|FOR ERRANDERS|OPTIONAL ADVERTISING|ERRANDHUBB'S SIMPLE PRICING MODEL)/;

function formatTerms(text: string): TermsSection[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/^\d{1,2}$/.test(line) && line !== "•")
    .slice(2);

  const sections: TermsSection[] = [];
  let title: string | undefined;
  let content: string[] = [];

  const saveSection = () => {
    if (!title && content.length === 0) return;
    sections.push({ title, content: content.join(" ") });
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (sectionStart.test(line)) {
      saveSection();
      title = line;
      content = [];

      const followingLine = lines[index + 1];
      if (followingLine && /^[A-Z0-9'’\- ]+$/.test(followingLine)) {
        title = `${title} ${followingLine}`;
        index += 1;
      }
      continue;
    }

    content.push(line);
  }

  saveSection();
  return sections;
}

export default function TermsOfService() {
  const [sections, setSections] = useState<TermsSection[]>([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch("/legal/terms-of-service.txt")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load Terms of Service");
        return response.text();
      })
      .then((text) => {
        if (isMounted) setSections(formatTerms(text));
      })
      .catch(() => {
        if (isMounted) setLoadError(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <article className="prose max-w-none font-sans text-foreground">
      <div className="mb-6 border-b border-slate-100 pb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl">
          ErrandHubb Terms of Service
        </h1>
        <p className="mt-2 text-xs font-medium text-text-secondary sm:text-sm">
          Last Updated: <span className="font-semibold text-primary">August 13, 2026</span>
        </p>
      </div>

      {loadError ? (
        <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          The Terms of Service could not be loaded. Please refresh the page and try again.
        </p>
      ) : sections.length === 0 ? (
        <p className="text-sm text-text-secondary">Loading Terms of Service…</p>
      ) : (
        <div className="space-y-6 text-xs leading-relaxed text-foreground sm:text-[15px]">
          {sections.map((section, index) => (
            <section key={`${section.title ?? "introduction"}-${index}`}>
              {section.title && (
                <h2 className="mb-3 border-t border-slate-100 pt-5 text-base font-extrabold text-secondary sm:text-[20px]">
                  {section.title}
                </h2>
              )}
              <p className="whitespace-normal">{section.content}</p>
            </section>
          ))}
        </div>
      )}
    </article>
  );
}
