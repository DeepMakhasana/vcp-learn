import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const VideoPlayer = ({ source }: { source: string | undefined }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const defaultOptions: any = {};

    if (Hls.isSupported() && videoRef.current) {
      console.log("HLS is supported!");

      const hls = new Hls({
        maxBufferLength: 30, // Maximum buffer size in seconds
        maxBufferSize: 40 * 100000, // Maximum buffer size in bytes
        maxBufferHole: 0.5, // Maximum hole size in buffered data (in seconds)
      });

      hls.loadSource(source);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!hls.levels || hls.levels.length === 0) return;

        const availableQualities = hls.levels.map((level) => level.height);
        console.log("Available qualities: ", availableQualities);

        defaultOptions.controls = [
          "play-large", // The large play button in the center
          // "restart", // Restart playback
          "rewind", // Rewind by the seek time (default 10 seconds)
          "play", // Play/pause playback
          "fast-forward", // Fast forward by the seek time (default 10 seconds)
          "progress", // The progress bar and scrubber for playback and buffering
          "current-time", // The current time of playback
          "duration", // The full duration of the media
          "mute", // Toggle mute
          // "volume", // Volume control
          // "captions", // Toggle captions
          "settings", // Settings menu
          "airplay", // Airplay (currently Safari only)
          "fullscreen", // Toggle fullscreen
        ];
        defaultOptions.speed = {
          selected: 1,
          options: [0.5, 0.75, 1, 1.5, 1.75, 2],
        };
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (newQuality: number) => updateQuality(newQuality),
        };

        new Plyr(videoRef.current!, defaultOptions);
      });

      hls.attachMedia(videoRef.current);
      window.hls = hls;

      // Clean up on component unmount
      return () => {
        hls.destroy();
        window.hls = null;
      };
    }
  }, [source]);

  function updateQuality(newQuality: number) {
    console.log("Changing quality to: ", newQuality);
    if (!window.hls || !window.hls.levels) return;

    window.hls.levels.forEach((level: any, levelIndex: number) => {
      if (level.height === newQuality) {
        window.hls.currentLevel = levelIndex;
      }
    });
  }

  return (
    <div className="w-full h-auto">
      <video ref={videoRef} className="plyr-react plyr w-full h-auto" />
    </div>
  );
};

export default VideoPlayer;
