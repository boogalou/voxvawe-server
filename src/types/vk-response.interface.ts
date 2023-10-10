
export interface VkPhotoResponse {
  id: number;
  ownerId: number;
  albumId: number;
  largeSizeUrl: string;
  mediumSizeUrl: string;
  smallSizeUrl: string;
  text: string;
  sizes: SizesImage[];
}

export interface SizesImage {
  width: number;
  height: number;
  type: string;
  url: string;
}