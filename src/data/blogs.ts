export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  image_desktop: string;
  image_mobile: string;
  tone: "teal" | "purple" | "gold";
  hidden: boolean;
  created_at: string;
};
