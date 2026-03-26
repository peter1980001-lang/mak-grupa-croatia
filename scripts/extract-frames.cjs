// scripts/extract-frames.cjs
// Usage: node scripts/extract-frames.cjs <input-video> <output-name>
// Example: node scripts/extract-frames.cjs "C:/path/to/video.mp4" section-name
//
// Outputs: public/frames/<output-name>/frame_0001.jpg ... frame_NNNN.jpg

const { execFileSync } = require('child_process')
const { mkdirSync }    = require('fs')
const path             = require('path')
const ffmpegPath       = require('@ffmpeg-installer/ffmpeg').path

const [,, input, name] = process.argv
if (!input || !name) {
  console.error('Usage: node scripts/extract-frames.cjs <video-path> <output-name>')
  process.exit(1)
}

const outDir = path.join(__dirname, '..', 'public', 'frames', name)
mkdirSync(outDir, { recursive: true })

console.log(`Extracting frames from "${input}" → public/frames/${name}/`)

execFileSync(ffmpegPath, [
  '-i', input,
  '-vf', 'fps=24,scale=1920:-1',
  '-q:v', '3',
  path.join(outDir, 'frame_%04d.jpg'),
], { stdio: 'inherit' })

console.log('Done.')
