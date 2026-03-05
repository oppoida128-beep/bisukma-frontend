import data from '@/app/lib/placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Menambahkan fallback array kosong untuk mencegah error jika data.placeholderImages tidak terdefinisi
export const PlaceHolderImages: ImagePlaceholder[] = data?.placeholderImages || [];
