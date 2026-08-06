// const tasks = document.querySelectorAll(".task");
// 開いているHTMLページ全体からclass="task"がついている要素を全部探す

const progressText = document.getElementById("progress-text");
// HTML内の<p id="progress-text">Progress: 0%</p>取得

const progressBar = document.getElementById("progress-bar"); 
// <div id="progress-bar"></div>を取得

const newTaskInput = document.getElementById("new-task-input"); 
// HTMLから入力欄<input id="new-task-input">を取得

const addTaskButton = document.getElementById("add-task-button"); 
// ボタン<button id="add-task-button"></button>を取得

const postArrivalList = document.getElementById("post-arrival-list"); 
// <ul id="post-arrival-list">を取得


function updateProgress() {
    const tasks = document.querySelectorAll(".task");
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


const initialTasks = document.querySelectorAll(".task");

initialTasks.forEach(function(task){ 
    // ページを開いた際、各チェックボックスについてイベントが発生したかどうか確認する
    task.addEventListener("change", updateProgress);
    // チェックボックスが変わったら、updateProgress()を実行する
});


function addTask() {
    const taskText = newTaskInput.value.trim();
    // 入力欄に入力されている内容をvalueで取得し保存, trimでもし前後に余分なスペース（空白文字など）があった場合に削除

    if (taskText === "") {
        return;
    } // もし入力欄が空なら終了

    const listItem = document.createElement("li"); // HTMLに新しい空のリストを作成し変数に保存
    const checkbox = document.createElement("input"); // 空のinputも作成し保存
    const deleteButton = document.createElement("button"); // 新しいボタンを作る


    checkbox.type = "checkbox"; // inputをcheckboxとして定義
    checkbox.className = "task"; // 他のcheckboxと一緒に処理できるようにクラス付け
    deleteButton.textContent = "✖"; //ボタンの中の文字を設定
    deleteButton.style.marginLeft = "10px"; //ボタンの左側に余白を追加
    
    listItem.appendChild(checkbox); // 先ほど作成したリストlistItemにcheckboxを子要素として追加
    listItem.appendChild(document.createTextNode(" " + taskText)); 
    //taskTextに保存していた入力内容を先頭に空白をつけてリストに追加（チェックボックスと文字の間に余白ができるように）
    listItem.appendChild(deleteButton); // 削除ボタンをリストliの子要素として追加

    postArrivalList.appendChild(listItem); // 新しく作成したリストをHTMLの<ul id="post-arrival-list">に追加

    checkbox.addEventListener("change", updateProgress); 
    //新しく作ったチェックボックスにも進捗率更新のupdateProgressを実行

    
    deleteButton.addEventListener("click", 
        function(){
            listItem.remove(); 
            updateProgress();
        }
    );
    // ボタンがクリックされたら、そのアイテムをリストから削除
    //　要素数が変わったので、進捗率の再計算

    
    newTaskInput.value = ""; 
    // 処理が終わったので入力欄を元に戻す、valueは代入して内容を書き換えることもできる

}

addTaskButton.addEventListener("click", addTask); //Add TaskボタンがクリックされたらaddTask関数を実行