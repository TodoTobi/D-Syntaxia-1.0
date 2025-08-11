#!/usr/bin/env bash
set -euo pipefail

REPO_NAME=${1:-SINTAXIA}
GITHUB_USER=${2:-your-username}
DEFAULT_BRANCH=${3:-main}

echo "==> Inicializando repo local..."
git init
git checkout -b "$DEFAULT_BRANCH"
git add .
git commit -m "feat: SINTAXIA starter (frontend + backend + deploy configs)"

if command -v gh >/dev/null 2>&1; then
  echo "==> Creando repo en GitHub con GitHub CLI..."
  gh repo create "$GITHUB_USER/$REPO_NAME" --public --source=. --remote=origin --push
else
  echo "==> Configurá remoto manualmente:"
  echo "git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git"
  echo "git push -u origin $DEFAULT_BRANCH"
fi

echo "Listo. Conecta frontend a Vercel y backend a Render/Railway."
