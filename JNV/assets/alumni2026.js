/* JNV MSD alumni: Alumni Meet 2026 page (form) and its responses table (core members and admins).
   Needs <div id="jnv-meet" data-api="..." data-client="..."> on the page. Add data-mode="responses" for the table page. */
(function () {
  var root = document.getElementById("jnv-meet");
  if (!root) return;
  var API = (root.dataset.api || "").replace(/\/+$/, "");
  var CLIENT = root.dataset.client || "";
  var MODE = root.dataset.mode === "responses" ? "responses" : "form";
  var LOGIN = root.dataset.login || "/p/login.html";
  var RESPONSES = root.dataset.responses || "/p/alumni2026-responses.html";
  var FORM = root.dataset.form || "/p/alumni2026.html";
  var TOKEN_KEY = "jnv-id-token"; // same key as the login and admin pages: sign in once, works everywhere

  var STATUS = ["Studying", "Working", "Preparation", "Self employed", "Employee", "Looking for a job"];
  var SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
  var FIRST_BATCH = 2010; // batch 1 passed Class XII in 2010, so 2018 is the 9th batch
  var thisYear = new Date().getFullYear();

  var st = { token: null, batches: null, names: {}, batch: "", q: "", pick: null, err: "", me: null, note: "", f: { year: "", att: "", q: "" }, rows: [] };

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
  var head = h("div"), main = h("div");
  root.textContent = "";
  root.appendChild(head); root.appendChild(main);
  function show(node) { while (main.firstChild) main.removeChild(main.firstChild); main.appendChild(node); }
  function toMain() { if (main.scrollIntoView) main.scrollIntoView({ block: "start" }); }
  function decode(t) { try { return JSON.parse(decodeURIComponent(escape(atob(t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))))); } catch (e) { return null; } }
  function ord(n) { var s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
  function batchLabel(y) { y = Number(y); return ord(y - FIRST_BATCH + 1) + " - " + y; }
  function msg(text, kind) { return h("p", { class: "am-msg am-" + (kind || "warn"), text: text, role: kind === "bad" ? "alert" : "status" }); }

  /* ---------- sign in and API ---------- */
  function savedToken() {
    var t = null; try { t = localStorage.getItem(TOKEN_KEY); } catch (e) {}
    var c = t && decode(t);
    return c && c.exp * 1000 > Date.now() + 60000 ? { raw: t, claims: c } : null;
  }
  function api(path, opts) {
    opts = opts || {};
    var headers = {}, body;
    if (opts.auth) headers.Authorization = "Bearer " + st.token.raw;
    if (opts.json !== undefined) { headers["Content-Type"] = "application/json"; body = JSON.stringify(opts.json); }
    return fetch(API + path, { method: opts.method || "GET", headers: headers, body: body }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.status === 401 && opts.auth) { signOut("Your sign-in expired. Please sign in again."); throw new Error("expired"); }
        if (!r.ok) throw new Error(j.error || "Something went wrong (" + r.status + ")");
        return j;
      });
    });
  }
  function whenGoogle(cb, n) {
    if (window.google && google.accounts && google.accounts.id) return cb();
    if ((n || 0) > 100) return show(h("div", { class: "am-card" }, msg("Google sign-in could not load. Please refresh the page.", "bad")));
    setTimeout(function () { whenGoogle(cb, (n || 0) + 1); }, 100);
  }
  function googleButton(box, hint, onCred) {
    whenGoogle(function () {
      var cfg = { client_id: CLIENT, callback: onCred, auto_select: false, cancel_on_tap_outside: false };
      if (hint) cfg.login_hint = hint;
      google.accounts.id.initialize(cfg);
      google.accounts.id.renderButton(box, { theme: "filled_blue", size: "large", shape: "pill", text: "signin_with" });
    });
  }
  function keepToken(cred) {
    var c = decode(cred);
    if (!c) return null;
    st.token = { raw: cred, claims: c };
    try { localStorage.setItem(TOKEN_KEY, cred); } catch (e) {}
    return c;
  }
  function signOut(note) {
    try { localStorage.removeItem(TOKEN_KEY); } catch (e) {}
    st.token = null; st.me = null; st.pick = null; st.err = "";
    if (window.google && google.accounts && google.accounts.id) google.accounts.id.disableAutoSelect();
    if (MODE === "responses") signedOutResponses(typeof note === "string" ? note : "");
    else picker(typeof note === "string" ? note : "");
  }
  function topBar(email, extra) {
    return h("div", { class: "am-top" }, h("span", { class: "am-acct", text: email }),
      h("span", { class: "am-topbtns" }, extra, h("button", { class: "am-link", type: "button", text: "Sign out", onclick: function () { signOut(); } })));
  }

  /* ================= FORM PAGE ================= */
  function welcome() {
    var p = function (t) { return h("p", { text: t }); };
    return h("div", { class: "am-card am-welcome" },
      h("h1", { text: "JNV MURSHIDABAD ALUMNI MEET 2026" }), h("p", { class: "am-date", text: "26th December 2026" }),
      h("p", { class: "am-quote", text: "\ud83d\udc90 \u201cLes retrouvailles ont le go\u00fbt des souvenirs.\u201d \ud83c\udf3f" }),
      h("p", { class: "am-quote", text: "Some reunions carry the taste of memories." }),
      p("Dear Alumni,"),
      p("Years may have taken us to different cities, professions and paths, but some places never really become a memory\u2014they remain a part of who we are. Navodaya is one such place."),
      p("After years of waving goodbye, countless stories, and friendships that survived the distance, it is time to meet again\u2014not through a screen, but face to face, heart to heart, and under the same sky we once shared."),
      p("The years of the pandemic taught us how to stay connected even when we could not be together; today, this reunion gives us the privilege of doing what screens could never truly replace\u2014reuniting in person."),
      p("This one-of-a-kind reunion, after seven years, brings us together once again\u2014not merely as alumni, but as the same Navodayans who once walked these corridors, laughed together and dreamed together. And after those unforgettable online years, this gathering gives us the joy of finally being together in person again."),
      p("Welcome back to where many of our stories began. Let us reunite, reminisce, and create a few more memories worth carrying home. \ud83d\udc96"),
      h("p", { class: "am-small", text: "(We are also trying to collect the data of the Alumni Members to preserve them in Alumni Association's Database for any future use, so please fill the given Details) Thanks for your Support. \ud83d\ude0a" }));
  }

  // step 1 and 2: type a name and/or pick a batch, then tap the name
  function picker(note) {
    var card = h("div", { class: "am-card" }, h("h2", { text: "Find your name" }),
      h("p", { class: "am-muted", text: "Type your name or pick your batch, tap your name, then sign in with that Gmail." }));
    if (note) card.appendChild(msg(note, "warn"));
    var search = h("input", { class: "am-input", type: "search", placeholder: "Search by name or Gmail", "aria-label": "Search by name or Gmail", autocomplete: "off", value: st.q || "", oninput: function (e) { st.q = e.target.value; fill(); } });
    var sel = h("select", { class: "am-input", "aria-label": "Batch", onchange: function (e) { st.batch = e.target.value; fill(); } }, h("option", { value: "", text: "All batches" }));
    var list = h("div", { class: "am-list" });
    card.appendChild(h("div", { class: "am-filters2" }, search, sel)); card.appendChild(list);
    function years() { var a = []; for (var y = FIRST_BATCH; y <= thisYear + 1; y++) a.push({ batch: y }); return a; }
    function options(b) { b.forEach(function (x) { sel.appendChild(h("option", { value: String(x.batch), text: "Batch " + batchLabel(x.batch), selected: String(x.batch) === st.batch })); }); }
    if (st.batches) options(st.batches);
    else api("/api/meet/batches").then(function (r) { st.batches = r.batches.length ? r.batches : years(); options(st.batches); }, function () { st.batches = years(); options(st.batches); });
    function regBar() {
      return h("button", { class: "am-reg", type: "button", onclick: function () { st.pick = { batch: st.batch, register: true }; signIn(); } },
        h("b", { text: "Name not found?" }), h("span", { text: "Register yourself" }));
    }
    function draw(names) {
      list.textContent = "";
      var q = (st.q || "").toLowerCase().trim();
      var l = names.filter(function (n) { return !q || (n.name + " " + n.email).toLowerCase().indexOf(q) >= 0; });
      l.slice(0, 60).forEach(function (n) {
        list.appendChild(h("button", { class: "am-name", type: "button", onclick: function () { st.pick = { name: n.name, email: n.email, batch: String(n.batch) }; signIn(); } },
          h("b", { text: n.name }), st.batch ? null : h("span", { text: "Batch " + batchLabel(n.batch) }), h("span", { class: n.email ? "" : "am-dim", text: n.email || "Gmail not linked yet" })));
      });
      if (l.length > 60) list.appendChild(h("p", { class: "am-empty", text: (l.length - 60) + " more. Type more of the name or pick a batch." }));
      if (!l.length) list.appendChild(h("p", { class: "am-empty", text: "No match." }));
      list.appendChild(regBar());
    }
    function fill() {
      list.textContent = "";
      if (!st.batch && !(st.q || "").trim()) { list.appendChild(h("p", { class: "am-empty", text: "Type a name, or pick a batch, to see the names." })); list.appendChild(regBar()); return; }
      var key = st.batch || "all";
      if (st.names[key]) return draw(st.names[key]);
      list.appendChild(h("p", { class: "am-empty", text: "Loading names..." }));
      api(st.batch ? "/api/meet/names/" + st.batch : "/api/meet/names").then(function (r) { st.names[key] = r.names; if ((st.batch || "all") === key) draw(r.names); },
        function (e) { list.textContent = ""; list.appendChild(msg(e.message, "bad")); list.appendChild(regBar()); });
    }
    fill();
    show(card);
  }

  // step 3: sign in, only the Gmail that belongs to the picked name is accepted
  function signIn() {
    var p = st.pick, box = h("div", { class: "am-gbtn" });
    var card = h("div", { class: "am-card am-center" },
      h("button", { class: "am-link am-back", type: "button", text: "\u2190 Back", onclick: function () { st.err = ""; picker(); } }),
      h("h2", { text: p.register ? "Register yourself" : p.name }),
      p.email ? h("p", { class: "am-muted" }, "Sign in with ", h("b", { text: p.email }), " to continue.")
        : h("p", { class: "am-muted", text: p.register ? "Sign in with your Gmail. You will enter your name and batch in the next step." : "No Gmail is linked to this name yet. Sign in with your own Gmail and fill the form. The admin will link it to your entry." }),
      st.err ? msg(st.err, "bad") : null, box);
    show(card); toMain();
    googleButton(box, p.email, function (r) {
      var c = decode(r.credential);
      if (!c) return;
      if (p.email && String(c.email).toLowerCase() !== p.email.toLowerCase()) { st.err = "You signed in as " + c.email + ". Please use " + p.email + " for this name."; signIn(); return; }
      st.err = ""; keepToken(r.credential); loadMe();
    });
  }

  function loadMe() {
    show(h("div", { class: "am-card am-center" }, h("p", { class: "am-muted", text: "Loading..." })));
    return api("/api/meet/me", { auth: true }).then(function (me) { st.me = me; formScreen(); }).catch(function (e) {
      if (e.message !== "expired") show(h("div", { class: "am-card" }, msg(e.message, "bad"), h("button", { class: "am-btn", type: "button", text: "Sign out", onclick: function () { signOut(); } })));
    });
  }

  function group(name, label, opts, value, onChange, hint) {
    return h("fieldset", { class: "am-fs" }, h("legend", { text: label }), hint ? h("p", { class: "am-hint", text: hint }) : null,
      h("div", { class: "am-opts" }, opts.map(function (o) {
        return h("label", { class: "am-opt" }, h("input", { type: "radio", name: name, value: o, checked: o === value, onchange: onChange || function () {} }), h("span", { text: o }));
      })));
  }
  function field(id, label, input, hint) { return h("div", { class: "am-field" }, h("label", { for: id, text: label }), input, hint ? h("p", { class: "am-hint", text: hint }) : null); }

  function formScreen() {
    var me = st.me, r = me.response || {}, m = me.member || {}, p = st.pick || {};
    function pre(k, alt) { var v = r[k] !== undefined && r[k] !== "" ? r[k] : (m[k] !== undefined && m[k] !== "" ? m[k] : alt); return v === undefined || v === null ? "" : String(v); }
    var v = { Name: pre("Name", p.name || me.user.name), Batch: pre("Batch", p.batch), Phone: pre("Phone", ""), CurrentStatus: pre("CurrentStatus", "") };
    var tshirtOther = r.Tshirt && SIZES.indexOf(r.Tshirt) < 0, mentorOther = r.Mentor && r.Mentor !== "Yes" && r.Mentor !== "No";

    var batchSel = h("select", { id: "am-Batch", name: "Batch", class: "am-input" }, h("option", { value: "", text: "Select your batch" }));
    for (var y = FIRST_BATCH; y <= thisYear + 1; y++) batchSel.appendChild(h("option", { value: String(y), text: batchLabel(y) }));
    batchSel.value = v.Batch; if (m.locked) batchSel.disabled = true;
    var statusSel = h("select", { id: "am-CurrentStatus", name: "CurrentStatus", class: "am-input" }, h("option", { value: "", text: "Choose one" }));
    var sopts = STATUS.slice(); if (v.CurrentStatus && sopts.indexOf(v.CurrentStatus) < 0) sopts.push(v.CurrentStatus);
    sopts.forEach(function (o) { statusSel.appendChild(h("option", { value: o, text: o })); });
    statusSel.value = v.CurrentStatus;

    var more = h("div", { class: "am-more" }), countBox = h("div", { class: "am-field" });
    var tshirtText = h("input", { class: "am-input", name: "TshirtOther", type: "text", maxlength: "20", placeholder: "eg. 3XL", "aria-label": "Other T-shirt size", value: tshirtOther ? r.Tshirt : "" });
    var mentorText = h("input", { class: "am-input", name: "MentorOther", type: "text", maxlength: "80", placeholder: "eg. I can guide students on career choices", "aria-label": "Other answer", value: mentorOther ? r.Mentor : "" });
    var count = h("input", { id: "am-CompanionCount", name: "CompanionCount", class: "am-input", type: "number", min: "1", max: "10", inputmode: "numeric", value: r.CompanionCount ? String(r.CompanionCount) : "" });
    countBox.appendChild(h("label", { for: "am-CompanionCount", text: "How many people will accompany you?" })); countBox.appendChild(count);

    function sync() {
      var f = form.elements;
      more.hidden = f.Attend.value !== "Yes";
      countBox.hidden = f.Companions.value !== "Yes";
      tshirtText.hidden = f.Tshirt.value !== "Other";
      mentorText.hidden = f.Mentor.value !== "Other";
    }
    more.appendChild(h("h3", { text: "Details for Alumni Meet - 2026" }));
    more.appendChild(group("Companions", "Will you be accompanied by anyone?", ["No", "Yes"], r.Companions || "", sync, "No if you are alone. Yes if accompanied by spouse or children."));
    more.appendChild(countBox);
    more.appendChild(group("Breakfast", "Would you like to have breakfast at the event?", ["Yes", "No"], r.Breakfast || ""));
    more.appendChild(group("Lunch", "Would you like to have lunch at the event?", ["Yes", "No"], r.Lunch || ""));
    more.appendChild(group("Tshirt", "What is your T-shirt size?", SIZES.concat("Other"), tshirtOther ? "Other" : (r.Tshirt || ""), sync, "The Alumni Association is trying to provide a customized T-shirt to each alumnus on the day of the event."));
    more.appendChild(tshirtText);
    more.appendChild(group("Mentor", "Would you be interested in mentoring or guiding current students, or performing something on stage?", ["Yes", "No", "Other"], mentorOther ? "Other" : (r.Mentor || ""), sync, "Subject to time."));
    more.appendChild(mentorText);

    var note = h("div", { id: "am-note" }, st.note ? msg(st.note, "ok") : null); st.note = "";
    var button = h("button", { class: "am-btn am-primary", type: "submit", text: "Save and Next" });
    var form = h("form", { class: "am-form", novalidate: true, onsubmit: function (e) {
      e.preventDefault();
      var f = form.elements, d = {
        Name: f.Name.value, Batch: f.Batch.value, Phone: f.Phone.value, CurrentStatus: f.CurrentStatus.value, Attend: f.Attend.value,
        Companions: f.Companions.value, CompanionCount: f.CompanionCount.value, Breakfast: f.Breakfast.value, Lunch: f.Lunch.value,
        Tshirt: f.Tshirt.value === "Other" ? f.TshirtOther.value : f.Tshirt.value, Mentor: f.Mentor.value === "Other" ? f.MentorOther.value : f.Mentor.value
      };
      note.textContent = ""; button.disabled = true; button.textContent = "Saving...";
      api("/api/meet/me", { method: "PUT", auth: true, json: { data: d } }).then(function (res) { button.textContent = "Saved. Opening your profile..."; note.textContent = ""; note.appendChild(msg(res.message, "ok")); setTimeout(function () { location.href = LOGIN; }, 900); })
        .catch(function (err) { button.disabled = false; button.textContent = "Save and Next"; if (err.message !== "expired") { note.textContent = ""; note.appendChild(msg(err.message, "bad")); note.scrollIntoView({ block: "center" }); } });
    } },
      h("div", { class: "am-card" }, h("h2", { text: "Your details" }),
        field("am-Name", "Name", h("input", { id: "am-Name", name: "Name", class: "am-input", type: "text", maxlength: "80", autocomplete: "name", placeholder: "eg. Mobayea Biswas", readonly: !!m.locked, value: v.Name }), m.locked ? "Your name and batch come from your alumni profile." : null),
        field("am-Batch", "Batch", batchSel),
        field("am-Gmail", "Gmail (from your sign-in)", h("input", { id: "am-Gmail", class: "am-input", type: "email", readonly: true, value: me.user.email })),
        field("am-Phone", "Phone number", h("input", { id: "am-Phone", name: "Phone", class: "am-input", type: "tel", inputmode: "tel", autocomplete: "tel", placeholder: "eg. 9876543210", value: v.Phone })),
        field("am-CurrentStatus", "Current status", statusSel)),
      h("div", { class: "am-card" }, h("h2", { text: "Alumni Meet 2026" }),
        group("Attend", "Will you attend the Alumni Meet? (on 26th December 2026)", ["Yes", "No"], r.Attend || "", sync), more),
      note, button);
    var extra = me.canView ? h("a", { class: "am-viewbtn", href: RESPONSES, text: "View Responses" }) : null;
    var wrap = h("div", null, topBar(me.user.email, extra),
      me.response ? msg("You have already responded. You can change your answers below.", "ok") : null, form);
    show(wrap); sync(); toMain();
  }

  /* ================= RESPONSES PAGE ================= */
  function signedOutResponses(note) {
    var box = h("div", { class: "am-gbtn" });
    show(h("div", { class: "am-card am-center" }, h("h2", { text: "Alumni Meet 2026 responses" }),
      note ? msg(note, "warn") : h("p", { class: "am-muted", text: "For core members and admins. Sign in with your Gmail." }), box));
    googleButton(box, "", function (r) { if (keepToken(r.credential)) loadResponses(); });
  }
  function loadResponses() {
    show(h("div", { class: "am-card am-center" }, h("p", { class: "am-muted", text: "Loading..." })));
    return api("/api/meet/responses", { auth: true }).then(function (r) { st.rows = r.responses; drawResponses(); }).catch(function (e) {
      if (e.message === "expired") return;
      show(h("div", { class: "am-card" }, msg(/only/i.test(e.message) ? "This page is for core members and admins only. This Gmail is not on the list." : e.message, "bad"),
        h("button", { class: "am-btn", type: "button", text: "Sign out", onclick: function () { signOut(); } }), " ", h("a", { class: "am-btn", href: FORM, text: "Back to the form" })));
    });
  }
  function statusText(x) { return [x.CurrentStatus, x.Institute].filter(Boolean).join(" \u00b7 "); }
  function withText(x) { return x.Attend !== "Yes" ? "" : (x.Companions === "Yes" ? "Yes (" + x.CompanionCount + ")" : "No"); }
  function csv(rows) {
    var cols = ["Batch", "Name", "Email", "Phone", "Current status", "Institute", "Attend", "Accompanied", "Number accompanying", "Breakfast", "Lunch", "T-shirt", "Mentor / stage", "Updated"];
    var q = function (s) { s = String(s == null ? "" : s); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    var out = [cols.join(",")];
    rows.forEach(function (x) { out.push([batchLabel(x.Batch), x.Name, x.email, x.Phone, x.CurrentStatus, x.Institute, x.Attend, x.Companions, x.CompanionCount, x.Breakfast, x.Lunch, x.Tshirt, x.Mentor, new Date(x.updated_at * 1000).toISOString().slice(0, 10)].map(q).join(",")); });
    return out.join("\n");
  }
  function drawResponses() {
    var user = st.token.claims || {}, all = st.rows;
    var yrs = {}; all.forEach(function (x) { yrs[x.Batch] = 1; });
    var tiles = h("div", { class: "am-tiles" }), table = h("div", { class: "am-tw" }), shirts = h("p", { class: "am-muted" });
    function tile(n, label) { return h("div", { class: "am-tile" }, h("b", { text: String(n) }), h("span", { text: label })); }
    function list() {
      var q = st.f.q.toLowerCase().trim();
      return all.filter(function (x) { return (!st.f.year || String(x.Batch) === st.f.year) && (!st.f.att || x.Attend === st.f.att) && (!q || (x.Name + " " + x.email + " " + x.Phone).toLowerCase().indexOf(q) >= 0); });
    }
    function fill() {
      var rows = list(), yes = rows.filter(function (x) { return x.Attend === "Yes"; });
      var people = yes.reduce(function (s, x) { return s + 1 + (x.Companions === "Yes" ? Number(x.CompanionCount) || 0 : 0); }, 0);
      tiles.textContent = "";
      tiles.appendChild(tile(rows.length, "Responses")); tiles.appendChild(tile(yes.length, "Attending")); tiles.appendChild(tile(rows.length - yes.length, "Not attending"));
      tiles.appendChild(tile(people, "People coming")); tiles.appendChild(tile(yes.filter(function (x) { return x.Breakfast === "Yes"; }).length, "Breakfast"));
      tiles.appendChild(tile(yes.filter(function (x) { return x.Lunch === "Yes"; }).length, "Lunch"));
      var sz = {}; yes.forEach(function (x) { if (x.Tshirt) sz[x.Tshirt] = (sz[x.Tshirt] || 0) + 1; });
      shirts.textContent = "T-shirts: " + (Object.keys(sz).length ? SIZES.concat(Object.keys(sz).filter(function (k) { return SIZES.indexOf(k) < 0; })).filter(function (k) { return sz[k]; }).map(function (k) { return k + " " + sz[k]; }).join(", ") : "none yet");
      table.textContent = "";
      if (!rows.length) return table.appendChild(h("p", { class: "am-empty", text: "No responses match." }));
      var t = h("table", { class: "am-table" }, h("thead", null, h("tr", null, ["Batch", "Name", "Phone", "Current status", "Attend", "With", "Breakfast", "Lunch", "T-shirt", "Mentor / stage"].map(function (c) { return h("th", { scope: "col", text: c }); }))));
      var tb = h("tbody");
      rows.forEach(function (x) {
        tb.appendChild(h("tr", null, h("td", { text: batchLabel(x.Batch) }), h("td", null, h("b", { text: x.Name }), h("small", { text: x.email })),
          h("td", null, x.Phone ? h("a", { href: "tel:" + x.Phone, text: x.Phone }) : ""), h("td", { text: statusText(x) }),
          h("td", { class: x.Attend === "Yes" ? "am-yes" : "am-no", text: x.Attend }), h("td", { text: withText(x) }), h("td", { text: x.Breakfast }), h("td", { text: x.Lunch }), h("td", { text: x.Tshirt }), h("td", { text: x.Mentor })));
      });
      t.appendChild(tb); table.appendChild(t);
    }
    var yearSel = h("select", { class: "am-input", "aria-label": "Batch", onchange: function (e) { st.f.year = e.target.value; fill(); } }, h("option", { value: "", text: "All batches" }),
      Object.keys(yrs).sort().map(function (y) { return h("option", { value: y, text: "Batch " + batchLabel(y), selected: String(y) === st.f.year }); }));
    var attSel = h("select", { class: "am-input", "aria-label": "Attending", onchange: function (e) { st.f.att = e.target.value; fill(); } }, h("option", { value: "", text: "Everyone" }), h("option", { value: "Yes", text: "Attending", selected: st.f.att === "Yes" }), h("option", { value: "No", text: "Not attending", selected: st.f.att === "No" }));
    var search = h("input", { class: "am-input", type: "search", placeholder: "Search name, Gmail or phone", "aria-label": "Search", value: st.f.q, oninput: function (e) { st.f.q = e.target.value; fill(); } });
    var dl = h("button", { class: "am-btn", type: "button", text: "Download CSV", onclick: function () {
      var a = h("a", { href: URL.createObjectURL(new Blob(["\ufeff" + csv(list())], { type: "text/csv" })), download: "alumni-meet-2026-responses.csv" });
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } });
    show(h("div", null, topBar(user.email || "", h("a", { class: "am-link", href: FORM, text: "Back to form" })),
      h("h2", { class: "am-title", text: "Alumni Meet 2026 responses" }), tiles, shirts, h("div", { class: "am-filters" }, search, yearSel, attSel, dl), table));
    fill();
  }

  /* ---------- start ---------- */
  if (!API || !CLIENT) return show(h("div", { class: "am-card" }, msg("Missing data-api or data-client.", "bad")));
  var t = savedToken();
  if (t) st.token = t;
  if (MODE === "responses") { if (t) loadResponses(); else signedOutResponses(""); }
  else { head.appendChild(welcome()); if (t) loadMe(); else picker(); }
})();
