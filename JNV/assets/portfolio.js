/* JNV MSD alumni year page loader.
   Asks the API for this batch (live data), falls back to the copy this browser saved last time,
   then to the data pasted in the post. Then starts the page (portfolioz_core.js). */
(function () {
  var API = window.JNV_API || "https://api.jnvmurshidabad.workers.dev"; // set window.JNV_API before this script to point elsewhere
  var TOKEN_KEY = "jnv-id-token";
  var me = document.currentScript;
  var base = me && me.src ? me.src.replace(/[^\/]*$/, "") : "";

  var year = (typeof BATCH !== "undefined" && BATCH) || (typeof all !== "undefined" && all[0] && all[0].Batch) || ((location.pathname.match(/(\d{4})/) || [])[1]);
  var cacheKey = "jnv-cache-" + year;

  function token() {
    try {
      var t = localStorage.getItem(TOKEN_KEY);
      var c = t && JSON.parse(atob(t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      return c && c.exp * 1000 > Date.now() + 60000 ? t : null;
    } catch (e) { return null; }
  }

  function fetchBatch(level, tok) {
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 6000) : null;
    return fetch(API + "/api/batch/" + year + "?level=" + level, { headers: tok ? { Authorization: "Bearer " + tok } : {}, signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (timer) clearTimeout(timer); if (!r.ok) throw new Error(r.status); return r.json(); });
  }

  function use(list, level) {
    all.length = 0;
    Array.prototype.push.apply(all, list);
    window.JNV_LIVE = true;
    window.JNV_LEVEL = level;
  }

  function startPage() {
    var s = document.createElement("script");
    s.src = base + "portfolioz_core.js";
    // the profiles are built after the page has loaded, so open a linked profile (#Name) ourselves
    s.onload = function () {
      var h = location.hash;
      if (h && h.length > 1) { history.replaceState(null, "", location.pathname + location.search); location.hash = h; }
    };
    document.body.appendChild(s);
  }

  if (!year) return startPage();
  var tok = token();
  window.JNV_SIGNED = !!tok;
  // signed-in core members and admins get the full version; everyone else the public one
  var first = tok
    ? fetchBatch("full", tok).then(function (j) { return { j: j, level: "full" }; }, function () { return fetchBatch("public").then(function (j) { return { j: j, level: "public" }; }); })
    : fetchBatch("public").then(function (j) { return { j: j, level: "public" }; });

  first.then(function (r) {
    window.JNV_SLIDES = r.j.slides || []; // photos approved for the batch slider
    if (r.level === "public") { try { localStorage.setItem("jnv-slides-" + year, JSON.stringify(window.JNV_SLIDES)); } catch (e) {} }
    if (r.j.entries && r.j.entries.length) {
      use(r.j.entries, r.level);
      if (r.level === "public") { try { localStorage.setItem(cacheKey, JSON.stringify(r.j.entries)); } catch (e) {} }
    }
  }).catch(function () {
    try { var c = JSON.parse(localStorage.getItem(cacheKey)); if (c && c.length) use(c, "public"); } catch (e) {}
    try { window.JNV_SLIDES = JSON.parse(localStorage.getItem("jnv-slides-" + year)) || []; } catch (e) { window.JNV_SLIDES = []; }
  }).then(function () {
    // who is signed in (used to mark their own profile and show Edit)
    if (!tok) return;
    return fetch(API + "/api/me", { headers: { Authorization: "Bearer " + tok } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j) window.JNV_ME = j; })
      .catch(function () {});
  }).then(startPage);
})();
