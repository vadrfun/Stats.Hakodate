const entryPattern = document.getElementById("entry_pattern");
const deletePattern = document.getElementById("delete_pattern");
// const errorPattern = document.getElementById("error_pattern");
const pattern_list = ["A: 誤字", "B: フォントサイズ", "C: 中央揃えになるもの", "D: 右揃えになるもの</option>", "E: 半角に直すもの", "F: セルの幅が足りない"];

function createSelectBox(){
    const newPattern = document.getElementById("new_pattern");
    let op = document.createElement("option");
    op.text = newPattern.value;   //テキスト値
    
    if(op.text != ""){
        errorPattern.appendChild(op);
        console.log(op.text)
        db.pattern
          .put({
              name:newPattern.value, time: now_time()
          })
    }
    newPattern.value = "";
};

function deleteSelectBox(){
    var selectLast = errorPattern.lastElementChild;
    if(pattern_list.includes(selectLast.textContent) == false){
        var remove_element = errorPattern.removeChild(selectLast);
        db.pattern
          .delete(selectLast.textContent)   // データを削除(Promiseが返る)
          // エラー処理
          .catch((error)=>{
              console.error(error);
          });
    }
};

entryPattern.addEventListener('click',createSelectBox);
deletePattern.addEventListener('click',deleteSelectBox);


