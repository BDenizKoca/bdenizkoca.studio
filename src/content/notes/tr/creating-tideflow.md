---
title: "Markdown Neden Kullanılmalı?"
description: "Tideflow'un ortaya çıkmasına yol açan iş akışının perde arkasına bir yolculuk."
date: 2025-10-24T00:00:00.000Z
lang: tr
show_on_homepage: true
---

Bu hikâye, yaklaşık dört beş yıl önce iş akışımda giderek daha fazla Markdown dosyası belirmeye başladığında başladı. O zaman da, bugün de fazlasıyla meraklıyım; akademiyle uğraşıyor, Latince öğreniyor, kod yazıyor ve sürekli not tutmamı gerektiren işler peşinde koşuyordum. Kısa süre içinde şu düzeneğe alışmıştım:

- Önce düşüncelerimi biçimlendirme derdi olmadan, düz metin olarak yazıyorum.
- İstediğim düzeni ve görünümü gösteren bir örnek belgeyi yapay zekâya veriyorum.
- Ardından içeriği bozmadan metni yeniden düzenlemesini ve görünümü düzeltmesini istiyorum.

Büyük Dil Modelleri ilk ortaya çıktığında sonuçlar düzensizdi; modeller geliştikçe bu döngü de hızlandı. Buna rağmen işin en sancılı kısmı hâlâ metni paylaşılabilir hâle getirmekti. Word'de kopyala-yapıştırla başladım, belgeler uzadıkça yöntem kabusa döndü. Dosyayı doğrudan `.docx` olarak göndermek de çare olmadı; yapay zekâ belgelerle barışamıyor, düzen her seferinde bozuluyordu. Tam o sırada Markdown'la tanıştım. TXT kadar hafif, paylaşması kolaydı ve yapay zekâlarla nedense çok daha iyi anlaşıyordu. Kısa sürede etrafındaki zengin ekosistemi keşfedince kendimi tümüyle kaptırdım.

2022'den beri ana metin formatım Markdown. Hele ki Notepad++'a vurulduktan sonra ders notlarım, makalelerim, kurgu fikirlerim, günlüklerim hep `.md` dosyalarıyla başlıyor. İnsanların uzun metin duvarlarını pek sevmediğini fark ettiğim için paylaşmadan önce başka formatlara dönüştürüyorum ama işte tam orada işler sarpa sardı.

Üretkenliğim artmıştı ama emeğimi paylaşamaz hale gelmiştim. Titizlikle tuttuğum notlar arkadaşlarım için okunması güç metin yığınlarına dönüşüyor, masaüstü rol yapma oyunu kampanyam için hazırladığım evren notları bile aynı akıbeti paylaşıyordu. Markdown'dan PDF'e sayısız dönüştürücü denedim; hiçbiri yazarken göreceğim son hâli birebir göstermiyordu.

Markdown'dan PDF'e giden yaygın yol, içeriği şık bir HTML sayfasına çevirip tarayıcının yazdır özelliğiyle PDF'e almak. Yaklaşık sonuç veriyor ama ben sayfa sınırları gibi küçük detaylara takılıyorum. HTML ön izlemeler manuel sayfa sonlarını bile ancak çıktı alırken uyguluyor. Üstüne, doğru düzgün bir PDF düzenleyicisi de bulamadım. Böylece iş akışım tamamen kilitlendi.

Ben yazarken sadece metne odaklanmak istiyorum; ideal senaryoda görünümü bir grup hazır tema üstlenir. Markdown'la bu dünyayı kuramayınca tek mantıklı seçeneğin kendi aracımı geliştirmek olduğuna ikna oldum. Hedefim çok netti: Aynı pencerede yazıp biçimlendirmek, sonunda elimde hem `.md` hem de paylaşmaya hazır kusursuz bir PDF olsun. Kafamdaki ana hatlar şöyleydi:

- Sol tarafta kullanıcı dostu araç çubuğu olan yalın bir Markdown düzenleyici.
- Sağda, alacağım çıktının birebir aynısını gösteren, doğru sayfalanmış canlı bir PDF ön izlemesi.
- Hazır temalar ve özelleştirilebilir seçenekler sunan pratik bir tasarım paneli.

Bu fikri Markdown'da küçük bir taslakla not aldım ve ardından beklediğim gibi sayısız yan yola daldım. En sonunda inanılmaz hızlı bir dönüştürücü olan Typst'te karar kıldım. Kendi `.typ` dosyalarıyla çalışıyor ve PDF'i göz açıp kapayıncaya kadar üretiyor. Typst'in editörü bile gerçek sayfalama sunmuyordu ama hız bana şunu düşündürdü: Madem dönüştürme neredeyse anlık, neden yaklaşık bir HTML ön izlemeyle yetinelim?

## Her Şey Bir Kopyanın Kopyası...

Çoğu Markdown → PDF aracı yazarken HTML ön izlemesi üretip onu bir tahmin olarak kullanır. Ben aracı aradan çıkarmayı denedim: Kullanıcı bir `.md` dosyası açar açmaz uygulama arka planda sessizce PDF çıkarıyor, bu geçici dosyayı da ön izleme olarak sunuyordu. Markdown'a görünmez çapa noktaları ekleyip PDF'teki karşılıklarına bağlayınca iki pencere neredeyse birebir senkron kayabiliyordu. (Tam yüzde 100 değil ama pratikte fazlasıyla yeterli.) Asıl PDF'te görünmemeleri için bu işaretleri dışa aktarmadan önce temizlemek de oldukça kolaydı.

Elbette bu sürecin kaba bir özeti; geliştirme boyunca sayısız ince ayar ve deneme yanılma vardı. Ama sonunda Tideflow doğdu ve ortaya çıkan şeyle gerçekten gurur duyuyorum.

Eğer merak ettiğiniz bir şey olursa ya da Tideflow'la ortaya harika bir iş çıkardıysanız — hatta sadece sohbet etmek isterseniz bile — denizburakkoca@gmail.com üzerinden her zaman ulaşabilirsiniz.
