// Video URL yardımcı fonksiyonları

/**
 * YouTube URL'sinden video ID'yi çıkarır
 */
export function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * Vimeo URL'sinden video ID'yi çıkarır
 */
export function getVimeoVideoId(url: string): string | null {
  const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

/**
 * Video URL'sinin tipini belirler
 */
export function getVideoType(url: string): "youtube" | "vimeo" | "direct" {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  if (url.includes("vimeo.com")) {
    return "vimeo";
  }
  return "direct";
}

/**
 * YouTube embed URL'si oluşturur
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = true, muted: boolean = true, loop: boolean = true): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: muted ? "1" : "0",
    loop: loop ? "1" : "0",
    playlist: loop ? videoId : "",
    controls: "0",
    showinfo: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Vimeo embed URL'si oluşturur
 */
export function getVimeoEmbedUrl(videoId: string, autoplay: boolean = true, muted: boolean = true, loop: boolean = true): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    muted: muted ? "1" : "0",
    loop: loop ? "1" : "0",
    background: "1",
    controls: "0",
  });
  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}


















