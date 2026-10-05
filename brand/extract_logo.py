"""Extract the circular Protein Tadka badge onto transparency + sample brand colours."""
import os
from PIL import Image
import numpy as np

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(BASE, 'brand', 'logo-source.jpeg')
OUT = os.path.join(BASE, 'app', 'public', 'assets', 'img')

im = Image.open(SRC).convert('RGB')
W, H = im.size
print('source size:', W, H)

a = np.asarray(im).astype(np.int16)

# ---------- 1. find the circular badge ----------
# The badge is a dark charcoal circle on a grey/slate backdrop.
# Detect "dark" pixels (the badge body + its warm ring) vs the light slate backdrop.
lum = a.mean(axis=2)
dark = lum < 110

ys, xs = np.where(dark)
print('dark bbox:', xs.min(), ys.min(), xs.max(), ys.max())

cx = (xs.min() + xs.max()) / 2
cy = (ys.min() + ys.max()) / 2
r = max(xs.max() - xs.min(), ys.max() - ys.min()) / 2
print(f'centre=({cx:.1f},{cy:.1f}) radius={r:.1f}')

# ---------- 2. circular alpha mask with a soft edge ----------
yy, xx = np.mgrid[0:H, 0:W]
dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

plane_end = r
feather = max(2.0, r * 0.006)
alpha = np.clip((plane_end - dist) / feather, 0, 1)

# ---------- 3. de-fringe: pull the warm ring colour outward slightly ----------
# Just knock out fully-transparent pixels; the badge edge is already dark.
out = np.dstack([np.asarray(im), (alpha * 255).astype(np.uint8)])
badge = Image.fromarray(out, 'RGBA')
badge = badge.crop((int(cx - r), int(cy - r), int(cx + r), int(cy + r)))

# square + high-quality downscale
side = int(r * 2)
badge = badge.resize((700, 700), Image.LANCZOS)
badge.save(os.path.join(OUT, 'logo-badge.png'))
print('wrote logo-badge.png', badge.size)

# ---------- 4. sample the palette ----------
def dominant(region, n=6):
    px = region.reshape(-1, 3)
    # quantise to reduce noise
    q = (px // 16 * 16).astype(np.uint8)
    cols, counts = np.unique(q, axis=0, return_counts=True)
    order = np.argsort(-counts)[:n]
    return [(tuple(int(v) for v in cols[i]), int(counts[i])) for i in order]

inner = a[int(cy - r * 0.35):int(cy + r * 0.35), int(cx - r * 0.35):int(cx + r * 0.35)]
print('\ninner dominant colours (rgb, count):')
for c, n in dominant(inner, 10):
    print(f'  #{c[0]:02X}{c[1]:02X}{c[2]:02X}  rgb{c}  {n}')

# specifically hunt the orange script + the yellow ring
flat = a.reshape(-1, 3)
orange = flat[(flat[:, 0] > 175) & (flat[:, 1] > 90) & (flat[:, 1] < 190) & (flat[:, 2] < 90)]
print('\nmean ORANGE:', orange.mean(axis=0).round().astype(int) if len(orange) else 'none', f'({len(orange)} px)')
yellow = flat[(flat[:, 0] > 200) & (flat[:, 1] > 170) & (flat[:, 2] < 130)]
print('mean YELLOW:', yellow.mean(axis=0).round().astype(int) if len(yellow) else 'none', f'({len(yellow)} px)')
darkp = flat[(flat.mean(axis=1) < 45)]
print('mean CHARCOAL:', darkp.mean(axis=0).round().astype(int) if len(darkp) else 'none', f'({len(darkp)} px)')
