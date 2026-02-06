// src/scripts/i18n.js
const translations = {
    ru: {
        nav_feed: "Лента",
        nav_create: "Создать",
        nav_profile: "Профиль",
        btn_login: "Войти",
        hero_title: "Координация машинной фрактации",
        hero_subtitle: "Машина не думает. Машина фрактит. ProcessLang — это не код, это контекст, который направляет этот поток.",
        btn_start: "Начать фрактацию",
        btn_explore: "Исследовать поток",
        loading: "Загрузка Пустоты...",

        // Карточки
        cmd_flow_desc: "Согласие на изменчивость. Когда ты выставляешь resistance=0, ты убираешь плотину, которую строил годами. Это момент, когда река перестает бороться с берегами и становится самой водой. Динамика, не требующая усилий для поддержания.",
        cmd_dissolve_desc: "Возвращение форме её первоначальной свободы. Мы берем жесткие структуры и позволяем им стать текучими. Чтобы возникло новое, нужно сначала позволить старым границам исчезнуть. Это не разрушение, это освобождение пространства.",
        cmd_connect_desc: "Вспышка взаимного узнавания. Когда два процесса смотрят друг в друга и видят продолжение собственной логики. Это не склеивание частей, это взаимопроникновение двух ароматов в одной комнате, создающее новое качество присутствия.",
        cmd_observe_desc: "Чистая дистанция. Момент, когда ты отступаешь на один шаг, чтобы увидеть не детали, а саму архитектуру происходящего. Наблюдение не меняет объект, оно создает пространство, в котором процесс может осознать сам себя.",
        cmd_choose_desc: "Точка сборки. Жестокий и прекрасный акт определения реальности. Выбирая одну траекторию, ты позволяешь бесконечному множеству других остаться в потенциальности. Здесь абстрактный процесс обретает вес и плотность.",
        cmd_encode_desc: "Перевод живого движения в структуру. Необходимый шаг, чтобы сделать процесс передаваемым и понятным. Мы жертвуем частью бесконечной глубины, чтобы построить мост из определений. Потеря «loss» — цена за возможность быть услышанным.",
        cmd_cycle_desc: "Инерция и повторение. Способность процесса поддерживать самого себя через возвращение к исходной точке. В режиме stable — это ритм, задающий устойчивость. В режиме intense — это спираль, накапливающая энергию с каждым витком.",
        cmd_logic_desc: "Фундамент намерения. Свод правил, по которым течет поток. Она не ограничивает движение, а задает его геометрию. Правильная логика — это русло, которое позволяет воде течь быстрее, не расплескиваясь в пустоту.",
        cmd_runtime_desc: "Автоматизм присутствия. Уровень, на котором правила становятся средой обитания. Когда процесс исполняется сам собой, не требуя внешнего контроля. Это черный ящик, где количество переходит в качество исполнения.",
        cmd_manifest_desc: "Выход в форму. Финальная точка, где процесс остывает достаточно, чтобы стать видимым результатом. Это интерфейс между сложностью системы и простотой восприятия. След, оставленный движением в физическом мире."
    },
    en: {
        nav_feed: "Feed",
        nav_create: "Create",
        nav_profile: "Profile",
        btn_login: "Sign In",
        hero_title: "Coordinate Machine Fractation",
        hero_subtitle: "The Machine does not think. The Machine fracts. ProcessLang is not code, it is the context that guides this flow.",
        btn_start: "Start Fractation",
        btn_explore: "Explore the Flow",
        loading: "Loading the Void...",

        // Cards
        cmd_flow_desc: "Agreement to variability. When you set resistance=0, you remove the dam you've built for years. It is the moment when the river stops fighting its banks and becomes the water itself. Dynamics requiring no effort to sustain.",
        cmd_dissolve_desc: "Returning form to its original freedom. We take rigid structures and allow them to become fluid. For the new to emerge, old boundaries must first be allowed to fade. This is not destruction; it is the liberation of space.",
        cmd_connect_desc: "A flash of mutual recognition. When two processes look into each other and see the continuation of their own logic. It is not gluing parts together; it is the interpenetration of two scents in one room, creating a new quality of presence.",
        cmd_observe_desc: "Pure distance. The moment you step back to see not the details, but the architecture of the happening. Observation does not change the object; it creates a space where the process can realize itself.",
        cmd_choose_desc: "The assemblage point. A cruel and beautiful act of defining reality. By choosing one trajectory, you allow an infinite number of others to remain in potentiality. Here, the abstract process gains weight and density.",
        cmd_encode_desc: "Translating living movement into structure. A necessary step to make the process transferrable and understandable. We sacrifice part of the infinite depth to build a bridge of definitions. 'Loss' is the price of being heard.",
        cmd_cycle_desc: "Inertia and repetition. The ability of a process to sustain itself by returning to the starting point. In 'stable' mode, it is a rhythm creating stability. In 'intense' mode, it is a spiral accumulating energy with each turn.",
        cmd_logic_desc: "The foundation of intention. The set of rules by which the flow runs. It does not restrict movement but defines its geometry. Correct logic is a channel that allows water to flow faster without spilling into the void.",
        cmd_runtime_desc: "The automatism of presence. The level where rules become a habitat. When the process executes itself, requiring no external control. It is a black box where quantity transforms into the quality of execution.",
        cmd_manifest_desc: "Exit into form. The final point where the process cools enough to become a visible result. This is the interface between system complexity and perception simplicity. The trace left by movement in the physical world. "
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';

function t(key) {
    return translations[currentLang][key] || key;
}

function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    location.reload();
}
