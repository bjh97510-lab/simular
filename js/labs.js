/* =========================================================
 *  수학 실험실 — 단원별 인터랙티브 실험 + 미션
 *  각 실험: { title, intro, mission, html(), mount(root, ctx) }
 *    ctx.done      : 이미 미션을 완료했는지
 *    ctx.complete(): 미션 완료 시 호출 (도토리 지급은 app.js에서 처리)
 * ========================================================= */
const LABS = (() => {
  const fmt = (n, d = 1) => String(Math.round(n * 10 ** d) / 10 ** d);
  // a : b 를 가장 간단한 자연수의 비로 (예: 1 : 1.5 → "2 : 3"). 자연수 비가 안 되면 소수로 표시
  const intRatio = (a, b) => {
    for (let m = 1; m <= 20; m++) {
      const x = a * m, y = b * m;
      if (Math.abs(x - Math.round(x)) < 1e-9 && Math.abs(y - Math.round(y)) < 1e-9) {
        const gcd = (p, q) => (q ? gcd(q, p % q) : p);
        const g = gcd(Math.round(x), Math.round(y));
        return `${Math.round(x) / g} : ${Math.round(y) / g}`;
      }
    }
    return `1 : 약 ${fmt(b / a, 2)}`;
  };
  const pts = (arr) => arr.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const slider = (id, label, min, max, step, val, unit = "") => `
    <label class="lab-slider">
      <span class="lab-slider-label">${label}</span>
      <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}" />
      <output id="${id}-out">${val}${unit}</output>
    </label>`;
  const rad = (d) => (d * Math.PI) / 180;
  const deg = (r) => (r * 180) / Math.PI;
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const angleAt = (p, q, r) => {
    const v1 = [p[0] - q[0], p[1] - q[1]], v2 = [r[0] - q[0], r[1] - q[1]];
    return deg(Math.acos(Math.max(-1, Math.min(1, (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2))))));
  };
  // 꼭짓점 이름표를 무게중심 반대 방향으로 살짝 띄워 배치
  const labelPos = (v, center, gap) => {
    const dx = v[0] - center[0], dy = v[1] - center[1], l = Math.hypot(dx, dy) || 1;
    return [v[0] + (dx / l) * gap, v[1] + (dy / l) * gap + 5];
  };
  const centerOf = (a) => [(a[0][0] + a[1][0] + a[2][0]) / 3, (a[0][1] + a[1][1] + a[2][1]) / 3];

  /* ---------------- 1단원: 닮음 확대·축소기 ---------------- */
  const u1 = {
    title: "닮음 확대·축소기",
    intro: "닮음비 $k$를 움직여 $\\triangle ABC$를 확대·축소해 보세요. 변의 길이와 각의 크기가 어떻게 변하는지 관찰해요.",
    mission: "닮은 삼각형 △DEF의 밑변 EF의 길이가 9가 되도록 닮음비를 맞춰 보세요.",
    html: () => `
      <div class="lab-grid">
        <div class="lab-stage"><svg id="l1-svg" viewBox="0 0 470 205"></svg></div>
        <div class="lab-panel">
          ${slider("l1-k", "닮음비", 0.5, 2.5, 0.25, 1)}
          <p class="lab-sub">△ABC : △DEF 의 닮음비 — 변의 길이가 <b id="l1-times">1</b>배가 돼요</p>
          <table class="grid lab-table" id="l1-table"></table>
          <div class="lab-note" id="l1-note"></div>
        </div>
      </div>`,
    mount(root, ctx) {
      const base = { A: [2, 3], B: [0, 0], C: [6, 0] };
      const S = 18;
      const side = { AB: dist(base.A, base.B), BC: dist(base.B, base.C), CA: dist(base.C, base.A) };
      const ang = { A: angleAt(base.B, base.A, base.C), B: angleAt(base.A, base.B, base.C), C: angleAt(base.A, base.C, base.B) };
      const input = root.querySelector("#l1-k");
      const tri = (ox, k) => ["A", "B", "C"].map((n) => [ox + base[n][0] * S * k, 185 - base[n][1] * S * k]);
      const draw = () => {
        const k = parseFloat(input.value);
        const r = intRatio(1, k);
        root.querySelector("#l1-k-out").textContent = r;
        root.querySelector("#l1-times").textContent = k;
        const o = tri(20, 1), s = tri(175, k);
        const co = centerOf(o), cs = centerOf(s);
        const lab = (p, c, t, col) => { const q = labelPos(p, c, 12); return `<text x="${q[0]}" y="${q[1]}" text-anchor="middle" font-weight="700" fill="${col}">${t}</text>`; };
        root.querySelector("#l1-svg").innerHTML = `
          <polygon points="${pts(o)}" fill="#e8eeff" stroke="#2f5bea" stroke-width="2"/>
          <polygon points="${pts(s)}" fill="#fdeef5" stroke="#db2777" stroke-width="2"/>
          ${lab(o[0], co, "A", "#2f5bea")}${lab(o[1], co, "B", "#2f5bea")}${lab(o[2], co, "C", "#2f5bea")}
          ${lab(s[0], cs, "D", "#db2777")}${lab(s[1], cs, "E", "#db2777")}${lab(s[2], cs, "F", "#db2777")}
          <text x="${(s[1][0] + s[2][0]) / 2}" y="199" text-anchor="middle" font-size="13" fill="#db2777" font-weight="700">EF = ${fmt(6 * k, 2)}</text>
          <text x="${(o[1][0] + o[2][0]) / 2}" y="199" text-anchor="middle" font-size="13" fill="#2f5bea" font-weight="700">BC = 6</text>`;
        const row = (a, b, v) => `<tr><td>${a} / ${b}</td><td>${fmt(v)}</td><td>${fmt(v * k)}</td><td>${r}</td></tr>`;
        const per = side.AB + side.BC + side.CA;
        root.querySelector("#l1-table").innerHTML = `
          <tr><th>변</th><th>△ABC</th><th>△DEF</th><th>비</th></tr>
          ${row("AB", "DE", side.AB)}${row("BC", "EF", side.BC)}${row("CA", "FD", side.CA)}
          <tr><td>둘레</td><td>${fmt(per)}</td><td>${fmt(per * k)}</td><td>${r}</td></tr>
          <tr><td>∠A / ∠D</td><td>${fmt(ang.A, 0)}°</td><td>${fmt(ang.A, 0)}°</td><td>같음</td></tr>
          <tr><td>∠B / ∠E</td><td>${fmt(ang.B, 0)}°</td><td>${fmt(ang.B, 0)}°</td><td>같음</td></tr>`;
        root.querySelector("#l1-note").innerHTML = k === 1
          ? "k = 1 이면 두 삼각형은 <b>합동</b>이에요. (합동은 닮음비 1:1인 닮음!)"
          : `변의 길이는 모두 <b>${k}배</b>가 되지만 각의 크기는 <b>변하지 않아요</b>.`;
        if (Math.abs(6 * k - 9) < 1e-9) ctx.complete("닮음비가 2 : 3 이면 BC : EF = 6 : 9 가 돼요!");
      };
      input.addEventListener("input", draw);
      draw();
    }
  };

  /* ---------------- 2단원: 닮은 삼각형 만들기 ---------------- */
  const u2 = {
    title: "닮은 삼각형 만들기",
    intro: "왼쪽 $\\triangle ABC$는 $\\angle B=50^\\circ$, $\\angle C=70^\\circ$ 예요. 오른쪽 $\\triangle DEF$의 두 밑각과 밑변 길이를 조절해 보세요.",
    mission: "△DEF가 △ABC와 닮음(AA 닮음)이 되도록 만들어 보세요. 크기는 달라도 괜찮아요!",
    html: () => `
      <div class="lab-grid">
        <div class="lab-stage"><svg id="l2-svg" viewBox="0 0 400 220"></svg></div>
        <div class="lab-panel">
          ${slider("l2-e", "∠E", 20, 120, 5, 80, "°")}
          ${slider("l2-f", "∠F", 20, 120, 5, 40, "°")}
          ${slider("l2-l", "밑변 EF", 2, 7, 0.5, 6)}
          <div class="lab-readout" id="l2-read"></div>
          <div class="lab-note" id="l2-note"></div>
        </div>
      </div>`,
    mount(root, ctx) {
      const S = 32;
      const make = (ox, L, a, b) => {
        const d = (L * Math.sin(rad(b))) / Math.sin(rad(a + b));
        return [[ox + d * Math.cos(rad(a)), d * Math.sin(rad(a))], [ox, 0], [ox + L, 0]].map((p) => [p[0] * S, -p[1] * S]);
      };
      const target = make(0, 4, 50, 70);
      const ins = ["e", "f", "l"].map((k) => root.querySelector(`#l2-${k}`));
      const draw = () => {
        const E = +ins[0].value, F = +ins[1].value, L = +ins[2].value;
        root.querySelector("#l2-e-out").textContent = E + "°";
        root.querySelector("#l2-f-out").textContent = F + "°";
        root.querySelector("#l2-l-out").textContent = L;
        const D = 180 - E - F;
        const svg = root.querySelector("#l2-svg");
        const valid = D > 0;
        const user = valid ? make(5.8, L, E, F) : null;
        const all = valid ? [...target, ...user] : target;
        const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]);
        const minX = Math.min(...xs) - 30, minY = Math.min(...ys) - 40;
        const w = Math.max(Math.max(...xs) - minX + 30, 300), h = Math.max(Math.max(...ys) - minY + 40, 150);
        svg.setAttribute("viewBox", `${minX} ${minY} ${w} ${h}`);
        const fs = Math.max(w, h) * 0.045;
        const txt = (p, t, col, size = fs) => `<text x="${p[0]}" y="${p[1]}" text-anchor="middle" font-size="${size}" font-weight="700" fill="${col}">${t}</text>`;
        // 꼭짓점 이름은 바깥쪽, 각도는 삼각형 안쪽 꼭짓점 근처에 표시
        const tri = (p, names, angs, col, fill) => {
          const c = centerOf(p);
          const inside = (v) => { const dx = c[0] - v[0], dy = c[1] - v[1], l = Math.hypot(dx, dy) || 1; return [v[0] + (dx / l) * fs * 1.9, v[1] + (dy / l) * fs * 1.9 + fs * 0.35]; };
          return `<polygon points="${pts(p)}" fill="${fill}" stroke="${col}" stroke-width="2" vector-effect="non-scaling-stroke"/>
            ${txt([p[0][0], p[0][1] - fs * 0.6], names[0], col)}
            ${txt([p[1][0], p[1][1] + fs * 1.3], names[1], col)}${txt([p[2][0], p[2][1] + fs * 1.3], names[2], col)}
            ${angs.map((a, i) => txt(inside(p[i]), `${a}°`, col, fs * 0.8)).join("")}`;
        };
        let html = tri(target, ["A", "B", "C"], [60, 50, 70], "#2f5bea", "#e8eeff");
        if (valid) html += tri(user, ["D", "E", "F"], [D, E, F], "#7c3aed", "#f3ecff");
        svg.innerHTML = html;

        const read = root.querySelector("#l2-read"), note = root.querySelector("#l2-note");
        if (!valid) {
          read.innerHTML = `∠D = 180° − ${E}° − ${F}° = <b class="bad-t">${D}°</b>`;
          note.innerHTML = "두 각의 합이 180°보다 작아야 삼각형이 만들어져요!";
          return;
        }
        read.innerHTML = `<table class="grid lab-table">
            <tr><th></th><th>△ABC</th><th>△DEF</th></tr>
            <tr><td>세 각</td><td>60°, 50°, 70°</td><td>${D}°, ${E}°, ${F}°</td></tr></table>`;
        const t = [50, 60, 70], uAng = [D, E, F].slice().sort((a, b) => a - b);
        const same = uAng.every((v, i) => v === t[i]);
        const matches = [E, F].filter((v) => t.includes(v)).length;
        if (same) {
          // EF는 ∠D의 대변 → △ABC에서 같은 크기의 각의 대변과 대응 (사인법칙으로 길이 계산)
          const corr = (4 * Math.sin(rad(D))) / Math.sin(rad(60));
          note.innerHTML = `🎉 두 쌍의 대응각이 같아요 → <b>AA 닮음!</b><br/>닮음비 △ABC : △DEF = ${intRatio(corr, L)}`;
          ctx.complete("크기가 달라도 두 각만 같으면 닮음이에요!");
        } else if (matches >= 1) {
          note.innerHTML = "한 쌍의 각은 같아요! 한 쌍만 더 맞춰 보세요.";
        } else {
          note.innerHTML = "△ABC의 각 50°, 70°를 떠올리며 ∠E, ∠F를 조절해 보세요.";
        }
      };
      ins.forEach((i) => i.addEventListener("input", draw));
      draw();
    }
  };

  /* ---------------- 3단원: 무게중심 실험실 (단계별 작도 · 성질 찾기 · 자유 실험) ---------------- */
  const u3 = (() => {
    // 고정 삼각형 (작도 · 성질 찾기용)
    const A = [120, 30], B = [30, 220], C = [330, 220];
    const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
    const D = mid(B, C), E = mid(C, A), F = mid(A, B), G = centerOf([A, B, C]);
    const COL = { tri: "#0891b2", med: "#5d6879", g: "#db2777", two: "#2f5bea", one: "#ea580c", ok: "#138a52", bad: "#d23b3b" };

    const line = (p, q, o = {}) =>
      `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${o.col || COL.med}" stroke-width="${o.w || 2}"
        ${o.dash ? `stroke-dasharray="${o.dash}"` : ""} ${o.anim ? `pathLength="1" class="draw-in"` : ""} stroke-linecap="round"/>`;
    const dot = (p, o = {}) =>
      `<circle cx="${p[0]}" cy="${p[1]}" r="${o.r || 4.5}" fill="${o.col || COL.one}" ${o.anim ? `class="pop-in"` : ""}/>`;
    const label = (p, t, o = {}) => {
      const q = o.at || labelPos(p, G, o.gap || 14);
      return `<text x="${q[0]}" y="${q[1]}" text-anchor="middle" font-weight="800" font-size="${o.fs || 15}" fill="${o.col || "#1b2333"}" ${o.anim ? `class="pop-in"` : ""}>${t}</text>`;
    };
    // 선분의 중점에 n개의 눈금 (같은 길이 표시)
    const ticks = (p, q, n, col) => {
      const m = mid(p, q), dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy);
      const nx = -dy / l, ny = dx / l, ux = dx / l, uy = dy / l;
      let s = "";
      for (let i = 0; i < n; i++) {
        const off = (i - (n - 1) / 2) * 5;
        const c = [m[0] + ux * off, m[1] + uy * off];
        s += `<line x1="${c[0] - nx * 6}" y1="${c[1] - ny * 6}" x2="${c[0] + nx * 6}" y2="${c[1] + ny * 6}" stroke="${col}" stroke-width="2"/>`;
      }
      return s;
    };
    const triangle = (fill = "#e6f7fb") => `<polygon points="${pts([A, B, C])}" fill="${fill}" stroke="${COL.tri}" stroke-width="2.5" stroke-linejoin="round"/>`;
    const vertexLabels = () => label(A, "A") + label(B, "B") + label(C, "C");

    /* ===== ① 단계별 작도 ===== */
    const STEPS = [
      { t: "삼각형 ABC 준비", d: "무게중심을 찾을 삼각형 ABC가 있어요. 무게중심은 삼각형을 손가락 하나로 받쳤을 때 <b>균형이 맞는 점</b>이에요." },
      { t: "변 BC의 중점 D 찾기", d: "변 BC를 똑같이 둘로 나누는 점 D를 찍어요. <b>BD = DC</b> (같은 눈금 표시)" },
      { t: "중선 AD 긋기", d: "꼭짓점 A와 마주 보는 변의 중점 D를 이은 선분 AD를 <b>중선</b>이라고 해요." },
      { t: "중점 E와 중선 BE", d: "같은 방법으로 변 CA의 중점 E를 찾고 (<b>CE = EA</b>), 꼭짓점 B와 이어 중선 BE를 그어요." },
      { t: "두 중선의 교점 G", d: "두 중선 AD와 BE가 만나는 점, 이것이 바로 <b>무게중심 G</b>예요!" },
      { t: "세 번째 중선 CF도 확인", d: "변 AB의 중점 F와 꼭짓점 C를 이은 중선 CF도 <b>G를 지나요</b>. 세 중선은 항상 한 점에서 만나요." },
      { t: "2 : 1 로 나누기 확인", d: "G는 각 중선을 꼭짓점으로부터 <b>2 : 1</b>로 나눠요. <span class='c-blue'>AG</span> : <span class='c-orange'>GD</span> = 2 : 1" }
    ];

    function drawStep(s) {
      const a = (k) => s === k; // 이번 단계에서 새로 나타나는 요소만 애니메이션
      let g = triangle() + vertexLabels();
      if (s >= 1) g += ticks(B, D, 1, COL.one) + ticks(D, C, 1, COL.one) + dot(D, { anim: a(1) }) + label(D, "D", { at: [D[0], D[1] + 20], col: COL.one, anim: a(1) });
      if (s >= 2 && s < 6) g += line(A, D, { anim: a(2) });
      if (s >= 3) g += ticks(C, E, 2, COL.one) + ticks(E, A, 2, COL.one) + dot(E, { anim: a(3) }) + label(E, "E", { col: COL.one, anim: a(3) }) + line(B, E, { anim: a(3) });
      if (s >= 5) g += ticks(A, F, 3, COL.one) + ticks(F, B, 3, COL.one) + dot(F, { anim: a(5) }) + label(F, "F", { col: COL.one, anim: a(5) }) + line(C, F, { anim: a(5), dash: s === 5 ? "" : "" });
      if (s >= 6) g += line(A, G, { col: COL.two, w: 4, anim: a(6) }) + line(G, D, { col: COL.one, w: 4, anim: a(6) })
        + label(mid(A, G), "2", { at: [mid(A, G)[0] - 12, mid(A, G)[1]], col: COL.two, anim: a(6) })
        + label(mid(G, D), "1", { at: [mid(G, D)[0] - 12, mid(G, D)[1] + 4], col: COL.one, anim: a(6) });
      if (s >= 4) g += `<circle cx="${G[0]}" cy="${G[1]}" r="${a(4) ? 14 : 0}" fill="${COL.g}" fill-opacity=".2" ${a(4) ? `class="pulse"` : ""}/>`
        + dot(G, { col: COL.g, r: 6, anim: a(4) }) + label(G, "G", { at: [G[0] + 14, G[1] - 8], col: COL.g, anim: a(4) });
      return g;
    }

    function mountBuild(body) {
      let s = 0, timer = null;
      body.innerHTML = `
        <div class="lab-grid">
          <div class="lab-stage"><svg id="l3b-svg" viewBox="0 0 360 250"></svg></div>
          <div class="lab-panel">
            <div class="build-dots" id="l3b-dots"></div>
            <div class="build-card">
              <div class="build-no" id="l3b-no"></div>
              <h4 id="l3b-title"></h4>
              <p id="l3b-desc"></p>
            </div>
            <div class="build-ctrl">
              <button type="button" class="btn" data-l3b="prev">◀ 이전</button>
              <button type="button" class="btn btn-primary" data-l3b="next">다음 단계 ▶</button>
            </div>
            <div class="build-ctrl">
              <button type="button" class="btn" data-l3b="play">⏵ 자동 재생</button>
              <button type="button" class="btn" data-l3b="reset">↺ 처음부터</button>
            </div>
          </div>
        </div>`;
      const render = () => {
        body.querySelector("#l3b-svg").innerHTML = drawStep(s);
        body.querySelector("#l3b-no").textContent = `STEP ${s + 1} / ${STEPS.length}`;
        body.querySelector("#l3b-title").textContent = STEPS[s].t;
        body.querySelector("#l3b-desc").innerHTML = STEPS[s].d;
        body.querySelector("#l3b-dots").innerHTML = STEPS.map((_, i) =>
          `<button type="button" class="build-dot ${i < s ? "past" : ""} ${i === s ? "cur" : ""}" data-l3b-go="${i}" aria-label="${i + 1}단계">${i + 1}</button>`).join("");
        body.querySelector('[data-l3b="prev"]').disabled = s === 0;
        const next = body.querySelector('[data-l3b="next"]');
        next.disabled = s === STEPS.length - 1;
        next.textContent = s === STEPS.length - 1 ? "작도 완료 ✔" : "다음 단계 ▶";
      };
      const stop = () => { clearInterval(timer); timer = null; const p = body.querySelector('[data-l3b="play"]'); if (p) p.textContent = "⏵ 자동 재생"; };
      body.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        if (b.dataset.l3bGo !== undefined) { stop(); s = +b.dataset.l3bGo; render(); return; }
        const act = b.dataset.l3b;
        if (act === "prev" && s > 0) { stop(); s--; render(); }
        if (act === "next" && s < STEPS.length - 1) { stop(); s++; render(); }
        if (act === "reset") { stop(); s = 0; render(); }
        if (act === "play") {
          if (timer) return stop();
          if (s === STEPS.length - 1) s = 0;
          render();
          b.textContent = "⏸ 멈춤";
          timer = setInterval(() => {
            if (!document.body.contains(body) || s >= STEPS.length - 1) return stop();
            s++; render();
          }, 1800);
        }
      });
      render();
      return stop;
    }

    /* ===== ② 그림에서 성질 찾기 ===== */
    const P = mid(A, D), R = lerp(A, D, 1 / 3); // 오답 후보 점
    const SEG = { AG: [A, G], GD: [G, D], BG: [B, G], GE: [G, E], CG: [C, G], GF: [G, F] };
    const SMALL = { AF: [G, A, F], FB: [G, F, B], BD: [G, B, D], DC: [G, D, C], CE: [G, C, E], EA: [G, E, A] };

    const TASKS = [
      {
        kind: "point", q: "<b>무게중심 G</b>는 어디일까요? 그림의 동그라미 후보 중 하나를 클릭하세요.",
        hint: "무게중심은 세 중선이 만나는 점이에요.",
        items: { G: G, P: P, R: R }, answer: ["G"],
        wrong: { P: "이 점은 중선 AD의 <b>한가운데</b>(1 : 1)예요. 무게중심은 꼭짓점 쪽으로 더 멀어요!", R: "이 점은 AD를 <b>1 : 2</b>로 나눠요. 거꾸로예요! 꼭짓점에서 2, 변 쪽으로 1이에요." },
        ok: "정답! 세 중선 AD, BE, CF가 모두 지나는 점이 무게중심 G예요."
      },
      {
        kind: "seg", q: "중선 BE에서 <b>BG : GE = 2 : 1</b> 이에요. 비에서 <b>'1'</b>에 해당하는 선분을 클릭하세요.",
        hint: "중선 BE 위의 두 조각 중 짧은 쪽!", answer: ["GE"],
        ok: "정답! GE는 중선 BE의 <b>1/3</b>, BG는 <b>2/3</b>예요."
      },
      {
        kind: "seg", q: "중선 <b>AD = 12</b> 일 때, 길이가 <b>8</b>인 선분을 클릭하세요.",
        hint: "8 = 12 × 2/3", answer: ["AG"],
        ok: "정답! AG = 12 × <b>2/3</b> = 8, GD = 12 × <b>1/3</b> = 4"
      },
      {
        kind: "region", q: "세 중선이 삼각형을 <b>6개의 작은 삼각형</b>으로 나눴어요. 6개를 모두 클릭해서 넓이를 확인해 보세요.",
        hint: "하나씩 클릭하면 넓이가 나타나요.", answer: Object.keys(SMALL),
        ok: "6개의 작은 삼각형의 넓이는 <b>모두 같아요!</b> 각각 △ABC의 <b>1/6</b>이에요."
      },
      {
        kind: "choice", q: "색칠된 <b>△GBC</b>의 넓이는 △ABC 넓이의 몇 배일까요?",
        hint: "△GBC 안에 작은 삼각형이 몇 개 들어 있는지 세어 보세요.",
        choices: ["1/2", "1/3", "1/6"], answer: ["1/3"],
        wrong: { "1/2": "△ABD가 1/2이에요. △GBC는 작은 삼각형(1/6) 2개!", "1/6": "작은 삼각형 하나가 1/6이에요. △GBC에는 2개가 들어 있어요." },
        ok: "정답! △GBC = 1/6 × 2 = <b>1/3</b>. △GAB, △GCA도 모두 1/3이에요."
      }
    ];

    function mountFind(body, ctx) {
      let t = 0;
      const solved = TASKS.map(() => false);
      let picked = new Set(); // 영역 과제에서 클릭한 삼각형

      body.innerHTML = `
        <div class="lab-grid">
          <div class="lab-stage"><svg id="l3f-svg" viewBox="0 0 360 250"></svg></div>
          <div class="lab-panel">
            <div class="build-dots" id="l3f-dots"></div>
            <div class="build-card">
              <div class="build-no" id="l3f-no"></div>
              <p class="find-q" id="l3f-q"></p>
              <p class="find-hint" id="l3f-hint"></p>
              <div class="find-choices" id="l3f-choices"></div>
            </div>
            <div class="find-fb" id="l3f-fb" hidden></div>
            <div class="build-ctrl"><button type="button" class="btn btn-primary" data-l3f="next" hidden>다음 ▶</button></div>
          </div>
        </div>`;
      const svg = body.querySelector("#l3f-svg");

      const render = (flash) => {
        const task = TASKS[t], done = solved[t];
        let g = "";
        if (task.kind === "region") {
          g += triangle("#f8fafc");
          Object.entries(SMALL).forEach(([k, tri]) => {
            const on = picked.has(k) || done;
            const c = centerOf(tri);
            g += `<polygon class="hit-region ${on ? "on" : ""}" data-hit="${k}" points="${pts(tri)}"/>`;
            if (on) g += `<text x="${c[0]}" y="${c[1] + 5}" text-anchor="middle" font-weight="800" font-size="14" fill="${COL.ok}" class="pop-in" pointer-events="none">1/6</text>`;
          });
        } else if (task.kind === "choice") {
          g += triangle("#f8fafc") + `<polygon points="${pts([G, B, C])}" fill="${COL.g}" fill-opacity=".22" stroke="${COL.g}" stroke-width="2"/>`;
          if (done) g += [[G, B, D], [G, D, C]].map((tr) => { const c = centerOf(tr); return `<text x="${c[0]}" y="${c[1] + 5}" text-anchor="middle" font-weight="800" font-size="13" fill="${COL.g}">1/6</text>`; }).join("");
        } else {
          g += triangle();
        }
        // 중선과 중점
        g += line(A, D, { dash: "5 4" }) + line(B, E, { dash: "5 4" }) + line(C, F, { dash: "5 4" });
        g += ticks(B, D, 1, COL.one) + ticks(D, C, 1, COL.one) + ticks(C, E, 2, COL.one) + ticks(E, A, 2, COL.one) + ticks(A, F, 3, COL.one) + ticks(F, B, 3, COL.one);
        g += dot(D) + dot(E) + dot(F) + vertexLabels()
          + label(D, "D", { at: [D[0], D[1] + 20], col: COL.one }) + label(E, "E", { col: COL.one }) + label(F, "F", { col: COL.one });

        if (task.kind === "point") {
          Object.entries(task.items).forEach(([k, p]) => {
            const isAns = task.answer.includes(k);
            const cls = done && isAns ? "ok" : flash && flash.key === k ? "bad" : "";
            g += `<circle class="hit-point ${cls}" data-hit="${k}" cx="${p[0]}" cy="${p[1]}" r="11"/>`;
          });
          if (done) g += label(G, "G", { at: [G[0] + 16, G[1] - 10], col: COL.g });
        } else {
          g += dot(G, { col: COL.g, r: 5.5 }) + label(G, "G", { at: [G[0] + 14, G[1] - 9], col: COL.g });
        }
        if (task.kind === "seg") {
          Object.entries(SEG).forEach(([k, [p, q]]) => {
            const isAns = task.answer.includes(k);
            const cls = done && isAns ? "ok" : flash && flash.key === k ? "bad" : "";
            g += `<line class="seg-vis ${cls}" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`
              + `<line class="hit-seg" data-hit="${k}" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`;
          });
          g += dot(G, { col: COL.g, r: 5.5 });
        }
        svg.innerHTML = g;

        body.querySelector("#l3f-no").textContent = `성질 찾기 ${t + 1} / ${TASKS.length}`;
        body.querySelector("#l3f-q").innerHTML = task.q;
        body.querySelector("#l3f-hint").innerHTML = `💡 ${task.hint}${task.kind === "region" ? ` (${done ? 6 : picked.size}/6)` : ""}`;
        body.querySelector("#l3f-choices").innerHTML = task.kind === "choice"
          ? task.choices.map((c) => `<button type="button" class="btn find-choice ${done && task.answer.includes(c) ? "ok" : ""} ${flash && flash.key === c ? "bad" : ""}" data-l3f-choice="${c}" ${done ? "disabled" : ""}>${c} 배</button>`).join("")
          : "";
        body.querySelector("#l3f-dots").innerHTML = TASKS.map((_, i) =>
          `<button type="button" class="build-dot ${solved[i] ? "past" : ""} ${i === t ? "cur" : ""}" data-l3f-go="${i}" aria-label="${i + 1}번 과제">${i + 1}</button>`).join("");
        const fb = body.querySelector("#l3f-fb");
        if (done) { fb.hidden = false; fb.className = "find-fb ok"; fb.innerHTML = `✅ ${task.ok}`; }
        else if (flash) { fb.hidden = false; fb.className = "find-fb bad"; fb.innerHTML = `❌ ${flash.msg}`; }
        else fb.hidden = true;
        const next = body.querySelector('[data-l3f="next"]');
        next.hidden = !done;
        next.textContent = solved.every(Boolean) ? "🎉 모든 성질 찾기 완료!" : t < TASKS.length - 1 ? "다음 성질 ▶" : "남은 과제로 ▶";
        next.disabled = solved.every(Boolean) && t === TASKS.length - 1;
      };

      const answer = (key) => {
        const task = TASKS[t];
        if (solved[t]) return;
        if (task.kind === "region") {
          picked.add(key);
          if (picked.size === 6) solve();
          else render();
          return;
        }
        if (task.answer.includes(key)) return solve();
        const msg = (task.wrong && task.wrong[key]) || "다시 생각해 보세요! " + task.hint;
        render({ key, msg });
      };
      const solve = () => {
        solved[t] = true;
        render();
        if (solved.every(Boolean)) ctx.complete("무게중심의 성질 5가지를 그림에서 모두 찾았어요!");
      };

      svg.addEventListener("click", (e) => {
        const h = e.target.closest("[data-hit]");
        if (h) answer(h.dataset.hit);
      });
      body.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        if (b.dataset.l3fChoice) return answer(b.dataset.l3fChoice);
        if (b.dataset.l3fGo !== undefined) { t = +b.dataset.l3fGo; picked = new Set(); return render(); }
        if (b.dataset.l3f === "next") {
          const nextIdx = TASKS.findIndex((_, i) => i > t && !solved[i]);
          const anyIdx = solved.findIndex((v) => !v);
          t = nextIdx >= 0 ? nextIdx : anyIdx >= 0 ? anyIdx : Math.min(t + 1, TASKS.length - 1);
          picked = new Set();
          render();
        }
      });
      render();
    }

    /* ===== ③ 자유 실험 (꼭짓점 드래그) ===== */
    function mountDrag(body) {
      body.innerHTML = `
        <div class="lab-grid">
          <div class="lab-stage">
            <svg id="l3-svg" viewBox="0 0 360 260" style="touch-action:none">
              <polygon id="l3-tri" fill="#e6f7fb" stroke="#0891b2" stroke-width="2"/>
              <polygon id="l3-gbc" fill="#0891b2" fill-opacity=".12"/>
              <line id="l3-m0" stroke="#5d6879" stroke-dasharray="5 4"/>
              <line id="l3-m1" stroke="#5d6879" stroke-dasharray="5 4"/>
              <line id="l3-m2" stroke="#5d6879" stroke-dasharray="5 4"/>
              <line id="l3-ag" stroke="#2f5bea" stroke-width="3"/>
              <line id="l3-gd" stroke="#ea580c" stroke-width="3"/>
              <circle id="l3-d" r="4" fill="#ea580c"/>
              <text id="l3-dl" font-weight="700" fill="#ea580c" text-anchor="middle">D</text>
              <circle id="l3-g" r="6" fill="#db2777"/>
              <text id="l3-gl" font-weight="700" fill="#db2777">G</text>
              ${["A", "B", "C"].map((n) => `
                <circle class="drag-handle" data-v="${n}" r="12" fill="#0891b2" fill-opacity=".9" stroke="#fff" stroke-width="2"/>
                <text class="vlabel" data-l="${n}" font-weight="800" text-anchor="middle">${n}</text>`).join("")}
            </svg>
          </div>
          <div class="lab-panel">
            <div class="lab-readout" id="l3-read"></div>
            <div class="lab-note">꼭짓점 <b>동그라미를 드래그</b>해 모양을 바꿔 보세요. 어떤 삼각형이든 <b>AG : GD = 2 : 1</b>, 세 삼각형의 넓이는 <b>모두 같을까요?</b></div>
          </div>
        </div>`;
      const Pv = { A: [170, 40], B: [50, 220], C: [320, 220] };
      const svg = body.querySelector("#l3-svg");
      const $s = (id) => svg.querySelector(id);
      const setLine = (el, p, q) => { el.setAttribute("x1", p[0]); el.setAttribute("y1", p[1]); el.setAttribute("x2", q[0]); el.setAttribute("y2", q[1]); };
      const area = (a, b, c) => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
      const update = () => {
        const { A: a, B: b, C: c } = Pv;
        const g = centerOf([a, b, c]);
        const d = mid(b, c), e = mid(c, a), f = mid(a, b);
        $s("#l3-tri").setAttribute("points", pts([a, b, c]));
        $s("#l3-gbc").setAttribute("points", pts([g, b, c]));
        setLine($s("#l3-m0"), a, d); setLine($s("#l3-m1"), b, e); setLine($s("#l3-m2"), c, f);
        setLine($s("#l3-ag"), a, g); setLine($s("#l3-gd"), g, d);
        $s("#l3-d").setAttribute("cx", d[0]); $s("#l3-d").setAttribute("cy", d[1]);
        const dl = labelPos(d, g, 14);
        $s("#l3-dl").setAttribute("x", dl[0]); $s("#l3-dl").setAttribute("y", dl[1]);
        $s("#l3-g").setAttribute("cx", g[0]); $s("#l3-g").setAttribute("cy", g[1]);
        $s("#l3-gl").setAttribute("x", g[0] + 9); $s("#l3-gl").setAttribute("y", g[1] - 7);
        ["A", "B", "C"].forEach((n) => {
          const h = svg.querySelector(`[data-v="${n}"]`), l = svg.querySelector(`[data-l="${n}"]`);
          h.setAttribute("cx", Pv[n][0]); h.setAttribute("cy", Pv[n][1]);
          l.setAttribute("x", Pv[n][0]); l.setAttribute("y", Pv[n][1] + 5);
        });
        const u = 20; // 20px = 1
        const ag = dist(a, g) / u, gd = dist(g, d) / u;
        const r = gd > 0.01 ? fmt(ag / gd, 2) : "-";
        body.querySelector("#l3-read").innerHTML = `
          <table class="grid lab-table">
            <tr><th>중선 AD</th><th>AG</th><th>GD</th><th>AG ÷ GD</th></tr>
            <tr><td>${fmt(ag + gd)}</td><td class="c-blue">${fmt(ag)}</td><td class="c-orange">${fmt(gd)}</td><td><b>${r}</b></td></tr>
          </table>
          <table class="grid lab-table">
            <tr><th>△ABC</th><th>△GAB</th><th>△GBC</th><th>△GCA</th></tr>
            <tr><td>${fmt(area(a, b, c) / (u * u))}</td><td>${fmt(area(g, a, b) / (u * u))}</td><td class="c-cyan"><b>${fmt(area(g, b, c) / (u * u))}</b></td><td>${fmt(area(g, c, a) / (u * u))}</td></tr>
          </table>`;
      };
      const toLocal = (e) => {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX; pt.y = e.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
      };
      let drag = null;
      svg.addEventListener("pointerdown", (e) => {
        const h = e.target.closest("[data-v]");
        if (!h) return;
        drag = h.dataset.v;
        svg.setPointerCapture(e.pointerId);
        e.preventDefault();
      });
      svg.addEventListener("pointermove", (e) => {
        if (!drag) return;
        const p = toLocal(e);
        Pv[drag] = [Math.max(14, Math.min(346, p.x)), Math.max(14, Math.min(246, p.y))];
        update();
      });
      const end = () => { drag = null; };
      svg.addEventListener("pointerup", end);
      svg.addEventListener("pointercancel", end);
      update();
    }

    return {
      title: "무게중심 실험실",
      intro: "① 무게중심을 <b>단계별로 작도</b>해 보고, ② 그림에서 <b>무게중심의 성질</b>을 직접 찾아본 뒤, ③ 삼각형 모양을 바꿔 가며 자유롭게 실험해 보세요.",
      mission: "② 성질 찾기에서 무게중심의 성질 5가지를 그림에서 모두 찾아보세요.",
      html: () => `
        <div class="sub-tabs" role="tablist">
          <button type="button" class="active" data-l3-mode="build">① 단계별 작도</button>
          <button type="button" data-l3-mode="find">② 그림에서 성질 찾기</button>
          <button type="button" data-l3-mode="drag">③ 자유 실험</button>
        </div>
        <div id="l3-body"></div>`,
      mount(root, ctx) {
        let current = root.querySelector("#l3-body");
        let stopBuild = null;
        const show = (mode) => {
          if (stopBuild) { stopBuild(); stopBuild = null; }
          root.querySelectorAll("[data-l3-mode]").forEach((b) => b.classList.toggle("active", b.dataset.l3Mode === mode));
          // 이전 모드의 이벤트 리스너를 버리기 위해 본문 노드를 새로 교체
          const fresh = current.cloneNode(false);
          current.replaceWith(fresh);
          current = fresh;
          if (mode === "build") stopBuild = mountBuild(fresh);
          else if (mode === "find") mountFind(fresh, ctx);
          else mountDrag(fresh);
        };
        root.querySelector(".sub-tabs").addEventListener("click", (e) => {
          const b = e.target.closest("[data-l3-mode]");
          if (b) show(b.dataset.l3Mode);
        });
        show("build");
      }
    };
  })();

  /* ---------------- 4단원: 쌓기나무 닮음 실험 ---------------- */
  const u4 = {
    title: "쌓기나무 정육면체 실험",
    intro: "모서리의 길이를 $k$배로 늘리면 넓이와 부피는 몇 배가 될까요? 쌓기나무로 정육면체를 만들어 확인해 보세요.",
    mission: "부피가 처음 정육면체의 27배가 되는 정육면체를 만들어 보세요.",
    html: () => `
      <div class="lab-grid">
        <div class="lab-stage"><svg id="l4-svg" viewBox="0 0 330 260"></svg></div>
        <div class="lab-panel">
          ${slider("l4-k", "모서리 k배", 1, 4, 1, 2)}
          <table class="grid lab-table" id="l4-table"></table>
          <div class="lab-note" id="l4-note"></div>
        </div>
      </div>`,
    mount(root, ctx) {
      const A = [-0.866, -0.5], B = [0.866, -0.5], U = [0, -1];
      const add = (p, ...vs) => vs.reduce((acc, [v, t]) => [acc[0] + v[0] * t, acc[1] + v[1] * t], p);
      const cube = (P0, s, k, col) => {
        const L = s * k, T = add(P0, [U, L]);
        const left = [P0, add(P0, [A, L]), add(P0, [A, L], [U, L]), T];
        const right = [P0, add(P0, [B, L]), add(P0, [B, L], [U, L]), T];
        const top = [T, add(T, [A, L]), add(T, [A, L], [B, L]), add(T, [B, L])];
        let grid = "";
        const ln = (p, q) => `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`;
        for (let i = 1; i < k; i++) {
          const t = i * s;
          grid += ln(add(P0, [A, t]), add(P0, [A, t], [U, L])) + ln(add(P0, [U, t]), add(P0, [U, t], [A, L]));
          grid += ln(add(P0, [B, t]), add(P0, [B, t], [U, L])) + ln(add(P0, [U, t]), add(P0, [U, t], [B, L]));
          grid += ln(add(T, [A, t]), add(T, [A, t], [B, L])) + ln(add(T, [B, t]), add(T, [B, t], [A, L]));
        }
        return `<g stroke="${col}" stroke-width="1.5" stroke-linejoin="round">
          <polygon points="${pts(left)}" fill="#fde7f1"/>
          <polygon points="${pts(right)}" fill="#f8c9dd"/>
          <polygon points="${pts(top)}" fill="#fff5f9"/>
          <g stroke-opacity=".7">${grid}</g></g>`;
      };
      const input = root.querySelector("#l4-k");
      const draw = () => {
        const k = +input.value;
        root.querySelector("#l4-k-out").textContent = k;
        root.querySelector("#l4-svg").innerHTML = `
          ${cube([45, 225], 26, 1, "#2f5bea")}
          <text x="45" y="250" text-anchor="middle" font-size="12" fill="#5d6879">처음 (k=1)</text>
          ${cube([215, 225], 26, k, "#db2777")}
          <text x="215" y="250" text-anchor="middle" font-size="12" fill="#5d6879">쌓기나무 ${k ** 3}개</text>`;
        root.querySelector("#l4-table").innerHTML = `
          <tr><th>구분</th><th>처음</th><th>만든 것</th><th>비</th></tr>
          <tr><td>모서리</td><td>1</td><td>${k}</td><td>1 : ${k}</td></tr>
          <tr><td>한 면의 넓이</td><td>1</td><td>${k * k}</td><td><b>1 : ${k}²</b></td></tr>
          <tr><td>겉넓이</td><td>6</td><td>${6 * k * k}</td><td><b>1 : ${k}²</b></td></tr>
          <tr><td>부피</td><td>1</td><td>${k ** 3}</td><td><b>1 : ${k}³</b></td></tr>`;
        root.querySelector("#l4-note").innerHTML = `모서리가 <b>${k}배</b> → 넓이는 <b>${k * k}배</b> → 부피는 <b>${k ** 3}배</b>`;
        if (k === 3) ctx.complete("닮음비 1 : 3 → 부피의 비 1 : 27 (= 1³ : 3³)!");
      };
      input.addEventListener("input", draw);
      draw();
    }
  };

  /* ---------------- 5단원: 피타고라스 수 탐험대 ---------------- */
  const u5 = {
    title: "피타고라스 수 탐험대",
    intro: "직각을 낀 두 변 $a$, $b$의 길이를 바꾸면 세 정사각형의 넓이가 어떻게 변할까요? 빗변 $c$가 <b>자연수</b>가 되는 순간을 찾아보세요!",
    mission: "빗변이 자연수가 되는 서로 다른 피타고라스 수를 3개 찾아보세요.",
    html: () => `
      <div class="lab-grid">
        <div class="lab-stage"><svg id="l5-svg" viewBox="0 0 300 300"></svg></div>
        <div class="lab-panel">
          ${slider("l5-a", "변 a", 1, 20, 1, 2)}
          ${slider("l5-b", "변 b", 1, 20, 1, 3)}
          <div class="lab-readout" id="l5-read"></div>
          <div class="lab-note" id="l5-note"></div>
          <div class="found" id="l5-found"></div>
        </div>
      </div>`,
    mount(root, ctx) {
      const found = new Map();
      const ia = root.querySelector("#l5-a"), ib = root.querySelector("#l5-b");
      const draw = () => {
        const a = +ia.value, b = +ib.value;
        root.querySelector("#l5-a-out").textContent = a;
        root.querySelector("#l5-b-out").textContent = b;
        const c2 = a * a + b * b, c = Math.sqrt(c2), isInt = Number.isInteger(c);
        // 수학 좌표 (C=원점, B=(0,a), A=(b,0)) → SVG 좌표 (y 반전, 10배)
        const S = 10, P = (x, y) => [x * S, -y * S];
        const Cc = P(0, 0), Bp = P(0, a), Ap = P(b, 0);
        const sqA = [P(0, 0), P(0, a), P(-a, a), P(-a, 0)];
        const sqB = [P(0, 0), P(b, 0), P(b, -b), P(0, -b)];
        const sqC = [P(b, 0), P(0, a), P(a, a + b), P(a + b, b)];
        const all = [...sqA, ...sqB, ...sqC];
        const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]);
        const pad = 14, minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad;
        const w = Math.max(...xs) - minX + pad, h = Math.max(...ys) - minY + pad;
        const svg = root.querySelector("#l5-svg");
        svg.setAttribute("viewBox", `${minX} ${minY} ${w} ${h}`);
        const fs = Math.max(w, h) * 0.055;
        const ctr = (q) => [(q[0][0] + q[2][0]) / 2, (q[0][1] + q[2][1]) / 2 + fs / 3]; // 정사각형 중심
        const tx = (q, t, col) => { const p = ctr(q); return `<text x="${p[0]}" y="${p[1]}" font-size="${fs}" text-anchor="middle" font-weight="800" fill="${col}">${t}</text>`; };
        const m = Math.min(a, b, 2) * S * 0.25;
        svg.innerHTML = `
          <polygon points="${pts(sqA)}" fill="#e8eeff" stroke="#2f5bea" vector-effect="non-scaling-stroke" stroke-width="1.5"/>
          <polygon points="${pts(sqB)}" fill="#fdeef5" stroke="#db2777" vector-effect="non-scaling-stroke" stroke-width="1.5"/>
          <polygon points="${pts(sqC)}" fill="${isInt ? "#fff1c2" : "#fff1e6"}" stroke="#ea580c" vector-effect="non-scaling-stroke" stroke-width="${isInt ? 3 : 1.5}"/>
          <polygon points="${pts([Cc, Bp, Ap])}" fill="#fff" stroke="#1b2333" vector-effect="non-scaling-stroke" stroke-width="2"/>
          <polyline points="${pts([[0, -m], [m, -m], [m, 0]])}" fill="none" stroke="#1b2333" vector-effect="non-scaling-stroke"/>
          ${tx(sqA, a * a, "#2f5bea")}${tx(sqB, b * b, "#db2777")}${tx(sqC, c2, "#ea580c")}`;

        root.querySelector("#l5-read").innerHTML = `
          <div class="eq"><span class="c-blue">${a}² = ${a * a}</span> + <span class="c-pink">${b}² = ${b * b}</span></div>
          <div class="eq">= <span class="c-orange">c² = ${c2}</span></div>
          <div class="eq">c = ${isInt ? `<b class="c-orange">${c}</b>` : `√${c2} ≈ ${fmt(c, 2)}`}</div>`;
        const note = root.querySelector("#l5-note");
        if (isInt) {
          const key = [Math.min(a, b), Math.max(a, b), c].join("·");
          const isNew = !found.has(key);
          found.set(key, true);
          note.innerHTML = `🎉 <b>피타고라스 수 발견!</b> (${key})${isNew ? "" : " — 이미 찾은 수예요."}`;
        } else {
          note.innerHTML = "빗변 c가 자연수가 되도록 a, b를 바꿔 보세요. <small>힌트: 3·4·5의 배수!</small>";
        }
        root.querySelector("#l5-found").innerHTML = found.size
          ? `<b>찾은 피타고라스 수 ${found.size}/3</b> ${[...found.keys()].map((k) => `<span class="chip">${k}</span>`).join(" ")}`
          : "";
        if (found.size >= 3) ctx.complete("a² + b² = c² 를 만족하는 자연수 쌍을 피타고라스 수라고 해요!");
      };
      ia.addEventListener("input", draw);
      ib.addEventListener("input", draw);
      draw();
    }
  };

  return { u1, u2, u3, u4, u5 };
})();
