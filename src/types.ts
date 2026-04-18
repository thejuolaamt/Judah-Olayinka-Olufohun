export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  imageUrl: string;
  description: string;
}

export type View = 'gallery' | 'about' | 'contact' | 'detail';
