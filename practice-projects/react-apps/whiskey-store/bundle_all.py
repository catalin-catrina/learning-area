import os
import re

def strip_comments(text):
    # Regex to remove multi-line JSDoc/Prisma comments (/** ... */)
    text = re.sub(r'/\*\*[\s\S]*?\*/', '', text)
    # Optional: Uncomment the next line if you also want to remove standard single-line comments (// ...)
    # text = re.sub(r'//.*', '', text)
    # Remove excessive blank lines left over by stripped comments
    text = re.sub(r'\n\s*\n', '\n', text)
    return text

def bundle_full_stack(root_dir, output_file="full_project_context.txt"):
    # Folders to strictly ignore (Added common Prisma custom generation folders)
    ignored_dirs = {
        'node_modules', '.git', 'dist', 'build', '.next', '.cache', 'out', 
        'venv', '__pycache__', '.env', 'generated', 'prisma/client'
    }
    ignored_files = {
        'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'poetry.lock',
        'bundle_all.py', 'full_project_context.txt', '.DS_Store'
    }
    allowed_extensions = {
        '.js', '.ts', '.jsx', '.tsx', '.json', '.html', '.css', 
        '.py', '.go', '.md', '.env.example', '.sql'
    }

    with open(output_file, 'w', encoding='utf-8') as outfile:
        # 1. Structure Overview
        outfile.write("=== FULL PROJECT STRUCTURE (WHISKEY STORE) ===\n")
        for root, dirs, files in os.walk(root_dir):
            dirs[:] = [d for d in dirs if d not in ignored_dirs]
            level = root.replace(root_dir, '').count(os.sep)
            indent = ' ' * 4 * level
            outfile.write(f"{indent}{os.path.basename(root)}/\n")
            sub_indent = ' ' * 4 * (level + 1)
            for f in files:
                if f not in ignored_files and os.path.splitext(f)[1] in allowed_extensions:
                    outfile.write(f"{sub_indent}{f}\n")
        
        outfile.write("\n=== SOURCE CODE CONTENTS ===\n\n")

        # 2. File Contents
        for root, dirs, files in os.walk(root_dir):
            dirs[:] = [d for d in dirs if d not in ignored_dirs]
            for file in files:
                if file in ignored_files:
                    continue
                
                name, ext = os.path.splitext(file)
                if ext in allowed_extensions:
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, root_dir)
                    
                    # Skip massive Prisma schema type definition files entirely if they slipped through
                    if "index.d.ts" in file or "prisma" in relative_path.lower() and ext == '.ts' and "schema" not in name:
                        if "schema.prisma" not in file: # keep the actual schema file!
                            continue

                    outfile.write(f"// ==========================================\n")
                    outfile.write(f"// PATH: {relative_path}\n")
                    outfile.write(f"// ==========================================\n\n")
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            content = infile.read()
                            # Clean up the Prisma garbage comments
                            clean_content = strip_comments(content)
                            outfile.write(clean_content)
                    except Exception as e:
                        outfile.write(f"[Error reading file: {str(e)}]\n")
                    outfile.write("\n\n")

if __name__ == "__main__":
    bundle_full_stack(os.getcwd())
    print("Full-stack project bundled and cleaned successfully!")
