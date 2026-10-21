import katex from 'katex';

export const FORMULA_SOURCES = {
  catalan: String.raw`\boxed{C_n=\frac{1}{n+1}\binom{2n}{n}=\frac{(2n)!}{n!(n+1)!}}`,
  fourth: String.raw`C_4=\frac{8!}{4!\times5!}=14`,
  inline: String.raw`C_n=\frac{1}{n+1}\binom{2n}{n}`,
  multiline: String.raw`\begin{aligned}
a&=\frac{1}{2}\\
b&=\binom{2n}{n}
\end{aligned}`,
  adjacent: String.raw`\left(x+\frac{1}{y}\right)^2`,
};

const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const render = (source,displayMode=false) => katex.renderToString(source,{displayMode,output:'htmlAndMathml',throwOnError:true});
const withoutSource = html => html.replace(/<annotation\b[^>]*>[\s\S]*?<\/annotation>/g,'');
const formula = (id,source,displayMode=false,attributes='') => `<span id="${id}" data-d-component="math" ${displayMode?'data-d-block="true"':''} ${attributes}>${render(source,displayMode)}</span>`;
const sourcedWrapper = (id,attribute,source,delimiter,displayMode) => {
  const wrapped=delimiter[0]+source+delimiter[1];
  return `<span id="${id}" data-d-component="math" ${displayMode?'data-d-block="true"':''} ${attribute}="${escape(wrapped)}">${withoutSource(render(source,displayMode))}</span>`;
};

export function createFormulaFixture() {
  return `<div data-turn-key="formula-fixture"><div data-content-search-unit-key="formula-fixture:2:assistant"><div data-chatgpt-selection-message-id="formula-answer"><div data-markdown-text-style="assistant-message"><div data-theme="dark"><div data-dil-message-id="formula-dil">
    <h2>合成公式复制样例</h2>
    <p>卡特兰数闭式：</p>${formula('formula-catalan',FORMULA_SOURCES.catalan,true)}
    <p>第四项：</p>${formula('formula-fourth',FORMULA_SOURCES.fourth,true)}
    <p class="content-block" style="font-size:42px">行内：${formula('formula-inline',FORMULA_SOURCES.inline,false)}</p>
    <p>两个相邻公式，不得互相拼接：</p>
    ${formula('formula-priority',FORMULA_SOURCES.inline,false,'aria-label="spoken description; never copy this"')}
    ${formula('formula-adjacent',FORMULA_SOURCES.adjacent,false)}
    <p>在完整源码包装元素中存储分隔符及换行：</p>
    ${sourcedWrapper('formula-data-latex','data-latex',FORMULA_SOURCES.multiline,['\\[','\\]'],true)}
    ${sourcedWrapper('formula-data-math','data-math',FORMULA_SOURCES.adjacent,['\\(','\\)'],false)}
    ${sourcedWrapper('formula-data-formula','data-formula',FORMULA_SOURCES.fourth,['$$','$$'],true)}
    <p>只有视觉内容和朗读标签，缺少可信源码：</p>
    <span id="formula-source-missing" data-d-component="math" aria-label="C four equals fourteen">${withoutSource(render(FORMULA_SOURCES.fourth,false))}</span>
    <p>代码与普通类名不得触发复制：</p>
    <pre id="formula-code"><code>${render(FORMULA_SOURCES.inline,false)}</code></pre>
    <p id="formula-ordinary" class="math-related-content mathematical-note">This is ordinary math-related prose, not a formula.</p>
  </div></div></div></div></div></div>`;
}

export function assertFormulaRenders(source,displayMode) {
  return render(source,displayMode);
}
