// Converte as fotos do cliente (../imagens recebidas) para webp, cortando a faixa da marca d'água.
const sharp = require('sharp');
const fs = require('fs');
const map = {
  1: 'vista-geral', 2: 'salao-sinuca', 3: 'piscina-cascata', 4: 'piscina-detalhe', 5: 'entrada-noite', 6: 'salao-sinuca-2',
  7: 'piscina-lateral', 8: 'fachada-dia', 9: 'sinuca-close', 10: 'piscina-led-1', 11: 'piscina-led-2', 12: 'piscina-lateral-2',
  13: 'piscina-contraluz', 14: 'piscina-led-3', 15: 'piscina-dia', 16: 'cascata-salao', 17: 'piscina-led-4', 18: 'piscina-led-5',
  19: 'piscina-led-6', 20: 'bancada', 21: 'piscina-noite', 22: 'piscina-noite-2', 23: 'salao-amplo',
};
// quanto da altura fica (o resto, embaixo, tem logo + telefone)
const keepOverride = { 'vista-geral': 0.76, 'piscina-led-1': 0.75, 'entrada-noite': 0.77, 'salao-amplo': 0.82 };
(async () => {
  const d = '../imagens recebidas';
  fs.mkdirSync('public/img/blur', { recursive: true });
  fs.mkdirSync('public/img/sm', { recursive: true });
  fs.mkdirSync('public/img/xs', { recursive: true });
  fs.mkdirSync('public/img/md', { recursive: true });
  const files = fs.readdirSync(d).filter((f) => f.endsWith('.jpeg')).sort();
  const sizes = {};
  for (const [i, f] of files.entries()) {
    const name = map[i + 1];
    const m = await sharp(d + '/' + f).metadata();
    const keep = keepOverride[name] ?? 0.8;
    const h = Math.round(m.height * keep);
    const crop = sharp(d + '/' + f).extract({ left: 0, top: 0, width: m.width, height: h });
    // reamostra com lanczos e nitidez leve (as originais vieram comprimidas pelo WhatsApp)
    const buf = await crop.resize({ width: Math.round(m.width * 1.5), kernel: 'lanczos3' }).sharpen({ sigma: 0.9, m1: 0.6, m2: 2 }).modulate({ saturation: 1.04 }).webp({ quality: 90, smartSubsample: true, effort: 6 }).toBuffer();
    fs.writeFileSync(`public/img/${name}.webp`, buf);
    await sharp(d + '/' + f).extract({ left: 0, top: 0, width: m.width, height: h }).resize({ width: 800, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).webp({ quality: 80, effort: 6 }).toFile(`public/img/sm/${name}.webp`);
    await sharp(d + '/' + f).extract({ left: 0, top: 0, width: m.width, height: h }).resize({ width: 480, kernel: 'lanczos3' }).sharpen({ sigma: 0.5 }).webp({ quality: 78, effort: 6 }).toFile(`public/img/xs/${name}.webp`);
    if (m.width * 1.5 > 1400) await sharp(buf).resize({ width: 1200, kernel: 'lanczos3' }).webp({ quality: 80, effort: 6 }).toFile(`public/img/md/${name}.webp`);
    await sharp(buf).resize(64).blur(1.2).modulate({ saturation: 1.15 }).webp({ quality: 60 }).toFile(`public/img/blur/${name}.webp`);
    sizes[name] = [Math.round(m.width * 1.5), Math.round(h * 1.5)];
  }
  fs.writeFileSync('src/data/fotos.json', JSON.stringify(sizes, null, 1));
  console.log(Object.keys(sizes).length, 'fotos');
})();
