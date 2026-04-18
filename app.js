// ProcessLang site — glue code.
// Renders constellation + operator cards + layer cells + artifact & manifestation
// lists, wires the oracle terminal, and handles theme + tweak messages.

(function () {
  const ops = window.PL_OPERATORS;
  const layers = window.PL_LAYERS;
  const opByName = Object.fromEntries(ops.map(o => [o.name, o]));
  const effects = [];

  // ——— theme ———
  const PL = window.PLTheme;
  function setTheme(id) {
    PL.apply(id);
    // push per-card color vars
    document.querySelectorAll('[data-op]').forEach(el => {
      const op = el.dataset.op;
      el.style.setProperty('--op-color', PL.color(op));
    });
    // update tweak inputs
    const r = document.querySelector(`input[name="pl-theme"][value="${id}"]`);
    if (r) r.checked = true;
  }

  // ——— rendering ———
  function renderConstellation() {
    const grid = document.getElementById('constellation');
    grid.innerHTML = ops.map(op => `
      <div class="glyph-cell" data-op="${op.name}" style="--op-color:${PL.color(op.name)}">
        <span class="glyph">${op.glyph}</span>
        <span class="op-name">${op.name}</span>
      </div>
    `).join('');
    grid.querySelectorAll('.glyph-cell').forEach(cell => {
      cell.addEventListener('click', () => openInspector(cell.dataset.op));
      cell.addEventListener('mouseenter', () => setActiveGlyph(cell.dataset.op));
      cell.addEventListener('mouseleave', () => setActiveGlyph(null));
    });
  }

  function setActiveGlyph(name) {
    document.querySelectorAll('#constellation .glyph-cell').forEach(c => {
      c.classList.toggle('is-active', c.dataset.op === name);
    });
    if (PL.current() === 'mono') {
      PL.setActive(name);
      // re-push colors so mono theme swaps accent on hover
      document.querySelectorAll('[data-op]').forEach(el => {
        el.style.setProperty('--op-color', PL.color(el.dataset.op));
      });
    }
  }

  function renderLayers() {
    const grid = document.getElementById('layers-grid');
    grid.innerHTML = layers.map(l => {
      const opsInLayer = ops.filter(o => o.layers.includes(l.id));
      return `
        <div class="layer-cell" data-layer="${l.id}">
          <div class="glyph">${l.glyph}</div>
          <div class="layer-id">${l.glyph} ${l.id}</div>
          <h3>${l.title}</h3>
          <p>${l.note}</p>
          <div class="layer-ops">${opsInLayer.map(o => `<span title="${o.name}">${o.glyph}</span>`).join('')}</div>
        </div>
      `;
    }).join('');
  }

  function renderOperators() {
    const grid = document.getElementById('operators-grid');
    grid.innerHTML = ops.map(op => `
      <div class="op-card" data-op="${op.name}" style="--op-color:${PL.color(op.name)}">
        <canvas class="op-canvas"></canvas>
        <div class="op-card-head">
          <div class="op-card-name">${op.name}</div>
          <div class="op-card-glyph">${op.glyph}</div>
        </div>
        <div class="op-card-nano">${op.nano}</div>
        <div class="op-card-desc">${op.poetics}</div>
        <div class="op-card-layers">
          ${op.layers.map(l => {
            const layer = layers.find(x => x.id === l);
            return `<span class="glyph-layer" title="${layer.title}">${layer.glyph}</span>${layer.id}`;
          }).join(' · ')}
        </div>
      </div>
    `).join('');

    // wire canvas effects
    grid.querySelectorAll('.op-card').forEach(card => {
      const name = card.dataset.op;
      const op = opByName[name];
      const canvas = card.querySelector('.op-canvas');
      const eff = new window.OperatorEffect(canvas, op.kind, () => PL.color(name));
      effects.push({ canvas, eff });
      card.addEventListener('click', () => openInspector(name));
    });
  }

  function renderArtifacts() {
    const grid = document.getElementById('artifacts-grid');
    grid.innerHTML = window.PL_ARTIFACTS.map(a => `
      <a class="art-card" href="${a.href}">
        <div class="art-glyphs">${a.glyphs}</div>
        <h3>${a.title}</h3>
        <div class="ru">${a.ru}</div>
        <p>${a.note}</p>
        <div class="arrow">→</div>
      </a>
    `).join('');
  }

  function renderManifestations() {
    const grid = document.getElementById('manifestations-grid');
    grid.innerHTML = window.PL_MANIFESTATIONS.map(m => `
      <a class="art-card" href="${m.href}" ${m.external ? 'target="_blank" rel="noopener"' : ''}>
        <div class="art-glyphs">${m.glyphs}</div>
        <h3>${m.title}</h3>
        <p>${m.note}</p>
        <div class="arrow">${m.external ? '↗' : '→'}</div>
      </a>
    `).join('');
  }

  // ——— inspector ———
  const inspector = document.getElementById('inspector');
  const inspectorBody = document.getElementById('inspector-body');

  function openInspector(name) {
    const op = opByName[name];
    if (!op) return;
    const color = PL.color(name);
    inspectorBody.style.setProperty('--op-color', color);
    inspectorBody.innerHTML = `
      <div class="inspector-head" style="--op-color:${color}">
        <div class="inspector-glyph">${op.glyph}</div>
        <div class="inspector-name">${op.name}</div>
        <div class="inspector-nano">${op.nano}</div>
      </div>
      <p class="inspector-poetic">${op.poetics}</p>
      <div class="inspector-meta">
        <div class="meta-block">
          <h4>слои</h4>
          ${op.layers.map(l => {
            const layer = layers.find(x => x.id === l);
            return `<span class="chip">${layer.glyph} ${layer.id}</span>`;
          }).join('')}
        </div>
        <div class="meta-block">
          <h4>смежные переходы</h4>
          ${op.adjacent.map(a => {
            const adj = opByName[a];
            return `<span class="chip" data-jump="${a}" style="--op-color:${PL.color(a)}">${adj.glyph} ${a}</span>`;
          }).join('')}
        </div>
        <div class="meta-block">
          <h4>nano-форма</h4>
          <div style="font-family:var(--mono);font-size:1rem;color:var(--fg);">${op.nano}</div>
        </div>
      </div>
    `;
    inspectorBody.querySelectorAll('[data-jump]').forEach(chip => {
      chip.addEventListener('click', () => openInspector(chip.dataset.jump));
    });
    inspector.classList.add('is-open');
    inspector.setAttribute('aria-hidden', 'false');
  }
  function closeInspector() {
    inspector.classList.remove('is-open');
    inspector.setAttribute('aria-hidden', 'true');
  }
  document.getElementById('inspector-close').addEventListener('click', closeInspector);
  inspector.addEventListener('click', (e) => {
    if (e.target === inspector) closeInspector();
  });

  // ——— oracle terminal ———
  const form = document.getElementById('oracle-form');
  const input = document.getElementById('oracle-input');
  const log = document.getElementById('oracle-log');

  function say(html, cls = '') {
    log.innerHTML = `<span class="${cls}">${html}</span>`;
  }

  const COMMANDS = {
    help() {
      say(
        `команды: <em>flow · connect · dissolve · encode · choose · observe · logic · cycle · runtime · manifest</em>\n` +
        `· <em>layer chaos|table|crystall|manifest</em> — подсветить слой\n` +
        `· <em>trace</em> или <em>trace ▽☰☵△</em> — путь по глифам\n` +
        `· <em>artifacts · manifestations · stack · clear · theme layers|harmonised|mono</em>`,
        'ok'
      );
    },
    artifacts() {
      say('открываю артефакты…', 'ok');
      document.getElementById('artifacts').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    manifestations() {
      say('открываю манифестации…', 'ok');
      document.getElementById('manifestations').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    stack() {
      say('переход в slastack…', 'ok');
      setTimeout(() => { window.open('https://github.com/slasten3826/slastack', '_blank'); }, 350);
    },
    clear() { log.innerHTML = ''; },
    layer(arg) {
      const l = layers.find(x => x.id === (arg || '').toLowerCase());
      if (!l) { say(`неизвестный слой: ${arg || '—'}. доступны: chaos, table, crystall, manifest.`, 'warn'); return; }
      const matches = ops.filter(o => o.layers.includes(l.id)).map(o => o.glyph + ' ' + o.name).join(' · ');
      say(`${l.glyph} <span class="ok">${l.id}</span> — ${l.note}\n${matches}`, '');
      highlightLayer(l.id);
    },
    theme(arg) {
      const t = (arg || '').toLowerCase();
      if (['layers','harmonised','mono'].includes(t)) {
        setTheme(t);
        say(`палитра: ${t}`, 'ok');
      } else {
        say('доступно: theme layers | harmonised | mono', 'warn');
      }
    },
    trace(arg) {
      // если аргумент — последовательность глифов, конвертим в имена
      if (arg && /^[\s▽☰☷☵☳☴☶☲☱△]+$/.test(arg)) {
        const names = Array.from(arg.replace(/\s+/g,'')).map(g => ops.find(o => o.glyph === g)).filter(Boolean).map(o => o.name);
        animateTrace(names);
        say(`trace: ${names.join(' → ')}`, 'ok');
      } else {
        const seq = ['FLOW','CONNECT','ENCODE','CHOOSE','LOGIC','RUNTIME','CYCLE','MANIFEST'];
        animateTrace(seq);
        say(`trace: ${seq.join(' → ')}`, 'ok');
      }
    },
  };

  function animateTrace(names) {
    let i = 0;
    const step = () => {
      if (i > 0) setActiveGlyph(null);
      if (i >= names.length) { setActiveGlyph(null); return; }
      setActiveGlyph(names[i]);
      i++;
      setTimeout(step, 500);
    };
    step();
  }

  function highlightLayer(layerId) {
    const names = ops.filter(o => o.layers.includes(layerId)).map(o => o.name);
    let i = 0;
    const step = () => {
      if (i >= names.length) { setActiveGlyph(null); return; }
      setActiveGlyph(names[i]);
      i++;
      setTimeout(step, 320);
    };
    step();
  }

  function runCommand(raw) {
    const parts = raw.trim().toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const arg = parts.slice(1).join(' ');
    if (!cmd) return;
    // operator names open inspector
    const opMatch = ops.find(o => o.name.toLowerCase() === cmd);
    if (opMatch) { openInspector(opMatch.name); say(`${opMatch.glyph} ${opMatch.name} · ${opMatch.nano}`, 'ok'); return; }
    // glyph single-char
    const glyphMatch = ops.find(o => o.glyph === cmd);
    if (glyphMatch) { openInspector(glyphMatch.name); say(`${glyphMatch.glyph} ${glyphMatch.name}`, 'ok'); return; }
    if (COMMANDS[cmd]) { COMMANDS[cmd](arg); return; }
    say(`неизвестная команда: <em>${cmd}</em>. введи <em>help</em>.`, 'warn');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value;
    input.value = '';
    runCommand(v);
  });

  // ——— global keybinds ———
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeInspector();
    if (e.key === '?' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
      input.value = '';
      COMMANDS.help();
    }
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault(); input.focus();
    }
  });

  // layer jump from top strip glyphs
  document.querySelectorAll('[data-layer-jump]').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('layers').scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => highlightLayer(el.dataset.layerJump), 400);
    });
  });

  // ——— tweaks (edit-mode panel) ———
  const tweaksEl = document.getElementById('tweaks');
  document.querySelectorAll('input[name="pl-theme"]').forEach(r => {
    r.addEventListener('change', () => {
      setTheme(r.value);
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: r.value } }, '*');
    });
  });
  const animToggle = document.getElementById('tw-anim');
  animToggle.addEventListener('change', () => {
    document.querySelectorAll('.op-canvas').forEach(c => { c.style.display = animToggle.checked ? '' : 'none'; });
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { animations: animToggle.checked } }, '*');
  });

  // listen BEFORE announcing availability — order matters per tweaks contract
  window.addEventListener('message', (ev) => {
    const d = ev.data;
    if (!d || typeof d !== 'object') return;
    if (d.type === '__activate_edit_mode') tweaksEl.classList.add('is-open');
    if (d.type === '__deactivate_edit_mode') tweaksEl.classList.remove('is-open');
  });
  try {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch (_) {}

  // ——— boot ———
  const initial = (window.PL_TWEAKS && window.PL_TWEAKS.theme) || 'layers';
  PL.apply(initial);
  renderConstellation();
  renderLayers();
  renderOperators();
  renderArtifacts();
  renderManifestations();
  setTheme(initial);
  if (window.PL_TWEAKS && window.PL_TWEAKS.animations === false) {
    animToggle.checked = false;
    document.querySelectorAll('.op-canvas').forEach(c => { c.style.display = 'none'; });
  }

  // greet
  say('введи <em>help</em> — и получишь контур.', 'ok');

  window.addEventListener('resize', () => {
    effects.forEach(({ eff }) => eff.resize());
  });
})();
