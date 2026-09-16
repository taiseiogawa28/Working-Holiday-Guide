const progressText = document.getElementById("progress-text");
// HTML内の<p id="progress-text">Progress: 0%</p>取得

const progressBar = document.getElementById("progress-bar"); 
// <div id="progress-bar"></div>を取得

const newPreTaskInput = document.getElementById("new-pre-task-input");
// HTMLから入力欄<input id="new-pre-task-input">を取得
const addPreTaskButton = document.getElementById("add-pre-task-button");
// ボタン<button id="add-pre-task-button"></button>を取得
const preArrivalList = document.getElementById("pre-arrival-list");
// <ul id="pre-arrival-list">を取得

const newPostTaskInput = document.getElementById("new-post-task-input");
// HTMLから入力欄<input id="new-post-task-input">を取得
const addPostTaskButton = document.getElementById("add-post-task-button");
// ボタン<button id="add-post-task-button"></button>を取得
const postArrivalList = document.getElementById("post-arrival-list"); 
// <ul id="post-arrival-list">を取得

const filterAllButton = document.getElementById("filter-all"); 
// <button id="filter-all">All</button>を取得

const filterActiveButton = document.getElementById("filter-active"); 
// <button id="filter-active">Active</button>を取得

const filterCompletedButton = document.getElementById("filter-completed");
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

// デフォルトのpre-arrivalタスクを定義
const defaultPreTasks = [
    {
        title: "Apply for Visa",
        description: "Check visa requirements and prepare the necessary documents."
    },
    {
        title: "Buy Flight Ticket",
        description: "Compare flight prices and book your ticket."
    },
    {
        title: "Arrange Accommodation",
        description: "Find accommodation for your first days after arrival."
    },
    {
        title: "Prepare Resume",
        description: "Prepare an English resume for your job search."
    }
];

// デフォルトのpost-arrivalタスクを定義
const defaultPostTasks = [
    {
        title: "Open Bank Account",
        description: "Choose a local bank and prepare the required identification documents."
    },
    {
        title: "Apply for Tax Number",
        description: "Apply for the tax identification number required for working in your destination country."
    },
    {
        title: "Buy SIM Card",
        description: "Choose a mobile provider and get a local SIM or eSIM."
    },
    {
        title: "Find a Job",
        description: "Prepare your resume and start searching for jobs."
    }
];

let customTasks = { pre: [], post: [] }; // Pre/Postそれぞれのタスク配列を持つオブジェクトを作成

// localStorageに保存されたタスクがある場合は、それをcustomTasksに読み込む
if (savedTasks !== null) {
    customTasks = JSON.parse(savedTasks); // JSON文字列をオブジェクトに変換
}

// デフォルトのpre-arrivalタスクを表示する
defaultPreTasks.forEach(function(task) {
    createTaskElement(task, preArrivalList, "pre", true);
});

// デフォルトのpost-arrivalタスクを表示する
defaultPostTasks.forEach(function(task) {
    createTaskElement(task, postArrivalList, "post", true);
});

// ページを開いた際に、localStorageに保存されたタスクを表示する
customTasks.pre.forEach(function(task) { createTaskElement(task, preArrivalList, "pre"); });

// ページを開いた際に、localStorageに保存されたタスクを表示する
customTasks.post.forEach(function(task) { createTaskElement(task, postArrivalList, "post"); });

function updateProgress() {
    const tasks = document.querySelectorAll(".task");
    
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
    filterCompletedButton.classList.remove("active-filter");

    if (currentFilter === "all") {
        filterAllButton.classList.add("active-filter"); // "all"フィルターボタンにactive-filterクラスを追加
        
    } else if ( currentFilter === "active") {
        filterActiveButton.classList.add("active-filter"); // "active"フィルターボタンにactive-filterクラスを追加

    } else if ( currentFilter === "completed") {
        filterCompletedButton.classList.add("active-filter"); // "completed"フィルターボタンにactive-filterクラスを追加

    }
}

// チェック状態の変更時とタスクの追加・削除時に、表示順で状態を保存する
function saveTaskStates () {
    const tasks = document.querySelectorAll(".task");  // class="task"がついている要素を全部探す
    
    const taskStates = []; // タスクの状態を保存する配列を作成
    
    tasks.forEach(function(task) {  // チェックボックスの状態を配列に保存 true: チェック済み, false: 未チェック
        taskStates.push(task.checked);
    });
    
    localStorage.setItem("taskStates", JSON.stringify(taskStates)); // 配列をJSON文字列に変換してlocalStorageに保存
}

const initialTasks = document.querySelectorAll(".task"); // 初期表示したすべてのチェックボックスを取得

//　保存したチェック状態を復元
initialTasks.forEach(function(task, index) { // ページを開いた際、localStorageに保存されたタスクの状態を復元する
    if (taskStates[index] !== undefined) { // タスクの状態が保存されている場合
        task.checked = taskStates[index]; // チェックボックスの状態を復元する
    }
});   

updateProgress(); // 進捗率を再計算することで、ページを開いた際に進捗率を正しく表示する

// タスクを作成する関数
function createTaskElement(task, taskList, category, isDefault = false) {

    // タスクの要素を作成
    const listItem = document.createElement("li"); // <li></li>を作成
    const checkbox = document.createElement("input"); // <input>を作成
    const deleteButton = document.createElement("button"); // <button></button>を作成
    const editButton = document.createElement("button"); // <button></button>を作成
    const taskTextNode = document.createTextNode(task.title); // タスクのテキストを作成
    const detailsButton = document.createElement("button"); // <button></button>を作成
    const descriptionText = document.createElement("p"); // <p></p>を作成
    const detailsArea = document.createElement("div"); // <div></div>を作成
    const editDetailsButton = document.createElement("button"); // <button></button>を作成

    editDetailsButton.textContent = "Edit Details"; // ボタンのテキストを設定

    // 説明文を設定
    descriptionText.textContent = task.description; // 説明文のテキストを設定
    descriptionText.style.margin = "8px 0 0 28px"; // 説明文の上に余白を追加
    descriptionText.style.fontSize = "14px"; // 説明文のフォントサイズを小さくする
    descriptionText.style.color = "#555";   // 説明文の文字色を薄くする
    // 説明文自身は隠さず、detailsArea全体で表示・非表示を管理する
    detailsArea.className = "task-details"; // 詳細エリアの見た目はCSSで設定
    
    // タスクの要素を作成
    checkbox.type = "checkbox"; // <input type="checkbox">にする
    checkbox.className = "task"; // class="task"をつける
    deleteButton.textContent = "✖"; // ボタンのテキストを設定
    deleteButton.style.marginLeft = "10px"; // ボタンの左側に余白を追加
    editButton.textContent = "Edit"; // ボタンのテキストを設定
    editButton.style.marginLeft = "10px"; // ボタンの左側に余白を追加
    detailsButton.textContent = "Details"; // ボタンのテキストを設定
    detailsButton.style.marginLeft = "10px"; // ボタンの左側に余白を追加

    listItem.appendChild(checkbox); // <li>の中にチェックボックスを追加
    listItem.appendChild(taskTextNode); // <li>の中にタスクのテキストを追加
    
    if (!isDefault) {
        listItem.appendChild(editButton); // カスタムタスクだけタイトルを編集できる
    }

    listItem.appendChild(detailsButton);

    if (!isDefault) {
        listItem.appendChild(deleteButton);
    }

    // 詳細エリアの要素を作成
    detailsArea.appendChild(descriptionText); // <div>の中に説明文を追加
    detailsArea.appendChild(editDetailsButton); // <div>の中にEdit Detailsボタンを追加

    listItem.appendChild(detailsArea); // <li>の中に<div>を追加

    detailsArea.style.display = "none"; // 初期状態では詳細エリアを非表示にする

    taskList.appendChild(listItem); // <ul>の中に<li>を追加

    checkbox.addEventListener("change", function() {  // チェックボックスが変わったら、updateProgress()を実行する
        updateProgress(); // チェックボックスの状態が変わったら進捗率を更新する
        saveTaskStates();  // チェックボックスの状態を保存する  
        applyFilter(); // フィルターを適用することで、チェック状態が変わったときにフィルターが正しく反映される 
    });

    editButton.addEventListener("click", function() { // 編集ボタンがクリックされたら
        
        if (editButton.textContent === "Edit") { // 編集ボタンのテキストが"Edit"の場合
            const editInput = document.createElement("input"); // <input>を作成

            editInput.type = "text"; // <input type="text">にする
            editInput.value = task.title; // <input>の値をタスクのタイトルにする

            listItem.replaceChild(editInput, taskTextNode); // <li>の中のタスクのテキストを<input>に置き換える

            editButton.textContent = "Save"; // ボタンのテキストを変更
        } else {
            const editInput = listItem.querySelector('input[type="text"]'); // <li>の中の<input type="text">を取得

            const newTaskText = editInput.value.trim(); // <input>の値を取得し、前後の空白を削除

            if (newTaskText === "") { // 入力欄が空の場合は何もしない
                return;
            }

            task.title = newTaskText; // 配列と同じタスクオブジェクトのタイトルを更新
            taskTextNode.textContent = newTaskText; // タスクのテキストを更新

            listItem.replaceChild(taskTextNode, editInput); // <li>の中の<input>をタスクのテキストに置き換える

            localStorage.setItem("customTasks", JSON.stringify(customTasks)); // 配列をJSON文字列に変換してlocalStorageに保存

            editButton.textContent = "Edit"; // ボタンのテキストを変更
        }
    });

    deleteButton.addEventListener("click", function() { // 削除ボタンがクリックされたら
        listItem.remove(); // <li>を削除する

        const savedTask = task; // 削除するタスクを保存

        customTasks[category] = customTasks[category].filter(function(task) { // 配列から削除されたタスクを取り除く
            return savedTask !== task; // 削除されたタスク以外を残す
        });
        
        localStorage.setItem("customTasks", JSON.stringify(customTasks)); // 配列をJSON文字列に変換してlocalStorageに保存
        
        saveTaskStates(); // 削除後にタスクの状態を保存する
        updateProgress(); // 削除後に進捗率を更新する
    });

    // 詳細ボタンがクリックされたら
    detailsButton.addEventListener("click", function() {
        // 詳細エリアの表示・非表示を切り替える
        if (detailsArea.style.display === "none") {
            detailsArea.style.display = "block";
            detailsButton.textContent = "Hide Details";
        } else { // 詳細エリアが表示されている場合は非表示にする
            detailsArea.style.display = "none";
            detailsButton.textContent = "Details";
        }

    });

    // Edit Detailsボタンがクリックされたら
    editDetailsButton.addEventListener("click", function() {

        // Edit Detailsボタンのテキストが"Edit Details"の場合は、入力欄を表示する
        if (editDetailsButton.textContent === "Edit Details") {

            const descriptionInput = document.createElement("input"); // <input>を作成

            descriptionInput.type = "text"; // <input type="text">にする
            descriptionInput.value = task.description; // <input>の値をタスクの説明文にする
            descriptionInput.placeholder = "Enter task details"; // <input>のプレースホルダーを設定

            detailsArea.replaceChild(descriptionInput, descriptionText); // <div>の中の説明文を<input>に置き換える

            editDetailsButton.textContent = "Save"; // ボタンのテキストを変更

        } else { // Edit Detailsボタンのテキストが"Save"の場合は、入力欄の値を保存する

            const descriptionInput = detailsArea.querySelector('input[placeholder="Enter task details"]'); // <div>の中の<input>を取得

            const newDescription = descriptionInput.value.trim(); // <input>の値を取得し、前後の空白を削除

            task.description = newDescription; // タスクの説明文を更新

            descriptionText.textContent = newDescription; // 説明文のテキストを更新

            detailsArea.replaceChild(descriptionText, descriptionInput);  // <div>の中の<input>を説明文に置き換える

            // カスタムタスクは更新済みのオブジェクトをlocalStorageにも保存
            if (!isDefault) {
                localStorage.setItem(
                    "customTasks",
                    JSON.stringify(customTasks)
                );
            }
            editDetailsButton.textContent = "Edit Details";
        }
    });
}

// 新しいpre-arrivalタスクを追加する関数
function addPreTask() {
    const taskText = newPreTaskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        title: taskText,
        description: ""
    };

    createTaskElement(newTask, preArrivalList, "pre");

    customTasks.pre.push(newTask);

    localStorage.setItem(
        "customTasks",
        JSON.stringify(customTasks)
    );

    saveTaskStates(); // 追加後の表示順でチェック状態を保存（Pre追加時のPostの位置ずれも防ぐ）
    updateProgress(); // タスク数が増えたので進捗率を更新
    applyFilter(); // 追加したタスクにも現在のフィルターを適用

    newPreTaskInput.value = "";
    newPreTaskInput.focus();
}

// 新しいpost-arrivalタスクを追加する関数
function addPostTask() {
    const taskText = newPostTaskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        title: taskText,
        description: ""
    };

    createTaskElement(newTask, postArrivalList, "post");

    customTasks.post.push(newTask);

    localStorage.setItem(
        "customTasks",
        JSON.stringify(customTasks)
    );

    saveTaskStates(); // 追加後の表示順でチェック状態を保存（Pre追加時のPostの位置ずれも防ぐ）
    updateProgress(); // タスク数が増えたので進捗率を更新
    applyFilter(); // 追加したタスクにも現在のフィルターを適用

    newPostTaskInput.value = "";
    newPostTaskInput.focus();
}

addPreTaskButton.addEventListener("click", addPreTask); // PreのAdd TaskボタンでaddPreTask関数を実行
addPostTaskButton.addEventListener("click", addPostTask); // PostのAdd TaskボタンでaddPostTask関数を実行

// 日本語変換の確定中を除き、EnterキーでaddPreTask関数を実行
newPreTaskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.isComposing) {
        addPreTask();
    }
});

// 日本語変換の確定中を除き、EnterキーでaddPostTask関数を実行
newPostTaskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.isComposing) {
        addPostTask();
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
filterCompletedButton.addEventListener("click", function() {
    currentFilter = "completed"; // "completed"に変更
    applyFilter();
    updateFilterButtons(); // フィルターボタンの状態を更新
});
    
updateFilterButtons(); 
// フィルターボタンの状態を更新することで,ページを開いた際に選択中のフィルターボタンを強調表示する

