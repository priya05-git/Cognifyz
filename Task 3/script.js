// عناصر
const copyButtons = document.querySelectorAll(".copy-btn");
const status = document.getElementById("status");
const copyAllBtn = document.getElementById("copyAll");
const clearAllBtn = document.getElementById("clearAll");

// ===== Copy Function (with fallback) =====
async function copyText(text) {
  try {
    // Modern Clipboard API
    await navigator.clipboard.writeText(text);
    updateStatus("✅ Copied successfully!");
  } catch (err) {
    // Fallback method
    fallbackCopy(text);
  }
}

// ===== Fallback Copy =====
function fallbackCopy(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();

  try {
    document.execCommand("copy");
    updateStatus("✅ Copied (fallback method)");
  } catch (err) {
    updateStatus("❌ Failed to copy");
  }

  document.body.removeChild(tempInput);
}

// ===== Get Text From Target =====
function getTextFromTarget(selector) {
  const el = document.querySelector(selector);
  if (!el) return "";

  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    return el.value;
  }

  return el.innerText.trim();
}

// ===== Copy Button Click =====
copyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.getAttribute("data-copy-target");
    const text = getTextFromTarget(targetSelector);

    if (text) {
      copyText(text);
    } else {
      updateStatus("⚠ Nothing to copy");
    }
  });
});

// ===== Copy All Fields =====
copyAllBtn.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input, textarea");
  let combinedText = "";

  inputs.forEach((el) => {
    if (el.value.trim() !== "") {
      combinedText += el.value + "\n";
    }
  });

  if (combinedText) {
    copyText(combinedText.trim());
  } else {
    updateStatus("⚠ No content to copy");
  }
});

// ===== Clear All Fields =====
clearAllBtn.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input, textarea");

  inputs.forEach((el) => {
    if (el.type !== "button") {
      el.value = "";
    }
  });

  updateStatus("🧹 All fields cleared");
});

// ===== Status Update =====
function updateStatus(message) {
  status.textContent = message;

  // Reset message after 2 seconds
  setTimeout(() => {
    status.textContent = "Ready to copy.";
  }, 2000);
}