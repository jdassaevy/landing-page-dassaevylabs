export type ImageCompletion = {
  complete: boolean;
  naturalWidth: number;
};

export type MediaStatus = "loading" | "ready" | "error";

export function hasLoadedImage(image: ImageCompletion | null | undefined) {
  return Boolean(image?.complete && image.naturalWidth > 0);
}

export function mediaImageIsVisible(status: MediaStatus) {
  return status !== "error";
}
