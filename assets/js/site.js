const RELEASE_DATE = new Date(2026, 9, 16);
const isReleased = new Date() >= RELEASE_DATE;

if (isReleased) {
    document.querySelectorAll("[data-release-status]").forEach((element) => {
        element.textContent = "Available now";
    });

    document.querySelectorAll("[data-release-note]").forEach((element) => {
        element.textContent = "Available now on iPhone and iPad";
    });

    document.querySelectorAll("[data-release-button]").forEach((element) => {
        const prefix = element.querySelector("[data-release-button-prefix]");
        if (prefix) {
            prefix.textContent = "Download on the";
        } else {
            element.textContent = "Download on the App Store";
        }
    });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("[data-copy-text]").forEach((button) => {
    const defaultLabel = button.querySelector("span").textContent;
    const status = button.closest(".brew-install").querySelector("[data-copy-status]");

    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(button.dataset.copyText);
            button.classList.add("is-copied");
            button.querySelector("span").textContent = "Copied";
            status.textContent = "Homebrew install command copied to clipboard.";

            window.setTimeout(() => {
                button.classList.remove("is-copied");
                button.querySelector("span").textContent = defaultLabel;
            }, 2200);
        } catch {
            status.textContent = "Could not copy the command. Select and copy it manually.";
        }
    });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

/*
 * Kit setup
 * ----------
 * Paste the public form action URLs from the two Kit forms below.
 * Each Kit form should add the corresponding Studio or VoucherVault tag.
 */
const kitFormActions = {
    studio: "https://app.kit.com/forms/10019101/subscriptions",
    vouchervault: "https://app.kit.com/forms/10019146/subscriptions"
};

document.querySelectorAll("[data-kit-form]").forEach((form) => {
    const formType = form.dataset.kitForm;
    const action = kitFormActions[formType];
    if (!action) return;

    const input = form.querySelector("input[type='email']");
    const button = form.querySelector("button[type='submit']");
    const note = form.querySelector("[data-form-note]");

    form.action = action;
    form.method = "post";
    input.disabled = false;
    button.disabled = false;
    button.textContent = "Subscribe";
    note.hidden = true;

    form.addEventListener("submit", (event) => {
        if (!input.validity.valid) {
            event.preventDefault();
            input.focus();
            const status = form.querySelector(".form-status");
            status.textContent = "Enter a valid email address.";
        }
    });
});
