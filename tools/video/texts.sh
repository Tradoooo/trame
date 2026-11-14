#!/usr/bin/env bash
# texts.sh — capture les artefacts réels affichés dans les plans « terminal ».
set -uo pipefail
export PATH="$HOME/node-current/bin:$HOME/bin:$PATH"
R="$(cd "$(dirname "$0")/../.." && pwd)"
V="${TRAME_VIDEO_DIR:-$R/.video}/texts"
mkdir -p "$V"

{
  echo '$ grep -n "rovo:mcp:" -A 4 manifest.yml            # one MCP module, fourteen tools'
  grep -n "rovo:mcp:" -A 4 "$R/manifest.yml" | sed 's/^/  /'
  echo ''
  echo '$ npx vitest run tests/contract/entry-points.test.ts'
  ( cd "$R" && timeout 240 npx vitest run tests/contract/entry-points.test.ts 2>&1 \
      | grep -E "^ *(✓|Test Files|     Tests)" | sed 's/^/  /' )
  echo ''
  echo '# the two writing actions stay NOT_IMPLEMENTED: never a plausible fake'
  grep -n "NOT_IMPLEMENTED" "$R/src/ingest/llm.ts" | head -3 | sed 's/^/  /'
} > "$V/rovo.txt"

{
  echo '$ npx vitest run                                   # the whole suite, on main'
  ( cd "$R" && timeout 300 npx vitest run 2>&1 \
      | grep -E "^( ✓| ✗| Test Files|      Tests|   Duration)" | tail -8 | sed 's/^/  /' )
  echo ''
  echo "$ curl -sI -o /dev/null -w '%{http_code}\\n' https://tradoooo.github.io/trame/"
  printf '  %s\n' "$(curl -sI -o /dev/null -w '%{http_code}' https://tradoooo.github.io/trame/)"
  echo ''
  echo '$ python3 tools/check-file-limits.py               # 500 lines/file, 50 lines/function'
  ( cd "$R" && timeout 120 python3 tools/check-file-limits.py 2>&1 | tail -3 | sed 's/^/  /' )
  echo ''
  echo '  github.com/Tradoooo/trame  ·  Trame — the coverage of your acceptance criteria'
} > "$V/tests.txt"

echo "== rovo.txt =="; cat "$V/rovo.txt"
echo "== tests.txt =="; cat "$V/tests.txt"
