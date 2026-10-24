const SMALL_WIDTH = 800

/**
 * src and srcSet for a photo that has a smaller copy next to it (name-800.ext, 800px wide).
 * `src` is a path relative to public/, like the ones in the content files; `fullWidth` is the width of that file.
 * Phones and small boxes download the small copy, big screens the original.
 */
export function responsiveImage(src: string, fullWidth: number) {
  const base = import.meta.env.BASE_URL
  const small = src.replace(/(\.[a-z0-9]+)$/i, `-${SMALL_WIDTH}$1`)
  return {
    src: `${base}${src}`,
    srcSet: `${base}${small} ${SMALL_WIDTH}w, ${base}${src} ${fullWidth}w`,
  }
}
