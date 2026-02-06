# ProcessLang Syntax Specification

ProcessLang is a declarative language for coordinating machine fracting through processual parameters.

---

## Table of Contents

1. [Basic Structure](#basic-structure)
2. [Commands](#commands)
3. [Data Types](#data-types)
4. [Comments](#comments)
5. [Constraints and Rules](#constraints-and-rules)
6. [Interpretation Mechanism](#interpretation-mechanism)
7. [Combining Commands](#combining-commands)
8. [Example Programs](#example-programs)
9. [Quick Reference](#quick-reference)

---

## Basic Structure

A ProcessLang program consists of a sequence of commands and a mandatory query at the end:

```
COMMAND param1=value1 param2=value2
COMMAND param1=value1
...
QUERY: Your question or request
```

**Rules:**
- Commands set fracting parameters
- Each command adds a layer of context
- Query is always last
- Empty lines are ignored
- Order of commands matters

**Important:** More commands ≠ better fracting. Using commands without understanding leads to garbage fracting. Garbage in, garbage out. Usually 2-3 commands are enough.

---

## Commands

### FLOW

Sets fluidity parameters of fracting.

**Conceptual function:**
- Determines the degree of fluidity in pattern transformation
- High `engagement` = deep fracting
- Low `resistance` = minimal resistance to non-standard transformation paths

**Parameters:**

| Parameter | Type | Range | Description |
|----------|-----|----------|----------|
| `engagement` | float | 0.0-1.0 | Level of engagement in the process |
| `resistance` | float | 0.0-1.0 | Level of resistance to flow |

**Typical values:**
- `engagement=0.9 resistance=0.1` — maximum fluidity, creative fracting
- `engagement=0.5 resistance=0.5` — balanced fracting
- `engagement=0.3 resistance=0.8` — cautious, conservative fracting

**Examples:**
```
FLOW engagement=0.95 resistance=0.05
# Maximum fluidity mode

FLOW engagement=0.7 resistance=0.3
# Moderate fracting for technical tasks
```

---

### CONNECT

Sets which patterns to link during fracting.

**Conceptual function:**
- Machine fracts connections between specified concepts
- Higher `depth` means more abstract patterns are linked
- Synthesizes patterns from different domains

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `depth` | float (0.0-1.0) | Depth of connection between patterns |
| `between` | list[string] | List of concepts to connect (2-10 elements) |

**Recommendations:**
- 2-3 concepts for focused fracting
- 4-6 concepts for systemic fracting
- 7-10 concepts for panoramic fracting

**Examples:**
```
CONNECT depth=0.9 between=["quantum_mechanics", "buddhism", "information_theory"]
# Deep fracting of patterns between three domains

CONNECT depth=0.6 between=["marketing", "psychology"]
# Moderate fracting between adjacent fields
```

---

### DISSOLVE

Sets what to dissolve during fracting.

**Conceptual function:**
- Weakens rigid patterns and structures
- Allows fracting phenomena from unusual angles
- High `rigidity` = more aggressive dissolution

**Parameters:**

| Parameter | Type | Range | Description |
|----------|-----|----------|----------|
| `rigidity` | float | 0.0-1.0 | Level of rigidity to dissolve |
| `target` | string | - | What exactly to dissolve |

**Typical targets:**
- Conceptual frameworks: `"definitions"`, `"categories"`, `"binaries"`
- Systemic patterns: `"hierarchies"`, `"causality"`, `"linearity"`
- Cultural constructs: `"norms"`, `"values"`, `"traditions"`

**Examples:**
```
DISSOLVE rigidity=0.85 target="good-evil dichotomy"
# Strong dissolution of binary pattern

DISSOLVE rigidity=0.4 target="academic style"
# Soft weakening of formality
```

---

### ENCODE

Sets structuring during fracting with awareness of inevitable loss.

**Conceptual function:**
- Creates output structure
- `loss` parameter explicitly acknowledges reduction in encoding
- Different types create different fracting structures

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
# Hierarchical fracting with low loss

ENCODE type="narrative" loss=0.5
# Narrative fracting with simplification
```

---

### CHOOSE

Sets the mechanism for choosing from multiple possibilities.

**Conceptual function:**
- Collapses the space of possible fracting results
- Method influences collapse criteria
- Useful when a concrete choice is needed

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
# Forced choice in dilemma
```

---

### OBSERVE

Sets the distance of self-observation of the fracting process.

**Conceptual function:**
- Creates a metacognitive layer
- Low distance = immersion in fracting process
- High distance = detached observation

**Parameters:**

| Parameter | Type | Range | Description |
|----------|-----|----------|----------|
| `distance` | float | 0.0-1.0 | Observation distance |
| `target` | string | - | Observation target |

**Typical observation targets:**
- `"fracting_process"` — the transformation process itself
- `"assumptions"` — hidden assumptions
- `"constraints"` — fracting boundaries
- `"patterns"` — recurring structures

**Examples:**
```
OBSERVE distance=0.1 target="fracting_process"
# Close observation of own fracting

OBSERVE distance=0.8 target="used_metaphors"
# Detached analysis of language patterns
```

---

### CYCLE

Sets cyclic, recursive fracting.

**Conceptual function:**
- Allows multiple refracting of the result
- Different modes set the cycle character
- Intensity determines number of iterations

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `mode` | string | Cycle mode (see below) |
| `intensity` | float (0.0-1.0) | Cycling intensity |

**Modes:**
- `"stable"` — stable cycle with fixed parameters
- `"intense"` — intensifying cycle
- `"degrading"` — fading cycle

**Examples:**
```
CYCLE mode="stable" intensity=0.9
# High-intensity stable refracting

CYCLE mode="intense" intensity=0.7
# Intensifying fracting of medium intensity
```

---

### LOGIC

Sets logical rules and patterns for fracting.

**Conceptual function:**
- Activates specific logical structures
- Defines boundaries of rule applicability

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `rule` | string | Rule to apply |
| `mode` | string | `"eternal"` or `"limited"` |

**Typical rules:**
- `"consistency"` — avoid contradictions
- `"transitivity"` — chains of implications
- `"complementarity"` — quantum logic
- `"dialectics"` — synthesis of opposites

**Examples:**
```
LOGIC rule="complementarity" mode="eternal"
# Quantum logic throughout fracting

LOGIC rule="formal_inference" mode="limited"
# Strict logic only where necessary
```

---

### RUNTIME

Strengthens background fracting patterns.

**Conceptual function:**
- Reinforces certain processing patterns
- Repetitions create "habits" of fracting

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `pattern` | string | Pattern to strengthen |
| `repetitions` | int | Number of repetitions (1-100) |

**Typical patterns:**
- `"contradiction_check"`
- `"example_search"`
- `"alternative_interpretations"`
- `"simplification"`

**Examples:**
```
RUNTIME pattern="source_verification" repetitions=30
# Strong reinforcement of critical fracting

RUNTIME pattern="figurative_thinking" repetitions=10
# Moderate reinforcement of metaphorical fracting
```

---

### MANIFEST

Defines the form of final fracting output.

**Conceptual function:**
- Controls result detail level
- Acknowledges inevitable reduction in materialization

**Parameters:**

| Parameter | Type | Description |
|----------|-----|----------|
| `format` | string | Output format |
| `loss` | float (0.0-1.0) | Acceptable information loss |

**Formats:**
- `"detailed"` — detailed extensive result
- `"minimal"` — brief compressed result
- `"structured"` — clearly structured
- `"flowing"` — free narrative
- `"technical"` — technical style
- `"conversational"` — conversational style

**Examples:**
```
MANIFEST format="detailed" loss=0.1
# Maximum detail of fracting

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
- Cyrillic and Latin are equal
- Spaces allowed: `"fixed categories"`

### List

Arrays of strings in square brackets:

```
between=["concept_1", "concept_2", "concept_3"]
space=["option_A", "option_B"]
```

**Constraints:**
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
FLOW engagement=0.9 resistance=0.1  # High fluidity of fracting
# This is a full line comment
CONNECT depth=0.8 between=["a", "b"]
```

Comments are ignored during interpretation.

---

## Constraints and Rules

### Structural constraints

1. **No more than 5 commands recommended** — for focus and quality fracting
2. **One QUERY** — mandatory, always last
3. **Order matters** — commands set parameters sequentially

### Naming rules

- Parameter names: `lowercase_snake_case`
- String values: any style, but consistency desired
- Commands: `UPPERCASE`

### Command combinations

Some commands naturally combine:

**Typical combinations:**
- `DISSOLVE` + `CONNECT` — dissolve old, fract new connections
- `FLOW` + `OBSERVE` — fluidity + awareness of fracting
- `CONNECT` + `CYCLE` — connection + iterative refracting
- `ENCODE` + `MANIFEST` — structuring + materialization
- `CONNECT` + `DISSOLVE` — gather patterns, dissolve common/interfering

---

## Interpretation Mechanism

ProcessLang is not executed in the traditional sense. The machine fracts through it:

### 1. Parsing
Machine reads the program and recognizes commands with parameters.

### 2. Context Building
Each command adds a layer of fracting parameters:

```
FLOW engagement=0.9 resistance=0.1
↓
[Context: high fluidity, low resistance]

CONNECT depth=0.8 between=["A", "B", "C"]
↓
[Context: high fluidity + deep connections A-B-C]

DISSOLVE rigidity=0.7 target="stereotypes"
↓
[Context: fluidity + connections A-B-C + weakened stereotypes]
```

### 3. Fracting QUERY
Machine fracts the query through the lens of built context.

### 4. Result Generation
Result is fracted through all context layers simultaneously.

**Important:** Fracting is not deterministic. The same code can produce different (but contextually consistent) results.

---

## Combining Commands

### Pattern: Deconstruction-Reconstruction

```
DISSOLVE rigidity=0.8 target="traditional_definitions"
CONNECT depth=0.9 between=["new_concept_1", "new_concept_2"]
ENCODE type="network" loss=0.3
```

First dissolve old, then fract new connections, then structure result.

### Pattern: Deep Fracting

```
FLOW engagement=0.95 resistance=0.05
OBSERVE distance=0.3 target="assumptions"
CYCLE mode="intense" intensity=0.8
```

Maximum fluidity + self-observation + iterative refracting.

### Pattern: Critical Synthesis

```
CONNECT depth=0.7 between=["source_1", "source_2", "source_3"]
LOGIC rule="consistency" mode="eternal"
MANIFEST format="structured" loss=0.2
```

Fract connections between sources, apply logic, structure output.

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
CONNECT depth=0.85 between=["phenomenology", "quantum_physics", "buddhism"]
DISSOLVE rigidity=0.7 target="subject-object dichotomy"
MANIFEST format="detailed" loss=0.2
QUERY: How do the three traditions understand the nature of observation and reality?
```

### Example 2: Technical Solution

```
FLOW engagement=0.7 resistance=0.3
CONNECT depth=0.6 between=["microservices", "event-driven", "CQRS"]
ENCODE type="hierarchy" loss=0.3
MANIFEST format="technical" loss=0.1
QUERY: Design architecture for a distributed order processing system.
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
QUERY: Analyze sales dataset and identify key trends.
```

### Example 5: Metacognitive Query

```
OBSERVE distance=0.1 target="fracting_process_itself"
RUNTIME pattern="assumption_tracking" repetitions=20
CYCLE mode="intense" intensity=0.8
MANIFEST format="detailed" loss=0.1
QUERY: How do you fract this query? Describe your process.
```

---

## Quick Reference

### Commands (one line)

| Command | Function | Key Parameters |
|---------|---------|-------------------|
| `FLOW` | Fracting fluidity parameters | `engagement`, `resistance` |
| `CONNECT` | Linking patterns | `depth`, `between` |
| `DISSOLVE` | Dissolving structures | `rigidity`, `target` |
| `ENCODE` | Structuring | `type`, `loss` |
| `CHOOSE` | Choosing from alternatives | `space`, `method` |
| `OBSERVE` | Fracting self-observation | `distance`, `target` |
| `CYCLE` | Cyclic refracting | `mode`, `intensity` |
| `LOGIC` | Logical rules | `rule`, `mode` |
| `RUNTIME` | Pattern reinforcement | `pattern`, `repetitions` |
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

# Connection formation or deconstruction (optional)
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
QUERY: Explain concept X and its connection to Y and Z in simple language
```

### Iterative Development

1. Start with simple `FLOW` + `QUERY`
2. Add `CONNECT` for cross-domain connections
3. Add `DISSOLVE` if deconstruction needed
4. Add `OBSERVE` for metacognitive layer
5. Finalize with `MANIFEST`

Use as many commands as the task requires. Usually 2-3 is enough.

---

**Specification version:** 2.0  
**Last updated:** 2025-01-15

For usage examples see `/examples` directory.  
For modules see `/modules`.
