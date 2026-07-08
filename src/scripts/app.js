import { analyzeText, normalize } from "./ai-feedback.js";
import { clearProgress, loadProgress, saveProgress } from "./storage.js";
import { applyMissionScore, createInitialScores, skillLabels } from "./scoring.js";

const app = document.querySelector("#app");
const scoreOutput = document.querySelector("#scoreOutput");
const themeToggle = document.querySelector("#themeToggle");

const missions = [
  {
    id: "yanki",
    title: "Yanki Istasyonu",
    icon: "Y",
    skill: "understanding",
    maxScore: 30,
    unlocks: "kanit",
    type: "keyword",
    description: "Eski telsizden gelen kaydi dinle ve mesajdaki anahtar kelimeyi bul.",
    prompt: "Sinyal cozumleniyor: Ormandaki canlilar icin en gerekli duygu hangisidir?",
    answer: "umut",
    hint: "Karanlikta bile gelecege bakmayi saglayan kelimeyi dusun.",
  },
  {
    id: "kanit",
    title: "Kanit Dosyasi",
    icon: "K",
    skill: "understanding",
    maxScore: 40,
    unlocks: "sorgu",
    type: "classification",
    description: "Bulten, grafik ve rapor ifadelerini incele; bilgi ve gorusu ayirt et.",
    tabs: [
      {
        label: "Bulten",
        text: "Son olcumlerde ormandaki agac yogunlugunun son uc ayda azaldigi tespit edilmistir.",
        answer: "bilgi",
      },
      {
        label: "Grafik",
        text: "Sensor verileri toprak neminin mevsim normallerine yakin oldugunu gostermektedir.",
        answer: "bilgi",
      },
      {
        label: "Rapor",
        text: "Belediyenin ormancilik politikalari tamamen yanlistir ve herkes bunu boyle bilmelidir.",
        answer: "gorus",
      },
    ],
  },
  {
    id: "sorgu",
    title: "Sorgulama Odasi",
    icon: "S",
    skill: "inquiry",
    maxScore: 35,
    unlocks: "mantik",
    type: "choice",
    description: "Karakterin aciklamasini kanita dayali dusunerek sorgula.",
    prompt: "Gizli kesim yapilmadigini soyleyen yetkiliye hangi soru daha gucludur?",
    options: [
      "Kesim olmadigini kanitlayan tarihli rapor ve sensor verilerini paylasabilir misiniz?",
      "Neden kimse sizi sevmiyor?",
      "Orman zaten buyuk degil mi?",
    ],
    correctIndex: 0,
    feedback: "Net kanit istedin ve sorunu saygili bir dille kurdun.",
  },
  {
    id: "mantik",
    title: "Mantik Tesisati Laboratuvari",
    icon: "M",
    skill: "communication",
    maxScore: 45,
    unlocks: "uretim",
    type: "conjunction",
    description: "Kopuk mantik borularini dogru baglaclarla onar.",
    rows: [
      { before: "Agaclari suladik", after: "daha hizli buyuduler.", answer: "bu yuzden" },
      { before: "Copleri topladik", after: "orman tamamen temizlenmedi.", answer: "fakat" },
      { before: "Ates yakmamaliyiz", after: "orman yangini cikabilir.", answer: "cunku" },
    ],
    options: ["cunku", "fakat", "bu yuzden", "ancak"],
  },
  {
    id: "uretim",
    title: "Uretim: Gercegi Acikla",
    icon: "U",
    skill: "production",
    maxScore: 60,
    unlocks: "hayal",
    type: "production",
    description: "Meydandaki ekrana yansitilacak kisa ve guvenilir bir duyuru yaz.",
    prompt: "Duyuruda ormandaki gizli kesim supesini kanita dayali ve yapici bir dille acikla.",
  },
  {
    id: "hayal",
    title: "Hayal Atolyesi",
    icon: "H",
    skill: "production",
    maxScore: 55,
    unlocks: "ayna",
    type: "story",
    description: "Sincap ailesinin eski haline donusunu anlatan kisa bir hikaye yaz.",
    prompt: "Hikayende doga, denge, umut ve orman kelimelerinden en az ikisini kullan.",
  },
  {
    id: "ayna",
    title: "Kasif Aynasi",
    icon: "A",
    skill: "reflection",
    maxScore: 30,
    unlocks: null,
    type: "reflection",
    description: "Sisteme kaydolmak icin kendi surecini degerlendir.",
  },
];

const defaultState = {
  studentName: "",
  score: 0,
  skills: createInitialScores(),
  completedMissionIds: [],
  unlockedMissionIds: ["yanki"],
};

let state = loadProgress() ?? structuredClone(defaultState);

function render() {
  scoreOutput.value = `Puan: ${state.score}`;
  if (!state.studentName) {
    renderIntro();
    return;
  }
  renderMap();
}

function renderIntro() {
  const template = document.querySelector("#introTemplate");
  app.replaceChildren(template.content.cloneNode(true));
  document.querySelector("#startForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    state.studentName = String(formData.get("studentName")).trim();
    saveAndRender();
  });
}

function renderMap() {
  app.innerHTML = `
    <section class="game-layout" aria-label="Kelime Evreni oyun alani">
      <div class="map-panel">
        <div class="map-header">
          <div>
            <p class="eyebrow">Soz Atlasi akisi</p>
            <h2>Kelime Evreni Haritasi</h2>
            <p>Istasyonlari tamamla, anlam parcalarini topla ve sertifikani al.</p>
          </div>
          <button class="secondary-button" id="certificateButton" type="button">Sertifika</button>
        </div>
        <div class="map-board" id="mapBoard"></div>
      </div>
      <aside class="progress-panel" aria-label="Ilerleme paneli">
        <div class="student-card">
          <p>Kasif</p>
          <strong>${escapeHtml(state.studentName)}</strong>
        </div>
        <h3>Beceri Puanlari</h3>
        <div id="skillMeters"></div>
        <button class="ghost-button" id="resetButton" type="button">Ilerlemeyi Sifirla</button>
      </aside>
    </section>
  `;

  const board = document.querySelector("#mapBoard");
  missions.forEach((mission, index) => {
    const unlocked = state.unlockedMissionIds.includes(mission.id);
    const completed = state.completedMissionIds.includes(mission.id);
    const button = document.createElement("button");
    button.className = `mission-node ${completed ? "completed" : ""}`;
    button.type = "button";
    button.disabled = !unlocked;
    button.innerHTML = `
      <span class="node-icon">${mission.icon}</span>
      <strong>${index + 1}. ${mission.title}</strong>
      <span class="node-status">${completed ? "Tamamlandi" : unlocked ? "Acik" : "Kilitli"}</span>
    `;
    button.addEventListener("click", () => renderMission(mission));
    board.append(button);
  });

  document.querySelector("#skillMeters").innerHTML = Object.entries(skillLabels)
    .map(([key, label]) => {
      const value = Math.min(100, state.skills[key]);
      return `
        <div class="skill-meter">
          <div class="meter-label"><span>${label}</span><span>${value}</span></div>
          <div class="meter-track"><div class="meter-fill" style="--value:${value}%"></div></div>
        </div>
      `;
    })
    .join("");

  document.querySelector("#certificateButton").addEventListener("click", renderCertificate);
  document.querySelector("#resetButton").addEventListener("click", () => {
    clearProgress();
    state = structuredClone(defaultState);
    render();
  });
}

function renderMission(mission) {
  app.innerHTML = `
    <section class="mission-panel" aria-labelledby="missionTitle">
      <span class="mission-kicker">${skillLabels[mission.skill]} Gorevi</span>
      <h2 class="mission-title" id="missionTitle">${mission.title}</h2>
      <p class="mission-description">${mission.description}</p>
      <div class="task-card" id="taskCard"></div>
      <div class="task-actions">
        <button class="secondary-button" id="backButton" type="button">Haritaya Don</button>
      </div>
    </section>
  `;
  document.querySelector("#backButton").addEventListener("click", renderMap);

  if (mission.type === "keyword") renderKeywordMission(mission);
  if (mission.type === "classification") renderClassificationMission(mission);
  if (mission.type === "choice") renderChoiceMission(mission);
  if (mission.type === "conjunction") renderConjunctionMission(mission);
  if (mission.type === "production" || mission.type === "story") renderWritingMission(mission);
  if (mission.type === "reflection") renderReflectionMission(mission);
}

function renderKeywordMission(mission) {
  const task = document.querySelector("#taskCard");
  task.innerHTML = `
    <strong>${mission.prompt}</strong>
    <div class="feedback-box">Sinyal cozumleniyor... "Karanlik sis dagilacak, cunku bizde hala ____ var."</div>
    <label for="keywordAnswer">Anahtar kelime</label>
    <input class="task-input" id="keywordAnswer" type="text" autocomplete="off">
    <div class="task-actions">
      <button class="primary-button" id="checkButton" type="button">Kontrol Et</button>
      <button class="secondary-button" id="hintButton" type="button">Ipucu Al</button>
    </div>
    <div id="feedback" aria-live="polite"></div>
  `;
  document.querySelector("#hintButton").addEventListener("click", () => showFeedback(mission.hint, "warning"));
  document.querySelector("#checkButton").addEventListener("click", () => {
    const value = normalize(document.querySelector("#keywordAnswer").value);
    if (value === mission.answer) completeMission(mission, mission.maxScore, "Dogru! Kelimeyi baglamdan cikardin.");
    else showFeedback("Cevabin yakin olabilir; cumlede bos kalan duygu kelimesini tekrar dusun.", "warning");
  });
}

function renderClassificationMission(mission) {
  const task = document.querySelector("#taskCard");
  let activeIndex = 0;
  const answers = {};

  function paint() {
    const active = mission.tabs[activeIndex];
    task.innerHTML = `
      <div class="evidence-tabs">
        ${mission.tabs.map((tab, index) => `<button class="tab-button ${index === activeIndex ? "active" : ""}" data-tab="${index}" type="button">${tab.label}</button>`).join("")}
      </div>
      <div class="evidence-box">${active.text}</div>
      <div class="classification-grid">
        <button class="option-button" data-answer="bilgi" type="button">Bilgi / Nesnel veri</button>
        <button class="option-button" data-answer="gorus" type="button">Gorus / Kisisel yorum</button>
      </div>
      <button class="primary-button" id="finishClassification" type="button">Analizi Tamamla</button>
      <div id="feedback" aria-live="polite"></div>
    `;
    task.querySelectorAll("[data-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        activeIndex = Number(button.dataset.tab);
        paint();
      });
    });
    task.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        answers[activeIndex] = button.dataset.answer;
        showFeedback(`${mission.tabs[activeIndex].label} icin "${button.textContent}" secildi.`, "success");
      });
    });
    task.querySelector("#finishClassification").addEventListener("click", () => {
      const correct = mission.tabs.filter((tab, index) => answers[index] === tab.answer).length;
      if (correct === mission.tabs.length) completeMission(mission, mission.maxScore, "Dogru analiz! Kanitlanabilir veriler ile yorumlari ayirdin.");
      else showFeedback(`${correct}/${mission.tabs.length} dogru. Bilgi kanitlanabilir, gorus kisiden kisiye degisebilir.`, "warning");
    });
  }

  paint();
}

function renderChoiceMission(mission) {
  const task = document.querySelector("#taskCard");
  let selected = null;
  task.innerHTML = `
    <strong>${mission.prompt}</strong>
    <div class="task-options">
      ${mission.options.map((option, index) => `<button class="option-button" data-index="${index}" type="button">${option}</button>`).join("")}
    </div>
    <button class="primary-button" id="checkButton" type="button">Sorguyu Gonder</button>
    <div id="feedback" aria-live="polite"></div>
  `;
  task.querySelectorAll("[data-index]").forEach((button) => {
    button.addEventListener("click", () => {
      selected = Number(button.dataset.index);
      task.querySelectorAll("[data-index]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
  task.querySelector("#checkButton").addEventListener("click", () => {
    if (selected === mission.correctIndex) completeMission(mission, mission.maxScore, mission.feedback);
    else showFeedback("Bu soru yeterince kanita dayanmiyor. Daha net ve belge isteyen soruyu sec.", "warning");
  });
}

function renderConjunctionMission(mission) {
  const task = document.querySelector("#taskCard");
  task.innerHTML = `
    <div class="conjunction-grid">
      ${mission.rows.map((row, index) => `
        <label class="sentence-row">
          <span>${row.before}</span>
          <select data-row="${index}">
            <option value="">Baglac sec</option>
            ${mission.options.map((option) => `<option value="${option}">${option}</option>`).join("")}
          </select>
          <span>${row.after}</span>
        </label>
      `).join("")}
    </div>
    <button class="primary-button" id="checkButton" type="button">Valfleri Kontrol Et</button>
    <div id="feedback" aria-live="polite"></div>
  `;
  task.querySelector("#checkButton").addEventListener("click", () => {
    const correct = mission.rows.filter((row, index) => task.querySelector(`[data-row="${index}"]`).value === row.answer).length;
    if (correct === mission.rows.length) completeMission(mission, mission.maxScore, "Mantik tesisati onarildi. Baglaclari anlam iliskisine gore sectin.");
    else showFeedback(`${correct}/${mission.rows.length} dogru. Cunku gerekce, fakat karsitlik, bu yuzden sonuc bildirir.`, "warning");
  });
}

function renderWritingMission(mission) {
  const task = document.querySelector("#taskCard");
  task.innerHTML = `
    <strong>${mission.prompt}</strong>
    <textarea class="task-textarea" id="writingAnswer" rows="7" minlength="40" placeholder="Cevabini buraya yaz"></textarea>
    <button class="primary-button" id="analyzeButton" type="button">Yapay Zekaya Incelet</button>
    <div id="feedback" aria-live="polite"></div>
  `;
  task.querySelector("#analyzeButton").addEventListener("click", () => {
    const text = task.querySelector("#writingAnswer").value;
    const result = analyzeText(text, mission.type);
    if (result.passed) completeMission(mission, Math.round((mission.maxScore * result.score) / 100), result.message);
    else showFeedback(result.message, "warning");
  });
}

function renderReflectionMission(mission) {
  const task = document.querySelector("#taskCard");
  task.innerHTML = `
    <label class="reflection-field">
      En guclu kanitin hangisiydi?
      <select id="bestEvidence">
        <option>Rapordaki gizli detay</option>
        <option>Grafikteki azalma</option>
        <option>Bultendeki olcum</option>
      </select>
    </label>
    <label class="reflection-field">
      Bu kanit neden guvenilirdi?
      <textarea id="reflectionReason" rows="4" placeholder="Gerekceni yaz"></textarea>
    </label>
    <button class="primary-button" id="finishReflection" type="button">Sureci Kaydet</button>
    <div id="feedback" aria-live="polite"></div>
  `;
  task.querySelector("#finishReflection").addEventListener("click", () => {
    const reason = task.querySelector("#reflectionReason").value.trim();
    if (reason.length >= 30) completeMission(mission, mission.maxScore, "Yansitman kaydedildi. Surecini gerekcelendirerek degerlendirdin.");
    else showFeedback("Yansitma cevabinda en az bir gerekce yazmalisin.", "warning");
  });
}

function completeMission(mission, score, message) {
  if (!state.completedMissionIds.includes(mission.id)) {
    applyMissionScore(state, mission, score);
  }
  saveProgress(state);
  showFeedback(message, "success");
  scoreOutput.value = `Puan: ${state.score}`;
  setTimeout(() => {
    if (state.completedMissionIds.length === missions.length) renderCertificate();
    else renderMap();
  }, 1200);
}

function renderCertificate() {
  const completed = state.completedMissionIds.length === missions.length;
  app.innerHTML = `
    <section class="certificate-panel" aria-labelledby="certificateTitle">
      <p class="eyebrow">Kelime Evreni Kasifler Loncası</p>
      <h2 id="certificateTitle">${completed ? "Sertifikan Hazir" : "Ara Rapor"}</h2>
      <p>Bu belge, anlam kurma ve kelime kesfi surecindeki calismalarini gosterir.</p>
      <div class="certificate-name">${escapeHtml(state.studentName)}</div>
      <p>Toplam Puan: <strong>${state.score}</strong></p>
      <div class="certificate-stats">
        ${Object.entries(skillLabels).map(([key, label]) => `<div><strong>${state.skills[key]}</strong><span>${label}</span></div>`).join("")}
      </div>
      <div class="task-actions">
        <button class="primary-button" type="button" onclick="window.print()">Yazdir</button>
        <button class="secondary-button" id="backButton" type="button">Haritaya Don</button>
      </div>
    </section>
  `;
  document.querySelector("#backButton").addEventListener("click", renderMap);
}

function showFeedback(message, type) {
  const target = document.querySelector("#feedback");
  if (!target) return;
  target.innerHTML = `<div class="feedback-box ${type}">${message}</div>`;
}

function saveAndRender() {
  saveProgress(state);
  render();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  themeToggle.textContent = nextTheme === "dark" ? "☾" : "☼";
});

render();

