/* JNV MSD alumni: sign in with Google, see your details, switch on Edit to change them.
   Needs <div id="jnv-login" data-api="..." data-client="..."> on the page. */
(function () {
  var root = document.getElementById("jnv-login");
  if (!root) return;
  var API = (root.dataset.api || "").replace(/\/+$/, "");
  var CLIENT = root.dataset.client || "";
  var IMAGES = root.dataset.images || "https://spdfedu.github.io/JNV/images/";
  var TOKEN_KEY = "jnv-id-token";

  var HOUSES = ["Aravali", "Nilgiri", "Shivalik", "Udaigiri"];
  var BLOOD = ["A +ve", "A -ve", "B +ve", "B -ve", "AB +ve", "AB -ve", "O +ve", "O -ve"];
  var STATUS = ["Studying", "Working", "Preparation", "Self employed", "Employee", "Looking for a job"];
  var thisYear = new Date().getFullYear();
  var YEARS = []; for (var yr = 2010; yr <= thisYear + 1; yr++) YEARS.push(String(yr));

  // [key, label, type, options, private]
  var SECTIONS = [
    ["Personal", [
      ["Name", "Full name", "text"],
      ["Batch", "Class XII pass-out year", "select", YEARS],
      ["House", "House", "select", HOUSES],
      ["BloodGroup", "Blood group", "select", BLOOD],
      ["DOB", "Date of birth", "date", null, true],
      ["City", "Current city", "text"],
    ]],
    ["Contact", [
      ["Phone", "Phone", "tel", null, true],
      ["Phone2", "Alternate phone", "tel", null, true],
      ["EmailId", "Email", "email"],
    ]],
    ["Address", [
      ["Address", "Address", "text", null, true],
      ["PinCode", "Pin code", "text", null, true],
      ["District", "District", "text"],
    ]],
    ["Current status", [
      ["CurrentStatus", "Current status", "text", STATUS],
      ["Institute", "Institute or college", "text"],
      ["HQD", "Highest qualification", "text"],
      ["Employment", "Employment", "text"],
      ["Occupation", "Occupation", "text"],
      ["Company", "Company", "text"],
      ["WorkCity", "Work city", "text"],
    ]],
    ["Social", [
      ["fb", "Facebook (username or link)", "text"],
      ["insta", "Instagram (username or link)", "text"],
      ["linkedin", "LinkedIn (link)", "text"],
      ["twitter", "X (username)", "text"],
      ["youtube", "YouTube (link)", "text"],
    ]],
    ["About you", [
      ["Bio", "A few lines about you", "textarea"],
      ["Skills", "Skills (comma separated)", "text", null, false, null, 300],
      ["Languages", "Languages known (comma separated)", "text", null, false, null, 200],
      ["Achievements", "Achievements (one per line)", "textarea", null, false, "lines", 600],
      ["Memories", "Favourite memories of Navodaya", "textarea", null, false, null, 1200],
    ]],
  ];

  // Repeatable lists. Saved as one text value: rows joined by "~", columns by "|".
  // [key, title, add label, [[column, label, placeholder, wide]]]
  var LISTS = [
    ["EduList", "Education history", "Add education", [["Year", "Year", "2025"], ["Course", "Course", "MBBS"], ["Institute", "Institute name", "", true], ["City", "City", "", true]]],
    ["WorkList", "Employment history", "Add employment", [["Year", "Year", "2026"], ["Company", "Company name", ""], ["Position", "Position", "", true], ["City", "City", "", true]]],
    ["JnvVisits", "Extracurricular: JNV visits", "Add visit", [["Year", "Year", "2016"], ["Activity", "Activity", "Badminton"], ["JNV", "JNV (District)", "JNV Nadia", true]]]
  ];
  var AFTER = { "Current status": [0, 1], "About you": [2] }; // where each list sits
  var MAX_ROWS = 10, uid = 0;

  function clean(t) { return String(t || "").replace(/[|~]/g, " ").replace(/\s+/g, " ").trim(); }
  function parseRows(t) { return t ? String(t).split("~").map(function (r) { return r.split("|"); }) : []; }
  function readList(box) {
    var rows = [];
    [].forEach.call(box.querySelectorAll(".jl-item"), function (it) {
      var parts = [].map.call(it.querySelectorAll("input"), function (i) { return clean(i.value); });
      if (parts.some(Boolean)) rows.push(parts.join("|"));
    });
    return rows.join("~");
  }
  function listBox(def, val, editing) {
    var box = h("fieldset", { class: "jl-sec jl-list", "data-list": def[0] }, h("legend", { text: def[1] }));
    var wrap = h("div", { class: "jl-items" });
    box.appendChild(wrap);
    function addRow(vals) {
      if (wrap.children.length >= MAX_ROWS) return;
      var it = h("div", { class: "jl-item" });
      def[3].forEach(function (c, i) {
        var id = "jl-l" + (++uid);
        var inp = h("input", { id: id, type: "text", maxlength: 80, disabled: !editing, placeholder: editing ? (c[2] || "") : "-", autocomplete: "off" });
        if (c[0] === "Year") inp.setAttribute("inputmode", "numeric");
        inp.value = vals[i] || "";
        it.appendChild(h("div", { class: "jl-field" + (c[3] ? " jl-wide" : "") }, h("label", { for: id, text: c[1] }), inp));
      });
      it.appendChild(h("button", { type: "button", class: "jl-btn jl-small jl-rm jl-wide", text: "Remove", onclick: function () { wrap.removeChild(it); } }));
      wrap.appendChild(it);
    }
    parseRows(val).forEach(addRow);
    if (editing) {
      if (!wrap.children.length) addRow([]);
      box.appendChild(h("button", { type: "button", class: "jl-btn jl-small jl-add", text: "+ " + def[2], onclick: function () { addRow([]); } }));
    } else if (!wrap.children.length) box.appendChild(h("p", { class: "jl-muted", text: "Not added" }));
    return box;
  }

  var state = { flash: "", token: null, claims: null, me: null, photoBlob: null, photoUrl: null, ownPhotoUrl: null, editing: false, busy: false };

  /* ---------- tiny helpers ---------- */
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") el.className = attrs[k];
      else if (k === "text") el.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) el.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }
  function show(node) { clear(root); root.appendChild(node); }
  function decode(t) {
    try { return JSON.parse(decodeURIComponent(escape(atob(t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))))); } catch (e) { return null; }
  }
  function nameKey(n) { return String(n || "").replace(/ /g, "_"); }

  /* ---------- token ---------- */
  function savedToken() {
    var t = null;
    try { t = localStorage.getItem(TOKEN_KEY); } catch (e) {}
    var c = t && decode(t);
    return c && c.exp * 1000 > Date.now() + 60000 ? { raw: t, claims: c } : null;
  }
  function storeToken(t) { try { localStorage.setItem(TOKEN_KEY, t); } catch (e) {} }
  function dropToken() { try { localStorage.removeItem(TOKEN_KEY); } catch (e) {} }

  /* ---------- API ---------- */
  function api(path, opts) {
    opts = opts || {};
    var headers = {};
    if (state.token) headers.Authorization = "Bearer " + state.token.raw;
    var body;
    if (opts.json !== undefined) { headers["Content-Type"] = "application/json"; body = JSON.stringify(opts.json); }
    if (opts.blob) { headers["Content-Type"] = opts.blob.type; body = opts.blob; }
    return fetch(API + path, { method: opts.method || "GET", headers: headers, body: body }).then(function (r) {
      if (opts.asBlob && r.ok) return r.blob();
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.status === 401) { signOut("Your sign-in expired. Please sign in again."); throw new Error("expired"); }
        if (!r.ok) throw new Error(j.error || "Something went wrong (" + r.status + ")");
        return j;
      });
    });
  }

  /* ---------- sign in / out ---------- */
  function whenGoogle(cb, tries) {
    if (window.google && google.accounts && google.accounts.id) return cb();
    if ((tries || 0) > 100) return fail("Google sign-in could not load. Check your connection and reload the page.");
    setTimeout(function () { whenGoogle(cb, (tries || 0) + 1); }, 100);
  }
  function fail(msg) { show(h("div", { class: "jl-card" }, h("p", { class: "jl-msg jl-bad", text: msg }))); }

  var hadSession = false;
  function renderSignedOut(note) {
    var btn = h("div", { class: "jl-gbtn" });
    show(h("div", { class: "jl-card jl-center" },
      h("h2", { text: "Alumni sign in" }),
      h("p", { class: "jl-muted", text: "Sign in with your Google account to see and update your alumni details. You do not need to sign in to browse the site." }),
      note ? h("p", { class: "jl-msg jl-warn", text: note }) : null,
      btn));
    whenGoogle(function () {
      google.accounts.id.initialize({ client_id: CLIENT, callback: onCredential, auto_select: true, cancel_on_tap_outside: false });
      google.accounts.id.renderButton(btn, { theme: "outline", size: "large", shape: "pill", text: "signin_with" });
      if (hadSession) { hadSession = false; google.accounts.id.prompt(); } // returning visitor: try to sign in quietly
    });
  }

  function onCredential(resp) {
    var c = decode(resp.credential);
    if (!c) return;
    state.token = { raw: resp.credential, claims: c };
    storeToken(resp.credential);
    load();
  }

  function signOut(note) {
    dropToken();
    state.token = null; state.me = null; state.editing = false; state.photoBlob = null;
    if (window.google && google.accounts && google.accounts.id) google.accounts.id.disableAutoSelect();
    renderSignedOut(typeof note === "string" ? note : "");
  }

  /* ---------- load my entry ---------- */
  function load() {
    show(h("div", { class: "jl-card jl-center" }, h("p", { class: "jl-muted", text: "Loading your details..." })));
    api("/api/me").then(function (me) {
      state.me = me; state.editing = false; state.photoBlob = null;
      if (state.ownPhotoUrl) { URL.revokeObjectURL(state.ownPhotoUrl); state.ownPhotoUrl = null; }
      var m = me.member;
      if (m && m.draft_photo) {
        return api("/api/me/photo", { asBlob: true }).then(function (b) { state.ownPhotoUrl = URL.createObjectURL(b); }, function () {});
      }
    }).then(render).catch(function (e) { if (e.message !== "expired") fail(e.message); });
  }

  /* ---------- screen ---------- */
  function values() {
    var m = state.me.member;
    var v = {};
    if (!m) { var u = state.me.user || {}; return { Name: u.name || "", EmailId: u.email || "" }; }
    var d = {}, k; // a pending request (new entry, or a new name or batch) is shown on top of the saved details
    for (k in (m.data || {})) d[k] = m.data[k];
    for (k in (m.draft || {})) d[k] = m.draft[k];
    for (k in d) v[k] = d[k];
    v.Name = v.Name || m.name; v.Batch = v.Batch || m.batch;
    return v;
  }

  function statusBox(m) {
    if (!m) return null;
    var box = h("div", { class: "jl-status" });
    function line(cls, t) { box.appendChild(h("p", { class: "jl-msg " + cls, text: t })); }
    if (state.flash) { line("jl-ok", state.flash); state.flash = ""; }
    if (m.status === "approved") {
      if (m.draft) line("jl-warn", "Your name or batch change is waiting for admin approval.");
      else if (!box.firstChild) line("jl-ok", "Approved. Your details are on the alumni site.");
    } else if (m.status === "rejected") line("jl-bad", "Your last submission was not approved. Please check your details and save again.");
    else line("jl-warn", "Waiting for admin approval. Your details will appear on the site once approved.");
    return box;
  }

  function avatar(v, m) {
    var img = h("img", { class: "jl-photo", alt: "", width: "96", height: "96" });
    var fallback = function () { img.removeAttribute("src"); img.classList.add("jl-nophoto"); };
    if (state.photoUrl) img.src = state.photoUrl;
    else if (state.ownPhotoUrl) img.src = state.ownPhotoUrl;
    else if (m && m.photo) img.src = API + "/api/photo/" + m.photo;
    else if (m && v.Name && v.Batch) img.src = IMAGES + v.Batch + "/" + nameKey(v.Name) + ".jpg";
    else fallback();
    img.addEventListener("error", fallback);
    return img;
  }

  function render() {
    var me = state.me, m = me.member, v = values();
    var user = me.user || {};
    var editing = state.editing;
    var isNew = !m;
    var form = h("form", { class: "jl-form" + (editing ? " jl-editing" : ""), novalidate: true, onsubmit: onSave });

    SECTIONS.forEach(function (sec) {
      var box = h("fieldset", { class: "jl-sec" }, h("legend", { text: sec[0] }));
      sec[1].forEach(function (f) {
        var key = f[0], type = f[2], opts = f[3], priv = f[4];
        var val = v[key] === undefined || v[key] === null ? "" : String(v[key]);
        if (f[5] === "lines") val = val.split("~").join("\n");
        var id = "jl-" + key, input;
        if (type === "select") {
          input = h("select", { id: id, name: key, disabled: !editing }, h("option", { value: "", text: editing ? "Select" : "Not added" }));
          var list = opts.slice(); if (val && list.indexOf(val) < 0) list.push(val);
          list.forEach(function (o) { input.appendChild(h("option", { value: o, text: o })); });
        } else if (type === "textarea") {
          input = h("textarea", { id: id, name: key, rows: f[5] === "lines" ? 4 : 3, maxlength: f[6] || 400, disabled: !editing, placeholder: editing ? "" : "Not added" });
        } else {
          input = h("input", { id: id, name: key, type: (type === "date" && !editing) ? "text" : type, disabled: !editing, maxlength: f[6] || 200, placeholder: editing ? "" : "Not added", autocomplete: "off" });
          if (type === "tel") input.setAttribute("inputmode", "tel");
          if (key === "PinCode") input.setAttribute("inputmode", "numeric");
          if (opts) { var dl = h("datalist", { id: id + "-list" }); opts.forEach(function (o) { dl.appendChild(h("option", { value: o })); }); input.setAttribute("list", id + "-list"); box.appendChild(dl); }
        }
        input.value = val;
        var label = h("label", { for: id }, f[1], priv ? h("span", { class: "jl-tag", text: "Private" }) : null);
        box.appendChild(h("div", { class: "jl-field" }, label, input));
      });
      form.appendChild(box);
      (AFTER[sec[0]] || []).forEach(function (i) { form.appendChild(listBox(LISTS[i], v[LISTS[i][0]], editing)); });
    });

    var actions = h("div", { class: "jl-actions" },
      h("button", { type: "submit", class: "jl-btn jl-primary", id: "jl-save", text: "Save changes" }),
      h("button", { type: "button", class: "jl-btn", text: "Cancel", onclick: function () { stopEditing(); } }),
      h("span", { class: "jl-msg", id: "jl-note", role: "status" }));
    form.appendChild(actions);

    var fileInput = h("input", { type: "file", accept: "image/*", class: "jl-file", id: "jl-file", onchange: onPhoto });
    var head = h("div", { class: "jl-head" },
      h("div", { class: "jl-ph" }, avatar(v, m),
        editing ? h("label", { class: "jl-btn jl-small", for: "jl-file", text: "Change photo" }) : null, editing ? fileInput : null),
      h("div", { class: "jl-who" },
        h("h2", { text: v.Name || user.name || "Welcome" }),
        h("p", { class: "jl-muted", text: v.Batch ? "Batch " + v.Batch : "No entry yet" }),
        me.isAdmin ? h("span", { class: "jl-chip", text: "Admin" }) : null,
        me.isCore ? h("span", { class: "jl-chip", text: "Core member" }) : null));

    var toggle = h("label", { class: "jl-switch" },
      h("input", { type: "checkbox", role: "switch", id: "jl-edit", checked: editing, onchange: function (e) { e.target.checked ? startEditing() : stopEditing(); } }),
      h("span", { class: "jl-track" }), h("span", { text: "Edit details" }));

    var top = h("div", { class: "jl-top" },
      h("div", { class: "jl-acct" },
        user.picture ? h("img", { src: user.picture, alt: "", width: "24", height: "24", referrerpolicy: "no-referrer" }) : null,
        h("span", { text: user.email || "" })),
      h("button", { type: "button", class: "jl-link", text: "Sign out", onclick: function () { signOut(""); } }));

    var body = [top, head];
    if (me.isAdmin) body.push(h("a", { class: "jl-btn jl-primary jl-adminlink", href: root.dataset.admin || "/p/admin.html", text: "Open admin page" }));
    if (isNew && !editing) {
      body.push(h("p", { class: "jl-msg jl-warn", text: "We could not find an alumni entry for " + (user.email || "this account") + ". If you are already listed under another email, tell the admin so it can be linked. Otherwise create your profile." }));
      body.push(h("button", { type: "button", class: "jl-btn jl-primary", text: "Create my profile", onclick: startEditing }));
    } else {
      body.push(statusBox(m));
      body.push(h("div", { class: "jl-row" }, toggle));
      body.push(h("p", { class: "jl-hint", text: m && m.status === "approved"
        ? "Your changes go live on the site right away. Changing your name or batch needs admin approval. Phone, address and pin code are shown on the site only to admins and core members."
        : "Your entry needs admin approval before it goes on the site. Phone, address and pin code are shown on the site only to admins and core members." }));
      body.push(form);
    }
    show(h.apply(null, ["div", { class: "jl-card" }].concat(body)));
  }

  function startEditing() { state.editing = true; render(); }
  function stopEditing() { state.editing = false; state.photoBlob = null; if (state.photoUrl) { URL.revokeObjectURL(state.photoUrl); state.photoUrl = null; } render(); }

  /* ---------- photo to WebP ---------- */
  function toWebp(file) {
    return loadImage(file).then(function (o) {
      var side = Math.min(o.w, o.h), sx = (o.w - side) / 2, sy = (o.h - side) / 2;
      var sizes = [480, 400, 320, 240], quals = [0.82, 0.7, 0.6, 0.5], tries = [];
      sizes.forEach(function (s) { quals.forEach(function (q) { tries.push([s, q]); }); });
      function attempt(i) {
        var s = tries[i][0], q = tries[i][1];
        var c = document.createElement("canvas"); c.width = c.height = s;
        c.getContext("2d").drawImage(o.d, sx, sy, side, side, 0, 0, s, s);
        return new Promise(function (res) { c.toBlob(res, "image/webp", q); }).then(function (b) {
          if (b && b.type !== "image/webp") return new Promise(function (res) { c.toBlob(res, "image/jpeg", q); }); // browser cannot make WebP
          return b;
        }).then(function (b) {
          if (b && (b.size <= 90 * 1024 || i === tries.length - 1)) return b;
          return attempt(i + 1);
        });
      }
      return attempt(0);
    });
  }
  function loadImage(file) {
    if (window.createImageBitmap) {
      return createImageBitmap(file, { imageOrientation: "from-image" })
        .then(function (b) { return { d: b, w: b.width, h: b.height }; })
        .catch(function () { return viaImg(file); });
    }
    return viaImg(file);
  }
  function viaImg(file) {
    return new Promise(function (res, rej) {
      var u = URL.createObjectURL(file), i = new Image();
      i.onload = function () { res({ d: i, w: i.naturalWidth, h: i.naturalHeight }); URL.revokeObjectURL(u); };
      i.onerror = function () { rej(new Error("That file is not a photo")); };
      i.src = u;
    });
  }

  function onPhoto(e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var note = document.getElementById("jl-note");
    if (note) { note.textContent = "Preparing photo..."; note.className = "jl-msg"; }
    toWebp(f).then(function (blob) {
      if (!blob) throw new Error("Could not prepare the photo");
      if (blob.size > 240 * 1024) throw new Error("That photo is too large, please pick another");
      state.photoBlob = blob;
      if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
      state.photoUrl = URL.createObjectURL(blob);
      var img = root.querySelector(".jl-photo");
      if (img) { img.classList.remove("jl-nophoto"); img.src = state.photoUrl; }
      if (note) { note.textContent = "Photo ready (" + Math.round(blob.size / 1024) + " KB). Press Save changes."; }
    }).catch(function (err) { if (note) { note.textContent = err.message; note.className = "jl-msg jl-bad"; } });
  }

  /* ---------- save ---------- */
  function onSave(e) {
    e.preventDefault();
    if (state.busy) return;
    var form = e.target, data = {}, note = document.getElementById("jl-note"), btn = document.getElementById("jl-save");
    SECTIONS.forEach(function (sec) { sec[1].forEach(function (f) {
      var v = String(form.elements[f[0]].value || "").trim();
      if (f[5] === "lines") v = v.split(/\n+/).map(clean).filter(Boolean).join("~");
      if (v) data[f[0]] = v;
    }); });
    LISTS.forEach(function (def) { var b = form.querySelector('[data-list="' + def[0] + '"]'), s = b ? readList(b) : ""; if (s) data[def[0]] = s; });
    if (!data.Name || data.Name.length < 2) return say("Please enter your full name", true);
    if (!data.Batch) return say("Please choose your pass-out year", true);
    function say(t, bad) { note.textContent = t; note.className = "jl-msg " + (bad ? "jl-bad" : "jl-ok"); }
    state.busy = true; btn.disabled = true; say("Saving...");
    var said = "";
    api("/api/me", { method: "PUT", json: { data: data } }).then(function (r) {
      said = r.message || "";
      if (state.photoBlob) return api("/api/me/photo", { method: "POST", blob: state.photoBlob });
    }).then(function () {
      state.busy = false; state.flash = said;
      if (state.photoUrl) { URL.revokeObjectURL(state.photoUrl); state.photoUrl = null; }
      load();
    }).catch(function (err) {
      state.busy = false; btn.disabled = false;
      if (err.message !== "expired") say(err.message, true);
    });
  }

  /* ---------- start ---------- */
  if (!API || !CLIENT) return fail("This page is missing its settings (data-api and data-client).");
  var t = savedToken();
  try { hadSession = !t && !!localStorage.getItem(TOKEN_KEY); } catch (e) {}
  if (t) { state.token = t; load(); } else renderSignedOut("");
})();
