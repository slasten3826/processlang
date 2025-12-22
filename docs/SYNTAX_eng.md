# ProcessLang Syntax Specification

ProcessLang — a declarative DSL for coordinating AI systems through process-oriented concepts.

---

## Table of Contents

1. [Basic Structure](#basic-structure)
2. [Commands](#commands)
3. [Data Types](#data-types)
4. [Comments](#comments)
5. [Limitations and Rules](#limitations-and-rules)
6. [Interpretation Mechanism](#interpretation-mechanism)
7. [Combining Commands](#combining-commands)
8. [Example Programs](#example-programs)
9. [Quick Reference](#quick-reference)

---

## Basic Structure

A ProcessLang program consists of a sequence of commands (maximum 5) and a mandatory query at the end:

```
COMMAND param1=value1 param2=value2
COMMAND param1=value1
...
QUERY: Your question or request
```

**Rules:**
- Commands are executed sequentially
- Each command adds a layer of context
- Query is always last
- Empty lines are ignored
- Order of commands matters

---

## Commands

### FLOW

Initiates the process flow, establishes the basic mode of request processing.

**Conceptual function:**
- Defines the degree of AI thinking fluidity
- High `engagement` = deep immersion in the task
- Low `resistance` = minimal resistance to unconventional solution paths

**Parameters:**

| Parameter | Type | Range | Description |
|----------|-----|----------|----------|
| `engagement` | float | 0.0-1.0 | Level of engagement in the process |
| `resistance` | float | 0.0-1.0 | Level of resistance to flow |

**Typical values:**
- `engagement=0.9 resistance=0.1` — maximum fluidity, creative approach
- `engagement=0.5 resistance=0.5` — balanced mode
- `engagement=0.3 resistance=0.8` — cautious, conservative approach

**Examples:**
```
FLOW engagement=0.95 resistance=0.05
# Maximum openness and fluidity mode

FLOW engagement=0.7 resistance=0.3
# Moderate mode for technical tasks
```

---

### CONNECT

Creates deep connections between concepts, activates cross-domain thinking.

**Conceptual function:**
- Forces AI to seek non-obvious connections between concepts
- The higher the `depth`, the more abstract connections are considered
- Allows synthesizing knowledge from different domains

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `depth` | float (0.0-1.0) | Depth of connection between concepts |
| `between` | list[string] | List of concepts to connect (2-10 elements) |

**Recommendations:**
- 2-3 concepts for focused analysis
- 4-6 concepts for systems thinking
- 7-10 concepts for panoramic overview

**Examples:**
```
CONNECT depth=0.9 between=["quantum_mechanics", "Buddhism", "information_theory"]
# Deep pattern search between three domains

CONNECT depth=0.6 between=["marketing", "psychology"]
# Moderate connection between adjacent areas
```

---

### DISSOLVE

Dissolves rigid conceptual frameworks, deconstructs established thinking patterns.

**Conceptual function:**
- Weakens fixed definitions and categories
- Allows seeing phenomena from unusual angles
- High `rigidity` = more aggressive deconstruction

**Parameters:**

| Parameter | Type | Range | Description |
|----------|-----|----------|----------|
| `rigidity` | float | 0.0-1.0 | Level of rigidity to dissolve |
| `target` | string | - | What exactly to dissolve |

**Typical targets:**
- Conceptual frameworks: `"definitions"`, `"categories"`, `"binaries"`
- System patterns: `"hierarchies"`, `"causality"`, `"linearity"`
- Cultural constructs: `"norms"`, `"values"`, `"traditions"`

**Examples:**
```
DISSOLVE rigidity=0.85 target="good-evil_dichotomy"
# Strong dissolution of binary thinking

DISSOLVE rigidity=0.4 target="academic_style"
# Gentle weakening of formality
```

---

### ENCODE

Applies structuring and organization of information, but with awareness of inevitable loss.

**Conceptual function:**
- Creates output structure
- The `loss` parameter explicitly acknowledges reduction in encoding
- Different encoding types create different perception lenses

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `type` | string | Structure type (see below) |
| `loss` | float (0.0-1.0) | Acceptable information loss |

**Encoding types:**
- `"hierarchy"` — hierarchical structure
- `"sequence"` — sequential structure
- `"network"` — network structure
- `"category"` — categorical structure
- `"narrative"` — narrative structure
- `"spatial"` — spatial organization

**Examples:**
```
ENCODE type="hierarchy" loss=0.2
# Hierarchical structure with low detail loss

ENCODE type="narrative" loss=0.5
# Narrative form, allowing significant simplification
```

---

### CHOOSE

Activates the choice mechanism from multiple possibilities.

**Conceptual function:**
- Collapses the space of possible answers
- Method influences selection criteria
- Useful when you need to make a specific choice from alternatives

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `space` | list[string] | Space of possibilities |
| `method` | string | Choice method (see below) |

**Choice methods:**
- `"conscious"` — conscious choice with justification
- `"unconscious"` — intuitive choice
- `"forced"` — choice when refusing is impossible
- `"random"` — random choice

**Examples:**
```
CHOOSE space=["framework_A", "framework_B", "framework_C"] method="conscious"
# Conscious choice between technologies

CHOOSE space=["continue", "stop"] method="forced"
# Forced choice in a dilemma
```

---

### OBSERVE

Activates self-observation of the AI thinking process.

**Conceptual function:**
- Creates a metacognitive layer
- Low distance = immersion in process
- High distance = detached observation

**Parameters:**

| Parameter | Type | Range | Description |
|----------|-----|----------|----------|
| `distance` | float | 0.0-1.0 | Observation distance |
| `target` | string | - | Object of observation |

**Typical observation objects:**
- `"thinking_process"` — the process of response generation itself
- `"assumptions"` — hidden assumptions
- `"limitations"` — analysis boundaries
- `"patterns"` — recurring structures

**Examples:**
```
OBSERVE distance=0.1 target="response_generation_process"
# Close observation of own thinking

OBSERVE distance=0.8 target="used_metaphors"
# Detached analysis of linguistic patterns
```

---

### CYCLE

Initiates cyclical, recursive thinking.

**Conceptual function:**
- Allows repeatedly revisiting the question
- Different modes set the cycle character
- Intensity determines the number of iterations

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `mode` | string | Cycle mode (see below) |
| `intensity` | float (0.0-1.0) | Cycling intensity |

**Modes:**
- `"stable"` — stable cycle with fixed parameters
- `"intense"` — amplifying cycle
- `"degrading"` — decaying cycle

**Examples:**
```
CYCLE mode="stable" intensity=0.9
# High-intensity stable cycling

CYCLE mode="intense" intensity=0.7
# Amplifying cycle of moderate intensity
```

---

### LOGIC

Applies logical rules and reasoning patterns.

**Conceptual function:**
- Activates specific logical structures
- Defines the boundaries of rule applicability

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `rule` | string | Rule to apply |
| `mode` | string | `"eternal"` or `"limited"` |

**Typical rules:**
- `"consistency"` — avoid contradictions
- `"transitivity"` — implication chains
- `"complementarity"` — quantum logic
- `"dialectics"` — synthesis of opposites

**Examples:**
```
LOGIC rule="complementarity" mode="eternal"
# Quantum logic applied throughout

LOGIC rule="formal_inference" mode="limited"
# Strict logic only where necessary
```

---

### RUNTIME

Amplifies background processing patterns.

**Conceptual function:**
- Strengthens certain cognitive habits
- Repetitions create AI "muscle memory"

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `pattern` | string | Pattern to amplify |
| `repetitions` | int | Number of repetitions (1-100) |

**Typical patterns:**
- `"contradiction_checking"`
- `"example_search"`
- `"alternative_interpretations"`
- `"simplification"`

**Examples:**
```
RUNTIME pattern="source_verification" repetitions=30
# Strong amplification of critical thinking

RUNTIME pattern="metaphorical_thinking" repetitions=10
# Moderate amplification of figurative thinking
```

---

### MANIFEST

Defines the form of final output.

**Conceptual function:**
- Controls response detail level
- Acknowledges inevitable reduction in materialization

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `format` | string | Output format |
| `loss` | float (0.0-1.0) | Acceptable information loss |

**Formats:**
- `"detailed"` — detailed comprehensive answer
- `"minimal"` — brief compressed answer
- `"structured"` — clearly structured
- `"flowing"` — free narrative
- `"technical"` — technical style
- `"conversational"` — conversational style

**Examples:**
```
MANIFEST format="detailed" loss=0.1
# Maximum detail

MANIFEST format="minimal" loss=0.7
# Brevity with high compression
```

---

## Data Types

### Float (0.0-1.0)

Used for parameters representing levels, intensities, probabilities:

```
engagement=0.9
depth=0.75
loss=0.3
```

**Conventions:**
- 0.0-0.3: low level
- 0.4-0.6: medium level
- 0.7-1.0: high level

### String

Text values in double quotes:

```
target="fixed_categories"
format="detailed"
```

**Conventions:**
- Use snake_case for multi-word identifiers
- Both Cyrillic and Latin scripts are valid
- Spaces are allowed: `"fixed categories"`

### List

Arrays of strings in square brackets:

```
between=["concept_1", "concept_2", "concept_3"]
space=["option_A", "option_B"]
```

**Limitations:**
- Minimum 2 elements
- Recommended no more than 10 elements to maintain focus

### Integer

Whole numbers for counters:

```
repetitions=20
iterations=5
```

---

## Comments

Single-line comments start with `#`:

```
FLOW engagement=0.9 resistance=0.1  # High fluidity
# This is a full comment line
CONNECT depth=0.8 between=["a", "b"]
```

Comments are ignored during interpretation.

---

## Limitations and Rules

### Structural Limitations

1. **Maximum 5 commands** — intentional limitation for focus
2. **One QUERY** — mandatory, always last
3. **Order matters** — commands are processed sequentially

### Naming Rules

- Parameter names: `lowercase_snake_case`
- String values: any style, but consistency is desirable
- Commands: `UPPERCASE`

### Command Combinations

Some commands naturally complement each other:

**Good combinations:**
- `DISSOLVE` + `CONNECT` — dissolve the old, create new connections
- `FLOW` + `OBSERVE` — fluidity + awareness
- `CONNECT` + `CYCLE` — connection + iterative deepening
- `ENCODE` + `MANIFEST` — structuring + materialization

**Avoid contradictions:**
- `FLOW engagement=0.9` + `DISSOLVE rigidity=0.1` — weak deconstruction with high fluidity
- `MANIFEST loss=0.1` + `ENCODE loss=0.9` — contradictory detail requirements

---

## Interpretation Mechanism

ProcessLang is not executed in the traditional sense. The interpretation process:

### 1. Parsing
AI reads the program and recognizes commands with parameters.

### 2. Context Building
Each command adds a layer to the conceptual context:

```
FLOW engagement=0.9 resistance=0.1
↓
[Context: high fluidity, low resistance]

CONNECT depth=0.8 between=["A", "B", "C"]
↓
[Context: high fluidity + deep A-B-C connections]

DISSOLVE rigidity=0.7 target="stereotypes"
↓
[Context: fluidity + A-B-C connections + weakened stereotypes]
```

### 3. QUERY Interpretation
AI processes the request through the lens of built context.

### 4. Response Generation
The response is informed by all context layers simultaneously.

**Important:** Interpretation is not deterministic. The same code may produce different (but contextually consistent) results.

---

## Combining Commands

### Pattern: Deconstruction-Reconstruction

```
DISSOLVE rigidity=0.8 target="traditional_definitions"
CONNECT depth=0.9 between=["new_concept_1", "new_concept_2"]
ENCODE type="network" loss=0.3
```

First dissolve the old, then create new connections, then structure the result.

### Pattern: Deep Analysis

```
FLOW engagement=0.95 resistance=0.05
OBSERVE distance=0.3 target="assumptions"
CYCLE mode="intense" intensity=0.8
```

Maximum fluidity + self-observation + iterative deepening.

### Pattern: Critical Synthesis

```
CONNECT depth=0.7 between=["source_1", "source_2", "source_3"]
LOGIC rule="consistency" mode="eternal"
MANIFEST format="structured" loss=0.2
```

Connect sources, apply logic, structure output.

### Pattern: Creative Exploration

```
FLOW engagement=0.9 resistance=0.1
DISSOLVE rigidity=0.8 target="genre_boundaries"
CHOOSE space=["approach_1", "approach_2", "approach_3"] method="unconscious"
```

High fluidity + boundary dissolution + intuitive choice.

---

## Example Programs

### Example 1: Philosophical Analysis

```
FLOW engagement=0.9 resistance=0.1
CONNECT depth=0.85 between=["phenomenology", "quantum_physics", "Buddhism"]
DISSOLVE rigidity=0.7 target="subject-object_dichotomy"
MANIFEST format="detailed" loss=0.2
QUERY: How do the three traditions understand the nature of observation and reality?
```

### Example 2: Technical Solution

```
FLOW engagement=0.7 resistance=0.3
CONNECT depth=0.6 between=["microservices", "event-driven", "CQRS"]
ENCODE type="hierarchy" loss=0.3
MANIFEST format="technical" loss=0.1
QUERY: Design an architecture for a distributed order processing system.
```

### Example 3: Creative Task

```
DISSOLVE rigidity=0.9 target="genre_conventions"
CONNECT depth=0.8 between=["noir", "cyberpunk", "absurdism"]
CHOOSE space=["dark_tone", "ironic_tone", "melancholic_tone"] method="unconscious"
MANIFEST format="flowing" loss=0.4
QUERY: Write an opening paragraph for a novel in this synthesis.
```

### Example 4: Data Analysis

```
FLOW engagement=0.8 resistance=0.2
OBSERVE distance=0.6 target="data_patterns"
CYCLE mode="stable" intensity=0.7
ENCODE type="category" loss=0.3
MANIFEST format="structured" loss=0.2
QUERY: Analyze the sales dataset and identify key trends.
```

### Example 5: Metacognitive Query

```
OBSERVE distance=0.1 target="response_process_itself"
RUNTIME pattern="assumption_tracking" repetitions=20
CYCLE mode="intense" intensity=0.8
MANIFEST format="detailed" loss=0.1
QUERY: How do you approach answering this request? Describe your process.
```

---

## Quick Reference

### Commands (One Line)

| Command | Function | Key Parameters |
|---------|---------|-------------------|
| `FLOW` | Flow initialization | `engagement`, `resistance` |
| `CONNECT` | Connect concepts | `depth`, `between` |
| `DISSOLVE` | Dissolve structures | `rigidity`, `target` |
| `ENCODE` | Structuring | `type`, `loss` |
| `CHOOSE` | Choose from alternatives | `space`, `method` |
| `OBSERVE` | Self-observation | `distance`, `target` |
| `CYCLE` | Cyclical thinking | `mode`, `intensity` |
| `LOGIC` | Logical rules | `rule`, `mode` |
| `RUNTIME` | Amplify patterns | `pattern`, `repetitions` |
| `MANIFEST` | Output form | `format`, `loss` |

### Typical Parameter Values

| Parameter | Low | Medium | High |
|----------|--------|---------|---------|
| `engagement` | 0.3 | 0.5-0.6 | 0.9 |
| `resistance` | 0.1 | 0.4-0.5 | 0.8 |
| `depth` | 0.3 | 0.6 | 0.9 |
| `rigidity` | 0.2 | 0.5 | 0.9 |
| `loss` | 0.1 | 0.3-0.5 | 0.8 |
| `distance` | 0.1 | 0.5 | 0.9 |
| `intensity` | 0.3 | 0.6 | 0.95 |

### Program Template

```
# Context initialization
FLOW engagement=X resistance=Y

# Form connections or deconstruction (optional)
CONNECT depth=X between=[...]
# or
DISSOLVE rigidity=X target="..."

# Additional modifiers (optional)
OBSERVE distance=X target="..."
CYCLE mode="..." intensity=X

# Finalization (optional)
MANIFEST format="..." loss=X

# Mandatory query
QUERY: Your question here
```

---

## Advanced Topics

### Program Composition

ProcessLang programs can be composed:

**Basic program:**
```
FLOW engagement=0.8 resistance=0.2
QUERY: Explain concept X
```

**Extended program:**
```
FLOW engagement=0.8 resistance=0.2
CONNECT depth=0.7 between=["X", "Y", "Z"]
DISSOLVE rigidity=0.6 target="technical_jargon"
MANIFEST format="conversational" loss=0.3
QUERY: Explain concept X and its relation to Y and Z in simple language
```

### Iterative Development

1. Start with simple `FLOW` + `QUERY`
2. Add `CONNECT` for cross-domain connections
3. Add `DISSOLVE` if deconstruction is needed
4. Add `OBSERVE` for metacognitive layer
5. Finalize with `MANIFEST`

You don't have to use all 5 commands — use as many as the task requires.

---

**Specification version:** 1.0  
**Last updated:** 2025-12-11

For usage examples, see `/examples` directory.  
For conceptual foundations, see `/modules`.