// One shared observer for every revealed element (same behavior as the redesign's [data-reveal]):
// an element gets data-in="true" once it enters the viewport, or once it is above 94% of the
// viewport after a jump (scrollend / hashchange sweep), and is then no longer tracked.
const pending = new Set();
let observer = null;

function reveal(el) {
    el.dataset.in = "true";
    pending.delete(el);
    observer.unobserve(el);
}

function sweep() {
    const limit = window.innerHeight * 0.94;
    pending.forEach((el) => {
        if (el.getBoundingClientRect().top < limit) reveal(el);
    });
}

function getObserver() {
    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) reveal(entry.target);
                });
                sweep();
            },
            { rootMargin: "0px 0px -6% 0px" }
        );
        window.addEventListener("scrollend", sweep);
        window.addEventListener("hashchange", () => setTimeout(sweep, 60));
    }
    return observer;
}

function registerReveal(el) {
    if (!el || el.dataset.in === "true") return;
    pending.add(el);
    getObserver().observe(el);
    return () => {
        pending.delete(el);
        observer.unobserve(el);
    };
}

// Returns a stable callback ref (React 19 ref cleanup unregisters the element).
export default function useReveal() {
    return registerReveal;
}
