/* Game Idea Spark
   Runs in the browser. No network calls. Templated plans plus keyword detection.
   The first mechanic keyword in the line picks the genre. "cozy" is a tone
   unless it is the only signal. Scary/spooky words are a tone unless nothing
   else matches, in which case the sketch becomes horror. */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Spark = api;
})(typeof window !== "undefined" ? window : global, function () {
  var GENRES = [
    {
      id: "farm",
      label: "Farming",
      lib: "kaboom",
      words: ["farm", "farms", "farming", "farmer", "farmers", "crop", "crops", "harvest", "harvesting", "garden", "gardens", "gardening", "barn", "barns"],
      gesture: "one plot the player can tend",
      fit: "A small grid you click is the whole game, so a lightweight 2D tool is enough.",
      loop: [
        { label: "Morning", text: "Spend a small energy pool to plant, water, or harvest on a 4 by 4 plot." },
        { label: "Dusk", text: "Each crop shows a mood. Give the whole field one order." },
        { label: "Night", text: "Crops in a good mood help. One neglected crop causes a single problem you can see." },
        { label: "Dawn", text: "Win after 3 nights with the field intact, or lose when 2 plots are overrun." }
      ],
      weekend: [
        "One screen, a 4 by 4 grid, and three crop types.",
        "One resource, energy, and one night event.",
        "A win and a loss you can reach in a few minutes."
      ],
      cut: [
        "Seasons, weather, and a story campaign.",
        "NPCs, a shop, and a crafting tree.",
        "Accounts, cloud saves, and multiplayer."
      ]
    },
    {
      id: "space",
      label: "Space",
      lib: "kaboom",
      words: ["space", "asteroid", "asteroids", "galaxy", "galaxies", "spaceship", "spaceships", "rocket", "rockets", "orbit", "orbits", "alien", "aliens", "planet", "planets", "moon"],
      gesture: "a ship you steer through one hazard",
      fit: "One ship and one hazard need a sprite and a loop, not a campaign framework.",
      loop: [
        { label: "Launch", text: "Put one ship on screen with a hull number the player can read." },
        { label: "Drift", text: "Steer, and either dodge or fire. Use one hazard, named from the idea if it has one." },
        { label: "Pressure", text: "The field gets a little denser every few seconds. No second weapon." },
        { label: "Dock", text: "The run ends when the hull hits zero or a short timer expires. Offer one upgrade, then restart." }
      ],
      weekend: [
        "One ship, one hazard, and keyboard or pointer controls.",
        "A hull number, a score, and a game over on the same screen.",
        "One upgrade choice between runs, hardcoded."
      ],
      cut: [
        "A galaxy map, trading, and crew management.",
        "Weapon trees, crafting, and a story.",
        "Online leaderboards, accounts, and multiplayer."
      ]
    },
    {
      id: "puzzle",
      label: "Puzzle",
      lib: "p5",
      words: ["puzzle", "puzzles", "sokoban", "match-3", "match 3", "tetris", "mahjong", "nonogram", "sudoku"],
      gesture: "one board and one kind of move",
      fit: "One board and one kind of move is a drawing loop plus a check, not a content pipeline.",
      loop: [
        { label: "Read", text: "Show the goal in one sentence and a small board." },
        { label: "Move", text: "The player makes one kind of move: slide, rotate, or swap." },
        { label: "Check", text: "The board shows immediately whether that move helped." },
        { label: "Clear", text: "Win by reaching the goal inside a move limit. Restart returns the same board." }
      ],
      weekend: [
        "One puzzle, not a level editor and not a pack of levels.",
        "Undo is enough. No hint shop.",
        "A clear win, and a restart of the same board."
      ],
      cut: [
        "A hundred levels, a world map, and a level editor.",
        "Timers that punish thinking, and a hint economy.",
        "Accounts, daily puzzles from a server, and leaderboards."
      ]
    },
    {
      id: "roguelike",
      label: "Roguelike",
      lib: "kaboom",
      words: ["roguelike", "roguelikes", "roguelite", "roguelites", "rogue-like", "rogue-lite", "permadeath"],
      gesture: "a run that ends, plus one upgrade between tries",
      fit: "Three rooms and one upgrade should stay a short list of rules, not an item database.",
      loop: [
        { label: "Enter", text: "One room, the player, and one enemy type." },
        { label: "Act", text: "One action: move, strike, or use the single item." },
        { label: "Loot", text: "Clearing the room offers one upgrade. That choice is the only meta progress." },
        { label: "End", text: "Losing ends the run. The next run starts over, with that same one-upgrade rule." }
      ],
      weekend: [
        "Three rooms in a line, then a run-ending loss.",
        "One enemy type and one upgrade choice.",
        "Permadeath for the run. No town, no stash screen."
      ],
      cut: [
        "Skill trees, classes, and dozens of items.",
        "A hub town, shops, and lore.",
        "Multiplayer, seasons, and cloud saves."
      ]
    },
    {
      id: "platformer",
      label: "Platformer",
      lib: "kaboom",
      words: ["platformer", "platformers", "platforming", "side-scroller", "side-scrollers", "sidescroller", "sidescrollers", "side scroller", "side scrollers", "metroidvania", "endless runner"],
      gesture: "a jump across one gap",
      fit: "A run, a jump, and a goal fit on one short stage.",
      loop: [
        { label: "Spawn", text: "A short stretch of ground, one gap, and the player." },
        { label: "Jump", text: "Left, right, and jump. That is the whole move set." },
        { label: "Hazard", text: "One obstacle costs a life: a pit or a single patrol." },
        { label: "Goal", text: "Touch the flag to win. Three lives, then the same stretch restarts." }
      ],
      weekend: [
        "One screen, or a very short horizontal stage.",
        "Run, jump, one hazard, and a goal.",
        "Three lives and a restart. No ability unlocks."
      ],
      cut: [
        "A world map, cutscenes, and boss phases.",
        "Double-jump trees, collectathon counters, and secrets.",
        "Online ghosts, level sharing, and accounts."
      ]
    },
    {
      id: "horror",
      label: "Horror",
      lib: "kaboom",
      words: ["survival horror", "horror", "ghost", "ghosts", "haunted", "haunting", "zombie", "zombies"],
      gesture: "a slow search with one thing to avoid",
      fit: "One room, a few hotspots, and a threat that gets closer do not need a combat system.",
      loop: [
        { label: "Arrive", text: "One dim room. The objective fits in one sentence, such as find the key." },
        { label: "Search", text: "Walk and interact with two or three hotspots." },
        { label: "Threat", text: "Something gets closer if you linger or make noise. The prototype has no combat." },
        { label: "Leave", text: "Win by reaching the exit. Lose if the threat reaches the player." }
      ],
      weekend: [
        "One room, two or three things to inspect, and an exit.",
        "A sight limit or a simple light, and one threat.",
        "No combat, no inventory grid, and no gore system."
      ],
      cut: [
        "An open town, weapon crafting, and a sanity RPG.",
        "A jump-scare editor, cutscenes, and a monster roster.",
        "Multiplayer, voice chat, and accounts."
      ]
    },
    {
      id: "cozy",
      label: "Cozy",
      lib: "p5",
      promoteOnly: true,
      gesture: "one comforting action you repeat",
      fit: "One comforting action in one room is a sketch, not a life sim.",
      loop: [
        { label: "Settle", text: "One room and one comforting verb, such as stir, water, arrange, or pour." },
        { label: "Tend", text: "Repeat that verb a few times. A meter fills." },
        { label: "Visit", text: "One small interruption with a yes or no choice." },
        { label: "Close", text: "The session ends at evening. Three sessions are the whole prototype." }
      ],
      weekend: [
        "One room and one repeated action.",
        "A meter, one interruption, and an end-of-day line.",
        "Failure no harsher than a spilled cup or a do-over."
      ],
      cut: [
        "Skill trees, combat, and a city.",
        "Dozens of recipes, guests, and decorations.",
        "Online visits, accounts, and a crafting spreadsheet."
      ]
    },
    {
      id: "card",
      label: "Card",
      lib: "html",
      words: ["card game", "cards", "card", "deckbuilder", "deck-builder", "deck builder", "solitaire", "poker", "blackjack"],
      gesture: "draw a card, play a card, and resolve it",
      fit: "Ten cards and a hand are a layout problem first. Skip a deck-builder framework.",
      loop: [
        { label: "Draw", text: "A hand of three cards from a deck of ten." },
        { label: "Play", text: "Play one card. It does the only thing written on it." },
        { label: "Resolve", text: "One opposing number reacts: a rival card or a threat track." },
        { label: "End", text: "The round ends when the deck is empty or the score hits a target." }
      ],
      weekend: [
        "Ten hardcoded cards. Each card is a name plus one effect.",
        "A hand, a play, and one opposing number.",
        "No pack opening, no collection screen, and no ranks."
      ],
      cut: [
        "Hundreds of cards, rarities, and a deck editor.",
        "An economy, a shop, and animated pack opening.",
        "Online play, accounts, and leaderboards."
      ]
    },
    {
      id: "racing",
      label: "Racing",
      lib: "kaboom",
      words: ["racing", "kart", "karts", "racecar", "racecars", "race car", "race cars", "grand prix"],
      gesture: "one lap and a finish line",
      fit: "One track, one car, and a lap counter are enough to feel the race.",
      loop: [
        { label: "Grid", text: "One car and a short loop the player can see all at once." },
        { label: "Drive", text: "Steer and accelerate. There is no tuning screen." },
        { label: "Rival", text: "One opponent, or a ghost line, shares the same track." },
        { label: "Finish", text: "Three laps, or a clock. Then the same track restarts." }
      ],
      weekend: [
        "One track drawn with simple shapes, and one car.",
        "Steer, accelerate, a lap counter, and a crash that only slows you down.",
        "One rival or a ghost line. No garage."
      ],
      cut: [
        "A career season, sponsors, and licensed tracks.",
        "Car customization, damage models, and tuning.",
        "Multiplayer, accounts, and replays."
      ]
    },
    {
      id: "shooter",
      label: "Shooter",
      lib: "kaboom",
      words: ["bullet hell", "bullet-hell", "shooter", "shooters", "shmup", "fps"],
      gesture: "move and shoot one enemy type",
      fit: "One arena and one enemy type are enough to test the aim.",
      loop: [
        { label: "Enter", text: "The player stands in one arena." },
        { label: "Fire", text: "Move and shoot. One weapon, no pickup screen." },
        { label: "Wave", text: "A handful of enemies that move in a simple pattern." },
        { label: "Clear", text: "Survive the wave, or lose after three hits." }
      ],
      weekend: [
        "One arena, one weapon, and one enemy type.",
        "Move, aim, and a three-hit loss.",
        "No loot, no classes, and no second weapon."
      ],
      cut: [
        "A campaign, cutscenes, and scripted set pieces.",
        "Loot rarity, classes, and vehicles.",
        "Matchmaking, accounts, and leaderboards."
      ]
    },
    {
      id: "rpg",
      label: "RPG",
      lib: "kaboom",
      words: ["jrpg", "rpg", "dungeon", "dungeons", "quest", "quests", "inventory"],
      gesture: "one errand and one number that changes",
      fit: "One errand and one changing number are the prototype, not an open world.",
      loop: [
        { label: "Enter", text: "One room, the player, and one person to talk to or one door." },
        { label: "Choose", text: "Two choices, and a consequence the player can see." },
        { label: "Number", text: "One stat changes: health, gold, or trust." },
        { label: "Resolve", text: "Win by finishing the errand. Lose if that number hits zero." }
      ],
      weekend: [
        "One room and one errand.",
        "Two choices and one number on screen.",
        "No inventory grid and no party."
      ],
      cut: [
        "An open world, a skill tree, and party management.",
        "Procedural dungeons, loot tables, and dialogue trees.",
        "Accounts, cloud saves, and multiplayer."
      ]
    },
    {
      id: "tower",
      label: "Tower defense",
      lib: "kaboom",
      words: ["tower defense", "tower-defense", "tower defence", "tower-defence"],
      gesture: "place one tower on a path",
      fit: "One path, one tower, and three waves prove the loop.",
      loop: [
        { label: "Place", text: "A path, and three spots where a tower can go." },
        { label: "Wave", text: "A line of creeps walks the path." },
        { label: "Spend", text: "Towers cost the only currency. Stopping creeps pays it back." },
        { label: "Hold", text: "Survive 3 waves, or lose when too many creeps leak through." }
      ],
      weekend: [
        "One path, one tower type, and three waves.",
        "A coin count and a leak count.",
        "No hero unit and no upgrade tree."
      ],
      cut: [
        "Ten tower types and a skill tree.",
        "A campaign map, abilities, and a hero.",
        "Multiplayer, accounts, and leaderboards."
      ]
    },
    {
      id: "rhythm",
      label: "Rhythm",
      lib: "p5",
      words: ["rhythm game", "rhythm", "bpm"],
      gesture: "tap on the beat",
      fit: "One lane and a short row of beats prove the timing.",
      loop: [
        { label: "Listen", text: "A short beat, shown as markers on one lane." },
        { label: "Hit", text: "Press one key, or tap, when a marker lands." },
        { label: "Score", text: "Hits and misses change a score the player can read." },
        { label: "End", text: "The loop lasts about 20 seconds, then shows a result." }
      ],
      weekend: [
        "One lane and a hardcoded row of markers.",
        "One input, a score, and a 20-second end.",
        "No song importer and no chart editor."
      ],
      cut: [
        "A music library, a chart editor, and multiple instruments.",
        "Online rank, replays, and a calibration lab.",
        "Accounts, a story mode, and licensed tracks."
      ]
    },
    {
      id: "stealth",
      label: "Stealth",
      lib: "kaboom",
      words: ["stealth game", "stealth", "sneaking", "sneak"],
      gesture: "wait, then cross one guarded gap",
      fit: "One guard and one gap to cross prove the sneak.",
      loop: [
        { label: "Watch", text: "One guard with a visible vision cone, in one room." },
        { label: "Sneak", text: "Move when the cone is looking away. One button hides the player." },
        { label: "Take", text: "Reach an object or a door without being seen." },
        { label: "Spotted", text: "Being seen fails the attempt. Restart is immediate." }
      ],
      weekend: [
        "One room, one guard, and a vision cone the player can see.",
        "A goal object or door, and an instant restart.",
        "No combat and no gadget wheel."
      ],
      cut: [
        "A gadget tree, disguises, and alarm cascades.",
        "A city, multiple guards with schedules, and a minimap.",
        "Multiplayer, accounts, and a story campaign."
      ]
    },
    {
      id: "survival",
      label: "Survival",
      lib: "kaboom",
      words: ["survival", "starving", "starve"],
      gesture: "gather one resource before a meter empties",
      fit: "One resource and one dropping meter prove the pressure.",
      loop: [
        { label: "Gather", text: "One resource node, and an inventory of three slots." },
        { label: "Spend", text: "Turn that resource into the one thing you need, such as a fire or a meal." },
        { label: "Meter", text: "Hunger or cold drops over time, on screen." },
        { label: "Night", text: "Fill the goal before the meter empties." }
      ],
      weekend: [
        "One screen, one resource, and one dropping meter.",
        "Three inventory slots and one crafted result.",
        "A win if the meter holds, a loss if it empties."
      ],
      cut: [
        "A tech tree, biomes, and a base-building grid.",
        "Combat, raids, and a story campaign.",
        "Co-op, accounts, and cloud saves."
      ]
    },
    {
      id: "tycoon",
      label: "Tycoon",
      lib: "p5",
      words: ["tycoon", "restaurant", "cafe", "café", "coffee shop", "shopkeeper"],
      gesture: "serve one customer and take the coin",
      fit: "One counter, one customer, and a coin total prove the shop.",
      loop: [
        { label: "Open", text: "A counter and one kind of customer." },
        { label: "Serve", text: "One action completes an order and pays coins." },
        { label: "Buy", text: "Coins buy the only upgrade." },
        { label: "Close", text: "A day ends on a timer. Three days are the prototype." }
      ],
      weekend: [
        "One product, one customer type, and a coin count.",
        "One upgrade that changes a number you can see.",
        "Three short days, then a total."
      ],
      cut: [
        "Staff AI, stock markets, and multiple shops.",
        "Decoration mode, supply chains, and loans.",
        "Online visitors, accounts, and ads."
      ]
    },
    {
      id: "mystery",
      label: "Mystery",
      lib: "p5",
      words: ["whodunnit", "whodunit", "murder mystery", "detective", "mystery"],
      gesture: "read one clue and make one accusation",
      fit: "Three clues and one accusation prove the case.",
      loop: [
        { label: "Scene", text: "One room and three clues the player can click." },
        { label: "Note", text: "The game writes each clue into a short list." },
        { label: "Ask", text: "One question with two answers." },
        { label: "Accuse", text: "Pick a solution from two options. The game says if it is right." }
      ],
      weekend: [
        "One hardcoded case, three clues, and a notebook list.",
        "One question and a two-option accusation.",
        "No text parser and no second case."
      ],
      cut: [
        "A city of cases, voice acting, and an evidence-board tool.",
        "Procedural crimes, interrogations, and a relationship sim.",
        "Multiplayer, accounts, and cloud saves."
      ]
    },
    {
      id: "fighter",
      label: "Fighter",
      lib: "kaboom",
      words: ["fighting game", "beat em up", "beat-em-up", "brawler", "fighters", "fighter"],
      gesture: "one attack and a health bar",
      fit: "One attack, one block, and a health bar prove the fight.",
      loop: [
        { label: "Face", text: "Two figures on a flat stage. The player controls one." },
        { label: "Strike", text: "One attack button and a block. No combo list." },
        { label: "Round", text: "A health bar. The round ends when one bar is empty." },
        { label: "Rematch", text: "Best of three on the same stage." }
      ],
      weekend: [
        "One stage, one opponent with a simple pattern.",
        "Attack, block, and a health bar.",
        "Best of three, then a restart. No move-list screen."
      ],
      cut: [
        "A roster, supers, and frame-data tools.",
        "Story mode, cinematics, and unlocks.",
        "Online ranked play and accounts."
      ]
    },
    {
      id: "idle",
      label: "Idle",
      lib: "p5",
      words: ["idle game", "clicker", "incremental", "idle"],
      gesture: "one number that goes up",
      fit: "One number that goes up, and one upgrade, prove the click.",
      loop: [
        { label: "Press", text: "One button produces the only resource." },
        { label: "Buy", text: "That resource hires the only helper, which produces it slowly." },
        { label: "Watch", text: "The number ticks up. There is no second screen." },
        { label: "Goal", text: "Hit a target number to win. A reset starts over." }
      ],
      weekend: [
        "One currency, one button, and one upgrade.",
        "Numbers that tick while the page is open.",
        "A target and a reset. No prestige layer."
      ],
      cut: [
        "Prestige layers, a skill web, and multiple currencies.",
        "Ads, offer walls, and a shop of boosts.",
        "Accounts, cloud saves, and a story."
      ]
    },
    {
      id: "sports",
      label: "Sports",
      lib: "kaboom",
      words: ["sports game", "soccer", "basketball", "baseball", "football", "tennis", "golf", "sports"],
      gesture: "one score on a simple field",
      fit: "One field and one way to score prove the sport.",
      loop: [
        { label: "Start", text: "Two sides on a simple field. The player controls one figure." },
        { label: "Play", text: "One verb, such as kick, throw, or swing, aimed with keys or the pointer." },
        { label: "Score", text: "The attempt scores or misses. First to 3 wins." },
        { label: "Again", text: "The same field resets. There is no season." }
      ],
      weekend: [
        "One field, one player figure, and one way to score.",
        "An opponent that moves simply.",
        "First to 3, then a restart. No season."
      ],
      cut: [
        "Leagues, team management, and transfers.",
        "Licensed teams, kits, and commentary.",
        "Online play, accounts, and a career mode."
      ]
    },
    {
      id: "generic",
      label: "One-screen",
      lib: "kaboom",
      promoteOnly: true,
      gesture: "one repeated action and a clear end",
      fit: "One repeated action, plus a clear win and loss, shows whether the idea is fun.",
      loop: [
        { label: "Goal", text: "Put the player's sentence on screen as the win condition." },
        { label: "Act", text: "The player repeats one action: move, choose, or time a press." },
        { label: "Pressure", text: "A timer or a mistake counter makes that action matter." },
        { label: "End", text: "A win and a loss live on the same screen, then a restart." }
      ],
      weekend: [
        "One screen and one repeated action.",
        "A win, a loss, and a restart. No menus beyond start.",
        "Colored shapes or text. No art production."
      ],
      cut: [
        "A second mode, a level editor, and a story.",
        "Accounts, a server, and multiplayer.",
        "An asset pipeline, cutscenes, and a settings maze."
      ]
    }
  ];

  var TONES = [
    {
      id: "cozy",
      words: ["cozy", "cosy", "wholesome", "relaxing", "comfy"],
      note: "Keep the tone warm and low-stakes. Missing a goal should feel like a spilled cup, not a scolding."
    },
    {
      id: "horror",
      words: ["scary", "spooky", "creepy", "dread"],
      note: "Keep the tone uneasy: a small space, limited sight, and no gore system in the prototype."
    },
    {
      id: "funny",
      words: ["funny", "comedy", "silly", "joke", "jokes", "pun", "puns"],
      note: "Keep the tone comic. Write the win line and the lose line as jokes the player can read in one breath."
    }
  ];

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");
  }

  function matchPhrase(text, phrase) {
    var pattern = phrase.trim().split(/\s+/).map(escapeRegExp).join("\\s+");
    var re = new RegExp("(?:^|[^a-z0-9])" + pattern + "(?![a-z0-9])", "i");
    var found = re.exec(text);
    return found ? found.index : -1;
  }

  function earliest(text, words) {
    var best = null;
    var i;
    if (!words) return null;
    for (i = 0; i < words.length; i++) {
      var index = matchPhrase(text, words[i]);
      if (index < 0) continue;
      if (!best || index < best.index || (index === best.index && words[i].length > best.word.length)) {
        best = { index: index, word: words[i] };
      }
    }
    return best;
  }

  function genreById(id) {
    var i;
    for (i = 0; i < GENRES.length; i++) {
      if (GENRES[i].id === id) return GENRES[i];
    }
    return GENRES[GENRES.length - 1];
  }

  function collect(text, list, skipPromote) {
    var hits = [];
    var i;
    for (i = 0; i < list.length; i++) {
      var item = list[i];
      if (skipPromote && item.promoteOnly) continue;
      var hit = earliest(text, item.words);
      if (!hit) continue;
      hits.push({ id: item.id, index: hit.index, word: hit.word, item: item });
    }
    hits.sort(function (a, b) {
      if (a.index !== b.index) return a.index - b.index;
      return b.word.length - a.word.length;
    });
    return hits;
  }

  function analyze(text) {
    var mechanics = collect(text, GENRES, true);
    var toneHits = collect(text, TONES, false);
    var promotable = [];
    var i;
    if (!mechanics.length) {
      for (i = 0; i < toneHits.length; i++) {
        if (toneHits[i].id === "horror" || toneHits[i].id === "cozy") promotable.push(toneHits[i]);
      }
      promotable.sort(function (a, b) { return a.index - b.index; });
      if (promotable.length) {
        mechanics.push({
          id: promotable[0].id,
          index: promotable[0].index,
          word: promotable[0].word,
          item: genreById(promotable[0].id)
        });
      }
    }
    if (!mechanics.length) {
      mechanics.push({ id: "generic", index: 0, word: "", item: genreById("generic") });
    }
    var primary = mechanics[0];
    var secondary = mechanics.length > 1 ? mechanics[1] : null;
    if (secondary && primary.word && (primary.word.indexOf(secondary.word) !== -1 || secondary.word.indexOf(primary.word) !== -1)) {
      secondary = null;
    }
    var tones = [];
    for (i = 0; i < toneHits.length; i++) {
      var tone = toneHits[i];
      if (tone.id === primary.id) continue;
      if (secondary && tone.id === secondary.id) continue;
      tones.push(tone.item);
    }
    return { primary: primary, secondary: secondary, tones: tones };
  }

  function workingTitle(raw) {
    var t = raw.replace(/^(a|an|the)\s+/i, "");
    t = t.replace(/[.!?]+$/g, "");
    if (t.length > 72) {
      var sliced = t.slice(0, 72);
      var sp = sliced.lastIndexOf(" ");
      t = sp > 24 ? sliced.slice(0, sp) : sliced;
    }
    if (!t) t = raw;
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function bullets(items) {
    var out = [];
    var i;
    for (i = 0; i < items.length; i++) out.push("- " + items[i]);
    return out;
  }

  function stackFor(level, genre) {
    if (level === "vibe") {
      return {
        name: "Phaser 3 + Vite + TypeScript",
        details: [
          "Phaser 3 draws the game. Vite runs the local dev server. TypeScript types the small amount of state.",
          genre.fit,
          "You already run projects and read a diff, so this sketch does not teach the editor.",
          "Still no backend, accounts, or a second UI framework."
        ],
        promptLine: "Use Phaser 3 with Vite and TypeScript. Create the project in the current folder (or use this folder if a Vite app is already here). Add phaser (v3). One scene is enough. Make the canvas about 960 by 540. Use colored shapes or text, and do not block on an asset pack."
      };
    }
    if (genre.lib === "html") {
      return {
        name: "One HTML file with HTML and CSS (p5.js only if you want a canvas)",
        details: [
          "One HTML file you open in a browser. No npm, no Vite, and no TypeScript.",
          "Lay the cards out with HTML and CSS.",
          genre.fit,
          "Add p5.js from a single script tag only if you want a canvas. Kaboom.js is the other single-file option if you would rather move sprites. No server."
        ],
        promptLine: "Use one HTML file. Lay the cards out with HTML and CSS. Add p5.js, from a single script tag, only if you want a canvas table. A script tag is one line in the file that loads a library. Do not ask me to install Node, npm, or Vite. If you skip the library, the hand still has to be playable. Use text on the cards if you have no art."
      };
    }
    if (genre.lib === "p5") {
      return {
        name: "One HTML file with p5.js",
        details: [
          "One HTML file you open in a browser. No npm, no Vite, and no TypeScript.",
          "Load p5.js with a single script tag. That tag is one line in the file. You do not install it.",
          genre.fit,
          "Kaboom.js is the alternative if you want sprites and collisions more than a drawing loop. No server."
        ],
        promptLine: "Use p5.js, loaded with one script tag from a CDN. A script tag is one line in the HTML file that loads the library. Do not ask me to install Node, npm, or Vite. Make one canvas about 960 by 540. Use colored shapes or text if you have no art. If the CDN does not load, draw with a plain canvas in that same file."
      };
    }
    return {
      name: "One HTML file with Kaboom.js",
      details: [
        "One HTML file you open in a browser. No npm, no Vite, and no TypeScript.",
        "Load Kaboom.js with a single script tag. That tag is one line in the file. You do not install it.",
        genre.fit,
        "p5.js is the alternative if you would rather draw each frame than use game objects. No server."
      ],
      promptLine: "Use Kaboom.js, loaded with one script tag from a CDN. A script tag is one line in the HTML file that loads the library. Do not ask me to install Node, npm, or Vite. Make the play area about 960 by 540. Use colored shapes or text if you have no art. If the CDN does not load, use a plain canvas and JavaScript in that same file."
    };
  }

  function buildPrompt(level, title, idea, genre, stack, loop, weekend, cut, blend, toneNotes, matchedWord) {
    var lines = [];
    var i;
    if (level === "beginner") {
      lines.push("I have never coded before. Please build a tiny browser prototype of my game as a single HTML file I can open by double-clicking it. Do not use npm, a bundler, TypeScript, or a backend.");
      lines.push("");
      lines.push("Explain any word I might not know, such as CDN, canvas, or function, the first time you use it. Explain every part of the file in one plain sentence, as if you are teaching me.");
    } else {
      lines.push("You are helping me build a small browser prototype with Phaser 3, Vite, and TypeScript. I already use AI coding tools. Do not teach the editor. Give me a project I can run.");
    }
    lines.push("");
    lines.push("Working title: " + title);
    lines.push("My idea, in my words:");
    lines.push(idea);
    lines.push("");
    lines.push("Stack:");
    lines.push(stack.promptLine);
    lines.push("Why this stack: " + genre.fit);
    lines.push("");
    if (genre.id === "generic") {
      lines.push("Genre to build: a one-screen game. No genre keyword was found in my line, so do not invent a large ruleset. Use my sentence as the goal.");
    } else {
      lines.push("Genre to build: " + genre.label + " (from the word \"" + matchedWord + "\").");
    }
    lines.push("");
    lines.push("The whole prototype is one screen. Core loop:");
    for (i = 0; i < loop.length; i++) {
      lines.push((i + 1) + ". " + loop[i].label + ". " + loop[i].text);
    }
    lines.push("");
    lines.push("Build only this weekend slice:");
    lines = lines.concat(bullets(weekend));
    lines.push("");
    lines.push("Do not build yet:");
    lines = lines.concat(bullets(cut));
    if (blend) {
      lines.push("");
      lines.push(blend);
    }
    if (toneNotes.length) {
      lines.push("");
      lines.push("Tone:");
      for (i = 0; i < toneNotes.length; i++) lines.push(toneNotes[i]);
    }
    lines.push("");
    lines.push("On screen, show the working title and use my idea as the subtitle. Do not use lorem ipsum. Do not download an asset pack.");
    lines.push("");
    if (level === "beginner") {
      lines.push("When you are finished:");
      lines.push("1. Tell me how to open the file. I expect to double-click it, or to open it in a browser.");
      lines.push("2. Tell me what I should see, and how to play, in plain sentences.");
      lines.push("3. Explain every part of the file in one plain sentence.");
      lines.push("4. If anything looks like an error, explain it in plain words and fix it.");
      lines.push("");
      lines.push("No accounts, no login, no server, and no extra pages.");
    } else {
      lines.push("Use this structure:");
      lines.push("- src/main.ts (game config and the scene list)");
      lines.push("- src/scenes/PlayScene.ts (the whole prototype)");
      lines.push("- src/game/types.ts (small types for the state you actually use)");
      lines.push("");
      lines.push("Add npm scripts for dev and build. No backend, no router, and no accounts.");
      lines.push("");
      lines.push("When you are done, tell me the exact command to run it, how to play the slice, and confirm there are no type errors.");
    }
    return lines.join("\n");
  }

  /* Outline for the $9 upsell. Titles and step counts only.
     The emailed pack is written after payment. These strings are not that text. */
  var PACK_TEMPLATES = {
    farm: {
      prompts: [
        "Scaffold the one-screen prototype",
        "Draw the 4 by 4 plot",
        "Add three crop types",
        "Spend energy to plant, water, or harvest",
        "Show a mood on each crop",
        "Add one dusk order for the field",
        "Add one night problem you can see",
        "Win, loss, and restart"
      ],
      beats: [
        "Draw the 4 by 4 plot on one screen",
        "Add three crop types as shapes or text",
        "Spend energy to plant, water, or harvest",
        "Show a mood on each crop",
        "Add one dusk order for the whole field",
        "Add one night problem the player can see",
        "Win after 3 nights, or lose when 2 plots are overrun",
        "Play one full loop and note the one thing that still feels wrong",
        "Leave seasons, NPCs, and a shop out"
      ]
    },
    space: {
      prompts: [
        "Scaffold the one-screen prototype",
        "Put one ship on screen with a hull number",
        "Steer, and dodge or fire at one hazard",
        "Make the field a little denser over time",
        "End the run on zero hull or a short timer",
        "Offer one upgrade, then restart",
        "Keep score on the same screen",
        "Leave the galaxy map and weapon tree out"
      ],
      beats: [
        "Put one ship on screen with a hull number",
        "Steer, and either dodge or fire",
        "Use one hazard, named from the idea when the idea names one",
        "Make the field a little denser every few seconds",
        "Show a score on the same screen",
        "End the run when the hull hits zero or a short timer expires",
        "Offer one hardcoded upgrade, then restart",
        "Play one run and note the one thing that still feels wrong",
        "Leave the galaxy map, trading, and a weapon tree out"
      ]
    },
    puzzle: {
      prompts: [
        "Scaffold the one-screen prototype",
        "Show the goal in one sentence and a small board",
        "Implement one kind of move",
        "Show immediately whether the move helped",
        "Win inside a move limit",
        "Restart the same board",
        "Add undo, and skip a hint shop"
      ],
      beats: [
        "Show the goal in one sentence",
        "Draw one small board",
        "Implement one kind of move: slide, rotate, or swap",
        "Show immediately whether that move helped",
        "Win by reaching the goal inside a move limit",
        "Restart returns the same board",
        "Add undo",
        "Play the one puzzle and note the one thing that still feels wrong",
        "Leave the level pack, the editor, and a hint shop out"
      ]
    },
    roguelike: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One room, the player, and one enemy type",
        "One action: move, strike, or use the single item",
        "Clearing the room offers one upgrade",
        "Three rooms in a line",
        "Losing ends the run",
        "The next run starts over with the same rule",
        "Leave the town and the skill tree out"
      ],
      beats: [
        "One room, the player, and one enemy type",
        "One action: move, strike, or use the single item",
        "Clearing the room offers one upgrade",
        "That upgrade is the only meta progress",
        "Lay three rooms in a line",
        "Losing ends the run",
        "The next run starts over",
        "Play one run and note the one thing that still feels wrong",
        "Leave the hub town, the skill tree, and the stash screen out"
      ]
    },
    platformer: {
      prompts: [
        "Scaffold the one-screen prototype",
        "A short stretch of ground, one gap, and the player",
        "Left, right, and jump",
        "One hazard that costs a life",
        "A goal flag",
        "Three lives, then the same stretch restarts",
        "Leave the world map and ability unlocks out"
      ],
      beats: [
        "A short stretch of ground and one gap",
        "The player",
        "Left, right, and jump only",
        "One hazard: a pit or a single patrol",
        "Touching the flag wins",
        "Three lives, then the same stretch restarts",
        "No ability unlocks",
        "Play the stretch and note the one thing that still feels wrong",
        "Leave the world map, cutscenes, and boss phases out"
      ]
    },
    horror: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One dim room and a one-sentence objective",
        "Two or three hotspots",
        "One threat that gets closer",
        "No combat",
        "An exit to win, and a loss if the threat arrives",
        "Leave the weapon crafting and the monster roster out"
      ],
      beats: [
        "One dim room",
        "An objective that fits in one sentence",
        "Two or three hotspots to inspect",
        "A sight limit or a simple light",
        "One threat that gets closer if you linger or make noise",
        "No combat and no inventory grid",
        "Win by reaching the exit, or lose if the threat arrives",
        "Play the room once and note the one thing that still feels wrong",
        "Leave the open town, the weapon crafting, and the monster roster out"
      ]
    },
    cozy: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One room and one comforting verb",
        "A meter that fills as you repeat it",
        "One yes-or-no interruption",
        "The session ends at evening",
        "Three sessions are the whole prototype",
        "Leave the skill tree and the city out"
      ],
      beats: [
        "One room",
        "One comforting verb, such as stir, water, arrange, or pour",
        "Repeating it fills a meter",
        "One small interruption with a yes or no",
        "The session ends at evening",
        "Three sessions are the whole prototype",
        "Failure no harsher than a spilled cup or a do-over",
        "Play one session and note the one thing that still feels wrong",
        "Leave the skill tree, the city, and the recipe spreadsheet out"
      ]
    },
    card: {
      prompts: [
        "Scaffold the one-screen prototype",
        "Ten hardcoded cards",
        "A hand of three",
        "Play one card for the only effect written on it",
        "One opposing number reacts",
        "End the round when the deck is empty or the score hits a target",
        "Leave pack opening and the collection screen out"
      ],
      beats: [
        "Ten hardcoded cards, each a name plus one effect",
        "Draw a hand of three",
        "Play one card",
        "Resolve the only effect written on it",
        "One opposing number reacts",
        "The round ends when the deck is empty or the score hits a target",
        "No pack opening and no ranks",
        "Play one round and note the one thing that still feels wrong",
        "Leave the collection screen, the shop, and online play out"
      ]
    },
    racing: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One short track and one car",
        "Steer and accelerate",
        "A lap counter",
        "One rival or a ghost line",
        "Three laps or a clock, then restart",
        "Leave the garage and the career season out"
      ],
      beats: [
        "One short loop the player can see all at once",
        "One car",
        "Steer and accelerate, with no tuning screen",
        "A lap counter",
        "A crash that only slows you down",
        "One rival or a ghost line on the same track",
        "Three laps or a clock, then the same track restarts",
        "Play one race and note the one thing that still feels wrong",
        "Leave the garage, the career season, and car customization out"
      ]
    },
    shooter: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One arena and the player",
        "Move and shoot with one weapon",
        "A handful of enemies in a simple pattern",
        "Lose after three hits",
        "Survive the wave",
        "Leave loot, classes, and a second weapon out"
      ],
      beats: [
        "One arena",
        "The player",
        "Move and one weapon",
        "No pickup screen",
        "A handful of enemies that move in a simple pattern",
        "Survive the wave, or lose after three hits",
        "No second weapon",
        "Play one wave and note the one thing that still feels wrong",
        "Leave the campaign, the loot, and the class select out"
      ]
    },
    rpg: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One room and one errand",
        "Two choices with a visible consequence",
        "One number on screen: health, gold, or trust",
        "Win by finishing the errand",
        "Lose if that number hits zero",
        "Leave the inventory grid and the party out"
      ],
      beats: [
        "One room",
        "One person to talk to, or one door",
        "Two choices",
        "A consequence the player can see",
        "One stat changes: health, gold, or trust",
        "Win by finishing the errand",
        "Lose if that number hits zero",
        "Play the errand and note the one thing that still feels wrong",
        "Leave the inventory grid, the party, and the skill tree out"
      ]
    },
    tower: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One path and three tower spots",
        "Place the one tower type",
        "A line of creeps",
        "Coins and a leak count",
        "Survive 3 waves, or lose when too many leak",
        "Leave the upgrade tree and the hero unit out"
      ],
      beats: [
        "One path",
        "Three spots where a tower can go",
        "One tower type",
        "A line of creeps walks the path",
        "Towers cost the only currency",
        "Stopping creeps pays it back",
        "Survive 3 waves, or lose when too many creeps leak",
        "Play the three waves and note the one thing that still feels wrong",
        "Leave the hero unit, the upgrade tree, and the campaign map out"
      ]
    },
    rhythm: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One lane and a hardcoded row of markers",
        "One key or a tap when a marker lands",
        "Hits and misses change a score",
        "The loop lasts about 20 seconds, then a result",
        "Leave the chart editor and the song importer out"
      ],
      beats: [
        "A short beat shown as markers",
        "One lane",
        "Press one key, or tap, when a marker lands",
        "Hits and misses change a score",
        "The loop lasts about 20 seconds",
        "Then a result",
        "No song importer",
        "Play the 20 seconds and note the one thing that still feels wrong",
        "Leave the chart editor, the online rank, and the music library out"
      ]
    },
    stealth: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One room and one guard with a visible vision cone",
        "Move when the cone looks away",
        "One button that hides the player",
        "A goal object or a door",
        "Being seen fails, and restart is immediate",
        "Leave combat and the gadget wheel out"
      ],
      beats: [
        "One room",
        "One guard",
        "A vision cone the player can see",
        "Move when the cone looks away",
        "One button hides the player",
        "Reach an object or a door without being seen",
        "Being seen fails the attempt and restart is immediate",
        "Try the room once and note the one thing that still feels wrong",
        "Leave combat, disguises, and the gadget wheel out"
      ]
    },
    survival: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One resource node and three inventory slots",
        "Turn that resource into one result",
        "A hunger or cold meter that drops",
        "Win if the meter holds, lose if it empties",
        "Keep it to one screen",
        "Leave the tech tree and the base grid out"
      ],
      beats: [
        "One screen and one resource node",
        "An inventory of three slots",
        "Turn the resource into one result, such as a fire or a meal",
        "Hunger or cold drops over time, on screen",
        "Fill the goal before the meter empties",
        "A win if the meter holds",
        "A loss if it empties",
        "Play one attempt and note the one thing that still feels wrong",
        "Leave the tech tree, the biomes, and the base-building grid out"
      ]
    },
    tycoon: {
      prompts: [
        "Scaffold the one-screen prototype",
        "A counter and one kind of customer",
        "One action that completes an order and pays coins",
        "Coins buy the only upgrade",
        "A day ends on a timer",
        "Three days, then a total",
        "Leave staff AI and the supply chain out"
      ],
      beats: [
        "A counter",
        "One kind of customer",
        "One action completes an order and pays coins",
        "Coins buy the only upgrade",
        "That upgrade changes a number you can see",
        "A day ends on a timer",
        "Three short days, then a total",
        "Play the three days and note the one thing that still feels wrong",
        "Leave staff AI, decoration mode, and the supply chain out"
      ]
    },
    mystery: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One room and three clickable clues",
        "A short notebook list",
        "One question with two answers",
        "A two-option accusation",
        "The game says if the accusation is right",
        "Leave the second case and the text parser out"
      ],
      beats: [
        "One room",
        "Three clues the player can click",
        "Each clue is written into a short list",
        "One question with two answers",
        "Pick a solution from two options",
        "The game says if it is right",
        "No text parser and no second case",
        "Play the case and note the one thing that still feels wrong",
        "Leave the city of cases, the evidence-board tool, and voice acting out"
      ]
    },
    fighter: {
      prompts: [
        "Scaffold the one-screen prototype",
        "Two figures on a flat stage",
        "One attack and a block",
        "A health bar, and the round ends when one bar is empty",
        "A simple pattern for the opponent",
        "Best of three, then restart",
        "Leave the roster and the move list out"
      ],
      beats: [
        "A flat stage",
        "Two figures, and the player controls one",
        "One attack button and a block",
        "No combo list",
        "A health bar, and the round ends when one bar is empty",
        "The opponent uses a simple pattern",
        "Best of three on the same stage, then a restart",
        "Play one match and note the one thing that still feels wrong",
        "Leave the roster, supers, and the move-list screen out"
      ]
    },
    idle: {
      prompts: [
        "Scaffold the one-screen prototype",
        "One button that produces the only resource",
        "One helper that produces it slowly",
        "The number ticks while the page is open",
        "Hit a target to win, and a reset starts over",
        "Leave prestige, ads, and a second currency out"
      ],
      beats: [
        "One button produces the only resource",
        "The number is on screen",
        "That resource hires the only helper",
        "The helper produces it slowly",
        "The number ticks while the page is open",
        "There is no second screen",
        "Hit a target number to win, and a reset starts over",
        "Play to the target and note the one thing that still feels wrong",
        "Leave prestige, ads, and a second currency out"
      ]
    },
    sports: {
      prompts: [
        "Scaffold the one-screen prototype",
        "Two sides on a simple field",
        "One scoring verb",
        "An opponent that moves simply",
        "First to 3",
        "The same field resets",
        "Leave the league and the career mode out"
      ],
      beats: [
        "A simple field",
        "Two sides, and the player controls one figure",
        "One verb, such as kick, throw, or swing",
        "Aim with keys or the pointer",
        "The attempt scores or misses",
        "First to 3 wins",
        "The same field resets, and there is no season",
        "Play to 3 and note the one thing that still feels wrong",
        "Leave the league, the transfers, and the career mode out"
      ]
    },
    generic: {
      prompts: [
        "Scaffold the one-screen prototype",
        "Put the player's sentence on screen as the win condition",
        "One repeated action",
        "A timer or a mistake counter",
        "A win, a loss, and a restart on the same screen",
        "Leave the second mode and the story out"
      ],
      beats: [
        "Put the player's sentence on screen as the win condition",
        "The player repeats one action: move, choose, or time a press",
        "A timer or a mistake counter makes that action matter",
        "A win lives on the same screen",
        "A loss lives on the same screen",
        "A restart",
        "Colored shapes or text, and no art production",
        "Play one round and note the one thing that still feels wrong",
        "Leave the second mode, the level editor, and the story out"
      ]
    }
  };

  function packFor(level, genre, title) {
    var template = PACK_TEMPLATES[genre.id] || PACK_TEMPLATES.generic;
    var prompts = [];
    var steps = [];
    var i;
    for (i = 0; i < template.prompts.length; i++) {
      prompts.push({ title: template.prompts[i], free: i === 0 });
    }
    steps.push({
      title: "Sketch the loop, the weekend scope, the stack, and the first prompt",
      included: true
    });
    steps.push({
      title: level === "beginner"
        ? "Open Cursor, create one empty HTML file, and learn the words the first prompt uses"
        : "Create the Phaser 3, Vite, and TypeScript project and boot one scene",
      included: false
    });
    for (i = 0; i < template.beats.length; i++) {
      steps.push({ title: template.beats[i], included: false });
    }
    steps.push({
      title: level === "beginner"
        ? "Use the closing check: you can open the file, play the slice, and say what each part does"
        : "Run the project, play the slice, and confirm there are no type errors",
      included: false
    });
    return {
      stepCount: steps.length,
      steps: steps,
      prompts: prompts,
      gdd: [
        { label: "Title", value: title, locked: false },
        { label: "The player", value: "", locked: true },
        { label: "The core action", value: "", locked: true },
        { label: "How a round starts and ends", value: "", locked: true },
        { label: "What the prototype leaves out", value: "", locked: true }
      ],
      voice: level === "beginner"
        ? "Beginner voice: each step says what to click, what the words mean, and how to tell that it worked."
        : "Vibe coder voice: a shorter plan. Decisions and scope first, then the prompts, with no tour of the editor."
    };
  }

  (function checkPacks() {
    var i;
    var seen = {};
    for (i = 0; i < GENRES.length; i++) {
      var id = GENRES[i].id;
      var template = PACK_TEMPLATES[id];
      if (!template) throw new Error("Missing Plan Pack outline for " + id);
      if (template.prompts.length < 6 || template.prompts.length > 8) {
        throw new Error("Prompt titles for " + id + " must be 6 to 8");
      }
      if (template.beats.length !== 9) throw new Error("Build beats for " + id + " must be 9");
      seen[id] = true;
    }
  })();

  function generate(idea, level) {
    var raw = String(idea || "").replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim();
    if (raw.length > 180) raw = raw.slice(0, 180).trim();
    if (!raw) return { ok: false, field: "idea", error: "Describe the game. One line is enough." };
    if (raw.length < 3) return { ok: false, field: "idea", error: "Add a little more. One sentence is enough." };
    if (level !== "beginner" && level !== "vibe") {
      return { ok: false, field: "level", error: "Choose Beginner or Vibe coder." };
    }
    var found = analyze(raw.toLowerCase());
    var genre = found.primary.item;
    var secondary = found.secondary;
    var toneNotes = [];
    var i;
    for (i = 0; i < found.tones.length; i++) toneNotes.push(found.tones[i].note);
    var blend = null;
    if (secondary) {
      blend = "Your line also reads as " + secondary.item.label + " (from \"" + secondary.word + "\"). Keep one piece of that: " + secondary.item.gesture + ". Leave the rest out of this prototype.";
    }
    var stack = stackFor(level, genre);
    var title = workingTitle(raw);
    var matchedWord = found.primary.word || "";
    var prompt = buildPrompt(level, title, raw, genre, stack, genre.loop, genre.weekend, genre.cut, blend, toneNotes, matchedWord);
    return {
      ok: true,
      title: title,
      idea: raw,
      level: level,
      levelLabel: level === "beginner" ? "Beginner" : "Vibe coder",
      genreId: genre.id,
      genreLabel: genre.label,
      matchedWord: matchedWord,
      secondaryId: secondary ? secondary.id : null,
      secondaryLabel: secondary ? secondary.item.label : null,
      secondaryWord: secondary ? secondary.word : null,
      blend: blend,
      toneNotes: toneNotes,
      loop: genre.loop,
      weekend: genre.weekend,
      cut: genre.cut,
      stack: { name: stack.name, details: stack.details },
      prompt: prompt,
      pack: packFor(level, genre, title)
    };
  }

  return { generate: generate };
});
