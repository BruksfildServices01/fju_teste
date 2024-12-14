const questions = [
    {
      question: "1. Em um grupo, você prefere:",
      options: {
        fleumatico: "Observar e ouvir",
        melancolico: "Planejar tudo com detalhes",
        sanguineo: "Falar e animar os outros",
        colerico: "Liderar e tomar decisões",
      },
    },
    {
      question: "2. Diante de um problema, você:",
      options: {
        fleumatico: "Evita conflitos",
        melancolico: "Analisa profundamente",
        sanguineo: "Fala com alguém para desabafar",
        colerico: "Resolve com assertividade",
      },
    },
    {
      question: "3. O que te motiva mais?",
      options: {
        fleumatico: "Paz e tranquilidade",
        melancolico: "Fazer tudo com perfeição",
        sanguineo: "Estar com amigos",
        colerico: "Alcançar objetivos",
      },
    },
    {
      question: "4. Como você reage a uma crítica?",
      options: {
        fleumatico: "Aceita, mas evita conflitos",
        melancolico: "Fica introspectivo e analisa",
        sanguineo: "Leva de forma leve ou brinca",
        colerico: "Argumenta e defende seu ponto",
      },
    },
    {
      question: "5. O que mais te incomoda?",
      options: {
        fleumatico: "Conflitos e confusões",
        melancolico: "Falta de organização",
        sanguineo: "Solidão ou isolamento",
        colerico: "Falta de controle ou direção",
      },
    },
    {
      question: "6. Como você toma decisões?",
      options: {
        fleumatico: "De forma calma e ponderada",
        melancolico: "Após analisar todos os detalhes",
        sanguineo: "Rapidamente, com base no momento",
        colerico: "Diretamente, focando no resultado",
      },
    },
  ];
  
  const answers = {
    fleumatico: 0,
    melancolico: 0,
    sanguineo: 0,
    colerico: 0,
  };
  
  const globalStats = {
    totalParticipants: 0,
    fleumatico: 0,
    melancolico: 0,
    sanguineo: 0,
    colerico: 0,
  };
  
  let currentQuestion = 0;
  
  const questionContainer = document.getElementById("question-container");
  const nextButton = document.getElementById("next-button");
  const restartButton = document.getElementById("restart-button");
  const progressBar = document.getElementById("progress-bar");
  const resultDiv = document.getElementById("result");
  const temperamentResult = document.getElementById("temperament-result");
  
  function loadQuestion() {
    const questionData = questions[currentQuestion];
    questionContainer.innerHTML = `
      <div class="question">${questionData.question}</div>
      ${Object.entries(questionData.options)
        .map(
          ([key, value]) =>
            `<input type="radio" name="question" id="${key}" value="${key}">
            <label for="${key}">${value}</label>`
        )
        .join("")}
    `;
  }
  
  function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  function showResult() {
    const max = Math.max(...Object.values(answers));
    const temperament = Object.keys(answers).find(
      (key) => answers[key] === max
    );
  
    // Atualiza estatísticas globais
    globalStats.totalParticipants++;
    if (temperament) globalStats[temperament]++;
  
    // Exibe resultado com cores específicas
    resultDiv.className = `result-${temperament}`;
    temperamentResult.textContent = temperament
      ? `Você é predominantemente ${temperament.toUpperCase()}!`
      : "Algo deu errado, tente novamente.";
  
    // Atualiza contadores
    document.getElementById("total-participants").textContent =
      globalStats.totalParticipants;
    document.getElementById("fleumatico-count").textContent =
      globalStats.fleumatico;
    document.getElementById("melancolico-count").textContent =
      globalStats.melancolico;
    document.getElementById("sanguineo-count").textContent =
      globalStats.sanguineo;
    document.getElementById("colerico-count").textContent =
      globalStats.colerico;
  
    resultDiv.classList.remove("hidden");
    questionContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    restartButton.classList.remove("hidden");
  }
  
  nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector(
      'input[name="question"]:checked'
    );
    if (!selectedOption) {
      alert("Por favor, selecione uma opção!");
      return;
    }
  
    answers[selectedOption.value]++;
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      loadQuestion();
      updateProgressBar();
    } else {
      showResult();
    }
  });
  
  restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    Object.keys(answers).forEach((key) => (answers[key] = 0));
    resultDiv.className = "hidden";
    resultDiv.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    nextButton.classList.remove("hidden");
    restartButton.classList.add("hidden");
  
    loadQuestion();
    updateProgressBar();
  });
  
  // Inicializa o teste
  loadQuestion();
  updateProgressBar()
  