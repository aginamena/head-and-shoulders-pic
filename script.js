let bodyPose;
let poses = [];
let video;

let appInterval = null;
let firstTime = true;
function preload() {
  bodyPose = ml5.bodyPose("BlazePose", { flipped: true });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  bodyPose.detectStart(video, (result) => (poses = result));
  connections = bodyPose.getSkeleton();
}

function draw() {
  image(video, 0, 0);
  //display the vertical lines that will serve as borders to position the viewer
  stroke(255, 0, 0);
  strokeWeight(2);
  line(100, 480, 100, 0);
  line(540, 480, 540, 0);
  //display the shoulders keypoints
  if (poses.length > 0) {
    const { left_shoulder, right_shoulder } = poses[0];
    fill(0, 255, 0);
    noStroke();
    circle(left_shoulder.x, left_shoulder.y, 10);
    circle(right_shoulder.x, right_shoulder.y, 10);
  }
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
      const feedback = getDirectionalFeedback();
      if (feedback.length > 0) {
        voicePrompt(feedback);
      } else if (inFullView()) {
        saveCanvas("pic.jpg");
        voicePrompt("Your photo has been taken and saved to your system");
        clearInterval(appInterval);
      }
    }, 10000);
  }
}

function getDirectionalFeedback() {
  if (poses.length == 0)
    return "Sorry, I am unable to detect your face and shoulders. Please adjust your position.";
  const { left_shoulder, right_shoulder } = poses[0];
  //100px from the left
  if (left_shoulder.x <= 150)
    return "Please move slightly to your left to center your body in the camera";
  //490px from the left
  else if (right_shoulder.x >= 490)
    return "Please move slightly to your right to center your body in the camera";
  return "";
}

function mousePressed() {
  console.log(poses[0]);
}

document.getElementById("retakePhoto").addEventListener("click", () => {
  firstTime = true;
});
