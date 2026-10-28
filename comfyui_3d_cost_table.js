
'use strict';
(async function () {
  try {
    const response = await fetch('3d-models.json');
    if (!response.ok) throw new Error('価格データを取得できません');
    const data = await response.json();
    const body = document.querySelector('tbody');
    const rows = Array.from(body.rows);
    if (rows.length !== data.models.length) throw new Error('価格データの件数が一致しません');
    const controls = Object.fromEntries(['search','input','basis','sort','attempts'].map(id => [id, document.getElementById(id)]));
    const fmt = value => '$' + value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
    function price(model) { return controls.basis.value === 'base' ? model.base_usd : model.display_price_usd; }
    function render() {
      const query = controls.search.value.trim().toLowerCase();
      const mode = controls.input.value;
      const times = Number(controls.attempts.value);
      const entries = data.models.map((model, index) => ({model, row:rows[index]}));
      entries.sort((a,b) => {
        if (controls.sort.value === 'name') return a.model.name.localeCompare(b.model.name);
        const x=price(a.model), y=price(b.model);
        if (x == null) return y == null ? 0 : 1;
        if (y == null) return -1;
        return controls.sort.value === 'desc' ? y-x : x-y;
      });
      let count=0;
      for (const {model,row} of entries) {
        const inputMatch = mode === 'all' || model.input_type === mode || (model.input_type === 'single_multi' && ['single','multi'].includes(mode));
        const matches = inputMatch && (model.name+' '+model.endpoint).toLowerCase().includes(query);
        row.hidden = !matches;
        if (matches) count++;
        const isSam=model.endpoint === 'fal-ai/sam-3/3d-objects';
        const amount=price(model);
        row.querySelector('.estimate').textContent = amount == null ? '対象数で変動' : fmt(amount*times)+(isSam ? ' / 同一unit数×'+times : '');
        body.appendChild(row);
      }
      document.getElementById('estimate-heading').textContent = '試行コスト · '+times+'回（'+(controls.basis.value === 'base'?'最低料金':'標準テクスチャ')+'）';
      document.getElementById('count').textContent = count+' / '+rows.length+' 件';
      document.getElementById('empty').hidden = count !== 0;
    }
    document.getElementById('filters').addEventListener('submit', event=>event.preventDefault());
    Object.values(controls).forEach(control=>control.addEventListener('input',render));
    render();
    document.getElementById('filters').hidden = false;
  } catch (error) {
    const note = document.createElement('p');
    note.className='notice'; note.setAttribute('role','status');
    note.textContent='操作用データを読み込めないため、掲載時の全10件を固定表示しています。公式出典をご利用ください。';
    document.getElementById('filters').after(note);
    console.error(error);
  }
})();
