#!/bin/bash
# Auto-generated update script for Claude GitHub Commands

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info "Updating Claude GitHub Commands..."

# Determine if this is a submodule installation
if [[ -f ".gitmodules" ]] && grep -q "claude-github-commands" .gitmodules; then
    print_info "Updating submodule..."
    git submodule update --remote .claude-commands
    cd .claude-commands
else
    # Direct installation - pull latest changes
    COMMANDS_SOURCE="$(dirname "$0")/.claude-commands"
    if [[ -d "$COMMANDS_SOURCE" ]]; then
        cd "$COMMANDS_SOURCE"
        git pull origin main
    else
        print_info "Commands source not found, skipping update"
        exit 1
    fi
fi

# Re-run installation
./install.sh

print_success "Update completed!"
