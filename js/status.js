const notyetBtn = document.getElementById("not_yet");
const midwayBtn = document.getElementById("midway");
const doneBtn = document.getElementById("done");

function statusChange(e){
    var color;
    console.log(imgName);
    // console.log(document.querySelector(src=imgName));
    if(e.target.id == "not_yet"){
        color = "#8a1414";
        document.getElementById(imgId).closest("div").style.border = "5px solid "+color;
        console.log("まだまだ！");
    }else if(e.target.id == "midway"){
        color = "#cbc456";
        document.getElementById(imgId).closest("div").style.border = "5px solid "+color;
        console.log("まだ！");
    }else if(e.target.id == "done"){
        color = "#3a904e";
        console.log("おわった！");
        document.getElementById(imgId).closest("div").style.border = "5px solid "+color;
    }

    db.c_status
      .delete(imgName)

    db.c_status
      .put({
        time: now_time(), src: imgName, backgroundcolor: color
      })
}


notyetBtn.addEventListener('click',statusChange);
midwayBtn.addEventListener('click',statusChange);
doneBtn.addEventListener('click',statusChange);
// hoge.addEventListener("click", e => {
//     e.target.style.backgroundColor = "#ff0000";
// });