
const songs = {'0-1': "Talking 'bout a Revolution – Tracy Chapman", '0-2': 'This Is the Life – Amy Macdonald', '0-3': 'Mr. Rock & Roll – Amy Macdonald', '0-4': 'Another Cup of Coffee – Mike & The Mechanics', '0-5': 'Runaway Train – Soul Asylum', '0-6': 'Losing My Religion – R.E.M.', '0-7': 'Like the Way I Do – Melissa Etheridge', '0-8': 'Because the Night – Patti Smith', '0-9': "These Boots Are Made for Walkin' – Nancy Sinatra", '0-10': 'Beast of Burden – Bette Midler', '0-11': 'Mr. Jones – Counting Crows', '0-12': "Friday I'm in Love – The Cure", '0-13': 'Let It Rain – Amanda Marshall', '0-14': 'Sunday Bloody Sunday – U2', '0-15': 'Sleeping in My Car – Roxette', '1-1': 'Let Me Entertain You – Robbie Williams', '1-2': 'Westerland – Die Ärzte', '1-3': "I'm Gonna Be (500 Miles) – The Proclaimers", '1-4': "Summer of '69 – Bryan Adams", '1-5': '99 Luftballons – Nena', '1-6': 'Torn – Natalie Imbruglia', '1-7': 'Ein Kompliment – Sportfreunde Stiller', '1-8': 'Seven Nation Army – The White Stripes', '1-9': 'Teenage Dirtbag – Wheatus', '1-10': 'Du hast den Farbfilm vergessen – R. Havanna', '1-11': 'Zombie – The Cranberries', '1-12': 'Hollywood Hills – Sunrise Avenue', '1-13': 'Are You Gonna Be My Girl – Jet', '1-14': 'It’s My Life – Bon Jovi', '2-1': 'Entre Dos Tierras – Héroes del Silencio', '2-2': "I Love Rock 'n' Roll – J. Jett & the Blackhearts", '2-3': 'Ready to Go – Republica', '2-4': 'You Give Love a Bad Name – Bon Jovi', '2-5': "Wir woll'n die Eisbären sehen – Puhdys", '2-6': 'Kling Klang – Keimzeit', '2-7': 'Über den Wolken – Dieter Thomas Kuhn', '2-8': 'Es geht mir gut – Westernhagen', '2-9': 'Bohemian Like You – Dandy Warhols', '2-10': 'What’s Up – 4 Non Blondes', '2-11': 'Sexy – Westernhagen', '2-12': 'Weak – Skunk Anansie', '2-13': 'When I Come Around – Green Day', '2-14': 'Every You Every Me – Placebo', '2-15': "Rock 'n' Roll Queen – The Subways", '2-16': 'Teenagerliebe – Die Ärzte', '2-17': 'All the Small Things – Blink-182', '3-1': 'Born to Be Wild – Steppenwolf', '3-2': 'Highway to Hell – AC/DC', '3-3': 'T.N.T. – AC/DC', '3-4': 'Smells Like Teen Spirit – Nirvana', '3-5': 'Smoke on the Water – Deep Purple', '3-6': 'Denkmal – Wir sind Helden', '3-7': 'Ich lebe – Christina Stürmer', '3-8': 'Narcotic – Liquido', '3-9': 'Shut Up and Dance – Walk the Moon', '3-10': 'Bitch – Meredith Brooks', '3-11': 'Wonderwall – Oasis', '3-12': 'Wish You Were Here – Pink Floyd', 'Z-1': 'Trouble – Pink', 'Z-2': 'Hymn – Barclay James Harvest'};
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
    alert("Alle Songs kürzlich gespielt. Speicher wird zurückgesetzt.");
    last15 = [];
    return;
  }

  const picked = available[Math.floor(Math.random() * available.length)];
  last15.push(picked);
  if (last15.length > 15) last15.shift();

  document.getElementById("output").textContent = songs[picked];
}
