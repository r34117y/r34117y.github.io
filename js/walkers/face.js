/**
 * Face API:
 * @link https://github.com/justadudewhohacks/face-api.js
 * Modele pobrane z:
 * @link https://github.com/WebDevSimplified/Face-Detection-JavaScript
 * Tutorial:
 * @link https://www.youtube.com/watch?v=CVClHLwv-4I&feature=youtu.be
 */

const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        function (stream) {
            video.srcObject = stream;
        },
        function (error) {
           console.error(error)
        }
    )
}

video.addEventListener('play', function () {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = {width: video.width, height: video.height};
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async function () {
        const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRectangle(0,0,canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100)
})