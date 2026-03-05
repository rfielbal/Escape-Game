(() => {
  "use strict";

  const INTERNAL_WIDTH = 320;
  const INTERNAL_HEIGHT = 180;
  const FOV = Math.PI / 3;
  const MAX_DEPTH = 24;
  const RAY_STEP = 0.02;
  const COLUMN_WIDTH = 2;

  const TILE = {
    FLOOR: 0,
    WALL: 1,
    DOOR_1: 11,
    DOOR_2: 12,
    DOOR_EXIT: 13
  };

  const ROOM_LABELS = {
    1: "Salle I - Renaissance",
    2: "Salle II - Impressionnisme",
    3: "Salle III - Avant-gardes"
  };

  const ARTWORKS = [
    {
      id: "arnolfini",
      room: 1,
      title: "Les Epoux Arnolfini",
      artist: "Jan van Eyck",
      family: "Eyck",
      year: 1434,
      movement: "Renaissance flamande",
      summary: "Portrait celebre pour ses symboles caches dans les details du decor.",
      clue: "Observe bien l'annee et garde son chiffre des unites.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/Les_%C3%89poux_Arnolfini"
    },
    {
      id: "last-supper",
      room: 1,
      title: "La Cene",
      artist: "Leonard de Vinci",
      family: "Vinci",
      year: 1498,
      movement: "Haute Renaissance",
      summary: "Fresque monumentale ou le cadrage et les gestes racontent une tension dramatique.",
      clue: "Cette oeuvre sert de pivot temporel dans la salle.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/La_C%C3%A8ne_(L%C3%A9onard_de_Vinci)"
    },
    {
      id: "school-athens",
      room: 1,
      title: "L'Ecole d'Athenes",
      artist: "Raphael",
      family: "Raphael",
      year: 1511,
      movement: "Renaissance italienne",
      summary: "Scene philosophique qui reunit penseurs antiques dans une architecture ideale.",
      clue: "Retiens la position de cette date dans l'ordre chronologique.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/94/School_of_Athens_Raphael.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/L%27%C3%89cole_d%27Ath%C3%A8nes"
    },
    {
      id: "impression-sunrise",
      room: 2,
      title: "Impression, soleil levant",
      artist: "Claude Monet",
      family: "Monet",
      year: 1872,
      movement: "Impressionnisme",
      summary: "Toile fondatrice qui a donne son nom au mouvement impressionniste.",
      clue: "Ce titre est central pour l'enigme de la salle.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/56/Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/Impression,_soleil_levant",
      movementOrigin: true
    },
    {
      id: "moulin-galette",
      room: 2,
      title: "Bal du moulin de la Galette",
      artist: "Pierre-Auguste Renoir",
      family: "Renoir",
      year: 1876,
      movement: "Impressionnisme",
      summary: "Scene de vie parisienne, lumiere filtree et foule en mouvement.",
      clue: "Observe l'annee pour mesurer l'ecart avec les autres oeuvres.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/Bal_du_moulin_de_la_Galette"
    },
    {
      id: "degas-star",
      room: 2,
      title: "L'Etoile",
      artist: "Edgar Degas",
      family: "Degas",
      year: 1878,
      movement: "Impressionnisme",
      summary: "Danseuse eclairee au coeur de la scene, point de vue dramatique.",
      clue: "Repere si cette oeuvre est la plus recente de la salle.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Edgar_Degas_-_The_Star_%28L%27%C3%89toile%29.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/L%27%C3%89toile_(Degas)"
    },
    {
      id: "grande-jatte",
      room: 3,
      title: "Un dimanche apres-midi a l'Ile de la Grande Jatte",
      artist: "Georges Seurat",
      family: "Seurat",
      year: 1884,
      movement: "Neo-impressionnisme",
      summary: "Composition construite par points de couleur et rythmes geometriques.",
      clue: "Active le mode UV: un nombre secret est cache dans le cadre.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Georges_Seurat_1884-86_A_Sunday_on_La_Grande_Jatte.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/Un_dimanche_apr%C3%A8s-midi_%C3%A0_l%27%C3%8Ele_de_la_Grande_Jatte",
      uvValue: 3
    },
    {
      id: "the-scream",
      room: 3,
      title: "Le Cri",
      artist: "Edvard Munch",
      family: "Munch",
      year: 1893,
      movement: "Expressionnisme",
      summary: "Image iconique de l'angoisse moderne, ciel tourbillonnant et cri silencieux.",
      clue: "Le mode UV devoile un deuxieme nombre.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/Le_Cri",
      uvValue: 1
    },
    {
      id: "composition-viii",
      room: 3,
      title: "Composition VIII",
      artist: "Vassily Kandinsky",
      family: "Kandinsky",
      year: 1923,
      movement: "Art abstrait",
      summary: "Cercles, lignes et triangles pour traduire la musique en langage visuel.",
      clue: "Le dernier nombre UV est ici. Classe ensuite les oeuvres par date.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/Vassily_Kandinsky%2C_1923_-_Composition_8.jpg",
      sourceUrl: "https://fr.wikipedia.org/wiki/Composition_VIII",
      uvValue: 7
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

  function normalizeAngle(angle) {
    while (angle < -Math.PI) {
      angle += Math.PI * 2;
    }
    while (angle > Math.PI) {
      angle -= Math.PI * 2;
    }
    return angle;
  }

  function angleDelta(a, b) {
    return Math.abs(normalizeAngle(a - b));
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
      "<rect x='24' y='22' width='352' height='256' fill='rgba(5,9,15,0.32)' stroke='rgba(255,255,255,0.35)'/>",
      "<circle cx='88' cy='88' r='36' fill='rgba(255,255,255,0.18)'/>",
      "<rect x='152' y='72' width='176' height='20' fill='rgba(255,255,255,0.22)'/>",
      "<rect x='152' y='108' width='130' height='16' fill='rgba(255,255,255,0.18)'/>",
      "<rect x='56' y='194' width='288' height='56' fill='rgba(0,0,0,0.35)'/>",
      `<text x='200' y='228' text-anchor='middle' font-size='20' font-family='Verdana' fill='white'>${safeTitle}</text>`,
      "</svg>"
    ].join("");

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function tileColor(tile, uvMode, distanceFactor) {
    let base;

    if (tile === TILE.WALL) {
      base = uvMode ? [46, 60, 110] : [108, 78, 58];
    } else if (tile === TILE.DOOR_1) {
      base = uvMode ? [64, 75, 138] : [136, 58, 44];
    } else if (tile === TILE.DOOR_2) {
      base = uvMode ? [58, 110, 148] : [56, 96, 126];
    } else if (tile === TILE.DOOR_EXIT) {
      base = uvMode ? [96, 92, 172] : [148, 122, 58];
    } else {
      base = uvMode ? [40, 50, 92] : [84, 84, 84];
    }

    const shade = clamp(1 - distanceFactor * 0.85, 0.15, 1);
    const r = Math.floor(base[0] * shade);
    const g = Math.floor(base[1] * shade);
    const b = Math.floor(base[2] * shade);
    return `rgb(${r}, ${g}, ${b})`;
  }

  class AudioEngine {
    constructor() {
      this.enabled = true;
      this.ctx = null;
      this.master = null;
      this.ambientGain = null;
      this.ambientOscA = null;
      this.ambientOscB = null;
      this.stepAt = 0;
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
      this.master.gain.value = 0.15;
      this.master.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0.0;
      this.ambientGain.connect(this.master);

      this.ambientOscA = this.ctx.createOscillator();
      this.ambientOscA.type = "triangle";
      this.ambientOscA.frequency.value = 63;
      this.ambientOscA.connect(this.ambientGain);

      this.ambientOscB = this.ctx.createOscillator();
      this.ambientOscB.type = "sine";
      this.ambientOscB.frequency.value = 95;
      this.ambientOscB.connect(this.ambientGain);

      this.ambientOscA.start();
      this.ambientOscB.start();
    }

    async unlockByGesture() {
      this.ensure();
      if (!this.ctx) {
        return;
      }
      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }
      this.updateAmbient();
    }

    updateAmbient() {
      if (!this.ambientGain || !this.ctx) {
        return;
      }
      const now = this.ctx.currentTime;
      const target = this.enabled ? 0.035 : 0;
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.linearRampToValueAtTime(target, now + 0.35);
    }

    toggle() {
      this.enabled = !this.enabled;
      this.updateAmbient();
      return this.enabled;
    }

    beep(type) {
      if (!this.enabled || !this.ctx || !this.master) {
        return;
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.master);

      const now = this.ctx.currentTime;
      if (type === "success") {
        osc.type = "square";
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
      } else if (type === "error") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
      } else {
        osc.type = "triangle";
        osc.frequency.value = 420;
      }

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.start(now);
      osc.stop(now + 0.2);
    }

    step() {
      if (!this.enabled || !this.ctx || !this.master) {
        return;
      }
      const now = this.ctx.currentTime;
      if (now - this.stepAt < 0.24) {
        return;
      }
      this.stepAt = now;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 140 + Math.random() * 35;
      osc.connect(gain);
      gain.connect(this.master);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.028, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.start(now);
      osc.stop(now + 0.09);
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
      this.touchButtons = Array.from(document.querySelectorAll("[data-touch]"));

      this.audio = new AudioEngine();

      this.keys = new Set();
      this.touchState = {
        forward: false,
        back: false,
        left: false,
        right: false,
        turnLeft: false,
        turnRight: false
      };
      this.running = false;
      this.lastFrame = performance.now();
      this.depthBuffer = new Array(INTERNAL_WIDTH).fill(MAX_DEPTH);
      this.focused = null;

      this.player = {
        x: 4.5,
        y: 7.0,
        angle: 0
      };

      this.state = {
        startedAt: 0,
        elapsedMs: 0,
        finished: false,
        uvMode: false,
        viewedArtworks: new Set(),
        uvScanned: new Set(),
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
      this.map = [];
      this.mapWidth = 40;
      this.mapHeight = 15;

      this.attachUi();
      this.buildMap();
      this.buildInteractables();
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
        this.audio.beep("soft");
        this.canvas.focus();
      });

      this.restartButton.addEventListener("click", () => {
        window.location.reload();
      });

      this.modalCloseBtn.addEventListener("click", () => {
        this.closeModal();
      });

      this.closeNotebookBtn.addEventListener("click", () => {
        this.toggleNotebook(false);
      });

      this.canvas.addEventListener("click", () => {
        if (!this.running || this.isOverlayOpen()) {
          return;
        }
        if (document.pointerLockElement !== this.canvas && this.canvas.requestPointerLock) {
          this.canvas.requestPointerLock();
        }
      });

      document.addEventListener("mousemove", (event) => {
        if (!this.running || this.isOverlayOpen()) {
          return;
        }
        if (document.pointerLockElement !== this.canvas) {
          return;
        }
        this.player.angle = normalizeAngle(this.player.angle + event.movementX * 0.0025);
      });

      window.addEventListener("resize", () => this.resizeCanvas());

      document.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();

        if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
          event.preventDefault();
        }

        if (!event.repeat) {
          if (key === "e") {
            this.tryInteract();
          }
          if (key === "u") {
            this.toggleUvMode();
          }
          if (key === "j") {
            this.toggleNotebook();
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
          if (!this.running || this.state.finished || this.isOverlayOpen()) {
            return;
          }

          if (action === "interact") {
            this.tryInteract();
            return;
          }

          if (action === "uv") {
            this.toggleUvMode();
            return;
          }

          if (action === "forward") {
            this.touchState.forward = true;
          } else if (action === "back") {
            this.touchState.back = true;
          } else if (action === "left") {
            this.touchState.left = true;
          } else if (action === "right") {
            this.touchState.right = true;
          } else if (action === "turn-left") {
            this.touchState.turnLeft = true;
          } else if (action === "turn-right") {
            this.touchState.turnRight = true;
          }
        };

        const release = (event) => {
          event.preventDefault();
          if (action === "forward") {
            this.touchState.forward = false;
          } else if (action === "back") {
            this.touchState.back = false;
          } else if (action === "left") {
            this.touchState.left = false;
          } else if (action === "right") {
            this.touchState.right = false;
          } else if (action === "turn-left") {
            this.touchState.turnLeft = false;
          } else if (action === "turn-right") {
            this.touchState.turnRight = false;
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

      const partitions = [10, 11, 21, 22, 32, 33];
      for (const x of partitions) {
        for (let y = 1; y < this.mapHeight - 1; y += 1) {
          map[y][x] = TILE.WALL;
        }
      }

      map[7][10] = TILE.DOOR_1;
      map[7][11] = TILE.DOOR_1;
      map[7][21] = TILE.DOOR_2;
      map[7][22] = TILE.DOOR_2;
      map[7][32] = TILE.DOOR_EXIT;
      map[7][33] = TILE.DOOR_EXIT;

      this.map = map;
    }

    buildInteractables() {
      this.interactables = [
        { id: "art-arnolfini", type: "artwork", artworkId: "arnolfini", room: 1, x: 3.3, y: 3.0, label: "Cadre d'art" },
        { id: "art-cene", type: "artwork", artworkId: "last-supper", room: 1, x: 7.6, y: 3.0, label: "Cadre d'art" },
        { id: "art-athenes", type: "artwork", artworkId: "school-athens", room: 1, x: 5.2, y: 11.0, label: "Cadre d'art" },
        { id: "terminal-r1", type: "terminal", room: 1, x: 8.3, y: 7.0, label: "Console salle I" },

        { id: "art-monet", type: "artwork", artworkId: "impression-sunrise", room: 2, x: 14.0, y: 3.0, label: "Cadre d'art" },
        { id: "art-renoir", type: "artwork", artworkId: "moulin-galette", room: 2, x: 18.4, y: 3.0, label: "Cadre d'art" },
        { id: "art-degas", type: "artwork", artworkId: "degas-star", room: 2, x: 16.3, y: 11.0, label: "Cadre d'art" },
        { id: "terminal-r2", type: "terminal", room: 2, x: 19.2, y: 7.0, label: "Console salle II" },

        { id: "art-seurat", type: "artwork", artworkId: "grande-jatte", room: 3, x: 24.2, y: 3.0, label: "Cadre d'art" },
        { id: "art-munch", type: "artwork", artworkId: "the-scream", room: 3, x: 28.4, y: 3.0, label: "Cadre d'art" },
        { id: "art-kandinsky", type: "artwork", artworkId: "composition-viii", room: 3, x: 26.0, y: 11.0, label: "Cadre d'art" },
        { id: "terminal-r3", type: "terminal", room: 3, x: 30.2, y: 7.0, label: "Console salle III" },

        { id: "terminal-exit", type: "exit", x: 31.1, y: 7.0, label: "Porte principale" }
      ];
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
        this.updatePlayerMovement(dt);
      } else {
        this.resetTouchState();
      }

      this.focused = this.findFocusedInteractable();
      this.updatePrompt();
      this.updateTimer();
      this.checkVictory();
    }

    resetTouchState() {
      this.touchState.forward = false;
      this.touchState.back = false;
      this.touchState.left = false;
      this.touchState.right = false;
      this.touchState.turnLeft = false;
      this.touchState.turnRight = false;
    }

    updateTimer() {
      if (!this.state.startedAt) {
        this.timerEl.textContent = "Temps: 00:00";
        return;
      }

      this.state.elapsedMs = performance.now() - this.state.startedAt;
      const totalSec = Math.floor(this.state.elapsedMs / 1000);
      const min = Math.floor(totalSec / 60);
      const sec = totalSec % 60;
      this.timerEl.textContent = `Temps: ${pad2(min)}:${pad2(sec)}`;
    }

    updatePlayerMovement(dt) {
      const moveSpeed = 2.2;
      const rotateSpeed = 1.9;

      let move = 0;
      let strafe = 0;
      let rotate = 0;

      if (this.keys.has("z") || this.keys.has("w") || this.keys.has("arrowup") || this.touchState.forward) {
        move += moveSpeed * dt;
      }
      if (this.keys.has("s") || this.keys.has("arrowdown") || this.touchState.back) {
        move -= moveSpeed * dt;
      }
      if (this.keys.has("q") || this.keys.has("a") || this.touchState.left) {
        strafe -= moveSpeed * dt;
      }
      if (this.keys.has("d") || this.touchState.right) {
        strafe += moveSpeed * dt;
      }
      if (this.keys.has("arrowleft") || this.touchState.turnLeft) {
        rotate -= rotateSpeed * dt;
      }
      if (this.keys.has("arrowright") || this.touchState.turnRight) {
        rotate += rotateSpeed * dt;
      }

      this.player.angle = normalizeAngle(this.player.angle + rotate);

      if (move === 0 && strafe === 0) {
        return;
      }

      const dx = Math.cos(this.player.angle) * move + Math.cos(this.player.angle + Math.PI / 2) * strafe;
      const dy = Math.sin(this.player.angle) * move + Math.sin(this.player.angle + Math.PI / 2) * strafe;

      this.tryMove(this.player.x + dx, this.player.y + dy);
      this.audio.step();
    }

    tryMove(targetX, targetY) {
      const radius = 0.22;

      const canMoveX = !this.isSolidAt(targetX + radius, this.player.y)
        && !this.isSolidAt(targetX - radius, this.player.y)
        && !this.isSolidAt(targetX, this.player.y + radius)
        && !this.isSolidAt(targetX, this.player.y - radius);

      if (canMoveX) {
        this.player.x = targetX;
      }

      const canMoveY = !this.isSolidAt(this.player.x + radius, targetY)
        && !this.isSolidAt(this.player.x - radius, targetY)
        && !this.isSolidAt(this.player.x, targetY + radius)
        && !this.isSolidAt(this.player.x, targetY - radius);

      if (canMoveY) {
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

    castRay(angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      let depth = 0;
      let hitX = this.player.x;
      let hitY = this.player.y;
      let tile = TILE.FLOOR;

      while (depth < MAX_DEPTH) {
        depth += RAY_STEP;
        hitX = this.player.x + cos * depth;
        hitY = this.player.y + sin * depth;
        tile = this.getTileAt(hitX, hitY);

        if (tile !== TILE.FLOOR) {
          break;
        }
      }

      return {
        depth,
        hitX,
        hitY,
        tile
      };
    }

    render() {
      this.drawBackground();
      this.drawWalls();
      this.drawSprites();
      this.drawScanlines();
    }

    drawBackground() {
      if (this.state.uvMode) {
        this.ctx.fillStyle = "#0f1530";
      } else {
        this.ctx.fillStyle = "#1d253b";
      }
      this.ctx.fillRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT / 2);

      if (this.state.uvMode) {
        this.ctx.fillStyle = "#080d1f";
      } else {
        this.ctx.fillStyle = "#14100c";
      }
      this.ctx.fillRect(0, INTERNAL_HEIGHT / 2, INTERNAL_WIDTH, INTERNAL_HEIGHT / 2);

      const fogAlpha = this.state.uvMode ? 0.15 : 0.08;
      this.ctx.fillStyle = `rgba(0, 0, 0, ${fogAlpha})`;
      this.ctx.fillRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
    }

    drawWalls() {
      for (let x = 0; x < INTERNAL_WIDTH; x += COLUMN_WIDTH) {
        const rayAngle = this.player.angle - FOV / 2 + (x / INTERNAL_WIDTH) * FOV;
        const ray = this.castRay(rayAngle);

        const correctedDepth = Math.max(0.001, ray.depth * Math.cos(rayAngle - this.player.angle));
        const wallHeight = Math.min(INTERNAL_HEIGHT, (INTERNAL_HEIGHT / correctedDepth) * 1.05);
        const top = Math.floor((INTERNAL_HEIGHT - wallHeight) / 2);

        const hitTextureCoord = Math.abs((ray.hitX + ray.hitY) * 2.5) % 1;
        const textureNudge = hitTextureCoord > 0.5 ? 0.05 : -0.03;
        const distanceFactor = clamp(correctedDepth / MAX_DEPTH + textureNudge, 0, 1);

        this.ctx.fillStyle = tileColor(ray.tile, this.state.uvMode, distanceFactor);
        this.ctx.fillRect(x, top, COLUMN_WIDTH, wallHeight);

        const shadowStrength = clamp(distanceFactor * 0.7, 0.05, 0.7);
        this.ctx.fillStyle = `rgba(0, 0, 0, ${shadowStrength})`;
        this.ctx.fillRect(x, top + wallHeight, COLUMN_WIDTH, INTERNAL_HEIGHT - (top + wallHeight));

        this.depthBuffer[x] = correctedDepth;
        if (x + 1 < INTERNAL_WIDTH) {
          this.depthBuffer[x + 1] = correctedDepth;
        }
      }
    }

    drawSprites() {
      const sprites = [];

      for (const obj of this.interactables) {
        if (!this.isInteractableVisible(obj)) {
          continue;
        }

        const dx = obj.x - this.player.x;
        const dy = obj.y - this.player.y;
        const distance = Math.hypot(dx, dy);
        const relAngle = normalizeAngle(Math.atan2(dy, dx) - this.player.angle);

        if (Math.abs(relAngle) > FOV / 2 + 0.22) {
          continue;
        }

        const size = clamp(115 / distance, 6, 88);
        const screenX = Math.floor((0.5 + relAngle / FOV) * INTERNAL_WIDTH - size / 2);
        const screenY = Math.floor(INTERNAL_HEIGHT / 2 - size / 2);

        sprites.push({
          obj,
          distance,
          size,
          screenX,
          screenY
        });
      }

      sprites.sort((a, b) => b.distance - a.distance);

      for (const sprite of sprites) {
        const centerX = clamp(Math.floor(sprite.screenX + sprite.size / 2), 0, INTERNAL_WIDTH - 1);
        if (sprite.distance > this.depthBuffer[centerX] + 0.2) {
          continue;
        }

        let fill = "#b28a50";
        if (sprite.obj.type === "terminal") {
          fill = "#4da7d4";
        }
        if (sprite.obj.type === "exit") {
          fill = "#dfba55";
        }

        if (this.state.uvMode && sprite.obj.type === "artwork") {
          fill = "#8f6bff";
        }

        this.ctx.fillStyle = fill;
        this.ctx.fillRect(sprite.screenX, sprite.screenY, sprite.size, sprite.size);

        this.ctx.strokeStyle = "rgba(255,255,255,0.5)";
        this.ctx.strokeRect(sprite.screenX, sprite.screenY, sprite.size, sprite.size);

        if (this.state.uvMode && sprite.obj.type === "artwork") {
          const art = ART_BY_ID.get(sprite.obj.artworkId);
          if (art && typeof art.uvValue === "number") {
            this.ctx.fillStyle = "#dbcbff";
            this.ctx.font = "10px monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText(String(art.uvValue), sprite.screenX + sprite.size / 2, sprite.screenY + sprite.size / 2 + 3);
          }
        }
      }
    }

    drawScanlines() {
      this.ctx.fillStyle = "rgba(0,0,0,0.09)";
      for (let y = 0; y < INTERNAL_HEIGHT; y += 2) {
        this.ctx.fillRect(0, y, INTERNAL_WIDTH, 1);
      }
    }

    isInteractableVisible(obj) {
      if (obj.type === "terminal" && obj.room === 2 && !this.state.solvedRooms[1]) {
        return false;
      }
      if (obj.type === "terminal" && obj.room === 3 && !this.state.solvedRooms[2]) {
        return false;
      }
      return true;
    }

    findFocusedInteractable() {
      const candidates = [];

      for (const obj of this.interactables) {
        if (!this.isInteractableVisible(obj)) {
          continue;
        }

        const dx = obj.x - this.player.x;
        const dy = obj.y - this.player.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 1.45) {
          continue;
        }

        const targetAngle = Math.atan2(dy, dx);
        const delta = angleDelta(targetAngle, this.player.angle);
        if (delta > 0.55) {
          continue;
        }

        const blocker = this.castRay(targetAngle);
        if (blocker.tile !== TILE.FLOOR && blocker.depth < distance - 0.15) {
          continue;
        }

        candidates.push({ obj, distance, delta });
      }

      candidates.sort((a, b) => a.distance - b.distance || a.delta - b.delta);
      return candidates.length ? candidates[0].obj : null;
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

      this.audio.beep("soft");

      if (this.focused.type === "artwork") {
        this.openArtworkModal(this.focused.artworkId);
      } else if (this.focused.type === "terminal") {
        this.openRoomTerminal(this.focused.room);
      } else if (this.focused.type === "exit") {
        this.openExitTerminal();
      }
    }

    openModal(title) {
      this.modalTitle.textContent = title;
      this.modalBody.innerHTML = "";
      this.modalPanel.classList.remove("hidden");
      return this.modalBody;
    }

    closeModal() {
      this.modalPanel.classList.add("hidden");
      this.modalBody.innerHTML = "";
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
      if (this.state.uvMode && typeof art.uvValue === "number") {
        this.state.uvScanned.add(art.id);
      }

      this.refreshNotebook();
      const body = this.openModal(`${ROOM_LABELS[art.room]} - ${art.title}`);

      const card = document.createElement("div");
      card.className = "artwork-card";

      const mediaWrap = document.createElement("div");
      const fallback = document.createElement("div");
      fallback.className = "artwork-fallback";
      fallback.innerHTML = `<span>${art.title}<br>${art.artist}</span>`;

      const paletteA = art.room === 1 ? "#9f6e4d" : art.room === 2 ? "#4d7a9f" : "#7165a9";
      const paletteB = art.room === 1 ? "#4c2f24" : art.room === 2 ? "#1f476d" : "#2e2f69";
      fallback.style.backgroundImage = `url('${createFallbackSvgData(art.title, paletteA, paletteB)}')`;
      fallback.style.backgroundSize = "cover";
      fallback.style.backgroundPosition = "center";
      fallback.style.color = "#ffffff";
      fallback.style.textShadow = "0 1px 4px rgba(0,0,0,0.8)";

      if (art.imageUrl) {
        fallback.classList.add("hidden");
        const img = document.createElement("img");
        img.className = "artwork-image";
        img.src = art.imageUrl;
        img.alt = `${art.title} - ${art.artist}`;
        img.addEventListener("error", () => {
          img.remove();
          fallback.classList.remove("hidden");
        });
        mediaWrap.appendChild(img);
      }

      mediaWrap.appendChild(fallback);
      card.appendChild(mediaWrap);

      const info = document.createElement("div");
      info.className = "meta";
      info.innerHTML = [
        `<strong>${art.title}</strong>`,
        `<span>Artiste: ${art.artist}</span>`,
        `<span>Annee: ${art.year}</span>`,
        `<span>Courant: ${art.movement}</span>`,
        `<span>${art.summary}</span>`,
        `<span><a class=\"external-link\" href=\"${art.sourceUrl}\" target=\"_blank\" rel=\"noopener\">Voir la fiche externe de l'oeuvre</a></span>`
      ].join("");

      card.appendChild(info);
      body.appendChild(card);

      const clue = document.createElement("div");
      clue.className = "clue-box";
      clue.textContent = `Indice: ${art.clue}`;
      body.appendChild(clue);

      if (typeof art.uvValue === "number") {
        const uvLine = document.createElement("div");
        uvLine.className = "clue-box";

        if (this.state.uvMode) {
          uvLine.textContent = `Mode UV actif: marquage invisible detecte -> ${art.uvValue}`;
        } else {
          uvLine.textContent = "Un vernis reactif est present. Active le mode UV (touche U) puis reinspecte cette oeuvre.";
        }

        body.appendChild(uvLine);
      }

      const note = document.createElement("p");
      note.textContent = "Source: Wikimedia Commons / Wikipedia (ressources externes utilisees pour un projet academique).";
      body.appendChild(note);
    }

    computeRoomCode(roomId) {
      const roomArts = ARTWORKS.filter((art) => art.room === roomId);

      if (roomId === 1) {
        const years = roomArts.map((a) => a.year).sort((a, b) => a - b);
        const units = years.map((year) => year % 10);
        const firstDigit = units[0] + units[2];
        const secondDigit = units[1];
        return `${firstDigit}${secondDigit}`;
      }

      if (roomId === 2) {
        const years = roomArts.map((a) => a.year);
        const firstDigit = Math.max(...years) - Math.min(...years);
        const origin = roomArts.find((a) => a.movementOrigin);
        const secondDigit = origin ? origin.family.length : 0;
        return `${firstDigit}${secondDigit}`;
      }

      const sorted = roomArts
        .slice()
        .sort((a, b) => a.year - b.year);
      const firstDigit = sorted[0].uvValue;
      const secondDigit = sorted[sorted.length - 1].uvValue;
      return `${firstDigit}${secondDigit}`;
    }

    roomMissingArtworks(roomId) {
      return ROOM_ART_IDS[roomId].filter((id) => !this.state.viewedArtworks.has(id));
    }

    roomMissingUvScans(roomId) {
      return ROOM_ART_IDS[roomId].filter((id) => {
        const art = ART_BY_ID.get(id);
        return typeof art.uvValue === "number" && !this.state.uvScanned.has(id);
      });
    }

    openRoomTerminal(roomId) {
      const body = this.openModal(`${ROOM_LABELS[roomId]} - Console enigme`);

      if (roomId === 2 && !this.state.solvedRooms[1]) {
        const p = document.createElement("p");
        p.textContent = "Acces refuse: termine d'abord la salle I pour debloquer ce secteur.";
        body.appendChild(p);
        return;
      }

      if (roomId === 3 && !this.state.solvedRooms[2]) {
        const p = document.createElement("p");
        p.textContent = "Acces refuse: la salle III reste verrouillee tant que la salle II n'est pas resolue.";
        body.appendChild(p);
        return;
      }

      if (this.state.solvedRooms[roomId]) {
        const already = document.createElement("p");
        already.className = "success";
        already.textContent = `Code deja valide. Fragment obtenu: ${this.state.fragments[roomId]}`;
        body.appendChild(already);
        return;
      }

      const missing = this.roomMissingArtworks(roomId);
      if (missing.length) {
        const p = document.createElement("p");
        p.textContent = "Le terminal detecte des informations manquantes. Inspecte toutes les oeuvres de cette salle.";
        body.appendChild(p);

        const list = document.createElement("ul");
        for (const id of missing) {
          const art = ART_BY_ID.get(id);
          const li = document.createElement("li");
          li.textContent = art ? art.title : id;
          list.appendChild(li);
        }
        body.appendChild(list);
        return;
      }

      if (roomId === 3) {
        const missingUv = this.roomMissingUvScans(roomId);
        if (missingUv.length) {
          const p = document.createElement("p");
          p.textContent = "Salle III: active le mode UV et reinspecte les oeuvres pour lire les marquages caches.";
          body.appendChild(p);
          return;
        }
      }

      const intro = document.createElement("div");
      intro.className = "clue-box";

      if (roomId === 1) {
        intro.textContent = "Regle salle I: trie les 3 oeuvres par annee croissante. A = unite de la plus ancienne + unite de la plus recente. B = unite de l'oeuvre du milieu. Code = AB.";
      } else if (roomId === 2) {
        intro.textContent = "Regle salle II: A = annee la plus recente - annee la plus ancienne. B = nombre de lettres du nom de famille de l'artiste ayant peint l'oeuvre qui donne son nom a l'impressionnisme. Code = AB.";
      } else {
        intro.textContent = "Regle salle III: active UV, recupere les 3 nombres caches, classe les oeuvres par annee croissante, puis garde le premier et le dernier nombre. Code = AB.";
      }

      body.appendChild(intro);

      const row = document.createElement("div");
      row.className = "input-row";

      const input = document.createElement("input");
      input.className = "code-input";
      input.type = "text";
      input.maxLength = 2;
      input.placeholder = "Code 2 chiffres";

      const submit = document.createElement("button");
      submit.className = "primary";
      submit.textContent = "Valider";

      const feedback = document.createElement("div");

      submit.addEventListener("click", () => {
        const entered = input.value.trim();
        const expected = this.computeRoomCode(roomId);

        if (entered === expected) {
          this.state.solvedRooms[roomId] = true;
          this.state.fragments[roomId] = expected;
          this.unlockDoorForRoom(roomId);
          this.refreshNotebook();
          this.updateObjective();
          this.audio.beep("success");
          feedback.className = "success";
          feedback.textContent = `Correct. Fragment ${expected} enregistre.`;
        } else {
          this.audio.beep("error");
          feedback.className = "error";
          feedback.textContent = "Code incorrect. Reprends les indices des oeuvres.";
        }
      });

      row.appendChild(input);
      row.appendChild(submit);
      body.appendChild(row);
      body.appendChild(feedback);
    }

    unlockDoorForRoom(roomId) {
      if (roomId === 1) {
        this.map[7][10] = TILE.FLOOR;
        this.map[7][11] = TILE.FLOOR;
      }
      if (roomId === 2) {
        this.map[7][21] = TILE.FLOOR;
        this.map[7][22] = TILE.FLOOR;
      }
      if (roomId === 3) {
        // no physical door after room III, only final gate.
      }
    }

    openExitTerminal() {
      const body = this.openModal("Porte principale - Digicode maitre");

      if (!this.state.solvedRooms[1] || !this.state.solvedRooms[2] || !this.state.solvedRooms[3]) {
        const warning = document.createElement("p");
        warning.textContent = "Le systeme exige 3 fragments. Termine d'abord les trois salles.";
        body.appendChild(warning);
        return;
      }

      const expected = `${this.state.fragments[1]}${this.state.fragments[2]}${this.state.fragments[3]}`;

      const clue = document.createElement("div");
      clue.className = "clue-box";
      clue.textContent = "Assemble les fragments dans l'ordre des salles: I -> II -> III.";
      body.appendChild(clue);

      const row = document.createElement("div");
      row.className = "input-row";

      const input = document.createElement("input");
      input.className = "code-input";
      input.maxLength = 6;
      input.placeholder = "Code maitre (6 chiffres)";

      const submit = document.createElement("button");
      submit.className = "primary";
      submit.textContent = "Debloquer";

      const feedback = document.createElement("div");

      submit.addEventListener("click", () => {
        const entered = input.value.trim();
        if (entered === expected) {
          this.state.exitUnlocked = true;
          this.map[7][32] = TILE.FLOOR;
          this.map[7][33] = TILE.FLOOR;
          this.updateObjective();
          this.audio.beep("success");
          feedback.className = "success";
          feedback.textContent = "Code valide. La porte principale est deverrouillee.";
        } else {
          this.audio.beep("error");
          feedback.className = "error";
          feedback.textContent = "Mauvaise combinaison. Verifie l'ordre des fragments.";
        }
      });

      row.appendChild(input);
      row.appendChild(submit);
      body.appendChild(row);
      body.appendChild(feedback);
    }

    toggleUvMode() {
      if (!this.running || this.state.finished) {
        return;
      }
      this.state.uvMode = !this.state.uvMode;
      this.updateStatusBadges();
      this.audio.beep("soft");
    }

    toggleSound() {
      const on = this.audio.toggle();
      this.soundIndicatorEl.textContent = `Son: ${on ? "ON" : "OFF"}`;
    }

    toggleNotebook(forceValue) {
      if (!this.running || this.state.finished) {
        return;
      }

      const currentlyHidden = this.notebookPanel.classList.contains("hidden");
      const shouldOpen = typeof forceValue === "boolean" ? forceValue : currentlyHidden;

      if (shouldOpen) {
        this.refreshNotebook();
        this.notebookPanel.classList.remove("hidden");
      } else {
        this.notebookPanel.classList.add("hidden");
      }
    }

    refreshNotebook() {
      const root = this.notebookContent;
      root.innerHTML = "";

      for (const roomId of [1, 2, 3]) {
        const section = document.createElement("section");
        section.className = "notebook-room";

        const title = document.createElement("h3");
        title.textContent = ROOM_LABELS[roomId];
        section.appendChild(title);

        const list = document.createElement("ul");
        for (const artId of ROOM_ART_IDS[roomId]) {
          const art = ART_BY_ID.get(artId);
          const viewed = this.state.viewedArtworks.has(artId);

          const li = document.createElement("li");
          if (!viewed) {
            li.textContent = `[ ] Oeuvre non inspectee`;
          } else {
            let line = `[x] ${art.title} - ${art.artist} (${art.year})`;
            if (typeof art.uvValue === "number") {
              if (this.state.uvScanned.has(artId)) {
                line += ` | UV: ${art.uvValue}`;
              } else {
                line += " | UV: non lu";
              }
            }
            li.textContent = line;
          }
          list.appendChild(li);
        }
        section.appendChild(list);

        if (this.state.fragments[roomId]) {
          const fragment = document.createElement("div");
          fragment.className = "fragment";
          fragment.textContent = `Fragment obtenu: ${this.state.fragments[roomId]}`;
          section.appendChild(fragment);
        }

        root.appendChild(section);
      }

      const summary = document.createElement("section");
      summary.className = "notebook-room";
      const collected = `${this.state.fragments[1] || "__"} ${this.state.fragments[2] || "__"} ${this.state.fragments[3] || "__"}`;
      summary.innerHTML = `
        <h3>Assemblage du code maitre</h3>
        <p>Ordre attendu: Salle I -> Salle II -> Salle III</p>
        <p><strong>${collected}</strong></p>
      `;
      root.appendChild(summary);
    }

    updateObjective() {
      let text;

      if (!this.state.solvedRooms[1]) {
        text = "Objectif: Explorer la salle Renaissance, inspecter 3 oeuvres et resoudre la console I.";
      } else if (!this.state.solvedRooms[2]) {
        text = "Objectif: Salle II ouverte. Observe les oeuvres impressionnistes et calcule le fragment suivant.";
      } else if (!this.state.solvedRooms[3]) {
        text = "Objectif: Salle III. Active UV, releve les nombres caches, puis valide la console III.";
      } else if (!this.state.exitUnlocked) {
        text = "Objectif: Recomposer le code maitre (6 chiffres) sur la porte principale.";
      } else {
        text = "Objectif: La porte est ouverte. Traverse le sas de sortie.";
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

      if (this.player.x > 34.5 && this.player.y > 6.0 && this.player.y < 8.0) {
        this.finishRun();
      }
    }

    finishRun() {
      this.state.finished = true;
      this.running = false;
      this.closeModal();
      this.toggleNotebook(false);

      const totalSec = Math.floor(this.state.elapsedMs / 1000);
      const min = Math.floor(totalSec / 60);
      const sec = totalSec % 60;
      this.endTime.textContent = `Temps final: ${pad2(min)}:${pad2(sec)} | Cible recommandee: ~30:00`;
      this.endScreen.classList.remove("hidden");
      this.endScreen.classList.add("visible");

      if (document.pointerLockElement === this.canvas && document.exitPointerLock) {
        document.exitPointerLock();
      }
    }
  }

  const game = new EscapeGame();
  game.run();
})();
