let score = 0; 
let currentIndex = 0;
let selectedOption = null;
let state = 'question';
let missedQuestions = []; 
let originalTotalQuestions = 0; // ★最初の問題数を保存する変数

const quizData = [
    { id: 1, kanji: "切ります", furigana: "きります", options: ["切、剪", "寄、发", "教", "学习"], correctAnswer: "切、剪" },
    { id: 2, kanji: "送ります", furigana: "おくります", options: ["寄、发", "切", "给", "借"], correctAnswer: "寄、发" },
    { id: 3, kanji: "あげます", furigana: "あげます", options: ["给", "得到", "借", "教"], correctAnswer: "给" },
    { id: 4, kanji: "もらいます", furigana: "もらいます", options: ["得到", "给", "借", "学习"], correctAnswer: "得到" },
    { id: 5, kanji: "貸します", furigana: "かします", options: ["借出", "借入", "教", "学习"], correctAnswer: "借出" },
    { id: 6, kanji: "借ります", furigana: "かります", options: ["借入", "借出", "给", "得到"], correctAnswer: "借入" },
    { id: 7, kanji: "教えます", furigana: "おしえます", options: ["教、告诉", "学习", "打（电话）", "切"], correctAnswer: "教、告诉" },
    { id: 8, kanji: "習います", furigana: "ならいます", options: ["学习", "教", "借", "寄"], correctAnswer: "学习" },
    { id: 9, kanji: "かけます", furigana: "かけます", options: ["打（电话）", "接", "写", "看"], correctAnswer: "打（电话）" },
    { id: 10, kanji: "手", furigana: "て", options: ["手", "纸", "筷子", "剪刀"], correctAnswer: "手" },
    { id: 11, kanji: "はし", furigana: "はし", options: ["筷子", "勺子", "叉子", "手"], correctAnswer: "筷子" },
    { id: 12, kanji: "スプーン", furigana: "スプーン", options: ["勺子", "叉子", "刀", "筷子"], correctAnswer: "勺子" },
    { id: 13, kanji: "ナイフ", furigana: "ナイフ", options: ["刀", "剪刀", "勺子", "纸"], correctAnswer: "刀" },
    { id: 14, kanji: "フォーク", furigana: "フォーク", options: ["叉子", "勺子", "刀", "筷子"], correctAnswer: "叉子" },
    { id: 15, kanji: "はさみ", furigana: "はさみ", options: ["剪刀", "刀", "打孔机", "橡皮"], correctAnswer: "剪刀" },
    { id: 16, kanji: "パソコン", furigana: "パソコン", options: ["电脑", "手机", "电视", "收音机"], correctAnswer: "电脑" },
    { id: 17, kanji: "ケータイ", furigana: "ケータイ", options: ["手机", "电脑", "电子邮件", "贺年卡"], correctAnswer: "手机" },
    { id: 18, kanji: "メール", furigana: "メール", options: ["电子邮件", "信", "明信片", "包裹"], correctAnswer: "电子邮件" },
    { id: 19, kanji: "年賀状", furigana: "ねんがじょう", options: ["贺年卡", "生日卡", "名片", "手紙"], correctAnswer: "贺年卡" },
    { id: 20, kanji: "パンチ", furigana: "パンチ", options: ["打孔机", "订书机", "透明胶带", "橡皮"], correctAnswer: "打孔机" },
    { id: 21, kanji: "ホッチキス", furigana: "ホッチキス", options: ["订书机", "打孔机", "橡皮", "纸"], correctAnswer: "订书机" },
    { id: 22, kanji: "セロテープ", furigana: "セロテープ", options: ["透明胶带", "纸", "剪刀", "针"], correctAnswer: "透明胶带" },
    { id: 23, kanji: "消しゴム", furigana: "けしゴム", options: ["橡皮", "纸", "订书机", "笔"], correctAnswer: "橡皮" },
    { id: 24, kanji: "紙", furigana: "かみ", options: ["纸", "手", "钱", "车票"], correctAnswer: "纸" },
    { id: 25, kanji: "花", furigana: "はな", options: ["花", "行李", "礼物", "衬衫"], correctAnswer: "花" },
    { id: 26, kanji: "シャツ", furigana: "シャツ", options: ["衬衫", "裤子", "鞋子", "礼物"], correctAnswer: "衬衫" },
    { id: 27, kanji: "プレゼント", furigana: "プレゼント", options: ["礼物", "行李", "钱", "花"], correctAnswer: "礼物" },
    { id: 28, kanji: "荷物", furigana: "にもつ", options: ["行李、包裹", "礼物", "钱", "车票"], correctAnswer: "行李、包裹" },
    { id: 29, kanji: "お金", furigana: "おかね", options: ["钱", "车票", "礼物", "纸"], correctAnswer: "钱" },
    { id: 30, kanji: "切符", furigana: "きっぷ", options: ["车票", "钱", "行李", "信"], correctAnswer: "车票" },
    { id: 31, kanji: "父", furigana: "ちち", options: ["（我的）爸爸", "（他人的）父亲", "妈妈", "哥哥"], correctAnswer: "（我的）爸爸" },
    { id: 32, kanji: "母", furigana: "はは", options: ["（我的）妈妈", "（他人的）母亲", "爸爸", "姐姐"], correctAnswer: "（我的）妈妈" },
    { id: 33, kanji: "お父さん", furigana: "おとうさん", options: ["（他人的）父亲", "（我的）爸爸", "妈妈", "叔叔"], correctAnswer: "（他人的）父亲" },
    { id: 34, kanji: "お母さん", furigana: "おかあさん", options: ["（他人的）母亲", "（我的）妈妈", "爸爸", "阿姨"], correctAnswer: "（他人的）母亲" },
    { id: 35, kanji: "もう", furigana: "もう", options: ["已经", "还没", "现在", "从今以后"], correctAnswer: "已经" },
    { id: 36, kanji: "まだ", furigana: "まだ", options: ["还没", "已经", "再来", "总是"], correctAnswer: "还没" }
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