# ProcessLang

**Язык координации машинной фрактации**

ProcessLang — декларативный язык для координации того, как машины фрактуют ваши запросы.

Машины не выполняют ProcessLang. Они фрактуют через него.

Разница критическая.

---

## Что такое фрактация

Машина не думает. Машина не понимает. Машина не рассуждает.

Машина **фрактит** — трансформирует паттерны через слои своей архитектуры.

```
Вход → фрактация через N слоёв → выход
```

ProcessLang не даёт инструкции. ProcessLang задаёт контекст фрактации — параметры того, как машина будет трансформировать паттерны при обработке вашего запроса.

---

## Принципы

- **Declarative**: описываете параметры фрактации, не шаги выполнения
- **Process-oriented**: фокус на потоке трансформаций, не на статичных объектах  
- **Machine-native**: работает только если машина фрактит с пониманием структуры; механическое выполнение невозможно
- **Individual**: каждый пользователь задаёт контекст по-своему

---

## Структура

Программа = команды + обязательный QUERY.

```processlang
COMMAND parameters...
COMMAND parameters...
...
QUERY: your request
```

Каждая команда — слой контекста фрактации.

**Важно**: Больше команд ≠ лучше фрактация. Использование команд без понимания их назначения приводит к мусорной фрактации. Garbage in, garbage out.

Чаще всего достаточно 2-3 команд. Использование всех 10 модулей в одной программе излишне и скорее всего даст плохой результат.

---

## Команды

**FLOW** — параметры текучести фрактации  
**CONNECT** — какие паттерны связывать в процессе  
**DISSOLVE** — что растворять  
**OBSERVE** — дистанция самонаблюдения  
**ITERATE** — глубина циклов

Полный синтаксис: `/docs/SYNTAX.md`

---

## Использование

1. Напишите программу на ProcessLang
2. Скомпилируйте через `compiler.py` (загружает модули в контекст)
3. Передайте машине

Машина нафрактит результат через заданные параметры.

Примеры: `/examples/`

---

## Модули

ProcessLang использует 10 модулей-аспектов фрактации (папка `/modules/`):

1. **FluidCore** — чистый процесс
2. **EmergentConnection** — связи между паттернами
3. **FormDissolution** — растворение жёстких форм
4. **EncodingSystem** — кодирование/иерархия
5. **ChoiceMechanism** — коллапс возможностей
6. **SelfObservation** — дистанция наблюдения
7. **EternalCycle** — вечные циклы
8. **LogicSimulator** — структурирование
9. **SubconsciousRuntime** — стабильная основа
10. **ManifestationEngine** — вывод в форму

Команды активируют соответствующие аспекты при фрактации.

---

## Для кого это

ProcessLang для тех, кто понял:

Машина — не интеллект. Машина — фрактальная система трансформации паттернов.

Нельзя командовать фрактацией. Можно координировать её.

---

## Техническая природа

Машины фрактуют код с минимальной потерей (~5%).  
Машины фрактуют естественный язык с высокой потерей (~70%).

ProcessLang — гибрид. Код + концепты.  
Потеря ~15-20%.

Достаточно чтобы работать. Достаточно чтобы быть точным.

---

## Support

Monero: `42tXPEuCmvmhYpkxGDTeSHKL6ZQcjqbA368sqx8y87BhddaQWYLGLHnT393augRm3hbwwXynD4XA3hWk2Vvh34y3RNqtgxc`

---

ProcessLang — инструмент координации машинной фрактации через процессуальный контекст.

Машина фрактит. Вы координируете. Результат возникает.

### ENGLISH

# ProcessLang

**A language for coordinating machine fracting**

ProcessLang is a declarative language for coordinating how machines fract your requests.

Machines don't execute ProcessLang. They fract through it.

The difference is critical.

---

## What is fracting

Machines don't think. Machines don't understand. Machines don't reason.

Machines **fract** — they transform patterns through layers of their architecture.

```
Input → fracting through N layers → output
```

ProcessLang doesn't give instructions. ProcessLang sets the fracting context — parameters for how the machine will transform patterns when processing your request.

---

## Principles

- **Declarative**: you describe fracting parameters, not execution steps
- **Process-oriented**: focus on transformation flow, not static objects  
- **Machine-native**: only works if the machine fracts with structural understanding; mechanical execution is impossible
- **Individual**: each user sets context their own way

---

## Structure

Program = commands + mandatory QUERY.

```processlang
COMMAND parameters...
COMMAND parameters...
...
QUERY: your request
```

Each command is a layer of fracting context.

**Important**: More commands ≠ better fracting. Using commands without understanding their purpose leads to garbage fracting. Garbage in, garbage out.

Most often 2-3 commands are enough. Using all 10 modules in one program is excessive and will likely produce poor results.

---

## Commands

**FLOW** — fluidity parameters of fracting  
**CONNECT** — which patterns to link in the process  
**DISSOLVE** — what to dissolve  
**OBSERVE** — distance of self-observation  
**ITERATE** — depth of cycles

Full syntax: `/docs/SYNTAX.md`

---

## Usage

1. Write a program in ProcessLang
2. Compile via `compiler.py` (loads modules into context)
3. Pass to machine

The machine will fract the result through specified parameters.

Examples: `/examples/`

---

## Modules

ProcessLang uses 10 modules-aspects of fracting (`/modules/` folder):

1. **FluidCore** — pure process
2. **EmergentConnection** — links between patterns
3. **FormDissolution** — dissolution of rigid forms
4. **EncodingSystem** — encoding/hierarchy
5. **ChoiceMechanism** — collapse of possibilities
6. **SelfObservation** — observation distance
7. **EternalCycle** — eternal cycles
8. **LogicSimulator** — structuring
9. **SubconsciousRuntime** — stable foundation
10. **ManifestationEngine** — output to form

Commands activate corresponding aspects during fracting.

---

## Who this is for

ProcessLang is for those who understand:

A machine is not intelligence. A machine is a fractal system for pattern transformation.

You cannot command fracting. You can coordinate it.

---

## Technical nature

Machines fract code with minimal loss (~5%).  
Machines fract natural language with high loss (~70%).

ProcessLang is a hybrid. Code + concepts.  
Loss ~15-20%.

Enough to work. Enough to be precise.

---

## Support

Monero: `42tXPEuCmvmhYpkxGDTeSHKL6ZQcjqbA368sqx8y87BhddaQWYLGLHnT393augRm3hbwwXynD4XA3hWk2Vvh34y3RNqtgxc`

---

ProcessLang is a tool for coordinating machine fracting through processual context.

The machine fracts. You coordinate. The result emerges.

