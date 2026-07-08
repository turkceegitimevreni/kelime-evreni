const connectors = ["cunku", "bu yuzden", "dolayisiyla", "fakat", "ancak", "rağmen", "ragmen"];

export function analyzeText(text, missionType) {
  const clean = normalize(text);
  const messages = [];
  let score = 0;

  if (clean.length >= 80) {
    score += 20;
    messages.push("Metnin yeterli uzunlukta ve dusunceni acacak alan olusturuyor.");
  } else {
    messages.push("Cevabini biraz daha ayrintilandirabilirsin.");
  }

  if (connectors.some((item) => clean.includes(item))) {
    score += 20;
    messages.push("Neden-sonuc veya karsitlik iliskisi kuran baglac kullandin.");
  } else {
    messages.push("Cunku, fakat, bu yuzden gibi baglaclarla dusunceni guclendirebilirsin.");
  }

  if (/\bkanit|veri|rapor|grafik|gozlem|sonuc\b/.test(clean)) {
    score += 20;
    messages.push("Kanita veya gozleme dayanan bir ifade kullandin.");
  } else if (missionType === "production") {
    messages.push("Duyuruda kanit veya veri ifadesi kullanman metni daha guvenilir yapar.");
  }

  if (/\borman|doga|evren|canli|denge|cevre\b/.test(clean)) {
    score += 20;
    messages.push("Tema kelimelerini baglama uygun kullandin.");
  } else {
    messages.push("Doga ve evren temasiyla ilgili kelimeleri daha belirgin kullanabilirsin.");
  }

  if (!/\bsuclu|berbat|kotu|rezalet\b/.test(clean)) {
    score += 20;
    messages.push("Uslubun yapici ve ogrenci duzeyine uygun.");
  } else {
    messages.push("Suclayici ifadeleri daha yapici bir dille degistirmelisin.");
  }

  return {
    passed: score >= 60,
    score,
    message: messages.join(" "),
  };
}

export function normalize(value) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .trim();
}

