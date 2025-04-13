import useAudioRecorder from "../hooks/useAudioRecorder.tsx";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { LuSquare } from "react-icons/lu";
import { PiWaveform } from "react-icons/pi";

type AudioProps = {
  onStopRecording: (blob: Blob) => void;
};

export type AudioRefType = {
  startRecording: () => void;
  stopRecording: () => void;
};

const Audio = forwardRef<AudioRefType, AudioProps>(
  ({ onStopRecording }, ref) => {
    const { startRecording, stopRecording, isRecording, mediaRecorder } =
      useAudioRecorder();

    useEffect(() => {
      if (mediaRecorder) {
        mediaRecorder.ondataavailable = (event) => onStopRecording(event.data);
      }
    }, [mediaRecorder]);

    useImperativeHandle(ref, () => ({
      startRecording,
      stopRecording,
    }));

    return (
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="group bg-primary-fourth hover:bg-primary-fourth/90 size-14 rounded-full transition-colors cursor-pointer active:scale-90 transition duration-200"
      >
        <div className="flex justify-center">
          {isRecording ? (
            <div className="relative">
              <div className="absolute inset-0 bg-primary-fourth rounded-full animate-ping opacity-75" />
              <div className="relative rounded-full p-4">
                <LuSquare className="text-black size-6" />
              </div>
            </div>
          ) : (
            <PiWaveform className="text-black size-6" />
          )}
        </div>
      </button>
    );
  },
);

export default Audio;
