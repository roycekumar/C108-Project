Webcam.set({
    width:350,
    height:300,
    image_format:'jpeg',
    jpeg_quality:180
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'"/>'
    });
    document.getElementById("audio").play();
}
console.log("ml5 version : ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qOqZ_e1-T/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
}
function download(){
    link=document.getElementById("link");
    image=document.getElementById("captured_image").src;
    link.href=image;
    link.click();
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results,utterThis,synth,speak_data){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        if(results[0].label=="Best"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
            document.getElementById("result_gesture_name").innerHTML="All the best";
            var synth=window.speechSynthesis;
            speak_data="All the best";
            var utterThis=new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
        }
        if(results[0].label=="Amazing"){
            document.getElementById("update_gesture").innerHTML="&#128076;";
            document.getElementById("result_gesture_name").innerHTML="This is looking amazing";
            var synth=window.speechSynthesis;
            speak_data="This is looking amazing";
            var utterThis=new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
        }
        if(results[0].label=="Victory"){
            document.getElementById("update_gesture").innerHTML="&#9996;";
            document.getElementById("result_gesture_name").innerHTML="That was a marvelous victory";
            var synth=window.speechSynthesis;
            speak_data="That was a marvelous victory";
            var utterThis=new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
        }
    }
}