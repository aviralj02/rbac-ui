export type DocSection = {
  title: string;
  level?: 1 | 2; // 1 for main heading (h2), 2 for subheading (h3)
  blocks: DocBlock[];
};

export type DocBlock =
  | {
      kind: "bullets";
      items: string[];
    }
  | {
      kind: "paragraphs";
      items: string[];
    }
  | {
      kind: "code";
      code: string;
      title?: string;
    };

export function bullets(...items: string[]): DocBlock {
  return { kind: "bullets", items };
}

export function paragraphs(...items: string[]): DocBlock {
  return { kind: "paragraphs", items };
}

export function codeBlock(code: string, title?: string): DocBlock {
  return { kind: "code", code, title };
}
