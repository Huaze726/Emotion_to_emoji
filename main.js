prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById('camera');
Webcam.attach("#camera");

function takesnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_img" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version =", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);
function modelLoaded() {
    console.log('modelLoaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is - " + prediction1;
    speak_data2 = "The second prediction is - " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function image() {
    img = document.getElementById("capture_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("pred1").innerHTML = result[0].label;
        document.getElementById("pred2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();
        if(result[0].label == "happy") {
            document.getElementById("update_emoji").innerHTML = "😀";
        }
        if(result[0].label == "sad") {
            document.getElementById("update_emoji").innerHTML = "☹️";
        }
        if(result[0].label == "angry") {
            document.getElementById("update_emoji").innerHTML = "😡";
        }

        if(result[1].label == "happy") {
            document.getElementById("update_emoji1").innerHTML = "😀";
        }
        if(result[1].label == "sad") {
            document.getElementById("update_emoji1").innerHTML = "☹️";
        }
        if(result[1].label == "angry") {
            document.getElementById("update_emoji1").innerHTML = "😡";
        }
    }
}