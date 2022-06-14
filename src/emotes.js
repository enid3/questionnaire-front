const emotes_ = []

function importAll(r) {
  r.keys().forEach(key => (emotes_.push({ pathLong: r(key), pathShort: key })));
}

importAll(require.context('./assets/emotes/', true, /\.gif$/));

export default {
  emotes: emotes_,
  getRandomEmotePath() {
    return this.emotes[Math.floor(Math.random() * this.emotes.length)].pathLong
  },
}

