export type DbPrintable = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  card_image_url: string;
  card_image_storage_path: string;
  file_url: string;
  file_type: "pdf" | "html";
  file_size_bytes: number | null;
  storage_path: string;
  hidden: boolean;
  created_at: string;
  updated_at: string;
};
