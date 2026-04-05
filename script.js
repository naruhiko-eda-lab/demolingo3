let score = 0; 
let currentIndex = 0;
let selectedOption = null;
let state = 'question';
let missedQuestions = []; 
let originalTotalQuestions = 0; // ★最初の問題数を保存する変数

const quizData = [
    { id: 1, kanji: "買います", furigana: "かいます", options: ["买", "卖", "读", "写"], correctAnswer: "买" },
    { id: 2, kanji: "会います", furigana: "あいます", options: ["见（面）", "去", "吃", "看"], correctAnswer: "见（面）" },
    { id: 3, kanji: "聞きます", furigana: "ききます", options: ["写", "听", "读", "做"], correctAnswer: "听" },
    { id: 4, kanji: "書きます", furigana: "かきます", options: ["听", "写", "拍", "读"], correctAnswer: "写" },
    { id: 5, kanji: "飲みます", furigana: "のみます", options: ["喝", "吃", "买", "做"], correctAnswer: "喝" },
    { id: 6, kanji: "読みます", furigana: "よみます", options: ["写", "读", "看", "听"], correctAnswer: "读" },
    { id: 7, kanji: "撮ります", furigana: "とります", options: ["照、拍", "看", "写", "取"], correctAnswer: "照、拍" },
    { id: 8, kanji: "食べます", furigana: "たべます", options: ["喝", "吃", "买", "去"], correctAnswer: "吃" },
    { id: 9, kanji: "見ます", furigana: "みます", options: ["看", "听", "读", "写"], correctAnswer: "看" },
    { id: 10, kanji: "します", furigana: "します", options: ["做、干", "去", "来", "休息"], correctAnswer: "做、干" },
    { id: 11, kanji: "朝ご飯", furigana: "あさごはん", options: ["早饭", "午饭", "晚饭", "点心"], correctAnswer: "早饭" },
    { id: 12, kanji: "昼ご飯", furigana: "ひるごはん", options: ["午饭", "早饭", "晚饭", "夜宵"], correctAnswer: "午饭" },
    { id: 13, kanji: "晩ご飯", furigana: "ばんごはん", options: ["晚饭", "早饭", "午饭", "饭盒"], correctAnswer: "晚饭" },
    { id: 14, kanji: "パン", furigana: "パン", options: ["面包", "米饭", "面条", "鸡蛋"], correctAnswer: "面包" },
    { id: 15, kanji: "卵", furigana: "たまご", options: ["肉", "鱼", "鸡蛋", "蔬菜"], correctAnswer: "鸡蛋" },
    { id: 16, kanji: "肉", furigana: "にく", options: ["肉", "鱼", "鸡蛋", "水果"], correctAnswer: "肉" },
    { id: 17, kanji: "魚", furigana: "さかな", options: ["鱼", "肉", "贝类", "蔬菜"], correctAnswer: "鱼" },
    { id: 18, kanji: "野菜", furigana: "やさい", options: ["水果", "蔬菜", "花", "肉"], correctAnswer: "蔬菜" },
    { id: 19, kanji: "果物", furigana: "くだもの", options: ["水果", "蔬菜", "果汁", "糖果"], correctAnswer: "水果" },
    { id: 20, kanji: "お茶", furigana: "おちゃ", options: ["茶、日本茶", "红茶", "咖啡", "水"], correctAnswer: "茶、日本茶" },
    { id: 21, kanji: "紅茶", furigana: "こうちゃ", options: ["红茶", "日本茶", "乌龙茶", "奶茶"], correctAnswer: "红茶" },
    { id: 22, kanji: "牛乳", furigana: "ぎゅうにゅう", options: ["牛奶", "水", "果汁", "啤酒"], correctAnswer: "牛奶" },
    { id: 23, kanji: "果汁", furigana: "ジュース", options: ["果汁", "啤酒", "水", "可乐"], correctAnswer: "果汁" },
    { id: 24, kanji: "ビール", furigana: "ビール", options: ["啤酒", "果汁", "白酒", "红茶"], correctAnswer: "啤酒" },
    { id: 25, kanji: "お酒", furigana: "おさけ", options: ["酒、日本酒", "啤酒", "水", "红茶"], correctAnswer: "酒、日本酒" },
    { id: 26, kanji: "映画", furigana: "えいが", options: ["电影", "录像带", "电视", "照片"], correctAnswer: "电影" },
    { id: 27, kanji: "手紙", furigana: "てがみ", options: ["信", "报告", "照片", "字典"], correctAnswer: "信" },
    { id: 28, kanji: "写真", furigana: "しゃしん", options: ["照片", "电影", "录像带", "书"], correctAnswer: "照片" },
    { id: 29, kanji: "庭", furigana: "にわ", options: ["庭院、院子", "店", "学校", "教室"], correctAnswer: "庭院、院子" },
    { id: 30, kanji: "宿題", furigana: "しゅくだい", options: ["作业", "报告", "考试", "工作"], correctAnswer: "作业" },
    { id: 31, kanji: "お花見", furigana: "おはなみ", options: ["看花、赏花", "散步", "做作业", "看电影"], correctAnswer: "看花、赏花" },
    { id: 32, kanji: "一緒に", furigana: "いっしょに", options: ["一起", "经常", "有时", "一点儿"], correctAnswer: "一起" },
    { id: 33, kanji: "ちょっと", furigana: "ちょっと", options: ["一会儿、一点儿", "经常", "然后", "非常"], correctAnswer: "一会儿、一点儿" },
    { id: 34, kanji: "いつも", furigana: "いつも", options: ["经常、总是", "有时", "很少", "不怎么"], correctAnswer: "经常、总是" },
    { id: 35, kanji: "時々", furigana: "ときどき", options: ["有时", "经常", "总是", "从来不"], correctAnswer: "有时" },
    { id: 36, kanji: "それから", furigana: "それから", options: ["然后", "但是", "所以", "因为"], correctAnswer: "然后" }
];

// 中間地点の計算（単語を増やしても自動で半分を計算します）
const BREAK_POINT = Math.floor(quizData.length / 2);

const elements = {
    progressBar: document.getElementById('progress-bar'),
    quizArea: document.getElementById('quiz-area'),
    resultsArea: document.getElementById('results-area'),
    kanji: document.getElementById('kanji'),
    furigana: document.getElementById('furigana'),
    optionsGrid: document.getElementById('options-grid'),
    actionBtn: document.getElementById('action-btn'),
    footer: document.getElementById('footer'),
    feedbackContainer: document.getElementById('feedback-container'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackCorrectAnswer: document.getElementById('feedback-correct-answer'),
    audioBtn: document.getElementById('audio-btn')
};

let audioCtx = null;
function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function speakText(text, lang = 'zh-CN') {
    if (!text) return;
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    if (lang.includes('ja')) utterance.rate = 0.85;

    const voices = window.speechSynthesis.getVoices();
    let targetVoice = voices.find(v => v.lang === lang && (v.name.includes('Google') || v.name.includes('Premium')));
    if (!targetVoice) targetVoice = voices.find(v => v.lang.includes(lang));
    if (targetVoice) utterance.voice = targetVoice;
    window.speechSynthesis.speak(utterance);
}

function renderQuestion() {
    const question = quizData[currentIndex];
    
    // ★ 78行目付近：進捗バーを最後まで届くように修正
    const progress = ((currentIndex + 1) / quizData.length) * 100;
    elements.progressBar.style.width = `${progress}%`;

    elements.kanji.textContent = question.kanji;
    elements.furigana.textContent = question.furigana;
    elements.optionsGrid.innerHTML = '';
    selectedOption = null;
    resetFooter();

    const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
            if (state !== 'answering') return;
            initAudio();
            Array.from(elements.optionsGrid.children).forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedOption = opt;
            elements.actionBtn.disabled = false;
            speakText(opt, 'zh-CN'); 
        });
        elements.optionsGrid.appendChild(btn);
    });
    state = 'answering';
}

function handleBtnClick() {
    initAudio();
    if (state === 'answering') {
        checkAnswer();
    } else {
        handleAction();
    }
}

function checkAnswer() {
    const question = quizData[currentIndex];
    const isCorrect = selectedOption === question.correctAnswer;
    const feedbackImg = document.getElementById('feedback-img'); 

    state = 'feedback';
    elements.feedbackContainer.classList.remove('hidden');
    elements.actionBtn.textContent = '继续'; 

    Array.from(elements.optionsGrid.children).forEach(btn => btn.classList.add('disabled'));

    if (isCorrect) {
        score++;
        elements.footer.classList.add('correct');
        elements.feedbackTitle.textContent = '太棒了！';
        elements.feedbackCorrectAnswer.classList.add('hidden');
        if (feedbackImg) feedbackImg.src = 'images/correct.png';
        playCorrectSound();
    } else {
        missedQuestions.push(question);
        elements.footer.classList.add('incorrect');
        elements.feedbackTitle.textContent = '不正确。';
        elements.feedbackCorrectAnswer.querySelector('span').textContent = question.correctAnswer;
        elements.feedbackCorrectAnswer.classList.remove('hidden');
        if (feedbackImg) feedbackImg.src = 'images/incorrect.png';
        playIncorrectSound();
    }
}

function handleAction() {
    if (state === 'feedback') {
        currentIndex++;
        
        // ★ 休憩判定：全問題数が「最初の数」と同じ、かつ「中間」の時だけ出す（解き直し時は出さない）
        if (quizData.length === originalTotalQuestions && currentIndex === BREAK_POINT) {
            showBreakScreen();
            return;
        }

        if (currentIndex < quizData.length) {
            renderQuestion();
        } else {
            showFinalResult();
        }
    } else if (state === 'break') {
        renderQuestion();
    }
}

function showBreakScreen() {
    state = 'break';
    elements.optionsGrid.innerHTML = ''; 
    elements.kanji.textContent = "休息時間";
    elements.furigana.textContent = "がんばっているね！";
    const feedbackImg = document.getElementById('feedback-img');
    if (feedbackImg) feedbackImg.src = 'images/break.png';
    elements.feedbackTitle.textContent = "おつかれさま！ちょっとひと休み。";
    elements.actionBtn.textContent = '再開する';
}

function showFinalResult() {
    state = 'finished';
    elements.optionsGrid.innerHTML = '';
    elements.kanji.textContent = "🎉 お疲れ様でした！";
    elements.furigana.textContent = `正解数: ${score} / ${quizData.length}`;
    const percent = Math.round((score / quizData.length) * 100);
    elements.feedbackTitle.textContent = `あなたのスコアは ${percent}点 です！`;
    
    if (missedQuestions.length > 0) {
        elements.actionBtn.textContent = `間違えた ${missedQuestions.length} 問を解き直す`;
        elements.actionBtn.onclick = () => retryMissedQuestions();
    } else {
        elements.actionBtn.textContent = '最初から挑戦する';
        elements.actionBtn.onclick = () => location.reload();
    }
    
    elements.feedbackContainer.classList.remove('hidden');
}

function retryMissedQuestions() {
    quizData.splice(0, quizData.length, ...missedQuestions); 
    missedQuestions = []; 
    currentIndex = 0;
    score = 0;
    state = 'question';
    renderQuestion();
    elements.actionBtn.onclick = null; 
}

function playCorrectSound() { new Audio('sounds/correct.mp3').play().catch(() => {}); }
function playIncorrectSound() { new Audio('sounds/incorrect.mp3').play().catch(() => {}); }

function resetFooter() {
    elements.footer.classList.remove('correct', 'incorrect');
    elements.feedbackContainer.classList.add('hidden');
    elements.actionBtn.textContent = '检查';
    elements.actionBtn.disabled = true;
}

function init() {
    // ★ 起動時の問題数を保存
    originalTotalQuestions = quizData.length;
    
    quizData.sort(() => Math.random() - 0.5); 
    currentIndex = 0;
    score = 0;
    missedQuestions = [];
    renderQuestion();

    elements.actionBtn.addEventListener('click', handleBtnClick);

    const closeBtn = document.querySelector('.close-btn') || document.getElementById('close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (confirm('最初に戻りますか？')) {
                location.reload(); 
            }
        });
    }

    elements.audioBtn.addEventListener('click', () => {
        initAudio();
        if (state === 'break') {
            speakText("がんばっているね！ちょっとひと休み。", 'ja-JP');
        } else {
            const question = quizData[currentIndex];
            const textToSpeak = question.yomi || question.furigana;
            speakText(textToSpeak, 'ja-JP');
        }
    });
}

document.addEventListener('DOMContentLoaded', init);