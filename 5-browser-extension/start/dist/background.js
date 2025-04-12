//add listener here
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'updateIcon') {
        chrome.action.setIcon({ imageData: drawIcon(msg.value) });
    }
});

//borrowed from energy lollipop extension
//draw the icon here
function drawIcon(value) {
    // Create an offscreen canvas
    let canvas = new OffscreenCanvas(200, 200); // Width and height of the canvas
    let context = canvas.getContext('2d');

    context.beginPath();
    context.fillStyle = value.color;
    context.arc(100, 100, 50, 0, 2 * Math.PI);
    context.fill();

    return context.getImageData(50, 50, 100, 100);
}