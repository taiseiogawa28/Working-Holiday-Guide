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

const filterAllButton = document.getElementById("filter-all"); 
// <button id="filter-all">All</button>を取得

const filterActiveButton = document.getElementById("filter-active"); 
// <button id="filter-active">Active</button>を取得

const filterCompleteButton = document.getElementById("filter-completed"); 
// <button id="filter-completed">Completed</button>を取得

let currentFilter = "all";

const savedTasks = localStorage.getItem("customTasks"); 
// localStorageから保存されたタスクを取得

const savedTaskStates = localStorage.getItem("taskStates"); 
// localStorageから保存されたタスクの状態を取得

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

function applyFilter() {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(function(task) {

        if(currentFilter === "all") {
            task.parentElement.style.display = ""; // すべてのタスクを表示する

        } else if (currentFilter ==="active") {
            if(task.checked) {
                task.parentElement.style.display = "none"; // チェック済みのタスクは非表示にする            
            } else {
                task.parentElement.style.display = ""; // 未チェックのタスクは表示する
            }

        } else if (currentFilter === "completed") {
            if(task.checked) {
                task.parentElement.style.display = ""; // チェック済みのタスクは表示する
            } else {
                task.parentElement.style.display = "none"; // 未チェックのタスクは非表示にする
            }
        }
    });
}

function updateFilterButtons() {

    filterAllButton.classList.remove("active-filter"); // すべてのフィルターボタンからactive-filterクラスを削除
    filterActiveButton.classList.remove("active-filter");   
    filterCompleteButton.classList.remove("active-filter");

    if (currentFilter === "all") {
        filterAllButton.classList.add("active-filter"); // "all"フィルターボタンにactive-filterクラスを追加
        
    } else if ( currentFilter === "active") {
        filterActiveButton.classList.add("active-filter"); // "active"フィルターボタンにactive-filterクラスを追加

    } else if ( currentFilter === "completed") {
        filterCompleteButton.classList.add("active-filter"); // "completed"フィルターボタンにactive-filterクラスを追加

    }
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
        applyFilter(); // フィルターを適用することで、チェック状態が変わったときにフィルターが正しく反映される 
    });
});


// ページを開いた際、localStorageに保存されたタスクを表示する
function createTaskElement(taskText) {
    const listItem = document.createElement("li"); // <li></li>を作成
    const checkbox = document.createElement("input"); // <input>を作成
    const deleteButton = document.createElement("button"); // <button></button>を作成
    const editButton = document.createElement("button"); // <button></button>を作成
    const taskTextNode = document.createTextNode("" + taskText); // タスクのテキストを作成
    

    checkbox.type = "checkbox"; // <input type="checkbox">にする
    checkbox.className = "task"; // class="task"をつける
    deleteButton.textContent = "✖"; // ボタンのテキストを設定
    deleteButton.style.marginLeft = "10px"; // ボタンの左側に余白を追加
    editButton.textContent = "Edit"; // ボタンのテキストを設定
    editButton.style.marginLeft = "10px"; // ボタンの左側に余白を追加

    listItem.appendChild(checkbox); // <li>の中にチェックボックスを追加
    listItem.appendChild(taskTextNode); // <li>の中にタスクのテキストを追加
    listItem.appendChild(editButton); // <li>の中に編集ボタンを追加
    listItem.appendChild(deleteButton); // <li>の中に削除ボタンを追加
    

    postArrivalList.appendChild(listItem); // <ul>の中に<li>を追加

    checkbox.addEventListener("change", function() {  // チェックボックスが変わったら、updateProgress()を実行する
        updateProgress(); // チェックボックスの状態が変わったら進捗率を更新する
        saveTaskStates();  // チェックボックスの状態を保存する  
        applyFilter(); // フィルターを適用することで、チェック状態が変わったときにフィルターが正しく反映される 
    });

    editButton.addEventListener("click", function() { // 編集ボタンがクリックされたら
        
        if (editButton.textContent === "Edit") { // 編集ボタンのテキストが"Edit"の場合})
            const editInput = document.createElement("input"); // <input>を作成

            editInput.type = "text"; // <input type="text">にする
            editInput.value = taskText; // <input>の値をタスクのテキストにする

            listItem.replaceChild(editInput, taskTextNode); // <li>の中のタスクのテキストを<input>に置き換える

            editButton.textContent = "Save"; // ボタンのテキストを変更
        } else {
            const editInput = listItem.querySelector('input[type="text"]'); // <li>の中の<input type="text">を取得

            const newTaskText = editInput.value.trim(); // <input>の値を取得し、前後の空白を削除

            if (newTaskText === "") { // 入力欄が空の場合は何もしない
                return;
            }

            const taskIndex = customTasks.indexOf(taskText); // 配列の中のタスクのインデックスを取得

            if (taskIndex !== -1) { // 配列の中にタスクが存在する場合
                customTasks[taskIndex] = newTaskText; // 配列の中のタスクを新しいタスクに置き換える    
            }

            taskTextNode.textContent = " " + newTaskText; // タスクのテキストを更新

            listItem.replaceChild(taskTextNode, editInput); // <li>の中の<input>をタスクのテキストに置き換える

            localStorage.setItem("customTasks", JSON.stringify(customTasks)); // 配列をJSON文字列に変換してlocalStorageに保存

            taskText = newTaskText; // タスクのテキストを更新

            editButton.textContent = "Edit"; // ボタンのテキストを変更
        }
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

// 新しいタスクを追加する関数
function addTask() { 
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

    newTaskInput.focus(); // 入力欄にフォーカスを戻す
}
 

addTaskButton.addEventListener("click", addTask); //Add TaskボタンがクリックされたらaddTask関数を実行

// Enterキーが押されたらaddTask関数を実行
newTaskInput.addEventListener("keydown", function(event) {  
    if (event.key == "Enter") {
        addTask(); // Enterキーが押されたらaddTask関数を実行
    }

});

// フィルターボタンのクリックイベントリスナーを追加
filterAllButton.addEventListener("click", function() {
    currentFilter = "all"; // "all"に変更
    applyFilter();
    updateFilterButtons(); // フィルターボタンの状態を更新
});

// フィルターボタンのクリックイベントリスナーを追加
filterActiveButton.addEventListener("click", function() {
    currentFilter = "active"; // "active"に変更
    applyFilter();
    updateFilterButtons(); // フィルターボタンの状態を更新
});

// フィルターボタンのクリックイベントリスナーを追加
filterCompleteButton.addEventListener("click", function() {
    currentFilter = "completed"; // "completed"に変更
    applyFilter();
    updateFilterButtons(); // フィルターボタンの状態を更新
});
    
updateFilterButtons(); 
// フィルターボタンの状態を更新することで,ページを開いた際に選択中のフィルターボタンを強調表示する

