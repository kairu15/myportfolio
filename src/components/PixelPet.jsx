/**
 * Shared renderer for the retro pixel-art pets (Pets.jsx dogs, Cats.jsx cats).
 *
 * A sprite is a stack of character-map layers — one per animated body part.
 * Each layer is scanned into merged horizontal runs, so an animal renders as
 * a few dozen SVG rects instead of one per pixel, with `crispEdges` keeping
 * the squares sharp at every size. Layers become plain <g data-part> groups
 * with their pivot (transform-origin) taken from the sprite definition, and
 * every animation lives in Pets.module.css / Cats.module.css targeting those
 * [data-part] groups — the renderer itself holds no motion of its own.
 */

function layerRects(map) {
  const rects = [];
  map.forEach((row, y) => {
    let runStart = -1;
    let runChar = '';
    for (let x = 0; x <= row.length; x += 1) {
      const char = x < row.length ? row[x] : '';
      if (char !== runChar) {
        if (runChar && runChar !== '.') {
          rects.push({ x: runStart, y, w: x - runStart, char: runChar });
        }
        runChar = char;
        runStart = x;
      }
    }
  });
  return rects;
}

export default function PixelPet({ sprite, palette, className = '' }) {
  return (
    <svg
      viewBox={`0 0 ${sprite.width} ${sprite.height}`}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {sprite.parts.map(({ name, map, origin }) => (
        <g
          key={name}
          data-part={name}
          style={
            origin
              ? { transformBox: 'view-box', transformOrigin: `${origin[0]}px ${origin[1]}px` }
              : undefined
          }
        >
          {layerRects(map).map((rect, index) => (
            <rect
              key={index}
              x={rect.x}
              y={rect.y}
              width={rect.w}
              height={1}
              fill={palette[rect.char] || 'none'}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
