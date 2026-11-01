(() => {
  const data = window.DESIGNERLY_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const topics = [
    {id:'landscape', label:'Landscape', title:'Design research is a landscape, not a ladder.', intro:'Compare orientations by what they attend to, how they involve people, and what each can overlook.', type:'landscape'},
    {id:'reasoning', label:'Reasoning', title:'Designerly inquiry combines several logics.', intro:'Deduction, induction, and abduction do different work. Design becomes distinctive when frames and possible responses are developed together.', type:'reasoning'},
    {id:'knowledge', label:'Knowing', title:'Knowledge differs in how readily it can be expressed.', intro:'Inspect what each layer can support, how it might become available, and what remains uncertain.', type:'knowledge'},
    {id:'expression', label:'Expression', title:'Say, do, and make are complementary paths.', intro:'Cross a form of expression with a temporal orientation. The combination changes what can become discussable.', type:'expression'},
    {id:'tools', label:'Tools', title:'Choose tools for the knowing they can support.', intro:'Sixteen examples show that format, social arrangement, time orientation, and interpretive risk belong inside method selection.', type:'tools'},
    {id:'process', label:'Process', title:'A generative inquiry is staged and revisable.', intro:'The six movements connect framing, expression, provocation, imagination, interpretation, and return.', type:'process'},
    {id:'analysis', label:'Analysis', title:'Material becomes knowledge through interpretive work.', intro:'Follow the bridge from situated phenomena to provisional claims and back into inquiry.', type:'analysis'},
    {id:'conditions', label:'Conditions', title:'Research design shapes expression and interpretation.', intro:'Inspect the conditions that influence whose knowledge appears, in what form, and with what authority.', type:'conditions'},
    {id:'case', label:'D4.1 case', title:'Democracy Labs make the designed conditions visible.', intro:'Use the worked illustration to connect protocol, artefacts, participant experience, published analysis, and limits.', type:'case'}
  ];

  const state = {mode:'presentation', slide:0, topic:'landscape', item:null, time:'present', filter:'All', source:'foundations', reading:'All'};

  function parseState() {
    const params = new URLSearchParams(location.search);
    if (['presentation','exploration'].includes(params.get('mode'))) state.mode = params.get('mode');
    const slide = Number(params.get('step'));
    if (Number.isInteger(slide) && slide >= 1 && slide <= data.slides.length) state.slide = slide - 1;
    if (topics.some(topic => topic.id === params.get('topic'))) state.topic = params.get('topic');
    state.item = params.get('item');
    if (['memories','present','dreams'].includes(params.get('time'))) state.time = params.get('time');
    if (params.get('filter')) state.filter = params.get('filter');
  }

  function writeState(replace = true) {
    const params = new URLSearchParams();
    params.set('mode', state.mode);
    if (state.mode === 'presentation') params.set('step', state.slide + 1);
    else {
      params.set('topic', state.topic);
      if (state.item) params.set('item', state.item);
      if (state.topic === 'expression') params.set('time', state.time);
      if (state.topic === 'tools' && state.filter !== 'All') params.set('filter', state.filter);
    }
    history[replace ? 'replaceState' : 'pushState']({}, '', `${location.pathname}?${params}`);
  }

  function visual(type) {
    const visuals = {
      landscape: `<div class="diagram landscape" role="img" aria-label="A design research landscape connecting research-led, designerly, and participatory orientations"><div class="field">Research<br>led</div><div class="field">Designerly<br>inquiry</div><div class="field">Participation<br>led</div></div>`,
      coevolution: `<div class="diagram coevolution" role="img" aria-label="Problem framing and possible responses shaping one another"><div class="bubble">Problem frame</div><div class="exchange" aria-hidden="true">↔</div><div class="bubble">Possible response</div></div>`,
      reflection: `<div class="diagram reflection-diagram" role="img" aria-label="A reflective loop through action, consequence, attention, and reframing"><span>Act</span><span>Notice</span><span>Judge</span><span>Reframe</span><div class="reflection-loop"></div></div>`,
      reasoning: `<div class="diagram reasoning-diagram" role="img" aria-label="Deduction, induction, and abduction contributing different forms of reasoning"><span>Deduce<small>consequences</small></span><span>Induce<small>patterns</small></span><strong>Abduce<small>possibilities</small></strong></div>`,
      depth: `<div class="diagram depth-stack" role="img" aria-label="Layers of explicit, observable, tacit, and latent knowledge"><div class="layer">Explicit</div><div class="layer">Observable</div><div class="layer">Tacit</div><div class="layer">Latent</div></div>`,
      saydomake: `<div class="diagram venn" role="img" aria-label="Overlapping forms of expression: say, do, and make"><span>Say</span><span>Do</span><span>Make</span></div>`,
      process: `<div class="diagram process-line" role="img" aria-label="A path through sensitising, sensemaking, provotyping, and futuring"><div class="phase">Sensitising<small>revisit experience</small></div><div class="phase">Sensemaking<small>externalise and compare</small></div><div class="phase">Provotyping<small>expose assumptions</small></div><div class="phase">Futuring<small>develop possibilities</small></div></div>`,
      bridge: `<div class="diagram bridge-mini" role="img" aria-label="Interpretive bridge from traces to patterns, insights, and possibilities"><span>Traces</span><span>Patterns</span><span>Insights</span><span>Possibilities</span></div>`,
      conditions: `<div class="diagram conditions-orbit" role="img" aria-label="Designed inquiry surrounded by prompts, materials, time, people, ethics, and context"><strong>Designed<br>inquiry</strong><span>Prompts</span><span>Materials</span><span>Time</span><span>People</span><span>Ethics</span><span>Context</span></div>`,
      open: `<div class="diagram" role="img" aria-label="An open loop representing situated, plausible, and revisable knowledge"><div class="open-loop"><strong>Situated, plausible, revisable</strong></div></div>`
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

  function detail(item, fields = []) {
    return `<article class="item-detail"><p class="eyebrow">Selected view</p><h3>${esc(item.title || item.label)}</h3><p>${esc(item.text || item.contribution || item.aim || '')}</p>${fields.filter(field => item[field.key]).map(field => `<div class="detail-row"><strong>${esc(field.label)}</strong><span>${esc(item[field.key])}</span></div>`).join('')}</article>`;
  }

  function selectedFrom(items) {
    const selected = items.find(item => item.id === state.item) || items[0];
    state.item = selected.id;
    return selected;
  }

  function buttons(items, className = 'item-controls') {
    const selected = selectedFrom(items);
    return `<div class="${className}">${items.map(item => `<button type="button" data-item="${esc(item.id)}" aria-pressed="${item.id === selected.id}">${esc(item.label)}</button>`).join('')}</div>`;
  }

  function renderLandscape() {
    const selected = selectedFrom(data.landscape);
    return `<div class="landscape-axis" aria-hidden="true"><span>Research-led</span><span>Participatory</span><span>Design-led</span></div>${buttons(data.landscape,'landscape-grid')}${detail(selected,[{key:'orientation',label:'Orientation'},{key:'concern',label:'Primary concern'},{key:'caution',label:'Question to keep open'}])}`;
  }

  function renderReasoning() {
    const selected = selectedFrom(data.reasoning);
    return `${buttons(data.reasoning,'reasoning-grid')}<article class="item-detail formula-detail"><p class="formula">${esc(selected.formula)}</p><h3>${esc(selected.title)}</h3><p>${esc(selected.text)}</p><div class="detail-row"><strong>Ask</strong><span>${esc(selected.question)}</span></div><div class="detail-row"><strong>Limit</strong><span>${esc(selected.limit)}</span></div></article>`;
  }

  function renderKnowledge() {
    const selected = selectedFrom(data.knowledge);
    return `${buttons(data.knowledge,'depth-view')}<article class="item-detail"><p class="eyebrow">${esc(selected.depth)} · ${esc(selected.expression)}</p><h3>${esc(selected.title)}</h3><p>${esc(selected.text)}</p><div class="detail-row"><strong>Useful move</strong><span>${esc(selected.use)}</span></div><div class="detail-row"><strong>Inquiry question</strong><span>${esc(selected.question)}</span></div><div class="detail-row"><strong>Interpretive caution</strong><span>${esc(selected.caution)}</span></div></article>`;
  }

  function renderExpression() {
    const selected = selectedFrom(data.expression.forms);
    const time = data.expression.times.find(item => item.id === state.time) || data.expression.times[1];
    return `<div class="expression-workspace"><div class="expression-forms">${data.expression.forms.map(item => `<button type="button" data-item="${item.id}" aria-pressed="${item.id === selected.id}">${item.label}</button>`).join('')}</div><div class="time-forms">${data.expression.times.map(item => `<button type="button" data-time="${item.id}" aria-pressed="${item.id === time.id}">${item.label}</button>`).join('')}</div></div><article class="item-detail"><p class="eyebrow">${esc(selected.label)} across ${esc(time.label.toLowerCase())}</p><h3>${esc(selected.title)}</h3><p>${esc(selected.text)} ${esc(time.text)}</p><div class="detail-row"><strong>Produces</strong><span>${esc(selected.produces)}</span></div><div class="detail-row"><strong>Blind spot</strong><span>${esc(selected.blindspot)}</span></div></article>`;
  }

  function renderTools() {
    const filters = ['All','Say','Do','Make','Group','Future'];
    const matches = data.tools.filter(tool => state.filter === 'All' || (state.filter === 'Group' ? tool.social.includes('Group') : state.filter === 'Future' ? tool.time.includes('future') || tool.time.includes('Future') : tool.family.includes(state.filter)));
    if (!matches.some(item => item.id === state.item)) state.item = matches[0]?.id || data.tools[0].id;
    const selected = matches.find(item => item.id === state.item) || matches[0];
    return `<div class="tool-filters" role="group" aria-label="Filter tools">${filters.map(filter => `<button type="button" data-filter="${filter}" aria-pressed="${state.filter === filter}">${filter}</button>`).join('')}</div><div class="tool-browser"><div class="tool-list">${matches.map(tool => `<button type="button" data-item="${tool.id}" aria-pressed="${tool.id === selected.id}"><span>${esc(tool.family)}</span><strong>${esc(tool.label)}</strong><small>${esc(tool.time)} · ${esc(tool.social)}</small></button>`).join('')}</div><article class="item-detail tool-detail"><p class="eyebrow">${esc(selected.family)} · ${esc(selected.time)}</p><h3>${esc(selected.label)}</h3><p>${esc(selected.purpose)}</p><div class="detail-row"><strong>Arrangement</strong><span>${esc(selected.social)}</span></div><div class="detail-row"><strong>Materials</strong><span>${esc(selected.material)}</span></div><div class="detail-row"><strong>Produces</strong><span>${esc(selected.output)}</span></div><div class="detail-row"><strong>Caution</strong><span>${esc(selected.caution)}</span></div></article></div>`;
  }

  function renderProcess() {
    const selected = selectedFrom(data.process);
    return `${buttons(data.process,'process-browser')}<article class="item-detail"><p class="eyebrow">Movement ${esc(selected.number)}</p><h3>${esc(selected.label)}</h3><p>${esc(selected.aim)}</p><div class="move-grid">${selected.moves.map(move => `<span>${esc(move)}</span>`).join('')}</div><div class="detail-row"><strong>Produces</strong><span>${esc(selected.produces)}</span></div><div class="detail-row"><strong>Watch</strong><span>${esc(selected.watch)}</span></div></article>`;
  }

  function renderAnalysis() {
    const selected = selectedFrom(data.analysisMoves);
    return `${buttons(data.analysisMoves,'analysis-flow')}<article class="item-detail"><p class="eyebrow">${esc(selected.input)} → ${esc(selected.output)}</p><h3>${esc(selected.label)}</h3><p>${esc(selected.work)}</p><div class="detail-row"><strong>Interpretive risk</strong><span>${esc(selected.risk)}</span></div></article>`;
  }

  function renderConditions() {
    const selected = selectedFrom(data.conditions);
    return `${buttons(data.conditions,'condition-grid')}<article class="item-detail"><p class="eyebrow">Designed condition</p><h3>${esc(selected.title)}</h3><p class="lead-question">${esc(selected.question)}</p><p>${esc(selected.text)}</p><div class="detail-row"><strong>Inspect</strong><span>${esc(selected.inspect)}</span></div></article>`;
  }

  function renderCaseOverview() {
    const summary = data.democracyLabs.summary;
    return `<article class="case-overview"><p class="eyebrow">INCITE-DEM D4.1 · worked illustration</p><h3>${esc(summary.title)}</h3><p>${esc(summary.text)}</p><div class="case-metrics">${summary.scope.map(item => `<div><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span><small>${esc(item.note)}</small></div>`).join('')}</div><button class="secondary-button" type="button" data-jump-case>Explore the full case below</button></article>`;
  }

  function renderTopicBody(topic) {
    return ({landscape:renderLandscape,reasoning:renderReasoning,knowledge:renderKnowledge,expression:renderExpression,tools:renderTools,process:renderProcess,analysis:renderAnalysis,conditions:renderConditions,case:renderCaseOverview}[topic.type] || (() => ''))();
  }

  function bindStageControls() {
    $$('[data-item]', $('#explore-stage')).forEach(button => button.addEventListener('click', () => {state.item = button.dataset.item; renderExploreStage(); writeState(false);}));
    $$('[data-time]', $('#explore-stage')).forEach(button => button.addEventListener('click', () => {state.time = button.dataset.time; renderExploreStage(); writeState(false);}));
    $$('[data-filter]', $('#explore-stage')).forEach(button => button.addEventListener('click', () => {state.filter = button.dataset.filter; state.item = null; renderExploreStage(); writeState(false);}));
    $('[data-jump-case]', $('#explore-stage'))?.addEventListener('click', () => $('#case').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}));
  }

  function renderExploreStage() {
    const topic = topics.find(item => item.id === state.topic) || topics[0];
    $('#explore-stage').innerHTML = `<div class="explore-head"><p class="eyebrow">${esc(topic.label)}</p><h2>${esc(topic.title)}</h2><p>${esc(topic.intro)}</p></div><div class="interactive-area">${renderTopicBody(topic)}</div>`;
    bindStageControls();
  }

  function renderTopicTabs() {
    $('#topic-tabs').innerHTML = topics.map(topic => `<button class="topic-tab" type="button" role="tab" aria-selected="${topic.id === state.topic}" data-topic="${topic.id}">${esc(topic.label)}</button>`).join('');
    $$('.topic-tab').forEach(button => button.addEventListener('click', () => {state.topic = button.dataset.topic; state.item = null; state.filter = 'All'; renderTopicTabs(); renderExploreStage(); writeState(false);}));
  }

  function renderQuestions() {
    $('#question-list').innerHTML = data.questions.map(question => `<button type="button" data-route="${question.route}">${esc(question.label)}</button>`).join('');
    $$('[data-route]', $('#question-list')).forEach(button => button.addEventListener('click', () => {state.topic = button.dataset.route; state.item = null; renderTopicTabs(); renderExploreStage(); writeState(false); $('#topic-tabs').scrollIntoView({block:'nearest'});}));
  }

  function renderCorpus() {
    const labels = {lenses:'exploration lenses',concepts:'conceptual elements',tools:'tools and formats',conditions:'designed conditions',caseEvidence:'case evidence points',sources:'substantive sources'};
    $('#corpus-strip').innerHTML = Object.entries(data.corpus).map(([key,value]) => `<div><strong>${value}</strong><span>${labels[key]}</span></div>`).join('');
  }

  function renderCase(selectedId = 'sensitising') {
    const caseData = data.democracyLabs;
    const selected = caseData.stages.find(item => item.id === selectedId) || caseData.stages[0];
    $('#case-process').innerHTML = caseData.stages.map(item => `<button type="button" data-case="${item.id}" aria-pressed="${item.id === selected.id}"><span>${item.number}</span><strong>${esc(item.label)}</strong></button>`).join('');
    $('#case-detail').innerHTML = `<p class="eyebrow">D4.1 activity system</p><h3>${esc(selected.label)}</h3><p class="lead-question">${esc(selected.intent)}</p><div class="case-columns"><div><strong>Activities</strong><ul>${selected.activities.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div><div><strong>Artefacts</strong><ul>${selected.artefacts.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div></div><div class="detail-row"><strong>What becomes knowable</strong><span>${esc(selected.knowing)}</span></div><div class="detail-row"><strong>Published evidence</strong><span>${esc(selected.evidence)}</span></div><div class="case-cautions"><strong>Interpretive limit.</strong> ${esc(selected.limit)}</div>`;
    $$('[data-case]').forEach(button => button.addEventListener('click', () => renderCase(button.dataset.case)));
    $('#case-evidence').innerHTML = `<div class="case-condition-tabs">${caseData.conditions.map(item => `<details><summary>${esc(item.label)}</summary><p><strong>Designed:</strong> ${esc(item.designed)}</p><p><strong>Revealed:</strong> ${esc(item.revealed)}</p><p><strong>Implication:</strong> ${esc(item.implication)}</p></details>`).join('')}</div><div class="evidence-ledger"><h3>Evidence ledger</h3>${caseData.evidence.map(item => `<article><p class="eyebrow">${esc(item.kind)}</p><h4>${esc(item.claim)}</h4><p><strong>Basis:</strong> ${esc(item.basis)}</p><p><strong>Supports:</strong> ${esc(item.supports)}</p><p><strong>Does not support:</strong> ${esc(item.doesNotSupport)}</p></article>`).join('')}</div><div class="proposal-grid"><h3>Six proposals carried forward</h3>${caseData.proposals.map(item => `<article><h4>${esc(item.name)}</h4><p>${esc(item.focus)}</p><small>${esc(item.question)}</small></article>`).join('')}</div>`;
  }

  function renderReading(filter = state.reading) {
    state.reading = filter;
    const groups = ['All', ...new Set(data.articleInsights.map(item => item.group))];
    $('#reading-filters').innerHTML = groups.map(group => `<button type="button" data-reading="${esc(group)}" aria-pressed="${group === filter}">${esc(group)}</button>`).join('');
    const sources = filter === 'All' ? data.articleInsights : data.articleInsights.filter(item => item.group === filter);
    $('#reading-grid').innerHTML = sources.map(item => `<article class="reading-card"><p class="eyebrow">${esc(item.kind)} · ${esc(item.year)}</p><h3>${esc(item.title)}</h3><p class="byline">${esc(item.author)}</p><p><strong>Question.</strong> ${esc(item.question)}</p><details><summary>Method, contribution, and tension</summary><p><strong>Approach.</strong> ${esc(item.method)}</p><p><strong>Contribution.</strong> ${esc(item.contribution)}</p><p><strong>Tension.</strong> ${esc(item.tension)}</p></details><a href="${esc(item.url)}" target="_blank" rel="noopener">Open publication record ↗</a></article>`).join('');
    $$('[data-reading]').forEach(button => button.addEventListener('click', () => renderReading(button.dataset.reading)));
  }

  function renderTrajectory() {
    $('#teaching-path').innerHTML = data.inquiryTrajectory.map(item => `<li><span>${item.step}</span><div><strong>${esc(item.label)}</strong><p>${esc(item.question)}</p><small>${esc(item.publicValue)}</small></div></li>`).join('');
  }

  function renderExplore() {
    renderCorpus(); renderTopicTabs(); renderExploreStage(); renderQuestions(); renderCase(); renderReading(); renderTrajectory();
  }

  function sourceCard(item) {
    return `<article class="source-item"><p class="eyebrow">${esc(item.kind)} · ${esc(item.year)}</p><h3>${esc(item.author)}. ${esc(item.title)}.</h3><p>${esc(item.contribution)}</p><p class="source-limit"><strong>Keep open:</strong> ${esc(item.tension)}</p><a href="${esc(item.url)}" target="_blank" rel="noopener">Publication record ↗</a></article>`;
  }

  function renderSources() {
    $('#source-tabs').innerHTML = data.sourceGroups.map(group => `<button class="source-tab" type="button" role="tab" data-source="${group.id}" aria-selected="${group.id === state.source}">${esc(group.label)}</button>`).join('');
    const group = data.sourceGroups.find(item => item.id === state.source) || data.sourceGroups[0];
    if (group.custom) {
      $('#source-content').innerHTML = `<div class="source-list"><p>${esc(group.intro)}</p>${data.furtherMaterials.map(item => `<article class="source-item"><p class="eyebrow">${esc(item.type)}</p><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><a href="${esc(item.url)}" target="_blank" rel="noopener">Open resource ↗</a></article>`).join('')}<div class="limits-panel"><h3>Construction and publication limits</h3><p>The local source decks were inspected as arguments and visual systems. The landscape, knowledge-depth, say/do/make, path-of-expression, process, bridge, and designed-conditions diagrams were reconstructed as accessible HTML and CSS rather than republished as slide images.</p><p>Participant photographs, workshop artefacts with uncertain publication consent, consent documents, personal information, private links, and local source files were excluded.</p><ol>${data.limits.map(limit => `<li>${esc(limit)}</li>`).join('')}</ol></div></div>`;
    } else {
      const items = group.sourceIds.map(id => data.articleInsights.find(item => item.id === id)).filter(Boolean);
      $('#source-content').innerHTML = `<div class="source-list"><p>${esc(group.intro)}</p>${items.map(sourceCard).join('')}</div>`;
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
  $$('[data-bridge]').forEach(button => button.addEventListener('click', () => {$$('[data-bridge]').forEach(item => item.classList.remove('is-active')); button.classList.add('is-active'); $('#bridge-note').textContent = data.bridge[button.dataset.bridge];}));
  $('#sources-open').addEventListener('click', () => {renderSources(); $('#sources-dialog').showModal();});
  $$('[data-close]').forEach(button => button.addEventListener('click', () => $(`#${button.dataset.close}`).close()));
  $('#sources-dialog').addEventListener('click', event => {if (event.target === $('#sources-dialog')) $('#sources-dialog').close();});
  $('#share-state').addEventListener('click', async () => {try {await navigator.clipboard.writeText(location.href); showToast('View link copied');} catch {showToast('Copy unavailable; use the address bar');}});
  window.addEventListener('popstate', () => {parseState(); setMode(state.mode);});
  setMode(state.mode);
  requestAnimationFrame(() => window.scrollTo(0, 0));
})();
