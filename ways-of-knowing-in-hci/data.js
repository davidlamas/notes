const WOK = {
  families: [
    {
      id: "empirical", short: "Empirical", title: "Empirical–analytic", color: "#d7e9e5", x: 600, y: 105,
      premise: "Measure patterned phenomena to explain, compare, and predict.",
      ontology: "Phenomena can be operationalized as sufficiently stable variables, behaviours, or regularities.",
      epistemology: "Systematic observation, measurement, modelling, and controlled comparison can yield increasingly reliable explanations.",
      knowledge: "Effects, estimates, models, performance measures, error patterns, and falsifiable propositions.",
      questions: ["What changes what—and by how much?", "Under which conditions does an effect hold?", "Can behaviour or performance be predicted?"],
      methods: ["Experiments", "Surveys", "Telemetry", "Benchmarking", "Statistical modelling", "Physiological measures"],
      claims: "Causal or correlational explanation, prediction, validated guideline, metric, or generalizable regularity.",
      rigor: "Construct, internal, external, and statistical conclusion validity; reliability; transparent analysis; robustness.",
      strengths: "Makes magnitude and uncertainty explicit; supports comparison; can expose repeatable patterns.",
      risks: "Operational measures can replace the phenomenon; context can be stripped away; narrow samples can be over-generalized.",
      misunderstanding: "Quantitative data do not automatically make a study empirical-analytic, and qualitative evidence can inform analytic explanation.",
      studies: ["amershi2019", "fails2003"]
    },
    {
      id: "interpretive", short: "Interpretive", title: "Interpretive–situated", color: "#e6dff0", x: 925, y: 245,
      premise: "Understand meaning and practice as locally accomplished.",
      ontology: "Meanings and practices are situated, socially produced, historically formed, and locally accomplished.",
      epistemology: "Knowledge develops through interpretation of action in context; the researcher participates in the interpretive situation.",
      knowledge: "Thick description, participant accounts, observed practices, interactional detail, and theoretically informed interpretation.",
      questions: ["How is technology understood and enacted here?", "How do people make a practice work?", "What meanings organize experience?"],
      methods: ["Ethnography", "Interviews", "Participant observation", "Discourse analysis", "Interpretive case study", "Grounded analysis"],
      claims: "Situated explanation, conceptual reframing, account of practice, sensitising concept, or grounded theory.",
      rigor: "Credibility, reflexivity, contextual depth, analytic coherence, negative cases, resonance, and transferability.",
      strengths: "Reveals context, tacit work, meaning, and phenomena missed by pre-specified measures.",
      risks: "Rich accounts can be reduced to requirements; researcher position can be hidden; transfer can be overstated.",
      misunderstanding: "Interpretation is not unstructured opinion; it is disciplined, evidenced, and reflexive analysis.",
      studies: ["dourish2006", "abraham2013", "epstein2015"]
    },
    {
      id: "constructive", short: "Constructive", title: "Constructive–designerly", color: "#f4dfc9", x: 960, y: 545,
      premise: "Make possible worlds tangible, then reflect through the making.",
      ontology: "Possible and preferred worlds can be made materially available for inquiry; artifacts help articulate problems.",
      epistemology: "Designing and making generate knowledge that analysis alone cannot; reflection on process is part of the warrant.",
      knowledge: "Annotated artifacts, process records, deployments, critiques, portfolios, encounters, and iterations.",
      questions: ["What becomes thinkable if we make this?", "How can an artifact reframe a design space?", "What knowledge is embodied in the design?"],
      methods: ["Research through design", "Prototyping", "Design fiction", "Probes", "Speculative design", "Annotated portfolios"],
      claims: "Artifact, exemplar, strong concept, design space, generative framework, or material speculation.",
      rigor: "Transparent process, relevance, novelty, generativity, conceptual coherence, and the artifact's capacity to open inquiry.",
      strengths: "Explores futures before they are fully describable; integrates tacit, material, and experiential knowledge.",
      risks: "Novelty can be mistaken for knowledge; process and failure can disappear; product metrics can become the only evaluation.",
      misunderstanding: "A prototype is not automatically research through design; the knowledge must be articulated and warranted.",
      studies: ["zimmerman2007", "gaver2009"]
    },
    {
      id: "critical", short: "Critical", title: "Critical–transformative", color: "#efd7dc", x: 600, y: 675,
      premise: "Expose power and exclusions; make alternatives contestable.",
      ontology: "Technologies and knowledge practices are value-laden and embedded in relations of power.",
      epistemology: "Critique exposes what dominant framings hide; value-explicit and reflexive inquiry can transform conditions.",
      knowledge: "Exclusions, breakdowns, counter-readings, histories, lived consequences, standpoint accounts, and value conflicts.",
      questions: ["Who benefits and who is burdened?", "Whose knowledge is absent?", "What has been normalized—and how might it be otherwise?"],
      methods: ["Feminist analysis", "Critical discourse analysis", "Critical technical practice", "Adversarial design", "Value-sensitive inquiry", "Speculation"],
      claims: "Critique, counter-narrative, value framework, disclosure of harm, alternative framing, or emancipatory direction.",
      rigor: "Positional clarity, accountability, intersectional attention, evidential grounding, reflexivity, and consequential relevance.",
      strengths: "Makes values and asymmetries discussable; identifies structural harms and neglected alternatives.",
      risks: "Critique can be detached from affected people; one standpoint can be universalized; values can become a checklist.",
      misunderstanding: "Critical inquiry is not simply negative evaluation; it joins diagnosis to normative and often transformative commitments.",
      studies: ["bardzell2010", "sengers2005"]
    },
    {
      id: "participatory", short: "Participatory", title: "Participatory–democratic", color: "#e7e8bf", x: 240, y: 545,
      premise: "Co-produce knowledge with those who live its consequences.",
      ontology: "People affected by technology hold indispensable situated expertise; design situations contain contested interests.",
      epistemology: "Knowledge is co-produced through participation, mutual learning, and action; decision rights are epistemic.",
      knowledge: "Co-created artifacts, workshop traces, participant decisions, changes in practice, negotiated accounts, and meaningful outcomes.",
      questions: ["Who should shape this technology—and on what terms?", "What can collaborators learn and change together?", "How can participation alter power?"],
      methods: ["Participatory design", "Co-design", "Cooperative inquiry", "Action research", "Community-based research", "Future workshops"],
      claims: "Shared understanding, capacity, negotiated design, local change, democratic process, or participatory method.",
      rigor: "Genuine influence, reciprocity, accessibility, transparent decision rights, sustained accountability, and collaborator benefit.",
      strengths: "Treats lived expertise as knowledge; can redistribute problem framing and build local capacity.",
      risks: "Attendance can be confused with power; workshops can be extractive; consensus language can hide conflict.",
      misunderstanding: "Participation is not a data-collection technique; it concerns governance, ownership, and whose purposes count.",
      studies: ["frauenberger2016", "druin1999"]
    },
    {
      id: "relational", short: "Relational", title: "Relational–entangled", color: "#d8e2f0", x: 275, y: 245,
      premise: "Trace how humans, things, and worlds become through relations.",
      ontology: "Humans, technologies, institutions, data, and materials do not precede their relations as fully separate entities.",
      epistemology: "Knowing is situated within sociomaterial relations and performative: inquiry helps enact its phenomenon.",
      knowledge: "Relations, enactments, material configurations, breakdowns, traces, more-than-human effects, and interventions.",
      questions: ["How do people and technologies become with one another?", "What reality does this apparatus enact?", "Where do accountability and response-ability emerge?"],
      methods: ["Thing-centred design", "Material speculation", "Diffractive analysis", "Sociomaterial tracing", "Long deployments", "Relational ethnography"],
      claims: "Relational account, reconfigured unit of analysis, accountable intervention, material speculation, or alternative relation.",
      rigor: "Relational specificity, material attentiveness, traceable accountability, reflexivity about the apparatus, and representational care.",
      strengths: "Challenges fixed human/technology boundaries; foregrounds material agency and distributed consequences.",
      risks: "Networks can flatten unequal power; abstraction can outrun evidence; distributed agency can diffuse responsibility.",
      misunderstanding: "Recognizing nonhuman agency does not mean treating all actors as morally or politically equivalent.",
      studies: ["frauenberger2020", "wakkary2017"]
    }
  ],
  connections: [
    ["empirical", "interpretive", "complementarity", "Controlled regularity and situated meaning can expand one another, but warrant generalization differently."],
    ["interpretive", "participatory", "shared assumptions", "Both value situated knowledge; participatory inquiry adds co-determination and action."],
    ["constructive", "empirical", "translation", "Artifacts can instantiate hypotheses for evaluation, while designerly knowledge exceeds product performance."],
    ["constructive", "critical", "complementarity", "Speculative artifacts can materialize critique and make alternatives experienceable."],
    ["critical", "participatory", "productive tension", "Both address voice and power; they differ over who frames critique and controls outcomes."],
    ["relational", "interpretive", "historical influence", "Both reject context-free accounts; relational inquiry further unsettles fixed entities."],
    ["relational", "critical", "accountability", "Both trace how realities are produced; critical work keeps asymmetry and justice explicit."],
    ["participatory", "constructive", "co-production", "Making together supports mutual learning, but participation demands more than design inspiration."],
    ["empirical", "critical", "disagreement", "Measurement can document disparity while critique asks how categories and metrics help produce it."],
    ["constructive", "relational", "shared assumptions", "Both treat artifacts as active in inquiry rather than passive outputs." ]
  ],
  studies: {
    amershi2019: {title:"Guidelines for Human–AI Interaction", authors:"Amershi et al.", year:2019, venue:"CHI", doi:"https://doi.org/10.1145/3290605.3300233", why:"Builds and validates 18 guidelines through staged synthesis and evaluation, making generality, observable evidence, and validation central to the warrant."},
    fails2003: {title:"Interactive Machine Learning", authors:"Fails & Olsen", year:2003, venue:"IUI", doi:"https://doi.org/10.1145/604045.604056", why:"Introduces an interactive learning model and evaluates algorithms, illustrating technical construction joined to comparative empirical evidence."},
    dourish2006: {title:"Implications for Design", authors:"Dourish", year:2006, venue:"CHI", doi:"https://doi.org/10.1145/1124772.1124855", why:"Argues that ethnography's value is not reducible to design requirements, clarifying an interpretive warrant based on conceptual understanding."},
    abraham2013: {title:"Re-coordinating Activities", authors:"Abraham & Reddy", year:2013, venue:"CSCW", doi:"https://doi.org/10.1145/2441776.2441787", why:"Uses articulation work to explain how hospital departments repair coordination, producing a situated account of organizational practice."},
    epstein2015: {title:"A Lived Informatics Model of Personal Informatics", authors:"Epstein et al.", year:2015, venue:"UbiComp", doi:"https://doi.org/10.1145/2750858.2804250", why:"Develops a model from surveys and interviews that foregrounds tracking as lived, episodic practice rather than a frictionless stage sequence."},
    zimmerman2007: {title:"Research through Design as a Method for Interaction Design Research in HCI", authors:"Zimmerman, Forlizzi & Evenson", year:2007, venue:"CHI", doi:"https://doi.org/10.1145/1240624.1240704", why:"Makes the case that artifacts and disciplined design practice can produce research contributions distinct from conventional empirical findings."},
    gaver2009: {title:"Anatomy of a Failure", authors:"Gaver et al.", year:2009, venue:"CHI", doi:"https://doi.org/10.1145/1518701.1519040", why:"Treats a failed domestic deployment as design knowledge, showing how reflection on breakdown can be more generative than a success metric."},
    bardzell2010: {title:"Feminist HCI: Taking Stock and Outlining an Agenda for Design", authors:"Bardzell", year:2010, venue:"CHI", doi:"https://doi.org/10.1145/1753326.1753521", why:"Uses feminist theory to critique HCI's concepts and proposes value-explicit qualities for theory, methodology, user research, and design."},
    sengers2005: {title:"Reflective Design", authors:"Sengers et al.", year:2005, venue:"Critical Computing", doi:"https://doi.org/10.1145/1094562.1094569", why:"Frames reflection on unconscious values and practices as a core design commitment, linking critique to the creation of alternatives."},
    frauenberger2016: {title:"Designing Smart Objects with Autistic Children", authors:"Frauenberger, Makhaeva & Spiel", year:2016, venue:"CHI", doi:"https://doi.org/10.1145/2858036.2858050", why:"Presents four co-design processes in which autistic children shape both artifacts and inquiry, making agency and participation part of the warrant."},
    druin1999: {title:"Cooperative Inquiry: Developing New Technologies for Children with Children", authors:"Druin", year:1999, venue:"CHI", doi:"https://doi.org/10.1145/302979.303166", why:"Positions children as design partners and integrates participatory practices into an inquiry model, rather than treating children only as test subjects."},
    frauenberger2020: {title:"Entanglement HCI: The Next Wave?", authors:"Frauenberger", year:2020, venue:"TOCHI", doi:"https://doi.org/10.1145/3364998", why:"Explicitly proposes a relational, performative foundation for HCI centred on phenomena, mattering, and accountable human–technology relations."},
    wakkary2017: {title:"Morse Things: A Design Inquiry into the Gap Between Things and Us", authors:"Wakkary et al.", year:2017, venue:"DIS", doi:"https://doi.org/10.1145/3064663.3064734", why:"Uses autonomous networked ceramics and a long deployment to inquire into thing-centred relations beyond conventional human-centred utility."}
  },
  methods: {
    interview: {label:"Interview", entries:[
      ["empirical","A standardized interview can operationalize constructs for comparable coding and test a pre-specified model."],
      ["interpretive","An open interview can elicit situated meanings, contradictions, and participants' own categories."],
      ["critical","A standpoint-informed interview can examine how power shapes experience and whose account is authorized."],
      ["participatory","A dialogic interview can become mutual inquiry in which collaborators redirect the problem and action."]]},
    prototype: {label:"Prototype", entries:[
      ["empirical","A prototype can hold an interaction constant so an effect or performance difference can be tested."],
      ["constructive","A prototype can be the means of inquiry: it materializes a question and generates designerly knowledge."],
      ["participatory","A prototype can act as a shared object through which collaborators negotiate purposes and decisions."],
      ["critical","A prototype can estrange the familiar, expose values, or make a contested alternative experienceable."]]},
    fieldwork: {label:"Fieldwork", entries:[
      ["empirical","A field deployment can test whether measured effects persist under ecologically valid conditions."],
      ["interpretive","Ethnographic fieldwork can explain how a technology is made meaningful within situated practice."],
      ["relational","Relational fieldwork can trace how people, devices, data, spaces, and routines jointly enact a phenomenon."],
      ["participatory","Action-oriented fieldwork can produce local knowledge while collaborators intervene in the situation."]]},
    logs: {label:"Logs & traces", entries:[
      ["empirical","Logs can estimate prevalence, sequences, effects, and predictive associations at scale."],
      ["interpretive","Traces can be read alongside accounts and observation to understand what recorded events mean in practice."],
      ["critical","A critical reading asks what the infrastructure records, excludes, and makes governable."],
      ["relational","Traces can reveal distributed relations while remaining effects of the apparatus that produced them."]]}
  },
  overlays: [
    {id:"bodker", label:"Bødker's waves", title:"Changing objects and settings of HCI", summary:"From individual performance, through situated cooperative work, to everyday life, experience, and multiplicity.", detail:"Bødker's waves describe shifts in HCI's dominant problems and settings: first-wave human factors and performance; second-wave human actors, work, cooperation, and context; third-wave everyday life, culture, emotion, and multiple contexts. They coexist. Third-wave work does not invalidate controlled experiments or activity-oriented accounts.", source:"https://doi.org/10.1145/1182475.1182476"},
    {id:"paradigms", label:"Three paradigms", title:"Different constructions of interaction", summary:"Human factors, information processing, and a phenomenologically situated matrix.", detail:"Harrison, Tatar, and Sengers distinguish paradigms by their underlying construction of human, computer, interaction, and valid knowledge. Their third paradigm gathers embodied, situated, value-oriented, and meaning-centred approaches. This account resembles—but is not identical to—Bødker's waves.", source:"https://people.cs.vt.edu/srh/Downloads/TheThreeParadigmsofHCI.pdf"},
    {id:"rogers", label:"Roles of theory", title:"Theory does more than predict", summary:"Theory may explain, predict, describe, sensitize, critique, frame, or generate design.", detail:"Rogers' account helps resist a single hierarchy of theory. In HCI, theory can predict performance, provide explanatory mechanisms, sensitize researchers to phenomena, critique assumptions, or open a design space. The appropriate standard follows the theory's role and the claim being made.", source:"https://doi.org/10.1007/978-3-031-02197-8"},
    {id:"practice", label:"Practice turn", title:"From interaction episodes to practices", summary:"Kuutti and Bannon shift the unit of analysis toward materially and historically constituted practices.", detail:"The practice turn treats interaction as part of broader practices rather than a bounded user–system episode. It directs attention to histories, competences, materials, norms, and linked activities, connecting interpretive, participatory, and relational inquiry.", source:"https://doi.org/10.1145/2556288.2557111"},
    {id:"entanglement", label:"Entanglement HCI", title:"A proposed next wave", summary:"Relational ontology, performativity, mattering, and accountability beyond a fixed human–technology divide.", detail:"Frauenberger proposes Entanglement HCI as a possible next wave. Its focus is not simply newer technology, but a changed ontology: humans and technologies are constituted in relations. The proposal reframes knowledge around phenomena, traces accountability, and treats design as mattering. It should not be presented as an agreed fourth stage.", source:"https://doi.org/10.1145/3364998"}
  ],
  positionQuestions: [
    {legend:"What is your study mainly trying to do?", options:[["Estimate or explain a patterned effect","empirical"],["Understand meaning in context","interpretive"],["Open a design space by making","constructive"],["Expose and transform an inequity","critical"],["Enable collective inquiry and action","participatory"],["Trace relations that constitute a phenomenon","relational"]]},
    {legend:"What would be your strongest warrant?", options:[["Robust measurement and comparison","empirical"],["Contextual depth and interpretive coherence","interpretive"],["A generative artifact and transparent process","constructive"],["Accountable critique with positional clarity","critical"],["Genuine collaborator influence and reciprocity","participatory"],["Specific tracing of material relations and accountabilities","relational"]]},
    {legend:"Where is expertise located?", options:[["In disciplined measurement and modelling","empirical"],["In situated actors and interpretive engagement","interpretive"],["In reflective making and material exploration","constructive"],["In standpoints that expose normalized power","critical"],["In the people collectively shaping the issue","participatory"],["Across human and nonhuman relations","relational"]]}
  ]
};
