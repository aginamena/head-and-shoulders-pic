let bodyPose;
let poses = [];
let video;

let appInterval = null;
let firstTime = true;
function preload() {
  bodyPose = ml5.bodyPose("BlazePose");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  bodyPose.detectStart(video, (result) => (poses = result));
  connections = bodyPose.getSkeleton();
}

function draw() {
  image(video, 0, 0, width, height);

  if (firstTime) {
    firstTime = false;
    appInterval = setInterval(app, 15000);
  }
}
function voicePrompt(text) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  window.speechSynthesis.speak(msg);
}

function inFullView() {
  if (poses.length == 0) return false;
  const confidenceScore = 0.8;
  const { left_shoulder, right_shoulder, left_eye, right_eye } = poses[0];
  return (
    left_shoulder.confidence > confidenceScore &&
    right_shoulder.confidence > confidenceScore &&
    left_eye.confidence > confidenceScore &&
    right_eye.confidence > confidenceScore
  );
}

function app() {
  voicePrompt("Please position your face and shoulders in view");
  if (poses.length > 0 && inFullView()) {
    voicePrompt("Preparing to take your photo. In 5, 4, 3, 2, 1");
    setTimeout(() => {
      if (inFullView()) {
        saveCanvas("pic.jpg");
        voicePrompt("Your photo has been taken and saved to your system");
        clearInterval(appInterval);
      } else {
        voicePrompt(
          "Sorry, I am unable to detect your face and shoulders. Please adjust your position."
        );
      }
    }, 10000);
  }
}

document.getElementById("retakePhoto").addEventListener("click", () => {
  firstTime = true;
});
