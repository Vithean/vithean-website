import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Intrinsic size of a file in public/, read at build time.
 *
 * The hero screenshot is dropped in by hand and gets replaced. Typing its
 * width and height into the markup meant they silently disagreed with the file
 * the moment someone exported at a different size — which is exactly what
 * happened: the markup still claimed 2521x1254 after the image became
 * 1260x630. Reading the header removes the chance to be wrong.
 *
 * Sniffs the signature rather than trusting the extension, because a JPEG
 * saved as .png is a normal thing to receive and browsers render it anyway.
 */
export function imageSize(publicPath: string): { w: number; h: number; type: 'png' | 'jpeg' } {
  const buf = readFileSync(join(process.cwd(), 'public', publicPath.replace(/^\//, '')));

  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), type: 'png' };
  }

  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    // Walk the segment chain to the frame header; only it carries the size.
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5), type: 'jpeg' };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }

  throw new Error(`imageSize: ${publicPath} is neither PNG nor JPEG — cannot size it`);
}
