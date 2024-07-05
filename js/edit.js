var wElement; //cell
var csvRow; //行
var csvCol; //列
var misValue; //修正前の値
const csv_area = document.getElementById("csv"); //前のjsファイルにあったら消すこと
const csvEntry = document.getElementById("csv_entry");
const csvDownload = document.getElementById("csv_download");
const tableList = document.getElementById("table_list");
const remarksValue = document.getElementById('remarks');
const errorPattern = document.getElementById("error_pattern");

//データベースを作る
const db = new Dexie("Stats-Hakodate");

//「Stats-Hakodate」というデータベース内に，「」という名前のテーブルを作成．
db.version(2)
  .stores({
    //time: タイムスタンプ，file: ファイル名, row: 行, col: 列，revision: 訂正前, correction: 訂正後，type: 型，remarks: 備考欄
    proofreading: "time,file,row,col,revision,correction,type,remarks"  
  });


//タイムスタンプを生成する関数
function now_time(){
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0"+(date.getMonth() + 1)).slice(-2);
    let day =  ("0"+date.getDate()).slice(-2);
    let hour =("0"+date.getHours()).slice(-2);
    let minute = ("0"+date.getMinutes()).slice(-2);
    let second = ("0"+date.getSeconds()).slice(-2);
    time_string = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ' ';

    return time_string;
}

function tableClick(argEnv){
    var wOut = '';
    
    // --- クリックされたエレメントを取得 ------------
    wElement = (argEnv.srcElement || argEnv.target);
    
    // --- TDのみ対象とする --------------------------
    if (wElement.tagName.toUpperCase() == 'TD'){
        if(!wElement.style.background){
            wElement.style.background = "#ff7f50";
        }else{
            wElement.style.background = null;
        }
        // --- 行・列・値の取得＆編集 ------------------
        csvRow = wElement.parentNode.sectionRowIndex;
        csvCol = wElement.cellIndex;
        wOut += '行:' + wElement.parentNode.sectionRowIndex +'    '/* '&nbsp;&nbsp;'*/
        wOut += '列:' + wElement.cellIndex + '    '/*'&nbsp;&nbsp;'*/;
        wOut += '値:' + wElement.innerHTML;
        misValue = wElement.innerHTML;

        // --- 結果表示 ------------------------------
        document.getElementById("clickKekka").innerHTML = wOut;
    }
   }

function entryValue(){
    var editContent = document.getElementById("edit_content");
    wElement.innerHTML = editContent.value;
    wElement.style.background = "#b7eb5e";

    let time =now_time();
    //テーブル「proofreading」に，各校正情報を格納
    db.proofreading
      .put({
        time: time, file: csvName, row: csvRow, col: csvCol, revision: misValue, correction: editContent.value, type: errorPattern.value, remarks: remarksValue.value
      })
}

function onCSVDownload() {
    var escaped = /,|\r?\n|\r|"/;
    var e = /"/g;
  
    // データ作成
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8BOMあり
    var csv = [], row = [], field, r, c;
    for (r=0;  r<tableList.rows.length; r++) {
      row.length = 0;
      for (c=0; c<tableList.rows[r].cells.length; c++) {
        field = tableList.rows[r].cells[c].textContent;
        row.push(escaped.test(field)? '"'+field.replace(e, '""')+'"': field);
        // 区切り、改行、エスケープ文字を含む場合、エスケープ文字文字で囲む（エスケープ文字は二重にする）
      }
      csv.push(row.join(','));
    }
    //var blob = new Blob([/*bom, */csv.join('\n')], {'type': 'text/csv'}); // BOMなし
    var blob = new Blob([bom, csv.join('\n')], {'type': 'text/csv'});
    
    var filename = "new_" + csvName;
    // 保存
    //IE10/11用(download属性が機能しないためmsSaveBlobを使用）
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    //その他ブラウザ
    } else {
        //BlobからオブジェクトURLを作成する
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        //ダウンロード用にリンクを作成する
        const download = document.createElement("a");
        //リンク先に上記で生成したURLを指定する
        download.href = url;
        //download属性にファイル名を指定する
        download.download = filename;
        //作成したリンクをクリックしてダウンロードを実行する
        download.click();
        //createObjectURLで作成したオブジェクトURLを開放する
        (window.URL || window.webkitURL).revokeObjectURL(url);
    }
}

csv_area.addEventListener("dblclick", tableClick, false);
csvEntry.addEventListener("click", entryValue, false);