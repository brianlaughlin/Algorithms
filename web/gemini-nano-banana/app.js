const profiles = {
  wearable: {
    title: 'Wearable | 2.2 TOPS',
    throughput: 'Up to 42 inferences per second on gesture + speech fusion',
    thermal: 'Sustained at 38°C skin temperature with adaptive cooling bursts',
    workloads: [
      'Dual-mic beamforming with contextual summarization',
      'Live translation overlays for ambient computing',
      'Haptic cue synthesis tuned per user preference'
    ]
  },
  mobile: {
    title: 'Mobile | 6.5 TOPS',
    throughput: '86 inferences per second on multimodal chat experiences',
    thermal: 'Maintains under 45°C surface temperature with dynamic voltage scaling',
    workloads: [
      'Semantic camera assistant with scene grounding',
      'Offline voice navigation with persona memory',
      'In-app creative studio with voice + image editing'
    ]
  },
  automotive: {
    title: 'Automotive | 12 TOPS',
    throughput: '120 inferences per second with redundant perception streams',
    thermal: 'Optimized for 70°C ambient environments with passive cooling',
    workloads: [
      'Driver awareness and cabin conversation orchestration',
      'Predictive climate + comfort automation',
      'Contextual notifications with occupant detection'
    ]
  },
  edge: {
    title: 'Edge Rack | 35 TOPS',
    throughput: '220 inferences per second with multi-session concurrency',
    thermal: 'Data-center grade cooling envelope with 92% efficiency',
    workloads: [
      'Retail analytics with privacy-preserving re-identification',
      'Industrial inspection with anomaly explanations',
      'Spatial computing orchestrators across location clusters'
    ]
  }
};

const profileSelect = document.querySelector('#profile-select');
const profileDescription = document.querySelector('#profile-description');
const scrollTriggers = document.querySelectorAll('[data-scroll]');

function renderProfile(profileKey) {
  const profile = profiles[profileKey];
  if (!profile) {
    profileDescription.textContent = 'Select a deployment profile to preview performance insights.';
    return;
  }

  const workloadList = profile.workloads
    .map((item) => `<li>${item}</li>`)
    .join('');

  profileDescription.innerHTML = `
    <h3>${profile.title}</h3>
    <p><strong>Throughput:</strong> ${profile.throughput}</p>
    <p><strong>Thermal envelope:</strong> ${profile.thermal}</p>
    <p><strong>Recommended workloads:</strong></p>
    <ul>${workloadList}</ul>
  `;
}

profileSelect.addEventListener('change', (event) => {
  renderProfile(event.target.value);
});

scrollTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    const targetSelector = trigger.getAttribute('data-scroll');
    const target = document.querySelector(targetSelector);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

renderProfile(profileSelect.value);

const ctaForm = document.querySelector('.cta-form');
ctaForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = ctaForm.querySelector('input[type="email"]').value.trim();
  const teamSize = ctaForm.querySelector('select').value;

  if (!email) {
    return;
  }

  const message = document.createElement('p');
  message.className = 'cta-footnote';
  message.textContent = `Thanks, ${email}! We'll review your ${teamSize} team and follow up soon.`;

  const previousMessage = ctaForm.nextElementSibling;
  if (previousMessage && previousMessage.classList.contains('cta-footnote')) {
    previousMessage.remove();
  }

  ctaForm.insertAdjacentElement('afterend', message);
  ctaForm.reset();
});
