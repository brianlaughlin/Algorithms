const toneCopy = {
  playful:
    "Let's remix this into an experience that's bright, friendly, and instantly shareable.",
  professional:
    "Here's a crisp breakdown ready for product stakeholders and exec reviews.",
  technical:
    "Deep dive coming right up with engineering-ready insights and guardrails."
};

const modalityCopy = {
  voice:
    "We'll blend conversational cues with on-screen summaries so the moment feels personal and accessible.",
  vision:
    "Nano Banana cross-references live visuals with contextual memory to keep every scene grounded in reality.",
  ambient:
    "Ambient sensors layer in subtle triggers, so the assistant reacts before the user even reaches for the device."
};

const form = document.getElementById("prompt-form");
const preview = document.getElementById("preview-output");
const toneSelect = document.getElementById("tone");
const modalitySelect = document.getElementById("modality");
const promptInput = document.getElementById("prompt");
const promptLab = document.querySelector(".prompt-lab");
const primaryCta = document.getElementById("primary-cta");
const tourTrigger = document.getElementById("tour-trigger");
const tourModal = document.getElementById("tour-modal");
const tourClose = document.getElementById("tour-close");
const tourCta = document.getElementById("tour-cta");

function buildPreview(tone, modality, prompt) {
  const intro = toneCopy[tone] ?? toneCopy.playful;
  const channel = modalityCopy[modality] ?? modalityCopy.voice;
  const body = prompt
    ? `Here's how Gemini Nano Banana would respond to your scenario:\n\n${prompt.trim()}`
    : "Share a little context so we can tailor the Nano Banana response.";

  return `${intro}\n\n${channel}\n\n${body}`;
}

form?.addEventListener("submit", event => {
  event.preventDefault();
  const tone = toneSelect?.value ?? "playful";
  const modality = modalitySelect?.value ?? "voice";
  const prompt = promptInput?.value ?? "";
  const output = buildPreview(tone, modality, prompt);
  preview.textContent = output;
  preview.classList.add("glow");
  setTimeout(() => preview.classList.remove("glow"), 1200);
});

primaryCta?.addEventListener("click", () => {
  promptLab?.scrollIntoView({ behavior: "smooth", block: "center" });
  promptInput?.focus({ preventScroll: true });
});

function openTour() {
  if (tourModal) {
    tourModal.hidden = false;
    document.body.style.overflow = "hidden";
  }
}

function closeTour() {
  if (tourModal) {
    tourModal.hidden = true;
    document.body.style.overflow = "";
  }
}

if (tourTrigger) {
  tourTrigger.addEventListener("click", () => {
    openTour();
  });
}

tourClose?.addEventListener("click", () => {
  closeTour();
});

tourModal?.addEventListener("click", event => {
  if (event.target === tourModal) {
    closeTour();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeTour();
  }
});

if (tourCta) {
  tourCta.addEventListener("click", () => {
    closeTour();
    promptLab?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Accessibility enhancement: ensure focus moves into the modal when opened.
const observer = new MutationObserver(records => {
  for (const record of records) {
    if (
      record.type === "attributes" &&
      record.attributeName === "hidden" &&
      record.target === tourModal
    ) {
      if (!tourModal.hidden) {
        tourClose?.focus();
      } else {
        tourTrigger?.focus();
      }
    }
  }
});

tourModal &&
  observer.observe(tourModal, {
    attributes: true,
    attributeFilter: ["hidden"]
  });
