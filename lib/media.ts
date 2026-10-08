export type ImageCompletion = {
  complete: boolean;
  naturalWidth: number;
};

export function hasLoadedImage(image: ImageCompletion | null | undefined) {
  return Boolean(image?.complete && image.naturalWidth > 0);
}
