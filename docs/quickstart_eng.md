# ProcessLang Quick Start

Quick introduction to using ProcessLang.

---

## How to Use ProcessLang

ProcessLang works **only through the compiler**. Commands without modules have no conceptual context and will not produce correct results.

### Requirements

- Python 3.6+
- Git (for cloning the repository)

### Installation

```bash
git clone https://github.com/slasten3826/processlang.git
cd processlang
```

### Usage

```bash
# Compile the program
python compiler.py examples/simple_example.txt output.txt

# The compiled prompt in output.txt contains:
# - Required modules with conceptual context
# - Your commands
# 
# Send the contents of output.txt to an AI system
```

### What Does the Compiler Do?

1. Reads your program (.txt)
2. Determines which modules are needed
3. Loads modules from `/modules/`
4. Assembles: modules + your commands
5. Saves the final prompt to the output file

**Structure after compilation:**

```
[Contents of FluidCore.txt module]
[Contents of EmergentConnection.txt module]
...
---
FLOW engagement=0.9 resistance=0.1
CONNECT depth=0.8 between=["A", "B"]
QUERY: Your question
```

---

## First Program

### Example: Simple Query

```
FLOW engagement=0.7 resistance=0.3
QUERY: Explain quantum entanglement in simple terms
```

**What happens:**
- `FLOW` sets the level of thinking fluidity (0.7 = high, but not maximum)
- `resistance=0.3` = moderate resistance (maintaining scientific accuracy)
- AI interprets the query through this context

### Example: Cross-Domain Connection

```
FLOW engagement=0.9 resistance=0.1
CONNECT depth=0.85 between=["music", "mathematics", "emotions"]
DISSOLVE rigidity=0.7 target="rigid_categories"
QUERY: How do these three domains interact in music creation?
```

**What happens:**
- Maximum fluidity (0.9)
- Deep connections between three domains (0.85)
- Dissolution of rigid categories (0.7)
- AI searches for non-obvious interaction patterns

---

## Program Structure

```
COMMAND param1=value1 param2=value2
COMMAND param1=value1
COMMAND param1=value1
...
QUERY: Your question or request
```

**Rules:**
- Maximum 5 commands (but can be less!)
- QUERY is always last
- Order of commands matters
- Empty lines are ignored
- Comments start with `#`

---

## Basic Commands

### FLOW
Sets the basic operating mode.

```
FLOW engagement=0.9 resistance=0.1
# High engagement, low resistance = creative approach
```

### CONNECT
Creates connections between concepts.

```
CONNECT depth=0.8 between=["A", "B", "C"]
# Deep connections between three concepts
```

### DISSOLVE
Dissolves rigid frameworks.

```
DISSOLVE rigidity=0.7 target="stereotypes"
# Weakens the influence of stereotypes
```

### MANIFEST
Defines the output format.

```
MANIFEST format="detailed" loss=0.1
# Detailed response with minimal information loss
```

Full list of commands: `/docs/SYNTAX.md`

---

## Examples from the Collection

### For Beginners

```bash
# Basic example (minimal program)
python compiler.py examples/simple_example.txt

# Creative task
python compiler.py examples/creative_block.txt

# Decision making
python compiler.py examples/decision.txt
```

### Advanced

```bash
# Philosophical analysis
python compiler.py examples/karma.txt

# Deep learning
python compiler.py examples/learning.txt

# Visual generation
python compiler.py examples/eternal_flow.txt
```

Description of all examples: `/examples/readme-examples.md`

---

## Typical Patterns

### Deconstruction-Reconstruction

```
DISSOLVE rigidity=0.8 target="traditional_definitions"
CONNECT depth=0.9 between=["new_concept_1", "new_concept_2"]
ENCODE type="network" loss=0.3
```

First we break down old frameworks, then create new connections, then structure.

### Deep Analysis

```
FLOW engagement=0.95 resistance=0.05
OBSERVE distance=0.3 target="assumptions"
CYCLE mode="intense" intensity=0.8
```

Maximum fluidity + self-observation + iterative deepening.

### Minimalist Approach

```
FLOW engagement=0.7 resistance=0.3
QUERY: Your question
```

You don't have to use all 5 commands — use as many as needed.

---

## Tips

### For Beginners

1. **Start simple**: `FLOW` + `QUERY`
2. **Add commands gradually** as you understand
3. **Study examples**: `/examples/` contains real programs
4. **Experiment with parameters**: change values and observe results

### For Advanced Users

1. **Command order matters**: each command builds on the previous one
2. **Combine commands meaningfully**: avoid contradictions
3. **Not all tasks require 5 commands**: minimalism is often more effective
4. **Use comments**: especially in complex programs

### For Everyone

- **ProcessLang works through understanding**, not mechanical execution
- **Don't copy blindly** — adapt to your task
- **The language is intentionally conceptual** — this is not a bug, it's a feature
- **AI systems interpret differently** — this is normal

---

## Debugging

### Program not giving expected results?

1. **Check command order**: is the transition from one to another logical?
2. **Check parameter values**: maybe `engagement` is too low?
3. **Simplify the program**: remove commands one by one and find the problem
4. **Try a different AI system**: different models interpret differently

### Compiler gives an error?

```bash
# Check command syntax
# Make sure module files exist
ls -la modules/

# Check that the program is readable
cat examples/your_program.txt

# Use verbose mode (if added)
python compiler.py -v examples/your_program.txt
```

---

## Next Steps

1. **Read the full specification**: `/docs/SYNTAX.md`
2. **Study examples**: `/examples/`
3. **Start with simple programs**
4. **Experiment and adapt**

---

## Resources

- **Full syntax specification**: `/docs/SYNTAX.md`
- **Example programs**: `/examples/`
- **Example descriptions**: `/examples/readme-examples.md`
- **Conceptual modules**: `/modules/`
- **License**: Unlicense (Public Domain)

---

## Project Support

If ProcessLang has been useful:

**Monero**: `42tXPEuCmvmhYpkxGDTeSHKL6ZQcjqbA368sqx8y87BhddaQWYLGLHnT393augRm3hbwwXynD4XA3hWk2Vvh34y3RNqtgxc`

---

**Welcome to ProcessLang!**

This is a tool for coordinating with AI through process-oriented context.  
Experiment. Create. Coordinate.