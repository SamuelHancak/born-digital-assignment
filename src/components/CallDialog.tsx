import { type FC, useEffect, useRef, useState } from "react";
import { LuPhone } from "react-icons/lu";
import Audio, { type AudioRefType } from "./Audio";
import AudioItem, { type AudioItemProps } from "./AudioItem.tsx";

type CallDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CallDialog: FC<CallDialogProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [blobs, setBlobs] = useState<Array<AudioItemProps>>([]);
  const audioRef = useRef<AudioRefType>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const hasBlobs = blobs.length > 0;

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8080");
    wsRef.current.onopen = () => console.log("WebSocket connected");
    wsRef.current.onclose = () => console.log("WebSocket disconnected");
    wsRef.current.onerror = (error) => console.error("WebSocket error:", error);

    return () => {
      wsRef.current?.readyState === WebSocket.OPEN && wsRef.current?.close();
    };
  }, []);

  const onStopRecording = (blob: Blob) => {
    setBlobs((prev) => [{ blob, isPrimary: true, id: prev.length }, ...prev]);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(blob);

      wsRef.current.onmessage = (event) => {
        const receivedData = event.data;
        setBlobs((prev) => [
          {
            blob: receivedData,
            isPrimary: false,
            hasPlayed: false,
            id: prev.length,
          },
          ...prev,
        ]);
      };
    }
  };

  const onCloseFn = () => {
    onClose();
    audioRef && audioRef.current?.stopRecording();
    setBlobs([]);
  };

  if (!isAnimating && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out
        ${isOpen ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCloseFn();
      }}
    >
      <div
        role="dialog"
        className={`overflow-hidden flex flex-col bg-linear-to-bl from-primary-sixth to-primary-seventh rounded-2xl shadow-xl p-9 w-full min-h-96 max-h-1/2 max-w-md relative transition-all duration-300 ease-in-out
          ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}`}
      >
        <div className="flex justify-between items-center pb-6">
          <span className="font-semibold text-primary-first">Call Jessica</span>

          <button
            onClick={onCloseFn}
            className="bg-[#ef7679] size-8 rounded-full hover:bg-red-400 transition-colors cursor-pointer"
          >
            <div className="flex justify-center">
              <LuPhone className="text-white rotate-135" />
            </div>
          </button>
        </div>

        {hasBlobs ? (
          <div className="overflow-auto h-full flex-auto">
            {blobs.map(({ blob, isPrimary, id }) => (
              <AudioItem key={id} id={id} blob={blob} isPrimary={isPrimary} />
            ))}
          </div>
        ) : null}

        <div
          className={`flex justify-center items-center ${!hasBlobs ? "h-full flex-auto" : "pt-8"}`}
        >
          <Audio ref={audioRef} onStopRecording={onStopRecording} />
        </div>
      </div>
    </div>
  );
};

export default CallDialog;
