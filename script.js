const progressText = document.getElementById("progress-text");
// HTML内の<p id="progress-text">Progress: 0%</p>取得

const progressBar = document.getElementById("progress-bar"); 
// <div id="progress-bar"></div>を取得

const remainingTasksText = document.getElementById("remaining-tasks");
// 未完了タスク数を表示する要素を取得

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

const languageToggleButton = document.getElementById("language-toggle-button");
const appSubtitle = document.getElementById("app-subtitle");
const preArrivalHeading = document.getElementById("pre-arrival-heading");
const postArrivalHeading = document.getElementById("post-arrival-heading");

// 現在の言語を管理
let currentLanguage = "en";

// 英語と日本語の翻訳文を管理
const translations = {
    en: {
        languageButton: "日本語",
        subtitle: "- For Japanese -",
        preArrivalTasks: "Pre-arrival Tasks",
        postArrivalTasks: "Post-arrival Tasks",
        progress: "Progress",
        remaining: "Remaining",
        addTask: "Add Task",
        preTaskPlaceholder: "Enter a new pre-arrival task",
        postTaskPlaceholder: "Enter a new post-arrival task",
        all: "All",
        active: "Active",
        completed: "Completed",
        edit: "Edit",
        save: "Save",
        editDetails: "Edit Details",
        showDetails: "Show details",
        hideDetails: "Hide details",
        editTask: "Edit task title",
        saveTask: "Save task title",
        deleteTask: "Delete task",
        switchLanguage: "Switch display language to Japanese",
        description: "Description",
        enterTaskDetails: "Enter task details",
        applyForVisaTitle: "Apply for Visa",
        applyForVisaDescription: "Check visa requirements and prepare the necessary documents.",
        buyFlightTicketTitle: "Buy Flight Ticket",
        buyFlightTicketDescription: "Compare flight prices and book your ticket.",
        arrangeAccommodationTitle: "Arrange Accommodation",
        arrangeAccommodationDescription: "Find accommodation for your first days after arrival.",
        prepareResumeTitle: "Prepare Resume",
        prepareResumeDescription: "Prepare an English resume for your job search.",
        openBankAccountTitle: "Open Bank Account",
        openBankAccountDescription: "Choose a local bank and prepare the required identification documents.",
        applyForTaxNumberTitle: "Apply for Tax Number",
        applyForTaxNumberDescription: "Apply for the tax identification number required for working in your destination country.",
        buySimCardTitle: "Buy SIM Card",
        buySimCardDescription: "Choose a mobile provider and get a local SIM or eSIM.",
        findAJobTitle: "Find a Job",
        findAJobDescription: "Prepare your resume and start searching for jobs.",
        visaInformation: "Visa Information",
        taxInformation: "Tax Information",
        bankInformation: "Bank Information",
        mobileInformation: "Mobile Information",
        jobSearch: "Job Search",
        flightInformation: "Flight Information",
        accommodationInformation: "Accommodation Information",
        resumeInformation: "Resume Information",
        country: "Country",
        recommendedBanks: "Recommended Banks",
        recommendedProviders: "Recommended Providers",
        recommendedJobSites: "Recommended Job Sites",
        recommendedFlightSites: "Recommended Flight Search Sites",
        recommendedAccommodationSites: "Recommended Accommodation Sites",
        recommendedResources: "Recommended Resources",
        tips: "Tips",
        openVisaSite: "Open Official Visa Site",
        openTaxSite: "Open Official Tax Site",
        resumeTips: {
            "New Zealand": [
                "CV is commonly used",
                "Keep it concise",
                "References may be requested"
            ],
            "Australia": [
                "Resume is commonly used",
                "Usually 1–2 pages",
                "Focus on skills and experience"
            ]
        }
    },
    ja: {
        languageButton: "English",
        subtitle: "- 日本人向け -",
        preArrivalTasks: "出発前のタスク",
        postArrivalTasks: "到着後のタスク",
        progress: "進捗",
        remaining: "未完了",
        addTask: "タスクを追加",
        preTaskPlaceholder: "新しい出発前タスクを入力",
        postTaskPlaceholder: "新しい到着後タスクを入力",
        all: "すべて",
        active: "未完了",
        completed: "完了済み",
        edit: "編集",
        save: "保存",
        editDetails: "詳細を編集",
        showDetails: "詳細を表示",
        hideDetails: "詳細を非表示",
        editTask: "タスク名を編集",
        saveTask: "タスク名を保存",
        deleteTask: "タスクを削除",
        switchLanguage: "表示言語を英語に切り替え",
        description: "説明",
        enterTaskDetails: "タスクの詳細を入力",
        applyForVisaTitle: "ビザを申請する",
        applyForVisaDescription: "ビザの申請条件を確認し、必要書類を準備します。",
        buyFlightTicketTitle: "航空券を購入する",
        buyFlightTicketDescription: "航空券の価格を比較して予約します。",
        arrangeAccommodationTitle: "滞在先を手配する",
        arrangeAccommodationDescription: "到着後の最初の数日間に滞在する場所を探します。",
        prepareResumeTitle: "履歴書を準備する",
        prepareResumeDescription: "仕事探しに使う英語の履歴書を準備します。",
        openBankAccountTitle: "銀行口座を開設する",
        openBankAccountDescription: "現地の銀行を選び、必要な本人確認書類を準備します。",
        applyForTaxNumberTitle: "納税者番号を申請する",
        applyForTaxNumberDescription: "渡航先で働くために必要な納税者番号を申請します。",
        buySimCardTitle: "SIMカードを購入する",
        buySimCardDescription: "通信会社を選び、現地のSIMまたはeSIMを用意します。",
        findAJobTitle: "仕事を探す",
        findAJobDescription: "履歴書を準備して仕事探しを始めます。",
        visaInformation: "ビザ情報",
        taxInformation: "税金情報",
        bankInformation: "銀行情報",
        mobileInformation: "モバイル情報",
        jobSearch: "仕事探し",
        flightInformation: "航空券情報",
        accommodationInformation: "宿泊情報",
        resumeInformation: "履歴書情報",
        country: "国",
        recommendedBanks: "おすすめの銀行",
        recommendedProviders: "おすすめの通信会社",
        recommendedJobSites: "おすすめの求人サイト",
        recommendedFlightSites: "おすすめの航空券検索サイト",
        recommendedAccommodationSites: "おすすめの宿泊予約サイト",
        recommendedResources: "おすすめの情報サイト",
        tips: "ポイント",
        openVisaSite: "公式ビザサイトを開く",
        openTaxSite: "公式税金サイトを開く",
        resumeTips: {
            "New Zealand": [
                "CVという名称が一般的です",
                "簡潔にまとめましょう",
                "推薦者を求められる場合があります"
            ],
            "Australia": [
                "Resumeという名称が一般的です",
                "通常は1〜2ページです",
                "スキルと経験を重視しましょう"
            ]
        }
    }
};

const defaultTaskTranslationKeys = {
    visa: { title: "applyForVisaTitle", description: "applyForVisaDescription" },
    flight: { title: "buyFlightTicketTitle", description: "buyFlightTicketDescription" },
    accommodation: { title: "arrangeAccommodationTitle", description: "arrangeAccommodationDescription" },
    resume: { title: "prepareResumeTitle", description: "prepareResumeDescription" },
    bank: { title: "openBankAccountTitle", description: "openBankAccountDescription" },
    tax: { title: "applyForTaxNumberTitle", description: "applyForTaxNumberDescription" },
    sim: { title: "buySimCardTitle", description: "buySimCardDescription" },
    job: { title: "findAJobTitle", description: "findAJobDescription" }
};

// 翻訳キーを要素に設定し、現在の言語の文字を表示する
function setTranslatedText(element, translationKey) {
    element.dataset.translationKey = translationKey;
    element.textContent = translations[currentLanguage][translationKey];
}

// placeholder用の翻訳キーを設定する
function setTranslatedPlaceholder(element, translationKey) {
    element.dataset.translationPlaceholder = translationKey;
    element.placeholder = translations[currentLanguage][translationKey];
}

// 現在の言語に合わせてDOMの表示テキストを更新する
function updateLanguage() {
    const currentTranslations = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;
    languageToggleButton.textContent = currentTranslations.languageButton;
    languageToggleButton.setAttribute("aria-label", currentTranslations.switchLanguage);
    appSubtitle.textContent = currentTranslations.subtitle;
    preArrivalHeading.textContent = currentTranslations.preArrivalTasks;
    postArrivalHeading.textContent = currentTranslations.postArrivalTasks;
    addPreTaskButton.textContent = currentTranslations.addTask;
    addPostTaskButton.textContent = currentTranslations.addTask;
    newPreTaskInput.placeholder = currentTranslations.preTaskPlaceholder;
    newPostTaskInput.placeholder = currentTranslations.postTaskPlaceholder;
    filterAllButton.textContent = currentTranslations.all;
    filterActiveButton.textContent = currentTranslations.active;
    filterCompletedButton.textContent = currentTranslations.completed;

    document.querySelectorAll("[data-translation-key]").forEach(function(element) {
        const translationKey = element.dataset.translationKey;
        element.textContent = currentTranslations[translationKey];
    });

    document.querySelectorAll("[data-translation-placeholder]").forEach(function(element) {
        const translationKey = element.dataset.translationPlaceholder;
        element.placeholder = currentTranslations[translationKey];
    });

    document.querySelectorAll("[data-translation-aria-label]").forEach(function(element) {
        const translationKey = element.dataset.translationAriaLabel;
        element.setAttribute("aria-label", currentTranslations[translationKey]);
    });

    // Resume Tipsは選択中の国を維持したまま表示言語だけを更新する
    document.querySelectorAll(".resume-section").forEach(function(section) {
        const selectedCountry = section.querySelector("select").value;
        const tipsArea = section.querySelector(".resume-tips");
        tipsArea.innerHTML = "";

        currentTranslations.resumeTips[selectedCountry].forEach(function(tip) {
            const tipItem = document.createElement("li");
            tipItem.textContent = tip;
            tipsArea.appendChild(tipItem);
        });
    });

    updateProgress(); // ProgressとRemainingも現在の言語で更新
}

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
        description: "Check visa requirements and prepare the necessary documents.",
        type: "visa"
    },
    {
        title: "Buy Flight Ticket",
        description: "Compare flight prices and book your ticket.",
        type: "flight"
    },
    {
        title: "Arrange Accommodation",
        description: "Find accommodation for your first days after arrival.",
        type: "accommodation"
    },
    {
        title: "Prepare Resume",
        description: "Prepare an English resume for your job search.",
        type: "resume"
    }
];

// デフォルトのpost-arrivalタスクを定義
const defaultPostTasks = [
    {
        title: "Open Bank Account",
        description: "Choose a local bank and prepare the required identification documents.",
        type: "bank"
    },
    {
        title: "Apply for Tax Number",
        description: "Apply for the tax identification number required for working in your destination country.",
        type: "tax"
    },
    {
        title: "Buy SIM Card",
        description: "Choose a mobile provider and get a local SIM or eSIM.",
        type: "sim"
    },
    {
        title: "Find a Job",
        description: "Prepare your resume and start searching for jobs.",
        type: "job"
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

    const remainingCount = tasks.length - checkedCount;
    // 未完了タスク数の計算

    progressText.textContent = translations[currentLanguage].progress + ": " + progress + "%";
    // Progress表示を更新
    progressBar.style.width = progress + "%";
    // 進捗バーの表示を更新

    remainingTasksText.textContent = translations[currentLanguage].remaining + ": " + remainingCount;
    // 未完了タスク数を更新
}

function applyFilter() {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(function(task) {

        if(currentFilter === "all") {
            task.closest("li").style.display = ""; // すべてのタスクを表示する

        } else if (currentFilter ==="active") {
            if(task.checked) {
                task.closest("li").style.display = "none"; // チェック済みのタスクは非表示にする
            } else {
                task.closest("li").style.display = ""; // 未チェックのタスクは表示する
            }

        } else if (currentFilter === "completed") {
            if(task.checked) {
                task.closest("li").style.display = ""; // チェック済みのタスクは表示する
            } else {
                task.closest("li").style.display = "none"; // 未チェックのタスクは非表示にする
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
    const taskRow = document.createElement("div"); // タスク名と操作ボタンをまとめる1行を作成
    const taskContent = document.createElement("div"); // チェックボックスとタスク名をまとめる箱を作成
    const taskActions = document.createElement("div"); // 操作ボタンをまとめる箱を作成
    const checkbox = document.createElement("input"); // <input>を作成
    const deleteButton = document.createElement("button"); // <button></button>を作成
    const editButton = document.createElement("button"); // <button></button>を作成
    const taskTextNode = document.createElement("span"); // 言語切り替えに対応できるタスクタイトル要素を作成
    const detailsButton = document.createElement("button"); // <button></button>を作成
    const descriptionText = document.createElement("p"); // <p></p>を作成
    const detailsArea = document.createElement("div"); // <div></div>を作成
    const descriptionSection = document.createElement("div"); // 説明文をまとめる小さなセクションを作成
    const descriptionHeading = document.createElement("h3"); // Descriptionの見出しを作成
    const descriptionContent = document.createElement("div"); // 説明文と入力欄を入れる箱を作成
    const editDetailsButton = document.createElement("button"); // <button></button>を作成
    const countrySelect = document.createElement("select"); // <select></select>を作成
    const officialSiteButton = document.createElement("button"); // <button></button>を作成
    let isEditingTitle = false; // タイトルを編集中かどうかを管理
    let isEditingDescription = false; // Descriptionを編集中かどうかを管理

    // ビザ申請タスクの場合、Visa Informationセクションを準備
    const visaSection = document.createElement("div"); // Visa Informationをまとめる小さなセクションを作成
    const visaHeading = document.createElement("h3"); // Visa Informationの見出しを作成
    const visaControls = document.createElement("div"); // 国選択と公式サイトボタンを横並びにする箱を作成
    const visaUrls = { // 国ごとの公式サイトのURLを定義
        "New Zealand": "https://www.immigration.govt.nz/visas/japan-working-holiday-visa/",
        "Australia": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417"
    };

    // 税金申請タスクの場合、Tax Informationセクションを準備
    const taxSection = document.createElement("div"); // Tax Informationをまとめる小さなセクションを作成
    const taxHeading = document.createElement("h3"); // Tax Informationの見出しを作成
    const taxControls = document.createElement("div"); // 国選択と公式サイトボタンを横並びにする箱を作成
    const taxCountrySelect = document.createElement("select"); // <select></select>を作成
    const taxOfficialSiteButton = document.createElement("button"); // <button></button>を作成
    const taxUrls = { // 国ごとの公式サイトのURLを定義
        "New Zealand": "https://www.ird.govt.nz/new-arrival",
        "Australia": "https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application"
    };

    // 銀行口座開設タスクの場合、Bank Informationセクションを準備
    const bankSection = document.createElement("div"); // Bank Informationをまとめる小さなセクションを作成
    const bankHeading = document.createElement("h3"); // Bank Informationの見出しを作成
    const bankCountrySelect = document.createElement("select"); // <select></select>を作成
    const bankButtonsArea = document.createElement("div"); // 銀行ボタンをまとめる箱を作成
    const bankUrls = {
        "New Zealand": {
            "ANZ": "https://www.anz.co.nz/personal/accounts/",
            "ASB": "https://www.asb.co.nz/bank-accounts",
            "BNZ": "https://www.bnz.co.nz/"
        },
        "Australia": {
            "ANZ": "https://www.anz.com.au/personal/bank-accounts/",
            "Commonwealth Bank": "https://www.commbank.com.au/banking.html",
            "NAB": "https://www.nab.com.au/personal/accounts"
        }
    };

    // SIMカードタスクの場合、SIM Informationセクションを準備
    const simSection = document.createElement("div");
    const simHeading = document.createElement("h3");
    const simCountrySelect = document.createElement("select");
    const simButtonsArea = document.createElement("div");
    const simUrls = {
        "New Zealand": {
            "Spark": "https://www.spark.co.nz/",
            "One NZ": "https://one.nz/",
            "2degrees": "https://www.2degrees.nz/"
        },
        "Australia": {
            "Telstra": "https://www.telstra.com.au/",
            "Optus": "https://www.optus.com.au/",
            "Vodafone": "https://www.vodafone.com.au/"
        }
    };

    // 求人検索タスクの場合、Job Searchセクションを準備
    const jobSection = document.createElement("div"); // Job Searchをまとめる小さなセクションを作成
    const jobHeading = document.createElement("h3"); // Job Searchの見出しを作成
    const jobCountrySelect = document.createElement("select"); // <select></select>を作成
    const jobButtonsArea = document.createElement("div"); // 求人サイトボタンをまとめる箱を作成
    const jobUrls = {
        "New Zealand": {
            "SEEK": "https://www.seek.co.nz/",
            "Trade Me Jobs": "https://www.trademe.co.nz/a/jobs",
            "Indeed": "https://nz.indeed.com/"
        },
        "Australia": {
            "SEEK": "https://www.seek.com.au/",
            "Indeed": "https://au.indeed.com/",
            "Workforce Australia": "https://www.workforceaustralia.gov.au/individuals/jobs"
        }
    };

    // 航空券検索タスクの場合、Flight Informationセクションを準備
    const flightSection = document.createElement("div"); // Flight Informationをまとめる小さなセクションを作成
    const flightHeading = document.createElement("h3"); // Flight Informationの見出しを作成
    const flightCountrySelect = document.createElement("select"); // <select></select>を作成
    const flightButtonsArea = document.createElement("div"); // 航空券検索サイトボタンをまとめる箱を作成
    const flightUrls = {
        "New Zealand": {
            "Google Flights": "https://www.google.com/travel/flights",
            "Skyscanner": "https://www.skyscanner.com/",
            "KAYAK": "https://www.kayak.com/flights"
        },
        "Australia": {
            "Google Flights": "https://www.google.com/travel/flights",
            "Skyscanner": "https://www.skyscanner.com/",
            "KAYAK": "https://www.kayak.com/flights"
        }
    };

    // 宿泊先検索タスクの場合、Accommodation Informationセクションを準備
    const accommodationSection = document.createElement("div"); // Accommodation Informationをまとめる小さなセクションを作成
    const accommodationHeading = document.createElement("h3"); // Accommodation Informationの見出しを作成
    const accommodationCountrySelect = document.createElement("select"); // <select></select>を作成
    const accommodationButtonsArea = document.createElement("div"); // 宿泊予約サイトボタンをまとめる箱を作成
    const accommodationUrls = {
        "New Zealand": {
            "Booking.com": "https://www.booking.com/",
            "Airbnb": "https://www.airbnb.com/",
            "Hostelworld": "https://www.hostelworld.com/"
        },
        "Australia": {
            "Booking.com": "https://www.booking.com/",
            "Airbnb": "https://www.airbnb.com/",
            "Hostelworld": "https://www.hostelworld.com/"
        }
    };

    // Resume準備タスクの場合、Resume Informationセクションを準備
    const resumeSection = document.createElement("div"); // Resume Informationをまとめる小さなセクションを作成
    const resumeHeading = document.createElement("h3"); // Resume Informationの見出しを作成
    const resumeCountrySelect = document.createElement("select"); // <select></select>を作成
    const resumeButtonsArea = document.createElement("div"); // Resume関連サイトボタンをまとめる箱を作成
    const resumeTipsArea = document.createElement("ul"); // 国別Tipsを表示するリストを作成
    const resumeResources = {
        "New Zealand": {
            links: {
                "Tahatū CV Guide": "https://tahatu.govt.nz/work/applying-for-a-job/how-to-write-a-cv",
                "Job Hunters' Workbook": "https://tahatu.govt.nz/job-hunters-workbook"
            }
        },
        "Australia": {
            links: {
                "Resume Guide": "https://www.workforceaustralia.gov.au/individuals/coaching/job-applications/resumes",
                "Job Application Tips": "https://www.workforceaustralia.gov.au/individuals/coaching/job-applications"
            }
        }
    };

    setTranslatedText(editDetailsButton, "editDetails"); // ボタンのテキストを設定
    setTranslatedText(descriptionHeading, "description"); // Descriptionセクションの見出しを設定

    // 説明文を設定
    if (isDefault && defaultTaskTranslationKeys[task.type]) {
        const taskTranslationKeys = defaultTaskTranslationKeys[task.type];
        setTranslatedText(taskTextNode, taskTranslationKeys.title); // デフォルトタスク名を現在の言語で表示
        setTranslatedText(descriptionText, taskTranslationKeys.description); // デフォルトDescriptionを現在の言語で表示
    } else {
        taskTextNode.textContent = task.title; // カスタムタスク名はユーザー入力のまま表示
        descriptionText.textContent = task.description; // カスタムDescriptionはユーザー入力のまま表示
    }
    // 説明文自身は隠さず、detailsArea全体で表示・非表示を管理する
    detailsArea.className = "task-details"; // 詳細エリアの見た目はCSSで設定
    descriptionSection.className = "detail-section description-section"; // Description専用の小さなセクションにする
    descriptionHeading.className = "detail-heading"; // 詳細セクション共通の見出しスタイルを設定
    descriptionContent.className = "description-content"; // 説明文の表示・編集領域にクラスを設定
    
    // タスクの要素を作成
    checkbox.type = "checkbox"; // <input type="checkbox">にする
    checkbox.className = "task"; // class="task"をつける
    deleteButton.textContent = "✖"; // ボタンのテキストを設定
    deleteButton.className = "task-action-button delete-task-button";
    deleteButton.dataset.translationAriaLabel = "deleteTask";
    deleteButton.setAttribute("aria-label", translations[currentLanguage].deleteTask);
    setTranslatedText(editButton, "edit"); // ボタンのテキストを設定
    editButton.className = "task-action-button edit-task-button";
    editButton.dataset.translationAriaLabel = "editTask";
    editButton.setAttribute("aria-label", translations[currentLanguage].editTask);
    detailsButton.textContent = "▼"; // ボタンのテキストを設定
    detailsButton.className = "task-action-button details-toggle-button";
    detailsButton.dataset.translationAriaLabel = "showDetails";
    detailsButton.setAttribute("aria-label", translations[currentLanguage].showDetails);
    detailsButton.setAttribute("aria-expanded", "false");

    taskRow.className = "task-row"; // 左右のグループを並べるためのクラスを設定
    taskContent.className = "task-content"; // checkbox + タスク名の左グループ
    taskActions.className = "task-actions"; // Edit / Delete / Detailsの右グループ
    taskTextNode.className = "task-title";

    taskContent.appendChild(checkbox); // 左グループにチェックボックスを追加
    taskContent.appendChild(taskTextNode); // 左グループにタスクのテキストを追加
    
    if (!isDefault) {
        taskActions.appendChild(editButton); // カスタムタスクだけタイトルを編集できる
        taskActions.appendChild(deleteButton); // カスタムタスクだけ削除できる
    }

    taskActions.appendChild(detailsButton);
    taskRow.appendChild(taskContent);
    taskRow.appendChild(taskActions);
    listItem.appendChild(taskRow);

    // Descriptionセクションの要素を作成
    descriptionContent.appendChild(descriptionText); // 説明文の表示領域に<p>を追加
    descriptionSection.appendChild(descriptionHeading); // Descriptionの見出しを追加
    descriptionSection.appendChild(descriptionContent); // Descriptionの内容を追加
    descriptionSection.appendChild(editDetailsButton); // Descriptionの編集ボタンを追加
    detailsArea.appendChild(descriptionSection); // 詳細エリアにDescriptionセクションを追加

    // ビザ申請タスクの場合、Visa Informationセクションを追加
    if (task.type === "visa") {
        const countries = [
            "New Zealand",
            "Australia"
        ];

        countries.forEach(function(country) {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });

        setTranslatedText(officialSiteButton, "openVisaSite");
        const countryLabel = document.createElement("label"); // Countryのラベルを作成
        setTranslatedText(countryLabel, "country"); // ラベルのテキストを設定
        countryLabel.htmlFor = "visa-country-select"; // ラベルと国選択を関連づける
        countrySelect.id = "visa-country-select"; // 国選択にidを設定

        visaSection.className = "detail-section information-section visa-section"; // Information共通デザインを持つVisaセクションにする
        visaHeading.className = "detail-heading"; // 詳細セクション共通の見出しスタイルを設定
        setTranslatedText(visaHeading, "visaInformation"); // ビザ情報セクションの見出しを設定
        visaControls.className = "information-controls visa-controls"; // 国選択と公式サイトボタンを横並びにする

        visaControls.appendChild(countrySelect); // 横並びの箱に<select>を追加
        visaControls.appendChild(officialSiteButton); // 横並びの箱に公式サイトボタンを追加
        visaSection.appendChild(visaHeading); // Visa Informationの見出しを追加
        visaSection.appendChild(countryLabel); // Countryのラベルを追加
        visaSection.appendChild(visaControls); // 国選択と公式サイトボタンを追加
        detailsArea.appendChild(visaSection); // 詳細エリアにVisa Informationセクションを追加

        // 公式サイトボタンがクリックされたときに、選択された国のビザ申請ページを新しいタブで開く
        officialSiteButton.addEventListener("click", function() {
            const selectedCountry = countrySelect.value; // 選択された国を取得
            const url = visaUrls[selectedCountry]; // 選択された国のURLを取得

            window.open(url, "_blank"); // 新しいタブでURLを開く
        });
    }

    // 税金申請タスクの場合、Tax Informationセクションを追加
    if (task.type === "tax") {
        const countries = [
            "New Zealand",
            "Australia"
        ];

        countries.forEach(function(country) {
            const option = document.createElement("option"); // <option>を作成
            option.value = country; // <option>のvalue属性を設定
            option.textContent = country; // <option>の表示テキストを設定
            taxCountrySelect.appendChild(option); // <select>に<option>を追加
        });

        setTranslatedText(taxOfficialSiteButton, "openTaxSite"); // ボタンのテキストを設定

        const countryLabel = document.createElement("label"); // Countryのラベルを作成
        setTranslatedText(countryLabel, "country"); // ラベルのテキストを設定

        taxCountrySelect.id = "tax-country-select"; // 国選択にidを設定
        countryLabel.htmlFor = "tax-country-select"; // ラベルと国選択を関連づける

        taxSection.className = "detail-section information-section tax-section"; // Information共通デザインを持つTaxセクションにする
        taxHeading.className = "detail-heading"; // 詳細セクション共通の見出しスタイルを設定
        setTranslatedText(taxHeading, "taxInformation"); // 税金情報セクションの見出しを設定
        taxControls.className = "information-controls tax-controls"; // 国選択と公式サイトボタンを横並びにする

        taxControls.appendChild(taxCountrySelect); // 横並びの箱に<select>を追加
        taxControls.appendChild(taxOfficialSiteButton); // 横並びの箱に公式サイトボタンを追加

        taxSection.appendChild(taxHeading); // Tax Informationの見出しを追加
        taxSection.appendChild(countryLabel);  // Countryのラベルを追加
        taxSection.appendChild(taxControls); // 国選択と公式サイトボタンを追加

        detailsArea.appendChild(taxSection); // 詳細エリアにTax Informationセクションを追加

        // 公式サイトボタンがクリックされたときに、選択された国の税金申請ページを新しいタブで開く
        taxOfficialSiteButton.addEventListener("click", function() {
            const selectedCountry = taxCountrySelect.value; // 選択された国を取得
            const url = taxUrls[selectedCountry]; // 選択された国のURLを取得

            window.open(url, "_blank"); // 新しいタブでURLを開く
        });
    }

    // 銀行口座開設タスクの場合、Bank Informationセクションを追加
    if (task.type === "bank") {

        const countries = [
            "New Zealand",
            "Australia"
        ];

        countries.forEach(function(country) {
            const option = document.createElement("option");

            option.value = country;
            option.textContent = country;

            bankCountrySelect.appendChild(option);
        });

        const countryLabel = document.createElement("label");
        setTranslatedText(countryLabel, "country");
        const recommendedBanksLabel = document.createElement("p"); // 銀行一覧のラベルを作成
        setTranslatedText(recommendedBanksLabel, "recommendedBanks"); // ラベルのテキストを設定
        recommendedBanksLabel.className = "information-label"; // Information共通のラベルスタイルを設定

        bankCountrySelect.id = "bank-country-select";
        countryLabel.htmlFor = "bank-country-select";

        bankSection.className = "detail-section information-section recommendation-section bank-section";

        bankHeading.className = "detail-heading";
        setTranslatedText(bankHeading, "bankInformation");

        bankButtonsArea.className = "recommendation-buttons bank-buttons";

        bankSection.appendChild(bankHeading);
        bankSection.appendChild(countryLabel);
        bankSection.appendChild(bankCountrySelect);
        bankSection.appendChild(recommendedBanksLabel);
        bankSection.appendChild(bankButtonsArea);

        detailsArea.appendChild(bankSection);

        // 国選択が変更されたときに、銀行ボタンを更新する
        function updateBankButtons() {

            bankButtonsArea.innerHTML = "";

            const selectedCountry = bankCountrySelect.value;

            const banks = bankUrls[selectedCountry];

            Object.keys(banks).forEach(function(bankName) {

                const bankButton = document.createElement("button");

                bankButton.textContent = bankName;

                bankButton.addEventListener("click", function() {
                    window.open(banks[bankName], "_blank");
                });

                bankButtonsArea.appendChild(bankButton);
            });
        }
        // 国選択が変更されたときに、銀行ボタンを更新する
        bankCountrySelect.addEventListener("change", function() {
            updateBankButtons();
        });

        // 初期表示時に銀行ボタンを更新する
        updateBankButtons();
    }

    // SIMカードタスクの場合、SIM Informationセクションを追加
    if (task.type === "sim") {

        const countries = [    // SIMカードの国選択肢を定義
            "New Zealand",
            "Australia"
        ];
        // 各国の<option>を作成して<select>に追加
        countries.forEach(function(country) {
            const option = document.createElement("option"); // <option>を作成

            option.value = country; // <option>のvalue属性を設定
            option.textContent = country;   // <option>の表示テキストを設定

            simCountrySelect.appendChild(option); // <select>に<option>を追加
        });

        const countryLabel = document.createElement("label"); // Countryのラベルを作成
        setTranslatedText(countryLabel, "country"); // ラベルのテキストを設定

        const recommendedProvidersLabel = document.createElement("p"); // 推奨プロバイダーのラベルを作成
        setTranslatedText(recommendedProvidersLabel, "recommendedProviders"); // ラベルのテキストを設定
        recommendedProvidersLabel.className = "information-label"; // Information共通のラベルスタイルを設定

        simCountrySelect.id = "sim-country-select";  // 国選択にidを設定
        countryLabel.htmlFor = "sim-country-select"; // ラベルと国選択を関連づける

        simSection.className = "detail-section information-section recommendation-section sim-section"; // 共通デザインを持つSIMセクションにする

        simHeading.className = "detail-heading"; // 詳細セクション共通の見出しスタイルを設定
        setTranslatedText(simHeading, "mobileInformation"); // SIM情報セクションの見出しを設定

        simButtonsArea.className = "recommendation-buttons sim-buttons"; // 推奨プロバイダーボタンをまとめる箱を作成

        simSection.appendChild(simHeading); // SIM Informationの見出しを追加
        simSection.appendChild(countryLabel); // Countryのラベルを追加
        simSection.appendChild(simCountrySelect); // 国選択を追加
        simSection.appendChild(recommendedProvidersLabel); // 推奨プロバイダーのラベルを追加
        simSection.appendChild(simButtonsArea); // 推奨プロバイダーボタンをまとめる箱を追加

        detailsArea.appendChild(simSection); // 詳細エリアにSIM Informationセクションを追加

        function updateSimButtons() {

            simButtonsArea.innerHTML = "";

            const selectedCountry = simCountrySelect.value;

            const providers = simUrls[selectedCountry];

            Object.keys(providers).forEach(function(providerName) {

                const providerButton = document.createElement("button");

                providerButton.textContent = providerName;

                providerButton.addEventListener("click", function() {
                    window.open(providers[providerName], "_blank");
                });

                simButtonsArea.appendChild(providerButton);
            });
        }

        simCountrySelect.addEventListener("change", function() {
            updateSimButtons();
        });

        updateSimButtons();
    }

    // 求人検索タスクの場合、Job Searchセクションを追加
    if (task.type === "job") {
        const countries = [
            "New Zealand",
            "Australia"
        ];

        countries.forEach(function(country) {
            const option = document.createElement("option"); // <option>を作成
            option.value = country; // <option>のvalue属性を設定
            option.textContent = country; // <option>の表示テキストを設定
            jobCountrySelect.appendChild(option); // <select>に<option>を追加
        });

        const countryLabel = document.createElement("label"); // Countryのラベルを作成
        setTranslatedText(countryLabel, "country"); // ラベルのテキストを設定
        const recommendedSitesLabel = document.createElement("p"); // 求人サイト一覧のラベルを作成
        setTranslatedText(recommendedSitesLabel, "recommendedJobSites"); // ラベルのテキストを設定
        recommendedSitesLabel.className = "information-label"; // Information共通のラベルスタイルを設定

        jobCountrySelect.id = "job-country-select"; // 国選択にidを設定
        countryLabel.htmlFor = "job-country-select"; // ラベルと国選択を関連づける
        jobSection.className = "detail-section information-section recommendation-section job-section"; // 共通デザインを持つJob Searchセクションにする
        jobHeading.className = "detail-heading"; // 詳細セクション共通の見出しスタイルを設定
        setTranslatedText(jobHeading, "jobSearch"); // 求人検索セクションの見出しを設定
        jobButtonsArea.className = "recommendation-buttons job-buttons"; // 求人サイトボタンをまとめる

        jobSection.appendChild(jobHeading);
        jobSection.appendChild(countryLabel);
        jobSection.appendChild(jobCountrySelect);
        jobSection.appendChild(recommendedSitesLabel);
        jobSection.appendChild(jobButtonsArea);
        detailsArea.appendChild(jobSection);

        // 選択された国に合わせて求人サイトボタンを作り直す
        function updateJobButtons() {
            jobButtonsArea.innerHTML = "";
            const selectedCountry = jobCountrySelect.value;
            const jobSites = jobUrls[selectedCountry];

            Object.keys(jobSites).forEach(function(siteName) {
                const siteButton = document.createElement("button");
                siteButton.textContent = siteName;
                siteButton.addEventListener("click", function() {
                    window.open(jobSites[siteName], "_blank");
                });
                jobButtonsArea.appendChild(siteButton);
            });
        }

        jobCountrySelect.addEventListener("change", function() {
            updateJobButtons();
        });

        updateJobButtons(); // 初期表示時にNew Zealandの求人サイトを表示
    }

    // 航空券検索タスクの場合、Flight Informationセクションを追加
    if (task.type === "flight") {
        const countries = [
            "New Zealand",
            "Australia"
        ];

        countries.forEach(function(country) {
            const option = document.createElement("option"); // <option>を作成
            option.value = country; // <option>のvalue属性を設定
            option.textContent = country; // <option>の表示テキストを設定
            flightCountrySelect.appendChild(option); // <select>に<option>を追加
        });

        const countryLabel = document.createElement("label"); // Countryのラベルを作成
        setTranslatedText(countryLabel, "country"); // ラベルのテキストを設定
        const recommendedSitesLabel = document.createElement("p"); // 航空券検索サイト一覧のラベルを作成
        setTranslatedText(recommendedSitesLabel, "recommendedFlightSites"); // ラベルのテキストを設定
        recommendedSitesLabel.className = "information-label"; // Information共通のラベルスタイルを設定

        flightCountrySelect.id = "flight-country-select"; // 国選択にidを設定
        countryLabel.htmlFor = "flight-country-select"; // ラベルと国選択を関連づける
        flightSection.className = "detail-section information-section recommendation-section flight-section"; // 共通デザインを持つFlightセクションにする
        flightHeading.className = "detail-heading"; // 詳細セクション共通の見出しスタイルを設定
        setTranslatedText(flightHeading, "flightInformation"); // 航空券情報セクションの見出しを設定
        flightButtonsArea.className = "recommendation-buttons flight-buttons"; // 航空券検索サイトボタンをまとめる

        flightSection.appendChild(flightHeading);
        flightSection.appendChild(countryLabel);
        flightSection.appendChild(flightCountrySelect);
        flightSection.appendChild(recommendedSitesLabel);
        flightSection.appendChild(flightButtonsArea);
        detailsArea.appendChild(flightSection);

        // 選択された国に合わせて航空券検索サイトボタンを作り直す
        function updateFlightButtons() {
            flightButtonsArea.innerHTML = "";
            const selectedCountry = flightCountrySelect.value;
            const flightSites = flightUrls[selectedCountry];

            Object.keys(flightSites).forEach(function(siteName) {
                const siteButton = document.createElement("button");
                siteButton.textContent = siteName;
                siteButton.addEventListener("click", function() {
                    window.open(flightSites[siteName], "_blank");
                });
                flightButtonsArea.appendChild(siteButton);
            });
        }

        flightCountrySelect.addEventListener("change", function() {
            updateFlightButtons();
        });

        updateFlightButtons(); // 初期表示時にNew Zealandの検索サイトを表示
    }

    // 宿泊先検索タスクの場合、Accommodation Informationセクションを追加
    if (task.type === "accommodation") {
        const countries = [
            "New Zealand",
            "Australia"
        ];

        countries.forEach(function(country) {
            const option = document.createElement("option"); // <option>を作成
            option.value = country; // <option>のvalue属性を設定
            option.textContent = country; // <option>の表示テキストを設定
            accommodationCountrySelect.appendChild(option); // <select>に<option>を追加
        });

        const countryLabel = document.createElement("label"); // Countryのラベルを作成
        setTranslatedText(countryLabel, "country"); // ラベルのテキストを設定
        const recommendedSitesLabel = document.createElement("p"); // 宿泊予約サイト一覧のラベルを作成
        setTranslatedText(recommendedSitesLabel, "recommendedAccommodationSites"); // ラベルのテキストを設定
        recommendedSitesLabel.className = "information-label"; // Information共通のラベルスタイルを設定

        accommodationCountrySelect.id = "accommodation-country-select"; // 国選択にidを設定
        countryLabel.htmlFor = "accommodation-country-select"; // ラベルと国選択を関連づける
        accommodationSection.className = "detail-section information-section recommendation-section accommodation-section"; // 共通デザインを持つAccommodationセクションにする
        accommodationHeading.className = "detail-heading"; // 詳細セクション共通の見出しスタイルを設定
        setTranslatedText(accommodationHeading, "accommodationInformation"); // 宿泊情報セクションの見出しを設定
        accommodationButtonsArea.className = "recommendation-buttons accommodation-buttons"; // 宿泊予約サイトボタンをまとめる

        accommodationSection.appendChild(accommodationHeading);
        accommodationSection.appendChild(countryLabel);
        accommodationSection.appendChild(accommodationCountrySelect);
        accommodationSection.appendChild(recommendedSitesLabel);
        accommodationSection.appendChild(accommodationButtonsArea);
        detailsArea.appendChild(accommodationSection);

        // 選択された国に合わせて宿泊予約サイトボタンを作り直す
        function updateAccommodationButtons() {
            accommodationButtonsArea.innerHTML = "";
            const selectedCountry = accommodationCountrySelect.value;
            const accommodationSites = accommodationUrls[selectedCountry];

            Object.keys(accommodationSites).forEach(function(siteName) {
                const siteButton = document.createElement("button");
                siteButton.textContent = siteName;
                siteButton.addEventListener("click", function() {
                    window.open(accommodationSites[siteName], "_blank");
                });
                accommodationButtonsArea.appendChild(siteButton);
            });
        }

        accommodationCountrySelect.addEventListener("change", function() {
            updateAccommodationButtons();
        });

        updateAccommodationButtons(); // 初期表示時にNew Zealandの宿泊予約サイトを表示
    }

    // Resume準備タスクの場合、Resume Informationセクションを追加
    if (task.type === "resume") {
        const countries = [
            "New Zealand",
            "Australia"
        ];

        countries.forEach(function(country) {
            const option = document.createElement("option"); // <option>を作成
            option.value = country; // <option>のvalue属性を設定
            option.textContent = country; // <option>の表示テキストを設定
            resumeCountrySelect.appendChild(option); // <select>に<option>を追加
        });

        const countryLabel = document.createElement("label"); // Countryのラベルを作成
        setTranslatedText(countryLabel, "country"); // ラベルのテキストを設定
        const recommendedResourcesLabel = document.createElement("p"); // Resume関連情報一覧のラベルを作成
        setTranslatedText(recommendedResourcesLabel, "recommendedResources"); // ラベルのテキストを設定
        recommendedResourcesLabel.className = "information-label"; // Information共通のラベルスタイルを設定
        const tipsLabel = document.createElement("p"); // Tipsのラベルを作成
        setTranslatedText(tipsLabel, "tips"); // ラベルのテキストを設定
        tipsLabel.className = "information-label resume-tips-label"; // Information共通のラベルスタイルを設定

        resumeCountrySelect.id = "resume-country-select"; // 国選択にidを設定
        countryLabel.htmlFor = "resume-country-select"; // ラベルと国選択を関連づける
        resumeSection.className = "detail-section information-section recommendation-section resume-section"; // 共通デザインを持つResumeセクションにする
        resumeHeading.className = "detail-heading"; // 詳細セクション共通の見出しスタイルを設定
        setTranslatedText(resumeHeading, "resumeInformation"); // Resume情報セクションの見出しを設定
        resumeButtonsArea.className = "recommendation-buttons resume-buttons"; // Resume関連サイトボタンをまとめる
        resumeTipsArea.className = "resume-tips"; // Tips専用のリストスタイルを設定

        resumeSection.appendChild(resumeHeading);
        resumeSection.appendChild(countryLabel);
        resumeSection.appendChild(resumeCountrySelect);
        resumeSection.appendChild(recommendedResourcesLabel);
        resumeSection.appendChild(resumeButtonsArea);
        resumeSection.appendChild(tipsLabel);
        resumeSection.appendChild(resumeTipsArea);
        detailsArea.appendChild(resumeSection);

        // 選択された国に合わせてResume関連ボタンとTipsを作り直す
        function updateResumeInformation() {
            resumeButtonsArea.innerHTML = "";
            resumeTipsArea.innerHTML = "";
            const selectedCountry = resumeCountrySelect.value;
            const resources = resumeResources[selectedCountry];

            Object.keys(resources.links).forEach(function(resourceName) {
                const resourceButton = document.createElement("button");
                resourceButton.textContent = resourceName;
                resourceButton.addEventListener("click", function() {
                    window.open(resources.links[resourceName], "_blank");
                });
                resumeButtonsArea.appendChild(resourceButton);
            });

            translations[currentLanguage].resumeTips[selectedCountry].forEach(function(tip) {
                const tipItem = document.createElement("li"); // <li>を作成
                tipItem.textContent = tip; // 国別Tipを設定
                resumeTipsArea.appendChild(tipItem); // Tipsリストに追加
            });
        }

        resumeCountrySelect.addEventListener("change", function() {
            updateResumeInformation();
        });

        updateResumeInformation(); // 初期表示時にNew Zealandの情報を表示
    }

    listItem.appendChild(detailsArea); // <li>の中に<div>を追加

    detailsArea.style.display = "none"; // 初期状態では詳細エリアを非表示にする

    taskList.appendChild(listItem); // <ul>の中に<li>を追加

    // チェックボックスの状態が変わったときに、進捗率を更新し、タスクの状態を保存する
    checkbox.addEventListener("change", function() {  // チェックボックスが変わったら、updateProgress()を実行する
        updateProgress(); // チェックボックスの状態が変わったら進捗率を更新する
        saveTaskStates();  // チェックボックスの状態を保存する  
        applyFilter(); // フィルターを適用することで、チェック状態が変わったときにフィルターが正しく反映される 
    });

    editButton.addEventListener("click", function() { // 編集ボタンがクリックされたら
        
        if (!isEditingTitle) { // タイトルを編集していない場合は入力欄を表示する
            const editInput = document.createElement("input"); // <input>を作成

            editInput.type = "text"; // <input type="text">にする
            editInput.value = task.title; // <input>の値をタスクのタイトルにする
            editInput.className = "task-title-input";

            taskContent.replaceChild(editInput, taskTextNode); // 左グループ内のタスク名を<input>に置き換える

            isEditingTitle = true;
            setTranslatedText(editButton, "save"); // ボタンのテキストを現在の言語のSaveに変更
            editButton.dataset.translationAriaLabel = "saveTask";
            editButton.setAttribute("aria-label", translations[currentLanguage].saveTask);
        } else {
            const editInput = taskContent.querySelector(".task-title-input"); // 左グループ内のタイトル編集欄を取得

            const newTaskText = editInput.value.trim(); // <input>の値を取得し、前後の空白を削除

            if (newTaskText === "") { // 入力欄が空の場合は何もしない
                return;
            }

            task.title = newTaskText; // 配列と同じタスクオブジェクトのタイトルを更新
            taskTextNode.textContent = newTaskText; // タスクのテキストを更新

            taskContent.replaceChild(taskTextNode, editInput); // 左グループ内の<input>をタスク名に置き換える

            localStorage.setItem("customTasks", JSON.stringify(customTasks)); // 配列をJSON文字列に変換してlocalStorageに保存

            isEditingTitle = false;
            setTranslatedText(editButton, "edit"); // ボタンのテキストを現在の言語のEditに変更
            editButton.dataset.translationAriaLabel = "editTask";
            editButton.setAttribute("aria-label", translations[currentLanguage].editTask);
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
            detailsArea.style.display = "grid";
            detailsButton.textContent = "▲";
            detailsButton.dataset.translationAriaLabel = "hideDetails";
            detailsButton.setAttribute("aria-label", translations[currentLanguage].hideDetails);
            detailsButton.setAttribute("aria-expanded", "true");
        } else { // 詳細エリアが表示されている場合は非表示にする
            detailsArea.style.display = "none";
            detailsButton.textContent = "▼";
            detailsButton.dataset.translationAriaLabel = "showDetails";
            detailsButton.setAttribute("aria-label", translations[currentLanguage].showDetails);
            detailsButton.setAttribute("aria-expanded", "false");
        }

    });

    // Edit Detailsボタンがクリックされたら
    editDetailsButton.addEventListener("click", function() {

        // Descriptionを編集していない場合は、入力欄を表示する
        if (!isEditingDescription) {

            const descriptionInput = document.createElement("input"); // <input>を作成

            descriptionInput.type = "text"; // <input type="text">にする
            descriptionInput.value = descriptionText.textContent; // 現在表示中の説明文を入力欄の値にする
            setTranslatedPlaceholder(descriptionInput, "enterTaskDetails"); // 現在の言語でplaceholderを設定

            descriptionContent.replaceChild(descriptionInput, descriptionText); // Description内の説明文を<input>に置き換える

            isEditingDescription = true;
            setTranslatedText(editDetailsButton, "save"); // ボタンのテキストを現在の言語のSaveに変更

        } else { // Descriptionを編集中の場合は、入力欄の値を保存する

            const descriptionInput = descriptionContent.querySelector("input"); // Description内の<input>を取得

            const newDescription = descriptionInput.value.trim(); // <input>の値を取得し、前後の空白を削除

            task.description = newDescription; // タスクの説明文を更新

            delete descriptionText.dataset.translationKey; // 編集後のDescriptionは言語切り替えで上書きしない
            descriptionText.textContent = newDescription; // 説明文のテキストを更新

            descriptionContent.replaceChild(descriptionText, descriptionInput);  // Description内の<input>を説明文に置き換える

            // カスタムタスクは更新済みのオブジェクトをlocalStorageにも保存
            if (!isDefault) {
                localStorage.setItem(
                    "customTasks",
                    JSON.stringify(customTasks)
                );
            }
            isEditingDescription = false;
            setTranslatedText(editDetailsButton, "editDetails");
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

// 表示言語を切り替える
languageToggleButton.addEventListener("click", function() {
    currentLanguage = currentLanguage === "en" ? "ja" : "en";
    updateLanguage();
});

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

updateLanguage(); // ページを開いた際の表示を初期言語に合わせる
