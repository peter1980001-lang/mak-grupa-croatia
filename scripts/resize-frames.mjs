// scripts/resize-frames.mjs
// Resizes all canvas frame JPEGs from 1920×1080 → 1280×720, quality 82.
// Run once: node scripts/resize-frames.mjs
import sharp from 'sharp'
import { readdir, writeFile } from 'fs/promises'
import { join } from 'path'

const FRAMES_DIR = new URL('../public/frames', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const WIDTH      = 1280
const HEIGHT     = 720
const QUALITY    = 82

async function getAllJpegs(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...await getAllJpegs(full))
    else if (e.name.endsWith('.jpg') || e.name.endsWith('.jpeg')) files.push(full)
  }
  return files
}

async function main() {
  const files = await getAllJpegs(FRAMES_DIR)
  console.log(`Found ${files.length} frames — resizing to ${WIDTH}×${HEIGHT} @ q${QUALITY}…\n`)

  let done = 0
  const t0 = Date.now()

  // Process in batches of 20 for memory efficiency
  const BATCH = 20
  for (let i = 0; i < files.length; i += BATCH) {
    const batch = files.slice(i, i + BATCH)
    await Promise.all(batch.map(async (file) => {
      const buf = await sharp(file)
        .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: QUALITY, mozjpeg: false })
        .toBuffer()
      await writeFile(file, buf)
      done++
    }))
    const pct  = Math.round((done / files.length) * 100)
    const secs = ((Date.now() - t0) / 1000).toFixed(1)
    process.stdout.write(`\r  ${pct}%  (${done}/${files.length})  ${secs}s elapsed   `)
  }

  const total = ((Date.now() - t0) / 1000).toFixed(1)
  console.log(`\n\nDone in ${total}s.`)
}

main().catch(err => { console.error(err); process.exit(1) })
