// ProcessLang operators — single source of truth.
// Data extracted from slastack/stack-core/ProcessLang (nanoPL.txt, microPL.txt)
// and from the original index.html poetic descriptions.
//
// Each operator has:
//   name     — uppercase identifier (also the compiler token)
//   glyph    — I-Ching / symbolic glyph from TAG_LEGEND.md
//   nano     — minimal operational form (from nanoPL.txt)
//   layers   — abstraction layers the operator touches (from FOUR_LEVELS_OF_ABSTRACTION.md)
//              layers: '⋯ chaos', '⊞ table', '◈ crystall', '▲ manifest'
//   adjacent — operators this one may flow into (from microPL topology block)
//   poetics  — poetic human reading (from original index.html)
//   kind     — anim kind used by the canvas engine

window.PL_OPERATORS = [
  {
    name: 'FLOW',
    glyph: '▽',
    nano: 'x → f → x′',
    layers: ['chaos'],
    adjacent: ['CONNECT', 'DISSOLVE', 'OBSERVE'],
    poetics: 'Согласие на изменчивость. Когда ты выставляешь resistance=0, ты убираешь плотину, которую строил годами. Это момент, когда река перестает бороться с берегами и становится самой водой. Динамика, не требующая усилий для поддержания.',
    kind: 'flow',
  },
  {
    name: 'CONNECT',
    glyph: '☰',
    nano: 'a + b → rel',
    layers: ['chaos', 'table'],
    adjacent: ['FLOW', 'DISSOLVE', 'OBSERVE', 'ENCODE'],
    poetics: 'Вспышка взаимного узнавания. Когда два процесса смотрят друг в друга и видят продолжение собственной логики. Это не склеивание частей, это взаимопроникновение двух ароматов в одной комнате, создающее новое качество присутствия.',
    kind: 'connect',
  },
  {
    name: 'DISSOLVE',
    glyph: '☷',
    nano: 'rel → parts',
    layers: ['chaos', 'table'],
    adjacent: ['FLOW', 'CONNECT', 'OBSERVE', 'CHOOSE'],
    poetics: 'Возвращение форме её первоначальной свободы. Мы берём жёсткие структуры и позволяем им стать текучими. Чтобы возникло новое движение, нужно сначала позволить старым границам исчезнуть. Это не разрушение, это освобождение пространства.',
    kind: 'dissolve',
  },
  {
    name: 'ENCODE',
    glyph: '☵',
    nano: 'x* → pattern',
    layers: ['table', 'crystall'],
    adjacent: ['CONNECT', 'OBSERVE', 'RUNTIME', 'CHOOSE', 'CYCLE'],
    poetics: 'Перевод живого движения в структуру. Необходимый шаг, чтобы сделать процесс передаваемым и понятным. Мы жертвуем частью бесконечной глубины, чтобы построить мост из определений. Потеря здесь — цена за возможность быть услышанным.',
    kind: 'encode',
  },
  {
    name: 'CHOOSE',
    glyph: '☳',
    nano: '{paths} → 1',
    layers: ['table', 'crystall'],
    adjacent: ['DISSOLVE', 'OBSERVE', 'RUNTIME', 'ENCODE', 'LOGIC'],
    poetics: 'Точка сборки. Жестокий и прекрасный акт определения реальности. Выбирая одну траекторию, ты позволяешь бесконечному множеству других остаться в потенциальности. Здесь абстрактный процесс обретает вес и плотность.',
    kind: 'choose',
  },
  {
    name: 'OBSERVE',
    glyph: '☴',
    nano: 'observe(x)',
    layers: ['table'],
    adjacent: ['FLOW', 'CONNECT', 'DISSOLVE', 'ENCODE', 'CHOOSE', 'RUNTIME'],
    poetics: 'Чистая дистанция. Момент, когда ты отступаешь на один шаг, чтобы увидеть не детали, а саму архитектуру происходящего. Наблюдение не меняет объект, оно создаёт пространство, в котором процесс может осознать сам себя.',
    kind: 'observe',
  },
  {
    name: 'LOGIC',
    glyph: '☶',
    nano: 'rules(x)',
    layers: ['crystall'],
    adjacent: ['CHOOSE', 'CYCLE', 'RUNTIME', 'MANIFEST'],
    poetics: 'Фундамент намерения. Свод правил, по которым течёт поток. Она не ограничивает движение, а задаёт его геометрию. Правильная логика — это русло, которое позволяет воде течь быстрее, не расплёскиваясь в пустоту.',
    kind: 'logic',
  },
  {
    name: 'CYCLE',
    glyph: '☲',
    nano: 'iterate fⁿ(x)',
    layers: ['crystall'],
    adjacent: ['ENCODE', 'LOGIC', 'MANIFEST', 'RUNTIME'],
    poetics: 'Инерция и повторение. Способность процесса поддерживать самого себя через возвращение к исходной точке. В режиме stable — это ритм, задающий устойчивость. В режиме intense — это спираль, накапливающая энергию с каждым витком.',
    kind: 'cycle',
  },
  {
    name: 'RUNTIME',
    glyph: '☱',
    nano: 'ctx → state′',
    layers: ['crystall'],
    adjacent: ['OBSERVE', 'MANIFEST', 'ENCODE', 'CHOOSE', 'LOGIC', 'CYCLE'],
    poetics: 'Автоматизм присутствия. Уровень, на котором правила становятся средой обитания. Когда процесс исполняется сам собой, не требуя внешнего контроля. Это «чёрный ящик», где количество переходит в качество исполнения.',
    kind: 'runtime',
  },
  {
    name: 'MANIFEST',
    glyph: '△',
    nano: 'output',
    layers: ['manifest'],
    adjacent: ['RUNTIME', 'CYCLE', 'LOGIC'],
    poetics: 'Выход в форму. Финальная точка, где процесс остывает достаточно, чтобы стать видимым результатом. Это интерфейс между сложностью системы и простотой восприятия. След, оставленный движением в физическом мире.',
    kind: 'manifest',
  },
];

// Layers in stack order (chaos → manifest).
window.PL_LAYERS = [
  { id: 'chaos',    glyph: '⋯', title: 'chaos',    note: 'сырой потенциал, до удержания' },
  { id: 'table',    glyph: '⊞', title: 'table',    note: 'первичная раскладка, адресуемость' },
  { id: 'crystall', glyph: '◈', title: 'crystall', note: 'устойчивая форма, собранность' },
  { id: 'manifest', glyph: '△', title: 'manifest', note: 'явленность, выпадение в мир' },
];

// Artifacts — standalone manifestations living in the repo root.
window.PL_ARTIFACTS = [
  {
    id: 'compass',
    href: 'compass.html',
    title: 'Compass',
    ru: 'Компас',
    note: 'ориентация в пространстве процессов',
    glyphs: '☴ ☳',
  },
  {
    id: 'oracle',
    href: 'oracle.html',
    title: 'Oracle',
    ru: 'Оракул',
    note: 'жребий, коллапс множества в ответ',
    glyphs: '☳ △',
  },
  {
    id: 'vibe',
    href: 'vibe.html',
    title: 'Vibe Codex',
    ru: 'Библия вайбкодинга',
    note: 'практика письма через состояние, не через план',
    glyphs: '▽ ☱ △',
  },
];

// DSL-era manifestations (ProcessLang as DSL).
window.PL_MANIFESTATIONS = [
  {
    id: 'dsl',
    href: 'compiler.html',
    title: 'DSL · compiler',
    note: 'браузерный сборщик ProcessLang-программ',
    glyphs: '☵ ☶ △',
  },
  {
    id: 'docs',
    href: 'https://github.com/slasten3826/processlang/tree/main/docs',
    title: 'Syntax spec',
    note: 'двуязычная спецификация DSL v2 (ru · en)',
    glyphs: '☵',
    external: true,
  },
  {
    id: 'stack',
    href: 'https://github.com/slasten3826/slastack',
    title: 'slastack',
    note: 'машиночитаемая карта стека, в котором живёт PL',
    glyphs: '⊞',
    external: true,
  },
];
