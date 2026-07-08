# Kelime Evreni

## Projenin Amaci

Kelime Evreni, 6. sinif Turkce dersinde ogrencilerin kelime hazinesi, anlam kurma, kanit kullanma, baglaclarla mantik iliskisi kurma ve yazili uretim becerilerini gelistirmek icin tasarlanan harita tabanli etkilesimli bir web uygulamasidir.

Proje, Gemini ile uretilen "Soz Atlasi" oyun akisi referans alinarak planlanmistir: ogrenci gorev istasyonlarini tamamlar, puan kazanir, beceri alanlarinda ilerler ve surecin sonunda sertifika alir.

## Problem

Kelime ogretimi cogu zaman yalnizca tanim ezberleme veya kisa testlerle sinirli kalir. Bu durum ogrencinin kelimeyi baglam icinde kullanma, kanita dayali dusunme ve yazili anlatimda anlamli secimler yapma becerisini yeterince desteklemez.

## Cozum

Kelime Evreni, kelime ogretimini oyunlastirilmis gorevlerle destekler. Ogrenci bir harita uzerinde istasyonlari acar, her istasyonda farkli bir Turkce becerisi uzerine calisir ve sistemden anlik geri bildirim alir.

## Hedef Kitle

- 6. sinif ogrencileri
- Turkce ogretmenleri
- Egitim teknolojileri gelistiricileri
- Dijital materyal tasarimi yapan ogretmenler

## Egitimsel Kazanimlar

- Kelimeleri baglamdan hareketle anlamlandirir.
- Bilgi ve gorusu ayirt eder.
- Kanita dayali soru sorar.
- Neden-sonuc ve karsitlik iliskilerini baglaclarla kurar.
- Kisa aciklayici ve yaratici metinler uretir.
- Kendi ogrenme surecini degerlendirir.

## Ozellikler

- Harita tabanli gorev akisi
- Kilitli/acik istasyon sistemi
- Puan sistemi
- Beceri puanlari: Anlama, Sorgulama, Iletisim, Uretim, Yansitma
- AI benzeri yerel geri bildirim
- Ipucu sistemi
- Ilerleme kaydi
- Basari sertifikasi
- Acik/koyu tema
- Responsive tasarim
- GitHub Pages ve Vercel icin statik yayin yapisi

## Kullanilan Teknolojiler

- HTML
- CSS
- JavaScript
- JSON
- LocalStorage

## Kurulum

Projeyi yerelde calistirmak icin herhangi bir paket kurulumu gerekmez.

```bash
# Basit bir statik sunucu ile calistirma onerilir
python -m http.server 8080
```

Ardindan tarayicida su adres acilir:

```text
http://localhost:8080
```

## Kullanim

1. `index.html` dosyasini acin.
2. Ogrenci adini girin.
3. Haritadaki ilk gorevden baslayin.
4. Gorevleri tamamladikca yeni istasyonlar acilir.
5. Tum istasyonlar bitince sertifika ekrani goruntulenir.

## Dosya Yapisi

```text
kelime-evreni/
  README.md
  LICENSE
  .gitignore
  CHANGELOG.md
  index.html
  docs/
  assets/
    images/
    icons/
    audio/
    video/
  src/
    components/
    styles/
    scripts/
    data/
  prompts/
  tests/
  examples/
```

## Gelecek Surumler

- Gercek yapay zeka API entegrasyonu
- Ogretmen paneli
- Sinif raporlari
- Ek tema paketleri
- Canva gorsel paketleri
- Seslendirme dosyalari
- Coklu unite ve seviye secimi

## Katki

Bu proje, Turkce egitimi icin acik ve gelistirilebilir bir dijital materyal olarak tasarlanmistir. Katki sureci icin once issue acilmasi, ardindan acik kapsamli pull request gonderilmesi onerilir.

## Lisans

MIT Lisansi ile yayinlanir. Ayrintilar icin `LICENSE` dosyasina bakiniz.

## Gelistirici

Turkce Egitim Evreni

