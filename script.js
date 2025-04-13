
const songs = {'0-1': 'Zombie – The Cranberries', '0-2': 'Like the way I do – Melissa Etheridge', '0-3': 'All the small things – Blink 182', '0-4': 'Narcotic – Liquido', '0-5': 'Summer of 69 – Bryan Adams', '0-6': 'Boulevard of broken dreams – Green Day', '0-7': 'Ironic – Alanis Morissette', '0-8': 'You oughta know – Alanis Morissette', '0-9': 'Teenage Dirtbag – Wheatus', '0-10': 'What’s up – 4 Non Blondes', '1-1': 'Sex on fire – Kings of Leon', '1-2': 'Take me out – Franz Ferdinand', '1-3': 'Seven Nation Army – The White Stripes', '1-7': 'Valerie – Amy Winehouse', '1-8': 'Stupid Girls – Pink', '1-12': 'Shallow – Lady Gaga & Bradley Cooper', '2-1': 'Lonely Boy – The Black Keys', '2-5': 'Runaway Train – Soul Asylum', '2-6': 'I was made for loving you – Kiss', '2-7': 'Highway to Hell – AC/DC', '2-8': 'When I come around – Green Day', '2-9': 'Mr. Brightside – The Killers', '2-11': 'Somebody to love – Jefferson Airplane', '2-13': 'Friday I’m in love – The Cure', '2-14': 'Chasing Cars – Snow Patrol', '2-15': 'Wonderwall – Oasis', '2-16': 'Denkmal – Wir sind Helden', '2-17': 'Sunday Bloody Sunday – U2', '3-1': 'Westerland – Die Ärzte', '3-4': 'You give love a bad name – Bon Jovi', '3-8': 'Mein Herz brennt – Rammstein', '3-11': 'Engel – Rammstein', '3-12': 'Nothing else matters – Metallica', 'Z-2': 'Highway to Hell – AC/DC'};
const maennlich = ['0-4', '0-5', '0-6', '0-12', '1-1', '1-2', '1-3', '1-7', '1-8', '1-12', '2-1', '2-5', '2-6', '2-7', '2-8', '2-9', '2-11', '2-13', '2-14', '2-15', '2-16', '2-17', '3-1', '3-4', '3-8', '3-11', '3-12', 'Z-2'];
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
    alert("Alle Songs kürzlich gespielt. Liste wird zurückgesetzt.");
    last15 = [];
    return;
  }

  const picked = available[Math.floor(Math.random() * available.length)];
  last15.push(picked);
  if (last15.length > 15) last15.shift();

  document.getElementById("output").textContent = songs[picked];
}
