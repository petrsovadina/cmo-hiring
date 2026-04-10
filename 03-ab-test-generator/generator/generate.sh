#!/usr/bin/env bash
# A/B Test Variant Generator for Smartsupp Remarketing
#
# Usage:
#   ./generate.sh [segment] [output_dir]
#
# Arguments:
#   segment    — Which remarketing segment to generate for (default: pricing_page_abandoners)
#   output_dir — Where to write the variant matrix (default: ../output)
#
# Requirements:
#   - claude CLI (Anthropic Claude Code) OR any LLM API client
#   - yq (for YAML parsing, optional — falls back to cat)
#
# This script assembles the system prompt + generation prompt + config data
# and pipes them to an LLM. The LLM generates the structured variant matrix.
#
# For manual use: copy the assembled prompt from stdout and paste into any LLM.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SEGMENT="${1:-pricing_page_abandoners}"
OUTPUT_DIR="${2:-$SCRIPT_DIR/../output}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━ A/B Test Variant Generator ━━━${NC}"
echo -e "Segment: ${GREEN}${SEGMENT}${NC}"
echo -e "Output:  ${GREEN}${OUTPUT_DIR}${NC}"
echo ""

# ── Assemble the full prompt ─────────────────────────────────────────
SYSTEM_PROMPT="$SCRIPT_DIR/system-prompt.md"
GENERATION_PROMPT="$SCRIPT_DIR/generation-prompt.md"
CONFIG="$SCRIPT_DIR/config.yaml"

if [[ ! -f "$SYSTEM_PROMPT" ]] || [[ ! -f "$GENERATION_PROMPT" ]]; then
    echo -e "${RED}Error: Missing prompt files in $SCRIPT_DIR${NC}"
    exit 1
fi

# Assemble full prompt
FULL_PROMPT=$(cat <<EOF
=== SYSTEM CONTEXT ===

$(cat "$SYSTEM_PROMPT")

=== CONFIGURATION DATA ===

$(cat "$CONFIG")

=== GENERATION TASK ===

$(cat "$GENERATION_PROMPT")
EOF
)

# ── Output mode ──────────────────────────────────────────────────────
# Try to use claude CLI if available, otherwise print prompt for manual use
if command -v claude &>/dev/null; then
    echo -e "${GREEN}Found claude CLI. Generating variants...${NC}"
    echo ""

    mkdir -p "$OUTPUT_DIR"

    echo "$FULL_PROMPT" | claude --print \
        > "$OUTPUT_DIR/variant-matrix.md" 2>/dev/null || {
        echo -e "${RED}Claude CLI generation failed. Falling back to prompt output.${NC}"
        echo "$FULL_PROMPT"
    }

    if [[ -f "$OUTPUT_DIR/variant-matrix.md" ]] && [[ -s "$OUTPUT_DIR/variant-matrix.md" ]]; then
        echo -e "${GREEN}Generated: $OUTPUT_DIR/variant-matrix.md${NC}"
    fi
else
    echo -e "${BLUE}No claude CLI found. Outputting assembled prompt:${NC}"
    echo -e "${BLUE}Copy this into any LLM (Claude, ChatGPT, etc.) to generate variants.${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "$FULL_PROMPT"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

echo ""
echo -e "${GREEN}Done.${NC}"
