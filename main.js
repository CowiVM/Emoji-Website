prediction = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})

camera = document.getElementById("camera")

Webcam.attach(camera);

function capture_image() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '" + data_uri + "'/>";
    })
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LZTk6KGME/model.json',modelLoaded)

function modelLoaded() {
    console.log("Model has successfully loaded");
}

function speak() {
    synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction;
    utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis)
}

function identify_image() {
    img = document.getElementById("captured_image")
    classifier.classify(img, getResult);
}

function getResult(error, results) {
    if (error) {
        console.error(error);    
    } else {
        console.log(results);
        document.getElementById("result_hand_gesture").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "Victory") {
            document.getElementById("result_hand_gesture").innerHTML = "&#9996;"
        }
        
        if (results[0].label == "Not Good") {
            document.getElementById("result_hand_gesture").innerHTML = "&#128078;"
        }

        if (results[0].label == "Yo") {
            document.getElementById("result_hand_gesture").innerHTML = "&#129304;"
        }

        if (results[0].label == "Nice") {
            document.getElementById("result_hand_gesture").innerHTML = "&#128076;"
        }

        if (results[0].label == "Amazing") {
            document.getElementById("result_hand_gesture").innerHTML = "&#128077;"
        }
    }
    
}