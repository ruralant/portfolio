import type { AppTypes } from "$app/types";

export type Pathname = ReturnType<AppTypes["Pathname"]>;

export interface PostMetadata {
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  tags: string[];
  published: boolean;
  date: string;
  layout: string;
  mainImage?: string;
  mainImageAlt?: string;
}

export interface PostSummary {
  meta: PostMetadata;
  path: Pathname;
}

export interface TechStack {
  frontEnd: string[];
  backEnd: string[];
  tools: string[];
}

export interface Company {
  name: string;
  from: string;
  to: string;
  location: string;
  sector: string;
  role: string;
  techStack: TechStack;
  description: string[];
  url: string;
}

export interface ThemeState {
  mode: "light" | "dark";
}
