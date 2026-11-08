(async () => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let D;
  try {
    const response = await fetch('data/content.json');
    if (!response.ok) throw new Error('Content unavailable');
    D = await response.json();
  } catch {
    $('#state-notice').hidden = false;
    $('#state-notice').innerHTML = 'The interactive edition could not load. <a href="reading.html">Read the complete inquiry, evidence and sources in the reading edition.</a>';
    $('#sources-open').hidden = true;
    return;
  }
  const registry = names => Object.fromEntries(Object.entries(names).map(([key, name]) => [key, new Map(D[name].map(record => [record.id, record]))]));
  const M = registry({sources:'sources', claims:'claims', concepts:'concepts', relations:'conceptRelations', steps:'presentation', instances:'instances', activities:'activities', statements:'statements', journeys:'journeys', gaps:'gaps', levels:'levels', stakeholders:'stakeholders', artefacts:'artefactTypes', functions:'epistemicFunctions', statuses:'evidenceStatuses', questions:'questionPaths', methods:'methodFamilies', tensions:'tensions', figures:'figureViews', scopes:'scopes', caseRelations:'caseRelations'});
  const facetConfig = [['level','levelRefs',D.levels,'Level'],['stakeholder','stakeholderRefs',D.stakeholders,'Stakeholder'],['phase','phaseRefs',D.activities,'Activity'],['artefact','artefactRefs',D.artefactTypes,'Artefact'],['function','functionRefs',D.epistemicFunctions,'Epistemic function'],['status','evidenceStatuses',D.evidenceStatuses,'Evidence status']];
  const unique = items => [...new Set(items)];
  const modeNames = {presentation:'Presentation', explore:'Explore', labs:'Democracy Labs'};
  let params, mode, notices = [], routeKey = '', sourceInvoker, sourceReturn;
  let positions = {};
  try { positions = JSON.parse(sessionStorage.getItem('dwk-positions') || '{}'); } catch {}
  const currentStep = () => M.steps.get(params.get('step')) || D.presentation[0];
  const selectedFacets = () => Object.fromEntries(facetConfig.map(([key]) => [key,(params.get(key) || '').split(',').filter(Boolean)]));
  const matches = (record, facets) => facetConfig.every(([key,field]) => !facets[key].length || facets[key].some(id => (record[field] || []).includes(id)));
  const stopStatements = stop => [...(stop?.statementRefs || []), ...(stop?.parallelStatementRefs || [])].map(id => M.statements.get(id));
  const activeStop = () => M.journeys.get(params.get('journey'))?.stops?.find(s => s.id === params.get('at'));
  const compareRecords = () => (params.get('compare') || '').split(',').map(id => M.instances.get(id) || M.statements.get(id)).filter(Boolean);
  function caseClaims() {
    if (params.get('view') === 'journey') return unique(stopStatements(activeStop()).flatMap(s => s.claimRefs));
    if (params.get('view') === 'compare') return unique(compareRecords().flatMap(r => r.claimRefs));
    if (params.get('view') === 'system') return M.activities.get(params.get('activity'))?.claimRefs || [];
    if (params.get('view') === 'overview') return unique(D.case.orientation.flatMap(x => x.claimRefs));
    return M.instances.get(params.get('instance'))?.claimRefs || [];
  }
  function normalise() {
    params = new URLSearchParams(location.search); notices = [];
    const discard = (key, message) => { params.delete(key); notices.push(message || `An unrecognised ${key} selection was removed. The valid part of this link is retained.`); };
    if (params.has('v') && params.get('v') !== '1') {
      params = new URLSearchParams('v=1&mode=presentation&step=S01&display=reading'); notices.push(D.uiCopy.unknownVersion);
    }
    const allowed = new Set(D.navigation.url.canonicalParameterOrder);
    for (const key of unique([...params.keys()])) {
      if (!allowed.has(key)) { discard(key, 'An unrecognised part of this link was removed.'); continue; }
      const values = params.getAll(key);
      if (values.length > 1) {
        params.set(key, D.navigation.url.arrayParameters.includes(key) ? values.join(',') : values[0]);
        notices.push(`Repeated ${key} values were combined or reduced to one selection.`);
      }
    }
    if (params.has('dlv') && params.get('dlv') !== '1') {
      D.navigation.url.labs.forEach(key => params.delete(key));
      params.set('dlv','1'); params.set('view','overview');
      notices.push('This case link uses an unsupported version. The case orientation is open; valid Presentation and Explore selections are retained.');
    }
    for (const [key, values] of Object.entries(D.navigation.url.enums)) if (params.has(key) && !values.includes(params.get(key))) discard(key);
    const ids = {step:'steps',question:'questions',efunction:'functions',method:'methods',movement:'activities',tension:'tensions',concept:'concepts',relation:'relations',instance:'instances',activity:'activities',journey:'journeys',source:'sources',fromConcept:'concepts'};
    for (const [key,map] of Object.entries(ids)) if (params.has(key) && !M[map].has(params.get(key))) discard(key);
    for (const [key,,records] of facetConfig) {
      const raw = (params.get(key) || '').split(',').filter(Boolean);
      const clean = unique(raw.filter(id => records.some(r => r.id === id))).sort();
      if (raw.some(id => !clean.includes(id))) notices.push(`Unrecognised ${key} filters were removed.`);
      if (clean.length) params.set(key, clean.join(',')); else params.delete(key);
    }
    if (params.has('compare')) {
      const pair = params.get('compare').split(',');
      const validPair = pair.length === 2 && pair[0] !== pair[1] && (pair.every(id => M.instances.has(id)) || pair.every(id => /^I10-s[2-5]$/.test(id)));
      if (!validPair) discard('compare','Choose two different instances, or two institutional response statements, to compare.');
    }
    params.set('v','1');
    if (!params.has('mode')) params.set('mode','presentation');
    mode = params.get('mode');
    if (!params.has('step') && (mode === 'presentation' || params.has('pclaim'))) params.set('step','S01');
    if (mode === 'presentation' && !params.has('display')) params.set('display','reading');
    if (mode === 'explore' && !params.has('entry')) params.set('entry',params.has('concept') ? 'concept' : 'question');
    if (mode === 'labs') {
      params.set('dlv','1');
      if (!params.has('view')) params.set('view',params.has('compare') ? 'compare' : params.has('journey') ? 'journey' : params.has('activity') ? 'system' : params.has('instance') ? 'instances' : 'overview');
    }
    const relation = M.relations.get(params.get('relation'));
    if (relation && ![relation.from,relation.to].includes(params.get('concept'))) {
      params.set('concept',relation.from);
      notices.push('The relation is shown from its originating concept.');
    }
    const journey = M.journeys.get(params.get('journey'));
    if (params.get('view') === 'journey' && journey?.stops?.length) {
      let stop = journey.stops.find(s => s.id === params.get('at'));
      if (params.has('at') && !stop) notices.push('That stop does not belong to this journey. The first matching documented stop is open.');
      stop ||= journey.stops.find(s => s.instanceId === params.get('instance')) || journey.stops[0];
      if (params.has('instance') && params.get('instance') !== stop.instanceId) notices.push('The selected journey stop determines its case instance. The conflicting instance selection was replaced.');
      params.set('at',stop.id); params.set('instance',stop.instanceId);
    } else if (params.has('at') && !journey?.stops?.some(s => s.id === params.get('at'))) discard('at');
    const concept = M.concepts.get(params.get('concept'));
    const claimContexts = {pclaim:currentStep().claimRefs, eclaim:unique([...(concept?.claimRefs || []),...(relation?.claimRefs || [])]), claim:caseClaims()};
    for (const [key,refs] of Object.entries(claimContexts)) if (params.has(key) && !refs.includes(params.get(key))) discard(key,'A claim unrelated to the selected record was removed. The record remains open.');
    if (params.has('eclaim')) params.set('conceptDepth','evidence');
    if (params.has('claim')) params.set('depth','evidence');
  }
  function url(patch = {}) {
    const p = new URLSearchParams(params);
    for (const [key,value] of Object.entries(patch)) value === null || value === undefined || value === '' ? p.delete(key) : p.set(key,String(value));
    const ordered = new URLSearchParams();
    for (const key of D.navigation.url.canonicalParameterOrder) if (p.has(key)) ordered.set(key,p.get(key));
    return `${location.pathname}?${ordered.toString()}`;
  }
  const link = (label, patch, cls = '', attrs = '') => `<a href="${esc(url(patch))}"${cls ? ` class="${cls}"` : ''}${attrs ? ` ${attrs}` : ''}>${esc(label)}</a>`;
  const cross = (destination, patch = {}) => ({mode:destination,...(destination !== mode ? {returnTo:mode, source:null} : {}),...patch});
  const conceptLink = id => link(M.concepts.get(id)?.label || id,cross('explore',{entry:'concept',concept:id,relation:null,conceptDepth:'summary',eclaim:null,graphView:'relations'}));
  const caseLink = (id, fromConcept) => link(M.instances.get(id)?.title || id,cross('labs',{dlv:1,view:'instances',instance:id,depth:'summary',claim:null,...(mode === 'explore' ? {fromConcept:fromConcept || params.get('concept')} : {})}));
  const journeyPatch = (id, stop) => { const j=M.journeys.get(id); const s=stop || j.stops?.[0]; return cross('labs',{dlv:1,view:'journey',journey:id,at:s?.id,instance:s?.instanceId,claim:null,depth:'summary'}); };
  const activityLink = id => link(M.activities.get(id)?.label || id,cross('labs',{dlv:1,view:'system',activity:id,depth:'summary',claim:null}));
  const statusBadges = refs => `<ul class="status-list" aria-label="Evidence status">${(refs || []).map(id => `<li class="status">${esc(M.statuses.get(id)?.label || id)}</li>`).join('')}</ul>`;
  const copyButton = '<button type="button" data-copy>Copy link</button>';
  const claimKey = () => mode === 'presentation' ? 'pclaim' : mode === 'explore' ? 'eclaim' : 'claim';
  const claimLink = id => link(`${id}: ${M.claims.get(id).text}`,{[claimKey()]:id,...(mode === 'explore' ? {conceptDepth:'evidence'} : mode === 'labs' ? {depth:'evidence'} : {})},'', 'data-focus-evidence');
  function returnLink() {
    const dest=params.get('returnTo'); if (!dest || dest === mode) return '';
    let label=modeNames[dest];
    if (dest === 'presentation') label=currentStep().title;
    if (dest === 'explore') label=M.concepts.get(params.get('fromConcept') || params.get('concept'))?.label || M.questions.get(params.get('question'))?.question || label;
    if (dest === 'labs') label=(params.get('view') === 'journey' ? M.journeys.get(params.get('journey'))?.title : params.get('view') === 'system' ? M.activities.get(params.get('activity'))?.label : M.instances.get(params.get('instance'))?.title) || label;
    return link(`Return to ${label}`,{mode:dest,returnTo:null,fromConcept:null},'return-link','data-return');
  }
  function sourceLinks(evidence) {
    return `<ul class="citations">${(evidence || []).map(e => { const s=M.sources.get(e.sourceId); return `<li>${link(s.citation,{source:s.id},'', 'data-source')}<span class="locator">${esc(e.locator)}</span></li>`; }).join('')}</ul>`;
  }
  function evidenceBlock(refs, open = false, suffix = '') {
    refs=unique(refs); if (!refs.length) return '';
    const selected=params.get(claimKey()), claim=M.claims.get(refs.includes(selected) ? selected : refs[0]);
    return `<details class="evidence-block"${open || refs.includes(selected) ? ' open' : ''}><summary>Grounds and limits · ${refs.length} linked ${refs.length === 1 ? 'claim' : 'claims'}</summary><section><h3 tabindex="-1" id="evidence-heading${suffix}">${esc(claim.id)} · Evidence for this reading</h3><p>${esc(claim.text)}</p><dl class="evidence-facts"><dt>Kind of evidence</dt><dd>${esc(claim.evidenceKind || (claim.evidenceStatuses || []).map(id => M.statuses.get(id).label).join('; ') || 'Bounded case evidence')}</dd><dt>Qualification</dt><dd>${esc(claim.qualification)}</dd>${claim.tension ? `<dt>Counterpoint</dt><dd>${esc(claim.tension)}</dd>` : ''}<dt>Confidence and scope</dt><dd>${esc(claim.confidence)}</dd></dl>${sourceLinks(claim.evidence)}${refs.length > 1 ? `<details><summary>All claims attached to this record</summary><ul class="claim-list">${refs.map(id => `<li>${claimLink(id)}</li>`).join('')}</ul></details>` : ''}</section></details>`;
  }
  function depthNav(kind = 'labs') {
    const key=kind === 'explore' ? 'conceptDepth' : 'depth', values=kind === 'explore' ? ['summary','relations','evidence'] : D.navigation.depths;
    return `<nav class="depth-nav" aria-label="Reading depth">${values.map(d => link(d[0].toUpperCase()+d.slice(1),{[key]:d,[kind === 'explore' ? 'eclaim' : 'claim']:null},'', (params.get(key) || 'summary') === d ? 'aria-current="page"' : '')).join('')}</nav>`;
  }
  function modeHeading(eyebrow, title, description, actions = '') {
    return `<header class="mode-heading"><div><p class="eyebrow">${esc(eyebrow)}</p>${title ? `<h2>${esc(title)}</h2>` : ''}${description ? `<p>${esc(description)}</p>` : ''}</div><div class="mode-actions">${actions}</div></header>`;
  }
  function renderFigure(step) {
    return step.figureViewRefs.map(id => {
      const f=M.figures.get(id), flow=['FV01','FV05','FV17C','FV21'].includes(id), paired=['FV03','FV04','FV06','FV13','FV18'].includes(id);
      const row = (cells,i) => `<div class="figure-row"${id === 'FV13' ? ` data-invitation-row="${i}"` : ''}><h4>${flow ? `<span class="figure-number" aria-hidden="true">${i+1}</span>` : ''}${esc(cells[0])}</h4><dl>${cells.slice(1).map((cell,j) => `<div><dt>${esc(f.columns[j+1])}</dt><dd>${esc(cell)}</dd></div>`).join('')}</dl></div>`;
      return `<figure class="figure figure-${flow ? 'flow' : paired ? 'paired' : 'matrix'}" aria-labelledby="figure-${id}"><div class="figure-heading"><span class="eyebrow">${f.kind === 'illustration' ? 'Illustrative example' : f.kind === 'case-reconstruction' ? 'Case reconstruction' : 'Relations to examine'}</span><h3 id="figure-${id}">${esc(f.label)}</h3></div>${id === 'FV13' ? '<div class="chips invitation-controls" aria-label="Foreground an illustrative invitation"><button type="button" data-invitation="0" aria-pressed="false">Invitation A</button><button type="button" data-invitation="1" aria-pressed="false">Invitation B</button></div>' : ''}<div class="figure-rows">${f.rows.map(row).join('')}</div><figcaption>${esc(f.caption)}</figcaption></figure>`;
    }).join('');
  }
  function presentation() {
    const step=currentStep(), i=D.presentation.indexOf(step), prev=D.presentation[i-1], next=D.presentation[i+1], display=params.get('display') || 'reading';
    const stepPatch=s => ({mode:'presentation',step:s.id,pclaim:null});
    const nav=`<nav class="step-nav" aria-label="Step navigation">${prev ? link('← Previous',stepPatch(prev),'nav-button',`aria-label="Previous step: ${esc(prev.title)}"`) : '<span></span>'}<span>${step.number} / ${D.presentation.length}</span>${next ? link('Next →',stepPatch(next),'nav-button',`aria-label="Next step: ${esc(next.title)}"`) : link('Explore →',cross('explore',{entry:'question',question:null}),'nav-button')}</nav>`;
    return `<section class="mode-shell">${modeHeading(`Presentation · ${step.number} of ${D.presentation.length}`,'','',`${returnLink()}<button type="button" data-projection>${display === 'projection' ? 'Exit projection' : 'Projection view'}</button>${copyButton}`)}<div class="presentation-grid"><details class="step-index"${innerWidth >= 1200 ? ' open' : ''}><summary>Argument outline · ${step.number} of 29</summary><nav aria-label="Presentation steps"><ol>${D.presentation.map(s => `<li>${link(`${String(s.number).padStart(2,'0')}  ${s.title}`,stepPatch(s),'',s.id === step.id ? 'aria-current="step"' : '')}</li>`).join('')}</ol></nav><p class="keyboard-help">While reading a step, use the left and right arrow keys to move through the argument.</p></details><article class="step-reader" id="${step.id}"><div class="step-composition"><div><p class="eyebrow">${esc(D.site.title)} · ${String(step.number).padStart(2,'0')}</p><h2 id="view-heading" tabindex="-1">${esc(step.title)}</h2><p class="step-copy">${esc(step.copy)}</p><aside class="qualification"><strong>Keep in view</strong><p>${esc(step.visibleQualification)}</p></aside></div><div class="step-figures">${renderFigure(step)}</div></div>${nav}<div class="step-support">${evidenceBlock(step.claimRefs)}<div class="related-reading"><h3>Explore the concepts</h3><div class="chips">${step.conceptRefs.map(conceptLink).join('')}</div>${step.caseRefs.length ? `<h3>Inspect the case</h3><ul>${step.caseRefs.map(id => `<li>${caseLink(id)}</li>`).join('')}</ul>` : ''}</div></div><p class="transition"><b>Next in the argument:</b> ${esc(step.transition)}</p>${step.id === 'S29' ? `<div class="case-questions">${link('How did this become evidence?',cross('explore',{entry:'question',question:'Q03',graphView:'relations'}))}${link('Who controlled the next transformation?',journeyPatch('J08'))}</div>` : ''}</article></div></section>`;
  }
  const exploreEntries=[['question','Questions'],['concept','Concepts'],['function','Epistemic functions'],['method','Method families'],['movement','Process movements'],['tension','Critical tensions']];
  function browseIndex(items, selected, patch, name) {
    return `<nav class="browse-index" aria-label="${name}"><ul>${items.map(([id,label]) => `<li>${link(label,{...patch,[name === 'Browse Explore' ? 'entry' : 'view']:id},'',id === selected ? 'aria-current="page"' : '')}</li>`).join('')}</ul></nav>`;
  }
  const listIndex=(records, label, description, patch) => `<div class="question-list">${records.map(r => `<a href="${esc(url(patch(r)))}"><span class="index-number">${esc(r.id)}</span><span><h3>${esc(label(r))}</h3><p>${esc(description(r))}</p></span><span aria-hidden="true">↗</span></a>`).join('')}</div>`;
  function conceptRelation(r) {
    return `<li id="${r.id}"><p class="relation-line">${conceptLink(r.from)} ${link(r.label,{relation:r.id,conceptDepth:'relations',eclaim:null},'relation-verb','data-focus-relation')} ${conceptLink(r.to)}</p><p>${esc(r.explanation)}</p><small>${esc(r.status)}</small></li>`;
  }
  function conceptRecord(c) {
    const depth=params.get('conceptDepth') || 'summary', rels=D.conceptRelations.filter(r => [r.from,r.to].includes(c.id)), selected=M.relations.get(params.get('relation'));
    const graph=params.get('graphView') === 'graph';
    const relationView=`<ul class="relation-list${graph ? ' local-graph' : ''}">${rels.slice(0,graph ? 6 : rels.length).map(conceptRelation).join('')}</ul>${graph && rels.length > 6 ? `<details><summary>${rels.length-6} more relations</summary><ul class="relation-list">${rels.slice(6).map(conceptRelation).join('')}</ul></details>` : ''}`;
    return `<article class="record"><p class="eyebrow">Concept · ${c.id}</p><h2 id="view-heading" tabindex="-1">${esc(c.label)}</h2><p class="definition">${esc(c.definition)}</p><aside class="qualification"><strong>What remains in tension</strong><p>${esc(c.tension)}</p></aside>${depthNav('explore')}${selected ? `<section class="selected-relation"><h3 id="relation-heading" tabindex="-1">${esc(M.concepts.get(selected.from).label)} ${esc(selected.label)} ${esc(M.concepts.get(selected.to).label)}</h3><p>${esc(selected.explanation)}</p><p>${esc(selected.status)}</p>${evidenceBlock(selected.claimRefs,false,'-relation')}</section>` : ''}<h3>Relations to inspect</h3>${depth !== 'summary' ? `<div class="chips">${link('Read all relations',{graphView:'relations'},'chip',!graph ? 'aria-current="page"' : '')}${link('Local connection view',{graphView:'graph'},'chip',graph ? 'aria-current="page"' : '')}</div>${relationView}` : `<ul class="relation-list">${rels.slice(0,3).map(conceptRelation).join('')}</ul>${link(`Inspect all ${rels.length} relations`,{conceptDepth:'relations'},'more-link')}`}<h3>Examine this in Democracy Labs</h3><ul class="bridges">${c.caseLinks.map(b => `<li><span class="eyebrow">${esc(b.kind.replaceAll('-',' '))}</span>${caseLink(b.instanceId,c.id)}<p>${esc(b.bridge)}</p></li>`).join('')}</ul>${evidenceBlock(c.claimRefs,depth === 'evidence')}</article>`;
  }
  function exploreEntry(entry) {
    if (entry === 'concept') {
      const c=M.concepts.get(params.get('concept'));
      return c ? conceptRecord(c) : `<h2 id="view-heading" tabindex="-1">Concept index</h2>${listIndex(D.concepts,c => c.label,c => c.definition,c => ({entry:'concept',concept:c.id,relation:null,conceptDepth:'summary',eclaim:null}))}`;
    }
    if (entry === 'question') {
      const q=M.questions.get(params.get('question'));
      if (!q) return `<h2 id="view-heading" tabindex="-1">What do you want to understand?</h2><p class="definition">Begin with a question. Follow its concepts, then inspect what the case can establish.</p>${listIndex(D.questionPaths,q => q.question,q => q.intro,q => ({entry:'question',question:q.id}))}`;
      return `<article class="record"><p class="eyebrow">Question · ${q.id}</p><h2 id="view-heading" tabindex="-1">${esc(q.question)}</h2><p class="definition">${esc(q.intro)}</p><h3>Concepts on this route</h3><div class="chips">${q.conceptRefs.map(conceptLink).join('')}</div><h3>Case connections</h3><ul class="result-list">${q.instanceRefs.map(id => `<li>${caseLink(id)}<p>${esc(M.instances.get(id).primaryLimit)}</p></li>`).join('')}</ul><h3>Follow the argument</h3><ul>${q.stepRefs.map(id => `<li>${link(M.steps.get(id).title,cross('presentation',{step:id,pclaim:null}))}</li>`).join('')}</ul></article>`;
    }
    const config={function:[D.epistemicFunctions,'efunction','Epistemic functions',r => r.status],method:[D.methodFamilies,'method','Method families',r => r.purpose],movement:[D.activities,'movement','Process movements',r => r.purpose],tension:[D.tensions,'tension','Critical tensions',r => `${r.positionA} ${r.positionB}`]};
    const [records,key,title,description]=config[entry], r=records.find(x => x.id === params.get(key));
    if (!r) return `<h2 id="view-heading" tabindex="-1">${title}</h2>${entry === 'movement' ? '<p>These activities may overlap or recur. Their order is a reading aid, not a universal process.</p>' : ''}${listIndex(records,r => r.label,description,r => ({entry,[key]:r.id}))}`;
    const instances=r.instanceRefs || (entry === 'movement' ? D.instances.filter(x => x.phaseRefs.includes(r.id)).map(x => x.id) : D.instances.filter(x => x.functionRefs.includes(r.id)).map(x => x.id));
    return `<article class="record"><p class="eyebrow">${title}</p><h2 id="view-heading" tabindex="-1">${esc(r.label)}</h2><p class="definition">${esc(description(r))}</p>${r.consequence ? `<p>${esc(r.consequence)}</p>` : ''}${r.caseNote ? `<aside class="qualification"><strong>Case boundary</strong><p>${esc(r.caseNote)}</p></aside>` : ''}<h3>Related concepts</h3><div class="chips">${r.conceptRefs.map(conceptLink).join('')}</div><h3>Case connections</h3><ul>${instances.map(id => `<li>${caseLink(id)}</li>`).join('')}</ul>${entry === 'movement' ? `<p>${activityLink(r.id)}</p>` : ''}${r.claimRefs ? evidenceBlock(r.claimRefs) : ''}</article>`;
  }
  function explore() {
    const entry=params.get('entry') || 'question';
    return `<section class="mode-shell">${modeHeading('Explore','Questions, concepts and relations',D.site.modeDescriptions.explore,`${returnLink()}${copyButton}`)}<div class="explore-grid">${browseIndex(exploreEntries,entry,{mode:'explore'},'Browse Explore')}<section>${exploreEntry(entry)}</section></div></section>`;
  }
  function levels() {
    return `<div class="levels">${D.levels.map((l,i) => `<article class="level"><span>0${i+1}</span><div><h3>${esc(l.label)}</h3><p><b>${esc(l.question)}</b></p></div><div><p>${esc(l.material)}</p><p class="muted">${esc(l.limit)}</p></div></article>`).join('')}</div>`;
  }
  function orientation(compact = false) {
    if (compact) return `<details class="compact-context"><summary>About this case: Democracy Labs explored possible participation arrangements.</summary><p>${esc(D.case.deepLinkOrientation)}</p>${D.case.orientation.map(x => `<p>${esc(x.text)}</p>`).join('')}${link('Read the full case orientation',{view:'overview',claim:null})}</details>`;
    return `<article class="orientation"><p class="eyebrow">Worked case</p><h2 id="view-heading" tabindex="-1">What were Democracy Labs?</h2>${D.case.orientation.map(x => `<p>${esc(x.text)}</p>`).join('')}<aside class="qualification"><strong>Reading boundary</strong><p>${esc(D.case.orientationLimit)}</p></aside>${levels()}<h3>Begin with a concrete question</h3><div class="case-questions">${D.case.entryQuestions.map(q => link(q.label,journeyPatch(q.journeyId))).join('')}</div>${evidenceBlock(unique(D.case.orientation.flatMap(x => x.claimRefs)))}</article>`;
  }
  const counts = facets => `${D.instances.filter(r => matches(r,facets)).length} case instances and ${D.activities.filter(r => matches(r,facets)).length} research conditions match the applied filters.`;
  function filterPanel(facets) {
    const active=facetConfig.flatMap(([key,,records]) => facets[key].map(id => link(`Remove ${records.find(r => r.id === id).label}`,{[key]:facets[key].filter(v => v !== id).join(',')},'filter-chip','data-filter-change')));
    return `<details class="filter-panel"><summary>Narrow the case record${active.length ? ` · ${active.length} applied` : ''}</summary><form id="filter-form"><p>Choose alternatives within a group. Selections across groups must all match. Counts refer to curated records, not people or independent studies.</p><div class="filter-groups">${facetConfig.map(([key,,records,label]) => `<fieldset><legend>${label}</legend>${records.map(r => `<label class="check"><input type="checkbox" name="${key}" value="${r.id}"${facets[key].includes(r.id) ? ' checked' : ''}><span>${esc(r.label)}</span></label>`).join('')}</fieldset>`).join('')}</div><div class="filter-actions"><button type="submit" id="apply-filters">Apply filters</button><button type="reset">Cancel changes</button><button type="button" data-clear-filters>Clear all filters</button></div></form></details>${active.length ? `<div class="applied-filters">${active.join('')}<button type="button" data-clear-filters>Clear all filters</button></div>` : ''}<p class="results-summary" id="results-summary">${counts(facets)}</p>`;
  }
  function scopes(refs, full = false) {
    return `<div class="scopes">${unique(refs || []).map(id => { const s=M.scopes.get(id); return `<section><h3>${esc(s.unit)}</h3><p>${esc(s.geography)} · ${esc(s.period)}</p><p class="scope-limit"><b>Scope:</b> ${esc(s.limit)}</p>${full && s.counts?.length ? `<ul>${s.counts.map(c => `<li><b>${c.value} ${esc(c.unit)}</b>. ${esc(c.denominator)} ${claimLink(c.claimRef)}</li>`).join('')}</ul>` : ''}</section>`; }).join('')}</div>`;
  }
  function stakeholderRole(s) {
    return `<details class="stakeholder-role"><summary>${esc(s.label)}</summary><dl class="evidence-facts"><dt>Contributes</dt><dd>${esc(s.contribution)}</dd><dt>Controls or decides</dt><dd>${esc(s.authority)}</dd><dt>Receives</dt><dd>${esc(s.receives)}</dd><dt>Asymmetry or absence</dt><dd>${esc(s.asymmetry)}</dd></dl>${sourceLinks(unique(s.claimRefs.flatMap(id => M.claims.get(id).evidence).map(e => JSON.stringify(e))).map(e => JSON.parse(e)))}</details>`;
  }
  function roles(inst) {
    return `<section class="roles"><h3>Who contributes, controls or receives?</h3><dl>${inst.stakeholderRoles.map(r => `<div><dt>${esc(M.stakeholders.get(r.stakeholderId).label)} <span>${esc(r.relation)}</span></dt><dd>${esc(r.account)}</dd></div>`).join('')}</dl><p class="muted">${esc(inst.roleLimit)}</p><details><summary>Inspect these stakeholder roles across the programme</summary>${unique(inst.stakeholderRefs).map(id => stakeholderRole(M.stakeholders.get(id))).join('')}</details></section>`;
  }
  function statementHtml(s, evidence = false) {
    return `<article class="fact" id="${s.id}"><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p>${statusBadges(s.evidenceStatuses)}${s.limits.length ? `<p class="muted"><b>Limit:</b> ${esc(s.limits.join(' '))}</p>` : ''}${evidence ? `<p class="muted">${esc(s.attribution)}</p>${sourceLinks(s.evidence)}` : ''}</article>`;
  }
  function gapHtml(id) {
    const g=M.gaps.get(id); return `<aside class="gap" data-gap="${id}"><strong>Where the evidence stops · ${id}</strong><h4>${esc(g.question)}</h4><p><b>Available:</b> ${esc(g.availableEvidence)}</p><p><b>Missing:</b> ${esc(g.missingEvidence)}</p><p>${esc(g.claimConsequence)}</p><p><b>Warranted reading:</b> ${esc(g.narrowerStatement)}</p></aside>`;
  }
  function caseRelations(ids) {
    if (!ids.length) return '';
    const endpoint=id => { const s=M.statements.get(id); return link(s.title,{view:'instances',instance:s.instanceId,depth:'transformation',claim:null}); };
    return `<section class="documented-relations"><h3>What connects these fragments?</h3><ul class="relation-list">${unique(ids).map(id => { const r=M.caseRelations.get(id); return `<li><p class="eyebrow">${esc(r.unitContinuity.replaceAll('-',' '))} · ${r.id}</p><h4>${esc(r.publicLabel)}</h4><p class="relation-endpoints"><b>From:</b> ${r.fromRefs.map(endpoint).join('; ')}<br><b>${r.type === 'thematic_comparison' ? 'Compared with' : 'To'}:</b> ${r.toRefs.map(endpoint).join('; ')}</p><p>${esc(r.explanation)}</p>${statusBadges(r.evidenceStatuses)}<details><summary>Source and limit for this relation</summary><p>${esc(r.limits.join(' '))}</p>${sourceLinks(r.evidence)}</details></li>`; }).join('')}</ul></section>`;
  }
  function caseConcepts(inst) {
    return `<h3>Concepts that help read this case</h3><ul class="bridges">${inst.conceptLinks.map(b => `<li><span class="eyebrow">${esc(b.kind.replaceAll('-',' '))}</span>${conceptLink(b.conceptId)}<p>${esc(b.bridge)}</p></li>`).join('')}</ul>`;
  }
  function instanceRecord(inst, facets) {
    const depth=params.get('depth') || 'summary';
    return `<article class="record"><p class="eyebrow">Case instance · ${inst.id}</p><h2 id="view-heading" tabindex="-1">${esc(inst.title)}</h2>${!matches(inst,facets) ? `<p class="outside">${esc(D.uiCopy.outsideFilters)}</p>` : ''}<p class="definition">${esc(inst.summary)}</p><aside class="qualification"><strong>Primary limit</strong><p>${esc(inst.primaryLimit)}</p></aside>${statusBadges(inst.evidenceStatuses)}<p><b>Source unit:</b> ${esc(inst.sourceUnit)}</p>${scopes(inst.scopeRefs,depth === 'evidence')}${depthNav()}${depth !== 'summary' ? `<h3>Statements and transformations</h3><div class="facts">${inst.statementRefs.map(id => statementHtml(M.statements.get(id),depth === 'evidence')).join('')}</div>${caseRelations(inst.relationRefs)}${roles(inst)}${inst.gapRefs.map(gapHtml).join('')}` : ''}${evidenceBlock(inst.claimRefs,depth === 'evidence')}${caseConcepts(inst)}<h3>Follow a journey</h3><ul>${inst.journeyRefs.map(id => { const j=M.journeys.get(id); return `<li>${link(j.title,journeyPatch(id,j.stops.find(s => s.instanceId === inst.id)))}</li>`; }).join('')}</ul><details><summary>Inspect the research conditions around this instance</summary><ul>${inst.phaseRefs.map(id => `<li>${activityLink(id)}</li>`).join('')}</ul></details>${params.has('activity') ? `<p class="context-link"><b>Retained research-condition context:</b> ${activityLink(params.get('activity'))}</p>` : ''}<p>${link('Return to the filtered record list',{instance:null,claim:null},'more-link')}</p></article>`;
  }
  function activityRecord(a, facets) {
    return `<article class="record"><p class="eyebrow">Research condition · ${a.id}</p><h2 id="view-heading" tabindex="-1">${esc(a.label)}</h2>${!matches(a,facets) ? `<p class="outside">${esc(D.uiCopy.outsideFilters)}</p>` : ''}<aside class="qualification"><strong>Limit</strong><p>${esc(a.limit)}</p></aside>${depthNav()}<div class="facts">${[['Purpose',a.purpose],['Invitation',a.invitation],['Traces',a.traces],['What could become knowable',a.possibleKnowledge],['Constraints',a.constraints],['Later transformation',a.laterTransformation]].map(([k,v]) => `<div class="fact"><h3>${k}</h3><p>${esc(v)}</p></div>`).join('')}</div>${statusBadges(a.evidenceStatuses)}${evidenceBlock(a.claimRefs,params.get('depth') === 'evidence')}<h3>Related concepts</h3><div class="chips">${a.conceptRefs.map(conceptLink).join('')}</div>${params.has('instance') ? `<p class="context-link"><b>Retained case context:</b> ${caseLink(params.get('instance'))}</p>` : ''}</article>`;
  }
  function resultLists(facets, system = false) {
    const inst=D.instances.filter(r => matches(r,facets)), acts=D.activities.filter(r => matches(r,facets));
    return `<h2 id="view-heading" tabindex="-1">${system ? 'Research conditions and authority' : 'Curated case record'}</h2>${!inst.length && !acts.length ? `<p class="gap">${esc(D.uiCopy.empty)}</p>` : ''}${system ? `<p>Activities overlap and recur. These five levels organise the evidence, without implying a fixed sequence.</p>${levels()}<details class="role-index"><summary>Stakeholders: contribution, authority, receipt and absence</summary>${D.stakeholders.map(stakeholderRole).join('')}</details>` : ''}<div class="result-lists">${!system ? `<section><h3>Case instances · ${inst.length}</h3><ul class="result-list">${inst.map(r => `<li>${caseLink(r.id)}<p>${esc(r.primaryLimit)}</p></li>`).join('')}</ul></section>` : ''}<section><h3>Research conditions · ${acts.length}</h3><ul class="result-list">${acts.map(r => `<li>${activityLink(r.id)}<p>${esc(r.limit)}</p></li>`).join('')}</ul></section></div>`;
  }
  function journeyView(facets) {
    const j=M.journeys.get(params.get('journey'));
    if (!j) return `<h2 id="view-heading" tabindex="-1">Concrete journeys</h2><p>These routes keep participant, artefact, interpretation and proposal journeys separate.</p>${listIndex(D.journeys,j => j.title,j => j.scopeWarning,j => journeyPatch(j.id))}`;
    if (j.branchRefs?.length) return `<article class="record"><h2 id="view-heading" tabindex="-1">${esc(j.title)}</h2><p>${esc(j.intro)}</p><div class="case-questions">${j.branchRefs.map(id => link(M.journeys.get(id).title,journeyPatch(id))).join('')}</div>${j.gapRefs.map(gapHtml).join('')}</article>`;
    const stop=activeStop(), index=j.stops.indexOf(stop), inst=M.instances.get(stop.instanceId), statements=stopStatements(stop), depth=params.get('depth') || 'summary';
    return `<article class="record"><p class="eyebrow">Journey · ${j.id} · ${index+1} of ${j.stops.length}</p><h2>${esc(j.title)}</h2><p>${esc(j.intro)}</p><aside class="qualification"><strong>Order and scope</strong><p>${esc(j.orderMeaning)} ${esc(j.scopeWarning)}</p></aside><nav class="journey-nav" aria-label="Journey stops">${j.stops.map((s,i) => link(`Stop ${i+1}`,{...journeyPatch(j.id,s),depth},'chip',s.id === stop.id ? 'aria-current="step"' : '')).join('')}</nav><h3 id="view-heading" tabindex="-1">Stop ${index+1}: ${esc(inst.title)}</h3>${!matches(inst,facets) ? `<p class="outside">${esc(D.uiCopy.outsideFilters)}</p>` : ''}<p><b>Source unit:</b> ${esc(inst.sourceUnit)}</p><p class="primary-limit"><b>Primary limit:</b> ${esc(inst.primaryLimit)}</p>${depthNav()}${stop.ordering ? `<aside class="gap"><strong>Parallel branches</strong><p>${esc(stop.ordering)}</p></aside>` : ''}<div class="facts">${statements.map(s => statementHtml(s,depth === 'evidence')).join('')}</div>${depth !== 'summary' ? `${caseRelations(j.relationRefs)}${roles(inst)}` : ''}${(stop.gapAfter || []).map(gapHtml).join('')}${evidenceBlock(unique(statements.flatMap(s => s.claimRefs)),depth === 'evidence')}${depth === 'evidence' ? scopes(inst.scopeRefs,true) : ''}<nav class="step-nav" aria-label="Journey navigation">${j.stops[index-1] ? link('← Previous stop',{...journeyPatch(j.id,j.stops[index-1]),depth},'nav-button') : '<span></span>'}<span>${index+1} / ${j.stops.length}</span>${j.stops[index+1] ? link('Next stop →',{...journeyPatch(j.id,j.stops[index+1]),depth},'nav-button') : '<span>End of this journey</span>'}</nav><p>${caseLink(inst.id)}</p><h3>Concepts on this journey</h3><div class="chips">${j.conceptRefs.map(conceptLink).join('')}</div></article>`;
  }
  function comparison() {
    const records=compareRecords();
    const selector=`<form id="compare-form" class="compare-form"><label>First instance<select name="first">${D.instances.map(r => `<option value="${r.id}"${records[0]?.id === r.id ? ' selected' : ''}>${esc(r.title)}</option>`).join('')}</select></label><label>Second instance<select name="second">${D.instances.map((r,i) => `<option value="${r.id}"${records[1]?.id === r.id || (!records.length && i === 1) ? ' selected' : ''}>${esc(r.title)}</option>`).join('')}</select></label><button type="submit">Compare instances</button></form>`;
    if (records.length !== 2) return `<h2 id="view-heading" tabindex="-1">Compare bounded records</h2><p>Align source units, scope, contribution, authority and limits. Comparison alone does not assert identity or transmission.</p>${selector}<div class="case-questions">${link('Weekly imagining and a monthly model',{view:'compare',compare:'I03,I10',claim:null,depth:'transformation'})}${link('Barcelona and Tallinn responses',{view:'compare',compare:'I10-s2,I10-s3',claim:null,depth:'evidence'})}</div>`;
    const card=r => { const inst=M.instances.get(r.id) || M.instances.get(r.instanceId); return `<article><p class="eyebrow">${M.instances.has(r.id) ? 'Instance' : 'Forum response'} · ${r.id}</p><h3>${esc(r.title)}</h3><p><b>Contribution to the inquiry</b></p><p>${esc(r.summary || r.text)}</p><p><b>Source unit:</b> ${esc(inst.sourceUnit)}</p>${statusBadges(r.evidenceStatuses)}${scopes(r.scopeRefs)}<p class="primary-limit"><b>Limit:</b> ${esc(r.primaryLimit || r.limits.join(' '))}</p>${roles(inst)}${evidenceBlock(r.claimRefs,true,`-${r.id}`)}</article>`; };
    const relationships=D.caseRelations.filter(r => r.fromRefs.some(id => records.some(x => x.id === id || x.statementRefs?.includes(id))) && r.toRefs.some(id => records.some(x => x.id === id || x.statementRefs?.includes(id))));
    return `<div><p class="eyebrow">Comparison, without an implied causal connection</p><h2 id="view-heading" tabindex="-1">Two records, distinct warrants</h2><div class="comparison">${records.map(card).join('')}</div>${caseRelations(relationships.map(r => r.id))}${records.some(r => r.id === 'I03') && records.some(r => r.id === 'I10') ? gapHtml('X03') : ''}<details><summary>Choose a different comparison</summary>${selector}</details></div>`;
  }
  function labs() {
    const view=params.get('view') || 'overview', facets=selectedFacets();
    let content;
    if (view === 'overview') content=orientation();
    if (view === 'instances') content=M.instances.has(params.get('instance')) ? instanceRecord(M.instances.get(params.get('instance')),facets) : resultLists(facets);
    if (view === 'system') content=M.activities.has(params.get('activity')) ? activityRecord(M.activities.get(params.get('activity')),facets) : resultLists(facets,true);
    if (view === 'journey') content=journeyView(facets);
    if (view === 'compare') content=comparison();
    const items=[['overview','About this case'],['instances','Instances'],['journey','Journeys'],['system','Research conditions'],['compare','Compare']];
    return `<section class="mode-shell">${modeHeading('Democracy Labs',view === 'overview' ? 'An inquiry across encounters' : '',view === 'overview' ? D.site.modeDescriptions.labs : '',`${returnLink()}${copyButton}`)}${view !== 'overview' ? orientation(true) : ''}<div class="labs-grid">${browseIndex(items,view,{mode:'labs',dlv:1,claim:null},'Democracy Labs views')}<section>${view !== 'overview' ? filterPanel(facets) : ''}${content}</section></div></section>`;
  }
  function sourceRecord(s) {
    return `<article class="source-detail" id="source-${s.id}"><h3>${esc(s.citation)}</h3><dl class="evidence-facts">${[['Role',s.evidentialRole],['Reading coverage',s.readingCoverage],['Version',s.versionNote],['Locator convention',s.locatorConvention],['Independence',s.independenceNote],['Rights',s.rights]].filter(([,v]) => v).map(([k,v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl><p><a href="${esc(s.url)}" target="_blank" rel="noopener">Open source record <span class="visually-hidden">(opens a new tab)</span> ↗</a></p><p class="muted">${esc(D.uiCopy.sourceUnavailable)}</p></article>`;
  }
  function showSources() {
    const s=M.sources.get(params.get('source'));
    $('#source-list').innerHTML=s ? `${sourceRecord(s)}<h3>Other sources</h3><ul>${D.sources.filter(x => x.id !== s.id).map(x => `<li>${link(x.citation,{source:x.id},'', 'data-source')}</li>`).join('')}</ul>` : `<p>${esc(D.sourceReadingPolicy)}</p>${D.sources.map(sourceRecord).join('')}`;
    const dialog=$('#sources-dialog');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop=0;
    $('[data-close-dialog]').focus();
  }
  function viewKey() {
    const keys=D.navigation.url[mode], p=new URLSearchParams();
    keys.forEach(k => { if(params.has(k)) p.set(k,params.get(k)); });
    return `${mode}:${p.toString()}`;
  }
  function savePosition() {
    if (!routeKey || $('#sources-dialog').open) return;
    const el=document.activeElement;
    positions[routeKey]={y:scrollY, id:el?.id || '', href:el?.getAttribute('href') || '', text:el?.textContent?.trim() || '', filters:!!$('.filter-panel')?.open};
    try { sessionStorage.setItem('dwk-positions',JSON.stringify(positions)); } catch {}
    history.replaceState({...history.state,position:positions[routeKey]},'',location.href);
  }
  function focusView(options = {}) {
    const saved=options.restore ? positions[routeKey] : null;
    if (saved) {
      if ($('.filter-panel')) $('.filter-panel').open=saved.filters;
      const el=(saved.id && document.getElementById(saved.id)) || $$('a').find(a => a.getAttribute('href') === saved.href && a.textContent.trim() === saved.text) || $('#view-heading');
      el?.focus({preventScroll:true}); window.scrollTo(0,saved.y); return;
    }
    if (options.filters) {
      $('.filter-panel').open=true;
      $('#apply-filters').focus({preventScroll:true});
      window.scrollTo(0,options.scroll || 0); announce(counts(selectedFacets())); return;
    }
    if (options.initial) return;
    const el=options.evidence ? $('[id^="evidence-heading"]') : options.relation ? $('#relation-heading') : $('#view-heading');
    el?.focus({preventScroll:true}); el?.scrollIntoView({block:'start',behavior:'instant'});
  }
  function render(options = {}) {
    normalise();
    const canonical=url();
    if (`${location.pathname}${location.search}` !== canonical) history.replaceState(history.state,'',canonical);
    routeKey=viewKey();
    document.body.className=`mode-${mode}${mode === 'presentation' && params.get('display') === 'projection' ? ' projection' : ''}`;
    $('#app').innerHTML=mode === 'presentation' ? presentation() : mode === 'explore' ? explore() : labs();
    $$('[data-mode]').forEach(a => { a.href=url({mode:a.dataset.mode,source:null}); a.setAttribute('aria-current',a.dataset.mode === mode ? 'page' : 'false'); });
    document.title=`${$('#view-heading')?.textContent || modeNames[mode]} | Designerly Ways of Knowing`;
    $('#state-notice').hidden=!notices.length; $('#state-notice').textContent=notices.join(' ');
    if (params.has('source')) showSources(); else if ($('#sources-dialog').open) $('#sources-dialog').close();
    requestAnimationFrame(() => { if (!params.has('source')) focusView(options); });
  }
  function navigate(href, options = {}) {
    savePosition();
    history.pushState({},'',href); render(options);
  }
  function announce(message) {
    const toast=$('#toast'); toast.textContent='';
    requestAnimationFrame(() => { toast.textContent=message; toast.classList.add('show'); });
    clearTimeout(announce.timer); announce.timer=setTimeout(() => toast.classList.remove('show'),5000);
  }
  function closeSources() {
    const dialog=$('#sources-dialog'); dialog.close();
    if (sourceReturn) { history.back(); sourceReturn=null; }
    else { params.delete('source'); history.replaceState(history.state,'',url()); }
    requestAnimationFrame(() => sourceInvoker?.isConnected && sourceInvoker.focus());
  }
  document.addEventListener('click',async event => {
    const a=event.target.closest('a');
    if (a && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0 && !a.target && !a.hasAttribute('download')) {
      const target=new URL(a.href,location.href);
      if (target.origin === location.origin && target.pathname === location.pathname && target.search && !target.hash) {
        event.preventDefault();
        if (a.hasAttribute('data-source')) { sourceInvoker=a; if (!$('#sources-dialog').open) sourceReturn=location.href; }
        navigate(target.href,{restore:a.hasAttribute('data-return'), evidence:a.hasAttribute('data-focus-evidence'), relation:a.hasAttribute('data-focus-relation'), filters:a.hasAttribute('data-filter-change'), scroll:scrollY});
        return;
      }
    }
    const button=event.target.closest('button'); if (!button) return;
    if (button.hasAttribute('data-copy')) { try { await navigator.clipboard.writeText(location.href); announce('Link copied'); } catch { announce(D.uiCopy.copyFailure); } button.focus(); }
    if (button.hasAttribute('data-projection')) navigate(url({display:params.get('display') === 'projection' ? 'reading' : 'projection'}));
    if (button.id === 'sources-open') { sourceInvoker=button; showSources(); }
    if (button.hasAttribute('data-close-dialog')) closeSources();
    if (button.hasAttribute('data-clear-filters')) navigate(url(Object.fromEntries(facetConfig.map(([key]) => [key,null]))),{filters:true,scroll:scrollY});
    if (button.hasAttribute('data-invitation')) { $$('[data-invitation]').forEach(b => b.setAttribute('aria-pressed',String(b === button))); $$('[data-invitation-row]').forEach(row => row.classList.toggle('is-emphasized',row.dataset.invitationRow === button.dataset.invitation)); }
  });
  document.addEventListener('submit',event => {
    if (event.target.id === 'filter-form') {
      event.preventDefault(); const form=new FormData(event.target);
      navigate(url(Object.fromEntries(facetConfig.map(([key]) => [key,unique(form.getAll(key)).sort().join(',')]))),{filters:true,scroll:scrollY});
    }
    if (event.target.id === 'compare-form') {
      event.preventDefault(); const form=new FormData(event.target);
      if (form.get('first') === form.get('second')) { announce('Choose two different instances.'); return; }
      navigate(url({view:'compare',compare:`${form.get('first')},${form.get('second')}`,claim:null,depth:'transformation'}));
    }
  });
  document.addEventListener('keydown',event => {
    if ($('#sources-dialog').open || mode !== 'presentation' || event.metaKey || event.altKey || event.ctrlKey || /INPUT|TEXTAREA|SELECT|BUTTON|A/.test(event.target.tagName) || event.target.isContentEditable) return;
    const index=D.presentation.indexOf(currentStep()), step=event.key === 'ArrowRight' ? D.presentation[index+1] : event.key === 'ArrowLeft' ? D.presentation[index-1] : null;
    if (step) { event.preventDefault(); navigate(url({step:step.id,pclaim:null})); }
  });
  $('#sources-dialog').addEventListener('cancel',event => { event.preventDefault(); closeSources(); });
  window.addEventListener('popstate',() => render({restore:true}));
  window.addEventListener('pagehide',savePosition);
  let scrollTimer; window.addEventListener('scroll',() => { clearTimeout(scrollTimer); scrollTimer=setTimeout(savePosition,200); },{passive:true});
  matchMedia('(min-width:1200px)').addEventListener('change',event => { if ($('.step-index')) $('.step-index').open=event.matches; });
  render({initial:true,restore:performance.getEntriesByType('navigation')[0]?.type === 'reload'});
})();
