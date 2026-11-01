(() => {
  const data = window.DESIGNERLY_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  const state = {mode:'presentation', slide:0, topic:'map', item:null, time:'present', source:'conceptual'};

  function parseState() {
    const params = new URLSearchParams(location.search);
    if (['presentation','exploration'].includes(params.get('mode'))) state.mode = params.get('mode');
    const slide = Number(params.get('step'));
    if (Number.isInteger(slide) && slide >= 1 && slide <= data.slides.length) state.slide = slide - 1;
    if (data.topics.some(topic => topic.id === params.get('topic'))) state.topic = params.get('topic');
    state.item = params.get('item');
    if (['memories','present','dreams'].includes(params.get('time'))) state.time = params.get('time');
  }

  function writeState(replace = true) {
    const params = new URLSearchParams();
    params.set('mode', state.mode);
    if (state.mode === 'presentation') params.set('step', state.slide + 1);
    else {
      params.set('topic', state.topic);
      if (state.item) params.set('item', state.item);
      if (state.topic === 'expression') params.set('time', state.time);
    }
    history[replace ? 'replaceState' : 'pushState'](null, '', `${location.pathname}?${params}`);
  }

  function visual(type) {
    const visuals = {
      landscape: `<div class="diagram landscape" role="img" aria-label="Overlapping fields of research, design, and participation"><div class="field">Research<br>led</div><div class="field">Designerly<br>inquiry</div><div class="field">Participation<br>led</div></div>`,
      coevolution: `<div class="diagram coevolution" role="img" aria-label="Problem framing and possible responses shaping one another"><div class="bubble">Problem frame</div><div class="exchange" aria-hidden="true">↔</div><div class="bubble">Possible response</div></div>`,
      reflection: `<div class="diagram" role="img" aria-label="A loop from action to consequence, attention, and reframing"><div class="reflection-loop"></div></div>`,
      depth: `<div class="diagram depth-stack" role="img" aria-label="Layers of explicit, observable, tacit, and latent knowledge"><div class="layer">Explicit</div><div class="layer">Observable</div><div class="layer">Tacit</div><div class="layer">Latent</div></div>`,
      saydomake: `<div class="diagram venn" role="img" aria-label="Overlapping forms of expression: say, do, and make"><span>Say</span><span>Do</span><span>Make</span></div>`,
      expression: `<div class="diagram expression-path" role="img" aria-label="A path from memories through present experience to possible futures"><div class="moment">Memories</div><i>→</i><div class="moment">Present experience</div><i>→</i><div class="moment">Possible futures</div></div>`,
      process: `<div class="diagram process-line" role="img" aria-label="Four stages: sensitising, sensemaking, provotyping, and futuring"><div class="phase">Sensitising<small>revisit experience</small></div><div class="phase">Sensemaking<small>externalise and compare</small></div><div class="phase">Provotyping<small>expose assumptions</small></div><div class="phase">Futuring<small>develop possibilities</small></div></div>`,
      bridge: `<div class="diagram bridge-mini" role="img" aria-label="Interpretive bridge from traces to patterns, insights, and possibilities"><span>Traces</span><span>Patterns</span><span>Insights</span><span>Possibilities</span></div>`,
      conditions: `<div class="diagram conditions-orbit" role="img" aria-label="Designed inquiry surrounded by prompts, materials, time, people, ethics, and context"><strong>Designed<br>inquiry</strong><span>Prompts</span><span>Materials</span><span>Time</span><span>People</span><span>Ethics</span><span>Context</span></div>`,
      open: `<div class="diagram" role="img" aria-label="An open loop representing provisional knowledge"><div class="open-loop"><strong>Situated, plausible, revisable</strong></div></div>`
    };
    return visuals[type] || '';
  }

  function renderSlide() {
    const slide = data.slides[state.slide];
    $('#deck').innerHTML = `<article class="slide"><div class="slide-copy"><p class="eyebrow">${esc(slide.eyebrow)}</p><h1>${esc(slide.title)}</h1><p>${esc(slide.copy)}</p><p class="slide-note">${esc(slide.note)}</p></div><div class="slide-visual">${visual(slide.visual)}</div></article>`;
    $('#slide-count').textContent = `${state.slide + 1} / ${data.slides.length}`;
    $('#progress-bar').style.width = `${((state.slide + 1) / data.slides.length) * 100}%`;
    $('#slide-prev').disabled = state.slide === 0;
    $('#slide-next').disabled = state.slide === data.slides.length - 1;
    writeState();
  }

  function setMode(mode, push = false) {
    state.mode = mode;
    $$('.mode-button').forEach(button => {
      const active = button.dataset.mode === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $('#presentation').hidden = mode !== 'presentation';
    $('#exploration').hidden = mode !== 'exploration';
    if (mode === 'exploration') renderExplore(); else renderSlide();
    if (push) window.scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    writeState(!push);
  }

  function renderTopicTabs() {
    $('#topic-tabs').innerHTML = data.topics.map(topic => `<button class="topic-tab" type="button" role="tab" aria-selected="${topic.id === state.topic}" data-topic="${esc(topic.id)}">${esc(topic.label)}</button>`).join('');
    $$('.topic-tab').forEach(button => button.addEventListener('click', () => {
      state.topic = button.dataset.topic;
      state.item = null;
      renderExplore();
      writeState(false);
    }));
  }

  function itemDetail(item, extra = '') {
    return `<article class="item-detail"><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>${extra}</article>`;
  }

  function selectable(items, className = 'item-controls') {
    const selected = items.find(item => item.id === state.item) || items[0];
    state.item = selected?.id || null;
    return `<div class="${className}">${items.map(item => `<button class="${className === 'item-controls' ? 'item-button' : ''}" type="button" data-item="${esc(item.id)}" aria-pressed="${item.id === selected.id}">${esc(item.label)}</button>`).join('')}</div>${itemDetail(selected, selected.question ? `<p class="case-cautions"><strong>Inquiry prompt:</strong> ${esc(selected.question)}</p>` : '')}`;
  }

  function renderTopicBody(topic) {
    if (topic.type === 'map') {
      const selected = topic.items.find(item => item.id === state.item) || topic.items[0];
      state.item = selected.id;
      return `<div class="map-view">${topic.items.map(item => `<button class="map-node" type="button" data-item="${esc(item.id)}" aria-pressed="${item.id === selected.id}">${esc(item.label)}</button>`).join('')}</div>${itemDetail(selected)}`;
    }
    if (topic.type === 'depth') return selectable(topic.items, 'depth-view');
    if (topic.type === 'process') return selectable(topic.items);
    if (topic.type === 'conditions') return selectable(topic.items, 'condition-grid');
    if (topic.type === 'expression') {
      const selected = topic.items.find(item => item.id === state.item) || topic.items[0];
      state.item = selected.id;
      const time = topic.times.find(item => item.id === state.time) || topic.times[1];
      return `<div class="expression-workspace"><div class="expression-forms">${topic.items.map(item => `<button type="button" data-item="${esc(item.id)}" aria-pressed="${item.id === selected.id}">${esc(item.label)}</button>`).join('')}</div><div class="time-forms">${topic.times.map(item => `<button type="button" data-time="${esc(item.id)}" aria-pressed="${item.id === time.id}">${esc(item.label)}</button>`).join('')}</div></div>${itemDetail({title:`${selected.title} across ${time.label.toLowerCase()}`,text:`${selected.text} ${time.text}`})}`;
    }
    if (topic.type === 'case') {
      setTimeout(() => $('#case').scrollIntoView({behavior:'smooth',block:'start'}), 0);
      return `<article class="item-detail"><h3>Applied, not universal</h3><p>Use the case navigator below to inspect how each stage worked and where the published evidence records resistance, asymmetry, or constraint.</p></article>`;
    }
    return '';
  }

  function bindItemControls() {
    $$('[data-item]', $('#explore-stage')).forEach(button => button.addEventListener('click', () => {
      state.item = button.dataset.item;
      renderExploreStage();
      writeState(false);
    }));
    $$('[data-time]', $('#explore-stage')).forEach(button => button.addEventListener('click', () => {
      state.time = button.dataset.time;
      renderExploreStage();
      writeState(false);
    }));
  }

  function renderExploreStage() {
    const topic = data.topics.find(item => item.id === state.topic) || data.topics[0];
    $('#explore-stage').innerHTML = `<div class="explore-head"><p class="eyebrow">${esc(topic.label)}</p><h2>${esc(topic.title)}</h2><p>${esc(topic.intro)}</p></div><div class="interactive-area">${renderTopicBody(topic)}</div>`;
    bindItemControls();
  }

  function renderQuestions() {
    $('#question-list').innerHTML = data.questions.map((question, index) => `<button type="button" data-question="${index}">${esc(question)}</button>`).join('');
    $$('[data-question]').forEach(button => button.addEventListener('click', () => {
      $$('[data-question]').forEach(item => item.classList.remove('is-active'));
      button.classList.add('is-active');
      const routes = ['knowledge','knowledge','expression','conditions','process','bridge','conditions','map'];
      const route = routes[Number(button.dataset.question)];
      if (route === 'bridge') $('#bridge-title').scrollIntoView({behavior:'smooth'});
      else { state.topic = route; state.item = null; renderExplore(); writeState(false); }
    }));
  }

  function renderCase(selectedId = 'sensitising') {
    const selected = data.caseStages.find(item => item.id === selectedId) || data.caseStages[0];
    $('#case-process').innerHTML = data.caseStages.map(item => `<button type="button" data-case="${esc(item.id)}" aria-pressed="${item.id === selected.id}"><span>${esc(item.number)}</span><strong>${esc(item.label)}</strong></button>`).join('');
    $('#case-detail').innerHTML = `<p class="eyebrow">Designed condition</p><h3>${esc(selected.label)}</h3><p>${esc(selected.text)}</p><div class="case-cautions"><strong>Interpretive limit.</strong> Positive evaluations describe participant experience. They do not, by themselves, prove that a method was effective or that resulting imaginaries were representative.</div>`;
    $$('[data-case]').forEach(button => button.addEventListener('click', () => renderCase(button.dataset.case)));
  }

  function renderExplore() {
    renderTopicTabs();
    renderExploreStage();
    renderQuestions();
    renderCase();
    $('#teaching-path').innerHTML = data.teaching.map(item => `<li>${esc(item)}</li>`).join('');
  }

  function renderSources() {
    $('#source-tabs').innerHTML = data.sourceGroups.map(group => `<button class="source-tab" type="button" role="tab" data-source="${esc(group.id)}" aria-selected="${group.id === state.source}">${esc(group.label)}</button>`).join('');
    const group = data.sourceGroups.find(item => item.id === state.source) || data.sourceGroups[0];
    if (group.custom) {
      $('#source-content').innerHTML = `<div class="limits-panel"><p class="construction-note">The source decks were inspected as arguments and as visual systems. Repeated process diagrams were consolidated. Simple diagrams were rebuilt as accessible HTML and CSS. Participant photographs, artefacts with uncertain publication consent, consent documents, private links, and local source files were excluded.</p><h3>Deliberate limits</h3><ol>${data.limits.map(limit => `<li>${esc(limit)}</li>`).join('')}</ol></div>`;
    } else {
      $('#source-content').innerHTML = `<div class="source-list"><p>${esc(group.intro)}</p>${group.sources.map(source => `<article class="source-item"><h3>${esc(source.authors)} (${esc(source.year)}). ${esc(source.title)}.</h3><p>${esc(source.venue)}.</p><p>${esc(source.note)}</p><a href="${esc(source.url)}" target="_blank" rel="noopener">Publication record ↗</a></article>`).join('')}</div>`;
    }
    $$('.source-tab').forEach(button => button.addEventListener('click', () => {state.source = button.dataset.source; renderSources();}));
  }

  function showToast(message) {
    const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible');
    clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }

  parseState();
  $$('.mode-button').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode, true)));
  $('#slide-prev').addEventListener('click', () => {if (state.slide > 0) {state.slide -= 1; renderSlide();}});
  $('#slide-next').addEventListener('click', () => {if (state.slide < data.slides.length - 1) {state.slide += 1; renderSlide();}});
  document.addEventListener('keydown', event => {
    if (state.mode !== 'presentation' || $('dialog[open]') || /INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName)) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') $('#slide-next').click();
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') $('#slide-prev').click();
  });
  $$('[data-bridge]').forEach(button => button.addEventListener('click', () => {
    $$('[data-bridge]').forEach(item => item.classList.remove('is-active'));
    button.classList.add('is-active'); $('#bridge-note').textContent = data.bridge[button.dataset.bridge];
  }));
  $('#sources-open').addEventListener('click', () => {renderSources(); $('#sources-dialog').showModal();});
  $$('[data-close]').forEach(button => button.addEventListener('click', () => $(`#${button.dataset.close}`).close()));
  $('#sources-dialog').addEventListener('click', event => {if (event.target === $('#sources-dialog')) $('#sources-dialog').close();});
  $('#share-state').addEventListener('click', async () => {
    try {await navigator.clipboard.writeText(location.href); showToast('View link copied');}
    catch {showToast('Copy unavailable; use the address bar');}
  });
  window.addEventListener('popstate', () => {parseState(); setMode(state.mode);});
  setMode(state.mode);
  requestAnimationFrame(() => window.scrollTo(0, 0));
})();
