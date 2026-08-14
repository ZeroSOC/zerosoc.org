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
      gateCode: 'OCSF 2004 (severity_id ≥ Low)',
      objective: 'Capturing raw telemetry, normalizing into queryable events, and engineering robust detection models.',
      roles: 'Security Reliability Engineer (SRE), Detection Engineer',
      consumes: [
        'Raw telemetry streams & logs',
        'Tuning feedback from Phase 2 FP/Benign dispositions',
        'Phase 4 Post-Incident action items',
        'Threat intelligence (MITRE ATT&CK TTPs)'
      ],
      produces: [
        'Normalized OCSF Events',
        'Detection Findings (Alerts, severity_id ≥ Low)',
        'Monitored, healthy telemetry pipeline',
        'Verified exception & allow lists'
      ],
      deliverables: 'Detection Logic, Filter Baselines, Exception Rules',
      githubUrl: 'https://github.com/ZeroSOC/zerosoc-framework/blob/main/03-Processes/01-preparation_and_engineering.md'
    },
    phase2: {
      id: 'phase2',
      tag: 'Phase 2 · Detection & Analysis',
      title: 'Triage & Investigation',
      gate: 'G2 & G3 — Triage Decision & Verdict',
      gateCode: 'OCSF 2005 (verdict_id: FP / Benign / TP Incident)',
      objective: 'Fast alert aggregation into Cases, domain-specific triage, and concurrent A/B hypothesis testing.',
      roles: 'Incident Investigator, Threat Hunter, Autonomous AI Orchestrator',
      consumes: [
        'Alerts (OCSF 2004) aggregated into Cases (OCSF 2005)',
        'Enrichment sources (CMDB, Identity, Threat Intel)',
        'Standardized Playbooks (04-Playbooks)'
      ],
      produces: [
        'G2: Closed Case (False Positive / Benign) OR Promotion to Investigation',
        'G3: Confirmed Incident (verdict_id = 2) + Incident Category (IC-##)',
        'Triage Note (06-Deliverables/triage_note.md)',
        'Investigation Note (06-Deliverables/investigation_note.md)'
      ],
      deliverables: 'Triage Note, Investigation Note, Case Timeline',
      githubUrl: 'https://github.com/ZeroSOC/zerosoc-framework/blob/main/03-Processes/02-detection_and_analysis.md'
    },
    phase3: {
      id: 'phase3',
      tag: 'Phase 3 · Containment & Recovery',
      title: 'Incident Response',
      gate: 'G4 — Containment',
      gateCode: 'Isolating control confirmed executed',
      objective: 'Executing policy-bounded containment guardrails, eradication procedures, and restoring safe operations.',
      roles: 'Incident Coordinator, Response Specialist, CSIRT',
      consumes: [
        'Confirmed Incident (OCSF 2005, verdict_id = 2)',
        'Investigation → Response handoff record',
        'Agentic Guardrails & JIT scoping rules'
      ],
      produces: [
        'Contained & eradicated environment',
        'Restored systems & verified baseline',
        'Regulatory notification triggers (NIS2 / DORA 24h/72h gates)',
        'Handoff record to Post-Incident Activity'
      ],
      deliverables: 'Containment Record, Notification Gate Records, Remediation Log',
      githubUrl: 'https://github.com/ZeroSOC/zerosoc-framework/blob/main/03-Processes/03-response.md'
    },
    phase4: {
      id: 'phase4',
      tag: 'Phase 4 · Improvement & Feedback',
      title: 'Post-Incident Activity',
      gate: 'G5 — Post-Hoc Review',
      gateCode: 'HITL Review / QA Audit / PIR Complete',
      objective: 'Conducting blameless root cause analysis, agent QA sampling, and feeding tuning data back to Phase 1.',
      roles: 'SOC Director, Governance Manager, SRE / Detection Engineer',
      consumes: [
        'Completed Incident record (or critical False-Positive outage)',
        'Case-attributed agent action logs',
        'Speed & disposition metrics (MTTA / MTTV / MTTC)'
      ],
      produces: [
        'Blameless Post-Incident Review (PIR)',
        'Continuous tuning tickets feeding directly into Phase 1',
        'Playbook updates and QA compliance score',
        '1-Month final regulatory report'
      ],
      deliverables: 'Post-Incident Review (PIR), Detection Tuning Tickets, QA Reports',
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
