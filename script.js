
const songs = {'0-1': 'Zombie – The Cranberries', '0-2': 'Like the Way I Do – Melissa Etheridge', '0-3': 'All the Small Things – Blink-182', '0-4': 'Narcotic – Liquido', '1-1': 'Sex on Fire – Kings of Leon', '1-2': 'Take Me Out – Franz Ferdinand', '2-1': 'Mercy – Duffy', '3-1': 'Westerland – Die Ärzte', 'Z-2': 'Highway to Hell – AC/DC'};
const maennlich = ['0-4', '1-1', '1-2', '2-1', '3-1', 'Z-2'];
const sets = {
  "0": Object.keys(songs).filter(k => k.startsWith("0-")),
  "1": Object.keys(songs).filter(k => k.startsWith("1-")),
  "2": Object.keys(songs).filter(k => k.startsWith("2-")),
  "3": Object.keys(songs).filter(k => k.startsWith("3-")),
  "Z": Object.keys(songs).filter(k => k.startsWith("Z-"))
};
const weiblich = Object.keys(songs).filter(k => !maennlich.includes(k));
let last15 = [];

function handleFilterChange() {
  const filter = document.getElementById("filter").value;
  document.getElementById("setSelect").style.display = filter === "sets" ? "inline-block" : "none";
}

function pickRandomSong() {
  const filter = document.getElementById("filter").value;
  let pool = [];

  if (filter === "alle") {
    pool = Object.keys(songs);
  } else if (filter === "maennlich") {
    pool = maennlich;
  } else if (filter === "weiblich") {
    pool = weiblich;
  } else if (filter === "sets") {
    const selectedSet = document.getElementById("setSelect").value;
    pool = sets[selectedSet] || [];
  }

  const available = pool.filter(id => !last15.includes(id));
  if (available.length === 0) {
    alert("Alle Songs kürzlich gespielt. Die Liste wird zurückgesetzt.");
    last15 = [];
    return;
  }

  const picked = available[Math.floor(Math.random() * available.length)];
  last15.push(picked);
  if (last15.length > 15) last15.shift();

  document.getElementById("output").textContent = songs[picked];
}
