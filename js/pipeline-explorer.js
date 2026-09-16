/**
 * ZeroSOC.org - Interactive Pipeline & Gates Explorer
 * License: Apache-2.0
 */

(function () {
  'use strict';

  const pipelineData = {
    phase1: {
      id: 'phase1',
      tag: 'Phase 1 · Detection Lifecycle',
      title: 'Preparation & Engineering',
      gate: 'G1 — Alert Raised',
      gateCode: 'OCSF Detection Finding 2004 (severity_id ≥ Low)',
      objective: 'Engineering and tuning detection logic as code, keeping the telemetry pipeline healthy, and maintaining the SOC Knowledge Base that triage consults.',
      roles: 'Detection Engineer, Security Platform Engineer',
      consumes: [
        'Raw telemetry from onboarded log sources',
        'Tuning feedback: False Positive and Benign dispositions from Phase 2',
        'Post-Incident action items from Phase 4',
        'Threat intelligence (new adversary TTPs) and the CMDB asset inventory'
      ],
      produces: [
        'Normalized OCSF Events',
        'Signals (Informational Detection Findings) and Alerts (severity_id ≥ Low)',
        'A monitored, healthy telemetry pipeline',
        'Current exception & allow lists'
      ],
      deliverables: 'Detection-as-Code Logic, Log-Source Health Checks, Exception & Allow Lists',
      githubUrl: 'https://github.com/ZeroSOC/zerosoc-framework/blob/main/03-Processes/01-preparation_and_engineering.md'
    },
    phase2: {
      id: 'phase2',
      tag: 'Phase 2 · Detection & Analysis',
      title: 'Triage & Investigation',
      gate: 'G2 Triage Decision & G3 Investigation Verdict',
      gateCode: 'OCSF Incident Finding 2005 verdict_id',
      objective: 'Fast, alert-centric triage that closes or promotes each Case, then an investigation that tests concurrent Malicious and Benign hypotheses to a scored verdict.',
      roles: 'Security Analyst, Threat Hunter (any executor: human, automation or AI agent)',
      consumes: [
        'Alerts (OCSF 2004) aggregated into Cases (OCSF 2005); Signals are consulted, never triaged',
        'Enrichment: threat intelligence, CMDB, identity directory, SOC Knowledge Base',
        'Domain triage and Incident Category playbooks (04-Playbooks)'
      ],
      produces: [
        'G2: Case closed as False Positive, Benign or Duplicate, or promoted to Investigation',
        'G3: Case closed as False Positive, Benign, Duplicate or Insufficient Data, or Confirmed Incident (verdict_id 2) with its Incident Category',
        'Triage Note and Investigation Note: tagged findings, resolution and confidence',
        'A tuning ticket to Phase 1 for every False Positive'
      ],
      deliverables: 'Triage Note, Investigation Note, Case Timeline',
      githubUrl: 'https://github.com/ZeroSOC/zerosoc-framework/blob/main/03-Processes/02-detection_and_analysis.md'
    },
    phase3: {
      id: 'phase3',
      tag: 'Phase 3 · Containment & Recovery',
      title: 'Incident Response',
      gate: 'G4 — Containment',
      gateCode: 'A containment action applied and confirmed',
      objective: 'Containing, eradicating and recovering the Incident under the risk-based autonomy matrix: reversible actions are pre-authorized, the rest wait for human approval.',
      roles: 'Security Analyst (the Case assignee carries the Incident), SOC Manager (regulatory notification)',
      consumes: [
        'Confirmed Incident (OCSF 2005, verdict_id 2)',
        'Investigation → Response phase transition contract: category, scope, timeline with T0, severity, confidence, impact, recommended actions',
        'Agentic Guardrails: least access, the HITL approval payload, human-assignee conditions'
      ],
      produces: [
        'A contained, eradicated and recovered environment (containment lifted, services restored)',
        'Every response action and approval recorded in the Case timeline',
        'The regulatory notifications the Incident requires (NIS2 / DORA)',
        'Transition to Post-Incident Activity'
      ],
      deliverables: 'Case Timeline of Response Actions, Regulatory Notifications',
      githubUrl: 'https://github.com/ZeroSOC/zerosoc-framework/blob/main/03-Processes/03-response.md'
    },
    phase4: {
      id: 'phase4',
      tag: 'Phase 4 · Improvement & Feedback',
      title: 'Post-Incident Activity',
      gate: 'G5 — Review',
      gateCode: 'A verdict re-examined: approval rejected or containment rolled back, QA sampling, or Post-Incident Review',
      objective: 'Blameless root cause analysis of every responded Incident, QA sampling of autonomous closes, and tracked action items that feed detection engineering and the playbooks.',
      roles: 'SOC Manager (convenes), Security Analyst (presents the Case), Detection Engineer',
      consumes: [
        'A Case whose response has ended, or a False Positive that caused a critical disruption',
        'The Case record: timeline, Triage and Investigation Notes, provenance of every step',
        'Case speed metrics: T0, MTTD, MTTC, MTTR'
      ],
      produces: [
        'A blameless root cause analysis',
        'Tracked action items with risk-based deadlines: detection tuning, telemetry onboarding, playbook updates, IT fixes',
        'Lessons learned in the SOC Knowledge Base',
        'Adjudicated verdict misses, feeding Observed Triage Recall and Observed Verdict Recall'
      ],
      deliverables: 'Root Cause Analysis, Action Items, SOC Knowledge Base Entries',
      githubUrl: 'https://github.com/ZeroSOC/zerosoc-framework/blob/main/03-Processes/04-post_incident_activity.md'
    }
  };

  function initPipelineExplorer() {
    const nodes = document.querySelectorAll('.pipeline-node');
    const inspectorTitle = document.getElementById('inspector-phase-title');
    const inspectorTag = document.getElementById('inspector-phase-tag');
    const inspectorGate = document.getElementById('inspector-gate-badge');
    const inspectorObjective = document.getElementById('inspector-objective');
    const inspectorRoles = document.getElementById('inspector-roles');
    const inspectorConsumes = document.getElementById('inspector-consumes');
    const inspectorProduces = document.getElementById('inspector-produces');
    const inspectorLink = document.getElementById('inspector-github-link');

    if (!nodes.length || !inspectorTitle) return;

    function renderPhase(phaseKey) {
      const data = pipelineData[phaseKey];
      if (!data) return;

      // Update Node active states
      nodes.forEach(node => {
        if (node.getAttribute('data-phase') === phaseKey) {
          node.classList.add('active');
          node.setAttribute('aria-selected', 'true');
        } else {
          node.classList.remove('active');
          node.setAttribute('aria-selected', 'false');
        }
      });

      // Update Inspector Panel with smooth fade
      inspectorTag.textContent = data.tag;
      inspectorTitle.textContent = data.title;
      inspectorGate.innerHTML = `<strong>${data.gate}</strong>: ${data.gateCode}`;
      inspectorObjective.textContent = data.objective;
      inspectorRoles.textContent = data.roles;

      // Consumes List
      inspectorConsumes.innerHTML = data.consumes
        .map(item => `<li>${item}</li>`)
        .join('');

      // Produces List
      inspectorProduces.innerHTML = data.produces
        .map(item => `<li>${item}</li>`)
        .join('');

      // GitHub link
      if (inspectorLink) {
        inspectorLink.href = data.githubUrl;
        inspectorLink.textContent = `View Phase Spec on GitHub →`;
      }
    }

    nodes.forEach(node => {
      node.addEventListener('click', function () {
        const phaseKey = this.getAttribute('data-phase');
        renderPhase(phaseKey);
      });

      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const phaseKey = this.getAttribute('data-phase');
          renderPhase(phaseKey);
        }
      });
    });

    // Initial render of default phase (Phase 2 - Detection & Analysis)
    renderPhase('phase2');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPipelineExplorer);
  } else {
    initPipelineExplorer();
  }
})();
