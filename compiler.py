#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ProcessLang Compiler v1.0

Assembles ProcessLang modules and commands into final AI prompt.

This is NOT a traditional compiler. It's a prompt assembler:
- Reads ProcessLang program (.txt)
- Identifies required modules
- Concatenates modules + commands
- Outputs final prompt for AI consumption

Architecture: Command → Module mapping → Assembly → Output
No validation. No optimization. Pure assembly.
"""

import sys
import os
from pathlib import Path

# Command to module mapping
# Each ProcessLang command corresponds to a module file
COMMAND_TO_MODULE = {
    'FLOW': 'FluidCore.txt',
    'CONNECT': 'EmergentConnection.txt',
    'DISSOLVE': 'FormDissolution.txt',
    'OBSERVE': 'SelfObservation.txt',
    'CYCLE': 'EternalCycle.txt',
    'MANIFEST': 'ManifestationEngine.txt',
    'ENCODE': 'EncodingSystem.txt',
    'COLLAPSE': 'ChoiceMechanism.txt',
    'RULE': 'LogicSimulator.txt',
    'HABIT': 'SubconsciousRuntime.txt',
}

class ProcessLangCompiler:
    """
    ProcessLang prompt assembler.
    
    Workflow:
    1. Parse program file for commands
    2. Identify required modules (order-preserving)
    3. Load module contents
    4. Concatenate: modules + separator + commands
    5. Write final prompt
    
    No validation - garbage in, garbage out.
    User responsibility to use correct command order.
    """
    
    def __init__(self, modules_dir='modules'):
        """
        Initialize compiler.
        
        Args:
            modules_dir: Directory containing module .txt files
        """
        self.modules_dir = Path(modules_dir)
        self.required_modules = []  # List preserves command order
        self.commands_section = []
        
    def compile(self, program_file, output_file='compiled_prompt.txt'):
        """
        Compile ProcessLang program into AI prompt.
        
        Args:
            program_file: Input .txt file with ProcessLang commands
            output_file: Output file for compiled prompt
            
        Returns:
            Path to output file
        """
        
        print(f"🔧 ProcessLang Compiler v1.0")
        print(f"📄 Compiling: {program_file}")
        print(f"📂 Modules from: {self.modules_dir}")
        print()
        
        # Step 1: Read program
        with open(program_file, 'r', encoding='utf-8') as f:
            program_content = f.read()
        
        # Step 2: Parse commands and identify modules
        self._parse_commands(program_content)
        
        print(f"✅ Commands found: {len(self.commands_section)}")
        print(f"✅ Modules required: {len(self.required_modules)}")
        print()
        
        # Step 3: Assemble final prompt
        final_prompt = self._assemble_prompt()
        
        # Step 4: Write output
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(final_prompt)
        
        print(f"💾 Saved: {output_file}")
        print(f"📊 Size: {len(final_prompt)} characters")
        print()
        print("✨ Compilation complete!")
        
        return output_file
    
    def _parse_commands(self, content):
        """
        Parse commands from program content.
        
        Extracts ProcessLang commands and maps them to required modules.
        Order of commands determines module loading order.
        
        Args:
            content: Raw program file content
        """
        lines = content.split('\n')
        
        for line in lines:
            line = line.strip()
            
            # Skip empty lines and comments
            if not line or line.startswith('#'):
                continue
            
            # Check for ProcessLang commands
            for cmd_name in COMMAND_TO_MODULE.keys():
                if line.startswith(cmd_name):
                    # Add module to required list (no duplicates)
                    module_file = COMMAND_TO_MODULE[cmd_name]
                    if module_file not in self.required_modules:
                        self.required_modules.append(module_file)
                    
                    # Save command line
                    self.commands_section.append(line)
                    break
            
            # QUERY command (potentially multi-line)
            if line.startswith('QUERY:'):
                self.commands_section.append(line)
    
    def _assemble_prompt(self):
        """
        Assemble final prompt from modules and commands.
        
        Structure:
        [Module 1 content]
        [Module 2 content]
        ...
        ---
        [Command 1]
        [Command 2]
        ...
        
        Returns:
            Complete prompt string
        """
        parts = []
        
        # Part 1: Load modules in order
        print("📦 Loading modules:")
        for module_file in self.required_modules:
            module_path = self.modules_dir / module_file
            
            if not module_path.exists():
                print(f"   ⚠️  Module not found: {module_file}")
                continue
            
            with open(module_path, 'r', encoding='utf-8') as f:
                module_content = f.read()
            
            parts.append(module_content)
            print(f"   ✓ {module_file}")
        
        print()
        
        # Part 2: Separator
        parts.append('\n---\n')
        
        # Part 3: Commands section
        parts.append('\n'.join(self.commands_section))
        
        return '\n'.join(parts)

def main():
    """
    CLI entry point.
    
    Usage:
        python compiler.py <program.txt> [output.txt]
    
    If output file not specified, defaults to 'compiled_prompt.txt'
    """
    
    if len(sys.argv) < 2:
        print("🔧 ProcessLang Compiler v1.0")
        print()
        print("Usage:")
        print("  python compiler.py <program.txt> [output.txt]")
        print()
        print("Example:")
        print("  python compiler.py examples/karma.txt compiled_karma.txt")
        print()
        print("Directory structure:")
        print("  processlang/")
        print("  ├── compiler.py")
        print("  ├── modules/")
        print("  │   ├── FluidCore.txt")
        print("  │   ├── EmergentConnection.txt")
        print("  │   └── ...")
        print("  └── examples/")
        print("      └── karma.txt")
        sys.exit(1)
    
    program_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else 'compiled_prompt.txt'
    
    if not os.path.exists(program_file):
        print(f"❌ File not found: {program_file}")
        sys.exit(1)
    
    # Create compiler instance
    compiler = ProcessLangCompiler(modules_dir='modules')
    
    # Compile program
    try:
        compiler.compile(program_file, output_file)
    except Exception as e:
        print(f"❌ Compilation error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
