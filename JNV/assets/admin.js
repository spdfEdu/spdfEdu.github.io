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

  var st = { role: null, isAdmin: false, photos: [], pcounts: { new: 0, approved: 0, rejected: 0 }, pf: "new", pbatch: "", token: null, list: [], roles: [], owners: [], tab: "approvals", q: "", year: "", edit: null, merge: null, busy: false, note: "", noteBad: false };

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
  function loadPhotos() {
    var q = "?status=" + (st.pf === "all" ? "" : st.pf) + (st.pbatch ? "&batch=" + st.pbatch : "");
    return api("/api/review/gallery" + q).then(function (r) { st.photos = r.photos; st.pcounts = r.counts; });
  }
  function load(keep) {
    if (!keep) show(h("div", { class: "ja-card ja-center" }, h("p", { class: "ja-muted", text: "Loading..." })));
    return api("/api/me").then(function (me) {
      st.role = me.role; st.isAdmin = !!me.isAdmin;
      if (!me.isAdmin && me.role !== "core") throw new Error("Admins only");
      if (!st.isAdmin) { st.list = []; st.roles = []; st.owners = []; st.tab = "photos"; return; } // core members only review photos
      return Promise.all([api("/api/admin/list"), api("/api/admin/roles")]).then(function (r) { st.list = r[0].members; st.roles = r[1].roles; st.owners = r[1].owners; });
    }).then(loadPhotos).then(draw).catch(function (e) {
      if (e.message === "expired") return;
      if (/Admins only/.test(e.message)) return show(h("div", { class: "ja-card" }, h("h2", { text: "Admins only" }), h("p", { class: "ja-muted", text: "This Gmail is not on the admin or core member list." }), h("button", { class: "ja-btn", type: "button", text: "Sign out", onclick: function () { signOut(); } })));
      show(h("div", { class: "ja-card" }, h("p", { class: "ja-msg ja-bad", text: e.message })));
    });
  }
  function needsApproval(m) { return !!(m.draft || m.draft_photo); }
  function act(label, fn) {
    if (st.busy) return;
    st.busy = true; toast(label + "...");
    return fn().then(function (msg) { st.busy = false; st.merge = null; st.edit = null; return load(true).then(function () { toast(msg || "Done"); }); })
      .catch(function (e) { st.busy = false; if (e.message !== "expired") toast(e.message, true); });
  }
  function ofRole(role) { return st.roles.filter(function (r) { return r.role === role; }); }

  /* ---------- screens ---------- */
  function draw() {
    var pend = st.list.filter(needsApproval);
    var user = st.token.claims || {};
    var top = h("div", { class: "ja-top" }, h("span", { text: user.email || "" }),
      h("span", null, h("a", { class: "ja-link", href: root.dataset.login || "/p/login.html", text: "My profile" }), "  ", h("button", { class: "ja-link", type: "button", text: "Sign out", onclick: function () { signOut(); } })));
    function tab(id, label, count) {
      return h("button", { class: "ja-stat" + (st.tab === id && !st.edit ? " ja-on" : ""), type: "button", onclick: function () { st.tab = id; st.edit = null; st.merge = null; draw(); } },
        h("b", { text: count === null ? "" : String(count) }), h("span", { text: label }));
    }
    var tabs = h("div", { class: "ja-sum" },
      st.isAdmin ? tab("approvals", "Approvals", pend.length) : null, st.isAdmin ? tab("members", "Edit members", st.list.filter(function (m) { return m.status === "approved"; }).length) : null,
      tab("photos", "Photos", st.pcounts.new),
      st.isAdmin ? tab("core", "Core Members", ofRole("core").length) : null, st.isAdmin ? tab("admins", "Admins", st.owners.length + ofRole("admin").length) : null);
    var toastEl = h("p", { id: "ja-toast", class: "ja-toast", role: "status", hidden: !st.note, text: st.note }); if (st.note) toastEl.className = "ja-toast " + (st.noteBad ? "ja-bad" : "ja-ok");
    var body;
    if (st.edit) body = editor(st.edit);
    else if (st.tab === "photos") body = photosTab();
    else if (st.tab === "approvals") body = approvals(pend);
    else if (st.tab === "members") body = everyone();
    else body = rolesTab(st.tab === "core" ? "core" : "admin");
    show(h("div", { class: "ja-wrap" }, top, h("h2", { text: "Alumni admin" }), tabs, toastEl, body));
  }

  // choose which uploaded photos join the batch slider
  function photosTab() {
    var chips = h("div", { class: "ja-pf" });
    [["new", "To review", st.pcounts.new], ["approved", "In slider", st.pcounts.approved], ["rejected", "Not selected", st.pcounts.rejected], ["all", "All", st.pcounts.new + st.pcounts.approved + st.pcounts.rejected]].forEach(function (f) {
      chips.appendChild(h("button", { class: "ja-chipbtn" + (st.pf === f[0] ? " ja-on" : ""), type: "button", onclick: function () { st.pf = f[0]; loadPhotos().then(draw); } }, f[1] + " (" + f[2] + ")"));
    });
    var sel = h("select", { class: "ja-input", "aria-label": "Batch", onchange: function (e) { st.pbatch = e.target.value; loadPhotos().then(draw); } }, h("option", { value: "", text: "All batches" }),
      YEARS.slice().reverse().map(function (y) { return h("option", { value: y, text: "Batch " + y, selected: y === st.pbatch }); }));
    var wrap = h("div", null, h("p", { class: "ja-muted ja-pnote", text: "Every uploaded photo already shows on its owner's profile. Add the best ones, group photos first, to the batch slider." }), chips, h("div", { class: "ja-filters ja-pbatch" }, sel));
    if (!st.photos.length) { wrap.appendChild(h("p", { class: "ja-empty", text: "No photos here." })); return wrap; }
    var grid = h("div", { class: "ja-pgrid" });
    st.photos.forEach(function (p) {
      var label = p.status === "approved" ? "In slider" : p.status === "rejected" ? "Not selected" : "New";
      var tile = h("div", { class: "ja-ph" },
        h("a", { href: p.url, target: "_blank", rel: "noopener", class: "ja-phimg" }, h("img", { src: p.url, alt: "", loading: "lazy" })),
        h("div", { class: "ja-phmeta" }, h("b", { text: p.name }), h("span", { class: "ja-muted", text: "Batch " + p.batch }), h("span", { class: "ja-chip ja-alt ja-st-" + p.status, text: label })),
        h("div", { class: "ja-actions" },
          p.status !== "approved" ? h("button", { class: "ja-btn ja-primary", type: "button", text: "Add to slider", onclick: function () { act("Adding", function () { return api("/api/review/gallery/" + p.id + "/approve", { method: "POST" }).then(function () { return "Added to the " + p.batch + " slider."; }); }); } }) : null,
          p.status !== "rejected" ? h("button", { class: "ja-btn", type: "button", text: p.status === "approved" ? "Remove from slider" : "Not selected", onclick: function () { act("Saving", function () { return api("/api/review/gallery/" + p.id + "/reject", { method: "POST" }).then(function () { return "Saved."; }); }); } }) : null,
          st.isAdmin ? h("button", { class: "ja-btn ja-danger", type: "button", text: "Delete", onclick: function () { if (confirm("Delete this photo for good?")) act("Deleting", function () { return api("/api/review/gallery/" + p.id, { method: "DELETE" }).then(function () { return "Photo deleted."; }); }); } }) : null));
      grid.appendChild(tile);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function field(label, text) { return h("div", { class: "ja-kv" }, h("span", { class: "ja-k", text: label }), h("span", { class: "ja-v", text: text })); }

  function approvals(list) {
    if (!list.length) return h("p", { class: "ja-empty", text: "Nothing is waiting for approval." });
    return h("div", null, list.map(function (m) {
      var isNew = m.status !== "approved";
      var vals = m.draft || {};
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
        h("button", { class: "ja-btn ja-primary", type: "button", text: "Approve", onclick: function () { act("Approving", function () { return api("/api/admin/" + m.id + "/approve", { method: "POST" }).then(function () { return "Approved. It is live on the site."; }); }); } }),
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
      var c = st.list.filter(function (x) { return x.status === "approved" && x.id !== m.id && (!q || (x.name || "").toLowerCase().indexOf(q) >= 0); });
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

  // search any registered alumnus by name, then open the full editor
  function everyone() {
    var q = h("input", { type: "search", class: "ja-input", placeholder: "Search by name or email", value: st.q, "aria-label": "Search members", oninput: function (e) { st.q = e.target.value; fillRows(); } });
    var yrs = {}; st.list.forEach(function (m) { if (m.status === "approved") yrs[m.batch] = 1; });
    var sel = h("select", { class: "ja-input", "aria-label": "Batch", onchange: function (e) { st.year = e.target.value; fillRows(); } }, h("option", { value: "", text: "All batches" }),
      Object.keys(yrs).sort().map(function (y) { return h("option", { value: y, text: "Batch " + y, selected: String(y) === st.year }); }));
    var rows = h("div", { class: "ja-rows" });
    function fillRows() {
      while (rows.firstChild) rows.removeChild(rows.firstChild);
      var qq = st.q.toLowerCase().trim();
      if (!qq && !st.year) { rows.className = ""; rows.appendChild(h("p", { class: "ja-empty", text: "Type a name, or pick a batch, then choose the alumnus to edit." })); return; }
      rows.className = "ja-rows";
      var l = st.list.filter(function (m) { return m.status === "approved" && (!st.year || String(m.batch) === st.year) && (!qq || (m.name + " " + m.email).toLowerCase().indexOf(qq) >= 0); });
      l.sort(function (a, b) { return a.batch - b.batch || a.name.localeCompare(b.name); });
      l.slice(0, 60).forEach(function (m) {
        rows.appendChild(h("button", { class: "ja-rowbtn", type: "button", onclick: function () { st.edit = m.id; draw(); } },
          h("b", { text: m.name }), h("span", { text: "Batch " + m.batch }),
          h("span", { class: "ja-muted", text: /@jnvmsd\.invalid$/.test(m.email) ? "no email on file" : m.email })));
      });
      if (l.length > 60) rows.appendChild(h("p", { class: "ja-empty", text: (l.length - 60) + " more, narrow the search." }));
      if (!l.length) { rows.className = ""; rows.appendChild(h("p", { class: "ja-empty", text: "No match." })); }
    }
    fillRows();
    return h("div", null, h("div", { class: "ja-filters" }, q, sel), rows);
  }

  // add or remove core members and admins
  function rolesTab(role) {
    var isAdminTab = role === "admin";
    var title = isAdminTab ? "Admins" : "Core Members";
    var blurb = isAdminTab
      ? "Admins can approve people, edit anyone and manage these lists. Owners come from the Cloudflare settings and cannot be removed here."
      : "Core Members can see phone numbers, addresses and pin codes on the year pages when signed in with their Gmail.";
    var wrap = h("div", { class: "ja-card" }, h("h3", { text: title }), h("p", { class: "ja-muted", text: blurb }));
    var rows = h("div", { class: "ja-rows ja-roles" });
    if (isAdminTab) st.owners.forEach(function (e) { rows.appendChild(h("div", { class: "ja-rolerow" }, h("div", null, h("b", { text: e }), h("span", { class: "ja-muted", text: "Owner" })))); });
    ofRole(role).forEach(function (r) {
      rows.appendChild(h("div", { class: "ja-rolerow" },
        h("div", null, h("b", { text: r.email }), r.note ? h("span", { class: "ja-muted", text: r.note }) : null),
        h("button", { class: "ja-btn ja-danger", type: "button", text: "Remove", onclick: function () {
          if (confirm("Remove " + r.email + " from " + title + "?")) act("Removing", function () { return api("/api/admin/roles/" + encodeURIComponent(r.email), { method: "DELETE" }).then(function () { return "Removed."; }); });
        } })));
    });
    if (!rows.firstChild) rows.appendChild(h("p", { class: "ja-empty", text: "No one added yet." }));
    wrap.appendChild(rows);
    var email = h("input", { class: "ja-input", type: "email", placeholder: "Gmail address", "aria-label": "Gmail address", autocapitalize: "none" });
    var note = h("input", { class: "ja-input", type: "text", placeholder: "Note (optional)", "aria-label": "Note", maxlength: "120" });
    var add = h("form", { class: "ja-add", novalidate: true, onsubmit: function (e) {
      e.preventDefault();
      var v = email.value.trim();
      if (!v) return toast("Enter a Gmail address", true);
      act("Adding", function () { return api("/api/admin/roles", { method: "POST", json: { email: v, role: role, note: note.value } }).then(function () { return v.toLowerCase() + " added."; }); });
    } }, h("p", { class: "ja-muted", text: "Add a Gmail" }), email, note, h("button", { class: "ja-btn ja-primary", type: "submit", text: "Add" }));
    wrap.appendChild(add);
    return wrap;
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
      act("Saving", function () { return api("/api/admin/" + m.id, { method: "PUT", json: { email: email, data: data } }).then(function () { return m.status === "approved" ? "Saved. It is live on the site." : "Saved."; }); });
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
      m.has_prev ? h("button", { class: "ja-btn", type: "button", text: "Undo last edit", onclick: function () { if (confirm("Go back to the version before the last edit?")) act("Undoing", function () { return api("/api/admin/" + m.id + "/undo", { method: "POST" }).then(function () { return "Reverted."; }); }); } }) : null,
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
