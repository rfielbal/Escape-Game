(() => {
  "use strict";

  const INTERNAL_WIDTH = 640;
  const INTERNAL_HEIGHT = 384;

  const TILE = {
    FLOOR: 0,
    WALL: 1,
    DOOR_1: 2,
    DOOR_2: 3,
    DOOR_EXIT: 4
  };

  const ROOM_THEMES = {
    1: {
      id: 1,
      name: "Salle 1 - Angoisse interieure",
      shortName: "Salle 1",
      word: "INTERIEUR",
      intro:
        "Ici, des artistes juges instables ont transforme leur douleur et leur angoisse en langage visuel.",
      puzzle: {
        question:
          "Quel message commun emerges-tu de Van Gogh, Munch et Goya dans cette salle ?",
        options: [
          {
            text: "Ils peignent surtout des commandes officielles pour rassurer le pouvoir.",
            explanation: "Leur demarche va au contraire vers l'intime et l'inquietude.",
            correct: false
          },
          {
            text: "Ils transforment la souffrance interieure en image, ce qui choque leur epoque.",
            explanation:
              "Exact. Leur force est d'oser montrer l'interieur humain plutot que l'image sociale attendue.",
            correct: true
          },
          {
            text: "Ils refusent l'emotion personnelle et recherchent une neutralite froide.",
            explanation: "C'est l'inverse de ce que leurs oeuvres montrent.",
            correct: false
          }
        ]
      }
    },
    2: {
      id: 2,
      name: "Salle 2 - Reve et visions",
      shortName: "Salle 2",
      word: "IMAGINAIRE",
      intro:
        "Ces artistes ont ete parfois qualifies de fous car ils introduisent le reve, l'etrange et l'irrationnel.",
      puzzle: {
        question:
          "Quel point commun relie Bosch, Dali et Magritte face au regard social ?",
        options: [
          {
            text: "Ils copient le reel sans jamais le questionner.",
            explanation: "Leur demarche questionne justement ce qui parait reel.",
            correct: false
          },
          {
            text: "Ils utilisent l'imaginaire pour bousculer la notion de raison et de normalite.",
            explanation:
              "Exact. Ce n'est pas la folie des artistes, mais une strategie pour ouvrir d'autres lectures du monde.",
            correct: true
          },
          {
            text: "Ils veulent supprimer tout symbole pour rester purement decoratifs.",
            explanation: "Le symbole est central dans leurs oeuvres.",
            correct: false
          }
        ]
      }
    },
    3: {
      id: 3,
      name: "Salle 3 - Rupture et scandale",
      shortName: "Salle 3",
      word: "RUPTURE",
      intro:
        "Quand les codes explosent, la societe parle vite de folie. Ici, la transgression est assumee.",
      puzzle: {
        question:
          "Que comprends-tu en comparant Picasso, Kandinsky et Basquiat ?",
        options: [
          {
            text: "Ils respectent les normes academiques pour ne pas choquer le public.",
            explanation: "Leur impact vient de la rupture des normes en place.",
            correct: false
          },
          {
            text: "Ils cassent les formes et les codes sociaux, d'ou l'etiquette de folie percue.",
            explanation:
              "Exact. Leur geste artistique est une rupture, pas une absence de sens.",
            correct: true
          },
          {
            text: "Ils evitent toute position critique envers leur epoque.",
            explanation: "Leurs oeuvres portent une forte charge critique.",
            correct: false
          }
        ]
      }
    }
  };

  const ARTWORKS = [
    {
      id: "vangogh-starry",
      room: 1,
      title: "La Nuit etoilee",
      artist: "Vincent van Gogh",
      year: "1889",
      movement: "Post-impressionnisme",
      summary:
        "Paysage nocturne peint depuis l'asile de Saint-Remy. Le ciel tourbillonnant met l'etat interieur au premier plan.",
      socialView:
        "Ses gestes et sa sensibilite ont ete lus comme de la folie, alors qu'ils constituent une ecriture emotionnelle radicale.",
      learning:
        "Observer l'oeuvre, c'est lire une experience humaine intense, pas un simple decor.",
      clue:
        "Indice de salle: l'image parle du dedans autant que du dehors.",
      uvClue: "UV: " + "Ce qui derange ici, c'est l'interiorite exposee.",
      assetPath: "assets/artworks/starry-night.jpg",
      sourceUrl:
        "https://fr.wikipedia.org/wiki/La_Nuit_%C3%A9toil%C3%A9e_(1889)"
    },
    {
      id: "munch-scream",
      room: 1,
      title: "Le Cri",
      artist: "Edvard Munch",
      year: "1893",
      movement: "Expressionnisme",
      summary:
        "Figure deformee et horizon instable: l'angoisse devient forme et couleur.",
      socialView:
        "Longtemps percue comme image maladive, l'oeuvre est aujourd'hui l'icone d'un malaise universel.",
      learning:
        "L'art peut rendre visible ce que les mots cachent.",
      clue:
        "Indice de salle: la peur n'est pas cachee, elle est rendue visible.",
      uvClue: "UV: " + "La societe juge souvent ce qu'elle ne veut pas ressentir.",
      assetPath: "assets/artworks/the-scream.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/Le_Cri"
    },
    {
      id: "goya-saturn",
      room: 1,
      title: "Saturne devorant un de ses fils",
      artist: "Francisco de Goya",
      year: "1819-1823",
      movement: "Romantisme noir",
      summary:
        "Peinture sombre et brutale issue des Peintures noires. Le monstrueux traduit la violence du monde.",
      socialView:
        "L'intensite de ces images a souvent ete interpretee comme demence, alors qu'elle denonce la peur et la barbarie.",
      learning:
        "Le choc visuel peut servir de critique sociale.",
      clue:
        "Indice de salle: l'oeuvre montre ce que la societe prefere ignorer.",
      uvClue: "UV: " + "Le regard social confond parfois lucide et fou.",
      assetPath: "assets/artworks/goya-saturn.jpg",
      sourceUrl:
        "https://fr.wikipedia.org/wiki/Saturne_d%C3%A9vorant_un_de_ses_enfants"
    },
    {
      id: "bosch-garden",
      room: 2,
      title: "Le Jardin des delices",
      artist: "Jerome Bosch",
      year: "vers 1490-1510",
      movement: "Primitifs flamands",
      summary:
        "Triptyque foisonnant ou se melent desir, allegorie et visions troublantes.",
      socialView:
        "Son imaginaire a pu etre juge excessif ou delirant, alors qu'il construit une critique morale complexe.",
      learning:
        "Le bizarre peut etre un outil de pensee, pas un simple effet.",
      clue:
        "Indice de salle: ici, l'etrange sert a questionner la norme.",
      uvClue: "UV: " + "Le reve est une methode de lecture du monde.",
      assetPath: "assets/artworks/bosch-garden.jpg",
      sourceUrl:
        "https://fr.wikipedia.org/wiki/Le_Jardin_des_d%C3%A9lices"
    },
    {
      id: "dali-memory",
      room: 2,
      title: "La Persistance de la memoire",
      artist: "Salvador Dali",
      year: "1931",
      movement: "Surrealisme",
      summary:
        "Montres molles et espace desertique: le temps rationnel perd sa forme stable.",
      socialView:
        "Les codes surreels ont ete moques comme absurdes, avant d'etre reconnus comme une exploration de l'inconscient.",
      learning:
        "L'imaginaire peut expliquer une experience du temps impossible a decrire autrement.",
      clue:
        "Indice de salle: la logique apparente se fissure.",
      uvClue: "UV: " + "Ce qui parait impossible peut reveler une verite intime.",
      assetPath: "assets/artworks/dali-memory.jpg",
      sourceUrl:
        "https://fr.wikipedia.org/wiki/La_Persistance_de_la_m%C3%A9moire"
    },
    {
      id: "magritte-sonofman",
      room: 2,
      title: "Le Fils de l'homme",
      artist: "Rene Magritte",
      year: "1964",
      movement: "Surrealisme",
      summary:
        "Un visage masque par une pomme: l'image joue avec ce qui est cache et ce qui est attendu.",
      socialView:
        "Le decalage visuel fut parfois traite comme nonsense; il questionne pourtant nos habitudes de perception.",
      learning:
        "Voir n'est jamais neutre: on regarde avec des attentes sociales.",
      clue:
        "Indice de salle: l'image montre une chose et en cache une autre.",
      uvClue: "UV: " + "L'imaginaire deplace notre regard sur le reel.",
      assetPath: "assets/artworks/magritte-sonofman.jpg",
      sourceUrl:
        "https://fr.wikipedia.org/wiki/Le_Fils_de_l%27homme"
    },
    {
      id: "picasso-demoiselles",
      room: 3,
      title: "Les Demoiselles d'Avignon",
      artist: "Pablo Picasso",
      year: "1907",
      movement: "Proto-cubisme",
      summary:
        "Corps fragmentes et perspective brisee: rupture majeure avec la representation classique.",
      socialView:
        "A sa presentation, l'oeuvre est jugee violente et incoherente; elle ouvre pourtant une nouvelle grammaire picturale.",
      learning:
        "Changer les formes, c'est aussi changer les idees.",
      clue:
        "Indice de salle: quand les formes cassent, la norme vacille.",
      uvClue: "UV: " + "RUP: premier fragment cache de la salle.",
      assetPath: "assets/artworks/picasso-demoiselles.jpg",
      sourceUrl:
        "https://fr.wikipedia.org/wiki/Les_Demoiselles_d%27Avignon"
    },
    {
      id: "kandinsky-comp8",
      room: 3,
      title: "Composition VIII",
      artist: "Vassily Kandinsky",
      year: "1923",
      movement: "Abstraction",
      summary:
        "Cercles, lignes et triangles remplacent la figuration pour traduire rythme et tension.",
      socialView:
        "L'abstraction fut accusee d'etre incomprehensible; elle proposait en realite un autre langage.",
      learning:
        "Une oeuvre peut faire sens sans raconter une scene reconnaissable.",
      clue:
        "Indice de salle: l'ordre visuel n'est plus celui de la copie du reel.",
      uvClue: "UV: " + "TUR: second fragment cache de la salle.",
      assetPath: "assets/artworks/kandinsky-comp8.svg",
      sourceUrl:
        "https://fr.wikipedia.org/wiki/Composition_VIII"
    },
    {
      id: "basquiat-skull",
      room: 3,
      title: "Untitled (Skull)",
      artist: "Jean-Michel Basquiat",
      year: "1981",
      movement: "Neo-expressionnisme",
      summary:
        "Tete explosive, signes et ecriture: energie urbaine et critique du pouvoir culturel.",
      socialView:
        "Son style fut parfois reduit a du chaos; il est aujourd'hui lu comme un langage politique et autobiographique.",
      learning:
        "Le geste brut peut porter un discours social tres construit.",
      clue:
        "Indice de salle: le scandale vient souvent de la rupture des hierarchies.",
      uvClue: "UV: " + "E: troisieme fragment cache de la salle.",
      assetPath: "assets/artworks/basquiat-skull.svg",
      sourceUrl:
        "https://fr.wikipedia.org/wiki/Jean-Michel_Basquiat"
    }
  ];

  const ART_BY_ID = new Map(ARTWORKS.map((art) => [art.id, art]));

  const ROOM_ART_IDS = {
    1: ARTWORKS.filter((art) => art.room === 1).map((art) => art.id),
    2: ARTWORKS.filter((art) => art.room === 2).map((art) => art.id),
    3: ARTWORKS.filter((art) => art.room === 3).map((art) => art.id)
  };

  function pad2(value) {
    return String(value).padStart(2, "0");
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function normalizeAnswer(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/[^A-Z ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function createFallbackSvgData(title, colorA, colorB) {
    const safeTitle = title
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const svg = [
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>",
      `<defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='${colorA}'/><stop offset='100%' stop-color='${colorB}'/></linearGradient></defs>`,
      "<rect width='400' height='300' fill='url(#g)'/>",
      "<rect x='18' y='18' width='364' height='264' fill='rgba(0,0,0,0.28)' stroke='rgba(255,255,255,0.45)'/>",
      `<text x='200' y='162' text-anchor='middle' font-size='26' font-family='Verdana' fill='white'>${safeTitle}</text>`,
      "</svg>"
    ].join("");

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function drawRoundedRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function drawImageCover(ctx, image, x, y, width, height) {
    if (!image || !image.complete || !image.naturalWidth || !image.naturalHeight) {
      return false;
    }

    const sourceRatio = image.naturalWidth / image.naturalHeight;
    const targetRatio = width / height;

    let sx = 0;
    let sy = 0;
    let sw = image.naturalWidth;
    let sh = image.naturalHeight;

    if (sourceRatio > targetRatio) {
      sw = image.naturalHeight * targetRatio;
      sx = (image.naturalWidth - sw) / 2;
    } else {
      sh = image.naturalWidth / targetRatio;
      sy = (image.naturalHeight - sh) / 2;
    }

    ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
    return true;
  }

  class AudioEngine {
    constructor() {
      this.enabled = true;
      this.ctx = null;
      this.master = null;
      this.lastStepAt = 0;
      this.userUnlocked = false;
    }

    ensure() {
      if (this.ctx) {
        return;
      }

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        return;
      }

      this.ctx = new AudioCtx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.68;
      this.master.connect(this.ctx.destination);
    }

    kickResume() {
      this.ensure();
      if (!this.ctx) {
        return;
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    }

    async unlockByGesture() {
      this.ensure();
      if (!this.ctx) {
        return;
      }
      if (this.ctx.state === "suspended") {
        try {
          await this.ctx.resume();
        } catch (_error) {
          return;
        }
      }
      this.userUnlocked = this.ctx.state === "running";
    }

    toggle() {
      this.kickResume();
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playTone(config) {
      if (!this.ctx || !this.master) {
        return;
      }

      const {
        wave = "triangle",
        startHz = 440,
        endHz = 440,
        peak = 0.05,
        duration = 0.14
      } = config;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = wave;
      osc.connect(gain);
      gain.connect(this.master);

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(startHz, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, endHz), now + duration);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + Math.min(0.02, duration * 0.25));
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.start(now);
      osc.stop(now + duration + 0.01);
    }

    beep(type) {
      if (!this.enabled || !this.ctx || !this.master) {
        return;
      }
      this.kickResume();

      if (type === "success") {
        this.playTone({ wave: "square", startHz: 740, endHz: 1040, peak: 0.15, duration: 0.11 });
        this.playTone({ wave: "triangle", startHz: 980, endHz: 1240, peak: 0.12, duration: 0.1 });
      } else if (type === "error") {
        this.playTone({ wave: "sawtooth", startHz: 320, endHz: 170, peak: 0.16, duration: 0.2 });
      } else if (type === "interact") {
        this.playTone({ wave: "triangle", startHz: 880, endHz: 620, peak: 0.13, duration: 0.1 });
        this.playTone({ wave: "sine", startHz: 480, endHz: 420, peak: 0.08, duration: 0.08 });
      } else if (type === "toggle") {
        this.playTone({ wave: "sine", startHz: 620, endHz: 760, peak: 0.1, duration: 0.08 });
      } else {
        this.playTone({ wave: "triangle", startHz: 520, endHz: 440, peak: 0.08, duration: 0.1 });
      }
    }

    step() {
      if (!this.enabled || !this.ctx || !this.master) {
        return;
      }
      this.kickResume();

      const now = this.ctx.currentTime;
      if (now - this.lastStepAt < 0.14) {
        return;
      }
      this.lastStepAt = now;

      this.playTone({
        wave: "square",
        startHz: 190 + Math.random() * 40,
        endHz: 140 + Math.random() * 30,
        peak: 0.07,
        duration: 0.055
      });
    }
  }

  class EscapeGame {
    constructor() {
      this.canvas = document.getElementById("game");
      this.ctx = this.canvas.getContext("2d", { alpha: false });
      this.ctx.imageSmoothingEnabled = false;

      this.startScreen = document.getElementById("start-screen");
      this.endScreen = document.getElementById("end-screen");
      this.endTime = document.getElementById("end-time");
      this.startButton = document.getElementById("start-btn");
      this.restartButton = document.getElementById("restart-btn");

      this.objectiveEl = document.getElementById("objective");
      this.timerEl = document.getElementById("timer");
      this.roomIndicatorEl = document.getElementById("room-indicator");
      this.uvIndicatorEl = document.getElementById("uv-indicator");
      this.soundIndicatorEl = document.getElementById("sound-indicator");
      this.promptEl = document.getElementById("interaction-prompt");

      this.notebookPanel = document.getElementById("notebook");
      this.notebookContent = document.getElementById("notebook-content");
      this.closeNotebookBtn = document.getElementById("close-notebook");

      this.modalPanel = document.getElementById("modal");
      this.modalTitle = document.getElementById("modal-title");
      this.modalBody = document.getElementById("modal-body");
      this.modalCloseBtn = document.getElementById("modal-close");
      this.activeModalKind = null;

      this.touchButtons = Array.from(document.querySelectorAll("[data-touch]"));

      this.audio = new AudioEngine();

      this.mapWidth = 38;
      this.mapHeight = 20;
      this.map = [];

      this.keys = new Set();
      this.touchState = {
        up: false,
        down: false,
        left: false,
        right: false
      };

      this.running = false;
      this.lastFrame = performance.now();
      this.focused = null;

      this.player = {
        x: 3.5,
        y: 10.5,
        facing: "right",
        walkPhase: 0,
        moving: false
      };

      this.state = {
        startedAt: 0,
        elapsedMs: 0,
        finished: false,
        uvMode: false,
        viewedArtworks: new Set(),
        uvReadArtworks: new Set(),
        solvedRooms: {
          1: false,
          2: false,
          3: false
        },
        fragments: {
          1: null,
          2: null,
          3: null
        },
        exitUnlocked: false
      };

      this.interactables = [];
      this.decorations = [];
      this.artworkImages = new Map();
      this.tileSize = 16;
      this.mapOffsetX = 16;
      this.mapOffsetY = 32;

      this.buildMap();
      this.buildInteractables();
      this.buildDecorations();
      this.preloadArtworkImages();
      this.attachUi();
      this.refreshNotebook();
      this.updateObjective();
      this.updateStatusBadges();
      this.resizeCanvas();
    }

    attachUi() {
      this.startButton.addEventListener("click", async () => {
        this.startScreen.classList.remove("visible");
        this.state.startedAt = performance.now();
        this.running = true;
        await this.audio.unlockByGesture();
        this.audio.beep("toggle");
      });

      this.restartButton.addEventListener("click", () => {
        window.location.reload();
      });

      this.modalCloseBtn.addEventListener("click", () => this.closeModal());
      this.closeNotebookBtn.addEventListener("click", () => this.toggleNotebook(false));

      window.addEventListener("resize", () => this.resizeCanvas());

      document.addEventListener("keydown", (event) => {
        this.audio.unlockByGesture();
        const key = event.key.toLowerCase();

        if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
          event.preventDefault();
        }

        if (!event.repeat) {
          if (key === "e" && !this.modalPanel.classList.contains("hidden") && this.activeModalKind === "artwork") {
            this.closeModal();
            return;
          }
          if (key === "e") {
            this.tryInteract();
          }
          if (key === "j") {
            this.toggleNotebook();
          }
          if (key === "u") {
            this.toggleUvMode();
          }
          if (key === "m") {
            this.toggleSound();
          }
          if (key === "escape") {
            if (!this.modalPanel.classList.contains("hidden")) {
              this.closeModal();
            } else if (!this.notebookPanel.classList.contains("hidden")) {
              this.toggleNotebook(false);
            }
          }
        }

        this.keys.add(key);
      });

      document.addEventListener("keyup", (event) => {
        this.keys.delete(event.key.toLowerCase());
      });

      for (const button of this.touchButtons) {
        const action = button.dataset.touch;
        if (!action) {
          continue;
        }

        const press = (event) => {
          event.preventDefault();
          this.audio.unlockByGesture();
          if (!this.running || this.state.finished || this.isOverlayOpen()) {
            return;
          }

          if (action === "interact") {
            this.tryInteract();
            return;
          }
          if (action === "notebook") {
            this.toggleNotebook();
            return;
          }
          if (action === "uv") {
            this.toggleUvMode();
            return;
          }
          if (action === "sound") {
            this.toggleSound();
            return;
          }

          if (action === "up") {
            this.touchState.up = true;
          } else if (action === "down") {
            this.touchState.down = true;
          } else if (action === "left") {
            this.touchState.left = true;
          } else if (action === "right") {
            this.touchState.right = true;
          }
        };

        const release = (event) => {
          event.preventDefault();
          if (action === "up") {
            this.touchState.up = false;
          } else if (action === "down") {
            this.touchState.down = false;
          } else if (action === "left") {
            this.touchState.left = false;
          } else if (action === "right") {
            this.touchState.right = false;
          }
        };

        button.addEventListener("pointerdown", press);
        button.addEventListener("pointerup", release);
        button.addEventListener("pointercancel", release);
        button.addEventListener("pointerleave", release);
      }
    }

    resizeCanvas() {
      this.canvas.width = INTERNAL_WIDTH;
      this.canvas.height = INTERNAL_HEIGHT;
      this.ctx.imageSmoothingEnabled = false;

      this.tileSize = Math.floor(
        Math.min(this.canvas.width / this.mapWidth, this.canvas.height / this.mapHeight)
      );
      this.mapOffsetX = Math.floor((this.canvas.width - this.mapWidth * this.tileSize) / 2);
      this.mapOffsetY = Math.floor((this.canvas.height - this.mapHeight * this.tileSize) / 2);
    }

    buildMap() {
      const map = Array.from({ length: this.mapHeight }, () => Array(this.mapWidth).fill(TILE.FLOOR));

      for (let y = 0; y < this.mapHeight; y += 1) {
        for (let x = 0; x < this.mapWidth; x += 1) {
          if (x === 0 || y === 0 || x === this.mapWidth - 1 || y === this.mapHeight - 1) {
            map[y][x] = TILE.WALL;
          }
        }
      }

      for (let y = 1; y < this.mapHeight - 1; y += 1) {
        map[y][12] = TILE.WALL;
        map[y][24] = TILE.WALL;
        map[y][35] = TILE.WALL;
      }

      map[10][12] = TILE.DOOR_1;
      map[10][24] = TILE.DOOR_2;
      map[10][35] = TILE.DOOR_EXIT;

      this.map = map;
    }

    buildInteractables() {
      this.interactables = [
        { id: "panel-r1", type: "panel", room: 1, x: 2.5, y: 2.5, label: "Panneau de salle" },
        { id: "art-vangogh", type: "artwork", room: 1, artworkId: "vangogh-starry", x: 4.5, y: 4.5, label: "Oeuvre" },
        { id: "art-munch", type: "artwork", room: 1, artworkId: "munch-scream", x: 8.5, y: 4.5, label: "Oeuvre" },
        { id: "art-goya", type: "artwork", room: 1, artworkId: "goya-saturn", x: 6.5, y: 15.5, label: "Oeuvre" },
        { id: "terminal-r1", type: "terminal", room: 1, x: 10.4, y: 10.5, label: "Console salle 1" },

        { id: "panel-r2", type: "panel", room: 2, x: 14.5, y: 2.5, label: "Panneau de salle" },
        { id: "art-bosch", type: "artwork", room: 2, artworkId: "bosch-garden", x: 16.5, y: 4.5, label: "Oeuvre" },
        { id: "art-dali", type: "artwork", room: 2, artworkId: "dali-memory", x: 20.5, y: 4.5, label: "Oeuvre" },
        { id: "art-magritte", type: "artwork", room: 2, artworkId: "magritte-sonofman", x: 18.5, y: 15.5, label: "Oeuvre" },
        { id: "terminal-r2", type: "terminal", room: 2, x: 22.4, y: 10.5, label: "Console salle 2" },

        { id: "panel-r3", type: "panel", room: 3, x: 26.5, y: 2.5, label: "Panneau de salle" },
        { id: "art-picasso", type: "artwork", room: 3, artworkId: "picasso-demoiselles", x: 28.5, y: 4.5, label: "Oeuvre" },
        { id: "art-kandinsky", type: "artwork", room: 3, artworkId: "kandinsky-comp8", x: 32.0, y: 4.5, label: "Oeuvre" },
        { id: "art-basquiat", type: "artwork", room: 3, artworkId: "basquiat-skull", x: 30.5, y: 15.5, label: "Oeuvre" },
        { id: "terminal-r3", type: "terminal", room: 3, x: 34.0, y: 10.5, label: "Console salle 3" },

        { id: "exit-terminal", type: "exit", x: 34.4, y: 8.6, label: "Digicode sortie" }
      ];
    }

    buildDecorations() {
      this.decorations = [
        { type: "runner", room: 1, x: 6.5, y: 10.0, w: 5.5, h: 8.5 },
        { type: "runner", room: 2, x: 18.5, y: 10.0, w: 5.5, h: 8.5 },
        { type: "runner", room: 3, x: 30.0, y: 10.0, w: 5.5, h: 8.5 },
        { type: "bench", room: 1, x: 6.5, y: 9.5 },
        { type: "bench", room: 2, x: 18.5, y: 9.5 },
        { type: "bench", room: 3, x: 30.0, y: 9.5 },
        { type: "plant", room: 1, x: 2.1, y: 16.6 },
        { type: "plant", room: 1, x: 10.6, y: 16.6 },
        { type: "plant", room: 2, x: 14.3, y: 16.6 },
        { type: "plant", room: 2, x: 22.4, y: 16.6 },
        { type: "plant", room: 3, x: 26.3, y: 16.6 },
        { type: "plant", room: 3, x: 33.7, y: 16.6 },
        { type: "pedestal", room: 1, x: 3.3, y: 9.8 },
        { type: "pedestal", room: 2, x: 15.2, y: 9.8 },
        { type: "pedestal", room: 3, x: 27.2, y: 9.8 }
      ];
    }

    preloadArtworkImages() {
      for (const art of ARTWORKS) {
        if (!art.assetPath) {
          continue;
        }

        const image = new Image();
        image.decoding = "async";
        image.loading = "eager";
        image.src = art.assetPath;
        this.artworkImages.set(art.id, image);
      }
    }

    run() {
      const loop = (time) => {
        const dt = Math.min((time - this.lastFrame) / 1000, 0.05);
        this.lastFrame = time;

        if (this.running && !this.state.finished) {
          this.update(dt);
        }

        this.render();
        requestAnimationFrame(loop);
      };

      requestAnimationFrame(loop);
    }

    update(dt) {
      const canControl = !this.isOverlayOpen();
      if (canControl) {
        this.updateMovement(dt);
      } else {
        this.resetTouchState();
      }

      this.focused = this.findFocusedInteractable();
      this.updatePrompt();
      this.updateTimer();
      this.updateRoomIndicator();
      this.checkVictory();
    }

    updateMovement(dt) {
      const speed = 3.2;

      let dx = 0;
      let dy = 0;

      if (this.keys.has("z") || this.keys.has("w") || this.keys.has("arrowup") || this.touchState.up) {
        dy -= 1;
      }
      if (this.keys.has("s") || this.keys.has("arrowdown") || this.touchState.down) {
        dy += 1;
      }
      if (this.keys.has("q") || this.keys.has("a") || this.keys.has("arrowleft") || this.touchState.left) {
        dx -= 1;
      }
      if (this.keys.has("d") || this.keys.has("arrowright") || this.touchState.right) {
        dx += 1;
      }

      if (dx === 0 && dy === 0) {
        this.player.moving = false;
        return;
      }

      const length = Math.hypot(dx, dy) || 1;
      dx /= length;
      dy /= length;

      this.player.moving = true;
      this.player.walkPhase += dt * 16;
      if (Math.abs(dx) > Math.abs(dy)) {
        this.player.facing = dx > 0 ? "right" : "left";
      } else {
        this.player.facing = dy > 0 ? "down" : "up";
      }

      const targetX = this.player.x + dx * speed * dt;
      const targetY = this.player.y + dy * speed * dt;

      this.tryMove(targetX, this.player.y);
      this.tryMove(this.player.x, targetY);
      this.audio.step();
    }

    tryMove(targetX, targetY) {
      const radius = 0.28;
      const canMove = !this.isSolidAt(targetX + radius, targetY + radius)
        && !this.isSolidAt(targetX - radius, targetY + radius)
        && !this.isSolidAt(targetX + radius, targetY - radius)
        && !this.isSolidAt(targetX - radius, targetY - radius);

      if (canMove) {
        this.player.x = targetX;
        this.player.y = targetY;
      }
    }

    isSolidAt(x, y) {
      const tile = this.getTileAt(x, y);
      return tile !== TILE.FLOOR;
    }

    getTileAt(x, y) {
      const tx = Math.floor(x);
      const ty = Math.floor(y);
      if (tx < 0 || ty < 0 || tx >= this.mapWidth || ty >= this.mapHeight) {
        return TILE.WALL;
      }
      return this.map[ty][tx];
    }

    isLineBlocked(x1, y1, x2, y2) {
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const steps = Math.max(2, Math.ceil(dist * 10));

      for (let i = 1; i < steps; i += 1) {
        const t = i / steps;
        const sx = x1 + (x2 - x1) * t;
        const sy = y1 + (y2 - y1) * t;
        if (this.isSolidAt(sx, sy)) {
          return true;
        }
      }

      return false;
    }

    findFocusedInteractable() {
      const candidates = [];

      for (const obj of this.interactables) {
        const dx = obj.x - this.player.x;
        const dy = obj.y - this.player.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 1.3) {
          continue;
        }

        if (this.isLineBlocked(this.player.x, this.player.y, obj.x, obj.y)) {
          continue;
        }

        candidates.push({ obj, dist });
      }

      candidates.sort((a, b) => a.dist - b.dist);
      return candidates.length ? candidates[0].obj : null;
    }

    roomFromX(x) {
      if (x <= 11) {
        return 1;
      }
      if (x <= 23) {
        return 2;
      }
      if (x <= 34) {
        return 3;
      }
      return 4;
    }

    roomNameFromX(x) {
      const room = this.roomFromX(x);
      if (room === 4) {
        return "Sortie";
      }
      return ROOM_THEMES[room].shortName;
    }

    updateRoomIndicator() {
      this.roomIndicatorEl.textContent = `Zone: ${this.roomNameFromX(this.player.x)}`;
    }

    updateTimer() {
      if (!this.state.startedAt) {
        this.timerEl.textContent = "Temps: 00:00";
        return;
      }

      this.state.elapsedMs = performance.now() - this.state.startedAt;
      const total = Math.floor(this.state.elapsedMs / 1000);
      const min = Math.floor(total / 60);
      const sec = total % 60;
      this.timerEl.textContent = `Temps: ${pad2(min)}:${pad2(sec)}`;
    }

    resetTouchState() {
      this.touchState.up = false;
      this.touchState.down = false;
      this.touchState.left = false;
      this.touchState.right = false;
    }

    render() {
      this.drawBackdrop();
      this.drawMap();
      this.drawDecorations();
      this.drawInteractables();
      this.drawPlayer();
      this.drawFocus();
      this.drawUvOverlay();
    }

    drawBackdrop() {
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      if (this.state.uvMode) {
        gradient.addColorStop(0, "#261f47");
        gradient.addColorStop(1, "#110f24");
      } else {
        gradient.addColorStop(0, "#f6ead3");
        gradient.addColorStop(1, "#d8e8dd");
      }

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = this.state.uvMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.08)";
      for (let y = 0; y < this.canvas.height; y += 18) {
        this.ctx.fillRect(0, y, this.canvas.width, 1);
      }

      this.ctx.fillStyle = this.state.uvMode ? "rgba(172, 111, 255, 0.08)" : "rgba(70, 109, 114, 0.06)";
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width * 0.18, this.canvas.height * 0.2, 120, 0, Math.PI * 2);
      this.ctx.arc(this.canvas.width * 0.82, this.canvas.height * 0.17, 140, 0, Math.PI * 2);
      this.ctx.fill();
    }

    floorColorForRoom(room) {
      if (this.state.uvMode) {
        if (room === 1) {
          return [120, 97, 189];
        }
        if (room === 2) {
          return [76, 132, 177];
        }
        if (room === 3) {
          return [167, 92, 168];
        }
        return [96, 137, 84];
      }

      if (room === 1) {
        return [216, 193, 171];
      }
      if (room === 2) {
        return [199, 226, 241];
      }
      if (room === 3) {
        return [229, 202, 224];
      }
      return [206, 226, 190];
    }

    drawMap() {
      for (let y = 0; y < this.mapHeight; y += 1) {
        for (let x = 0; x < this.mapWidth; x += 1) {
          const tile = this.map[y][x];
          const px = this.mapOffsetX + x * this.tileSize;
          const py = this.mapOffsetY + y * this.tileSize;

          if (tile === TILE.FLOOR) {
            const room = this.roomFromX(x);
            const [r, g, b] = this.floorColorForRoom(room);
            const shade = room === 1
              ? ((x + y) % 2 === 0 ? 12 : -8)
              : room === 2
                ? ((x + y) % 3 === 0 ? 10 : -3)
                : ((x + y) % 2 === 0 ? 5 : -5);
            const cr = clamp(r + shade, 0, 255);
            const cg = clamp(g + shade, 0, 255);
            const cb = clamp(b + shade, 0, 255);
            this.ctx.fillStyle = `rgb(${cr}, ${cg}, ${cb})`;
            this.ctx.fillRect(px, py, this.tileSize, this.tileSize);

            if (room === 1 && y % 2 === 0) {
              this.ctx.fillStyle = "rgba(102, 66, 34, 0.08)";
              this.ctx.fillRect(px, py + this.tileSize - 2, this.tileSize, 1);
            }

            this.ctx.strokeStyle = "rgba(0,0,0,0.05)";
            this.ctx.strokeRect(px, py, this.tileSize, this.tileSize);
          } else if (tile === TILE.WALL) {
            this.ctx.fillStyle = this.state.uvMode ? "#2d2748" : "#6f5945";
            this.ctx.fillRect(px, py, this.tileSize, this.tileSize);
            this.ctx.fillStyle = this.state.uvMode ? "#4d427b" : "#9e8068";
            this.ctx.fillRect(px, py, this.tileSize, Math.max(3, Math.floor(this.tileSize * 0.22)));
            this.ctx.fillStyle = "rgba(0,0,0,0.12)";
            this.ctx.fillRect(px, py + this.tileSize - 2, this.tileSize, 2);
          } else if (tile === TILE.DOOR_1 || tile === TILE.DOOR_2 || tile === TILE.DOOR_EXIT) {
            const color = tile === TILE.DOOR_1
              ? (this.state.uvMode ? "#6b5aa7" : "#b06a4f")
              : tile === TILE.DOOR_2
                ? (this.state.uvMode ? "#4b79a8" : "#4f91b0")
                : (this.state.uvMode ? "#a871d0" : "#b5973f");
            this.ctx.fillStyle = color;
            this.ctx.fillRect(px, py, this.tileSize, this.tileSize);
            this.ctx.fillStyle = "rgba(255,255,255,0.38)";
            this.ctx.fillRect(px + 2, py + 2, this.tileSize - 4, 2);
            this.ctx.fillStyle = "rgba(0,0,0,0.15)";
            this.ctx.fillRect(px + this.tileSize / 2 - 1, py + 3, 2, this.tileSize - 6);
          }
        }
      }

      this.drawRoomAtmosphere();

      this.ctx.strokeStyle = this.state.uvMode ? "rgba(255,255,255,0.3)" : "rgba(34,42,43,0.35)";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(
        this.mapOffsetX,
        this.mapOffsetY,
        this.mapWidth * this.tileSize,
        this.mapHeight * this.tileSize
      );
    }

    drawRoomAtmosphere() {
      const rooms = [
        { id: 1, x1: 1, x2: 11, tint: this.state.uvMode ? "rgba(186, 144, 255, 0.12)" : "rgba(152, 92, 48, 0.08)" },
        { id: 2, x1: 13, x2: 23, tint: this.state.uvMode ? "rgba(142, 215, 255, 0.12)" : "rgba(70, 145, 188, 0.08)" },
        { id: 3, x1: 25, x2: 34, tint: this.state.uvMode ? "rgba(242, 161, 255, 0.12)" : "rgba(156, 65, 148, 0.08)" }
      ];

      this.ctx.textAlign = "center";
      for (const room of rooms) {
        const x = this.mapOffsetX + room.x1 * this.tileSize;
        const y = this.mapOffsetY + this.tileSize;
        const width = (room.x2 - room.x1 + 1) * this.tileSize;
        const height = (this.mapHeight - 2) * this.tileSize;

        this.ctx.fillStyle = room.tint;
        drawRoundedRect(this.ctx, x + 4, y + 4, width - 8, height - 8, 14);
        this.ctx.fill();

        this.ctx.fillStyle = this.state.uvMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.32)";
        drawRoundedRect(this.ctx, x + width / 2 - 54, y + 8, 108, 22, 8);
        this.ctx.fill();

        this.ctx.fillStyle = this.state.uvMode ? "#f0e4ff" : "#324243";
        this.ctx.font = "bold 11px Trebuchet MS";
        this.ctx.fillText(ROOM_THEMES[room.id].shortName, x + width / 2, y + 23);
      }
    }

    drawDecorations() {
      for (const decoration of this.decorations) {
        if (decoration.type === "runner") {
          this.drawRunner(decoration);
        } else if (decoration.type === "bench") {
          this.drawBench(decoration);
        } else if (decoration.type === "plant") {
          this.drawPlant(decoration);
        } else if (decoration.type === "pedestal") {
          this.drawPedestal(decoration);
        }
      }
    }

    drawRunner(decoration) {
      const x = this.mapOffsetX + (decoration.x - decoration.w / 2) * this.tileSize;
      const y = this.mapOffsetY + (decoration.y - decoration.h / 2) * this.tileSize;
      const width = decoration.w * this.tileSize;
      const height = decoration.h * this.tileSize;
      const fill = decoration.room === 1
        ? (this.state.uvMode ? "rgba(121, 85, 176, 0.36)" : "rgba(157, 81, 48, 0.24)")
        : decoration.room === 2
          ? (this.state.uvMode ? "rgba(73, 140, 193, 0.34)" : "rgba(90, 164, 198, 0.22)")
          : (this.state.uvMode ? "rgba(167, 74, 184, 0.34)" : "rgba(171, 84, 154, 0.2)");
      const border = this.state.uvMode ? "rgba(255,255,255,0.14)" : "rgba(79, 61, 41, 0.16)";

      this.ctx.fillStyle = fill;
      drawRoundedRect(this.ctx, x, y, width, height, 14);
      this.ctx.fill();
      this.ctx.strokeStyle = border;
      this.ctx.lineWidth = 2;
      drawRoundedRect(this.ctx, x + 2, y + 2, width - 4, height - 4, 12);
      this.ctx.stroke();
    }

    drawBench(decoration) {
      const cx = this.mapOffsetX + decoration.x * this.tileSize;
      const cy = this.mapOffsetY + decoration.y * this.tileSize;
      const width = this.tileSize * 1.35;
      const height = this.tileSize * 0.55;

      this.ctx.fillStyle = "rgba(0,0,0,0.16)";
      this.ctx.fillRect(cx - width / 2 + 2, cy - 1, width, height);
      this.ctx.fillStyle = this.state.uvMode ? "#7d6ca9" : "#7d5d3c";
      drawRoundedRect(this.ctx, cx - width / 2, cy - height / 2, width, height, 4);
      this.ctx.fill();
      this.ctx.fillStyle = this.state.uvMode ? "#ab9fd1" : "#b18a5c";
      this.ctx.fillRect(cx - width / 2 + 2, cy - height / 2 + 2, width - 4, 3);
    }

    drawPlant(decoration) {
      const cx = this.mapOffsetX + decoration.x * this.tileSize;
      const cy = this.mapOffsetY + decoration.y * this.tileSize;

      this.ctx.fillStyle = this.state.uvMode ? "#7053a4" : "#9b7248";
      this.ctx.fillRect(cx - 5, cy + 1, 10, 6);
      this.ctx.fillStyle = this.state.uvMode ? "#c1b0ff" : "#5f9c55";
      this.ctx.beginPath();
      this.ctx.arc(cx, cy - 1, 7, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = this.state.uvMode ? "#e7dcff" : "#78bf6e";
      this.ctx.beginPath();
      this.ctx.arc(cx - 4, cy - 4, 4, 0, Math.PI * 2);
      this.ctx.arc(cx + 4, cy - 4, 4, 0, Math.PI * 2);
      this.ctx.fill();
    }

    drawPedestal(decoration) {
      const cx = this.mapOffsetX + decoration.x * this.tileSize;
      const cy = this.mapOffsetY + decoration.y * this.tileSize;

      this.ctx.fillStyle = "rgba(0,0,0,0.12)";
      this.ctx.fillRect(cx - 7, cy - 1, 14, 12);
      this.ctx.fillStyle = this.state.uvMode ? "#dad6ff" : "#f4efe6";
      this.ctx.fillRect(cx - 8, cy - 8, 16, 14);
      this.ctx.strokeStyle = this.state.uvMode ? "#7963b4" : "#bcaf94";
      this.ctx.strokeRect(cx - 8, cy - 8, 16, 14);
      this.ctx.fillStyle = this.state.uvMode ? "#b298ff" : "#d6c7a4";
      this.ctx.beginPath();
      this.ctx.arc(cx, cy - 10, 5, 0, Math.PI * 2);
      this.ctx.fill();
    }

    drawInteractables() {
      for (const obj of this.interactables) {
        const cx = this.mapOffsetX + obj.x * this.tileSize;
        const cy = this.mapOffsetY + obj.y * this.tileSize;
        const size = Math.max(7, Math.floor(this.tileSize * 0.7));

        if (obj.type === "panel") {
          this.ctx.fillStyle = this.state.uvMode ? "#4b4f8f" : "#e4f2f0";
          this.ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
          this.ctx.strokeStyle = this.state.uvMode ? "#d4cdff" : "#1f4040";
          this.ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
          this.ctx.fillStyle = this.state.uvMode ? "#e6ddff" : "#1f4040";
          this.ctx.font = "bold 9px monospace";
          this.ctx.textAlign = "center";
          this.ctx.fillText("i", cx, cy + 3);
          continue;
        }

        if (obj.type === "artwork") {
          const art = ART_BY_ID.get(obj.artworkId);
          const room = art ? art.room : 1;
          const frameColor = room === 1
            ? (this.state.uvMode ? "#e9d5ff" : "#8a4f2f")
            : room === 2
              ? (this.state.uvMode ? "#cff3ff" : "#2c6f98")
              : (this.state.uvMode ? "#ffd6ff" : "#7d2f7a");
          const innerX = Math.round(cx - size / 2 + 2);
          const innerY = Math.round(cy - size / 2 + 2);
          const innerSize = Math.round(size - 4);

          this.ctx.fillStyle = this.state.uvMode ? "rgba(255,255,255,0.08)" : "rgba(255, 223, 174, 0.22)";
          this.ctx.beginPath();
          this.ctx.ellipse(cx, cy + size * 0.12, size * 0.85, size * 1.25, 0, 0, Math.PI * 2);
          this.ctx.fill();

          this.ctx.fillStyle = frameColor;
          this.ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
          this.ctx.fillStyle = this.state.uvMode ? "#35255d" : "#f9f3ea";
          this.ctx.fillRect(innerX, innerY, innerSize, innerSize);

          const image = art ? this.artworkImages.get(art.id) : null;
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.rect(innerX, innerY, innerSize, innerSize);
          this.ctx.clip();
          if (!drawImageCover(this.ctx, image, innerX, innerY, innerSize, innerSize)) {
            this.ctx.fillStyle = this.state.uvMode ? "#3e2d68" : "#eadcc7";
            this.ctx.fillRect(innerX, innerY, innerSize, innerSize);
          }
          this.ctx.restore();

          this.ctx.fillStyle = this.state.uvMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)";
          this.ctx.fillRect(innerX + 1, innerY + 1, innerSize - 2, 2);

          if (art && this.state.viewedArtworks.has(art.id)) {
            this.ctx.fillStyle = this.state.uvMode ? "#abffbf" : "#1f6e45";
            this.ctx.fillRect(cx + size / 2 - 5, cy - size / 2 + 1, 4, 4);
          }

          if (this.state.uvMode && art && art.uvClue) {
            this.ctx.fillStyle = "#f6e6ff";
            this.ctx.fillRect(cx - 2, cy - 2, 4, 4);
          }

          this.ctx.fillStyle = this.state.uvMode ? "#f4e9ff" : "#ffffff";
          drawRoundedRect(this.ctx, cx - size / 2 + 1, cy + size / 2 + 2, size - 2, 5, 2);
          this.ctx.fill();
          continue;
        }

        if (obj.type === "terminal") {
          const solved = this.state.solvedRooms[obj.room] === true;
          this.ctx.fillStyle = solved
            ? (this.state.uvMode ? "#7dffbd" : "#3ea96a")
            : (this.state.uvMode ? "#95d3ff" : "#3d83ae");
          this.ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
          this.ctx.fillStyle = "rgba(255,255,255,0.8)";
          this.ctx.fillRect(cx - size / 2 + 2, cy - size / 2 + 2, size - 4, 3);
          continue;
        }

        if (obj.type === "exit") {
          this.ctx.fillStyle = this.state.exitUnlocked
            ? (this.state.uvMode ? "#a5ff9a" : "#6ec66e")
            : (this.state.uvMode ? "#ffd388" : "#d7ac4e");
          this.ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
          this.ctx.fillStyle = "rgba(0,0,0,0.18)";
          this.ctx.fillRect(cx - size / 2 + 2, cy - size / 2 + 2, size - 4, size - 4);
        }
      }
    }

    drawPlayer() {
      const cx = Math.round(this.mapOffsetX + this.player.x * this.tileSize);
      const cy = Math.round(this.mapOffsetY + this.player.y * this.tileSize);
      const bob = Math.round(this.player.moving ? Math.sin(this.player.walkPhase) * 1.4 : 0);
      const swing = Math.round(this.player.moving ? Math.sin(this.player.walkPhase) * 2 : 0);

      this.ctx.fillStyle = "rgba(0,0,0,0.22)";
      this.ctx.beginPath();
      this.ctx.ellipse(cx, cy + 7, 8, 4, 0, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = this.state.uvMode ? "#2d2553" : "#2f4c78";
      this.ctx.fillRect(cx - 5, cy - 1 + bob, 10, 10);
      this.ctx.fillStyle = this.state.uvMode ? "#f7e6ff" : "#ffd8b1";
      this.ctx.fillRect(cx - 4, cy - 9 + bob, 8, 8);
      this.ctx.fillStyle = this.state.uvMode ? "#c7afff" : "#745031";
      this.ctx.fillRect(cx - 5, cy - 11 + bob, 10, 3);

      this.ctx.fillStyle = this.state.uvMode ? "#d9caff" : "#f1c57d";
      if (this.player.facing === "left") {
        this.ctx.fillRect(cx - 6, cy - 7 + bob, 2, 2);
      } else if (this.player.facing === "right") {
        this.ctx.fillRect(cx + 4, cy - 7 + bob, 2, 2);
      } else {
        this.ctx.fillRect(cx - 3, cy - 7 + bob, 2, 2);
        this.ctx.fillRect(cx + 1, cy - 7 + bob, 2, 2);
      }

      this.ctx.fillStyle = this.state.uvMode ? "#ece3ff" : "#523216";
      this.ctx.fillRect(cx - 5, cy + 9, 3, 4 + Math.max(0, swing));
      this.ctx.fillRect(cx + 2, cy + 9, 3, 4 + Math.max(0, -swing));

      this.ctx.fillStyle = this.state.uvMode ? "#eadfff" : "#dba85f";
      this.ctx.fillRect(cx - 7, cy + 1 + bob, 2, 6);
      this.ctx.fillRect(cx + 5, cy + 1 + bob, 2, 6);
    }

    drawFocus() {
      if (!this.focused || this.isOverlayOpen()) {
        return;
      }

      const cx = this.mapOffsetX + this.focused.x * this.tileSize;
      const cy = this.mapOffsetY + this.focused.y * this.tileSize;
      const radius = Math.max(7, Math.floor(this.tileSize * 0.45));

      this.ctx.strokeStyle = this.state.uvMode ? "#f6e3ff" : "#fff4cf";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    drawUvOverlay() {
      if (!this.state.uvMode) {
        return;
      }

      this.ctx.fillStyle = "rgba(167, 87, 255, 0.12)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updatePrompt() {
      if (!this.running || this.isOverlayOpen() || !this.focused) {
        this.promptEl.classList.add("hidden");
        return;
      }

      this.promptEl.classList.remove("hidden");
      this.promptEl.textContent = `[E] ${this.focused.label}`;
    }

    tryInteract() {
      if (!this.running || this.state.finished || this.isOverlayOpen()) {
        return;
      }

      if (!this.focused) {
        return;
      }

      this.audio.beep("interact");

      if (this.focused.type === "panel") {
        this.openRoomPanel(this.focused.room);
      } else if (this.focused.type === "artwork") {
        this.openArtworkModal(this.focused.artworkId);
      } else if (this.focused.type === "terminal") {
        this.openRoomTerminal(this.focused.room);
      } else if (this.focused.type === "exit") {
        this.openExitTerminal();
      }
    }

    openRoomPanel(roomId) {
      const theme = ROOM_THEMES[roomId];
      if (!theme) {
        return;
      }

      const body = this.openModal(`${theme.name} - Panneau`, "panel");
      const intro = document.createElement("p");
      intro.textContent = theme.intro;
      body.appendChild(intro);

      const note = document.createElement("div");
      note.className = "clue-box";
      note.textContent =
        "But pedagogique: distinguer la folie percue par la societe et la demarche artistique des auteurs.";
      body.appendChild(note);
    }

    openModal(title, kind = "generic") {
      this.modalTitle.textContent = title;
      this.modalBody.innerHTML = "";
      this.activeModalKind = kind;
      this.modalPanel.classList.remove("hidden");
      return this.modalBody;
    }

    closeModal() {
      this.modalPanel.classList.add("hidden");
      this.modalBody.innerHTML = "";
      this.activeModalKind = null;
    }

    isOverlayOpen() {
      return !this.modalPanel.classList.contains("hidden")
        || !this.notebookPanel.classList.contains("hidden")
        || this.startScreen.classList.contains("visible")
        || this.endScreen.classList.contains("visible");
    }

    openArtworkModal(artworkId) {
      const art = ART_BY_ID.get(artworkId);
      if (!art) {
        return;
      }

      this.state.viewedArtworks.add(art.id);
      if (this.state.uvMode) {
        this.state.uvReadArtworks.add(art.id);
      }
      this.refreshNotebook();

      const body = this.openModal(`${ROOM_THEMES[art.room].name} - ${art.title}`, "artwork");

      const card = document.createElement("div");
      card.className = "artwork-card";

      const mediaWrap = document.createElement("div");
      const fallback = document.createElement("div");
      fallback.className = "artwork-fallback";
      fallback.innerHTML = `<span>${art.title}<br>${art.artist}</span>`;

      const paletteA = art.room === 1 ? "#b78357" : art.room === 2 ? "#5a9fc3" : "#a464aa";
      const paletteB = art.room === 1 ? "#613925" : art.room === 2 ? "#275670" : "#5e2b64";
      fallback.style.backgroundImage = `url('${createFallbackSvgData(art.title, paletteA, paletteB)}')`;
      fallback.style.backgroundSize = "cover";
      fallback.style.backgroundPosition = "center";

      if (art.assetPath) {
        fallback.classList.add("hidden");
        const img = document.createElement("img");
        img.className = "artwork-image";
        img.src = art.assetPath;
        img.alt = `${art.title} - ${art.artist}`;
        img.addEventListener("error", () => {
          img.remove();
          fallback.classList.remove("hidden");
        });
        mediaWrap.appendChild(img);
      }
      mediaWrap.appendChild(fallback);
      card.appendChild(mediaWrap);

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = [
        `<strong>${art.title}</strong>`,
        `<span>Artiste: ${art.artist}</span>`,
        `<span>Annee: ${art.year}</span>`,
        `<span>Courant: ${art.movement}</span>`,
        `<span><strong>Contexte social:</strong> ${art.socialView}</span>`,
        `<span><strong>Ce qu'on comprend:</strong> ${art.learning}</span>`,
        `<span><a class="external-link" href="${art.sourceUrl}" target="_blank" rel="noopener">Source externe (fiche oeuvre)</a></span>`
      ].join("");
      card.appendChild(meta);
      body.appendChild(card);

      const clue = document.createElement("div");
      clue.className = "clue-box";
      clue.textContent = `Indice de salle: ${art.clue}`;
      body.appendChild(clue);

      const uv = document.createElement("div");
      uv.className = "clue-box";
      uv.textContent = this.state.uvMode
        ? art.uvClue
        : "Astuce: active le mode UV (U) et reinspecte l'oeuvre pour lire une note cachee.";
      body.appendChild(uv);

      const note = document.createElement("p");
      note.textContent =
        "Projet academique: ressources artistiques externes (Wikimedia/Wikipedia) avec credit de source.";
      body.appendChild(note);

      const closeHint = document.createElement("div");
      closeHint.className = "modal-hint";
      closeHint.textContent = "Fermer: touche E, Echap ou bouton x";
      body.appendChild(closeHint);
    }

    roomMissingArtworks(roomId) {
      return ROOM_ART_IDS[roomId].filter((id) => !this.state.viewedArtworks.has(id));
    }

    openRoomTerminal(roomId) {
      const theme = ROOM_THEMES[roomId];
      if (!theme) {
        return;
      }

      const body = this.openModal(`${theme.name} - Console d'analyse`, "terminal");

      if (roomId === 2 && !this.state.solvedRooms[1]) {
        const p = document.createElement("p");
        p.textContent = "Acces refuse: termine d'abord la salle 1 pour ouvrir ce secteur.";
        body.appendChild(p);
        return;
      }

      if (roomId === 3 && !this.state.solvedRooms[2]) {
        const p = document.createElement("p");
        p.textContent = "Acces refuse: la salle 3 est liee a la validation de la salle 2.";
        body.appendChild(p);
        return;
      }

      if (this.state.solvedRooms[roomId]) {
        const done = document.createElement("p");
        done.className = "success";
        done.textContent = `Fragment deja obtenu: ${this.state.fragments[roomId]}`;
        body.appendChild(done);
        return;
      }

      const missing = this.roomMissingArtworks(roomId);
      if (missing.length) {
        const p = document.createElement("p");
        p.textContent = "La console demande l'analyse des 3 oeuvres de la salle avant validation.";
        body.appendChild(p);

        const list = document.createElement("ul");
        for (const artId of missing) {
          const art = ART_BY_ID.get(artId);
          const li = document.createElement("li");
          li.textContent = art ? art.title : artId;
          list.appendChild(li);
        }
        body.appendChild(list);
        return;
      }

      const intro = document.createElement("div");
      intro.className = "clue-box";
      intro.textContent = theme.intro;
      body.appendChild(intro);

      const question = document.createElement("p");
      question.textContent = theme.puzzle.question;
      body.appendChild(question);

      const optionsRow = document.createElement("div");
      optionsRow.className = "options-row";
      body.appendChild(optionsRow);

      const feedback = document.createElement("div");
      body.appendChild(feedback);

      for (const option of theme.puzzle.options) {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = option.text;
        btn.addEventListener("click", () => {
          if (option.correct) {
            this.state.solvedRooms[roomId] = true;
            this.state.fragments[roomId] = theme.word;
            this.unlockDoorForRoom(roomId);
            this.updateObjective();
            this.refreshNotebook();
            this.audio.beep("success");
            feedback.className = "success";
            feedback.textContent = `${option.explanation} Mot-clef obtenu: ${theme.word}`;
          } else {
            this.audio.beep("error");
            feedback.className = "error";
            feedback.textContent = option.explanation;
          }
        });
        optionsRow.appendChild(btn);
      }
    }

    unlockDoorForRoom(roomId) {
      if (roomId === 1) {
        this.map[10][12] = TILE.FLOOR;
      } else if (roomId === 2) {
        this.map[10][24] = TILE.FLOOR;
      }
    }

    openExitTerminal() {
      const body = this.openModal("Porte principale - Assemblage des 3 mots", "exit");

      const missing = [];
      if (!this.state.solvedRooms[1]) {
        missing.push("Salle 1");
      }
      if (!this.state.solvedRooms[2]) {
        missing.push("Salle 2");
      }
      if (!this.state.solvedRooms[3]) {
        missing.push("Salle 3");
      }

      if (missing.length) {
        const p = document.createElement("p");
        p.textContent = `Fragments manquants: ${missing.join(", ")}.`;
        body.appendChild(p);
        return;
      }

      const clue = document.createElement("div");
      clue.className = "clue-box";
      clue.textContent =
        "Saisis les 3 mots dans l'ordre des salles (1 -> 2 -> 3). Exemple de format: MOT1 MOT2 MOT3";
      body.appendChild(clue);

      const input = document.createElement("input");
      input.className = "text-input";
      input.type = "text";
      input.placeholder = "Entrez les 3 mots";

      const submit = document.createElement("button");
      submit.className = "primary";
      submit.textContent = "Debloquer";

      const row = document.createElement("div");
      row.className = "options-row";
      row.appendChild(input);
      row.appendChild(submit);
      body.appendChild(row);

      const feedback = document.createElement("div");
      body.appendChild(feedback);

      const expectedRaw = `${this.state.fragments[1]} ${this.state.fragments[2]} ${this.state.fragments[3]}`;
      const expected = normalizeAnswer(expectedRaw);

      submit.addEventListener("click", () => {
        const entered = normalizeAnswer(input.value);
        if (entered === expected) {
          this.state.exitUnlocked = true;
          this.map[10][35] = TILE.FLOOR;
          this.updateObjective();
          this.audio.beep("success");
          feedback.className = "success";
          feedback.textContent =
            "Code semantique valide. La porte principale est ouverte, traverse le couloir de sortie.";
        } else {
          this.audio.beep("error");
          feedback.className = "error";
          feedback.textContent = "Assemblage incorrect. Reprends les mots-clefs du carnet.";
        }
      });
    }

    toggleNotebook(forceValue) {
      if (!this.running || this.state.finished) {
        return;
      }

      const hidden = this.notebookPanel.classList.contains("hidden");
      const shouldOpen = typeof forceValue === "boolean" ? forceValue : hidden;

      if (shouldOpen) {
        this.refreshNotebook();
        this.notebookPanel.classList.remove("hidden");
      } else {
        this.notebookPanel.classList.add("hidden");
      }
    }

    toggleUvMode() {
      if (!this.running || this.state.finished) {
        return;
      }
      this.state.uvMode = !this.state.uvMode;
      this.updateStatusBadges();
      this.audio.beep("toggle");
    }

    toggleSound() {
      this.audio.unlockByGesture();
      const wasEnabled = this.audio.enabled;
      if (wasEnabled) {
        this.audio.beep("toggle");
      }
      const enabled = this.audio.toggle();
      if (enabled) {
        this.audio.beep("toggle");
      }
      this.soundIndicatorEl.textContent = `Son: ${enabled ? "ON" : "OFF"}`;
    }

    refreshNotebook() {
      const root = this.notebookContent;
      root.innerHTML = "";

      for (const roomId of [1, 2, 3]) {
        const theme = ROOM_THEMES[roomId];
        const section = document.createElement("section");
        section.className = "notebook-room";

        const title = document.createElement("h3");
        title.textContent = theme.name;
        section.appendChild(title);

        const intro = document.createElement("p");
        intro.textContent = theme.intro;
        section.appendChild(intro);

        const list = document.createElement("ul");
        for (const artId of ROOM_ART_IDS[roomId]) {
          const art = ART_BY_ID.get(artId);
          const seen = this.state.viewedArtworks.has(artId);

          const li = document.createElement("li");
          if (!seen) {
            li.textContent = `[ ] Oeuvre non inspectee`;
          } else {
            const uv = this.state.uvReadArtworks.has(artId) ? " | UV lu" : " | UV non lu";
            li.textContent = `[x] ${art.title} - ${art.artist}${uv}`;
          }
          list.appendChild(li);
        }
        section.appendChild(list);

        if (this.state.fragments[roomId]) {
          const fragment = document.createElement("div");
          fragment.className = "fragment";
          fragment.textContent = `Mot-clef obtenu: ${this.state.fragments[roomId]}`;
          section.appendChild(fragment);
        }

        root.appendChild(section);
      }

      const summary = document.createElement("section");
      summary.className = "notebook-room";
      const f1 = this.state.fragments[1] || "___";
      const f2 = this.state.fragments[2] || "___";
      const f3 = this.state.fragments[3] || "___";
      summary.innerHTML = `
        <h3>Synthese finale</h3>
        <p>Fil rouge: la folie percue par la societe peut masquer une demarche artistique lucide et innovante.</p>
        <p>Assemblage (1 -> 2 -> 3): <strong>${f1} ${f2} ${f3}</strong></p>
      `;
      root.appendChild(summary);
    }

    updateObjective() {
      let text;
      if (!this.state.solvedRooms[1]) {
        text = "Objectif: Salle 1. Observe Van Gogh, Munch, Goya puis valide la console d'analyse.";
      } else if (!this.state.solvedRooms[2]) {
        text = "Objectif: Salle 2 ouverte. Comprendre le role du reve et des visions dans les oeuvres.";
      } else if (!this.state.solvedRooms[3]) {
        text = "Objectif: Salle 3. Identifier la rupture des codes et le scandale social.";
      } else if (!this.state.exitUnlocked) {
        text = "Objectif: Recomposer la phrase-clef avec les 3 mots obtenus.";
      } else {
        text = "Objectif: La sortie est ouverte. Traverse le couloir final.";
      }
      this.objectiveEl.textContent = text;
    }

    updateStatusBadges() {
      this.uvIndicatorEl.textContent = `UV: ${this.state.uvMode ? "ON" : "OFF"}`;
      this.soundIndicatorEl.textContent = `Son: ${this.audio.enabled ? "ON" : "OFF"}`;
    }

    checkVictory() {
      if (!this.state.exitUnlocked || this.state.finished) {
        return;
      }

      if (this.player.x > 35.5 && this.player.y > 9.0 && this.player.y < 12.0) {
        this.finishRun();
      }
    }

    finishRun() {
      this.state.finished = true;
      this.running = false;
      this.closeModal();
      this.toggleNotebook(false);

      const total = Math.floor(this.state.elapsedMs / 1000);
      const min = Math.floor(total / 60);
      const sec = total % 60;
      this.endTime.textContent = `Temps final: ${pad2(min)}:${pad2(sec)} | Cible conseillee: ~30:00`;

      this.endScreen.classList.remove("hidden");
      this.endScreen.classList.add("visible");
    }
  }

  const game = new EscapeGame();
  game.run();
})();
