// Tira o fundo preto das logos (ouro sobre preto -> ouro com transparência) e gera versão escura p/ fundos claros.
const sharp = require('sharp');
const fs = require('fs');
const SRC = 'public/img/logo-lideranca.webp'; // 640x640, lockup completo
const OUT = 'public/img/marca';
const crops = {
  completa: null,
  horizontal: { left: 40, top: 383, width: 560, height: 165 },
  emblema: { left: 160, top: 45, width: 320, height: 330 },
  ornamento: { left: 100, top: 514, width: 440, height: 32 },
};
async function make(name, crop, tone) {
  let img = sharp(SRC);
  if (crop) img = img.extract(crop);
  const { data, info } = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const m = Math.max(r, g, b);
    const a = Math.max(0, Math.min(1, (m - 14) / 150));
    const k = a > 0 ? 1 / Math.max(a, 0.35) : 0;
    const f = tone === 'escuro' ? 0.5 : 1;
    out[j] = Math.min(255, r * k * f);
    out[j + 1] = Math.min(255, g * k * f);
    out[j + 2] = Math.min(255, b * k * f);
    out[j + 3] = Math.round(a * 255);
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize({ width: info.width * 2, kernel: 'lanczos3' })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(`${OUT}/${name}-${tone}.webp`);
}
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [n, c] of Object.entries(crops)) for (const t of ['ouro', 'escuro']) await make(n, c, t);
  console.log(fs.readdirSync(OUT));
})();
