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

  // placeholders always start with "eg." so nobody mistakes them for saved values
  var PH = {
    Name: "eg. Mobayea Biswas", City: "eg. Kolkata", Phone: "eg. 9876543210", Phone2: "eg. 9876543210", EmailId: "eg. name@gmail.com",
    Address: "eg. House no., street, village or town", PinCode: "eg. 742202", District: "eg. Murshidabad",
    fb: "eg. username or https://facebook.com/username", insta: "eg. username",
    linkedin: "eg. https://linkedin.com/in/username", twitter: "eg. username", youtube: "eg. https://youtube.com/@channel",
    Bio: "eg. A few lines about you, your work and your interests...", Skills: "eg. Teaching, Python, Photography", Languages: "eg. Bengali, English, Hindi",
    Achievements: "eg. Gold medal in Class XII\nState level badminton player", Memories: "eg. Evening prayers, midnight tiffin with friends, the day we won the inter-house cup..."
  };
  var ICON = {
    "Personal": "\ud83d\udc64", "Contact": "\ud83d\udcde", "Address": "\ud83d\udccd", "Current status": "\ud83c\udfaf", "Education history": "\ud83c\udf93",
    "Employment history": "\ud83d\udcbc", "Extracurricular: JNV visits": "\ud83c\udfc5", "Social": "\ud83d\udd17", "About you": "\u2728"
  };

  // [key, label, type, options, private, mode, max length]   mode: "lines" (one per line, saved with ~) or "more" (hidden behind Add more)
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
      ["CurrentStatus", "Current status", "select", STATUS],
    ]],
    ["Social", [
      ["fb", "Facebook (username or link)", "text"],
      ["insta", "Instagram (username or link)", "text"],
      ["linkedin", "LinkedIn (link)", "text", null, false, "more"],
      ["twitter", "X (username)", "text", null, false, "more"],
      ["youtube", "YouTube (link)", "text", null, false, "more"],
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
  // education: from|to|course|institute|city|highest   work: from|to|place|position|city   visits: year|activity|jnv
  // cols: [key, label, placeholder, kind, options, wide]
  var JNV = "JNV Murshidabad", JNV_CITY = "Berhampore", FIRST_YEAR = 1990;
  function span(top, low) { var o = []; for (var y = top; y >= low; y--) o.push(String(y)); return o; }
  var LISTS = [
    { key: "EduList", title: "Education history", add: "Add education", hq: true, jnv: true, cols: [
      ["From", "From", "", "year", span(thisYear, FIRST_YEAR)], ["To", "To", "", "year", span(thisYear + 8, FIRST_YEAR)],
      ["Course", "Course", "eg. MBBS, B.Tech in Electrical Engineering", "text", null, true],
      ["Institute", "Institute name", "eg. RG Kar Medical College", "text", null, true],
      ["City", "City", "eg. Kolkata", "text", null, true]] },
    { key: "WorkList", title: "Employment history", add: "Add employment", cols: [
      ["From", "From", "", "year", span(thisYear, FIRST_YEAR)], ["To", "To", "", "year", ["Present"].concat(span(thisYear, FIRST_YEAR))],
      ["Place", "Place of Work", "eg. Company name...", "area", null, true],
      ["Position", "Position", "eg. Software Engineer", "text", null, true],
      ["City", "City", "eg. Kolkata", "text", null, true]] },
    { key: "JnvVisits", title: "Extracurricular: JNV visits", add: "Add visit", cols: [
      ["Year", "Year", "", "year", span(thisYear, FIRST_YEAR)], ["Activity", "Activity", "eg. Badminton", "text"],
      ["JNV", "JNV (District)", "eg. JNV Nadia", "text", null, true]] }
  ];
  var AFTER = { "Current status": [0, 1, 2] }; // where each list sits: education, employment, then the JNV visits
  var MAX_ROWS = 10, uid = 0;
  var KEEP_OLD = ["Employment", "Occupation", "Company", "WorkCity", "Institute", "HQD"]; // no longer on the form; saved as they are

  function clean(t) { return String(t || "").replace(/[|~]/g, " ").replace(/\s+/g, " ").trim(); }
  function parseRows(t) { return t ? String(t).split("~").map(function (r) { return r.split("|"); }) : []; }
  // older saves had one "year" column: education year|course|institute|city, work year|company|position|city
  function normEdu(r) { return r.length >= 6 ? r : ["", r[0] || "", r[1] || "", r[2] || "", r[3] || "", ""]; }
  function normWork(r) { return r.length >= 5 ? r : ["", r[0] || "", r[1] || "", r[2] || "", r[3] || ""]; }
  function rowsOf(def, val) {
    var rows = parseRows(val);
    if (def.key === "EduList") rows = rows.map(normEdu);
    if (def.key === "WorkList") rows = rows.map(normWork);
    return rows;
  }
  function readList(box, def) {
    var rows = [], n = def.cols.length + (def.hq ? 1 : 0);
    [].forEach.call(box.querySelectorAll(".jl-item"), function (it) {
      var arr = []; for (var i = 0; i < n; i++) arr.push("");
      [].forEach.call(it.querySelectorAll("[data-i]"), function (el) { arr[Number(el.getAttribute("data-i"))] = clean(el.value); });
      if (it.getAttribute("data-fixed")) { arr[3] = JNV; arr[4] = JNV_CITY; if (!arr[0] && !arr[1]) return; }
      else if (!arr.slice(0, def.cols.length).some(Boolean)) return;
      var r = it.querySelector('input[type="radio"]');
      if (def.hq && r && r.checked) arr[n - 1] = "1";
      rows.push(arr.join("|"));
    });
    return rows.join("~");
  }
  function listBox(def, val, editing, batch) {
    var box = h("fieldset", { class: "jl-sec jl-list", "data-list": def.key }, h("legend", { text: def.title, "data-ico": ICON[def.title] || "" }));
    var wrap = h("div", { class: "jl-items" }), n = def.cols.length, hqName = "jl-hq-" + def.key;
    box.appendChild(wrap);
    function pickHq(e) { // only one card can be the highest qualification; tapping it again unmarks it
      var r = e.target, was = r.getAttribute("data-was") === "1";
      [].forEach.call(box.querySelectorAll('input[type="radio"]'), function (x) { x.setAttribute("data-was", "0"); });
      if (was) r.checked = false; else r.setAttribute("data-was", "1");
      markDirty();
    }
    function addRow(vals, fixed) {
      if (wrap.children.length >= MAX_ROWS) return;
      var it = h("div", { class: "jl-item" + (fixed ? " jl-fixed" : "") });
      if (fixed) {
        it.setAttribute("data-fixed", "1");
        it.appendChild(h("div", { class: "jl-fixedhead jl-wide" }, h("b", { text: JNV }), h("span", { text: JNV_CITY })));
      }
      def.cols.forEach(function (c, i) {
        if (fixed && i > 1) return;
        var id = "jl-l" + (++uid), v = vals[i] || "", inp;
        if (c[3] === "year") {
          inp = h("select", { id: id, disabled: !editing });
          inp.appendChild(h("option", { value: "", text: editing ? "Select" : "-" }));
          var list = c[4].slice(); if (v && list.indexOf(v) < 0) list.push(v);
          list.forEach(function (o) { inp.appendChild(h("option", { value: o, text: o })); });
        } else if (c[3] === "area") {
          inp = h("textarea", { id: id, rows: 2, maxlength: 120, disabled: !editing, placeholder: editing ? c[2] : "-" });
        } else {
          inp = h("input", { id: id, type: "text", maxlength: 120, disabled: !editing, placeholder: editing ? c[2] : "-", autocomplete: "off" });
        }
        inp.value = v; inp.setAttribute("data-i", i);
        it.appendChild(h("div", { class: "jl-field" + (c[5] ? " jl-wide" : "") }, h("label", { for: id, text: c[1] }), inp));
      });
      if (def.hq) {
        var on = vals[n] === "1";
        if (editing) {
          var radio = h("input", { type: "radio", name: hqName, checked: on, "data-was": on ? "1" : "0", onclick: pickHq });
          it.appendChild(h("label", { class: "jl-hq jl-wide" }, radio, h("span", { text: "Highest qualification" })));
        } else if (on) it.appendChild(h("span", { class: "jl-hqbadge jl-wide", text: "Highest qualification" }));
      }
      if (editing && !fixed) it.appendChild(h("button", { type: "button", class: "jl-btn jl-small jl-rm jl-wide", text: "Remove", onclick: function () { wrap.removeChild(it); markDirty(); } }));
      wrap.appendChild(it);
    }
    var rows = rowsOf(def, val), at = -1;
    if (def.jnv) { // JNV Murshidabad is always the first card and cannot be removed
      rows.forEach(function (r, i) { if (at < 0 && String(r[3]).toLowerCase() === JNV.toLowerCase()) at = i; });
      var fixedVals = at >= 0 ? rows[at] : (batch ? [String(Number(batch) - 7), String(batch), "", JNV, JNV_CITY, ""] : null);
      if (fixedVals && !fixedVals[0] && fixedVals[1]) fixedVals = fixedVals.slice(), fixedVals[0] = String(Number(fixedVals[1]) - 7); // older saves only had the end year
      if (fixedVals) addRow(fixedVals, true);
    }
    rows.forEach(function (r, i) { if (i !== at) addRow(r, false); });
    if (editing) {
      if (!wrap.children.length) addRow([], false);
      box.appendChild(h("button", { type: "button", class: "jl-btn jl-small jl-add", text: "+ " + def.add, onclick: function () { addRow([], false); markDirty(); } }));
    } else if (!wrap.children.length) box.appendChild(h("p", { class: "jl-muted", text: "Not added" }));
    return box;
  }

  var state = { dirty: false, pushed: false, skipPop: false, afterSave: null, flash: "", token: null, claims: null, me: null, photoBlob: null, photoUrl: null, ownPhotoUrl: null, editing: false, busy: false };

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
    return api("/api/me").then(function (me) {
      state.me = me; state.editing = false; state.dirty = false; state.photoBlob = null; state.gallery = null;
      if (state.ownPhotoUrl) { URL.revokeObjectURL(state.ownPhotoUrl); state.ownPhotoUrl = null; }
      var m = me.member;
      if (m && m.draft_photo) {
        return api("/api/me/photo", { asBlob: true }).then(function (b) { state.ownPhotoUrl = URL.createObjectURL(b); }, function () {});
      }
    }).then(function () { dropPushed(); render(); }).catch(function (e) { if (e.message !== "expired") fail(e.message); });
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
      var box = h("fieldset", { class: "jl-sec" }, h("legend", { text: sec[0], "data-ico": ICON[sec[0]] || "" }));
      var extras = [];
      sec[1].forEach(function (f) {
        var key = f[0], type = f[2], opts = f[3], priv = f[4], ph = editing ? (PH[key] || "") : "Not added";
        var val = v[key] === undefined || v[key] === null ? "" : String(v[key]);
        if (f[5] === "lines") val = val.split("~").join("\n");
        var id = "jl-" + key, input;
        if (type === "select") {
          input = h("select", { id: id, name: key, disabled: !editing }, h("option", { value: "", text: editing ? "Select" : "Not added" }));
          var list = opts.slice(); if (val && list.indexOf(val) < 0) list.push(val);
          list.forEach(function (o) { input.appendChild(h("option", { value: o, text: o })); });
        } else if (type === "textarea") {
          input = h("textarea", { id: id, name: key, rows: f[5] === "lines" ? 4 : 3, maxlength: f[6] || 400, disabled: !editing, placeholder: ph });
        } else {
          input = h("input", { id: id, name: key, type: (type === "date" && !editing) ? "text" : type, disabled: !editing, maxlength: f[6] || 200, placeholder: ph, autocomplete: "off" });
          if (type === "tel") input.setAttribute("inputmode", "tel");
          if (key === "PinCode") input.setAttribute("inputmode", "numeric");
          if (opts) { var dl = h("datalist", { id: id + "-list" }); opts.forEach(function (o) { dl.appendChild(h("option", { value: o })); }); input.setAttribute("list", id + "-list"); box.appendChild(dl); }
        }
        input.value = val;
        var label = h("label", { for: id }, f[1], priv ? h("span", { class: "jl-tag", text: "Private" }) : null);
        var fieldEl = h("div", { class: "jl-field" }, label, input);
        if (f[5] === "more") extras.push({ el: fieldEl, has: !!val }); else box.appendChild(fieldEl);
      });
      if (extras.length) { // the less common links stay hidden until "Add more"
        var any = extras.some(function (x) { return x.has; }), more = h("div", { class: "jl-more" });
        extras.forEach(function (x) { if (!editing && !x.has) x.el.hidden = true; more.appendChild(x.el); });
        if (editing && !any) {
          more.hidden = true;
          box.appendChild(h("button", { type: "button", class: "jl-btn jl-small jl-addmore", text: "+ Add more", onclick: function (e) { more.hidden = false; e.target.parentNode.removeChild(e.target); } }));
        }
        if (editing || any) box.appendChild(more);
      }
      form.appendChild(box);
      (AFTER[sec[0]] || []).forEach(function (i) { form.appendChild(listBox(LISTS[i], v[LISTS[i].key], editing, v.Batch)); });
    });

    state.dirty = false;
    form.addEventListener("input", markDirty);
    form.addEventListener("change", markDirty);

    var actions = h("div", { class: "jl-actions" },
      h("button", { type: "submit", class: "jl-btn jl-primary", id: "jl-save", text: "Save changes" }),
      h("button", { type: "button", class: "jl-btn", text: "Cancel", onclick: function () { guard(stopEditing); } }),
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
      h("input", { type: "checkbox", role: "switch", id: "jl-edit", checked: editing, onchange: function (e) { if (e.target.checked) return startEditing(); if (state.dirty) e.target.checked = true; guard(stopEditing); } }),
      h("span", { class: "jl-track" }), h("span", { text: "Edit details" }));

    var top = h("div", { class: "jl-top" },
      h("div", { class: "jl-acct" },
        user.picture ? h("img", { src: user.picture, alt: "", width: "24", height: "24", referrerpolicy: "no-referrer" }) : null,
        h("span", { text: user.email || "" })),
      h("button", { type: "button", class: "jl-link", text: "Sign out", onclick: function () { guard(function () { signOut(""); }); } }));

    var pn = m && m.status === "approved" ? ((m.data && m.data.Name) || m.name) : "";
    var profileBtn = pn && m.batch ? h("a", { class: "jl-btn jl-profilebtn", href: "/" + m.batch + "#" + nameKey(pn), text: "Go to my profile" }) : null;
    var body = [profileBtn, top, head];
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
    mountGallery();
  }

  function markDirty() { state.dirty = true; }
  function startEditing() {
    state.editing = true; state.dirty = false;
    try { history.pushState({ jlEdit: 1 }, "", location.href); state.pushed = true; } catch (e) {} // so the Back button asks before leaving
    render();
  }
  function stopEditing() {
    state.editing = false; state.dirty = false; state.photoBlob = null;
    if (state.photoUrl) { URL.revokeObjectURL(state.photoUrl); state.photoUrl = null; }
    dropPushed();
    render();
  }
  function dropPushed() { if (state.pushed) { state.pushed = false; state.skipPop = true; history.back(); } }

  /* ---------- "save before you leave" ---------- */
  function askSave(done) {
    var prev = document.activeElement;
    var overlay = h("div", { class: "jl-modal" });
    function close(choice) {
      document.removeEventListener("keydown", onKey);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (prev && prev.focus) { try { prev.focus(); } catch (e) {} }
      done(choice);
    }
    function onKey(e) { if (e.key === "Escape") close("stay"); }
    var saveBtn = h("button", { type: "button", class: "jl-btn jl-primary", text: "Save", onclick: function () { close("save"); } });
    overlay.appendChild(h("div", { class: "jl-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "jl-mt" },
      h("h3", { id: "jl-mt", text: "Save your changes?" }),
      h("p", { text: "You have changes that are not saved yet." }),
      h("div", { class: "jl-dactions" }, saveBtn,
        h("button", { type: "button", class: "jl-btn", text: "Don't save", onclick: function () { close("discard"); } }),
        h("button", { type: "button", class: "jl-btn jl-ghost", text: "Keep editing", onclick: function () { close("stay"); } }))));
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close("stay"); });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(overlay);
    saveBtn.focus();
  }
  // run leave() now, or after the person has chosen Save / Don't save
  function guard(leave, stay) {
    if (!(state.editing && state.dirty)) return leave();
    askSave(function (c) {
      if (c === "discard") { state.dirty = false; leave(); }
      else if (c === "save") saveThen(leave);
      else if (stay) stay();
    });
  }
  window.addEventListener("popstate", function () { // Back pressed while editing
    if (state.skipPop) { state.skipPop = false; return; }
    if (!state.editing) return;
    state.pushed = false;
    if (!state.dirty) { state.editing = false; history.back(); return; }
    askSave(function (c) {
      if (c === "discard") { state.dirty = false; state.editing = false; history.back(); }
      else if (c === "save") saveThen(function () { state.editing = false; history.back(); });
      else { try { history.pushState({ jlEdit: 1 }, "", location.href); state.pushed = true; } catch (e) {} }
    });
  });
  window.addEventListener("beforeunload", function (e) { // closing the tab or reloading
    if (state.editing && state.dirty) { e.preventDefault(); e.returnValue = ""; }
  });
  root.addEventListener("click", function (e) { // links on this page (profile, admin)
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || !state.editing || !state.dirty || a.getAttribute("target") === "_blank" || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    var href = a.href;
    guard(function () { location.href = href; });
  });

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

  /* ---------- photos: up to 5 pictures, shrunk to a WebP under 200 KB ---------- */
  var GAL_MAX = 5;
  function resizeForGallery(file) {
    return loadImage(file).then(function (o) {
      var sizes = [1600, 1280, 1024, 800, 640], quals = [0.82, 0.72, 0.62, 0.52, 0.42], tries = [];
      sizes.forEach(function (s) { quals.forEach(function (q) { tries.push([s, q]); }); });
      function attempt(i) {
        var s = tries[i][0], q = tries[i][1], k = Math.min(1, s / Math.max(o.w, o.h));
        var c = document.createElement("canvas"); c.width = Math.max(1, Math.round(o.w * k)); c.height = Math.max(1, Math.round(o.h * k));
        c.getContext("2d").drawImage(o.d, 0, 0, c.width, c.height);
        return new Promise(function (res) { c.toBlob(res, "image/webp", q); }).then(function (b) {
          if (b && b.type !== "image/webp") return new Promise(function (res) { c.toBlob(res, "image/jpeg", q); }); // browser cannot make WebP
          return b;
        }).then(function (b) {
          if (b && (b.size <= 195 * 1024 || i === tries.length - 1)) return b;
          return attempt(i + 1);
        });
      }
      return attempt(0);
    });
  }

  function mountGallery() {
    var m = state.me && state.me.member;
    var old = document.getElementById("jl-gallery");
    if (old) old.remove();
    if (!m) return;
    var card = h("div", { class: "jl-card jl-gal", id: "jl-gallery" }, h("h3", { text: "Photos" }));
    if (m.status !== "approved") {
      card.appendChild(h("p", { class: "jl-hint", text: "You can add photos once your profile is approved." }));
      return root.appendChild(card);
    }
    card.appendChild(h("p", { class: "jl-hint", text: "Photos will appear in your profile. Some photos may be shown in the Batch gallery. Group photos are selected most." }));
    var grid = h("div", { class: "jl-gal-grid" });
    var note = h("p", { class: "jl-msg jl-gnote", role: "status", hidden: true });
    var file = h("input", { type: "file", accept: "image/*", multiple: true, class: "jl-file", id: "jl-gfile" });
    card.appendChild(grid); card.appendChild(note); card.appendChild(file);
    root.appendChild(card);

    function say(t, bad) { note.hidden = !t; note.textContent = t || ""; note.className = "jl-msg jl-gnote " + (bad ? "jl-bad" : "jl-ok"); }
    function draw(list) {
      while (grid.firstChild) grid.removeChild(grid.firstChild);
      list.forEach(function (p) {
        var del = h("button", { type: "button", class: "jl-gal-x", "aria-label": "Delete this photo", text: "×", onclick: function () {
          if (!confirm("Delete this photo?")) return;
          say("Deleting...");
          api("/api/me/gallery/" + p.id, { method: "DELETE" }).then(function () { return refresh(); }).then(function () { say("Photo deleted."); }).catch(function (e) { if (e.message !== "expired") say(e.message, true); });
        } });
        grid.appendChild(h("div", { class: "jl-gal-t" }, h("img", { src: p.url, alt: "", loading: "lazy" }), del, h("span", { class: "jl-gal-lab", text: "Uploaded" })));
      });
      if (list.length < GAL_MAX) grid.appendChild(h("label", { class: "jl-gal-add", for: "jl-gfile" }, h("span", { class: "jl-gal-plus", text: "+" }), h("span", { text: "Add photo" })));
      if (list.length >= GAL_MAX) say("You have added all 5 photos. Delete one to add another.");
    }
    function refresh() { return api("/api/me/gallery").then(function (r) { state.gallery = r.photos; draw(r.photos); }); }
    file.addEventListener("change", function () {
      var files = [].slice.call(file.files || []); file.value = "";
      var room = GAL_MAX - (state.gallery || []).length;
      if (!files.length) return;
      if (files.length > room) { files = files.slice(0, room); }
      var i = 0, fails = 0;
      (function next() {
        if (i >= files.length) { return refresh().then(function () { say(fails ? "Some photos could not be added." : "Added. Your photos now show in your profile.", !!fails); }); }
        say("Adding photo " + (i + 1) + " of " + files.length + "...");
        resizeForGallery(files[i]).then(function (blob) {
          if (!blob) throw new Error("Could not prepare that photo");
          return api("/api/me/gallery", { method: "POST", blob: blob });
        }).catch(function (e) { if (e.message === "expired") throw e; fails++; say(e.message, true); }).then(function () { i++; next(); }, function () {});
      })();
    });
    if (state.gallery) draw(state.gallery);
    else refresh().catch(function (e) { if (e.message !== "expired") say(e.message, true); });
  }

  function onPhoto(e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var note = document.getElementById("jl-note");
    if (note) { note.textContent = "Preparing photo..."; note.className = "jl-msg"; }
    toWebp(f).then(function (blob) {
      if (!blob) throw new Error("Could not prepare the photo");
      if (blob.size > 240 * 1024) throw new Error("That photo is too large, please pick another");
      state.photoBlob = blob; markDirty();
      if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
      state.photoUrl = URL.createObjectURL(blob);
      var img = root.querySelector(".jl-photo");
      if (img) { img.classList.remove("jl-nophoto"); img.src = state.photoUrl; }
      if (note) { note.textContent = "Photo ready (" + Math.round(blob.size / 1024) + " KB). Press Save changes."; }
    }).catch(function (err) { if (note) { note.textContent = err.message; note.className = "jl-msg jl-bad"; } });
  }

  /* ---------- save ---------- */
  function onSave(e) { e.preventDefault(); doSave(e.target); }
  function saveThen(fn) { var f = root.querySelector("form.jl-form"); if (!f) return; state.afterSave = fn; doSave(f); }
  function doSave(form) {
    if (state.busy) return;
    var data = {}, note = document.getElementById("jl-note"), btn = document.getElementById("jl-save");
    SECTIONS.forEach(function (sec) { sec[1].forEach(function (f) {
      var v = String(form.elements[f[0]].value || "").trim();
      if (f[5] === "lines") v = v.split(/\n+/).map(clean).filter(Boolean).join("~");
      if (v) data[f[0]] = v;
    }); });
    var old = values(); KEEP_OLD.forEach(function (k) { if (old[k] && data[k] === undefined) data[k] = old[k]; });
    LISTS.forEach(function (def) { var b = form.querySelector('[data-list="' + def.key + '"]'), s = b ? readList(b, def) : ""; if (s) data[def.key] = s; });
    if (!data.Name || data.Name.length < 2) return say("Please enter your full name", true);
    if (!data.Batch) return say("Please choose your pass-out year", true);
    function say(t, bad) { note.textContent = t; note.className = "jl-msg " + (bad ? "jl-bad" : "jl-ok"); if (bad) state.afterSave = null; }
    state.busy = true; btn.disabled = true; say("Saving...");
    var said = "";
    api("/api/me", { method: "PUT", json: { data: data } }).then(function (r) {
      said = r.message || "";
      if (state.photoBlob) return api("/api/me/photo", { method: "POST", blob: state.photoBlob });
    }).then(function () {
      state.busy = false; state.flash = said;
      if (state.photoUrl) { URL.revokeObjectURL(state.photoUrl); state.photoUrl = null; }
      return load().then(function () { var f = state.afterSave; state.afterSave = null; if (f) f(); });
    }).catch(function (err) {
      state.busy = false; btn.disabled = false; state.afterSave = null;
      if (err.message !== "expired") say(err.message, true);
    });
  }

  /* ---------- start ---------- */
  if (!API || !CLIENT) return fail("This page is missing its settings (data-api and data-client).");
  var t = savedToken();
  try { hadSession = !t && !!localStorage.getItem(TOKEN_KEY); } catch (e) {}
  if (t) { state.token = t; load(); } else renderSignedOut("");
})();
