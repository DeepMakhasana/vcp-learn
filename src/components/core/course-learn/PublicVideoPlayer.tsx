const PublicVideoPlayer = ({ url }: { url: string }) => {
  function transformYouTubeUrl(shortUrl: string): string {
    const baseUrl = "https://youtu.be/";
    if (shortUrl.startsWith(baseUrl)) {
      const videoId = shortUrl.slice(baseUrl.length).split("?")[0]; // Extract the video ID before any query parameters
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`;
      }
    }
    throw new Error("Invalid YouTube URL");
  }

  return (
    <div className="w-full max-h-[560px] aspect-video">
      <iframe
        className="w-full h-full"
        src={transformYouTubeUrl(url)}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PublicVideoPlayer;
