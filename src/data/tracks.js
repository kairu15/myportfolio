// The playlist for the floating music player (public/music/*.mp3). Title and
// artist are displayed in the player card; edit them here and the UI follows.
// Files are served straight from /music, so a rename here must be mirrored on
// disk (kebab-case filenames keep the URLs clean).
export const tracks = [
  { title: 'Kursunada', artist: 'Adie', src: '/music/kursunada.mp3' },
  { title: 'Paraluman', artist: 'Adie', src: '/music/paraluman.mp3' },
  { title: 'Tahanan', artist: 'Adie', src: '/music/tahanan.mp3' },
  {
    title: 'cherry flavoured love inside your heart',
    artist: 'wave to earth',
    src: '/music/cherry-flavoured-love.mp3',
  },
  { title: 'heaven and hell', artist: 'wave to earth', src: '/music/heaven-and-hell.mp3' },
  { title: 'love.', artist: 'wave to earth', src: '/music/love.mp3' },
];
