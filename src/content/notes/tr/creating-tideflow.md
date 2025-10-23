---
title: "Markdown Neden Kullanılmalı?"
description: "Markdown'dan PDF'e dönüştürücü Tideflow'un oluşturulmasına yol açan iş akışına derinlemesine bir bakış."
date: 2025-10-24T00:00:00.000Z
lang: tr
show_on_homepage: true
---

## Markdown Neden Kullanılmalı?

Bu durum, 4-5 yıl önce, iş akışımda giderek daha fazla Markdown dosyasının belirmeye başladığını ilk fark ettiğimde başladı. Doğam gereği o zaman da, şimdi de çok meraklı bir kişiydim. Bu nedenle akademik çalışmalarla, Latince öğrenmekle, kodlama öğrenmekle ve bir şeyler yazmamı gerektirecek pek çok başka şeyle meşguldüm. Bir-iki yıl ileri sardığımızda, kendimi bu iş akışına yönelmiş buldum.

- Yazmak istediğiniz her şeyi biçimlendirme olmaksızın, düz metin olarak kaleme alın.
- Yapay zekaya, istediğiniz düzen ve biçimi içeren bir örnek belge sunun.
- Ardından, yapay zekadan içeriği değiştirmeksizin metni yeniden biçimlendirmesini ve düzeni düzeltmesini talep edin.

Büyük Dil Modelleri (BDM'ler) ilk yaygınlaşmaya başladığında bu durum başlangıçta tutarsızlık gösterse de, BDM'ler görevlerini daha iyi icra ettikçe elde edilen neticeler aşamalı olarak iyileşme kaydetti.

Tahmin edebileceğiniz üzere, bu iş akışının başlıca darboğazlarından biri metnin kendisinin aktarım süreciydi. İlk olarak Word kullanmayı deneyerek başladım ve içeriği kopyalama ve yapıştırma yolunu denedim. Metin dosyaları uzadıkça bu durum kısa sürede verimsizleşti (ve Word'ü yapması gereken iş için böylesine ağır ve hantal bir yazılım olarak hiç sevmem) – bu yüzden tüm docx dosyalarını göndermeyi denemeye geçtim, ancak bu da fayda etmedi; zira yapay zekalar Word belgeleriyle uyumlu çalışmıyor ve metin düzeni neredeyse kaçınılmaz olarak bozuluyordu. İşte o zaman markdown dosyalarını fark ettim. Bunlar, metni bir txt dosyası gibi saklayan küçük, kullanışlı dosyalardı. Aktarımı daha kolaydı ve nedense, yapay zekalar denediğim diğer metin biçimlerinden çok daha iyi çalışıyordu (ve sanırım bunun nedeni, Büyük Dil Modellerinin çok sayıda MD dosyasıyla eğitilmiş olmaları ve bu sayede onlarda rahatça gezinmeleriydi). Sonra ayrıca onların etrafında gelişen çeşitli ortamı öğrendim ve kendimi kaptırdım.

2022 yılından bu yana, başlıca metin biçimi olarak Markdown kullanıyorum. Özellikle de başlı başına olağanüstü bir yazılım olan Notepad++'a hayran kaldığımdan beri. Tüm ders notlarım, denemelerim, kurgusal evren tasarımlarım, günlüklerim ve benzerleri başlangıçta Markdown dosyaları olarak başlar; bunları daha sonra paylaşmak üzere başka bir biçime dönüştürürüm. Bunu yapmamın nedeni, başkalarının Markdown biçimine benim kadar sıcak bakmadığını fark etmemdir. İnsanların uzun metin yığınlarını okumayı sevmediğini kim bilebilirdi ki?

Yazım çıktım büyük ölçüde arttı ve (en azından yazım açısından) her zamankinden daha verimli oldum; ancak emeğimin ürününü başkalarıyla kolayca paylaşamadığınızda bu, anlamsız bir zafer oluyor. Titizlikle tuttuğum notlarım arkadaşlarım için okunması çok zor oluyordu; masaüstü rol yapma oyunu (TTRPG) serüvenim için hazırladığım kurgu notlarım da çoğunlukla aynı kaderi paylaştı. Md dosyalarımı çok daha paylaşılabilir PDF'lere dönüştürmek için sayısız çevirici denedim; ancak ne kadar arasam da, yazarken elde edeceğim son ürünü kolayca görebileceğim birini bulamadım.

Markdown'dan PDF'e dönüştürücülerin dünyasında, genel yöntem (ve bu iyi bir yöntemdir) markdown içeriğini biçimlendirilmiş bir HTML sayfasına çevirmek ve ardından yazdırma özelliğini kullanarak PDF olarak kaydetmek gibi görünmektedir. Bu yaklaşımda yanlış bir şey yoktur ve elde edeceğiniz şeye dair harika bir yaklaşık sonuç sunar. Ancak bu, nihayetinde bir yaklaşımdır ve dışa aktarılan PDF'i açana dek tam olarak ne elde edeceğinizi görmek neredeyse olanaksızdır. Bu tür yaklaşık önizleme ve görselleştirme başkaları için işe yarasa da, ben işimin küçük ayrıntılarına takıntılıyımdır, tıpkı bir sayfanın nerede bitip diğerinin nerede başladığı gibi. Markdown metnine elle sayfa sonları ekleyebilsem bile, HTML önizlemeleri bu durumu dışa aktarılana dek göstermezdi. Ve iyi PDF düzenleyicilerinin var olmadığını biliyor muydunuz? Gerçekten de, bir adım daha ekleyip PDF'leri kendim düzenlemeye razı olsam bile, PDF düzenlemek için iyi bir düzenleyici bulamadım.

Bu durum, iş akışımı sekteye uğrattı. Biraz mükemmeliyetçi olmak bunu size yapar. Yazmaya oturduğumda, yalnızca yazım işinin kendisine yoğunlaşmak isterim. En uygunu, düzen ve biçem kısmını halletmek için önceden saptanmış bazı biçemlere sahip olmaktı. Ve Markdown dosyalarıyla bu kusursuz iş akışını nasıl kuracağımı çözemedim. İşte o zaman fark ettim ki, iş akışıma uygun bir uygulama istiyorsam, tek akılcı seçeneğim sıfırdan yeni bir tür Markdown düzenleyici inşa etmekti. Çok net bir öngörüm vardı; tüm yazım ve biçimlendirme işlerimi aynı uygulama penceresinden ayrılmadan yapmak ve kendim için bir md dosyası ile paylaşım/yayımlama için hazır, biçimlendirilmiş bir PDF elde etmek istiyordum. Bu öngörüyle hızla bir uygulama taslağı çizdim;

- Solda, kullanıcıya uygun bir araç çubuğu barındıran, yalın bir işaretleme dili düzenleyici.
- Sağda, alacağınız çıktının birebir aynısını gösteren, doğru biçimde oluşturulmuş ve sayfalandırılmış bir PDF ön görünümü.
- Hazır biçemler ve kişiselleştirilebilir biçem seçenekleri içeren, kullanımı kolay bir tasarım seçenekleri listesi.

Bu fikri ana hatlarıyla belirten temel bir tasarım belgesi yazdım ve onu markdown biçiminde kaydettim. Ardından en iyi yaptığım şeyi yaparak sayısız yan konuya daldım; bunların bazıları ilgiliydi, bazıları ise değildi. Kısacası, son derece hızlı bir dönüştürücü olan Typst'te karar kıldım. Kendi dosya sistemini (.typ veya benzeri) kullanıyor ve belgeleri ışık hızında PDF'e çeviriyor. Ne yazık ki, Typst'in kendi düzenleyicisi de gerçek sayfalama özelliğine sahip değil ve aynı HTML'den baskıya dönüştürme yöntemine dayanıyor. Ancak bu inanılmaz hızlı oluşturma süresi bana bir fikir verdi. Dönüştürme neredeyse anlık gerçekleşiyorsa, neden bir yaklaşımla uğraşalım ki?

## Her şey bir eşinin eşinin eşidir...

Peki, hatırlarsınız ki çoğu Markdown'ı PDF'e çeviren araç, siz yazdıkça anında bir HTML önizlemesi oluşturur ve bunu bir yaklaşık olarak kullanır? Ben de düşündüm ki neden aracıyı aradan çıkarıp önizlemeyi doğrudan kaynaktan, yani PDF'ten almayalım?

Fikir şuydu ki, kullanıcı bir MD dosyası açtığı an (teknik açıdan, eğer PDF önizlemesi uygulamada gizli ise süreç biraz daha giriftleşir), uygulama onu arka planda kendiliğinden PDF olarak dışa aktarır ve bu geçici PDF dosyasını önizleme olarak kullanır.

Buna, Markdown'a PDF'teki yerlere denk düşen görünmez çapa noktaları yerleştirdiğimiz görünmez bir işleme katmanı da eklenince, iki pencerenin kusursuz (tam olarak değil, daha çok %70 isabetli ama yeterli) eşzamanlılıkta kaymasını sağlar ve işte size gerçek zamanlı PDF önizlemeli bir Markdown düzenleyiciye sahip olursunuz. (Elbette, düzgün bir biçimde dışa aktarmadan evvel bu çapa noktalarını temizlemeniz icap eder; ancak bu oldukça önemsiz bir ayrıntıdır.)

Elbette, bu sürecin aşırı bir basitleştirmesidir, ancak ana geliştirme esasen bu şekilde bir araya geldi. Son derece keyifli bir tasarıydı ve TideFlow'un sonucundan içtenlikle memnunum.

Gelişimi hakkında herhangi bir sorunuz olursa, ya da onu kullanarak kayda değer bir yapıt ortaya koyduysanız (ya da yalnızca onun hakkında konuşmak isterseniz), denizburakkoca@gmail.com üzerinden bize ulaşmaktan çekinmeyiniz.