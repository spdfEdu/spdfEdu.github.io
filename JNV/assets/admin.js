/* JNV MSD alumni: admin page. Needs <div id="jnv-admin" data-api="..." data-client="..."> on the page. */
(function () {
  var root = document.getElementById("jnv-admin");
  if (!root) return;
  var API = (root.dataset.api || "").replace(/\/+$/, "");
  var CLIENT = root.dataset.client || "";
  var IMAGES = root.dataset.images || "https://spdfedu.github.io/JNV/images/";
  var TOKEN_KEY = "jnv-id-token"; // same key as the login page, so signing in there also signs you in here

  var HOUSES = ["Aravali", "Nilgiri", "Shivalik", "Udaigiri"];
  var BLOOD = ["A +ve", "A -ve", "B +ve", "B -ve", "AB +ve", "AB -ve", "O +ve", "O -ve"];
  var thisYear = new Date().getFullYear();
  var YEARS = []; for (var yr = 2010; yr <= thisYear + 1; yr++) YEARS.push(String(yr));
  var FIELDS = [
    ["Name", "Full name", "text"], ["Batch", "Class XII pass-out year", "select", YEARS], ["House", "House", "select", HOUSES],
    ["BloodGroup", "Blood group", "select", BLOOD], ["DOB", "Date of birth", "date"], ["Phone", "Phone", "tel"], ["Phone2", "Alternate phone", "tel"],
    ["EmailId", "Contact email", "email"], ["Address", "Address", "text"], ["PinCode", "Pin code", "text"], ["District", "District", "text"],
    ["CurrentStatus", "Current status", "text"], ["Institute", "Institute or college", "text"], ["HQD", "Highest qualification", "text"],
    ["Employment", "Employment", "text"], ["Occupation", "Occupation", "text"], ["Company", "Company", "text"], ["WorkCity", "Work city", "text"],
    ["fb", "Facebook", "text"], ["insta", "Instagram", "text"], ["linkedin", "LinkedIn", "text"], ["twitter", "X", "text"], ["youtube", "YouTube", "text"],
    ["rip", "In memoriam (year)", "text"], ["Bio", "About", "textarea"],
  ];
  var LABEL = {}; FIELDS.forEach(function (f) { LABEL[f[0]] = f[1]; });

  var st = { token: null, list: [], lastPublish: null, tab: "approvals", q: "", year: "", edit: null, merge: null, busy: false, note: "" };

  /* ---------- helpers ---------- */
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      var v = attrs[k];
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) el.setAttribute(k, v === true ? "" : v);
    }
    (function add(list) {
      for (var i = 0; i < list.length; i++) {
        var c = list[i];
        if (c == null || c === false) continue;
        if (Array.isArray(c)) add(c);
        else el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      }
    })(Array.prototype.slice.call(arguments, 2));
    return el;
  }
  function show(node) { while (root.firstChild) root.removeChild(root.firstChild); root.appendChild(node); }
  function decode(t) { try { return JSON.parse(decodeURIComponent(escape(atob(t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))))); } catch (e) { return null; } }
  function nameKey(n) { return String(n || "").replace(/ /g, "_"); }
  function ago(ts) {
    if (!ts) return "never";
    var d = new Date(ts * 1000);
    return d.toLocaleString(undefined, { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
  }
  function toast(t, bad) { st.note = t; st.noteBad = !!bad; var n = document.getElementById("ja-toast"); if (n) { n.textContent = t; n.className = "ja-toast " + (bad ? "ja-bad" : "ja-ok"); n.hidden = !t; } }

  /* ---------- token and API ---------- */
  function savedToken() {
    var t = null; try { t = localStorage.getItem(TOKEN_KEY); } catch (e) {}
    var c = t && decode(t);
    return c && c.exp * 1000 > Date.now() + 60000 ? { raw: t, claims: c } : null;
  }
  function api(path, opts) {
    opts = opts || {};
    var headers = { Authorization: "Bearer " + st.token.raw }, body;
    if (opts.json !== undefined) { headers["Content-Type"] = "application/json"; body = JSON.stringify(opts.json); }
    return fetch(API + path, { method: opts.method || "GET", headers: headers, body: body }).then(function (r) {
      if (opts.asBlob && r.ok) return r.blob();
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.status === 401) { signOut("Your sign-in expired. Please sign in again."); throw new Error("expired"); }
        if (!r.ok) throw new Error(j.error || "Something went wrong (" + r.status + ")");
        return j;
      });
    });
  }
  function whenGoogle(cb, n) {
    if (window.google && google.accounts && google.accounts.id) return cb();
    if ((n || 0) > 100) return show(h("div", { class: "ja-card" }, h("p", { class: "ja-bad", text: "Google sign-in could not load." })));
    setTimeout(function () { whenGoogle(cb, (n || 0) + 1); }, 100);
  }
  function signedOut(msg) {
    var btn = h("div", { class: "ja-gbtn" });
    show(h("div", { class: "ja-card ja-center" }, h("h2", { text: "Admin" }), msg ? h("p", { class: "ja-msg ja-warn", text: msg }) : h("p", { class: "ja-muted", text: "Sign in with the admin Gmail." }), btn));
    whenGoogle(function () {
      google.accounts.id.initialize({ client_id: CLIENT, callback: function (r) { var c = decode(r.credential); if (!c) return; st.token = { raw: r.credential, claims: c }; try { localStorage.setItem(TOKEN_KEY, r.credential); } catch (e) {} load(); }, auto_select: true });
      google.accounts.id.renderButton(btn, { theme: "outline", size: "large", shape: "pill" });
    });
  }
  function signOut(msg) { try { localStorage.removeItem(TOKEN_KEY); } catch (e) {} st.token = null; if (window.google && google.accounts) google.accounts.id.disableAutoSelect(); signedOut(typeof msg === "string" ? msg : ""); }

  /* ---------- data ---------- */
  function load(keep) {
    if (!keep) show(h("div", { class: "ja-card ja-center" }, h("p", { class: "ja-muted", text: "Loading..." })));
    return api("/api/admin/list").then(function (r) {
      st.list = r.members; st.lastPublish = r.last_publish;
      draw();
    }).catch(function (e) {
      if (e.message === "expired") return;
      if (/Admins only/.test(e.message)) return show(h("div", { class: "ja-card" }, h("h2", { text: "Admins only" }), h("p", { class: "ja-muted", text: "This Gmail is not on the admin list." }), h("button", { class: "ja-btn", type: "button", text: "Sign out", onclick: function () { signOut(); } })));
      show(h("div", { class: "ja-card" }, h("p", { class: "ja-msg ja-bad", text: e.message })));
    });
  }
  function needsApproval(m) { return !!(m.draft || m.draft_photo); }
  function changedKeys(m) {
    if (!m.pub) return null; // new entry, nothing published yet
    var keys = {}, out = [], k;
    for (k in m.data) keys[k] = 1; for (k in m.pub) keys[k] = 1;
    for (k in keys) if (JSON.stringify(m.data[k]) !== JSON.stringify(m.pub[k])) out.push(k);
    if (m.photo !== m.pub_photo) out.push("photo");
    return out;
  }
  function act(label, fn) {
    if (st.busy) return;
    st.busy = true; toast(label + "...");
    return fn().then(function (msg) { st.busy = false; st.merge = null; st.edit = null; return load(true).then(function () { toast(msg || "Done"); }); })
      .catch(function (e) { st.busy = false; if (e.message !== "expired") toast(e.message, true); });
  }

  /* ---------- screens ---------- */
  function draw() {
    var pend = st.list.filter(needsApproval), wait = st.list.filter(function (m) { return m.dirty && m.status === "approved"; });
    var user = st.token.claims || {};
    var top = h("div", { class: "ja-top" }, h("span", { text: user.email || "" }), h("button", { class: "ja-link", type: "button", text: "Sign out", onclick: function () { signOut(); } }));
    var sum = h("div", { class: "ja-sum" },
      h("button", { class: "ja-stat" + (st.tab === "approvals" ? " ja-on" : ""), type: "button", onclick: function () { st.tab = "approvals"; draw(); } }, h("b", { text: String(pend.length) }), h("span", { text: "Need approval" })),
      h("button", { class: "ja-stat" + (st.tab === "waiting" ? " ja-on" : ""), type: "button", onclick: function () { st.tab = "waiting"; draw(); } }, h("b", { text: String(wait.length) }), h("span", { text: "Waiting to publish" })),
      h("button", { class: "ja-stat" + (st.tab === "all" ? " ja-on" : ""), type: "button", onclick: function () { st.tab = "all"; draw(); } }, h("b", { text: String(st.list.length) }), h("span", { text: "All alumni" })));
    var pub = h("div", { class: "ja-pub" },
      h("span", { class: "ja-muted", text: "Last published: " + ago(st.lastPublish) + ". The site also updates itself at 3 AM IST when something changed." }),
      h("button", { class: "ja-btn ja-primary", type: "button", text: "Publish now", disabled: wait.length === 0, onclick: function () {
        if (confirm("Publish " + wait.length + " change(s) to the site now?")) act("Publishing", function () { return api("/api/admin/publish", { method: "POST" }).then(function (r) { return "Published " + r.published + " change(s)."; }); });
      } }));
    var toastEl = h("p", { id: "ja-toast", class: "ja-toast", role: "status", hidden: !st.note, text: st.note }); if (st.note) toastEl.className = "ja-toast " + (st.noteBad ? "ja-bad" : "ja-ok");
    var body;
    if (st.edit) body = editor(st.edit);
    else if (st.tab === "approvals") body = approvals(pend);
    else if (st.tab === "waiting") body = waiting(wait);
    else body = everyone();
    show(h("div", { class: "ja-wrap" }, top, h("h2", { text: "Alumni admin" }), sum, pub, toastEl, body));
  }

  function field(label, text) { return h("div", { class: "ja-kv" }, h("span", { class: "ja-k", text: label }), h("span", { class: "ja-v", text: text })); }

  function approvals(list) {
    if (!list.length) return h("p", { class: "ja-empty", text: "Nothing is waiting for approval." });
    return h("div", null, list.map(function (m) {
      var isNew = m.status !== "approved";
      var vals = isNew ? (m.draft || {}) : m.draft || {};
      var card = h("div", { class: "ja-card" },
        h("div", { class: "ja-row" }, h("div", null, h("h3", { text: (vals.Name || m.name) }), h("p", { class: "ja-muted", text: m.email })),
          h("span", { class: "ja-chip" + (isNew ? "" : " ja-alt"), text: isNew ? (m.status === "rejected" ? "Rejected earlier" : "New sign-up") : "Name or batch change" })));
      var photo = h("img", { class: "ja-thumb", alt: "", width: "72", height: "72", hidden: true });
      if (m.draft_photo) { card.insertBefore(photo, card.children[1] || null); api("/api/admin/photo/" + m.draft_photo, { asBlob: true }).then(function (b) { photo.src = URL.createObjectURL(b); photo.hidden = false; }, function () {}); }
      if (isNew) {
        var lines = h("div", { class: "ja-kvs" });
        FIELDS.forEach(function (f) { if (vals[f[0]] !== undefined && vals[f[0]] !== "") lines.appendChild(field(f[1], String(vals[f[0]]))); });
        card.appendChild(lines);
      } else {
        var cur = m.data || {};
        card.appendChild(field("Name", (cur.Name || m.name) + "  →  " + (vals.Name || cur.Name || m.name)));
        card.appendChild(field("Batch", m.batch + "  →  " + (vals.Batch || m.batch)));
      }
      card.appendChild(h("div", { class: "ja-actions" },
        h("button", { class: "ja-btn ja-primary", type: "button", text: "Approve", onclick: function () { act("Approving", function () { return api("/api/admin/" + m.id + "/approve", { method: "POST" }).then(function () { return "Approved. It goes live at the next publish."; }); }); } }),
        h("button", { class: "ja-btn", type: "button", text: "Reject", onclick: function () { if (confirm("Reject this request?")) act("Rejecting", function () { return api("/api/admin/" + m.id + "/reject", { method: "POST" }).then(function () { return "Rejected."; }); }); } }),
        isNew ? h("button", { class: "ja-btn", type: "button", text: "Edit", onclick: function () { st.edit = m.id; draw(); } }) : null,
        isNew ? h("button", { class: "ja-btn", type: "button", text: "Link to existing alumnus", onclick: function () { st.merge = st.merge === m.id ? null : m.id; st.mq = (vals.Name || m.name || ""); draw(); } }) : null));
      if (st.merge === m.id) card.appendChild(mergeBox(m, vals));
      return card;
    }));
  }

  function mergeBox(m, vals) {
    var box = h("div", { class: "ja-merge" }, h("p", { class: "ja-muted", text: "Pick the existing entry this person already has. Their Gmail will be attached to it, and the details they entered are added to it." }));
    var list = h("div", { class: "ja-mlist" });
    var input = h("input", { type: "search", class: "ja-input", placeholder: "Search by name", value: st.mq || "", oninput: function (e) { st.mq = e.target.value; fill(); } });
    function fill() {
      while (list.firstChild) list.removeChild(list.firstChild);
      var q = (st.mq || "").toLowerCase().trim(), yr = String(vals.Batch || m.batch || "");
      var c = st.list.filter(function (x) { return x.status === "approved" && x.id !== m.id && /@jnvmsd\.invalid$|./.test(x.email) && (!q || (x.name || "").toLowerCase().indexOf(q) >= 0); });
      c.sort(function (a, b) { return (String(b.batch) === yr) - (String(a.batch) === yr) || a.name.localeCompare(b.name); });
      c.slice(0, 12).forEach(function (x) {
        list.appendChild(h("button", { class: "ja-pick", type: "button", onclick: function () {
          if (confirm("Link " + m.email + " to " + x.name + " (batch " + x.batch + ")?")) act("Linking", function () { return api("/api/admin/" + m.id + "/merge", { method: "POST", json: { target: x.id } }).then(function () { return "Linked to " + x.name + "."; }); });
        } }, h("b", { text: x.name }), h("span", { text: " Batch " + x.batch + (/@jnvmsd\.invalid$/.test(x.email) ? " (no email on file)" : "  " + x.email) })));
      });
      if (!c.length) list.appendChild(h("p", { class: "ja-empty", text: "No match." }));
    }
    fill();
    box.appendChild(input); box.appendChild(list);
    return box;
  }

  function waiting(list) {
    if (!list.length) return h("p", { class: "ja-empty", text: "Nothing is waiting. The site shows the latest details." });
    return h("div", null, list.map(function (m) {
      var keys = changedKeys(m);
      return h("div", { class: "ja-card" },
        h("div", { class: "ja-row" }, h("div", null, h("h3", { text: m.name }), h("p", { class: "ja-muted", text: "Batch " + m.batch + "  " + m.email })),
          h("span", { class: "ja-chip", text: keys === null ? "New entry" : keys.length + " change" + (keys.length === 1 ? "" : "s") })),
        keys && keys.length ? h("p", { class: "ja-changes", text: keys.map(function (k) { return LABEL[k] || (k === "photo" ? "Photo" : k); }).join(", ") }) : null,
        h("div", { class: "ja-actions" },
          h("button", { class: "ja-btn", type: "button", text: "Edit", onclick: function () { st.edit = m.id; draw(); } }),
          m.has_prev ? h("button", { class: "ja-btn", type: "button", text: "Undo last edit", onclick: function () { if (confirm("Go back to the version before the last edit?")) act("Undoing", function () { return api("/api/admin/" + m.id + "/undo", { method: "POST" }).then(function () { return "Reverted. It reaches the site at the next publish."; }); }); } }) : null));
    }));
  }

  function everyone() {
    var q = h("input", { type: "search", class: "ja-input", placeholder: "Search name or email", value: st.q, oninput: function (e) { st.q = e.target.value; fillRows(); } });
    var yrs = {}; st.list.forEach(function (m) { yrs[m.batch] = 1; });
    var sel = h("select", { class: "ja-input", onchange: function (e) { st.year = e.target.value; fillRows(); } }, h("option", { value: "", text: "All batches" }),
      Object.keys(yrs).sort().map(function (y) { return h("option", { value: y, text: "Batch " + y, selected: String(y) === st.year }); }));
    var rows = h("div", { class: "ja-rows" });
    function fillRows() {
      while (rows.firstChild) rows.removeChild(rows.firstChild);
      var qq = st.q.toLowerCase().trim();
      var l = st.list.filter(function (m) { return (!st.year || String(m.batch) === st.year) && (!qq || (m.name + " " + m.email).toLowerCase().indexOf(qq) >= 0); });
      l.sort(function (a, b) { return a.batch - b.batch || a.name.localeCompare(b.name); });
      l.slice(0, 80).forEach(function (m) {
        rows.appendChild(h("button", { class: "ja-rowbtn", type: "button", onclick: function () { st.edit = m.id; draw(); } },
          h("b", { text: m.name }), h("span", { text: "Batch " + m.batch + (m.status !== "approved" ? "  " + m.status : "") + (m.dirty ? "  changed" : "") }),
          h("span", { class: "ja-muted", text: m.email })));
      });
      if (l.length > 80) rows.appendChild(h("p", { class: "ja-empty", text: (l.length - 80) + " more, narrow the search." }));
      if (!l.length) rows.appendChild(h("p", { class: "ja-empty", text: "No match." }));
    }
    fillRows();
    return h("div", null, h("div", { class: "ja-filters" }, q, sel), rows);
  }

  function editor(id) {
    var m = st.list.filter(function (x) { return x.id === id; })[0];
    if (!m) { st.edit = null; return everyone(); }
    var vals = m.status === "approved" ? m.data : (m.draft || {});
    var form = h("form", { class: "ja-form", novalidate: true, onsubmit: function (e) {
      e.preventDefault();
      var data = {};
      FIELDS.forEach(function (f) { var v = String(form.elements[f[0]].value || "").trim(); if (v) data[f[0]] = v; });
      var email = String(form.elements.__email.value || "").trim();
      act("Saving", function () { return api("/api/admin/" + m.id, { method: "PUT", json: { email: email, data: data } }).then(function () { return m.status === "approved" ? "Saved. It reaches the site at the next publish." : "Saved."; }); });
    } });
    form.appendChild(h("div", { class: "ja-field" }, h("label", { for: "ja-__email", text: "Google email (used to sign in)" }), h("input", { id: "ja-__email", name: "__email", type: "email", value: m.email, class: "ja-input" })));
    FIELDS.forEach(function (f) {
      var key = f[0], val = vals[key] === undefined ? "" : String(vals[key]), input;
      if (f[2] === "select") {
        input = h("select", { id: "ja-" + key, name: key, class: "ja-input" }, h("option", { value: "", text: "" }));
        var opts = f[3].slice(); if (val && opts.indexOf(val) < 0) opts.push(val);
        opts.forEach(function (o) { input.appendChild(h("option", { value: o, text: o })); });
      } else if (f[2] === "textarea") input = h("textarea", { id: "ja-" + key, name: key, rows: 3, class: "ja-input" });
      else input = h("input", { id: "ja-" + key, name: key, type: f[2], class: "ja-input" });
      input.value = val;
      form.appendChild(h("div", { class: "ja-field" }, h("label", { for: "ja-" + key, text: f[1] }), input));
    });
    form.appendChild(h("div", { class: "ja-actions" },
      h("button", { class: "ja-btn ja-primary", type: "submit", text: "Save" }),
      h("button", { class: "ja-btn", type: "button", text: "Cancel", onclick: function () { st.edit = null; draw(); } }),
      h("button", { class: "ja-btn ja-danger", type: "button", text: "Delete", onclick: function () { if (confirm("Delete " + m.name + " permanently?")) act("Deleting", function () { return api("/api/admin/" + m.id, { method: "DELETE" }).then(function () { return "Deleted."; }); }); } })));
    var img = h("img", { class: "ja-thumb", alt: "", width: "72", height: "72", src: m.photo ? API + "/api/photo/" + m.photo : IMAGES + m.batch + "/" + nameKey(m.name) + ".jpg" });
    img.addEventListener("error", function () { img.hidden = true; });
    return h("div", { class: "ja-card" }, h("div", { class: "ja-row" }, h("div", null, h("h3", { text: m.name }), h("p", { class: "ja-muted", text: m.status === "approved" ? "Batch " + m.batch : "Not approved yet. Editing their request." })), img), form);
  }

  /* ---------- start ---------- */
  if (!API || !CLIENT) return show(h("div", { class: "ja-card" }, h("p", { class: "ja-bad", text: "Missing data-api or data-client." })));
  var t = savedToken();
  if (t) { st.token = t; load(); } else signedOut("");
})();
