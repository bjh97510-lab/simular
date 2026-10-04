/* =========================================================
 *  학습 데이터: 단원 / 개념 카드 / 문제
 *  - 수식은 KaTeX 문법($...$, $$...$$)으로 작성
 *  - type: "mc"(객관식, answer = 정답 보기 index) | "short"(단답형, answer = 허용 답 배열)
 * ========================================================= */

const FIG = {
  similar: `
<svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="14">
  <polygon points="60,90 20,170 120,170" fill="#e8eeff" stroke="#2f5bea" stroke-width="2"/>
  <polygon points="230,50 170,170 320,170" fill="#fdeef5" stroke="#db2777" stroke-width="2"/>
  <text x="56" y="82" font-weight="700">A</text><text x="6" y="186" font-weight="700">B</text><text x="122" y="186" font-weight="700">C</text>
  <text x="226" y="42" font-weight="700">D</text><text x="156" y="186" font-weight="700">E</text><text x="322" y="186" font-weight="700">F</text>
  <text x="70" y="190" fill="#2f5bea" font-size="12">4</text>
  <text x="240" y="190" fill="#db2777" font-size="12">6</text>
  <path d="M27,156 A16,16 0 0 0 36,166" fill="none" stroke="#2f5bea"/>
  <path d="M180,150 A24,24 0 0 0 192,168" fill="none" stroke="#db2777"/>
  <text x="128" y="110" font-size="13" fill="#5d6879">△ABC ∽ △DEF</text>
  <text x="140" y="128" font-size="13" fill="#5d6879">닮음비 2 : 3</text>
</svg>`,
  parallel: `
<svg viewBox="0 0 300 195" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="14">
  <polygon points="150,20 30,170 270,170" fill="#e6f7fb" stroke="#0891b2" stroke-width="2"/>
  <line x1="78" y1="110" x2="222" y2="110" stroke="#db2777" stroke-width="2.5"/>
  <text x="145" y="14" font-weight="700">A</text><text x="16" y="186" font-weight="700">B</text><text x="272" y="186" font-weight="700">C</text>
  <text x="60" y="112" font-weight="700">D</text><text x="228" y="112" font-weight="700">E</text>
  <text x="130" y="104" font-size="12" fill="#db2777">DE ∥ BC</text>
</svg>`,
  // DE ∥ BC 일 때 DE : BC = AD : AB (DB가 아님!) 를 보여주는 해설 그림
  parallelWhy: `
<svg viewBox="0 0 340 215" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="14">
  <polygon points="150,20 30,170 270,170" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
  <polygon points="150,20 78,110 222,110" fill="#fde7f1" stroke="none"/>
  <path d="M141.4,13 L136,8.6 L16,158.6 L21.4,163" fill="none" stroke="#2f5bea" stroke-width="2"/>
  <text x="50" y="80" fill="#2f5bea" font-weight="800" text-anchor="end">AB</text>
  <line x1="150" y1="20" x2="78" y2="110" stroke="#2f5bea" stroke-width="5" stroke-linecap="round"/>
  <text x="122" y="72" fill="#2f5bea" font-weight="800">AD</text>
  <line x1="78" y1="110" x2="30" y2="170" stroke="#94a3b8" stroke-width="4" stroke-dasharray="4 4"/>
  <text x="62" y="152" fill="#d23b3b" font-weight="800">DB ✗</text>
  <line x1="78" y1="110" x2="222" y2="110" stroke="#db2777" stroke-width="5" stroke-linecap="round"/>
  <text x="150" y="102" text-anchor="middle" fill="#db2777" font-weight="800">DE</text>
  <line x1="30" y1="170" x2="270" y2="170" stroke="#9d174d" stroke-width="5" stroke-linecap="round"/>
  <text x="150" y="190" text-anchor="middle" fill="#9d174d" font-weight="800">BC</text>
  <text x="145" y="14" font-weight="700">A</text><text x="64" y="114" font-weight="700">D</text><text x="228" y="114" font-weight="700">E</text>
  <text x="16" y="186" font-weight="700">B</text><text x="272" y="186" font-weight="700">C</text>
  <text x="170" y="210" text-anchor="middle" font-size="13" fill="#1b2333" font-weight="700">△ADE ∽ △ABC → <tspan fill="#db2777">DE</tspan> : <tspan fill="#9d174d">BC</tspan> = <tspan fill="#2f5bea">AD : AB</tspan></text>
</svg>`,
  centroid: `
<svg viewBox="0 0 300 195" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="14">
  <polygon points="150,20 30,170 270,170" fill="#e6f7fb" stroke="#0891b2" stroke-width="2"/>
  <line x1="150" y1="20" x2="150" y2="170" stroke="#5d6879" stroke-dasharray="4 3"/>
  <line x1="30" y1="170" x2="210" y2="95" stroke="#5d6879" stroke-dasharray="4 3"/>
  <line x1="270" y1="170" x2="90" y2="95" stroke="#5d6879" stroke-dasharray="4 3"/>
  <circle cx="150" cy="120" r="5" fill="#db2777"/>
  <text x="157" y="126" font-weight="700" fill="#db2777">G</text>
  <text x="145" y="14" font-weight="700">A</text><text x="16" y="186" font-weight="700">B</text><text x="272" y="186" font-weight="700">C</text>
  <text x="145" y="188" font-weight="700">D</text>
  <text x="126" y="75" font-size="13" fill="#2f5bea" font-weight="700">2</text>
  <text x="126" y="150" font-size="13" fill="#ea580c" font-weight="700">1</text>
</svg>`,
  pythagoras: `
<svg viewBox="30 0 220 240" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="14">
  <polygon points="40,90 100,90 100,150 40,150" fill="#e8eeff" stroke="#2f5bea" stroke-width="1.5"/>
  <polygon points="100,150 180,150 180,230 100,230" fill="#fdeef5" stroke="#db2777" stroke-width="1.5"/>
  <polygon points="100,90 180,150 240,70 160,10" fill="#fff1e6" stroke="#ea580c" stroke-width="1.5"/>
  <polygon points="100,90 100,150 180,150" fill="#ffffff" stroke="#1b2333" stroke-width="2"/>
  <polyline points="100,140 110,140 110,150" fill="none" stroke="#1b2333"/>
  <text x="62" y="125" font-weight="700" fill="#2f5bea">a²</text>
  <text x="132" y="196" font-weight="700" fill="#db2777">b²</text>
  <text x="162" y="86" font-weight="700" fill="#ea580c">c²</text>
  <text x="104" y="124" font-size="12">a</text><text x="137" y="146" font-size="12">b</text><text x="143" y="114" font-size="12">c</text>
</svg>`,
  rightAltitude: `
<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="14">
  <polygon points="100,37 20,150 260,150" fill="#fff1e6" stroke="#ea580c" stroke-width="2"/>
  <line x1="100" y1="37" x2="100" y2="150" stroke="#2f5bea" stroke-width="2"/>
  <polyline points="100,140 110,140 110,150" fill="none" stroke="#2f5bea"/>
  <polyline points="92,48 103,56 111,45" fill="none" stroke="#1b2333"/>
  <text x="95" y="28" font-weight="700">A</text><text x="6" y="164" font-weight="700">B</text>
  <text x="262" y="164" font-weight="700">C</text><text x="95" y="168" font-weight="700">H</text>
</svg>`,
  sqTri: `
<svg viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="13">
  <rect x="10" y="30" width="50" height="50" fill="#e8eeff" stroke="#2f5bea"/>
  <rect x="80" y="10" width="80" height="80" fill="#e8eeff" stroke="#2f5bea"/>
  <text x="22" y="100">한 변 1</text><text x="98" y="108">한 변 k</text>
  <text x="180" y="40" fill="#1b2333">길이 1 : k</text>
  <text x="180" y="62" fill="#db2777">넓이 1 : k²</text>
  <text x="180" y="84" fill="#ea580c">부피 1 : k³</text>
</svg>`
};

/* ---------- 4단원 그림: 길이 → 넓이 → 부피 비교 ---------- */
(function () {
  const C1 = "#2f5bea", C2 = "#db2777";
  const T = (x, y, t, o = "") => `<text x="${x}" y="${y}" ${o}>${t}</text>`;

  // 등각 투영 쌓기나무 정육면체 (P0: 앞쪽 아래 꼭짓점)
  function isoCube(P0, s, k, col, light, mid, dark) {
    const A = [-0.866, -0.5], B = [0.866, -0.5], U = [0, -1];
    const add = (p, ...vs) => vs.reduce((acc, [v, t]) => [acc[0] + v[0] * t, acc[1] + v[1] * t], p);
    const pts = (a) => a.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
    const L = s * k, Tp = add(P0, [U, L]);
    const left = [P0, add(P0, [A, L]), add(P0, [A, L], [U, L]), Tp];
    const right = [P0, add(P0, [B, L]), add(P0, [B, L], [U, L]), Tp];
    const top = [Tp, add(Tp, [A, L]), add(Tp, [A, L], [B, L]), add(Tp, [B, L])];
    const ln = (p, q) => `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}"/>`;
    let grid = "";
    for (let i = 1; i < k; i++) {
      const t = i * s;
      grid += ln(add(P0, [A, t]), add(P0, [A, t], [U, L])) + ln(add(P0, [U, t]), add(P0, [U, t], [A, L]))
        + ln(add(P0, [B, t]), add(P0, [B, t], [U, L])) + ln(add(P0, [U, t]), add(P0, [U, t], [B, L]))
        + ln(add(Tp, [A, t]), add(Tp, [A, t], [B, L])) + ln(add(Tp, [B, t]), add(Tp, [B, t], [A, L]));
    }
    return `<g stroke="${col}" stroke-width="1.4" stroke-linejoin="round">
      <polygon points="${pts(left)}" fill="${mid}"/><polygon points="${pts(right)}" fill="${dark}"/>
      <polygon points="${pts(top)}" fill="${light}"/><g stroke-opacity=".65">${grid}</g></g>`;
  }

  // 한 변 k칸짜리 모눈 정사각형
  function gridSquare(x, y, u, k, col, fill) {
    let g = `<rect x="${x}" y="${y}" width="${u * k}" height="${u * k}" fill="${fill}" stroke="${col}" stroke-width="2"/>`;
    for (let i = 1; i < k; i++) {
      g += `<line x1="${x + u * i}" y1="${y}" x2="${x + u * i}" y2="${y + u * k}" stroke="${col}" stroke-opacity=".5"/>`
        + `<line x1="${x}" y1="${y + u * i}" x2="${x + u * k}" y2="${y + u * i}" stroke="${col}" stroke-opacity=".5"/>`;
    }
    return g;
  }

  // 눈금 있는 선분 (길이 k칸)
  function seg(x, y, u, k, col) {
    let g = `<line x1="${x}" y1="${y}" x2="${x + u * k}" y2="${y}" stroke="${col}" stroke-width="5" stroke-linecap="round"/>`;
    for (let i = 0; i <= k; i++) g += `<line x1="${x + u * i}" y1="${y - 7}" x2="${x + u * i}" y2="${y + 7}" stroke="${col}" stroke-width="2"/>`;
    return g;
  }

  const u = 26, xs = 150, xl = 300, xr = 490;
  const rowLabel = (y, t, sub) => T(16, y, t, 'font-size="17" font-weight="800" fill="#1b2333"') + T(16, y + 20, sub, 'font-size="12" fill="#5d6879"');
  const ratio = (y, a, b) => T(xr, y, a, 'font-size="17" font-weight="800" fill="#1b2333"') + T(xr, y + 22, b, 'font-size="15" font-weight="700" fill="#ea580c"');
  const arrow = (y) => `<path d="M258 ${y} h24 m-7 -6 l7 6 l-7 6" fill="none" stroke="#94a3b8" stroke-width="2"/>`;
  const sep = (y) => `<line x1="10" y1="${y}" x2="630" y2="${y}" stroke="#e2e8f0"/>`;

  FIG.ratio = `
<svg class="ratio-fig" viewBox="0 0 640 450" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif">
  ${T(xs + u, 22, "작은 도형 (2)", `font-size="13" font-weight="700" fill="${C1}" text-anchor="middle"`)}
  ${T(xl + u * 1.5, 22, "큰 도형 (3)", `font-size="13" font-weight="700" fill="${C2}" text-anchor="middle"`)}

  ${rowLabel(60, "① 길이", "변 · 둘레")}
  ${seg(xs, 62, u, 2, C1)}${arrow(62)}${seg(xl, 62, u, 3, C2)}
  ${T(xs + u, 90, "2칸", 'font-size="13" text-anchor="middle" fill="#5d6879"')}${T(xl + u * 1.5, 90, "3칸", 'font-size="13" text-anchor="middle" fill="#5d6879"')}
  ${ratio(58, "2 : 3", "닮음비 그대로")}
  ${sep(108)}

  ${rowLabel(160, "② 넓이", "가로 × 세로")}
  ${gridSquare(xs, 128 + u, u, 2, C1, "#e8eeff")}${arrow(170)}${gridSquare(xl, 128, u, 3, C2, "#fdeef5")}
  ${T(xs + u, 128 + u * 3 + 18, "2 × 2 = 4칸", 'font-size="13" text-anchor="middle" fill="#5d6879"')}
  ${T(xl + u * 1.5, 128 + u * 3 + 18, "3 × 3 = 9칸", 'font-size="13" text-anchor="middle" fill="#5d6879"')}
  ${ratio(160, "2² : 3² = 4 : 9", "길이를 2번 곱함")}
  ${sep(240)}

  ${rowLabel(330, "③ 부피", "가로 × 세로 × 높이")}
  ${isoCube([xs + u, 410], 22, 2, C1, "#f4f7ff", "#dfe7ff", "#c7d5ff")}${arrow(345)}
  ${isoCube([xl + u * 1.5, 410], 22, 3, C2, "#fff5f9", "#fde7f1", "#f8c9dd")}
  ${T(xs + u, 438, "2 × 2 × 2 = 8개", 'font-size="13" text-anchor="middle" fill="#5d6879"')}
  ${T(xl + u * 1.5, 438, "3 × 3 × 3 = 27개", 'font-size="13" text-anchor="middle" fill="#5d6879"')}
  ${ratio(330, "2³ : 3³ = 8 : 27", "길이를 3번 곱함")}
</svg>`;

  // 중점연결정리: M, N 은 AB, AC 의 중점
  FIG.midline = `
<svg viewBox="0 0 300 195" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="14">
  <polygon points="150,20 30,170 270,170" fill="#e6f7fb" stroke="#0891b2" stroke-width="2"/>
  <path d="M116,52 l8,6 M114,55 l8,6 M56,127 l8,6 M54,130 l8,6" stroke="#ea580c" stroke-width="2"/>
  <path d="M176,58 l8,-6 M236,133 l8,-6" stroke="#ea580c" stroke-width="2"/>
  <line x1="90" y1="95" x2="210" y2="95" stroke="#db2777" stroke-width="4" stroke-linecap="round"/>
  <line x1="30" y1="170" x2="270" y2="170" stroke="#9d174d" stroke-width="4" stroke-linecap="round"/>
  <circle cx="90" cy="95" r="4" fill="#ea580c"/><circle cx="210" cy="95" r="4" fill="#ea580c"/>
  <text x="145" y="14" font-weight="700">A</text><text x="16" y="186" font-weight="700">B</text><text x="272" y="186" font-weight="700">C</text>
  <text x="72" y="99" font-weight="700" fill="#ea580c">M</text><text x="216" y="99" font-weight="700" fill="#ea580c">N</text>
</svg>`;

  // 무게중심 G 와 색칠된 △GBC (label: 넓이 표시 여부)
  FIG.gbc = (label) => `
<svg viewBox="0 0 300 195" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="14">
  <polygon points="150,20 30,170 270,170" fill="#f8fafc" stroke="#0891b2" stroke-width="2"/>
  <polygon points="150,120 30,170 270,170" fill="#fbcfe0" stroke="#db2777" stroke-width="2"/>
  <line x1="150" y1="20" x2="150" y2="170" stroke="#5d6879" stroke-dasharray="4 3"/>
  <line x1="30" y1="170" x2="210" y2="95" stroke="#5d6879" stroke-dasharray="4 3"/>
  <line x1="270" y1="170" x2="90" y2="95" stroke="#5d6879" stroke-dasharray="4 3"/>
  <circle cx="150" cy="120" r="5" fill="#db2777"/><text x="157" y="114" font-weight="700" fill="#db2777">G</text>
  <text x="145" y="14" font-weight="700">A</text><text x="16" y="186" font-weight="700">B</text><text x="272" y="186" font-weight="700">C</text>
  ${label ? `<text x="150" y="160" text-anchor="middle" font-weight="800" font-size="16" fill="#9d174d">1/3</text>` : ""}
</svg>`;

  // 2 : 1 표시가 없는 무게중심 그림 (카드 앞면용 — 답이 보이지 않도록)
  FIG.centroidPlain = FIG.centroid.replace(/<text[^>]*>[12]<\/text>/g, "");

  // 원뿔 그릇에 높이의 절반까지 물 채우기
  FIG.cone = `
<svg viewBox="0 0 280 230" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans KR, sans-serif" font-size="13">
  <path d="M40 30 L140 200 L240 30" fill="#f8fafc" stroke="#1b2333" stroke-width="2"/>
  <ellipse cx="140" cy="30" rx="100" ry="14" fill="#fff" stroke="#1b2333" stroke-width="2"/>
  <path d="M90 115 L140 200 L190 115 Z" fill="#bfe3f5"/>
  <ellipse cx="140" cy="115" rx="50" ry="7" fill="#9fd3ec" stroke="#0891b2" stroke-width="1.5"/>
  <line x1="252" y1="30" x2="252" y2="200" stroke="#5d6879"/><text x="258" y="120" fill="#5d6879">h</text>
  <line x1="205" y1="115" x2="205" y2="200" stroke="#0891b2" stroke-width="2"/><text x="211" y="162" fill="#0891b2" font-weight="700">h/2</text>
  <text x="140" y="168" text-anchor="middle" fill="#0b5f80" font-weight="800">물</text>
  <text x="140" y="222" text-anchor="middle" fill="#1b2333" font-weight="700">닮음비 1 : 2 → 부피 1 : 8</text>
</svg>`;
})();

const UNITS = [
  /* ===================== 1단원 ===================== */
  {
    id: "u1",
    no: 1,
    color: "var(--u1)",
    title: "도형의 닮음과 성질",
    desc: "닮은 도형의 뜻, 대응변의 길이의 비(닮음비), 대응각의 크기",
    concepts: [
      {
        title: "닮음의 뜻과 기호",
        fig: FIG.similar,
        html: `<p>한 도형을 일정한 비율로 <b>확대 또는 축소</b>한 것이 다른 도형과 <b>합동</b>일 때, 두 도형은 서로 <b>닮음</b>인 관계에 있다고 합니다.</p>
               <div class="formula">$\\triangle ABC \\backsim \\triangle DEF$</div>
               <p>기호 $\\backsim$ 로 나타내며, <b>대응하는 꼭짓점의 순서</b>를 맞추어 씁니다. (A↔D, B↔E, C↔F)</p>`
      },
      {
        title: "평면도형에서 닮음의 성질",
        html: `<ul>
                 <li>대응변의 길이의 비는 일정합니다. → 이 비를 <b>닮음비</b>라고 합니다.</li>
                 <li>대응각의 크기는 각각 같습니다.</li>
               </ul>
               <div class="formula">$\\overline{AB}:\\overline{DE} = \\overline{BC}:\\overline{EF} = \\overline{CA}:\\overline{FD}$</div>
               <div class="tip"><b>TIP</b> 닮음비가 $m:n$이면 <b>둘레의 길이의 비</b>도 $m:n$ 입니다.</div>`
      },
      {
        title: "입체도형에서 닮음의 성질",
        html: `<ul>
                 <li>대응하는 모서리의 길이의 비는 일정합니다. (닮음비)</li>
                 <li>대응하는 면은 서로 닮은 도형입니다.</li>
               </ul>
               <p>예) 두 직육면체의 닮음비가 $2:3$이면 가로, 세로, 높이의 비가 모두 $2:3$</p>`
      },
      {
        title: "항상 닮은 도형",
        html: `<p>모양이 하나로 정해지는 도형은 크기와 상관없이 <b>항상 닮음</b>입니다.</p>
               <table class="grid">
                 <tr><th>평면도형</th><td>두 원, 두 정삼각형, 두 정사각형, 두 직각이등변삼각형, 중심각이 같은 두 부채꼴</td></tr>
                 <tr><th>입체도형</th><td>두 구, 두 정육면체, 면의 개수가 같은 두 정다면체</td></tr>
               </table>
               <div class="tip"><b>주의</b> 두 직사각형, 두 마름모, 두 이등변삼각형은 항상 닮은 것은 <b>아닙니다</b>.</div>`
      }
    ],
    questions: [
      {
        id: "u1q1", level: "기초", type: "mc",
        q: "$\\triangle ABC \\backsim \\triangle DEF$일 때, $\\overline{BC}$에 대응하는 변은?",
        choices: ["$\\overline{DE}$", "$\\overline{EF}$", "$\\overline{FD}$", "$\\overline{DF}$와 $\\overline{DE}$ 모두"],
        answer: 1,
        explain: "닮음 기호에서 꼭짓점의 순서대로 대응합니다. B↔E, C↔F 이므로 $\\overline{BC}$의 대응변은 $\\overline{EF}$ 입니다."
      },
      {
        id: "u1q2", level: "기초", type: "mc",
        q: "다음 중 항상 닮은 도형이라고 할 수 <b>없는</b> 것은?",
        choices: ["두 원", "두 정삼각형", "두 직각이등변삼각형", "두 직사각형", "두 정육면체"],
        answer: 3,
        explain: "직사각형은 가로와 세로의 비가 서로 다를 수 있으므로 항상 닮은 것은 아닙니다. (예: $1\\times2$ 직사각형과 $1\\times3$ 직사각형)"
      },
      {
        id: "u1q3", fig: QFIG.u1q3, level: "기본", type: "short",
        q: "$\\triangle ABC \\backsim \\triangle DEF$이고 닮음비가 $2:3$이다. $\\overline{AB}=6\\,\\text{cm}$일 때, $\\overline{DE}$의 길이는?",
        unit: "cm", answer: ["9"],
        explain: "<ol><li>$\\overline{AB}:\\overline{DE}=2:3$</li><li>$6:\\overline{DE}=2:3$ → $2\\overline{DE}=18$</li><li>$\\overline{DE}=9\\,\\text{cm}$</li></ol>"
      },
      {
        id: "u1q4", fig: QFIG.u1q4, level: "기본", type: "short",
        q: "$\\square ABCD \\backsim \\square EFGH$이고 $\\angle B = 70^\\circ$일 때, $\\angle F$의 크기는?",
        unit: "°", answer: ["70"],
        explain: "닮은 도형에서 대응각의 크기는 같습니다. $\\angle B$의 대응각은 $\\angle F$ 이므로 $\\angle F = 70^\\circ$ 입니다."
      },
      {
        id: "u1q5", fig: QFIG.u1q5, level: "응용", type: "short",
        q: "닮음비가 $3:5$인 두 삼각형이 있다. 작은 삼각형의 둘레의 길이가 $12\\,\\text{cm}$일 때, 큰 삼각형의 둘레의 길이는?",
        unit: "cm", answer: ["20"],
        explain: "<ol><li>둘레의 길이의 비 = 닮음비 = $3:5$</li><li>$12:x = 3:5$ → $3x = 60$</li><li>$x = 20\\,\\text{cm}$</li></ol>"
      },
      {
        id: "u1q6", fig: QFIG.u1q6, level: "응용", type: "short",
        q: "닮음비가 $2:5$인 두 직육면체가 있다. 작은 직육면체의 높이가 $4\\,\\text{cm}$일 때, 큰 직육면체의 높이는?",
        unit: "cm", answer: ["10"],
        explain: "대응하는 모서리의 길이의 비가 $2:5$ 이므로 $4:x=2:5$ → $2x=20$ → $x=10\\,\\text{cm}$"
      }
    ]
  },

  /* ===================== 2단원 ===================== */
  {
    id: "u2",
    no: 2,
    color: "var(--u2)",
    title: "삼각형의 닮음 조건",
    desc: "SSS · SAS · AA 닮음 조건으로 두 삼각형의 닮음 판별하기",
    concepts: [
      {
        title: "삼각형의 닮음 조건 3가지",
        wide: true,
        html: `<table class="grid">
                 <tr><th>조건</th><th>내용</th><th>식</th></tr>
                 <tr><td><b>SSS 닮음</b></td><td>세 쌍의 대응변의 길이의 비가 같다.</td><td>$a:a' = b:b' = c:c'$</td></tr>
                 <tr><td><b>SAS 닮음</b></td><td>두 쌍의 대응변의 길이의 비가 같고, 그 <b>끼인각</b>의 크기가 같다.</td><td>$a:a' = c:c'$, $\\angle B = \\angle B'$</td></tr>
                 <tr><td><b>AA 닮음</b></td><td>두 쌍의 대응각의 크기가 각각 같다.</td><td>$\\angle B = \\angle B'$, $\\angle C = \\angle C'$</td></tr>
               </table>
               <div class="tip"><b>TIP</b> 삼각형의 세 각의 합은 $180^\\circ$ 이므로 두 각만 같으면 나머지 한 각도 자동으로 같습니다. → 그래서 AA 닮음!</div>`
      },
      {
        title: "닮음 판별 순서",
        html: `<ol>
                 <li>각이 주어졌다면 → <b>AA</b> 먼저 확인 (나머지 각 계산)</li>
                 <li>세 변이 주어졌다면 → 짧은 변끼리, 긴 변끼리 짝 지어 <b>SSS</b> 비 비교</li>
                 <li>두 변과 한 각 → 각이 두 변의 <b>끼인각</b>인지 확인 후 <b>SAS</b></li>
               </ol>`
      },
      {
        title: "겹쳐진 삼각형 찾기",
        html: `<p>한 삼각형 안에 다른 삼각형이 겹쳐 있을 때는</p>
               <ul>
                 <li><b>공통인 각</b>을 먼저 찾는다.</li>
                 <li>크기가 같은 각이 하나 더 있으면 → AA 닮음</li>
                 <li>공통각을 낀 두 변의 비가 같으면 → SAS 닮음</li>
               </ul>
               <div class="tip"><b>주의</b> 대응하는 꼭짓점 순서를 맞추어 다시 그려 보면 실수가 줄어요.</div>`
      }
    ],
    questions: [
      {
        id: "u2q1", fig: QFIG.u2q1, level: "기초", type: "mc",
        q: "$\\triangle ABC$에서 $\\overline{AB}=4, \\overline{BC}=6, \\overline{CA}=8$이고, $\\triangle DEF$에서 $\\overline{DE}=6, \\overline{EF}=9, \\overline{FD}=12$이다. 두 삼각형의 닮음 조건은?",
        choices: ["SSS 닮음", "SAS 닮음", "AA 닮음", "닮음이 아니다"],
        answer: 0,
        explain: "$4:6 = 6:9 = 8:12 = 2:3$ 으로 세 쌍의 대응변의 길이의 비가 모두 같으므로 <b>SSS 닮음</b>입니다."
      },
      {
        id: "u2q2", fig: QFIG.u2q2, level: "기초", type: "mc",
        q: "$\\triangle ABC$에서 $\\angle A=50^\\circ, \\angle B=60^\\circ$이고, $\\triangle DEF$에서 $\\angle D=50^\\circ, \\angle F=70^\\circ$이다. 두 삼각형의 닮음 조건은?",
        choices: ["SSS 닮음", "SAS 닮음", "AA 닮음", "닮음이 아니다"],
        answer: 2,
        explain: "$\\angle C = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ$ 이므로 $\\angle A=\\angle D$, $\\angle C=\\angle F$ → <b>AA 닮음</b>입니다."
      },
      {
        id: "u2q3", fig: QFIG.u2q3, level: "기본", type: "mc",
        q: "$\\overline{AB}=3, \\overline{AC}=4, \\angle A=40^\\circ$인 $\\triangle ABC$와 $\\overline{DE}=6, \\overline{DF}=8, \\angle D=40^\\circ$인 $\\triangle DEF$의 닮음 조건은?",
        choices: ["SSS 닮음", "SAS 닮음", "AA 닮음", "닮음이 아니다"],
        answer: 1,
        explain: "$\\overline{AB}:\\overline{DE}=3:6=1:2$, $\\overline{AC}:\\overline{DF}=4:8=1:2$ 이고 그 끼인각 $\\angle A=\\angle D=40^\\circ$ → <b>SAS 닮음</b>입니다."
      },
      {
        id: "u2q4", level: "기본", type: "mc",
        q: "다음 중 두 삼각형이 닮음이 되는 조건이 <b>아닌</b> 것은?",
        choices: [
          "세 쌍의 대응변의 길이의 비가 같다.",
          "두 쌍의 대응각의 크기가 각각 같다.",
          "두 쌍의 대응변의 길이의 비가 같고, 그 끼인각의 크기가 같다.",
          "두 쌍의 대응변의 길이의 비가 같고, 끼인각이 아닌 한 각의 크기가 같다."
        ],
        answer: 3,
        explain: "SAS 닮음은 반드시 두 변의 <b>끼인각</b>이 같아야 합니다. 끼인각이 아닌 각이 같은 경우는 닮음이 보장되지 않습니다."
      },
      {
        id: "u2q5", fig: QFIG.u2q5, level: "응용", type: "short",
        q: "$\\triangle ABC$에서 점 $D$는 $\\overline{AB}$ 위의 점, 점 $E$는 $\\overline{AC}$ 위의 점이고 $\\angle AED = \\angle ABC$이다. $\\overline{AD}=4, \\overline{AE}=6, \\overline{AB}=12$일 때, $\\overline{AC}$의 길이는?",
        answer: ["8"],
        explain: "<ol><li>$\\angle A$는 공통, $\\angle AED=\\angle ABC$ → $\\triangle ADE \\backsim \\triangle ACB$ (AA 닮음)</li><li>대응변: $\\overline{AE}:\\overline{AB} = \\overline{AD}:\\overline{AC}$</li><li>$6:12 = 4:\\overline{AC}$ → $\\overline{AC} = 8$</li></ol>"
      },
      {
        id: "u2q6", fig: QFIG.u2q6, level: "응용", type: "short",
        q: "$\\triangle ABC$에서 점 $D$는 $\\overline{BC}$ 위의 점이고 $\\overline{AB}=6, \\overline{BD}=4, \\overline{BC}=9, \\overline{AC}=9$이다. $\\overline{AD}$의 길이는?",
        answer: ["6"],
        explain: "<ol><li>$\\overline{BA}:\\overline{BD}=6:4=3:2$, $\\overline{BC}:\\overline{BA}=9:6=3:2$, $\\angle B$ 공통</li><li>→ $\\triangle ABC \\backsim \\triangle DBA$ (SAS 닮음, 닮음비 $3:2$)</li><li>$\\overline{AC}:\\overline{DA}=3:2$ → $9:\\overline{AD}=3:2$ → $\\overline{AD}=6$</li></ol>"
      }
    ]
  },

  /* ===================== 3단원 ===================== */
  {
    id: "u3",
    no: 3,
    color: "var(--u3)",
    title: "삼각형과 평행선 & 무게중심",
    desc: "평행선과 선분의 길이의 비, 중점연결정리, 무게중심의 2 : 1 성질",
    concepts: [
      {
        title: "삼각형과 평행선",
        fig: FIG.parallel,
        html: `<p>$\\triangle ABC$에서 $\\overline{DE}\\parallel\\overline{BC}$ 이면</p>
               <div class="formula">$\\overline{AD}:\\overline{AB} = \\overline{AE}:\\overline{AC} = \\overline{DE}:\\overline{BC}$</div>
               <div class="formula">$\\overline{AD}:\\overline{DB} = \\overline{AE}:\\overline{EC}$</div>
               <div class="tip"><b>주의</b> $\\overline{DE}:\\overline{BC}$는 $\\overline{AD}:\\overline{DB}$가 아니라 $\\overline{AD}:\\overline{AB}$와 같아요!</div>`
      },
      {
        title: "삼각형의 두 변의 중점을 연결한 선분",
        html: `<p>$\\triangle ABC$에서 $\\overline{AB}, \\overline{AC}$의 중점을 각각 $M, N$이라 하면</p>
               <div class="formula">$\\overline{MN}\\parallel\\overline{BC},\\quad \\overline{MN} = \\dfrac{1}{2}\\overline{BC}$</div>
               <p>반대로 한 변의 중점을 지나고 다른 한 변에 평행한 직선은 나머지 변의 중점을 지납니다.</p>`
      },
      {
        title: "평행선 사이의 선분의 길이의 비",
        html: `<p>세 평행선 $l\\parallel m\\parallel n$ 이 두 직선과 만날 때</p>
               <div class="formula">$a:b = c:d$</div>
               <p>평행선 사이에 생기는 선분의 길이의 비는 항상 같습니다.</p>`
      },
      {
        title: "삼각형의 무게중심",
        fig: FIG.centroid,
        html: `<p>세 <b>중선</b>(꼭짓점과 대변의 중점을 이은 선분)은 한 점 $G$에서 만나고, 이 점을 <b>무게중심</b>이라 합니다.</p>
               <div class="formula">$\\overline{AG}:\\overline{GD} = 2:1$</div>
               <ul>
                 <li>$\\overline{AG} = \\dfrac{2}{3}\\overline{AD}$, $\\overline{GD} = \\dfrac{1}{3}\\overline{AD}$</li>
                 <li>세 중선이 만드는 6개의 삼각형 넓이는 모두 같다 → 각각 $\\dfrac{1}{6}\\triangle ABC$</li>
                 <li>$\\triangle GAB = \\triangle GBC = \\triangle GCA = \\dfrac{1}{3}\\triangle ABC$</li>
               </ul>`
      }
    ],
    questions: [
      {
        id: "u3q1", level: "기초", type: "short",
        q: "$\\triangle ABC$에서 $\\overline{DE}\\parallel\\overline{BC}$이고 $\\overline{AD}=4, \\overline{DB}=2, \\overline{AE}=6$일 때, $\\overline{EC}$의 길이는?",
        fig: FIG.parallel,
        answer: ["3"],
        explain: "$\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$ → $4:2=6:\\overline{EC}$ → $4\\overline{EC}=12$ → $\\overline{EC}=3$"
      },
      {
        id: "u3q2", level: "기본", type: "short",
        q: "$\\triangle ABC$에서 $\\overline{DE}\\parallel\\overline{BC}$이고 $\\overline{AD}=3, \\overline{AB}=9, \\overline{BC}=12$일 때, $\\overline{DE}$의 길이는?",
        fig: FIG.parallel,
        answer: ["4"],
        explain: "$\\overline{AD}:\\overline{AB}=\\overline{DE}:\\overline{BC}$ → $3:9=\\overline{DE}:12$ → $9\\overline{DE}=36$ → $\\overline{DE}=4$"
      },
      {
        id: "u3q3", fig: QFIG.u3q3, level: "기초", type: "short",
        q: "$\\triangle ABC$에서 $\\overline{AB}, \\overline{AC}$의 중점을 각각 $M, N$이라 하자. $\\overline{BC}=14\\,\\text{cm}$일 때, $\\overline{MN}$의 길이는?",
        unit: "cm", answer: ["7"],
        explain: "중점연결정리에 의해 $\\overline{MN}=\\dfrac{1}{2}\\overline{BC}=\\dfrac{1}{2}\\times14=7\\,\\text{cm}$"
      },
      {
        id: "u3q4", fig: QFIG.u3q4, level: "기본", type: "short",
        q: "세 평행선 $l\\parallel m\\parallel n$이 두 직선과 만나서 생기는 선분의 길이가 각각 $4, 6$ 과 $6, x$일 때, $x$의 값은? (같은 순서로 대응)",
        answer: ["9"],
        explain: "$4:6 = 6:x$ → $4x=36$ → $x=9$"
      },
      {
        id: "u3q5", level: "기초", type: "short",
        q: "점 $G$가 $\\triangle ABC$의 무게중심이고 중선 $\\overline{AD}=12\\,\\text{cm}$일 때, $\\overline{AG}$의 길이는?",
        fig: FIG.centroid,
        unit: "cm", answer: ["8"],
        explain: "$\\overline{AG}:\\overline{GD}=2:1$ 이므로 $\\overline{AG}=\\dfrac{2}{3}\\times12=8\\,\\text{cm}$"
      },
      {
        id: "u3q6", fig: FIG.centroidPlain, level: "기본", type: "mc",
        q: "점 $G$가 $\\triangle ABC$의 무게중심이고 $\\overline{GD}=3$일 때 ($D$는 $\\overline{BC}$의 중점), 중선 $\\overline{AD}$의 길이는?",
        choices: ["$6$", "$9$", "$12$", "$4.5$"],
        answer: 1,
        explain: "$\\overline{AG}:\\overline{GD}=2:1$ 이므로 $\\overline{AG}=6$, $\\overline{AD}=6+3=9$"
      },
      {
        id: "u3q7", fig: FIG.gbc(false), level: "응용", type: "mc",
        q: "점 $G$가 넓이가 $36\\,\\text{cm}^2$인 $\\triangle ABC$의 무게중심일 때, $\\triangle GBC$의 넓이는?",
        choices: ["$6\\,\\text{cm}^2$", "$9\\,\\text{cm}^2$", "$12\\,\\text{cm}^2$", "$18\\,\\text{cm}^2$"],
        answer: 2,
        explain: "무게중심과 세 꼭짓점을 이어 만든 세 삼각형의 넓이는 같으므로 $\\triangle GBC=\\dfrac{1}{3}\\times36=12\\,\\text{cm}^2$"
      }
    ]
  },

  /* ===================== 4단원 ===================== */
  {
    id: "u4",
    no: 4,
    color: "var(--u4)",
    title: "닮은 도형의 넓이와 부피의 비",
    desc: "닮음비 a : b → 넓이의 비 a² : b² → 부피의 비 a³ : b³",
    concepts: [
      {
        title: "닮음비 → 넓이의 비 → 부피의 비",
        wide: true,
        html: `<div class="formula">$a:b \\;\\longrightarrow\\; a^2:b^2 \\;\\longrightarrow\\; a^3:b^3$</div>
               <p>닮음비가 $2:3$인 두 도형을 모눈과 쌓기나무로 직접 비교해 보세요. <b>칸 수와 쌓기나무 개수</b>를 세어 보면 이유가 보여요!</p>
               ${FIG.ratio}
               <table class="grid">
                 <tr><th>구분</th><th>비</th><th>예) 닮음비 $2:3$</th></tr>
                 <tr><td>길이 · 둘레</td><td>$a:b$</td><td>$2:3$</td></tr>
                 <tr><td>넓이 · 겉넓이</td><td>$a^2:b^2$</td><td>$4:9$</td></tr>
                 <tr><td>부피</td><td>$a^3:b^3$</td><td>$8:27$</td></tr>
               </table>`
      },
      {
        title: "거꾸로 닮음비 구하기",
        html: `<ul>
                 <li>넓이의 비가 $m^2:n^2$ → 닮음비 $m:n$</li>
                 <li>부피의 비가 $m^3:n^3$ → 닮음비 $m:n$</li>
               </ul>
               <p>예) 부피의 비 $8:27 = 2^3:3^3$ → 닮음비 $2:3$ → 겉넓이의 비 $4:9$</p>
               <div class="tip"><b>TIP</b> 넓이 ↔ 부피를 바로 바꾸지 말고 꼭 <b>닮음비를 거쳐서</b> 계산하세요!</div>`
      },
      {
        title: "생활 속 활용",
        fig: FIG.cone,
        html: `<ul>
                 <li><b>원뿔 그릇에 물 채우기</b>: 높이의 $\\dfrac{1}{2}$까지 물을 채우면 물의 부피는 전체의 $\\left(\\dfrac{1}{2}\\right)^3=\\dfrac{1}{8}$</li>
                 <li><b>축도와 실제 넓이</b>: 축척 $1:1000$ 지도에서 넓이의 비는 $1:1000000$</li>
               </ul>`
      }
    ],
    questions: [
      {
        id: "u4q1", fig: QFIG.u4q1, level: "기초", type: "short",
        q: "닮음비가 $2:3$인 두 삼각형에서 작은 삼각형의 넓이가 $8\\,\\text{cm}^2$일 때, 큰 삼각형의 넓이는?",
        unit: "cm²", answer: ["18"],
        explain: "넓이의 비 $=2^2:3^2=4:9$ → $8:x=4:9$ → $4x=72$ → $x=18\\,\\text{cm}^2$"
      },
      {
        id: "u4q2", fig: QFIG.u4q2, level: "기초", type: "mc",
        q: "반지름의 길이의 비가 $1:3$인 두 구의 겉넓이의 비는?",
        choices: ["$1:3$", "$1:6$", "$1:9$", "$1:27$"],
        answer: 2,
        explain: "두 구는 항상 닮음이고 닮음비 $1:3$ → 겉넓이의 비 $1^2:3^2=1:9$"
      },
      {
        id: "u4q3", fig: QFIG.u4q3, level: "기본", type: "short",
        q: "닮음비가 $2:3$인 두 정육면체에서 작은 정육면체의 부피가 $16\\,\\text{cm}^3$일 때, 큰 정육면체의 부피는?",
        unit: "cm³", answer: ["54"],
        explain: "부피의 비 $=2^3:3^3=8:27$ → $16:x=8:27$ → $8x=432$ → $x=54\\,\\text{cm}^3$"
      },
      {
        id: "u4q4", fig: QFIG.u4q4, level: "기본", type: "short",
        q: "두 닮은 도형의 넓이의 비가 $9:25$일 때, 닮음비는? (예: 2:3 형태로 입력)",
        answer: ["3:5"],
        explain: "$9:25 = 3^2:5^2$ 이므로 닮음비는 $3:5$"
      },
      {
        id: "u4q5", fig: FIG.cone.replace(/<text[^>]*>닮음비 1 : 2 → 부피 1 : 8<\/text>/, ""), level: "응용", type: "mc",
        q: "원뿔 모양의 그릇에 그릇 높이의 $\\dfrac{1}{2}$까지 물을 채웠다. 물의 부피는 그릇 전체 부피의 몇 배인가?",
        choices: ["$\\dfrac{1}{2}$배", "$\\dfrac{1}{4}$배", "$\\dfrac{1}{6}$배", "$\\dfrac{1}{8}$배"],
        answer: 3,
        explain: "물이 채워진 부분도 원뿔이고 그릇과 닮음비 $1:2$ → 부피의 비 $1^3:2^3=1:8$ → $\\dfrac{1}{8}$배"
      },
      {
        id: "u4q6", fig: QFIG.u4q6, level: "응용", type: "short",
        q: "부피의 비가 $8:27$인 두 닮은 입체도형에서 작은 도형의 겉넓이가 $20\\,\\text{cm}^2$일 때, 큰 도형의 겉넓이는?",
        unit: "cm²", answer: ["45"],
        explain: "<ol><li>$8:27=2^3:3^3$ → 닮음비 $2:3$</li><li>겉넓이의 비 $2^2:3^2=4:9$</li><li>$20:x=4:9$ → $x=45\\,\\text{cm}^2$</li></ol>"
      }
    ]
  },

  /* ===================== 5단원 ===================== */
  {
    id: "u5",
    no: 5,
    color: "var(--u5)",
    title: "피타고라스 정리",
    desc: "정리의 뜻, 직각삼각형이 되는 조건, 빗변 길이 구하기, 직각삼각형의 닮음 공식",
    concepts: [
      {
        title: "피타고라스 정리",
        fig: FIG.pythagoras,
        html: `<p>직각삼각형에서 직각을 낀 두 변의 길이를 $a, b$, 빗변의 길이를 $c$라 하면</p>
               <div class="formula" style="font-size:26px">$a^2 + b^2 = c^2$</div>
               <p>빗변 위의 정사각형 넓이 = 나머지 두 변 위의 정사각형 넓이의 합</p>
               <ul>
                 <li>빗변 구하기: $c = \\sqrt{a^2+b^2}$ 대신 <b>$c^2$ 값을 먼저</b> 구하고 제곱해서 그 값이 되는 수를 찾기</li>
                 <li>빗변 $c$는 항상 <b>가장 긴 변</b>, 직각의 맞은편 변</li>
               </ul>`
      },
      {
        title: "직각삼각형이 되기 위한 조건",
        html: `<p>세 변의 길이가 $a, b, c$ ($c$가 가장 긴 변)인 삼각형에서</p>
               <div class="formula">$a^2 + b^2 = c^2$ 이면 → 빗변이 $c$인 직각삼각형</div>
               <div class="tip"><b>TIP</b> 반드시 <b>가장 긴 변</b>의 제곱과 나머지 두 변의 제곱의 합을 비교하세요.</div>`
      },
      {
        title: "직각삼각형의 닮음 공식 (사영 정리)",
        wide: true,
        fig: FIG.rightAltitude,
        html: `<p>$\\angle A=90^\\circ$인 $\\triangle ABC$에서 꼭짓점 $A$에서 빗변에 내린 수선의 발을 $H$라 하면
               $\\triangle ABC \\backsim \\triangle HBA \\backsim \\triangle HAC$ (AA 닮음)</p>
               <table class="grid">
                 <tr><th>공식</th><th>기억법</th></tr>
                 <tr><td>$\\overline{AB}^2 = \\overline{BH}\\times\\overline{BC}$</td><td>왼쪽 변² = 왼쪽 조각 × 전체</td></tr>
                 <tr><td>$\\overline{AC}^2 = \\overline{CH}\\times\\overline{CB}$</td><td>오른쪽 변² = 오른쪽 조각 × 전체</td></tr>
                 <tr><td>$\\overline{AH}^2 = \\overline{BH}\\times\\overline{CH}$</td><td>높이² = 두 조각의 곱</td></tr>
                 <tr><td>$\\overline{AB}\\times\\overline{AC} = \\overline{BC}\\times\\overline{AH}$</td><td>넓이 두 번 구하기 (밑변×높이)</td></tr>
               </table>`
      },
      {
        title: "자주 쓰이는 피타고라스 수",
        wide: true,
        html: `<p>$a^2+b^2=c^2$ 을 만족하는 자연수의 쌍입니다. 외워 두면 계산이 빨라져요!</p>
               <div class="triples">
                 <div class="triple"><div class="t">3 · 4 · 5</div><div class="s">9+16=25</div></div>
                 <div class="triple"><div class="t">5 · 12 · 13</div><div class="s">25+144=169</div></div>
                 <div class="triple"><div class="t">8 · 15 · 17</div><div class="s">64+225=289</div></div>
                 <div class="triple"><div class="t">7 · 24 · 25</div><div class="s">49+576=625</div></div>
                 <div class="triple"><div class="t">6 · 8 · 10</div><div class="s">3·4·5 의 2배</div></div>
                 <div class="triple"><div class="t">9 · 12 · 15</div><div class="s">3·4·5 의 3배</div></div>
               </div>
               <div class="tip"><b>TIP</b> 피타고라스 수에 같은 수를 곱해도 피타고라스 수! (3·4·5 → 6·8·10 → 9·12·15 …)</div>`,
        // 빈칸 채우기 미니 퀴즈 (정답 시 도토리 +1)
        miniQuiz: {
          title: "✏️ 빈칸 채우기 퀴즈 — □에 들어갈 수는?",
          items: [
            { id: "u5m1", nums: [5, 12, null], answer: 13, hint: "25 + 144 = 169 = 13²" },
            { id: "u5m2", nums: [8, null, 17], answer: 15, hint: "289 − 64 = 225 = 15²" },
            { id: "u5m3", nums: [null, 24, 25], answer: 7, hint: "625 − 576 = 49 = 7²" },
            { id: "u5m4", nums: [6, 8, null], answer: 10, hint: "3·4·5 의 2배" },
            { id: "u5m5", nums: [12, 16, null], answer: 20, hint: "3·4·5 의 4배" }
          ]
        }
      }
    ],
    questions: [
      {
        id: "u5q1", fig: QFIG.u5q1, level: "기초", type: "short",
        q: "직각을 낀 두 변의 길이가 $6\\,\\text{cm}, 8\\,\\text{cm}$인 직각삼각형의 빗변의 길이는?",
        unit: "cm", answer: ["10"],
        explain: "$c^2 = 6^2+8^2 = 36+64 = 100$ → $c=10\\,\\text{cm}$ (3·4·5의 2배)"
      },
      {
        id: "u5q2", fig: QFIG.u5q2, level: "기초", type: "short",
        q: "빗변의 길이가 $13\\,\\text{cm}$이고 다른 한 변의 길이가 $5\\,\\text{cm}$인 직각삼각형에서 나머지 한 변의 길이는?",
        unit: "cm", answer: ["12"],
        explain: "$b^2 = 13^2-5^2 = 169-25 = 144$ → $b=12\\,\\text{cm}$"
      },
      {
        id: "u5q3", level: "기본", type: "mc",
        q: "세 변의 길이가 다음과 같은 삼각형 중 직각삼각형인 것은?",
        choices: ["$2, 3, 4$", "$4, 5, 6$", "$5, 12, 13$", "$6, 7, 9$"],
        answer: 2,
        explain: "가장 긴 변으로 확인: $5^2+12^2=25+144=169=13^2$ ✔︎<br/>나머지: $4+9\\ne16$, $16+25\\ne36$, $36+49\\ne81$"
      },
      {
        id: "u5q4", fig: QFIG.u5q4, level: "기본", type: "short",
        q: "가로가 $9\\,\\text{cm}$, 세로가 $12\\,\\text{cm}$인 직사각형의 대각선의 길이는?",
        unit: "cm", answer: ["15"],
        explain: "대각선² $=9^2+12^2=81+144=225$ → 대각선 $=15\\,\\text{cm}$ (3·4·5의 3배)"
      },
      {
        id: "u5q5", fig: QFIG.u5q5, level: "기본", type: "mc",
        q: "세 변의 길이가 $7, x, 25$인 삼각형이 빗변의 길이가 $25$인 직각삼각형일 때, $x$의 값은?",
        choices: ["$18$", "$20$", "$24$", "$26$"],
        answer: 2,
        explain: "$x^2 = 25^2-7^2 = 625-49 = 576$ → $x=24$"
      },
      {
        id: "u5q6", level: "응용", type: "short",
        q: "$\\angle A=90^\\circ$인 $\\triangle ABC$에서 $\\overline{AH}\\perp\\overline{BC}$이고 $\\overline{BH}=4, \\overline{CH}=9$일 때, $\\overline{AH}$의 길이는?",
        fig: FIG.rightAltitude,
        answer: ["6"],
        explain: "$\\overline{AH}^2 = \\overline{BH}\\times\\overline{CH} = 4\\times9 = 36$ → $\\overline{AH}=6$"
      },
      {
        id: "u5q7", level: "응용", type: "short",
        q: "$\\angle A=90^\\circ$인 $\\triangle ABC$에서 $\\overline{AH}\\perp\\overline{BC}$이고 $\\overline{AB}=6, \\overline{BC}=10$일 때, $\\overline{BH}$의 길이는? (소수 또는 분수로 입력)",
        fig: FIG.rightAltitude,
        answer: ["3.6", "18/5"],
        explain: "$\\overline{AB}^2 = \\overline{BH}\\times\\overline{BC}$ → $36 = \\overline{BH}\\times10$ → $\\overline{BH}=\\dfrac{18}{5}=3.6$"
      },
      {
        id: "u5q8", level: "응용", type: "short",
        q: "$\\angle A=90^\\circ$인 $\\triangle ABC$에서 $\\overline{AH}\\perp\\overline{BC}$이고 $\\overline{AB}=6, \\overline{AC}=8$일 때, $\\overline{AH}$의 길이는? (소수 또는 분수로 입력)",
        fig: FIG.rightAltitude,
        answer: ["4.8", "24/5"],
        explain: "<ol><li>$\\overline{BC}^2=6^2+8^2=100$ → $\\overline{BC}=10$</li><li>$\\overline{AB}\\times\\overline{AC}=\\overline{BC}\\times\\overline{AH}$ → $48=10\\times\\overline{AH}$</li><li>$\\overline{AH}=4.8$</li></ol>"
      }
    ]
  }
];

/* =========================================================
 *  개념 확인 문제 (O/X) — 개념 설명 탭 하단에 표시, 점수에는 미포함 · 정답 시 도토리 지급
 * ========================================================= */
const OX = ["O (맞다)", "X (틀리다)"];
const CONCEPT_CHECKS = {
  u1: [
    { id: "u1c1", q: "두 정사각형은 크기와 상관없이 항상 닮은 도형이다.", answer: 0,
      explain: "정사각형은 모든 변의 길이가 같고 모든 각이 $90^\\circ$이므로 모양이 하나로 정해져 항상 닮음입니다." },
    { id: "u1c2", q: "닮은 두 도형에서 대응각의 크기는 닮음비에 따라 커지거나 작아진다.", answer: 1,
      explain: "닮은 도형에서 <b>대응각의 크기는 항상 같습니다.</b> 닮음비에 따라 변하는 것은 변의 길이입니다." }
  ],
  u2: [
    { id: "u2c1", q: "두 쌍의 대응각의 크기가 각각 같으면 두 삼각형은 닮음이다. (AA 닮음)", answer: 0,
      explain: "세 각의 합이 $180^\\circ$이므로 두 각이 같으면 나머지 한 각도 같아 AA 닮음이 성립합니다." },
    { id: "u2c2", q: "SAS 닮음에서 크기가 같은 한 각은 두 변의 끼인각이 아니어도 된다.", answer: 1,
      explain: "SAS 닮음은 반드시 비가 같은 두 변의 <b>끼인각</b>이 같아야 합니다." }
  ],
  u3: [
    { id: "u3c1", q: "삼각형의 무게중심은 각 중선을 꼭짓점으로부터 $2:1$로 나눈다.", answer: 0, fig: FIG.centroid,
      explain: "$\\overline{AG}:\\overline{GD}=2:1$ 이 무게중심의 핵심 성질입니다." },
    { id: "u3c2", q: "$\\triangle ABC$에서 $\\overline{DE}\\parallel\\overline{BC}$이면 $\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{DB}$이다.", answer: 1,
      fig: FIG.parallel, explainFig: FIG.parallelWhy,
      explain: "$\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{AB}$ 입니다. $\\overline{AD}:\\overline{DB}$와 헷갈리지 않도록 주의하세요." }
  ],
  u4: [
    { id: "u4c1", q: "닮음비가 $m:n$인 두 평면도형의 넓이의 비는 $m^2:n^2$이다.", answer: 0,
      explain: "넓이는 길이를 두 번 곱한 양이므로 넓이의 비는 $m^2:n^2$ 입니다." },
    { id: "u4c2", q: "닮음비가 $1:2$인 두 입체도형의 부피의 비는 $1:4$이다.", answer: 1,
      explain: "부피의 비는 $1^3:2^3=1:8$ 입니다. $1:4$는 겉넓이의 비예요." }
  ],
  u5: [
    { id: "u5c1", q: "세 변의 길이가 $3, 4, 5$인 삼각형은 직각삼각형이다.", answer: 0,
      explain: "$3^2+4^2=9+16=25=5^2$ 이므로 빗변이 $5$인 직각삼각형입니다." },
    { id: "u5c2", q: "직각삼각형에서 빗변은 가장 짧은 변이다.", answer: 1,
      explain: "빗변은 직각의 맞은편 변으로 <b>가장 긴 변</b>입니다." }
  ]
};
const EXTRA_OX = {
  u1: [
    { id: "u1c3", q: "닮음비가 $2:3$인 두 삼각형의 둘레의 길이의 비도 $2:3$이다.", answer: 0,
      explain: "둘레는 변의 길이의 합이므로 닮음비와 같은 $2:3$ 입니다." },
    { id: "u1c4", q: "두 이등변삼각형은 항상 닮은 도형이다.", answer: 1,
      explain: "꼭지각의 크기가 다르면 모양이 달라지므로 항상 닮은 것은 아닙니다." }
  ],
  u2: [
    { id: "u2c3", q: "세 쌍의 대응변의 길이의 비가 같으면 두 삼각형은 닮음이다.", answer: 0,
      explain: "SSS 닮음 조건입니다." },
    { id: "u2c4", q: "한 쌍의 대응각의 크기만 같아도 두 삼각형은 닮음이다.", answer: 1,
      explain: "각만으로 판별하려면 <b>두 쌍</b>의 대응각이 같아야 합니다. (AA 닮음)" }
  ],
  u3: [
    { id: "u3c3", q: "삼각형의 두 변의 중점을 연결한 선분의 길이는 나머지 한 변의 길이의 $\\dfrac{1}{2}$이다.", answer: 0,
      explain: "중점연결정리: $\\overline{MN}=\\dfrac{1}{2}\\overline{BC}$, $\\overline{MN}\\parallel\\overline{BC}$" },
    { id: "u3c4", q: "무게중심 $G$와 세 꼭짓점을 이어 만든 세 삼각형의 넓이는 서로 다르다.", answer: 1, fig: FIG.centroid,
      explain: "$\\triangle GAB=\\triangle GBC=\\triangle GCA=\\dfrac{1}{3}\\triangle ABC$ 로 모두 같습니다." }
  ],
  u4: [
    { id: "u4c3", q: "두 구는 항상 닮은 도형이다.", answer: 0,
      explain: "구는 반지름만 정해지면 모양이 하나로 정해지므로 항상 닮음입니다." },
    { id: "u4c4", q: "넓이의 비가 $4:9$인 두 닮은 입체도형의 부피의 비는 $16:81$이다.", answer: 1,
      explain: "$4:9=2^2:3^2$ → 닮음비 $2:3$ → 부피의 비 $2^3:3^3=8:27$" }
  ],
  u5: [
    { id: "u5c3", q: "직각삼각형에서 빗변의 길이의 제곱은 나머지 두 변의 길이의 제곱의 합과 같다.", answer: 0,
      explain: "피타고라스 정리 $a^2+b^2=c^2$ 그 자체입니다." },
    { id: "u5c4", q: "세 변의 길이가 $6, 8, 10$인 삼각형은 직각삼각형이 아니다.", answer: 1,
      explain: "$6^2+8^2=36+64=100=10^2$ 이므로 직각삼각형입니다. ($3\\cdot4\\cdot5$의 2배)" }
  ]
};

/* 카드 뒤집기(플래시카드): front = 질문, back = 답 */
const FLIPCARDS = {
  u1: [
    { front: "닮음이란?", back: "한 도형을 일정한 비율로 <b>확대·축소</b>한 것이 다른 도형과 <b>합동</b>인 관계" },
    { front: "두 삼각형의 닮음을<br/>기호로 나타내면?", back: "$\\triangle ABC \\backsim \\triangle DEF$<br/><small>대응하는 꼭짓점 순서대로!</small>",
      fig: FIG.similar.replace(/<text[^>]*>△ABC ∽ △DEF<\/text>/, ""), backFig: FIG.similar },
    { front: "닮음비", back: "대응변의 길이의 비<br/>$\\overline{AB}:\\overline{DE}$" },
    { front: "닮은 도형의<br/>대응각의 크기는?", back: "항상 <b>같다!</b>" }
  ],
  u2: [
    { front: "SSS 닮음", back: "세 쌍의 대응변의<br/>길이의 비가 같다<br/>$a:a'=b:b'=c:c'$" },
    { front: "SAS 닮음", back: "두 쌍의 대응변의 비가 같고<br/><b>끼인각</b>의 크기가 같다" },
    { front: "AA 닮음", back: "두 쌍의 대응각의<br/>크기가 각각 같다" },
    { front: "겹친 삼각형<br/>판별 첫 단계는?", back: "<b>공통인 각</b> 찾기!" }
  ],
  u3: [
    { front: "$\\overline{DE}\\parallel\\overline{BC}$ 일 때<br/>$\\overline{AD}:\\overline{AB}=\\;?$", back: "$\\overline{AE}:\\overline{AC}=\\overline{DE}:\\overline{BC}$",
      fig: FIG.parallel, backFig: FIG.parallelWhy },
    { front: "중점연결정리<br/><small>$M, N$은 각 변의 중점</small>", back: "$\\overline{MN}\\parallel\\overline{BC}$, $\\overline{MN}=\\dfrac{1}{2}\\overline{BC}$",
      fig: FIG.midline, backFig: FIG.midline },
    { front: "무게중심 $G$가<br/>중선 $\\overline{AD}$를 나누는 비", back: "$\\overline{AG}:\\overline{GD}=2:1$",
      fig: FIG.centroidPlain, backFig: FIG.centroid },
    { front: "색칠한 $\\triangle GBC$의 넓이는<br/>$\\triangle ABC$의 몇 배?", back: "$\\dfrac{1}{3}$ 배",
      fig: FIG.gbc(false), backFig: FIG.gbc(true) }
  ],
  u4: [
    { front: "닮음비 $a:b$ 이면<br/>넓이의 비는?", back: "$a^2:b^2$" },
    { front: "닮음비 $a:b$ 이면<br/>부피의 비는?", back: "$a^3:b^3$" },
    { front: "부피의 비 $8:27$ 의<br/>닮음비는?", back: "$2:3$<br/><small>($2^3:3^3$)</small>" },
    { front: "원뿔 그릇 높이의 $\\dfrac{1}{2}$까지<br/>물을 부으면 물의 부피는?", back: "전체의 $\\dfrac{1}{8}$",
      fig: FIG.cone.replace(/<text[^>]*>닮음비 1 : 2 → 부피 1 : 8<\/text>/, ""), backFig: FIG.cone }
  ],
  u5: [
    { front: "피타고라스 정리<br/><small>세 정사각형의 넓이 사이의 관계는?</small>", back: "$a^2+b^2=c^2$<br/><small>($c$: 빗변)</small>",
      fig: FIG.pythagoras, backFig: FIG.pythagoras },
    { front: "빗변은 어떤 변?", back: "직각의 맞은편 변<br/><b>가장 긴 변</b>" },
    { front: "$\\angle A=90^\\circ$, $\\overline{AH}\\perp\\overline{BC}$<br/>$\\overline{AH}^2=\\;?$", back: "$\\overline{BH}\\times\\overline{CH}$",
      fig: FIG.rightAltitude, backFig: FIG.rightAltitude },
    { front: "대표 피타고라스 수", back: "3·4·5<br/>5·12·13<br/>8·15·17" }
  ]
};

UNITS.forEach((u) => {
  u.checks = [...CONCEPT_CHECKS[u.id], ...EXTRA_OX[u.id]]
    .map((c) => ({ ...c, type: "mc", level: "개념", kind: "check", choices: OX }));
  u.flipcards = FLIPCARDS[u.id].map((c, i) => ({ ...c, id: `${u.id}f${i}` }));
});
