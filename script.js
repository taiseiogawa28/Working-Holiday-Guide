const tasks = document.querySelectorAll(".task");
// 開いているHTMLページ全体からclass="task"がついている要素を全部探す
const progressText = document.getElementById("progress-text");
// HTML内の<p id="progress-text">Progress: 0%</p>取得
const progressBar = document.getElementById("progress-bar"); 
// <div id="progress-bar"></div>を取得

function updateProgress() {

    console.log("update!");
    
    let checkedCount = 0;  // let 変数宣言
tasks.forEach(function(task) {     // チェックボックスをすべて確認し、チェック済みのタスクをカウントする 
    if (task.checked) {
        checkedCount++;
    }
});

const progress = Math.round((checkedCount / tasks.length)*100);
// 進捗率の計算    

progressText.textContent = "Progress: " + progress + "%"; 
// Progress表示を更新
progressBar.style.width = progress + "%";
// 進捗バーの表示を更新

}

tasks.forEach(function(task){ 
    // 各チェックボックスについてイベントが発生したかどうか確認する
    task.addEventListener("change", updateProgress);
    // チェックボックスが変わったら、updateProgress()を実行する
});