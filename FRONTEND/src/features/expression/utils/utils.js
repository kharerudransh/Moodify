import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// ---------- Model Setup ----------
export const createFaceLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  return await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    outputFaceBlendshapes: true,
    numFaces: 1,
  });
};

// ---------- Init: model + camera dono ----------
export const initFaceExpression = async (videoRef, landmarkerRef) => {
  landmarkerRef.current = await createFaceLandmarker();

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480, facingMode: "user" },
  });

  videoRef.current.srcObject = stream;

  await new Promise((resolve) => {
    if (videoRef.current.readyState >= 2) resolve();
    else videoRef.current.onloadeddata = resolve;
  });

  return stream;
};

// ---------- Emotion Classifier ----------
export const classifyEmotion = (shapes, faceDetected) => {
  if (!faceDetected) {
    return { emotion: "🚫 No Face Detected", confidence: 0 };
  }

  const s = Object.fromEntries(shapes.map((b) => [b.categoryName, b.score]));
  const get = (name) => s[name] || 0;

  const smile = Math.max(get("mouthSmileLeft"), get("mouthSmileRight"));
  const frown = Math.max(get("mouthFrownLeft"), get("mouthFrownRight"));
  const jaw = get("jawOpen");
  const browDown = (get("browDownLeft") + get("browDownRight")) / 2;
  const browInner = get("browInnerUp");
  const browOuter = Math.max(get("browOuterUpLeft"), get("browOuterUpRight"));
  const eyeWide = (get("eyeWideLeft") + get("eyeWideRight")) / 2;
  const eyeSquint = (get("eyeSquintLeft") + get("eyeSquintRight")) / 2;
  const shrug = Math.max(get("mouthShrugUpper"), get("mouthShrugLower"));
  const press = (get("mouthPressLeft") + get("mouthPressRight")) / 2;
  const sneer = Math.max(get("noseSneerLeft"), get("noseSneerRight"));

  if (smile > 0.42 && jaw < 0.08 && frown < 0.10) {
    return { emotion: "😊 Happy", confidence: Math.min(100, Math.round(smile * 170)) };
  }
  if (smile > 0.32 && jaw > 0.10) {
    return { emotion: "🥳 Excited", confidence: Math.min(100, Math.round((smile + jaw) * 120)) };
  }
  if (jaw > 0.16 && browInner > 0.18 && browOuter > 0.12) {
    return { emotion: "😮 Surprised", confidence: Math.min(100, Math.round((jaw + browInner + browOuter) * 100)) };
  }
  if (browDown > 0.30 && (press > 0.10 || sneer > 0.10)) {
    return { emotion: "😠 Angry", confidence: Math.min(100, Math.round((browDown + press + sneer) * 100)) };
  }
  if (frown > 0.18 && shrug > 0.12) {
    return { emotion: "😢 Sad", confidence: Math.min(100, Math.round((frown + shrug) * 180)) };
  }
  if (frown > 0.08 && smile < 0.12 && jaw < 0.08) {
    return { emotion: "😕 A Little Sad", confidence: Math.min(100, Math.round(frown * 250)) };
  }
  if (eyeWide > 0.18 && browInner > 0.18 && jaw > 0.08) {
    return { emotion: "😨 Fear", confidence: Math.min(100, Math.round((eyeWide + browInner + jaw) * 100)) };
  }

  const activity =
    smile * 2 + frown * 2 + jaw + browDown + browInner + browOuter +
    shrug + press + sneer + eyeWide + eyeSquint;

  if (activity < 0.22) {
    return { emotion: "😐 Neutral", confidence: 95 };
  }

  return { emotion: "😕 A Little Sad", confidence: 55 };
};

// ---------- Detect: countdown + 30-frame voting ----------
export const detectExpression = async (videoRef, landmarkerRef, setCountdown) => {
  for (let c = 3; c > 0; c--) {
    setCountdown(c);
    await new Promise((r) => setTimeout(r, 1000));
  }
  setCountdown(null);

  const votes = {};
  const confidenceSum = {};

  for (let i = 0; i < 30; i++) {
    const detection = landmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now()
    );

    const faceDetected = detection.faceBlendshapes?.length > 0;
    const shapes = faceDetected ? detection.faceBlendshapes[0].categories : [];
    const { emotion, confidence } = classifyEmotion(shapes, faceDetected);

    votes[emotion] = (votes[emotion] || 0) + 1;
    confidenceSum[emotion] = (confidenceSum[emotion] || 0) + confidence;

    await new Promise((r) => setTimeout(r, 35));
  }

  const bestEmotion = Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0];
  const avgConfidence = Math.round(confidenceSum[bestEmotion] / votes[bestEmotion]);

  return { emotion: bestEmotion, confidence: avgConfidence };
};