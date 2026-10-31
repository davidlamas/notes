(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);
  const titleCase = value => String(value ?? '').replaceAll('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
  const fetchJSON = async file => {
    const response = await fetch(`data/${file}`);
    if (!response.ok) throw new Error(`${file}: ${response.status}`);
    return response.json();
  };

  const slides = [
    { kicker: 'An exploratory inquiry', title: 'Digital transformation <em>of</em> higher education', text: 'Not simply which tools enter a course, but what happens to institutional form, authority, boundaries, public purpose and the wider knowledge system.', note: 'Provisional · abstract-level evidence · no forecasts', color: 'var(--peach)', visual: '<div class="visual-layers"><span>Tools and practices</span><span>Institutional form</span><span>Public mandate</span></div>' },
    { kicker: 'A correction changed the question', title: 'From digitalization <em>in</em> to transformation <em>of</em>', text: 'The first search privileged measurable interventions inside courses. The inquiry was reframed around continuity, disruption and changes to who governs knowledge.', note: 'Doctoral training is a separate inquiry and remains out of scope.', color: 'var(--sage)', visual: '<div class="visual-axis"><span>IN<br><small>tools inside existing structures</small></span><span>OF<br><small>changes to the structures themselves</small></span></div>' },
    { kicker: 'The analytical frame', title: 'Two axes. Three levels. Three functions.', text: 'Continuity and disruption are independent from beneficial and harmful readings. Every judgement asks “for whom?” and can differ at micro, meso and macro levels.', note: 'Functions: education · research · outreach', color: 'var(--lilac)', visual: '<div class="visual-stack"><span>Continuity · disruption · layering · mixed · unclear</span><span>Beneficial or harmful—for whom?</span><span>Micro · meso · macro</span><span>Education · research · outreach</span></div>' },
    { kicker: 'Provisional finding 01', title: 'Layering appears more often than replacement', text: 'New media and infrastructures have generally accumulated around universities, credentials and academic hierarchies. Existing forms persist while roles and dependencies are rearranged.', note: 'Medium confidence · interpretive synthesis · survivorship caveat', color: 'var(--blue)', visual: '<div class="visual-layers"><span>Campus and degree</span><span>Platforms and networks</span><span>New actors and credentials</span></div>' },
    { kicker: 'Historical analogy', title: 'Distance higher education is a long precedent', text: 'Post, radio, television, telecommunications and early networks expanded access and created dual-mode and open universities without replacing conventional universities.', note: 'Scoping depth only · important regional gaps · analogy, not prediction', color: 'var(--ochre)', visual: '<div class="visual-stack"><span>Post <em>nineteenth century</em></span><span>Broadcast <em>radio and television</em></span><span>Networks <em>telecommunication and online learning</em></span><span>Open universities <em>new forms alongside existing ones</em></span></div>' },
    { kicker: 'Provisional finding 02', title: 'The clearest disruptions concern control', text: 'The record points to shifts in who governs infrastructure, publishing, evaluation, rankings, credentials, discovery, data and compute—not a simple disappearance of campuses or degrees.', note: 'Much of the evidence is critical or conceptual.', color: 'var(--rose)', visual: '<div class="visual-orbit"><strong>Control</strong><span>Publishing</span><span>Evaluation</span><span>Credentials</span><span>Compute</span><span>Discovery</span></div>' },
    { kicker: 'A plural system', title: 'Universities share a wider knowledge ecosystem', text: 'Academies, societies, publishers, libraries, repositories, funders, infrastructures and platforms divide and recombine research, certification, preservation and outreach.', note: '“Knowledge ecosystem” is a working label.', color: 'var(--sage)', visual: '<div class="visual-orbit"><strong>University</strong><span>Academies</span><span>Publishers</span><span>Libraries</span><span>Funders</span><span>Platforms</span></div>' },
    { kicker: 'Rate of change', title: 'Adoption speed is not institutional response', text: 'The available examples compare different quantities: uptake, first policy response and durable restructuring. They cannot be collapsed into one accelerating curve.', note: 'No harmonised long-run series exists; no composite index is produced.', color: 'var(--blue)', visual: '<div class="visual-axis"><span>Tool uptake<br><small>days, months or decades</small></span><span>Institutional change<br><small>policy, practice, structure</small></span></div>' },
    { kicker: 'Cross-level tensions', title: 'Beneficial or harmful—for whom?', text: 'A gain for an individual may narrow a collective agenda. Wider access may increase workload and weaken care. Open infrastructure may still enable platform capture.', note: 'These are interpretive tensions, not a moral score.', color: 'var(--lilac)', visual: '<div class="visual-tension"><div><b>Individual gain</b><small>speed, access, reach</small></div><span>↔</span><div><b>Collective cost</b><small>dependency, surveillance, workload</small></div></div>' },
    { kicker: 'Generative AI', title: 'Rapid uptake, weak structural evidence', text: 'The literature is recent and consists largely of expectations, conceptual work and short-term studies. Fragmented policy response is not yet evidence of transformed university form.', note: 'The page avoids unverified adoption percentages.', color: 'var(--peach)', visual: '<div class="visual-stack"><span>Observed <em>rapid public uptake</em></span><span>Expected <em>changes to practice and assessment</em></span><span>Unknown <em>durable institutional effects</em></span></div>' },
    { kicker: 'Epistemic limits', title: 'Evidence, interpretation and speculation stay apart', text: 'Most runs read abstracts rather than full texts. Coding is AI-assisted and awaits researcher review. Unclear readings, uncertain dates and missing evidence are visible rather than silently resolved.', note: 'No causal estimate of technology on university form appears in the record.', color: 'var(--ochre)', visual: '<div class="visual-stack"><span>Observed or documented</span><span>Interpretation</span><span>Debated or speculative</span><span>Expected or projected</span><span>Unknown</span></div>' },
    { kicker: 'An open research agenda', title: 'The better question may be who governs knowledge', text: 'Five hypotheses ask whether institutional forms persist while control shifts, and whether functions are repeatedly unbundled and rebundled. Verification and stewardship remain hypotheses—not forecasts.', note: 'Next: verify load-bearing sources, review coding, deepen distance-HE coverage and obtain comparable series.', color: 'var(--sage)', visual: '<div class="visual-stack"><span>Who produces?</span><span>Who finds and evaluates?</span><span>Who certifies?</span><span>Who preserves?</span><span>Who governs?</span></div>' }
  ];

  const state = {
    mode: 'presentation', slide: 0, selectedId: null, focusIds: new Set(), focusSource: null,
    stronger: false, showNoncanonical: false,
    filters: { track: 'all', function: 'all', level: 'all', region: 'all', reading: 'all', change: 'all', evidence: 'all', review: 'all', search: '' },
    bibliography: null
  };
  let data = null;
  let toastTimer = null;

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function renderSlide() {
    const slide = slides[state.slide];
    $('#deck').innerHTML = `<article class="slide" aria-labelledby="slide-title"><div class="slide-copy"><p class="slide-kicker">${esc(slide.kicker)}</p><h${state.slide === 0 ? '1' : '2'} id="slide-title">${slide.title}</h${state.slide === 0 ? '1' : '2'}><p class="lede">${esc(slide.text)}</p><p class="slide-note">${esc(slide.note)}</p></div><div class="slide-visual" style="--slide:${slide.color}" aria-hidden="true">${slide.visual}</div></article>`;
    $('#slide-count').textContent = `${state.slide + 1} / ${slides.length}`;
    $('#progress-bar').style.width = `${((state.slide + 1) / slides.length) * 100}%`;
    $('#slide-prev').disabled = state.slide === 0;
    $('#slide-next').disabled = state.slide === slides.length - 1;
    updateURL();
  }

  function setMode(mode, focus = false) {
    state.mode = mode;
    $('#presentation').hidden = mode !== 'presentation';
    $('#exploration').hidden = mode !== 'exploration';
    $$('.mode-button').forEach(button => {
      const active = button.dataset.mode === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateURL();
    if (focus) $('#main').focus({ preventScroll: true });
  }

  function updateURL() {
    const params = new URLSearchParams();
    if (state.mode === 'exploration') params.set('view', 'explore');
    if (state.mode === 'presentation' && state.slide) params.set('slide', String(state.slide + 1));
    Object.entries(state.filters).forEach(([key, value]) => { if (value && value !== 'all') params.set(key === 'function' ? 'fn' : key, value); });
    if (state.showNoncanonical) params.set('superseded', '1');
    if (state.stronger) params.set('stronger', '1');
    if (state.mode === 'exploration' && state.selectedId) params.set('milestone', state.selectedId);
    history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}${state.mode === 'exploration' ? location.hash : ''}`);
  }

  function restoreURL() {
    const params = new URLSearchParams(location.search);
    state.mode = params.get('view') === 'explore' ? 'exploration' : 'presentation';
    state.slide = Math.max(0, Math.min(slides.length - 1, (Number(params.get('slide')) || 1) - 1));
    Object.keys(state.filters).forEach(key => {
      const value = params.get(key === 'function' ? 'fn' : key);
      if (value) state.filters[key] = value;
    });
    state.showNoncanonical = params.get('superseded') === '1';
    state.stronger = params.get('stronger') === '1';
    state.selectedId = params.get('milestone');
  }

  const vocabMap = (name, value) => data.vocabMaps[name]?.get(value) || titleCase(value);
  const listLabels = (name, values) => (values || []).map(value => vocabMap(name, value)).join(', ') || 'Not coded';

  function formatYear(year) {
    if (year == null) return 'Undated';
    if (year < 0) return `${Math.abs(year)} BCE`;
    return String(year);
  }

  function formatDate(item) {
    if (item.timeline_placement === 'undated' || item.year_start == null) return item.date_label || 'Undated';
    const start = formatYear(item.year_start);
    if (item.ongoing) return `${start}–ongoing`;
    if (item.year_end != null && item.year_end !== item.year_start) return `${start}–${formatYear(item.year_end)}`;
    return item.date_precision === 'approximate_year' || item.date_certainty === 'approximate' ? `c. ${start}` : start;
  }

  function dateClass(item) {
    if (item.date_basis === 'claude_general_knowledge_unsourced') return 'unsourced';
    if (item.date_certainty !== 'stated' || item.date_basis === 'inferred_from_named_period') return 'approximate';
    return 'stated';
  }

  function periodFor(item) {
    if (item.timeline_placement === 'undated' || item.year_start == null) return 'undated';
    if (item.year_start < 1500) return 'pre1500';
    if (item.year_start < 1900) return '1500-1899';
    if (item.year_start < 2000) return '1900-1999';
    return '2000-2026';
  }

  function trackGroup(track) {
    if (track === 'technology') return 'technology';
    if (track === 'institution') return 'institution';
    if (track === 'distance_he') return 'distance_he';
    return 'ecosystem';
  }

  function matchesFilters(item) {
    const f = state.filters;
    if (!state.showNoncanonical && !item.canonical) return false;
    if (state.stronger && (item.needs_review || item.date_certainty !== 'stated' || item.coding_confidence === 'low' || !(item.evidence_labels || []).includes('observed'))) return false;
    if (f.track !== 'all' && item.track !== f.track) return false;
    if (f.function !== 'all' && !(item.functions || []).includes(f.function)) return false;
    if (f.level !== 'all' && !(item.levels || []).includes(f.level)) return false;
    if (f.region !== 'all' && !(item.regions || []).includes(f.region)) return false;
    if (f.reading !== 'all' && item.cd_reading !== f.reading) return false;
    if (f.change !== 'all' && item.change_type !== f.change) return false;
    if (f.evidence !== 'all' && !(item.evidence_labels || []).includes(f.evidence)) return false;
    if (f.review === 'reviewed' && item.needs_review) return false;
    if (f.review === 'needs-review' && !item.needs_review) return false;
    if (f.search) {
      const haystack = [item.title, item.description, item.region_label, item.note, item.valence_for_whom].join(' ').toLowerCase();
      if (!haystack.includes(f.search.toLowerCase())) return false;
    }
    return true;
  }

  function milestoneButton(item) {
    const muted = state.focusIds.size && !state.focusIds.has(item.id);
    return `<button class="milestone${item.id === state.selectedId ? ' is-selected' : ''}${muted ? ' is-muted' : ''}" type="button" data-milestone="${esc(item.id)}" aria-label="${esc(`${formatDate(item)}: ${item.title}`)}"><i class="date-dot ${dateClass(item)}" aria-hidden="true"></i>${esc(item.title)}<small>${esc(formatDate(item))} · ${esc(vocabMap('cd_reading', item.cd_reading))}</small></button>`;
  }

  function renderTimeline() {
    const filtered = data.milestones.filter(matchesFilters).sort((a, b) => (a.year_start ?? 99999) - (b.year_start ?? 99999) || a.title.localeCompare(b.title));
    const groups = [
      ['technology', 'Technology'], ['institution', 'Institutions'], ['distance_he', 'Distance higher education'], ['ecosystem', 'Knowledge ecosystem']
    ];
    const periods = ['pre1500', '1500-1899', '1900-1999', '2000-2026', 'undated'];
    $('#timeline').innerHTML = groups.map(([group, label]) => `<div class="timeline-row"><div class="lane-label">${esc(label)}</div>${periods.map(period => {
      const items = filtered.filter(item => trackGroup(item.track) === group && periodFor(item) === period);
      return `<div class="period-cell">${items.length ? items.map(milestoneButton).join('') : '<span class="empty-cell">No matching items</span>'}</div>`;
    }).join('')}</div>`).join('');
    $('#result-count').textContent = `${filtered.length} milestone${filtered.length === 1 ? '' : 's'} shown${state.focusIds.size ? ` · ${state.focusSource} links highlighted` : ''}`;
    $$('[data-milestone]').forEach(button => button.addEventListener('click', () => selectMilestone(button.dataset.milestone)));
    if (!filtered.some(item => item.id === state.selectedId)) state.selectedId = filtered[0]?.id || null;
    renderDetail();
    updateURL();
  }

  function selectMilestone(id) {
    state.selectedId = id;
    $$('[data-milestone]').forEach(button => button.classList.toggle('is-selected', button.dataset.milestone === id));
    renderDetail();
    updateURL();
    if (matchMedia('(max-width:1120px)').matches) $('#detail-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderDetail() {
    const item = data.byMilestone.get(state.selectedId);
    if (!item) {
      $('#detail-panel').innerHTML = '<div class="empty-detail">Choose a milestone to inspect its date basis, coding, evidence and links.</div>';
      return;
    }
    const claims = data.claims.filter(claim => (claim.supporting_milestone_ids || []).includes(item.id));
    const hypotheses = data.hypotheses.filter(h => (h.milestone_ids || []).includes(item.id));
    $('#detail-panel').innerHTML = `<p class="eyebrow">${esc(formatDate(item))} · ${esc(vocabMap('tracks', item.track))}</p><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="badge-row"><span class="badge">${esc(vocabMap('cd_reading', item.cd_reading))}</span><span class="badge">${esc(vocabMap('change_type', item.change_type))}</span><span class="badge${item.needs_review ? ' warning' : ''}">${item.needs_review ? 'Needs researcher review' : 'No review flag'}</span><span class="badge warning">${esc(vocabMap('verification_status', item.verification_status))}</span></div><dl class="detail-list"><div><dt>Date basis</dt><dd>${esc(vocabMap('date_basis', item.date_basis))}; ${esc(vocabMap('date_certainty', item.date_certainty))}</dd></div><div><dt>What persisted / what changed</dt><dd>${esc(item.note || 'Not recorded.')}</dd></div><div><dt>Lag note</dt><dd>${esc(item.lag_note || 'No comparable lag stated.')}</dd></div><div><dt>For whom?</dt><dd>${esc(item.valence_for_whom || 'Not coded; the source did not state winners and losers.')}</dd></div><div><dt>Evidence</dt><dd>${esc(listLabels('evidence_labels', item.evidence_labels))}${item.evidence_label_raw ? ` · source wording: ${esc(item.evidence_label_raw)}` : ''}</dd></div><div><dt>Coding &amp; review</dt><dd>${esc(item.coding_basis || 'Not recorded')} · ${esc(item.coding_confidence || 'unrated')} confidence · ${esc(item.status)}</dd></div><div><dt>Levels &amp; functions</dt><dd>${esc(listLabels('levels', item.levels))} · ${esc(listLabels('functions', item.functions))}</dd></div><div><dt>Source runs</dt><dd>${esc((item.source_runs || []).join(', ') || 'Not recorded')}</dd></div>${claims.length ? `<div><dt>Linked claims</dt><dd>${claims.map(c => esc(`${c.id}: ${c.title}`)).join('<br>')}</dd></div>` : ''}${hypotheses.length ? `<div><dt>Linked hypotheses</dt><dd>${hypotheses.map(h => esc(`${h.id}: ${h.statement}`)).join('<br>')}</dd></div>` : ''}</dl>`;
  }

  function populateFilters() {
    const specs = [
      ['filter-track', 'tracks', 'track'], ['filter-function', 'functions', 'function'], ['filter-level', 'levels', 'level'], ['filter-region', 'regions', 'region'], ['filter-reading', 'cd_reading', 'reading'], ['filter-change', 'change_type', 'change'], ['filter-evidence', 'evidence_labels', 'evidence']
    ];
    specs.forEach(([id, vocab, key]) => {
      const select = $(`#${id}`);
      (data.vocabularies[vocab] || []).forEach(item => select.insertAdjacentHTML('beforeend', `<option value="${esc(item.id)}">${esc(item.label)}</option>`));
      select.value = state.filters[key];
      select.addEventListener('change', () => { state.filters[key] = select.value; state.focusIds.clear(); state.focusSource = null; renderTimeline(); });
    });
    $('#filter-review').value = state.filters.review;
    $('#filter-review').addEventListener('change', event => { state.filters.review = event.target.value; renderTimeline(); });
    $('#timeline-search').value = state.filters.search;
    $('#timeline-search').addEventListener('input', event => { state.filters.search = event.target.value.trim(); renderTimeline(); });
    $('#show-noncanonical').checked = state.showNoncanonical;
    $('#show-noncanonical').addEventListener('change', event => { state.showNoncanonical = event.target.checked; renderTimeline(); });
    $('#reset-filters').addEventListener('click', resetFilters);
    $('#stronger-preset').setAttribute('aria-pressed', String(state.stronger));
    $('#stronger-preset').addEventListener('click', () => { state.stronger = !state.stronger; $('#stronger-preset').setAttribute('aria-pressed', String(state.stronger)); renderTimeline(); });
  }

  function resetFilters() {
    Object.assign(state.filters, { track: 'all', function: 'all', level: 'all', region: 'all', reading: 'all', change: 'all', evidence: 'all', review: 'all', search: '' });
    state.showNoncanonical = false; state.stronger = false; state.focusIds.clear(); state.focusSource = null;
    $$('#timeline-section select').forEach(select => select.value = 'all');
    $('#timeline-search').value = ''; $('#show-noncanonical').checked = false; $('#stronger-preset').setAttribute('aria-pressed', 'false');
    renderTimeline();
  }

  function renderStats() {
    const canonical = data.milestones.filter(item => item.canonical);
    const undated = canonical.filter(item => item.timeline_placement === 'undated').length;
    const review = canonical.filter(item => item.needs_review).length;
    const stats = [[canonical.length, 'canonical milestones'], [undated, 'kept in the undated lane'], [review, 'await researcher review'], [data.papersCount, 'bibliographic entries']];
    $('#stat-grid').innerHTML = stats.map(([value, label]) => `<article class="stat"><strong>${esc(value)}</strong><span>${esc(label)}</span></article>`).join('');
  }

  function renderFramework() {
    $('#framework-primer').innerHTML = [
      ['Axis 1 · continuity/disruption', 'Continuity, disruption, layering, mixed and unclear stay distinct. Persistence is not assumed to be good.'],
      ['Axis 2 · interpretation', 'Beneficial or harmful is always stated for a named group. Contradictory readings may coexist.'],
      ['Levels & functions', 'Micro, meso and macro readings cross education, research and outreach; tensions between levels are first-class evidence.']
    ].map(([title, text]) => `<article class="primer-card"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('');
    const canonical = data.milestones.filter(item => item.canonical);
    renderMatrix('level-reading-matrix', data.vocabularies.levels.map(x => x.id), data.vocabularies.cd_reading.map(x => x.id), (row, col) => canonical.filter(item => item.levels.includes(row) && item.cd_reading === col).length, 'levels', 'cd_reading', (row, col) => applyMatrixFilter('level', row, 'reading', col));
    $('#function-level-matrix').classList.add('function-matrix');
    renderMatrix('function-level-matrix', data.vocabularies.functions.map(x => x.id), data.vocabularies.levels.map(x => x.id), (row, col) => canonical.filter(item => item.functions.includes(row) && item.levels.includes(col)).length, 'functions', 'levels', (row, col) => applyMatrixFilter('function', row, 'level', col));
    $('#tension-strip').innerHTML = [
      ['Interpretive tension', 'Research advantage', 'Individual speed and capability may coexist with a narrower collective research agenda.'],
      ['Interpretive tension', 'Wider access', 'Expanded access may coexist with more academic workload and weaker institutional care.'],
      ['Interpretive tension', 'Open knowledge', 'Public access may coexist with private control over discovery, metrics and infrastructure.']
    ].map(([label, title, text]) => `<article class="tension-card"><span>${esc(label)}</span><strong>${esc(title)}</strong><small>${esc(text)}</small></article>`).join('');
  }

  function renderMatrix(id, rows, cols, count, rowVocab, colVocab, onClick) {
    const root = $(`#${id}`);
    root.innerHTML = `<div class="matrix-row"><span></span>${cols.map(col => `<span class="matrix-label">${esc(vocabMap(colVocab, col))}</span>`).join('')}</div>${rows.map(row => `<div class="matrix-row"><span class="matrix-label">${esc(vocabMap(rowVocab, row))}</span>${cols.map(col => `<button class="matrix-cell" type="button" data-row="${esc(row)}" data-col="${esc(col)}"><strong>${count(row, col)}</strong><small>milestones</small></button>`).join('')}</div>`).join('')}`;
    $$('.matrix-cell', root).forEach(button => button.addEventListener('click', () => onClick(button.dataset.row, button.dataset.col)));
  }

  function applyMatrixFilter(keyA, valueA, keyB, valueB) {
    resetFilters();
    state.filters[keyA] = valueA; state.filters[keyB] = valueB;
    $(`#filter-${keyA}`).value = valueA; $(`#filter-${keyB}`).value = valueB;
    renderTimeline();
    $('#timeline-section').scrollIntoView({ behavior: 'smooth' });
  }

  function paperCitation(paper) {
    const authors = (paper.authors || []).slice(0, 3).join(', ') + ((paper.authors || []).length > 3 ? ' et al.' : '');
    const label = `${authors || 'Unknown author'} (${paper.year || 'n.d.'}). ${paper.title}. ${paper.journal || ''}`.trim();
    return paper.url ? `<a href="${esc(paper.url)}" target="_blank" rel="noopener">${esc(label)}</a>${paper.venue_flag ? ` <span class="venue-flag">${esc(paper.venue_flag)}</span>` : ''}` : esc(label);
  }

  function claimSources(claim) {
    const papers = (claim.paper_ids || []).map(id => data.selectedPapers.get(id)).filter(Boolean);
    const primary = data.primarySources.filter(source => source.claim_ids.includes(claim.id));
    return `<details class="source-trail"><summary>Evidence trail</summary><p><strong>Status:</strong> ${esc(claim.confidence)} confidence · ${esc(claim.stability)}<br><strong>Evidence type:</strong> ${esc(titleCase(claim.pattern))}<br><strong>Caveat:</strong> ${esc(claim.caveats)}<br><strong>Runs:</strong> ${esc(claim.supporting_runs.join(', ') || 'None listed')}<br><strong>Linked milestones:</strong> ${esc(claim.supporting_milestone_ids.join(', ') || 'None listed')}<br><strong>Hypotheses:</strong> ${esc(claim.hypothesis_ids.join(', ') || 'None')}</p>${papers.length || primary.length ? `<ul>${papers.map(paper => `<li>${paperCitation(paper)}</li>`).join('')}${primary.map(source => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener">${esc(`${source.organisation} (${source.year}). ${source.title}`)}</a> — ${esc(source.note)}</li>`).join('')}</ul>` : '<p>No claim-specific paper is assigned; inspect the linked runs and milestones.</p>'}</details>`;
  }

  function renderClaims() {
    $('#claim-grid').innerHTML = data.claims.map(claim => `<article class="claim-card"><div class="claim-meta"><span>${esc(claim.id)} · ${esc(claim.confidence)} confidence</span><span>${esc(titleCase(claim.pattern))}</span></div><h3>${esc(claim.title)}</h3><p>${esc(claim.statement)}</p>${claimSources(claim)}<button class="secondary-button" type="button" data-focus-claim="${esc(claim.id)}">Highlight ${claim.supporting_milestone_ids.length} milestones</button></article>`).join('');
    $$('[data-focus-claim]').forEach(button => button.addEventListener('click', () => focusEvidence('claim', button.dataset.focusClaim)));
    $('#hypothesis-list').innerHTML = data.hypotheses.map(h => `<details class="hypothesis"><summary><span class="hypothesis-id">${esc(h.id)}</span><strong>${esc(h.statement)}</strong><small>${esc(titleCase(h.status))}</small></summary><div class="hypothesis-body"><p><strong>What points toward it</strong><br>${esc(h.evidence_pointing_toward)}</p><p><strong>Limits</strong><br>${esc(h.limits)}</p><p><strong>Next test</strong><br>${esc(h.next_test)}</p><button class="secondary-button" type="button" data-focus-hypothesis="${esc(h.id)}">Highlight ${h.milestone_ids.length} linked milestones</button></div></details>`).join('');
    $$('[data-focus-hypothesis]').forEach(button => button.addEventListener('click', () => focusEvidence('hypothesis', button.dataset.focusHypothesis)));
    $('#lag-list').innerHTML = data.lags.map(lag => `<div class="lag-item"><strong>${esc(lag.id)}</strong>${esc(lag.statement.replace(/86\.7 percent|100 million|under one-third/gi, 'an unverified reported figure'))}</div>`).join('');
  }

  function focusEvidence(type, id) {
    const record = type === 'claim' ? data.claims.find(x => x.id === id) : data.hypotheses.find(x => x.id === id);
    state.focusIds = new Set(type === 'claim' ? record.supporting_milestone_ids : record.milestone_ids);
    state.focusSource = id;
    const first = [...state.focusIds][0];
    if (first) state.selectedId = first;
    renderTimeline();
    $('#timeline-section').scrollIntoView({ behavior: 'smooth' });
  }

  function renderQuality() {
    const canonical = data.milestones.filter(item => item.canonical);
    const high = data.flags.filter(flag => flag.severity === 'high');
    $('#quality-flags').innerHTML = high.map(flag => `<article class="quality-flag"><strong>${esc(flag.id)} · ${esc(titleCase(flag.category))}</strong><p>${esc(flag.text)}</p></article>`).join('');
    const regionCounts = new Map();
    canonical.forEach(item => item.regions.forEach(region => regionCounts.set(region, (regionCounts.get(region) || 0) + 1)));
    const regions = [...regionCounts].sort((a, b) => b[1] - a[1]);
    const max = Math.max(...regions.map(x => x[1]), 1);
    $('#region-coverage').innerHTML = regions.map(([region, count]) => `<div class="bar-row"><span>${esc(vocabMap('regions', region))}</span><span class="bar-track"><span style="width:${(count / max) * 100}%"></span></span><strong>${count}</strong></div>`).join('');
    const modeCounts = ['deep', 'pro', 'unknown', 'n/a'].map(mode => [mode, data.runs.filter(run => run.mode === mode).length]);
    $('#run-coverage').innerHTML = `<div class="coverage-metric">${modeCounts.map(([mode, count]) => `<div><strong>${count}</strong><span>${esc(vocabMap('run_mode', mode))} runs</span></div>`).join('')}</div><p class="quality-note">Deep and Pro results are not comparable coverage totals: repeated prompts returned substantially different paper sets.</p>`;
    const reviewed = canonical.filter(item => !item.needs_review).length;
    const stated = canonical.filter(item => item.date_certainty === 'stated').length;
    $('#review-coverage').innerHTML = `<div class="coverage-metric"><div><strong>${reviewed}</strong><span>without a review flag</span></div><div><strong>${canonical.length - reviewed}</strong><span>await review</span></div><div><strong>${stated}</strong><span>with stated dates</span></div><div><strong>0</strong><span>verified against papers</span></div></div><p class="quality-note">“Unclear” is a result when the source does not support a continuity/disruption judgement.</p>`;
    $('#gap-count').textContent = `(${data.gaps.length})`;
    $('#gap-grid').innerHTML = data.gaps.map(gap => `<article class="gap-card"><strong>${esc(gap.id)} · ${esc(titleCase(gap.level))}</strong>${esc(gap.gap)}</article>`).join('');
  }

  async function loadBibliography() {
    if (!state.bibliography) {
      $('#bibliography-status').textContent = 'Loading bibliographic facts…';
      try {
        state.bibliography = (await fetchJSON('papers.json')).papers;
      } catch (error) {
        $('#bibliography-status').textContent = 'The bibliography could not be loaded. The rest of the inquiry remains available.';
        return;
      }
      $('#load-bibliography').hidden = true;
      ['bib-search-label', 'bib-run-label', 'bib-flag-label'].forEach(id => $(`#${id}`).hidden = false);
      data.runs.filter(run => run.id !== 'run-8e-not-run').forEach(run => $('#bib-run').insertAdjacentHTML('beforeend', `<option value="${esc(run.id)}">${esc(run.id)} · ${esc(titleCase(run.mode))}</option>`));
      $('#bib-search').addEventListener('input', renderBibliography);
      $('#bib-run').addEventListener('change', renderBibliography);
      $('#bib-flag').addEventListener('change', renderBibliography);
    }
    renderBibliography();
  }

  function renderBibliography() {
    const query = $('#bib-search').value.trim().toLowerCase();
    const run = $('#bib-run').value;
    const flag = $('#bib-flag').value;
    const matches = state.bibliography.filter(paper => {
      if (run !== 'all' && !paper.cited_in_runs.includes(run)) return false;
      if (flag === 'unflagged' && paper.venue_flag) return false;
      if (flag === 'flagged' && !paper.venue_flag) return false;
      if (query && ![paper.title, ...(paper.authors || []), paper.journal, paper.doi].join(' ').toLowerCase().includes(query)) return false;
      return true;
    });
    const visible = matches.slice(0, 120);
    $('#bibliography-status').textContent = `${matches.length} entries match${matches.length > visible.length ? ` · showing the first ${visible.length}; refine the filters` : ''}.`;
    $('#bibliography').innerHTML = visible.map(paper => `<article class="bib-item">${paperCitation(paper)}<p>${paper.cited_in_runs.join(', ')} · cited in ${paper.n_runs || paper.cited_in_runs.length} run${(paper.n_runs || paper.cited_in_runs.length) === 1 ? '' : 's'}${paper.parse_quality === 'approximate' ? ' · approximate parse' : ''}</p></article>`).join('');
  }

  function renderGlossary() {
    const terms = data.glossary.terms || data.glossary.glossary || [];
    $('#glossary').innerHTML = terms.map(term => `<div><dt>${esc(term.term || term.label || term.id)}</dt><dd>${esc(term.definition || term.description || '')}</dd></div>`).join('');
  }

  async function initData() {
    const files = ['milestones.json', 'claims_synthesis.json', 'hypotheses.json', 'quality_flags.json', 'gaps.json', 'lags.json', 'runs.json', 'framework.json', 'vocabularies.json', 'indexes.json', 'glossary.json', 'selected_papers.json', 'primary_sources.json'];
    const [milestones, claims, hypotheses, flags, gaps, lags, runs, framework, vocabularies, indexes, glossary, selectedPapers, primarySources] = await Promise.all(files.map(fetchJSON));
    const vocabMaps = {};
    Object.entries(vocabularies).forEach(([key, values]) => { if (Array.isArray(values)) vocabMaps[key] = new Map(values.map(item => [item.id, item.label])); });
    data = {
      milestones: milestones.milestones, claims: claims.claims, hypotheses: hypotheses.hypotheses, flags: flags.flags,
      gaps: gaps.gaps, lags: lags.lags, runs: runs.runs, framework, vocabularies, vocabMaps, indexes, glossary,
      selectedPapers: new Map(selectedPapers.papers.map(paper => [paper.pid, paper])), primarySources: primarySources.sources,
      byMilestone: new Map(milestones.milestones.map(item => [item.id, item])), papersCount: 847
    };
    populateFilters(); renderStats(); renderTimeline(); renderFramework(); renderClaims(); renderQuality(); renderGlossary();
    $('#load-bibliography').addEventListener('click', loadBibliography);
  }

  function bindBaseEvents() {
    $$('.mode-button').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode, true)));
    $('#slide-prev').addEventListener('click', () => { if (state.slide > 0) { state.slide -= 1; renderSlide(); } });
    $('#slide-next').addEventListener('click', () => { if (state.slide < slides.length - 1) { state.slide += 1; renderSlide(); } });
    document.addEventListener('keydown', event => {
      if (state.mode !== 'presentation' || $('dialog[open]') || /INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName)) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') $('#slide-next').click();
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') $('#slide-prev').click();
    });
    const dialog = $('#methods-dialog');
    $('#methods-open').addEventListener('click', () => dialog.showModal());
    $$('[data-close]').forEach(button => button.addEventListener('click', () => $(`#${button.dataset.close}`).close()));
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    $('#share-state').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href); showToast('View link copied'); }
      catch { showToast('Copy unavailable; use the address bar'); }
    });
  }

  restoreURL(); bindBaseEvents(); renderSlide(); setMode(state.mode);
  initData().catch(error => {
    console.error(error);
    $('#exploration').innerHTML = `<div class="evidence-banner"><strong>Data could not be loaded.</strong><span>The static inquiry package may be missing or malformed. Presentation mode remains available.</span></div>`;
    setMode('presentation');
    showToast('Inquiry data could not be loaded');
  });
})();
