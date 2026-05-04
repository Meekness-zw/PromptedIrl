export interface DownloadStory {
  headline: string;
  body: string;
  link?: string;
}

export interface ToolOfWeek {
  name: string;
  description: string;
  usage: string;
  link?: string;
}

export interface Issue {
  id: string;
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  publishedAt: string;
  download: DownloadStory[];
  toolOfWeek: ToolOfWeek;
  hotTake: string;
  published: boolean;
}
