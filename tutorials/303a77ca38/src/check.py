#!/usr/bin/env python3
"""Checks the data files. Run from the page folder: python3 src/check.py
Reads data/*.js as JSON after the assignment, so keep each file as plain JSON objects.
"""
import json, re, sys, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
errors = []

def load(name, var):
    text = (root / "data" / name).read_text(encoding="utf-8")
    m = re.search(re.escape(var) + r"\s*=\s*(.*?);\s*$", text, re.S)
    if not m:
        errors.append(f"{name}: cannot find {var}")
        return None
    return json.loads(m.group(1))

meta = load("meta.js", "TUT.meta")
scenario = load("scenario.js", "TUT.scenario")
resources = load("resources.js", "TUT.resources")

# sprints.js holds two assignments, so cut them apart before parsing
text = (root / "data" / "sprints.js").read_text(encoding="utf-8")
m1 = re.search(r"TUT\.sprints\s*=\s*(\[.*?\n\]);", text, re.S)
m2 = re.search(r"TUT\.stations\s*=\s*(\{.*\n\});", text, re.S)
sprints = json.loads(m1.group(1)) if m1 else None
stations = json.loads(m2.group(1)) if m2 else None
if sprints is None or stations is None:
    errors.append("sprints.js: cannot parse sprints or stations")
    sprints, stations = sprints or [], stations or {}

res_ids = [r["id"] for r in resources]
if len(res_ids) != len(set(res_ids)):
    errors.append("duplicate resource ids")

used = set()
total = 0
for sp in sprints:
    s = 0
    for b in sp["blocks"]:
        s += b["minutes"]
        for sid in b["stations"]:
            used.add(sid)
            st = stations.get(sid)
            if not st:
                errors.append(f"{b['id']}: unknown station {sid}")
                continue
            if st["minutes"] != b["minutes"]:
                errors.append(f"{sid}: {st['minutes']} min but block {b['id']} is {b['minutes']} min")
            if st["stream"] not in ("A", "B", "AB"):
                errors.append(f"{sid}: bad stream {st['stream']}")
            if st["status"] not in ("outline", "draft"):
                errors.append(f"{sid}: bad status {st['status']}")
            for rid in st["resources"]:
                if rid not in res_ids:
                    errors.append(f"{sid}: unknown resource {rid}")
    if s != sp["minutes"]:
        errors.append(f"sprint {sp['id']}: blocks add to {s}, declared {sp['minutes']}")
    total += s
if total != meta["totalMinutes"]:
    errors.append(f"sprints add to {total}, meta says {meta['totalMinutes']}")
if total != meta["labMinutes"] * 8:
    errors.append("expected eight sessions of labMinutes each")
for sid in stations:
    if sid not in used:
        errors.append(f"station {sid} is in no block")

# widgets and station content
widgets = load("widgets.js", "TUT.widgets") or {}
content = {}
for cf in sorted((root / "data").glob("content-*.js")):
    cm = re.search(r"Object\.assign\(TUT\.content,\s*(\{.*\})\s*\);", cf.read_text(encoding="utf-8"), re.S)
    if not cm:
        errors.append(f"{cf.name}: cannot parse content")
        continue
    content.update(json.loads(cm.group(1)))
for sid, st in stations.items():
    if st["status"] == "draft" and sid not in content:
        errors.append(f"{sid}: status draft but no content")
    if sid in content and st["status"] != "draft":
        errors.append(f"{sid}: has content but status is {st['status']}")
for sid, c in content.items():
    st = stations.get(sid)
    if not st:
        errors.append(f"content for unknown station {sid}")
        continue
    mins = sum(p["min"] for p in c["parts"])
    if mins != st["minutes"]:
        errors.append(f"{sid}: steps add to {mins} min, station is {st['minutes']}")
    for k in ("intro", "parts", "checks", "good", "watch", "output", "teacher"):
        if not c.get(k):
            errors.append(f"{sid}: missing {k}")
    for p in c["parts"]:
        for hid in p.get("help", []):
            if hid not in res_ids:
                errors.append(f"{sid}: unknown help resource {hid}")
        if p.get("widget") and p["widget"] not in widgets:
            errors.append(f"{sid}: unknown widget {p['widget']}")

# links
for r in resources:
    if r["status"] == "listed" and not (r["url"] or "").startswith("https://"):
        errors.append(f"resource {r['id']}: listed but no https url")
    if r["url"] and r["status"] == "pending":
        errors.append(f"resource {r['id']}: has a url but status is pending")
    if not r["url"] and r["status"] != "pending":
        errors.append(f"resource {r['id']}: no url, status should be pending")

# page hygiene
html = (root / "index.html").read_text(encoding="utf-8")
if 'name="robots" content="noindex,nofollow"' not in html:
    errors.append("index.html: noindex tag missing")
for tag in re.findall(r'(?:src|href)="(https?://[^"]+)"', html):
    errors.append(f"index.html: external asset {tag}")
for f in ("styles.css", "js/app.js", "js/render.js", "js/state.js"):
    t = (root / f).read_text(encoding="utf-8")
    if re.search(r"https?://", t) and f != "styles.css":
        errors.append(f"{f}: contains a web address; keep addresses in data/")

if errors:
    print("FAILED")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print(f"OK: {len(content)} stations with content, {len(sprints)} sprints, {len(stations)} stations, {len(resources)} resources, {total} minutes")
