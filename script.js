/* =========================================================
   aalap.sh - main script
   - typewriter hero
   - blog teaser loader
   - last-updated timestamp
   - CTF stage 0 (devtools breadcrumb)
   ========================================================= */

(() => {
  // ---------- typewriter ----------
  const lines = [
    "$ ./skills --top",
    "  > web exploitation, SOC tooling, prompt-injection research",
    "$ ./current --status",
    "  > finals season at GMU. shipping side projects between shifts.",
    "$ echo \"hire me?\" | mail recruiters",
    "  > delivered.",
  ];
  const target = document.getElementById("typed");
  if (target) {
    let li = 0, ci = 0;
    const tick = () => {
      if (li >= lines.length) {
        target.textContent = lines.join("\n");
        return;
      }
      const cur = lines.slice(0, li).join("\n") + (li ? "\n" : "") + lines[li].slice(0, ci);
      target.textContent = cur;
      ci++;
      if (ci > lines[li].length) {
        li++;
        ci = 0;
        setTimeout(tick, 280);
      } else {
        setTimeout(tick, 18 + Math.random() * 22);
      }
    };
    setTimeout(tick, 400);
  }

  // ---------- blog teasers ----------
  const list = document.getElementById("post-list");
  if (list) {
    fetch("posts/index.json")
      .then(r => r.json())
      .then(posts => {
        const top = posts.slice(0, 3);
        list.innerHTML = top.map(p => `
          <article class="card">
            <div class="tag-row">
              <span class="tag cyan">post</span>
              ${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}
            </div>
            <h3><a href="posts/${p.slug}.html">${p.title}</a></h3>
            <p class="desc">${p.excerpt}</p>
            <div class="meta"><span>${p.date}</span><span>${p.read || "3 min"}</span></div>
          </article>
        `).join("");
      })
      .catch(() => {
        list.innerHTML = `<p class="dim">posts loading… check back shortly.</p>`;
      });
  }

  // ---------- CTF stage 0: devtools console ----------
  const banner = [
    "%c┌──────────────────────────────────────────────────────┐",
    "%c│  hey. you opened devtools. that's already a clue.    │",
    "%c│                                                      │",
    "%c│  there's a 5-stage CTF hidden on this site.          │",
    "%c│  finish it and i (Aalap) will buy you lunch.         │",
    "%c│  no joke. submit your flag + email at the end.       │",
    "%c│                                                      │",
    "%c│  flag format:  AALAP{snake_case_thing}               │",
    "%c│  start here:   /robots.txt                           │",
    "%c│                                                      │",
    "%c│  difficulty:   medium. designed to be solvable in    │",
    "%c│                30-60 minutes by anyone who's done    │",
    "%c│                a beginner CTF.                       │",
    "%c└──────────────────────────────────────────────────────┘",
    "",
    "%cstuck? each stage page has a 'hint' button that escalates.",
  ];
  const styleA = "color:#4ade80;font-family:monospace;font-size:12px";
  const styleB = "color:#22d3ee;font-family:monospace;font-size:12px";
  console.log(banner.join("\n"), ...banner.map((_, i) => i >= banner.length - 2 ? styleB : styleA));

  // ---------- last-updated freshness indicator ----------
  const lu = document.getElementById("last-updated");
  if (lu) {
    const d = new Date(lu.textContent);
    if (!isNaN(d)) {
      const days = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
      const fresh = days <= 7 ? "[ fresh ]" : days <= 30 ? "[ recent ]" : "[ stale, sorry ]";
      lu.insertAdjacentHTML("afterend", ` <span class="dim">${fresh}</span>`);
    }
  }
})();
