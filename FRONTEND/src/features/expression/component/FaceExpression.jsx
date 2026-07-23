import { useEffect, useRef, useState } from "react";
import "./FaceExpression.css";
import { initFaceExpression, detectExpression as runDetection } from "../utils/utils";


function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState({ emotion: "😐 Neutral", confidence: 0 });
  const [detecting, setDetecting] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        streamRef.current = await initFaceExpression(videoRef, landmarkerRef);
        if (!cancelled) setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setErrorMsg(err.message || "Initialization failed");
        }
      }
    })();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      landmarkerRef.current?.close?.();
    };
  }, []);

  const handleDetect = async () => {
    if (detecting) return;
    setDetecting(true);
    const finalResult = await runDetection(videoRef, landmarkerRef, setCountdown);
    setResult(finalResult);
    setDetecting(false);
  };

  return (
    <div className="container">
      <h1 className="heading">😊 Moodify</h1>
      <p className="subtitle">Your Mood. Your Music</p>

      <div className="videoContainer">
        <video ref={videoRef} autoPlay playsInline muted className="video" />
        {countdown && <div className="countdown">{countdown}</div>}
      </div>

      {status === "loading" && <h3 className="loading">Loading Camera...</h3>}
      {status === "error" && <h3 className="error">{errorMsg}</h3>}

      {status === "ready" && (
        <>
          <div className="resultCard">
            <h2 className="emotion">{result.emotion}</h2>
            <p className="confidence">Confidence: {result.confidence}%</p>
            <div className="progressBar">
              <div className="progress" style={{ width: `${result.confidence}%` }} />
            </div>
          </div>

          <button className="detectBtn" disabled={detecting} onClick={handleDetect}>
            {detecting ? "🔍 Detecting..." : "Detect Expression"}
          </button>
        </>
      )}

      <p className="footer">Powered by MediaPipe Face Landmarker</p>
    </div>
  );
}

export default FaceExpression;