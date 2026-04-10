#!/usr/bin/env bash
# Blog-to-Multiplatform Repurposing Pipeline Runner
# Usage: ./run-pipeline.sh <blog-post-url>
#
# Prerequisites:
#   - claude CLI installed (Claude Code / Anthropic CLI)
#   - Or: manually copy-paste prompts into any LLM chat
#
# This script automates the two-stage pipeline:
#   1. Fetch blog post → Extract content atoms
#   2. Feed atoms + platform config → Generate multiplatform content

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$(dirname "$SCRIPT_DIR")/output"
BLOG_URL="${1:-}"

if [ -z "$BLOG_URL" ]; then
    echo "Usage: $0 <blog-post-url>"
    echo ""
    echo "Example:"
    echo "  $0 https://www.reservio.com/blog/tips/service-menu-audit"
    echo ""
    echo "Manual mode (no CLI required):"
    echo "  1. Copy the blog post content"
    echo "  2. Paste into 01-extract.md prompt → run with any LLM → save atoms"
    echo "  3. Paste atoms into 02-adapt.md prompt → run with any LLM → save output"
    exit 1
fi

echo "=== Blog-to-Multiplatform Pipeline ==="
echo "Source: $BLOG_URL"
echo "Output: $OUTPUT_DIR"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Generate timestamp for output files
TIMESTAMP=$(date +%Y%m%d-%H%M)

# Step 1: Fetch and extract content atoms
echo "[Step 1/2] Extracting content atoms..."
EXTRACT_PROMPT=$(cat "$SCRIPT_DIR/01-extract.md")

# Use curl to fetch the blog post, then feed to Claude
BLOG_CONTENT=$(curl -sL "$BLOG_URL" | \
    sed 's/<script[^>]*>.*<\/script>//g' | \
    sed 's/<style[^>]*>.*<\/style>//g' | \
    sed 's/<[^>]*>//g' | \
    sed '/^$/d' | \
    head -500)

ATOMS_FILE="$OUTPUT_DIR/atoms-${TIMESTAMP}.md"

if command -v claude &> /dev/null; then
    echo "$EXTRACT_PROMPT"$'\n\n---\n\n'"$BLOG_CONTENT" | \
        claude --print > "$ATOMS_FILE"
    echo "  → Atoms saved to: $ATOMS_FILE"
else
    echo "  ⚠ Claude CLI not found. Saving blog content for manual extraction."
    echo "# Blog Content (for manual extraction)" > "$ATOMS_FILE"
    echo "## Source: $BLOG_URL" >> "$ATOMS_FILE"
    echo "" >> "$ATOMS_FILE"
    echo "$BLOG_CONTENT" >> "$ATOMS_FILE"
    echo "  → Blog content saved to: $ATOMS_FILE"
    echo "  → Paste this + 01-extract.md into your LLM to extract atoms"
fi

# Step 2: Adapt to platforms
echo "[Step 2/2] Generating multiplatform content..."
ADAPT_PROMPT=$(cat "$SCRIPT_DIR/02-adapt.md")
CONFIG=$(cat "$SCRIPT_DIR/config.yaml")
OUTPUT_FILE="$OUTPUT_DIR/multiplatform-${TIMESTAMP}.md"

if command -v claude &> /dev/null && [ -f "$ATOMS_FILE" ]; then
    ATOMS=$(cat "$ATOMS_FILE")
    echo "$ADAPT_PROMPT"$'\n\n## Platform Configuration\n\n```yaml\n'"$CONFIG"$'\n```\n\n---\n\n'"$ATOMS" | \
        claude --print > "$OUTPUT_FILE"
    echo "  → Multiplatform content saved to: $OUTPUT_FILE"
else
    echo "  ⚠ Skipping auto-generation. Run manually:"
    echo "    1. Extract atoms using 01-extract.md"
    echo "    2. Feed atoms + config.yaml into 02-adapt.md"
    echo "    3. Save output to: $OUTPUT_FILE"
fi

echo ""
echo "=== Pipeline Complete ==="
echo "Output files in: $OUTPUT_DIR"
ls -la "$OUTPUT_DIR"
