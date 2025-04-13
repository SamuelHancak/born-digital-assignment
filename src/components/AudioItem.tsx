import { useCallback, useRef, useMemo } from "react";
import { LuPlay, LuPause } from "react-icons/lu";
import { useWavesurfer } from "@wavesurfer/react";

export type AudioItemProps = {
  blob: Blob;
  id: number;
  isPrimary?: boolean;
};

const AudioItem = ({ blob, isPrimary }: AudioItemProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);

  const blobUrl = useMemo(() => URL.createObjectURL(blob), [blob]);

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: waveformRef,
    url: blobUrl,
    autoplay: !isPrimary,
    waveColor: "#8e848f",
    progressColor: isPrimary ? "#4f1650" : "#dd86df",
    barWidth: 2,
    barGap: 3,
    height: 40,
    normalize: true,
  });

  const togglePlayback = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <div
      className={`flex items-center gap-4 bg-white/5 rounded-lg py-4 ${!isPrimary && "flex-row-reverse"}`}
    >
      <div className="flex-1">
        <div ref={waveformRef} />
      </div>
      <button
        onClick={togglePlayback}
        className={`${isPrimary ? "transition bg-primary-first hover:bg-primary-first/90" : "bg-primary-fourth hover:bg-primary-fourth/90"} cursor-pointer size-8 rounded-full flex items-center justify-center transition-colors`}
      >
        {isPlaying ? (
          <LuPause className="text-white size-5" />
        ) : (
          <LuPlay className="text-white size-5" />
        )}
      </button>
    </div>
  );
};

export default AudioItem;
