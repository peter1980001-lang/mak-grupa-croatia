// scripts/remove-bg.mjs
// Run: node scripts/remove-bg.mjs YOUR_API_KEY

import fs from 'fs'
import path from 'path'

const API_KEY  = process.argv[2]
const PARALLAX = path.resolve('public/parallax')
const LAYERS   = ['layer2.png', 'layer3.png']

if (!API_KEY) {
  console.error('Usage: node scripts/remove-bg.mjs YOUR_API_KEY')
  process.exit(1)
}

async function removeBg(inputPath, outputPath) {
  const imageData = fs.readFileSync(inputPath)
  const blob = new Blob([imageData], { type: 'image/png' })

  const form = new FormData()
  form.append('image_file', blob, path.basename(inputPath))
  form.append('size', 'auto')

  const res = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': API_KEY },
    body: form,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status}: ${text}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(outputPath, buffer)
}

const folders = fs.readdirSync(PARALLAX).filter(f =>
  fs.statSync(path.join(PARALLAX, f)).isDirectory()
)

let idx = 0
const jobs = folders.flatMap(folder =>
  LAYERS.map(layer => ({ folder, layer }))
).filter(({ folder, layer }) =>
  fs.existsSync(path.join(PARALLAX, folder, layer))
)

for (const { folder, layer } of jobs) {
  const filePath = path.join(PARALLAX, folder, layer)
  process.stdout.write(`  [${++idx}/${jobs.length}] ${folder}/${layer} ... `)
  try {
    await removeBg(filePath, filePath)
    console.log('done')
  } catch (e) {
    console.log(`FAILED: ${e.message}`)
  }
}

console.log('\nAll done.')
