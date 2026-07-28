// Estrutura das Perguntas do Quiz
const questions = [
  {
    question: "Qual é o seu principal objetivo hoje?",
    options: [
      "🎯 Performar sob alta pressão sem travar",
      "⚡ Ter foco total e parar de me distrair",
      "🛡️ Eliminar a ansiedade antes de momentos decisivos",
      "🚀 Construir uma rotina de alta performance"
    ]
  },
  {
    question: "Quando você está sob pressão, o que costuma acontecer?",
    options: [
      "Sinto o corpo pesado e travo nas decisões",
      "Minha mente fica acelerada e perco o foco",
      "Fico com receio de errar e arrisco menos",
      "Consigo lidar, mas sinto que poderia render mais"
    ]
  },
  {
    question: "Quanto tempo você pode dedicar por dia para treinar sua mente?",
    options: [
      "⏱️ 5 a 10 minutos por dia",
      "⏱️ 15 a 30 minutos por dia",
      "⏱️ Quanto tempo for necessário"
    ]
  },
  {
    question: "Qual o seu nível de comprometimento em mudar isso hoje?",
    options: [
      "🔥 Total! Quero resolver isso o quanto antes",
      "👍 Alto, preciso de uma solução prática",
      "🙂 Moderado, estou avaliando opções"
    ]
  }
];

let currentQuestion = 0;

function startQuiz() {
  document.getElementById("phase-intro").classList.remove("active");
  document.getElementById("phase-quiz").classList.add("active");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-number").innerText = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  document.getElementById("question-text").innerText = q.question;
  
  // Atualiza Barra de Progresso
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = `${progressPercent}%`;

  // Renderiza Opções
  const container = document.getElementById("options-container");
  container.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = option;
    btn.onclick = () => selectOption();
    container.appendChild(btn);
  });
}

function selectOption() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showLoadingPhase();
  }
}

function showLoadingPhase() {
  document.getElementById("phase-quiz").classList.remove("active");
  document.getElementById("phase-loading").classList.add("active");

  let progress = 0;
  const loadingBar = document.getElementById("loading-bar");
  const loadingStatus = document.getElementById("loading-status");

  const interval = setInterval(() => {
    progress += 20;
    loadingBar.style.width = `${progress}%`;

    if (progress === 40) {
      loadingStatus.innerText = "Mapeando seus pontos de bloqueio...";
    } else if (progress === 80) {
      loadingStatus.innerText = "Gerando seu plano de ação personalizado...";
    } else if (progress >= 100) {
      clearInterval(interval);
      setTimeout(showOfferPhase, 500);
    }
  }, 600);
}

function showOfferPhase() {
  document.getElementById("phase-loading").classList.remove("active");
  document.getElementById("phase-offer").classList.add("active");
  
  // Ajusta o link do botão final preservando as UTMs recebidas
  setupUtmLink();

  startTimer(15 * 60); // 15 minutos de cronômetro
}

function setupUtmLink() {
  const offerBtn = document.querySelector("#phase-offer .btn-primary");
  if (!offerBtn) return;

  const currentUrlParams = window.location.search; // Pega os parâmetros da URL atual (?utm_source=...)
  const baseUrl = offerBtn.getAttribute("href"); // Pega o link original (ex: https://nevorawise.com)

  if (currentUrlParams) {
    // Se a URL do botão já tiver '?', usa '&', caso contrário usa '?'
    const separator = baseUrl.includes("?") ? "&" : "?";
    // Limpa a interrogação inicial dos parâmetros para não duplicar
    const cleanParams = currentUrlParams.startsWith("?") ? currentUrlParams.substring(1) : currentUrlParams;
    
    offerBtn.setAttribute("href", `${baseUrl}${separator}${cleanParams}`);
  }
}

function startTimer(duration) {
  let timer = duration, minutes, seconds;
  const display = document.getElementById("timer");

  setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
