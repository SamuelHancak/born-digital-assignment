// implementation based on https://github.com/samhirtarif/react-audio-recorder/blob/master/src/hooks/useAudioRecorder.ts

import { useState, useCallback } from "react";
import {
  MediaRecorder,
  IMediaRecorder,
  register,
} from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
// @ts-ignore
import hark from "hark";

export interface recorderControls {
  startRecording: () => void;
  stopRecording: () => void;
  togglePauseResume: () => void;
  recordingBlob?: Blob;
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  mediaRecorder?: IMediaRecorder;
  mediaStream?: MediaStream;
}

const MIME_TYPE = "audio/wav" as const;

const useAudioRecorder: (
  mediaRecorderOptions?: MediaRecorderOptions,
) => recorderControls = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<IMediaRecorder>();
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [recordingBlob, setRecordingBlob] = useState<Blob>();

  const startRecording: () => void = async () => {
    await connect();
    if (!MediaRecorder.isTypeSupported(MIME_TYPE)) {
      await register(await connect());
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const speech = hark(stream, {
          interval: "150",
          threshold: "-100",
        });

        setIsRecording(true);
        setMediaStream(stream);
        const recorder = new MediaRecorder(stream, {
          mimeType: MIME_TYPE,
        });
        setMediaRecorder(recorder);
        recorder.start();

        recorder.ondataavailable = (event) => console.log(event);

        recorder.addEventListener("dataavailable", (event) => {
          setRecordingBlob(event.data);
          stream.getTracks().forEach((t) => t.stop());
          setMediaRecorder(undefined);
          setMediaStream(undefined);
        });

        speech.on("stopped_speaking", () => {
          stopRecording();
          stream.getTracks().forEach((t) => t.stop());
        });
      })
      .catch((err: DOMException) => {
        console.log(err.name, err.message);
      });
  };

  const stopRecording: () => void = useCallback(() => {
    mediaRecorder?.stop();
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
  }, [
    mediaRecorder,
    setRecordingTime,
    setIsRecording,
    setIsPaused,
    recordingBlob,
  ]);

  const togglePauseResume: () => void = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      mediaRecorder?.resume();
    } else {
      setIsPaused(true);
      mediaRecorder?.pause();
    }
  }, [mediaRecorder, setIsPaused]);

  return {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
    mediaStream,
  };
};

export default useAudioRecorder;
