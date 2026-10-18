# Dead code / tech debt — Minco

| Path | Evidence | Risk | Recommended action |
| --- | --- | --- | --- |
| Framework semantic hexes in site CSS (`#28a745`, `#bd2130`, `#f58220`) | Present in `custom.*.css` but not guest-facing brand UI (0 orange hits on published page) | Low — not in our tokens | Keep out of `@minco/tokens`; do not port |
| `--radius-full` / unused shadow steps | Site chrome is sharp + shadowless; tokens kept for future circular assets only | Low | Leave; document as unused |

### Notes

- Placeholder tokens replaced 2026-10-18 with observed Minco Guesthouse values.
