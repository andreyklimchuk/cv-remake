"""PS3 sound/bgm/source/*.at3 -> assets/audio/bgm/<name>.ogg + audio/bgm.json entries.

The .at3 files are a 16-byte SFH header + RIFF ATRAC3plus, with 16 more bytes inserted at every 0x20000-byte
boundary of the file (after each 128 KiB block) — they must be removed, otherwise the frames after the first
block are misaligned (ffmpeg drops about half of them). The decoded stream starts with fact[2] samples of
encoder + decoder delay (vgmstream convention for ATRAC3plus) and has fact[0] samples; smpl loop points are
sample positions of that trimmed stream.
Usage: python3 tools/conv/bgm.py OUT_DIR file.at3 ...   (prints the bgm.json entries)
Request numbers (bgm_all.stq): main00..main10 = 0..10, sub_NN = 44 + NN."""
import json, os, struct, subprocess, sys

def unwrap(d):
    out = bytearray(); o = 0
    while o < len(d):
        out += d[o + 16:o + 0x20000]; o += 0x20000
    return bytes(out)

def chunks(w):
    i = 12; r = {}
    while i < len(w) - 8:
        cid = w[i:i + 4]; sz = struct.unpack('<I', w[i + 4:i + 8])[0]
        r[cid] = w[i + 8:i + 8 + sz]
        if cid == b'data': break
        i += 8 + sz + (sz & 1)
    return r

def convert(src, out_dir, q='5'):
    name = os.path.basename(src)[:-4]
    w = unwrap(open(src, 'rb').read())
    c = chunks(w)
    rate = struct.unpack('<I', c[b'fmt '][4:8])[0]
    n, _, skip = struct.unpack('<3I', c[b'fact'][:12])
    tmp = os.path.join(out_dir, name + '.wav')
    open(tmp, 'wb').write(w)
    ogg = os.path.join(out_dir, name + '.ogg')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-af', 'atrim=start_sample=%d:end_sample=%d' % (skip, skip + n),
                    '-c:a', 'libvorbis', '-q:a', q, ogg], check=True)
    os.remove(tmp)
    e = {'f': name}
    s = c.get(b'smpl')
    if s and struct.unpack('<I', s[28:32])[0]:
        a, b = struct.unpack('<II', s[36 + 8:36 + 16])
        e['loop'] = [round(a / rate, 4), round(b / rate, 4)]
    return e

if __name__ == '__main__':
    out = sys.argv[1]; res = {}
    for f in sys.argv[2:]:
        nm = os.path.basename(f)[:-4]
        no = int(nm[4:]) if nm.startswith('main') else 44 + int(nm[4:])
        res[str(no)] = convert(f, out)
    print(json.dumps(res))
