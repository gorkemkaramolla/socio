import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const link = searchParams.get('link');
  if (link)
    if (link.startsWith('https://soundcloud.com/')) {
      return new NextResponse(
        JSON.stringify(
          `<iframe class="soundcloud" width='100%' height='166' allow='autoplay' src='https://w.soundcloud.com/player/?url=${link}&amp;auto_play=false&amp;color=%23000000&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true'></iframe>`
        ),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else if (link.startsWith('https://www.youtube.com/')) {
      const videoId = extractYouTubeVideoId(link);

      if (videoId) {
        return new NextResponse(
          JSON.stringify(
            `<iframe class="youtube" width='400' height='400' src='https://www.youtube.com/embed/${videoId}' title='YouTube video player' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'></iframe>`
          ),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': "",
            },
          }
        );
      }
    }
}

function extractYouTubeVideoId(link: string) {
  const url = new URL(link);
  const searchParams = new URLSearchParams(url.search);
  const videoId = searchParams.get('v');
  return videoId;
}
