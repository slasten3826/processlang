// Color systems for ProcessLang.
// Three themes, selectable via Tweaks. Each returns, for a given operator,
// an 'rgba(r,g,b,1)' string used both as CSS accent and as canvas stroke/fill.
//
// Themes:
//   layers          — cvet = layer of abstraction (chaos/table/crystall/manifest)
//                     operators inside the same layer vary by hue, L/C fixed.
//   harmonised-10   — 10 distinct hues on the same oklch(L,C) so none dominate.
//   mono            — bone-white on black, no per-operator color; active operator
//                     lights up in a single accent.

(function () {
  // Helper: convert oklch() to rgba via a canvas 2d context.
  // Setting fillStyle to any CSS color string and reading it back returns a
  // normalised rgb()/#hex form — this works with oklch() even in browsers that
  // don't expose converted values via getComputedStyle.
  const _canvas = document.createElement('canvas');
  const _ctx = _canvas.getContext('2d');
  const oklchToRgba = (L, C, H) => {
    try {
      _ctx.fillStyle = '#000';
      _ctx.fillStyle = `oklch(${L} ${C} ${H})`;
      const v = _ctx.fillStyle; // e.g. "#aabbcc" or "rgb(r, g, b)"
      if (v.startsWith('#')) {
        const hex = v.slice(1);
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r},${g},${b},1)`;
      }
      const m = v.match(/\d+/g);
      if (m && m.length >= 3) return `rgba(${m[0]},${m[1]},${m[2]},1)`;
    } catch (_) {}
    // fallback — warm bone
    return 'rgba(220,220,200,1)';
  };

  const OPS = ['FLOW','CONNECT','DISSOLVE','ENCODE','CHOOSE','OBSERVE','LOGIC','CYCLE','RUNTIME','MANIFEST'];

  // --- theme: layers ---
  // Each operator's primary layer defines its hue band.
  // Deepest layer (chaos) if operator spans multiple.
  const primaryLayer = {
    FLOW: 'chaos', CONNECT: 'chaos', DISSOLVE: 'chaos',
    ENCODE: 'table', OBSERVE: 'table', CHOOSE: 'table',
    LOGIC: 'crystall', CYCLE: 'crystall', RUNTIME: 'crystall',
    MANIFEST: 'manifest',
  };
  const layerHue = { chaos: 280, table: 200, crystall: 40, manifest: 70 }; // violet / cyan / amber / ivory
  const layerHueJitter = {
    FLOW: -12, CONNECT: 0, DISSOLVE: 12,
    ENCODE: -10, OBSERVE: 0, CHOOSE: 10,
    LOGIC: -14, CYCLE: 0, RUNTIME: 14,
    MANIFEST: 0,
  };
  const themeLayers = {};
  OPS.forEach(op => {
    const L = op === 'MANIFEST' ? 0.95 : 0.78;
    const C = op === 'MANIFEST' ? 0.02 : 0.14;
    const H = layerHue[primaryLayer[op]] + (layerHueJitter[op] || 0);
    themeLayers[op] = oklchToRgba(L, C, H);
  });

  // --- theme: harmonised-10 ---
  // 10 hues evenly spaced around the wheel, same L/C.
  const themeHarmonised = {};
  OPS.forEach((op, i) => {
    const H = (i * 36 + 200) % 360;
    themeHarmonised[op] = oklchToRgba(0.78, 0.15, H);
  });

  // --- theme: mono ---
  // All operators share the same bone-white; the active operator uses accent.
  const bone = oklchToRgba(0.92, 0.01, 90);
  const accent = oklchToRgba(0.82, 0.14, 70);
  const themeMono = {};
  OPS.forEach(op => { themeMono[op] = bone; });
  // active swap happens at render time via getOperatorColor()

  const themes = {
    layers: {
      colors: themeLayers,
      bg: '#07080a',
      fg: oklchToRgba(0.92, 0.008, 240),
      dim: oklchToRgba(0.55, 0.01, 240),
      rule: 'rgba(140,160,180,0.14)',
      accent: oklchToRgba(0.85, 0.14, 70),
    },
    harmonised: {
      colors: themeHarmonised,
      bg: '#07080a',
      fg: oklchToRgba(0.92, 0.008, 240),
      dim: oklchToRgba(0.55, 0.01, 240),
      rule: 'rgba(140,160,180,0.14)',
      accent: oklchToRgba(0.85, 0.14, 70),
    },
    mono: {
      colors: themeMono,
      bg: '#050507',
      fg: bone,
      dim: 'rgba(200,200,200,0.42)',
      rule: 'rgba(220,220,220,0.10)',
      accent,
    },
  };

  let current = 'layers';
  let activeOp = null;

  function applyTheme(id) {
    current = id in themes ? id : 'layers';
    const t = themes[current];
    document.documentElement.style.setProperty('--bg', t.bg);
    document.documentElement.style.setProperty('--fg', t.fg);
    document.documentElement.style.setProperty('--dim', t.dim);
    document.documentElement.style.setProperty('--rule', t.rule);
    document.documentElement.style.setProperty('--accent', t.accent);
    // expose per-operator color as CSS vars
    Object.entries(t.colors).forEach(([op, rgba]) => {
      document.documentElement.style.setProperty(`--c-${op.toLowerCase()}`, rgba);
    });
    document.documentElement.dataset.theme = current;
  }

  function getOperatorColor(opName) {
    const t = themes[current];
    if (current === 'mono' && activeOp === opName) return t.accent;
    return t.colors[opName] || t.fg;
  }

  window.PLTheme = {
    apply: applyTheme,
    color: getOperatorColor,
    setActive(op) { activeOp = op; },
    current: () => current,
    list: () => Object.keys(themes),
  };

  _canvas.remove && _canvas.remove();
})();
