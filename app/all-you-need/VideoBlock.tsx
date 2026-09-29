"use client";

import { useState } from "react";

export default function VideoBlock({
  youtubeId,
  title,
  fallbackImg,
  fallbackHref,
}: {
  youtubeId: string;
  title: string;
  fallbackImg: string;
  fallbackHref: string;
}) {
  const [playing, setPlaying] = useState(false);
  const thumb = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg` : fallbackImg;

  if (!youtubeId) {
    return (
      <a className="ayn-video" href={fallbackHref} target="_blank" rel="noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt={title} />
        <span className="ayn-video-veil" />
        <span className="ayn-video-play" aria-hidden="true" />
        <span className="ayn-video-cap">{title}</span>
      </a>
    );
  }

  if (playing) {
    return (
      <div className="ayn-video is-live">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button className="ayn-video" type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumb} alt={title} />
      <span className="ayn-video-veil" />
      <span className="ayn-video-play" aria-hidden="true" />
      <span className="ayn-video-cap">{title}</span>
    </button>
  );
}
