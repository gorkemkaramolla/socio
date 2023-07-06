export function embedSite(link: string) {
  if (link.startsWith('https://soundcloud.com/')) {
    return `<iframe class="soundcloud" width='100%' height='166' allow='autoplay' src='https://w.soundcloud.com/player/?url=${link}&amp;auto_play=false&amp;color=%23000000&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true'></iframe>`;
  } else if (link.startsWith('https://www.youtube.com/')) {
    const videoId = extractYouTubeVideoId(link);

    if (videoId) {
      return `<iframe class="youtube" width='400' height='400' src='https://www.youtube.com/embed/${videoId}' title='YouTube video player' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'></iframe>`;
    }
  }
}

function extractYouTubeVideoId(link: string) {
  const url = new URL(link);
  const searchParams = new URLSearchParams(url.search);
  const videoId = searchParams.get('v');
  return videoId;
}
