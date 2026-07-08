# Kelime Evreni | Proje Plani

## 1. Proje Kimligi

**Proje adi:** Kelime Evreni  
**Alt baslik:** Kayip Anlamlarin Pesinde  
**Ders:** Turkce  
**Sinif duzeyi:** 6. sinif  
**Platform:** Web, responsive  
**Yayin hedefi:** GitHub Pages ve Vercel  

## 2. Referans Oyun Akisi

Plan, kullanicinin paylastigi Gemini tabanli "Soz Atlasi" ekranlarindaki akisa gore yeniden kurgulanmistir.

Referans akista su ogeler bulunur:

- Ust barda oyun adi, tema etiketi, puan ve ayarlar
- Harita uzerinde kilitli/acik istasyonlar
- Gorev tamamlandikca ilerleme
- Dinleme, kanit bulma, sorgulama, baglac, uretim ve yansitma istasyonlari
- AI kriterlerine gore yazili cevap analizi
- Son bolumde sertifika ve beceri puanlari

Kelime Evreni bu yapinin 6. sinif kelime ogretimine uyarlanmis surumudur.

## 3. Egitimsel Yaklasim

Proje asagidaki ogretim ilkelerine dayanir:

- **Bloom Taksonomisi:** Hatirlama, anlama, uygulama, analiz, degerlendirme ve yaratma basamaklari gorevlere yayilir.
- **Oyunlastirma:** Puan, rozet, kilit acma ve sertifika sistemi kullanilir.
- **Anlik geri bildirim:** Ogrenci dogru/yanlis sonucunu ve gelistirme onerilerini hemen gorur.
- **Ogrenme analitigi:** Beceriler ayri ayri puanlanir.
- **Evrensel tasarim:** Renk, klavye kullanimi, metin okunabilirligi ve responsive yapi dikkate alinir.

## 4. Ana Oyun Dongusu

1. Ogrenci adini girer.
2. Harita ekrani acilir.
3. Ilk istasyon aktif olur.
4. Gorev tamamlanir.
5. Puan ve beceri barlari guncellenir.
6. Siradaki istasyon acilir.
7. Tum istasyonlar tamamlaninca final sentezi ve sertifika ekrani acilir.

## 5. Istasyonlar

### 5.1 Yanki Istasyonu

**Beceri:** Dinleme, anlam cikarimi  
**Gorev:** Eski telsizden gelen mesaji dinle/simule et ve anahtar kelimeyi bul.  
**Degerlendirme:** Anahtar kelime ve baglam uyumu kontrol edilir.

### 5.2 Kanit Dosyasi

**Beceri:** Bilgi-gorus ayrimi, kanit okuma  
**Gorev:** Bulten, grafik ve rapor sekmelerindeki ifadeleri incele. Bilgi ve gorus ifadelerini ayirt et.  
**Degerlendirme:** Kanitlanabilir veri secimleri puan kazandirir.

### 5.3 Sorgulama Odasi

**Beceri:** Soru sorma, kanita dayali dusunme  
**Gorev:** Karakterin aciklamasini sorgulamak icin en guclu soruyu sec.  
**Degerlendirme:** Sorunun netligi ve kanita dayanmasi olculur.

### 5.4 Mantik Tesisati Laboratuvari

**Beceri:** Baglac, neden-sonuc ve karsitlik iliskisi  
**Gorev:** Cümlelerde bos birakilan baglaclari tamamla.  
**Degerlendirme:** Dogru baglac secimiyle mantik hattı onarilir.

### 5.5 Uretim Atolyesi

**Beceri:** Yazili anlatim, aciklama, kelime kullanimi  
**Gorev:** Meydandaki ekrana yansitilacak kisa bir duyuru yaz.  
**Degerlendirme:** AI benzeri kriter sistemiyle metin incelenir.

### 5.6 Hayal Atolyesi

**Beceri:** Yaratici yazma, betimleme  
**Gorev:** Verilen duruma gore kisa bir hikaye uret.  
**Degerlendirme:** Betimleme, karakter, olay ve hedef kelime kullanimi kontrol edilir.

### 5.7 Kasif Aynasi

**Beceri:** Yansitma, oz degerlendirme  
**Gorev:** Ogrenci kendi surecini degerlendirir.  
**Degerlendirme:** Anlamli ve gerekceli cevaplar yansitma puani kazandirir.

## 6. Puanlama

Toplam puan gorev bazli hesaplanir. Ayrica beceri alanlari ayri tutulur.

| Beceri | Aciklama |
| --- | --- |
| Anlama | Kelimeyi ve metni anlamlandirma |
| Sorgulama | Kanita dayali soru sorma |
| Iletisim | Acik, uygun ve saygili ifade |
| Uretim | Yazili metin olusturma |
| Yansitma | Sureci degerlendirme |

## 7. Yapay Zeka Katmani

V1 surumunde gercek API baglantisi yerine yerel ve guvenli bir AI benzeri geri bildirim sistemi kullanilir.

Kontrol alanlari:

- Cevap uzunlugu
- Anahtar kelime varligi
- Baglac kullanimi
- Kanit veya gerekce kullanimi
- Olumlu ve yapici dil
- Gorev amacina uygunluk

V2 surumunde OpenAI veya Gemini API entegrasyonu opsiyonel olarak eklenebilir.

## 8. Tasarim Kararlari

- Modern, minimal ve ogrenci dostu arayuz
- Kart tabanli gorev ekranlari
- Harita ekrani icin Canva gorsellerine hazir alan
- Acik/koyu tema
- Mobil oncelikli responsive CSS
- Klavye ile kullanilabilir kontroller

## 9. Teknik Mimari

Proje herhangi bir derleme sistemi gerektirmeyen statik web uygulamasi olarak tasarlanir.

- `index.html`: Uygulama kabugu
- `src/styles`: Tema ve arayuz stilleri
- `src/scripts`: Gorev motoru, puanlama, AI geri bildirim ve veri kaydi
- `src/data`: Gorev ve kelime verileri
- `assets`: Canva, ikon, ses ve video varliklari

## 10. GitHub Plani

Repository adi: `kelime-evreni`

GitHub standartlari:

- Public repository
- README
- MIT License
- `.gitignore`
- CHANGELOG
- Ilk commit
- GitHub Pages uyumlu statik yapi

## 11. Teslim Kriterleri

- Proje klasoru olusturulmus olacak.
- Plan ve README profesyonel bicimde hazir olacak.
- Statik uygulama ilk surum iskeleti calisacak.
- GitHub'a aktarim icin repository hazir olacak.
- GitHub erisimi yeterliyse ilk commit uzak depoya gonderilecek.

