/* =========================================================
 *  문제 풀이용 그림 (data.js 의 FIG.q.* 로 사용)
 *  주어진 값은 주황색, 구하는 값은 "?" 로 표시
 * ========================================================= */
const QFIG = (() => {
  const r1 = (n) => Math.round(n * 10) / 10;
  const P = (a) => a.map((p) => `${r1(p[0])},${r1(p[1])}`).join(" ");
  const T = (x, y, t, o = {}) =>
    `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${o.anchor || "middle"}" font-size="${o.fs || 14}" font-weight="${o.w || 700}" fill="${o.col || "#1b2333"}">${t}</text>`;
  const cen = (pts) => [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
  const away = (p, c, d) => { const dx = p[0] - c[0], dy = p[1] - c[1], l = Math.hypot(dx, dy) || 1; return [p[0] + (dx / l) * d, p[1] + (dy / l) * d]; };
  const toward = (p, c, d) => away(p, c, -d);
  const svg = (w, h, body) => `<svg viewBox="0 0 ${r1(w)} ${r1(h)}" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif">${body}</svg>`;
  const BLUE = { col: "#2f5bea", fill: "#e8eeff" }, PINK = { col: "#db2777", fill: "#fdeef5" };
  const GIVEN = "#ea580c", ASK = "#d23b3b";

  // 다각형 + 꼭짓점 이름 + 변/각 표시. sides/angles 의 키는 꼭짓점 번호 (변 i: i → i+1)
  function poly(pts, o) {
    const c = cen(pts);
    let s = `<polygon points="${P(pts)}" fill="${o.fill}" stroke="${o.col}" stroke-width="2" stroke-linejoin="round"/>`;
    (o.names || []).forEach((n, i) => { const q = away(pts[i], c, 13); s += T(q[0], q[1] + 5, n, { col: o.col }); });
    Object.entries(o.sides || {}).forEach(([i, l]) => {
      const a = pts[+i], b = pts[(+i + 1) % pts.length];
      const q = away([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], c, 13);
      s += T(q[0], q[1] + 5, l, { col: l.includes("?") || l === "x" ? ASK : GIVEN, fs: 14, w: 800 });
    });
    Object.entries(o.angles || {}).forEach(([i, l]) => {
      const q = toward(pts[+i], c, o.angleGap || 26);
      s += T(q[0], q[1] + 5, l, { col: l.includes("?") ? ASK : "#7c3aed", fs: 12, w: 800 });
    });
    if (o.inner) s += T(c[0], c[1] + 6, o.inner, { col: o.innerCol || o.col, fs: o.innerFs || 15, w: 800 });
    return s;
  }

  // 단위 좌표(y 위쪽) 도형을 왼쪽(sL)·오른쪽(sR) 배율로 나란히 그리기
  function pair(unit, sL, sR, oL, oR, caption) {
    const xs = unit.map((p) => p[0]), ys = unit.map((p) => p[1]);
    const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
    const pad = 34, gap = 56, top = caption ? 44 : 26;
    const base = top + (maxy - miny) * Math.max(sL, sR);
    const place = (s, ox) => unit.map(([x, y]) => [ox + (x - minx) * s, base - (y - miny) * s]);
    const L = place(sL, pad), R = place(sR, pad + (maxx - minx) * sL + gap);
    const w = pad * 2 + (maxx - minx) * (sL + sR) + gap;
    return svg(w, base + 30,
      (caption ? T(w / 2, 22, caption, { fs: 14, col: "#5d6879" }) : "") +
      poly(L, { ...BLUE, ...oL }) + poly(R, { ...PINK, ...oR }));
  }

  // 밑변 L, 양 끝 각 a(왼쪽), b(오른쪽)인 삼각형 → [꼭대기, 왼쪽, 오른쪽]
  function triByAngles(L, a, b) {
    const rad = (d) => (d * Math.PI) / 180;
    const d = (L * Math.sin(rad(b))) / Math.sin(rad(a + b));
    return [[d * Math.cos(rad(a)), d * Math.sin(rad(a))], [0, 0], [L, 0]];
  }

  // 직각삼각형 (직각 C, 세로 a, 가로 b)
  function right(a, b, labels) {
    const s = 180 / Math.max(a, b), pad = 36;
    const C = [pad, pad + a * s], B = [pad, pad], A = [pad + b * s, pad + a * s];
    const m = 12;
    return svg(b * s + pad * 2, a * s + pad * 2,
      poly([B, C, A], { col: "#ea580c", fill: "#fff1e6", names: ["B", "C", "A"], sides: { 0: labels.a, 1: labels.b, 2: labels.c } }) +
      `<polyline points="${P([[C[0], C[1] - m], [C[0] + m, C[1] - m], [C[0] + m, C[1]]])}" fill="none" stroke="#1b2333"/>`);
  }

  // 등각 투영 정육면체 (P0: 앞쪽 아래 꼭짓점, L: 모서리)
  function cube(P0, L, col, faces) {
    const A = [-0.866, -0.5], B = [0.866, -0.5];
    const add = (p, ...vs) => vs.reduce((q, [v, t]) => [q[0] + v[0] * t, q[1] + v[1] * t], p);
    const U = [0, -1], Tp = add(P0, [U, L]);
    return `<g stroke="${col}" stroke-width="1.8" stroke-linejoin="round">
      <polygon points="${P([P0, add(P0, [A, L]), add(P0, [A, L], [U, L]), Tp])}" fill="${faces[1]}"/>
      <polygon points="${P([P0, add(P0, [B, L]), add(P0, [B, L], [U, L]), Tp])}" fill="${faces[2]}"/>
      <polygon points="${P([Tp, add(Tp, [A, L]), add(Tp, [A, L], [B, L]), add(Tp, [B, L])])}" fill="${faces[0]}"/></g>`;
  }

  // 원기둥 (cx: 가운데, by: 밑면 중심 y)
  function cylinder(cx, by, r, h, col, fill) {
    const ry = r * 0.28, ty = by - h;
    return `<g stroke="${col}" stroke-width="1.8">
      <path d="M${cx - r},${ty} L${cx - r},${by} A${r},${ry} 0 0 0 ${cx + r},${by} L${cx + r},${ty}" fill="${fill}"/>
      <ellipse cx="${cx}" cy="${ty}" rx="${r}" ry="${ry}" fill="#fff"/>
      <path d="M${cx - r},${by} A${r},${ry} 0 0 1 ${cx + r},${by}" fill="none" stroke-dasharray="4 3" stroke-opacity=".6"/></g>`;
  }

  // 구 (적도 타원 + 반지름)
  function sphere(cx, cy, r, col, fill, label) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${col}" stroke-width="2"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.26}" fill="none" stroke="${col}" stroke-dasharray="4 3" stroke-opacity=".6"/>
      <line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${GIVEN}" stroke-width="2.5"/>
      <circle cx="${cx}" cy="${cy}" r="3" fill="${col}"/>
      ${T(cx + r / 2, cy - 6, label, { col: GIVEN, fs: 14, w: 800 })}`;
  }

  // 각 표시 호 (꼭짓점 v, 두 점 방향)
  function arc(v, p, q, r, col) {
    const a1 = Math.atan2(p[1] - v[1], p[0] - v[0]), a2 = Math.atan2(q[1] - v[1], q[0] - v[0]);
    const s = [v[0] + r * Math.cos(a1), v[1] + r * Math.sin(a1)], e = [v[0] + r * Math.cos(a2), v[1] + r * Math.sin(a2)];
    let d = a2 - a1; while (d < -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
    return `<path d="M${r1(s[0])},${r1(s[1])} A${r},${r} 0 0 ${d > 0 ? 1 : 0} ${r1(e[0])},${r1(e[1])}" fill="none" stroke="${col}" stroke-width="2"/>`;
  }
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];

  const TRI = [[1.2, 2.6], [0, 0], [4, 0]]; // 기본 삼각형 모양

  /* ---------- 1단원 ---------- */
  const u1q3 = pair(TRI, 26, 39, { names: ["A", "B", "C"], sides: { 0: "6" } }, { names: ["D", "E", "F"], sides: { 0: "?" } }, "△ABC ∽ △DEF, 닮음비 2 : 3");
  const u1q4 = pair([[0.8, 2.2], [0, 0], [3.2, 0], [3.7, 1.9]], 30, 42,
    { names: ["A", "B", "C", "D"], angles: { 1: "70°" } }, { names: ["E", "F", "G", "H"], angles: { 1: "?" } }, "□ABCD ∽ □EFGH");
  const u1q5 = pair(TRI, 25, 41, { inner: "둘레 12", innerFs: 13 }, { inner: "둘레 ?", innerCol: ASK }, "닮음비 3 : 5");
  const u1q6 = (() => {
    const box = (x, by, w, d, h, col, fill, hl) => {
      const dx = d * 0.5, dy = -d * 0.35;
      const f = [[x, by], [x + w, by], [x + w, by - h], [x, by - h]];
      const top = [[x, by - h], [x + w, by - h], [x + w + dx, by - h + dy], [x + dx, by - h + dy]];
      const side = [[x + w, by], [x + w + dx, by + dy], [x + w + dx, by - h + dy], [x + w, by - h]];
      return `<g stroke="${col}" stroke-width="1.8" stroke-linejoin="round"><polygon points="${P(f)}" fill="${fill}"/><polygon points="${P(top)}" fill="#fff"/><polygon points="${P(side)}" fill="${fill}" fill-opacity=".6"/></g>`
        + `<line x1="${x - 8}" y1="${by}" x2="${x - 8}" y2="${by - h}" stroke="${hl.col}" stroke-width="2.5"/>` + T(x - 14, by - h / 2 + 5, hl.t, { col: hl.col, anchor: "end", fs: 14, w: 800 });
    };
    return svg(380, 200, T(190, 20, "닮음비 2 : 5", { fs: 14, col: "#5d6879" })
      + box(50, 180, 40, 24, 32, BLUE.col, BLUE.fill, { t: "4", col: GIVEN })
      + box(190, 180, 100, 60, 80, PINK.col, PINK.fill, { t: "?", col: ASK }));
  })();

  /* ---------- 2단원 ---------- */
  const SSS = [[-1, 3.873], [0, 0], [6, 0]];
  const u2q1 = pair(SSS, 20, 30, { names: ["A", "B", "C"], sides: { 0: "4", 1: "6", 2: "8" } }, { names: ["D", "E", "F"], sides: { 0: "6", 1: "9", 2: "12" } });
  const u2q2 = pair(triByAngles(4, 60, 70), 30, 40,
    { names: ["A", "B", "C"], angles: { 0: "50°", 1: "60°" } }, { names: ["D", "E", "F"], angles: { 0: "50°", 2: "70°" } });
  const SAS = [[0, 0], [3 * Math.cos(0.698), 3 * Math.sin(0.698)], [4, 0]];
  const u2q3 = pair(SAS, 24, 48, { names: ["A", "B", "C"], sides: { 0: "3", 2: "4" }, angles: { 0: "40°" }, angleGap: 22 },
    { names: ["D", "E", "F"], sides: { 0: "6", 2: "8" }, angles: { 0: "40°" } });
  const u2q5 = (() => {
    const A = [170, 26], s = 15;
    const dirB = [Math.cos(2.05), Math.sin(2.05)], dirC = [Math.cos(1.05), Math.sin(1.05)];
    const B = [A[0] + dirB[0] * 12 * s, A[1] + dirB[1] * 12 * s], C = [A[0] + dirC[0] * 8 * s, A[1] + dirC[1] * 8 * s];
    const D = lerp(A, B, 4 / 12), E = lerp(A, C, 6 / 8);
    const lab = (p, q, t, col, side) => { const m = lerp(p, q, 0.5), n = [-(q[1] - p[1]), q[0] - p[0]], l = Math.hypot(...n); return T(m[0] + (n[0] / l) * 14 * side, m[1] + (n[1] / l) * 14 * side + 5, t, { col, fs: 14, w: 800 }); };
    return svg(340, 250,
      `<polygon points="${P([A, B, C])}" fill="#f3ecff" stroke="#7c3aed" stroke-width="2"/>`
      + `<line x1="${r1(D[0])}" y1="${r1(D[1])}" x2="${r1(E[0])}" y2="${r1(E[1])}" stroke="#db2777" stroke-width="2.5"/>`
      + arc(E, A, D, 14, "#db2777") + arc(B, A, C, 18, "#db2777")
      + T(A[0], A[1] - 8, "A") + T(B[0] - 12, B[1] + 6, "B") + T(C[0] + 12, C[1] + 6, "C")
      + T(D[0] - 12, D[1] + 4, "D") + T(E[0] + 12, E[1] + 2, "E")
      + lab(A, D, "4", GIVEN, 1) + lab(D, B, "8", "#94a3b8", 1) + lab(A, E, "6", GIVEN, -1)
      + T(C[0] + 6, (A[1] + C[1]) / 2 + 30, "AC = ?", { col: ASK, anchor: "start", fs: 14, w: 800 })
      + T(170, 244, "∠AED = ∠ABC", { col: "#db2777", fs: 13 }));
  })();
  const u2q6 = (() => {
    const s = 30, ox = 30, by = 200;
    const B = [ox, by], C = [ox + 9 * s, by], A = [ox + 2 * s, by - 5.657 * s], D = [ox + 4 * s, by];
    return svg(340, 230,
      poly([A, B, C], { col: "#7c3aed", fill: "#f3ecff", names: ["A", "B", "C"], sides: { 0: "6", 2: "9" } })
      + `<line x1="${A[0]}" y1="${r1(A[1])}" x2="${D[0]}" y2="${D[1]}" stroke="#db2777" stroke-width="2.5" stroke-dasharray="6 4"/>`
      + `<circle cx="${D[0]}" cy="${D[1]}" r="4" fill="#db2777"/>` + T(D[0], D[1] + 20, "D", { col: "#db2777" })
      + T((A[0] + D[0]) / 2 + 14, (A[1] + D[1]) / 2, "?", { col: ASK, fs: 16, w: 800 })
      + T((B[0] + D[0]) / 2, by + 20, "4", { col: GIVEN, fs: 14, w: 800 })
      + T((B[0] + C[0]) / 2 + 40, by + 20, "BC = 9", { col: GIVEN, fs: 13, w: 800 }));
  })();

  /* ---------- 3단원 ---------- */
  const u3q3 = svg(300, 205, `
    <polygon points="150,20 30,170 270,170" fill="#e6f7fb" stroke="#0891b2" stroke-width="2"/>
    <line x1="90" y1="95" x2="210" y2="95" stroke="#db2777" stroke-width="3"/>
    <circle cx="90" cy="95" r="4" fill="#ea580c"/><circle cx="210" cy="95" r="4" fill="#ea580c"/>
    <path d="M116,52 l8,6 M56,127 l8,6 M176,58 l8,-6 M236,133 l8,-6" stroke="#ea580c" stroke-width="2"/>`
    + T(150, 14, "A") + T(18, 186, "B") + T(282, 186, "C") + T(76, 99, "M", { col: GIVEN }) + T(224, 99, "N", { col: GIVEN })
    + T(150, 88, "MN = ?", { col: ASK, fs: 14, w: 800 }) + T(150, 192, "BC = 14", { col: GIVEN, fs: 14, w: 800 }));
  /* 세 평행선 l ∥ m ∥ n 과 두 직선 p, q
   * gaps: [윗칸, 아랫칸] 의 실제 비율 → 평행선 사이 간격을 그 비율로 정확히 배치
   * p, q: 각 직선의 위·아래 x 좌표 (기울기)  labels: { a, b, c, d } (p 위 두 선분, q 위 두 선분)
   * cross: true 이면 두 직선이 평행선 사이에서 교차하는 모양 */
  function parallels(o) {
    const { W, H, g } = parallelsBody(o);
    if (!o.live) return svg(W, H, g);
    // 움직이는 그림: 설정을 data 속성에 담아 두고 mountLive() 가 드래그를 연결
    return `<svg class="pl-live" data-pl="${encodeURIComponent(JSON.stringify(o))}" viewBox="0 0 ${W} ${r1(H)}" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" style="touch-action:none">${g}</svg>`;
  }

  // 길이의 비를 간단한 자연수의 비로 (예: 0.666… → "2 : 3")
  function simpleRatio(x, y) {
    const r = x / y;
    for (let d = 1; d <= 12; d++) {
      const n = r * d;
      if (Math.abs(n - Math.round(n)) < 0.02 && Math.round(n) > 0) return `${Math.round(n)} : ${d}`;
    }
    return `${(Math.round(r * 100) / 100)} : 1`;
  }

  function parallelsBody(o) {
    const W = 400, left = 22, right = 360;
    const top = o.caption ? (o.live ? 78 : 58) : 40, span = 150; // 움직이는 그림은 ↔ 손잡이 공간 확보
    const ys = [top, top + (span * o.gaps[0]) / (o.gaps[0] + o.gaps[1]), top + span];
    const yA = ys[0] - 22, yB = ys[2] + 22; // 직선 p, q 를 평행선 바깥까지 연장
    const xAt = (line, y) => line[0] + ((y - yA) * (line[1] - line[0])) / (yB - yA);
    const ptsOn = (line) => ys.map((y) => [xAt(line, y), y]);
    const P = ptsOn(o.p), Q = ptsOn(o.q);
    const C1 = "#2f5bea", C2 = "#db2777";
    const seg = (a, b, col, label, side) => {
      const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
      const n = [(-dy / l) * side, (dx / l) * side]; // 선분에 수직인 방향으로 라벨 띄우기
      const isAsk = /[x?]/.test(label);
      return `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="${col}" stroke-width="5" stroke-linecap="round"/>`
        + T(m[0] + n[0] * 16, m[1] + n[1] * 16 + 5, label, { col: isAsk ? ASK : col, fs: 16, w: 800 });
    };
    const dot = (p, name, dx) => `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="3.5" fill="#1b2333"/>` + (name ? T(p[0] + dx, p[1] - 7, name, { fs: 13 }) : "");
    const names = o.names || [];
    let g = o.caption ? T(W / 2, 22, o.caption, { fs: 13, col: "#5d6879" }) : "";
    ys.forEach((y, i) => {
      g += `<line x1="${left}" y1="${r1(y)}" x2="${right}" y2="${r1(y)}" stroke="#0891b2" stroke-width="2"/>`
        + T(right + 10, y + 5, ["l", "m", "n"][i], { anchor: "start", col: "#0891b2", fs: 15, w: 800 });
    });
    g += `<line x1="${o.p[0]}" y1="${yA}" x2="${o.p[1]}" y2="${yB}" stroke="#5d6879" stroke-width="1.6"/>`
      + `<line x1="${o.q[0]}" y1="${yA}" x2="${o.q[1]}" y2="${yB}" stroke="#5d6879" stroke-width="1.6"/>`;
    g += seg(P[0], P[1], C1, o.labels.a, -1) + seg(P[1], P[2], C2, o.labels.b, -1)
      + seg(Q[0], Q[1], C1, o.labels.c, 1) + seg(Q[1], Q[2], C2, o.labels.d, 1);
    // 점 이름은 선분 라벨(a~d)의 반대쪽에 배치
    P.forEach((p, i) => (g += dot(p, names[i], -13)));
    Q.forEach((p, i) => (g += dot(p, names[i + 3], 13)));
    if (o.live) {
      // 끌기 손잡이(↔)와 넓은 투명 터치 영역
      [["p", o.p, C1], ["q", o.q, C2]].forEach(([key, L]) => {
        g += `<line class="pl-hit" data-line="${key}" x1="${L[0]}" y1="${yA}" x2="${L[1]}" y2="${yB}" stroke="transparent" stroke-width="22" style="cursor:ew-resize"/>`
          + `<g class="pl-grip" data-line="${key}" style="cursor:ew-resize"><circle cx="${r1(L[0])}" cy="${yA - 4}" r="12" fill="#fff" stroke="#5d6879" stroke-width="1.6"/>`
          + T(L[0], yA + 1, "↔", { fs: 13, col: "#1b2333", w: 800 }) + `</g>`;
      });
      const d = (p1, p2) => Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
      g += T(W / 2 - 20, yB + 22, `a : b = ${simpleRatio(d(P[0], P[1]), d(P[1], P[2]))}  ·  c : d = ${simpleRatio(d(Q[0], Q[1]), d(Q[1], Q[2]))}`, { col: "#138a52", fs: 13, w: 800 });
      g += T(W / 2 - 20, yB + 40, "↔ 두 직선을 좌우로 끌어 보세요", { col: "#5d6879", fs: 11, w: 600 });
      return { W, H: yB + 48, g };
    }
    g += T(W / 2 - 20, yB + 20, "l ∥ m ∥ n", { col: "#5d6879", fs: 12, w: 600 });
    return { W, H: yB + 28, g };
  }

  // 페이지에 들어간 움직이는 평행선 그림에 드래그 연결 (직선 p, q 를 수평으로 평행이동)
  function mountLive(root) {
    root.querySelectorAll("svg.pl-live").forEach((el) => {
      if (el.dataset.mounted) return;
      el.dataset.mounted = "1";
      const o = JSON.parse(decodeURIComponent(el.dataset.pl));
      const draw = () => { el.innerHTML = parallelsBody(o).g; };
      const toLocal = (e) => {
        const pt = el.createSVGPoint();
        pt.x = e.clientX; pt.y = e.clientY;
        return pt.matrixTransform(el.getScreenCTM().inverse());
      };
      let drag = null;
      el.addEventListener("pointerdown", (e) => {
        const h = e.target.closest("[data-line]");
        if (!h) return;
        drag = { key: h.dataset.line, x0: toLocal(e).x, line: o[h.dataset.line].slice() };
        el.setPointerCapture(e.pointerId);
        e.preventDefault();
      });
      el.addEventListener("pointermove", (e) => {
        if (!drag) return;
        const L = drag.line;
        // 직선의 위·아래 끝이 모두 평행선 안쪽에 남도록 이동 범위 제한
        const lo = 30 - Math.min(L[0], L[1]), hi = 350 - Math.max(L[0], L[1]);
        const dx = Math.max(lo, Math.min(hi, toLocal(e).x - drag.x0));
        o[drag.key] = [L[0] + dx, L[1] + dx];
        draw();
      });
      const end = () => { drag = null; };
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
    });
  }

  const u3q4 = parallels({ gaps: [4, 6], p: [70, 140], q: [230, 330], labels: { a: "4", b: "6", c: "6", d: "x" } });
  const u3q8 = parallels({ gaps: [8, 12], p: [60, 150], q: [210, 300], labels: { a: "8", b: "12", c: "x", d: "15" }, names: ["A", "B", "C", "D", "E", "F"] });
  const parallelConcept = parallels({ gaps: [2, 3], p: [135, 60], q: [215, 320], labels: { a: "a", b: "b", c: "c", d: "d" }, names: ["A", "B", "C", "D", "E", "F"], live: true });
  const parallelCross = parallels({ gaps: [2, 3], p: [90, 300], q: [290, 90], labels: { a: "a", b: "b", c: "c", d: "d" }, caption: "두 직선이 교차해도 a : b = c : d", live: true });

  /* 사다리꼴 ABCD (AD ∥ EF ∥ BC). k = AE : AB 비율, diag 이면 대각선 AC 와 교점 G 표시 */
  function trapezoid(o) {
    const s = o.scale, by = o.top + o.h;
    const A = [o.ax, o.top], D = [o.ax + o.ad * s, o.top];
    const B = [o.bx, by], C = [o.bx + o.bc * s, by];
    const E = lerp(A, B, o.k), F = lerp(D, C, o.k);
    let g = `<polygon points="${P([A, B, C, D])}" fill="#e6f7fb" stroke="#0891b2" stroke-width="2" stroke-linejoin="round"/>`;
    if (o.diag) {
      const G = lerp(A, C, o.k);
      g += `<line x1="${A[0]}" y1="${A[1]}" x2="${C[0]}" y2="${C[1]}" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="6 4"/>`
        + `<line x1="${r1(E[0])}" y1="${r1(E[1])}" x2="${r1(G[0])}" y2="${r1(G[1])}" stroke="#2f5bea" stroke-width="4"/>`
        + `<line x1="${r1(G[0])}" y1="${r1(G[1])}" x2="${r1(F[0])}" y2="${r1(F[1])}" stroke="#db2777" stroke-width="4"/>`
        + `<circle cx="${r1(G[0])}" cy="${r1(G[1])}" r="4" fill="#7c3aed"/>` + T(G[0] + 2, G[1] - 9, "G", { col: "#7c3aed", fs: 13 });
    } else {
      g += `<line x1="${r1(E[0])}" y1="${r1(E[1])}" x2="${r1(F[0])}" y2="${r1(F[1])}" stroke="#db2777" stroke-width="3.5"/>`;
    }
    g += [E, F].map((p) => `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="4" fill="#ea580c"/>`).join("");
    g += T(A[0] - 4, A[1] - 9, "A") + T(D[0] + 4, D[1] - 9, "D") + T(B[0] - 10, B[1] + 18, "B") + T(C[0] + 10, C[1] + 18, "C")
      + T(E[0] - 14, E[1] + 5, "E", { col: GIVEN }) + T(F[0] + 14, F[1] + 5, "F", { col: GIVEN });
    // 변 AB 위의 비 표시 (바깥쪽)
    if (o.ratio) {
      const m1 = lerp(A, E, 0.5), m2 = lerp(E, B, 0.5);
      g += T(m1[0] - 16, m1[1] + 5, o.ratio[0], { col: GIVEN, fs: 14, w: 800 }) + T(m2[0] - 16, m2[1] + 5, o.ratio[1], { col: GIVEN, fs: 14, w: 800 });
    }
    if (o.ticks) {
      const tick = (p, q, n) => {
        const m = lerp(p, q, 0.5), dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy);
        const nx = -dy / l, ny = dx / l;
        let t = "";
        for (let i = 0; i < n; i++) { const c = [m[0] + (dx / l) * (i - (n - 1) / 2) * 5, m[1] + (dy / l) * (i - (n - 1) / 2) * 5]; t += `<line x1="${r1(c[0] - nx * 6)}" y1="${r1(c[1] - ny * 6)}" x2="${r1(c[0] + nx * 6)}" y2="${r1(c[1] + ny * 6)}" stroke="#ea580c" stroke-width="2"/>`; }
        return t;
      };
      g += tick(A, E, 1) + tick(E, B, 1) + tick(D, F, 2) + tick(F, C, 2);
    }
    g += T((A[0] + D[0]) / 2, A[1] - 9, o.adLabel, { col: GIVEN, fs: 14, w: 800 })
      + T((B[0] + C[0]) / 2, by + 20, o.bcLabel, { col: GIVEN, fs: 14, w: 800 });
    if (o.efLabel) g += T((E[0] + F[0]) / 2, E[1] - 8, o.efLabel, { col: o.efLabel.includes("?") ? ASK : "#db2777", fs: 14, w: 800 });
    return svg(o.w || 300, by + 32, g);
  }

  // 개념: AE : EB = m : n, 대각선 AC 로 나누어 생각하기
  const trapConcept = trapezoid({ ax: 100, top: 34, h: 150, bx: 30, ad: 6, bc: 12, scale: 18, k: 1 / 3, diag: true, ratio: ["m", "n"], adLabel: "AD", bcLabel: "BC", w: 300 });
  // 문제: AD = 6, BC = 12, AE : EB = 1 : 2 → EF = 8
  const u3q9 = trapezoid({ ax: 100, top: 34, h: 150, bx: 40, ad: 6, bc: 12, scale: 18, k: 1 / 3, ratio: ["1", "2"], adLabel: "AD = 6", bcLabel: "BC = 12", efLabel: "EF = ?", w: 300 });
  // 문제: 사다리꼴 두 변의 중점 E, F → EF = (8 + 14) ÷ 2 = 11
  const u3q11 = trapezoid({ ax: 96, top: 34, h: 140, bx: 34, ad: 8, bc: 14, scale: 16, k: 1 / 2, ticks: true, adLabel: "AD = 8", bcLabel: "BC = 14", efLabel: "EF = ?", w: 300 });

  // 문제: AB ∥ EF ∥ DC (모두 밑변에 수직), AC 와 BD 의 교점 E → EF = 6×12/(6+12) = 4
  const u3q10 = (() => {
    const s = 12, by = 200, xB = 50, xC = 290;
    const B = [xB, by], C = [xC, by], A = [xB, by - 6 * s], D = [xC, by - 12 * s];
    // 교점: A + t(C - A) = B + u(D - B) 를 풀어 정확히 계산
    const t = (6 * s) / (6 * s + 12 * s); // 닮음비로 구한 AE : AC = 1 : 3 이 되는 지점
    const E = lerp(A, C, t), F = [E[0], by];
    const L = (p, q, col, w, dash) => `<line x1="${r1(p[0])}" y1="${r1(p[1])}" x2="${r1(q[0])}" y2="${r1(q[1])}" stroke="${col}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ""} stroke-linecap="round"/>`;
    const sq = (p) => `<polyline points="${P([[p[0], p[1] - 9], [p[0] + 9, p[1] - 9], [p[0] + 9, p[1]]])}" fill="none" stroke="#1b2333"/>`;
    return svg(340, 250,
      L([30, by], [310, by], "#1b2333", 2)
      + L(A, C, "#7c3aed", 1.8, "6 4") + L(B, D, "#7c3aed", 1.8, "6 4")
      + L(A, B, "#2f5bea", 4) + L(D, C, "#2f5bea", 4) + L(E, F, "#db2777", 4)
      + sq(B) + sq(F) + `<polyline points="${P([[C[0] - 9, C[1]], [C[0] - 9, C[1] - 9], [C[0], C[1] - 9]])}" fill="none" stroke="#1b2333"/>`
      + `<circle cx="${r1(E[0])}" cy="${r1(E[1])}" r="4" fill="#db2777"/>`
      + T(A[0] - 10, A[1] - 6, "A") + T(B[0] - 10, B[1] + 18, "B") + T(D[0] + 10, D[1] - 6, "D") + T(C[0] + 10, C[1] + 18, "C")
      + T(E[0], E[1] - 11, "E", { col: "#db2777" }) + T(F[0], F[1] + 18, "F", { col: "#db2777" })
      + T(A[0] - 22, (A[1] + B[1]) / 2 + 5, "6", { col: GIVEN, fs: 15, w: 800 })
      + T(D[0] + 22, (D[1] + C[1]) / 2 + 5, "12", { col: GIVEN, fs: 15, w: 800 })
      + T(E[0] + 20, (E[1] + F[1]) / 2 + 5, "?", { col: ASK, fs: 17, w: 800 })
      + T(170, 244, "AB ∥ EF ∥ DC", { col: "#5d6879", fs: 12, w: 600 }));
  })();

  /* ---------- 4단원 ---------- */
  const u4q1 = pair([[1.2, 2.8], [0, 0], [4, 0]], 25, 37.5, { inner: "8 cm²", innerFs: 13, sides: { 1: "2" } }, { inner: "? cm²", innerCol: ASK, sides: { 1: "3" } }, "닮음비 2 : 3");
  const u4q2 = svg(330, 185, sphere(75, 100, 25, BLUE.col, BLUE.fill, "1") + sphere(220, 95, 75, PINK.col, PINK.fill, "3")
    + T(75, 150, "겉넓이 A", { col: BLUE.col, fs: 13 }) + T(220, 182, "겉넓이 B", { col: PINK.col, fs: 13 })
    + T(150, 22, "반지름 1 : 3 → 겉넓이의 비 ?", { col: "#5d6879", fs: 13 }));
  const u4q3 = svg(340, 215, cube([80, 180], 46, BLUE.col, ["#f4f7ff", "#dfe7ff", "#c7d5ff"]) + cube([235, 185], 69, PINK.col, ["#fff5f9", "#fde7f1", "#f8c9dd"])
    + T(80, 120, "16 cm³", { col: BLUE.col, fs: 13, w: 800 }) + T(235, 135, "? cm³", { col: ASK, fs: 15, w: 800 })
    + T(80, 205, "모서리 2", { col: GIVEN, fs: 13 }) + T(235, 208, "모서리 3", { col: GIVEN, fs: 13 })
    + T(170, 18, "닮음비 2 : 3", { col: "#5d6879", fs: 13 }));
  const u4q4 = pair([[0.9, 2.1], [0, 0], [3, 0]], 30, 50, { inner: "넓이 9", innerFs: 13, sides: { 1: "?" } }, { inner: "넓이 25", sides: { 1: "?" } }, "닮음비 = ?");
  const u4q6 = svg(340, 225, cylinder(85, 165, 32, 64, BLUE.col, BLUE.fill) + cylinder(240, 170, 48, 96, PINK.col, PINK.fill)
    + T(85, 198, "부피 8", { col: BLUE.col, fs: 13, w: 800 }) + T(85, 216, "겉넓이 20", { col: GIVEN, fs: 13, w: 800 })
    + T(240, 205, "부피 27", { col: PINK.col, fs: 13, w: 800 }) + T(240, 222, "겉넓이 ?", { col: ASK, fs: 14, w: 800 })
    + T(170, 20, "닮은 두 입체도형", { col: "#5d6879", fs: 13 }));

  /* ---------- 5단원 ---------- */
  const u5q1 = right(6, 8, { a: "6", b: "8", c: "?" });
  const u5q2 = right(5, 12, { a: "5", b: "?", c: "13" });
  const u5q4 = svg(260, 210, `
    <rect x="34" y="30" width="192" height="144" fill="#fff1e6" stroke="#ea580c" stroke-width="2"/>
    <line x1="34" y1="174" x2="226" y2="30" stroke="#d23b3b" stroke-width="2.5" stroke-dasharray="7 5"/>`
    + T(130, 196, "12", { col: GIVEN, fs: 15, w: 800 }) + T(20, 108, "9", { col: GIVEN, fs: 15, w: 800 })
    + T(140, 94, "?", { col: ASK, fs: 18, w: 800 }));
  const u5q5 = right(7, 24, { a: "7", b: "x", c: "25" });

  return { u1q3, u1q4, u1q5, u1q6, u2q1, u2q2, u2q3, u2q5, u2q6, u3q3, u3q4, u3q8, u3q9, u3q10, u3q11,
    parallelConcept, parallelCross, trapConcept, mountLive, u4q1, u4q2, u4q3, u4q4, u4q6, u5q1, u5q2, u5q4, u5q5 };
})();
