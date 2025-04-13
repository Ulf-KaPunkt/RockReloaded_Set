
const songs = {
  "0-1": "Back in Black – AC/DC",
  "0-2": "Are You Gonna Be My Girl – Jet",
  "1-1": "Zombie – The Cranberries",
  "1-2": "Rolling in the Deep – Adele",
  "2-1": "Wonderwall – Oasis",
  "2-2": "Shallow – Lady Gaga & Bradley Cooper",
  "3-1": "Smells Like Teen Spirit – Nirvana",
  "Z-1": "Highway to Hell – AC/DC"
};

const male = ["0-1", "0-2", "2-1", "3-1", "Z-1"];
const sets = {
  "0": ["0-1", "0-2"],
  "1": ["1-1", "1-2"],
  "2": ["2-1", "2-2"],
  "3": ["3-1"],
  "Z": ["Z-1"]
};

let history = [];

function updateSetDropdown() {
  const filter = document.getElementById("filter").value;
  document.getElementById("setSelect").style.display = filter === "set" ? "inline-block" : "none";
}

function drawSong() {
  const filter = document.getElementById("filter").value;
  let pool = Object.keys(songs);

  if (filter === "male") {
    pool = male;
  } else if (filter === "female") {
    pool = pool.filter(k => !male.includes(k));
  } else if (filter === "set") {
    const selected = document.getElementById("setSelect").value;
    pool = sets[selected] || [];
  }

  const available = pool.filter(k => !history.includes(k));
  if (available.length === 0) {
    alert("Alle Songs wurden kürzlich gespielt. Speicher wird zurückgesetzt.");
    history = [];
    return;
  }

  const choice = available[Math.floor(Math.random() * available.length)];
  document.getElementById("songDisplay").textContent = songs[choice];

  history.push(choice);
  if (history.length > 15) history.shift();
}
