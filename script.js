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

const savedTasks = localStorage.getItem("customTasks"); // localStorageから保存されたタスクを取得

const savedTaskStates = localStorage.getItem("taskStates"); // localStorageから保存されたタスクの状態を取得

let taskStates = []; // タスクの状態を保存する配列を作成

if (savedTaskStates !== null) { // localStorageに保存されたタスクの状態がある場合
    taskStates = JSON.parse(savedTaskStates); // JSON文字列を配列に変換してtaskStatesに保存
} 


let customTasks = []; // 追加されたタスクを保存する配列を作成

if (savedTasks !== null) { // localStorageに保存されたタスクがある場合
    customTasks = JSON.parse(savedTasks); // JSON文字列を配列に変換してcustomTasksに保存
}

customTasks.forEach(function(taskText) { // 保存されたタスクを1つずつ取り出す
    createTaskElement(taskText); // タスクを作成する関数を呼び出す
}); 

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

// ページを閉じる前にタスクの状態を保存する
function saveTaskStates () {
    const tasks = document.querySelectorAll(".task");  // class="task"がついている要素を全部探す
    
    const taskStates = []; // タスクの状態を保存する配列を作成
    
    tasks.forEach(function(task) {  // チェックボックスの状態を配列に保存 true: チェック済み, false: 未チェック
        taskStates.push(task.checked);
    });
    
    localStorage.setItem("taskStates", JSON.stringify(taskStates)); // 配列をJSON文字列に変換してlocalStorageに保存
}

const initialTasks = document.querySelectorAll(".task"); // ページを開いた際、localStorageに保存されたタスクを表示する

//　保存したチェック状態を復元
initialTasks.forEach(function(task, index) { // ページを開いた際、localStorageに保存されたタスクの状態を復元する
    if (taskStates[index] !== undefined) { // タスクの状態が保存されている場合
        task.checked = taskStates[index]; // チェックボックスの状態を復元する
    }
});   

updateProgress(); // 進捗率を再計算することで、ページを開いた際に進捗率を正しく表示する

// チェック状態が変わったときの処理
initialTasks.forEach(function(task){  // ページを開いた際、localStorageに保存されたタスクの状態を復元する
    task.addEventListener("change", function() {  
        updateProgress();  // チェックボックスの状態が変わったら進捗率を更新する
        saveTaskStates();  // チェックボックスの状態を保存する  
    });
});


// ページを開いた際、localStorageに保存されたタスクを表示する
function createTaskElement(taskText) {
    const listItem = document.createElement("li"); // <li></li>を作成
    const checkbox = document.createElement("input"); // <input>を作成
    const deleteButton = document.createElement("button"); // <button></button>を作成

    checkbox.type = "checkbox"; // <input type="checkbox">にする
    checkbox.className = "task"; // class="task"をつける
    deleteButton.textContent = "✖"; // ボタンのテキストを設定
    deleteButton.style.marginLeft = "10px"; // ボタンの左側に余白を追加

    listItem.appendChild(checkbox); // <li>の中にチェックボックスを追加
    listItem.appendChild(document.createTextNode(" " + taskText)); // <li>の中にタスクのテキストを追加
    listItem.appendChild(deleteButton); // <li>の中に削除ボタンを追加

    postArrivalList.appendChild(listItem); // <ul>の中に<li>を追加

    checkbox.addEventListener("change", function() {  // チェックボックスが変わったら、updateProgress()を実行する
        updateProgress(); // チェックボックスの状態が変わったら進捗率を更新する
        saveTaskStates();  // チェックボックスの状態を保存する  
    });

    deleteButton.addEventListener("click", function() { // 削除ボタンがクリックされたら
        listItem.remove(); // <li>を削除する

        customTasks = customTasks.filter(function(task) { // 配列から削除されたタスクを取り除く
            return task !== taskText; // 削除されたタスク以外を残す
        });
        
        localStorage.setItem("customTasks", JSON.stringify(customTasks)); // 配列をJSON文字列に変換してlocalStorageに保存
        
        saveTaskStates(); // 削除後にタスクの状態を保存する
        updateProgress(); // 削除後に進捗率を更新する
        }
    );
}
    function addTask() { // 新しいタスクを追加する関数
    const taskText =
        newTaskInput.value.trim(); // 入力欄の値を取得し、前後の空白を削除

    if (taskText === "") { // 入力欄が空の場合は何もしない
        return;
    }

    createTaskElement(taskText); // 新しいタスクを作成する関数を呼び出す

    customTasks.push(taskText); // 配列に新しいタスクを追加

    localStorage.setItem( // 配列をJSON文字列に変換してlocalStorageに保存
        "customTasks",
        JSON.stringify(customTasks)
    );

    newTaskInput.value = ""; // 入力欄を空にする
}


addTaskButton.addEventListener("click", addTask); //Add TaskボタンがクリックされたらaddTask関数を実行
