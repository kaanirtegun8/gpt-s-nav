(function () {
  const SOURCE_LABELS = {
    genc: "Genç Yetişkinlik",
    orta: "Orta Yetişkinlik",
    ileri: "İleri Yetişkinlik",
    olum: "Ölüm ve Yas",
  };

  const C = (id, source, topic, term, definition, fill, aliases = []) => ({
    id,
    source,
    topic,
    term,
    definition,
    fill,
    aliases,
  });

  const CONCEPTS = [
    C("genc01", "genc", "Yetişkinliğe geçiş", "yetişkinliğe geçiş", "Ergenlikten yetişkinliğe geçişin yaklaşık 18-25 yaşları arasında kullanılan adı.", "Ergenlikten yetişkinliğe geçiş yaklaşık 18-25 yaşları arasında ____ kavramıyla ifade edilir.", ["emerging adulthood", "beliren yetişkinlik"]),
    C("genc02", "genc", "Yetişkinliğe geçiş", "deneme ve keşif", "Genç yetişkinlikte sürecin temel özelliği olarak vurgulanan arayış biçimi.", "Genç yetişkinlikte sürecin temel özellikleri ____ ve keşiftir.", ["deneme"]),
    C("genc03", "genc", "Yetişkinliğin belirleyicileri", "ekonomik bağımsızlık", "Yetişkinliğe geçişte okul sonrası sürekli tam zamanlı iş ve kendi geçimini sağlayabilme ölçütü.", "Yetişkinliğin önemli belirleyicilerinden biri ____ bağımsızlıktır."),
    C("genc04", "genc", "Yetişkinliğin belirleyicileri", "sorumluluk alma", "Bireyin yaptıklarının sorumluluğunu üstlenmesiyle ilişkili yetişkinlik ölçütü.", "Nelson ve arkadaşlarının çalışmasında yetişkinliğin önemli belirleyicilerinden biri bireyin ____ alabilmesidir."),
    C("genc05", "genc", "Arnett", "kimlik arayışı", "Jeffrey Arnett'in genç yetişkinlikte özellikle aşk ve iş alanında vurguladığı temel özellik.", "Arnett'e göre genç yetişkinlikte özellikle aşk ve iş konularında ____ görülür."),
    C("genc06", "genc", "Arnett", "kararsızlık", "Genç yetişkinlikte seçimlerin ve yaşam yönünün henüz oturmadığını anlatan Arnett özelliği.", "Arnett'in beş temel özelliğinden biri yaşam düzenindeki ____ durumudur."),
    C("genc07", "genc", "Arnett", "öze dönüklük", "Genç yetişkinin kendi yaşamı, hedefleri ve tercihleri üzerine yoğunlaşmasını anlatan Arnett özelliği.", "Arnett'in genç yetişkinlik özelliklerinden biri bireyin kendisine yönelmesini anlatan ____ kavramıdır."),
    C("genc08", "genc", "Arnett", "kararsız duygular", "Genç yetişkinlikte hem yetişkin hem de yetişkin değilmiş gibi hissetme halini anlatan özellik.", "Arnett'e göre genç yetişkinlikte bireyler ____ yaşayabilir."),
    C("genc09", "genc", "Arnett", "olasılıklar dönemi", "Bireyin yaşamını değiştirme fırsatlarını yakalayabildiği genç yetişkinlik niteliği.", "Genç yetişkinlik, yaşamı değiştirme fırsatlarının yakalanabildiği ____ olarak anlatılır."),
    C("genc10", "genc", "Fiziksel gelişim", "fiziksel performansın doruğu", "Fiziksel performansın çoğu bireyde 19-26 yaş arasında en üst düzeye ulaşması.", "Genç yetişkinlikte 19-26 yaş aralığı genellikle ____ dönemidir."),
    C("genc11", "genc", "Sağlık", "ergenlikten taşınan kötü sağlık alışkanlıkları", "Ergenlikte ortaya çıkıp genç yetişkinlikte sürdüğü belirtilen hareketsizlik, kötü beslenme ve madde kullanımı gibi alışkanlıklar.", "Hareketsizlik, kötü beslenme ve madde kullanımı gibi sorunlar çoğunlukla ____ genç yetişkinliğe taşınır."),
    C("genc12", "genc", "Sağlık", "obezite", "Vücut kitle endeksi 30 ve üzeri olan ve tansiyon, diyabet, kalp-damar hastalıklarıyla ilişkilendirilen yaygın sağlık sorunu.", "Vücut kitle endeksi 30 ve üzeri olduğunda tanımlanan yaygın sağlık sorunu ____ olarak adlandırılır."),
    C("genc13", "genc", "Sağlık", "leptin hormonu", "Obezite sorunundaki olası biyolojik nedenlerden biri olarak sayılan hormon.", "Obezitenin olası sebepleri arasında genetik ve metabolizma hızının yanında ____ hormonu da sayılır."),
    C("genc14", "genc", "Sağlık", "egzersiz", "Kilo kontrolünde en etkili diyet programlarının içine katılması gerektiği vurgulanan uygulama.", "Kilo vermede en etkili programlarda diyetin yanına ____ çalışmaları eklenir."),
    C("genc15", "genc", "Sağlık", "benlik algısını yükseltme", "Düzenli egzersizin zihinsel sağlığa katkılarından biri.", "Egzersiz anksiyete ve depresyonu azaltırken ____ yükseltir."),
    C("genc16", "genc", "Madde kullanımı", "alkolizm", "Sağlığa ve sosyal ilişkilere zarar veren, uzun süreli, kontrol dışı ve aşırı alkol tüketimi bozukluğu.", "Kontrol dışı, takıntılı ve aşırı alkollü içecek tüketimini içeren bozukluk ____ olarak adlandırılır."),
    C("genc17", "genc", "Madde kullanımı", "sigara ve nikotin", "Kanser, kalp hastalıkları ve akciğer hastalıkları ölümleriyle ilişkisi vurgulanan madde kullanımı alanı.", "Kanser ve akciğer hastalığı ölümleriyle güçlü ilişkisi vurgulanan başlık ____ kullanımıdır."),
    C("genc18", "genc", "Cinsellik", "cinsel yolla bulaşan hastalıklar", "Özellikle cinsel ilişki yoluyla bulaşan enfeksiyonları anlatan kavram.", "Cinsel ilişki yoluyla bulaşan enfeksiyonlar ____ olarak adlandırılır.", ["STI", "CYBH"]),
    C("genc19", "genc", "Cinsellik", "biseksüel", "Her iki cinsiyeti de cinsel olarak çekici bulan bireyleri ifade eden kavram.", "Her iki cinsiyeti de cinsel olarak çekici bulan bireyler ____ olarak ifade edilir."),
    C("genc20", "genc", "Cinsellik", "HIV", "AIDS'e sebep olan virüs.", "AIDS'e sebep olan virüs ____ olarak belirtilir."),
    C("genc21", "genc", "Cinsel şiddet", "tecavüz", "Karşı tarafın rızası olmadığı halde güç kullanılarak gerçekleştirilen cinsel ilişki.", "Karşı tarafın rızası olmadan güç kullanılarak gerçekleştirilen cinsel ilişki ____ olarak tanımlanır."),
    C("genc22", "genc", "Cinsel şiddet", "tanıdık tecavüzü", "Kişinin bildiği veya tanıdığı biri tarafından tecavüze uğraması.", "Kişinin tanıdığı biri tarafından tecavüze uğraması ____ olarak adlandırılır."),
    C("genc23", "genc", "Cinsel şiddet", "cinsel taciz", "Bir kişinin diğeri üzerinde cinsel içerikli söz, temas veya saldırı girişimleriyle güç sergilemesi.", "Cinsel içerikli ifadeler, fiziksel temas ya da saldırı girişimleriyle görülen güç kullanımı ____ olarak adlandırılır."),
    C("genc24", "genc", "Bilişsel gelişim", "Piaget'nin görüşü", "Genç yetişkinlerin ergenlere göre daha çok bilgiye sahip olduğunu, fakat niteliksel düşünce yapılarının benzer olduğunu savunan yaklaşım.", "Genç yetişkin ve ergen düşüncesinin niteliksel olarak benzer olduğunu savunan yaklaşım ____ ile ilişkilidir."),
    C("genc25", "genc", "Bilişsel gelişim", "gerçekçi ve pragmatik düşünme", "Genç yetişkinlerin yaşamın sınırlılıklarıyla karşılaşınca idealizmden uygulamaya yönelmesini anlatan düşünme biçimi.", "Yaşamın sınırlılıklarıyla karşılaşınca idealizmden uygulamaya yönelen düşünme biçimi ____ düşünmedir."),
    C("genc26", "genc", "Bilişsel gelişim", "yansıtıcı ve göreceli düşünme", "Perry'ye göre ergenlikteki kesin ve ikili düşüncenin yerini alan yetişkin düşünme biçimi.", "Perry'ye göre yetişkinlikte kesin ve ikili düşünmenin yerini ____ düşünme alır."),
    C("genc27", "genc", "Bilişsel gelişim", "formel işlemler sonrası düşünme", "Doğru cevabın duruma göre değişebileceğini ve arayışın bitmeyen bir süreç olduğunu kabul eden postformal düşünme.", "Doğru cevabın duruma göre değişebileceğini kabul eden postformal düzey ____ olarak adlandırılır.", ["postformal düşünme"]),
    C("genc28", "genc", "Yaratıcılık", "otuzlu yaşlar", "Lehman'ın çalışmasında en yaratıcı ürünlerin üretildiği yaş dönemi.", "Lehman'ın çalışmasına göre en yaratıcı ürünler çoğunlukla ____ yaşlarda üretilir."),
    C("genc29", "genc", "Kariyer", "hedeflere ulaşmanın yollarını bulmak", "Damon'ın vurguladığı, gençlerin eğitim ve kariyerde amaçsız kalmaması için gerekli yönelim.", "Damon'a göre gençlerin plansız ilerlememesi için ____ önemlidir."),
    C("genc30", "genc", "Kariyer", "mesleklerin geleceğini izlemek", "Değişen ekonomik koşullar nedeniyle ihtiyaç duyulacak meslekleri takip etme gereği.", "İş olanakları değiştiği için çeşitli alanlarda ihtiyaç duyulacak meslekleri ____ önemlidir."),
    C("genc31", "genc", "Kariyer", "işsizlik", "Geçici, dönemsel veya kalıcı olmasına bakılmaksızın strese ve çeşitli fiziksel-ruhsal sorunlara yol açan durum.", "Geçici ya da kalıcı olmasına bakılmaksızın strese yol açan çalışma durumu ____ olarak adlandırılır."),
    C("genc32", "genc", "Kariyer", "çift gelirli çiftler", "Her iki eşin de çalıştığı ve iş-yaşam dengesi sorunlarının arttığı çift yapısı.", "Her iki eşin de çalıştığı çiftler ____ olarak adlandırılır."),
    C("genc33", "genc", "İş yeri çeşitliliği", "cam tavan", "Kadınların ve azınlıkların başarılarına rağmen idari görevlere yükselmelerini engelleyen görünmez engeller.", "Kadınların ve azınlıkların yükselmesini engelleyen görünmez engel ____ olarak adlandırılır."),
    C("genc34", "genc", "Mizaç", "mizaç", "İnsanda kalıtsal olarak var olan ve göreli tutarlılık taşıyan temel eğilim.", "Kalıtsal, göreli tutarlı temel eğilim ____ olarak adlandırılır."),
    C("genc35", "genc", "Mizaç", "kolay mizaç", "Çocuklukta görüldüğünde genç yetişkinlikte daha başarılı uyumla ilişkilendirilen mizaç örüntüsü.", "Çocuklukta ____ örüntüsü sergileyenlerin genç yetişkinlikte daha başarılı uyum gösterdiği belirtilir."),
    C("genc36", "genc", "Mizaç", "zor mizaç", "Çocuklukta görüldüğünde genç yetişkinlikte uyum sorunlarıyla ilişkilendirilen mizaç örüntüsü.", "Çocuklukta ____ sahibi olanların genç yetişkinlikte uyum güçlüğü yaşayabildiği belirtilir."),
    C("genc37", "genc", "Mizaç", "engelleyici mizaç", "Çocuklukta görüldüğünde yetişkinlikte daha az atılganlık ve sosyal destekle ilişkilendirilen mizaç.", "Çocuklukta ____ mizaca sahip olanlar yetişkinlikte daha az atılgan olabilir."),
    C("genc38", "genc", "Bağlanma", "bağlanma", "Bebeklik yıllarında ortaya çıkan ve sosyoduygusal gelişimde önemli rol oynayan örüntü.", "Bebeklik yıllarında ortaya çıkan ve sosyoduygusal gelişimde önemli rol oynayan örüntü ____ olarak adlandırılır."),
    C("genc39", "genc", "Bağlanma", "güvenli bağlanma", "Yakın ilişki kurma konusunda rahat ve özerk olmayı içeren bağlanma biçimi.", "Yakın ilişki kurma konusunda rahat ve özerk olan bağlanma biçimi ____ bağlanmadır."),
    C("genc40", "genc", "Bağlanma", "saplantılı bağlanma", "Olumsuz benlik ve olumlu başkaları modeliyle ilişkili, ilişkilere takıntılı bağlanma biçimi.", "Olumsuz benlik ve olumlu başkaları modeliyle ilişkili bağlanma biçimi ____ bağlanmadır."),
    C("genc41", "genc", "Bağlanma", "kayıtsız bağlanma", "Olumlu benlik ve olumsuz başkaları modeliyle ilişkili, yakınlığa karşı kayıtsız ve bağımlılık karşıtı bağlanma biçimi.", "Yakınlığa kayıtsız ve bağımlılık karşıtı bağlanma biçimi ____ bağlanmadır."),
    C("genc42", "genc", "Bağlanma", "korkulu bağlanma", "Olumsuz benlik ve olumsuz başkaları modeliyle ilişkili, yakınlıktan korkan ve sosyal açıdan kaçınan bağlanma biçimi.", "Yakınlıktan korkan ve sosyal açıdan kaçınan bağlanma biçimi ____ bağlanmadır."),
    C("genc43", "genc", "Çekicilik", "tanıdıklık ve benzerlik", "Arkadaş ve sevgililerin çoğu zaman benzer tutum, değer, yaşam biçimi ve çekiciliğe sahip olmasını açıklayan etken.", "Arkadaş ve sevgililerde benzer tutum ve değerlerin çekici bulunması ____ ile açıklanır."),
    C("genc44", "genc", "Çekicilik", "kendini doğrulama", "Benzer tutum ve değerlere sahip kişilerle birlikteyken kendi tutumlarımızın desteklenmiş hissedilmesi.", "Başkasının tutumları bizimkine benzediğinde kendi tutumlarımızın desteklenmesine ____ denir."),
    C("genc45", "genc", "Çekicilik", "denklik hipotezi", "Gerçek yaşamda kendi fiziksel çekicilik düzeyimize yakın birini seçme eğilimi.", "Kendi çekicilik düzeyimize yakın birini seçme eğilimi ____ olarak adlandırılır."),
    C("genc46", "genc", "Aşk", "yakınlık", "Kendini açma ve özel düşüncelerin paylaşımıyla ilişkili temel ilişki unsuru.", "Kendini açma ve özel düşüncelerin paylaşımı ____ duygusunun temelidir.", ["samimiyet"]),
    C("genc47", "genc", "Aşk", "yakınlığa karşı yalıtılmışlık", "Erikson'a göre genç yetişkinlikte yakın ilişkiler geliştirme görevi ve başarısızlığında yaşanan yalnızlaşma.", "Erikson'a göre genç yetişkinlik krizi ____ dönemidir."),
    C("genc48", "genc", "Aşk", "romantik aşk", "Kuvvetli cinsellik içeren ve ilişkilerin ilk dönemlerinde baskın olan tutkulu aşk türü.", "Kuvvetli cinsellik içeren ve ilişkinin ilk dönemlerinde baskın olan aşk türü ____ aşktır."),
    C("genc49", "genc", "Aşk", "samimi aşk", "Yoldaş veya arkadaş aşkı olarak da ifade edilen, şefkat ve bağlılığın öne çıktığı aşk türü.", "Yoldaş ya da arkadaş aşkı olarak ifade edilen aşk türü ____ aşktır."),
    C("genc50", "genc", "Aşk", "Sternberg'in aşk üçgeni", "Aşkı tutku, samimiyet ve bağlanma boyutlarıyla açıklayan model.", "Tutku, samimiyet ve bağlanma boyutlarıyla aşkı açıklayan model ____ olarak bilinir."),
    C("genc51", "genc", "Yaşam biçimleri", "yalnız yetişkinler", "Bağımsız karar alma ve gizlilik avantajları yanında yalnızlıkla mücadele sorunları yaşayabilen yaşam biçimi.", "Bağımsızlık ve gizlilik avantajları olan, fakat yalnızlıkla mücadele sorunu doğurabilen grup ____ olarak adlandırılır."),
    C("genc52", "genc", "Yaşam biçimleri", "birlikte yaşayan yetişkinler", "Evlenmeden cinsel ilişkinin yaşandığı birliktelikleri kapsayan yaşam biçimi.", "Evlenmeden cinsel ilişkinin yaşandığı birliktelikler ____ yaşam biçimi içinde ele alınır."),
    C("genc53", "genc", "Boşanma", "boşanma risk faktörleri", "Genç yaşta evlilik, düşük eğitim, düşük gelir, alkolizm, şiddet ve sadakatsizlik gibi boşanma olasılığını artıran etmenler.", "Genç yaşta evlilik, düşük eğitim, alkolizm ve sadakatsizlik gibi etmenler ____ artırır."),
    C("genc54", "genc", "Evlilik", "Gottman'ın yedi ilkesi", "Aşk haritası oluşturma, hayranlığı besleme, yakınlaşma, etkilenmeye izin verme ve çatışmaları çözme gibi başarılı evlilik ilkeleri.", "Başarılı evlilik için aşk haritası oluşturma ve çatışmaları çözme gibi maddeler ____ içinde yer alır."),
    C("genc55", "genc", "İletişim", "uyuma dayalı konuşma", "Tannen'e göre bağların oluşturulması ve ilişki müzakeresinin esas olduğu konuşma biçimi.", "Tannen'e göre bağ kurmaya ve ilişkiyi müzakere etmeye dönük konuşma ____ konuşmadır.", ["rapport talk"]),
    C("genc56", "genc", "İletişim", "resmi konuşma", "Tannen'e göre bilgi vermenin esas olduğu konuşma biçimi.", "Tannen'e göre bilgi vermenin esas olduğu konuşma ____ konuşmadır.", ["report talk"]),

    C("orta01", "orta", "Tanım", "orta yetişkinlik", "Yaklaşık 40-45 yaşlarında başlayıp 60-65 yaşlarına kadar uzayan gelişim dönemi.", "Yaklaşık 40-45 yaşlarında başlayıp 60-65 yaşlarına kadar uzayan dönem ____ olarak adlandırılır."),
    C("orta02", "orta", "Tanım", "değişen orta yaş", "Günümüzde 50 yaşındakilerin önceki kuşaklara göre daha zinde ve üretken görünmesini anlatan olgu.", "Orta yaş sınırlarının sağlık ve tıp gelişmeleriyle yukarı çekilmesi ____ olgusuyla ilişkilidir."),
    C("orta03", "orta", "Tanım", "yaş kimliği", "Yetişkinlerin kendilerini kronolojik yaşlarından daha genç algılamasıyla ilişkili kavram.", "Yetişkinlerin kendilerini kronolojik yaşlarından daha genç görmesi ____ ile ilişkilidir."),
    C("orta04", "orta", "Tanım", "uyanma zili", "Orta yaşta ciddi kaza, kayıp ya da hastalığın öncelikleri yeniden değerlendirmeye yol açması.", "Orta yaşta ciddi kaza, kayıp ya da hastalık bazen ____ etkisi yaratır."),
    C("orta05", "orta", "Fiziksel gelişim", "yavaş fiziksel değişim", "Orta yaşta fiziksel değişimlerin ergenlikteki ani değişimlerden ve yaşlılıktaki bozulmadan daha yavaş olması.", "Orta yaşta fiziksel değişimler genellikle ____ biçimde gerçekleşir."),
    C("orta06", "orta", "Fiziksel gelişim", "kollajen ve yağ kaybı", "Cildin kırışması ve sarkmasının altında yatan dokusal değişim.", "Orta yaşta cilt kırışması ve sarkmasında dokuların altındaki ____ kaybı etkilidir."),
    C("orta07", "orta", "Fiziksel gelişim", "sarcopenia", "Yaşla ilişkili kas kütlesi ve güç kaybı.", "Yaşla ilişkili kas kütlesi ve güç kaybı ____ olarak adlandırılır."),
    C("orta08", "orta", "Fiziksel gelişim", "kemik erimesi", "Orta yaşta başlayabilen ve kemik yoğunluğunun azalmasıyla ilişkili fiziksel değişim.", "Orta yaşta eklem ve kemik değişimleri arasında ____ başlaması sayılır.", ["osteoporoz"]),
    C("orta09", "orta", "Duyu", "göz uyumunun düşmesi", "40-59 yaşları arasında yakın nesneleri görmeyi zorlaştıran görsel değişim.", "40-59 yaşları arasında yakın nesneleri görmeyi zorlaştıran değişim göz ____ düşmesidir."),
    C("orta10", "orta", "Duyu", "duyma kaybı", "40'lı yaşlarda başlayıp 50 yaş üstünde daha sık görülen duyusal azalma.", "40'lı yaşlarda başlayan ve 50 yaş üstünde sıklaşan duyusal azalma ____ kaybıdır."),
    C("orta11", "orta", "Sağlık", "kronik hastalıklar", "Yavaş başlayan ve uzun süren, orta yetişkinlikte artıp ileri yetişkinlikte yaygınlaşan hastalıklar.", "Yavaş başlayan ve uzun süren hastalıklar ____ olarak tanımlanır."),
    C("orta12", "orta", "Sağlık", "kronik bozukluklar", "Enfeksiyon hastalıklarının azalmasıyla orta yetişkinlikte temel ölüm nedeni haline gelen bozukluklar.", "Enfeksiyonlar azaldıkça orta yetişkinlikte temel ölüm nedeni ____ olmuştur."),
    C("orta13", "orta", "Sağlık", "stresin bağışıklığa etkisi", "Stresin bağışıklık ve kardiyovasküler sistem üzerinde olumsuz sonuçlar doğurması.", "Orta yetişkinlikte ____ bağışıklık ve kardiyovasküler sistemi olumsuz etkiler."),
    C("orta14", "orta", "Cinsellik", "klimakterik", "Doğurganlığın azaldığı orta yaşa geçişi tanımlayan terim.", "Doğurganlığın azaldığı orta yaşa geçiş ____ olarak adlandırılır."),
    C("orta15", "orta", "Cinsellik", "menopoz", "Kadının menstrüel döneminin tamamen bitmesi; ortalama 51 yaş civarında yaşanır.", "Kadının menstrüel döneminin tamamen bitmesi ____ olarak adlandırılır."),
    C("orta16", "orta", "Cinsellik", "östrojen azalması", "Menopozda sıcak basması, yorgunluk ve hızlı kalp atışı gibi belirtilerle ilişkili ani hormonal düşüş.", "Menopozda yumurtalıkların ürettiği ____ aniden azalır."),
    C("orta17", "orta", "Cinsellik", "testosteron düşüşü", "Erkeklerde orta yetişkinlik boyunca yılda yaklaşık yüzde bir oranında görülen hormonal azalma.", "Orta yaşlı erkeklerde ____ üretimi yılda yaklaşık yüzde bir düşer."),
    C("orta18", "orta", "Cinsellik", "erektil fonksiyon bozukluğu", "Tatmin edici cinsel performans için ereksiyonun sağlanamaması ya da sürdürülememesi.", "Ereksiyonun sağlanamaması ya da sürdürülememesi ____ olarak adlandırılır."),
    C("orta19", "orta", "Bilişsel gelişim", "kristalize zeka", "Bireyin birikmiş bilgisi ve sözel becerisi olarak tanımlanan, orta yetişkinlikte artmaya devam eden zeka türü.", "Birikmiş bilgi ve sözel beceriye dayalı zeka türü ____ zekadır."),
    C("orta20", "orta", "Bilişsel gelişim", "akıcı zeka", "Soyut muhakeme becerisi olarak tanımlanan ve orta yetişkinlikte düşmeye başlayan zeka türü.", "Soyut muhakeme becerisi olarak tanımlanan zeka türü ____ zekadır."),
    C("orta21", "orta", "Bilişsel gelişim", "Seattle Boylamsal Çalışması", "K. Warner Schaie tarafından başlatılan ve yetişkinlikte zihinsel yetenekleri 7 yıllık aralıklarla izleyen çalışma.", "Yetişkinlikte zihinsel yetenekleri 7 yıllık aralıklarla izleyen çalışma ____ çalışmasıdır."),
    C("orta22", "orta", "Bilişsel gelişim", "algısal hız", "Seattle çalışmasında orta yaşta düşen ve ilk yetişkinlikte azalmaya başlayan temel yetenek.", "Seattle çalışmasında en erken düşüş gösteren yetenek ____ hızdır."),
    C("orta23", "orta", "Bilişsel gelişim", "sözel yetenek", "Seattle çalışmasında orta yaşta en yüksek performans görülen zihinsel yeteneklerden biri.", "Seattle çalışmasına göre orta yaşta zirve yapan yeteneklerden biri ____ yetenektir."),
    C("orta24", "orta", "Bilgi işleme", "bilgi işleme hızı", "Orta yaşta ışığa tepki verme gibi görevlerde genç yetişkinlere göre yavaşlama gösteren süreç.", "Reaksiyon zamanı görevleri çoğu kez ____ ölçmek için kullanılır."),
    C("orta25", "orta", "Bilgi işleme", "çalışma belleği", "Karar verirken, problem çözerken ve dili anlarken bilginin tutulup değişimlendiği zihinsel iş tezgahı.", "Bilginin tutulup değişimlendiği zihinsel iş tezgahı ____ belleğidir."),
    C("orta26", "orta", "Bilgi işleme", "uzmanlık", "Belirli bir alanı anlamayı sağlayan geniş ve organize bilginin, yıllar süren deneyim ve çabayla oluşması.", "Yıllar süren deneyim ve çabayla oluşan geniş organize bilgi ____ olarak adlandırılır."),
    C("orta27", "orta", "Bilgi işleme", "pratik problem çözme", "Günlük problemleri çözme ve karar verme becerisi; orta yaşta sabit kalabilir, ileri yaşta düşer.", "Günlük problemleri çözme becerisi ____ problem çözmedir."),
    C("orta28", "orta", "Kariyer", "orta yaşta iş değerlendirmesi", "Orta yaşta insanların yaptıkları işi ve gelecekte yapmak istediklerini ölçüp düşünmesi.", "Orta yaş birçok insan için yaptığı işi ve geleceğini ____ zamanıdır."),
    C("orta29", "orta", "Kariyer", "kariyer değişikliği", "Orta yaşta iş ya da kariyer değiştirmeye karar verme, aile-iş dengesi ve emeklilik planlarıyla ilişkili konu.", "Orta yaşta iş ya da kariyer değiştirmeye karar verme ____ sorunları içinde ele alınır."),
    C("orta30", "orta", "Boş zaman", "boş zaman etkinlikleri", "Emekliliğe psikolojik hazırlığın ve daha az stresli geçişin önemli parçası olan yapılandırılmış uğraşlar.", "Emekliliğe daha az stresli geçiş için yapılandırılmış ____ etkinlikleri önemlidir."),
    C("orta31", "orta", "Din", "dinsellik", "MacArthur çalışmasında orta yaşlı yetişkinlerin çoğunun hayatlarının önemli parçası olarak gördüğü alan.", "MacArthur çalışmasında orta yaşlı yetişkinlerin çoğu ____ hayatlarının önemli parçası olarak görür."),
    C("orta32", "orta", "Din", "anlamlandırma yoluyla başa çıkma", "Stresli durumun anlamını değiştirmek için inanç, değer ve amaçlardan yararlanma.", "Stresli durumun anlamını inanç, değer ve amaçlarla değiştirme ____ yoluyla başa çıkmadır."),
    C("orta33", "orta", "Yaşam anlamı", "hayatın anlamı", "Amaca, değerlere, yeterlilik hissine ve benlik değerine duyulan ihtiyaçlarla açıklanan arayış.", "Baumeister ve Vohs'a göre amaç, değer, yeterlilik ve benlik değeri ihtiyaçları ____ arayışını oluşturur."),
    C("orta34", "orta", "Erikson", "üretkenliğe karşı verimsizlik", "Erikson'un orta yetişkinlik döneminde gelecek nesillere miras bırakma isteği ile durgunluk arasında kurduğu kriz.", "Erikson'a göre orta yetişkinlik krizi ____ dönemidir."),
    C("orta35", "orta", "Erikson", "üretkenlik", "Yetişkinlerin gelecek nesillere miras bırakma isteğini kapsayan Erikson kavramı.", "Gelecek nesillere miras bırakma isteği ____ olarak adlandırılır."),
    C("orta36", "orta", "Levinson", "orta yaş geçişi", "Levinson'a göre yaklaşık 40-45 yaş arasında süren ve dört büyük çatışmayla baş etmeyi gerektiren geçiş.", "Levinson'a göre 40-45 yaş arasında yaşanan süreç ____ geçişidir."),
    C("orta37", "orta", "Levinson", "gençliğe karşı yaşlılık", "Levinson'un orta yaş geçişinde baş edilmesi gerektiğini söylediği dört büyük çatışmadan biri.", "Levinson'un çatışmalarından biri gençliğe karşı ____ çatışmasıdır."),
    C("orta38", "orta", "Levinson", "yıkıcılığa karşı yapıcılık", "Levinson'un orta yaş geçişindeki temel zıtlıklardan biri.", "Levinson'a göre orta yaş çatışmalarından biri yıkıcılığa karşı ____ çatışmasıdır."),
    C("orta39", "orta", "Orta yaş krizi", "orta yaş krizi", "Levinson'un yaygın gördüğü, Vaillant'ın ise azınlıkta yaşandığını savunduğu orta yaş sarsıntısı.", "Levinson'un kriz olarak gördüğü fakat Vaillant'ın küçük bir azınlıkla sınırladığı dönem ____ krizidir."),
    C("orta40", "orta", "Yaşam olayları", "yaşam olayları yaklaşımı", "Eşin ölümü, boşanma ve evlilik gibi olayların stres düzeyleriyle kişilik gelişimini etkilediğini vurgulayan yaklaşım.", "Evlilik, boşanma ve eşin ölümü gibi olayların etkisine odaklanan yaklaşım ____ yaklaşımıdır."),
    C("orta41", "orta", "Yaşam olayları", "çağdaş yaşam olayları yaklaşımı", "Bir olayın etkisinin olayın kendisine ek olarak uyum, yaşam dönemi ve sosyo-tarihsel bağlama bağlı olduğunu savunan yaklaşım.", "Olay etkisini uyum, yaşam dönemi ve sosyo-tarihsel bağlamla açıklayan yaklaşım ____ yaşam olayları yaklaşımıdır."),
    C("orta42", "orta", "Kontrol", "kişisel kontrol", "Bireyin yaşamını kontrol ettiği duygusu; yaşla birlikte azalma eğilimi gösterir.", "Yaşamını yönetebildiği duygusu ____ kontrol olarak adlandırılır."),
    C("orta43", "orta", "Bağlam", "kuşak etkisi", "Aynı dönemde doğan bireylerin tarihsel dönem ve sosyal beklentilerden benzer biçimde etkilenmesi.", "Aynı dönemde doğan bireylerin tarihsel koşullardan etkilenmesi ____ etkisidir."),
    C("orta44", "orta", "Bağlam", "sosyal saat", "Bireylerden evlenmek, çocuk yapmak ya da kariyer kurmak gibi yaşam görevlerini belirli zamanda yerine getirmelerinin beklenmesi.", "Evlilik, çocuk ve kariyer gibi görevlerin beklenen zaman dilimi ____ saat olarak adlandırılır."),
    C("orta45", "orta", "Kişilik", "Beş Büyük kişilik faktörü", "Costa ve McCrae'nin açıklık, sorumluluk, dışa dönüklük, yumuşak başlılık ve nevrotizm boyutlarına dayalı kişilik yaklaşımı.", "Costa ve McCrae kişiliği ____ faktör üzerinden inceler."),
    C("orta46", "orta", "Kişilik", "Baltimore Çalışması", "Costa ve McCrae'nin 20-90 yaş arası üniversite mezunlarında kişilik stabilitesini izlediği çalışma.", "Costa ve McCrae'nin kişilik stabilitesini incelediği çalışma ____ çalışmasıdır."),
    C("orta47", "orta", "Kişilik", "Berkeley Boylamsal Çalışması", "En stabil özelliklerin entelektüel yönelim, özgüven ve yeni deneyimlere açıklık olduğunu gösteren çalışma.", "En stabil özellikler arasında entelektüel yönelim ve özgüveni gösteren çalışma ____ boylamsal çalışmasıdır."),
    C("orta48", "orta", "Kişilik", "Mills Üniversitesi Çalışması", "Helson'un yaşça büyük kadınları 30'lu, 40'lı ve 50'li yaşlarda izlediği çalışma.", "Helson'un kadınları yetişkinlik boyunca izlediği çalışma ____ Üniversitesi çalışmasıdır."),
    C("orta49", "orta", "Kişilik", "Grant Study", "Vaillant'ın sosyal olarak avantajlı Harvard mezunlarını kapsayan boylamsal örneği.", "Vaillant'ın Harvard mezunlarını kapsayan örneği ____ olarak bilinir."),
    C("orta50", "orta", "Aile", "boş yuva sendromu", "Çocuklar evden ayrıldıktan sonra bazı ebeveynlerde evlilik doyumunun azalmasıyla ilişkili durum.", "Çocuklar evden ayrıldıktan sonra yaşanabilen doyum azalması ____ sendromudur."),
    C("orta51", "orta", "Aile", "boş yuvanın yeniden doldurulması", "Yetişkin çocukların mezuniyet, iş biriktirme, başarısız kariyer ya da boşanma sonrası eve dönmesi.", "Yetişkin çocukların yeniden aile evine dönmesi ____ olarak ifade edilir."),
    C("orta52", "orta", "Aile", "kardeş ilişkileri", "Çoğu yetişkinin yaşamı boyunca süren ve maddi-manevi destek içerebilen ilişkiler.", "Yetişkinlikte yaşam boyu sürebilen ve destek içerebilen aile ilişkileri ____ ilişkileridir."),
    C("orta53", "orta", "Aile", "büyük ebeveynlik", "Yaşam süresinin uzamasıyla torunların yaşamında daha uzun ve önemli rol üstlenen aile konumu.", "Yaşam süresinin uzamasıyla doğası değişen torun ilişkili rol ____ olarak adlandırılır."),
    C("orta54", "orta", "Aile", "nesillerarası ilişkiler", "Orta yaş yetişkinlerinin genç ve yaşlı kuşaklar arasında deneyim ve değer aktarımı yapması.", "Orta yaşlı yetişkinlerin genç ve yaşlı kuşaklara değer aktarması ____ ilişkiler kapsamındadır."),

    C("ileri01", "ileri", "Uzun ömür", "yaşam uzamı", "Bir kişinin yaşayabileceği maksimum yıl sayısı; insan için yaklaşık 120-125 yıl olarak belirtilir.", "Bir kişinin yaşayabileceği maksimum yıl sayısı ____ olarak adlandırılır."),
    C("ileri02", "ileri", "Uzun ömür", "yaşam beklentisi", "Belirli bir yılda doğan ortalama bir insanın yaşayabileceği yıl sayısı.", "Belirli bir yılda doğan ortalama insanın yaşayabileceği yıl sayısı ____ olarak adlandırılır."),
    C("ileri03", "ileri", "Yaş kategorileri", "genç-yaşlı", "65 ila 74 yaş arasındaki yaşlı yetişkin kategorisi.", "65-74 yaş arası grup ____ olarak adlandırılır."),
    C("ileri04", "ileri", "Yaş kategorileri", "yaşlı-yaşlı", "75 ila 84 yaş arasındaki yaşlı yetişkin kategorisi.", "75-84 yaş arası grup ____ olarak adlandırılır."),
    C("ileri05", "ileri", "Yaş kategorileri", "en yaşlı-yaşlı", "85 yaş ve üzerindeki yaşlı yetişkin kategorisi.", "85 yaş ve üzeri grup ____ olarak adlandırılır."),
    C("ileri06", "ileri", "Yaş kategorileri", "işlevsel yaş", "Kronolojik yaştan çok biyolojik ve psikolojik işlevselliğe göre yaşlılığı değerlendirme biçimi.", "Yaşlanma uzmanları kategorileri kronolojik yaştan çok ____ açısından ele almayı tercih eder."),
    C("ileri07", "ileri", "Yaşlanma kuramları", "yaşlanmanın evrimsel kuramı", "Doğal seçilimin üreme gücüyle bağlantılı olması nedeniyle ileri yaşlardaki zararlı özellikleri ayıklamadığını savunan kuram.", "Doğal seçilimin yaşlılıktaki zararlı özellikleri ayıklamadığını savunan kuram ____ kuramıdır."),
    C("ileri08", "ileri", "Yaşlanma kuramları", "hücresel saat kuramı", "Hayflick'in insan hücresinin en fazla yaklaşık 75-80 kez bölünebildiği görüşüne dayanan kuram.", "Hayflick'in hücrelerin sınırlı sayıda bölünebildiği görüşü ____ kuramıdır."),
    C("ileri09", "ileri", "Yaşlanma kuramları", "Hayflick sınırı", "İnsan hücresinin yaklaşık 75-80 kez bölünebilmesiyle ilgili sınır.", "İnsan hücresinin yaklaşık 75-80 kez bölünebilmesi ____ sınırıyla ilişkilidir."),
    C("ileri10", "ileri", "Yaşlanma kuramları", "telomer", "Kromozom uçlarını örten ve her hücre bölünmesinde kısalan DNA dizileri.", "Kromozom uçlarını örten ve hücre bölünmesiyle kısalan DNA dizileri ____ olarak adlandırılır."),
    C("ileri11", "ileri", "Yaşlanma kuramları", "serbest radikal kuramı", "Kararsız oksijen moleküllerinin DNA ve hücresel yapılara zarar vermesiyle yaşlanmayı açıklayan kuram.", "Kararsız oksijen moleküllerinin hücrelere zarar vermesiyle yaşlanmayı açıklayan kuram ____ kuramıdır."),
    C("ileri12", "ileri", "Yaşlanma kuramları", "mitokondrial kuram", "Enerji sağlayan mitokondrilerin bozulmasının yaşlanmaya yol açtığını savunan kuram.", "Mitokondrilerin bozulmasının yaşlanmaya yol açtığını savunan kuram ____ kuramdır."),
    C("ileri13", "ileri", "Yaşlanma kuramları", "hormonal stres kuramı", "Hormonal sistemdeki yaşlanmanın strese direnci azaltıp hastalık olasılığını artırdığını savunan kuram.", "Hormonal sistemdeki yaşlanmanın strese direnci azalttığını savunan kuram ____ kuramıdır."),
    C("ileri14", "ileri", "Beyin", "prefrontal korteksin büzüşmesi", "İleri yetişkinlikte çalışma belleğini zayıflatabilen beyin değişimi.", "İleri yetişkinlikte çalışma belleğini zayıflatabilen değişim ____ büzüşmesidir."),
    C("ileri15", "ileri", "Beyin", "asetilkolin azalması", "Alzheimer hastalığıyla ilişkili ağır bellek kaybında sorumlu olabileceği belirtilen nörotransmitter azalması.", "Alzheimer ile ilişkili ağır bellek kaybında ____ azalması sorumlu olabilir."),
    C("ileri16", "ileri", "Beyin", "nörojenez", "Yetişkin insanlarda da meydana gelebildiği kabul edilen yeni nöron üretimi.", "Yeni nöronların üretimi ____ olarak adlandırılır."),
    C("ileri17", "ileri", "Beyin", "beyin lateralizasyonunda değişim", "Yaşlı yetişkinlerin bazı görevlerde iki yarımküreyi de kullanma eğilimi göstermesiyle ilişkili uyum.", "Yaşlı yetişkinlerin bazı görevlerde iki yarımküreyi kullanması ____ değişimiyle ilişkilidir."),
    C("ileri18", "ileri", "Sağlık", "bağışıklık sistemi", "Uzayan stres ve azalan yenileyici süreçlerden etkilenen yaşlılık sistemi.", "Yaşlı yetişkinlerde uzayan stres ve azalan yenilenme ____ sistemini etkiler."),
    C("ileri19", "ileri", "Duyu", "görsel keskinlik azalması", "Yaşlanmayla birlikte renk görme ve derinlik algısıyla birlikte düşen görsel işlev.", "Yaşlanmayla birlikte renk görme ve derinlik algısının yanında ____ azalır."),
    C("ileri20", "ileri", "Duyu", "katarakt", "Yaşlı yetişkinlerin görmesini zayıflatabilecek üç temel göz hastalığından biri.", "Yaşlılıkta görmeyi zayıflatabilecek göz hastalıklarından biri ____ olarak adlandırılır."),
    C("ileri21", "ileri", "Duyu", "glokom", "Yaşlı yetişkinlerin görmesini zayıflatabilecek üç temel göz hastalığından biri.", "Yaşlılıkta görmeyi zayıflatabilecek göz hastalıklarından biri ____ olarak adlandırılır."),
    C("ileri22", "ileri", "Duyu", "maküler dejenerasyon", "Yaşlı yetişkinlerde görmeyi zayıflatabilecek göz hastalıklarından biri.", "Yaşlılıkta görmeyi zayıflatabilecek göz hastalıklarından biri ____ olarak adlandırılır."),
    C("ileri23", "ileri", "Duyu", "işitme zayıflaması", "75 yaş ve üzerindekilerde 65-74 yaş grubuna göre daha fazla görülen duyusal kayıp.", "75 yaş ve üzerinde belirginleşen duyusal kayıplardan biri ____ zayıflamasıdır."),
    C("ileri24", "ileri", "Dolaşım", "yüksek tansiyon", "80 yaş civarındaki erkek ve kadınlarda sık görülen dolaşım sistemi sorunu.", "İleri yetişkinlikte dolaşım sistemi sorunlarından biri ____ olarak belirtilir."),
    C("ileri25", "ileri", "Akciğer", "akciğer kapasitesinin azalması", "20 ila 80 yaşları arasında hastalık olmasa bile yaklaşık yüzde 40 azalan kapasite.", "20-80 yaşları arasında hastalık olmasa bile ____ kapasitesi yaklaşık yüzde 40 azalır."),
    C("ileri26", "ileri", "Sağlık", "kronik hastalıklar", "Erken yetişkinlikte nadir, orta yetişkinlikte artan ve ileri yetişkinlikte daha sık görülen hastalıklar.", "Erken yetişkinlikte nadir, ileri yetişkinlikte sık görülen yavaş seyirli hastalıklar ____ hastalıklardır."),
    C("ileri27", "ileri", "Sağlık", "arterit", "Özellikle yaşlı yetişkinlerde ağrı, sertlik ve hareket sorunlarıyla gelişen eklem iltihabı.", "Yaşlılarda ağrı, sertlik ve hareket sorunlarıyla görülen eklem iltihabı ____ olarak adlandırılır."),
    C("ileri28", "ileri", "Sağlık", "osteoporoz", "Yoğun kemik dokusu kaybıyla gelişen ve özellikle kadınların yatkın olduğu kronik rahatsızlık.", "Yoğun kemik dokusu kaybıyla gelişen kronik rahatsızlık ____ olarak adlandırılır."),
    C("ileri29", "ileri", "Madde kullanımı", "ilaç etkileşimi", "Yaşlılarda alkolün sakinleştirici ya da yatıştırıcılarla birleştiğinde solunumu bozabilmesi gibi risk.", "Yaşlılarda alkolün sakinleştiricilerle birlikte kullanımı tehlikeli ____ riski oluşturur."),
    C("ileri30", "ileri", "Egzersiz", "aerobik aktivite", "Gerontologların yaşlı yetişkinler için esneme ve güç antrenmanlarıyla birlikte tavsiye ettiği etkinlik.", "Gerontologlar yaşlı yetişkinlere esneme ve güç antrenmanlarının yanında ____ aktivite önerir."),
    C("ileri31", "ileri", "Egzersiz", "egzersiz ve uzun ömür", "İleri yetişkinlikte egzersizin uzun ömür, kronik hastalıkların önlenmesi ve bilişsel işlevsellikle ilişkilendirilmesi.", "İleri yetişkinlikte ____ uzun ömür ve kronik hastalıkların önlenmesiyle ilişkilidir."),
    C("ileri32", "ileri", "Beslenme", "kalori kısıtlaması", "Hayvan çalışmalarında yaşamı uzattığı görülen, yeterli protein-vitamin-mineral içeren düşük kalorili beslenme.", "Yeterli besin öğesiyle birlikte düşük kalori alımı ____ olarak adlandırılır."),
    C("ileri33", "ileri", "Beslenme", "antioksidanlar", "C vitamini, E vitamini ve beta karoteni içeren, yaşlanma sürecini yavaşlatma tartışmalarında geçen vitamin grubu.", "C vitamini, E vitamini ve beta karotenin dahil olduğu grup ____ olarak adlandırılır."),
    C("ileri34", "ileri", "Bilişsel gelişim", "bilişsel mekanikler", "Zihnin donanımı; duyusal girdi, görsel-motor bellek, ayırt etme ve hız-doğruluk süreçleri.", "Zihnin donanımı olarak tanımlanan bilişsel boyut ____ mekaniklerdir."),
    C("ileri35", "ileri", "Bilişsel gelişim", "bilişsel pragmatikler", "Zihnin kültüre dayalı yazılım programları; okuma, dil, eğitim, meslek ve yaşam becerileri.", "Zihnin kültüre dayalı yazılım programları ____ pragmatiklerdir."),
    C("ileri36", "ileri", "Dikkat", "seçici dikkat", "Yaşantının belirli bir yönüne odaklanırken ilgisiz kısımları görmezden gelme.", "İlgisiz uyaranları görmezden gelip belirli bir yöne odaklanma ____ dikkattir."),
    C("ileri37", "ileri", "Dikkat", "bölünmüş dikkat", "Aynı anda birden fazla faaliyete konsantre olma.", "Aynı anda birden fazla faaliyete odaklanma ____ dikkattir."),
    C("ileri38", "ileri", "Dikkat", "sürekli dikkat", "Bir nesne, görev ya da çevre yönüne uzun süre odaklanmayı sürdürme.", "Bir göreve uzun süre odaklanmayı sürdürme ____ dikkattir."),
    C("ileri39", "ileri", "Bellek", "episodik bellek", "Yaşam olaylarının nerede ve ne zaman olduğuyla ilgili bilginin korunması.", "Yaşam olaylarının nerede ve ne zaman olduğuyla ilgili bilgi ____ bellektir."),
    C("ileri40", "ileri", "Bellek", "anlamsal bellek", "İnsanın dünya hakkındaki genel bilgilerini ve uzmanlık bilgilerini içeren bellek.", "Dünya hakkındaki genel bilgi ve uzmanlık bilgileri ____ bellekte yer alır."),
    C("ileri41", "ileri", "Bellek", "dilimin ucunda fenomeni", "Yaşlılarda yaygın görülen, kelimeyi bilip konuşma sırasında geri çağırmada zorlanma.", "Kelimeyi bilip konuşma sırasında hatırlayamama ____ fenomenidir.", ["DUF"]),
    C("ileri42", "ileri", "Bellek", "bilişsel kaynaklar", "Çalışma belleği ve algısal hız gibi, bilişsel görevlere tahsis edilen sınırlı kaynaklar.", "Çalışma belleği ve algısal hız, önemli ____ kaynaklardır."),
    C("ileri43", "ileri", "Bilgelik", "bilgelik", "Yaşamın uygulamaya dönük boyutlarında, önemli konularda doğru yargılar yapmayı sağlayan uzmanlık düzeyi bilgi.", "Önemli konularda doğru yargılamayı sağlayan yaşam bilgisi ____ olarak adlandırılır."),
    C("ileri44", "ileri", "Bilişsel koruma", "kullan ya da kaybet", "Bilişsel becerilerin kullanılmamasıyla atrofiyi açıklayan ve zihinsel etkinliği öneren kavram.", "Bilişsel beceriler için kitap okuma ve bulmaca çözmeyi destekleyen kavram ____ ilkesidir."),
    C("ileri45", "ileri", "Bilişsel eğitim", "bilişsel becerilerin eğitimi", "Willis ve arkadaşlarının muhakeme, bellek ve işleme hızı eğitimlerinin kendi alanlarında gelişme sağladığını göstermesi.", "Willis çalışmasında muhakeme, bellek ve işleme hızı alanlarında ____ yapılabileceğini gösterir."),
    C("ileri46", "ileri", "Bilişsel nörobilim", "bilişsel nörobilim", "Beyin ve bilişsel işlevler arasındaki ilişkileri fMRI, PET ve DTI gibi tekniklerle inceleyen disiplin.", "Beyin ve bilişsel işlev ilişkisini görüntüleme teknikleriyle inceleyen disiplin ____ nörobilimdir."),
    C("ileri47", "ileri", "Dil", "kelime geri çağırma güçlüğü", "İleri yetişkinlikte kelime bilgisi korunurken konuşmada kelimeleri bulmada görülebilen zorluk.", "İleri yetişkinlikte kelime bilgisi korunsa da konuşmada ____ güçlüğü görülebilir."),
    C("ileri48", "ileri", "Emeklilik", "emekliliğe uyum", "Emekliliğin bir olay değil süreç olması; esneklik, planlama ve uygulamayla ilişkili uyum.", "Emeklilik bir olaydan çok süreçtir; bu süreçte ____ önemlidir."),
    C("ileri49", "ileri", "Zihinsel sağlık", "majör depresyon", "Son derece üzgün, moralsiz, kendini aşağılayıcı ve isteksiz olma ile tanımlanan duygudurum bozukluğu.", "Son derece üzgün, moralsiz ve isteksiz olma ile tanımlanan bozukluk ____ depresyondur."),
    C("ileri50", "ileri", "Demans", "demans", "Temel belirtisi zihinsel işlevlerin bozulması olan nörolojik bozukluklara verilen genel ad.", "Temel belirtisi zihinsel işlevlerin bozulması olan nörolojik bozuklukların genel adı ____tır."),
    C("ileri51", "ileri", "Demans", "Alzheimer hastalığı", "Bellek, muhakeme, dil ve sonunda fiziksel işlevlerde geri dönüşsüz derece derece bozulmayla giden demans türü.", "Bellek, muhakeme ve dilde geri dönüşsüz bozulmayla seyreden demans türü ____ hastalığıdır."),
    C("ileri52", "ileri", "Demans", "hafif bilişsel bozulma", "Alzheimer için risk unsuru olarak düşünülen ve erken tanı açısından önemli görülen durum.", "Alzheimer için risk unsuru sayılan durum ____ bilişsel bozulmadır."),
    C("ileri53", "ileri", "Demans", "Parkinson hastalığı", "Titreme, hareketlerin yavaşlaması ve kısmi yüz felciyle tanımlanan, dopamin üreten sinirlerin zarar gördüğü rahatsızlık.", "Titreme ve hareket yavaşlamasıyla tanımlanan rahatsızlık ____ hastalığıdır."),
    C("ileri54", "ileri", "Demans", "çoklu damar tıkanmasına bağlı demans", "Beyne ait atardamarlarda tekrarlanan geçici kan akışı engellenmesiyle zihinsel işlevlerde düzensiz kayıplar.", "Tekrarlanan damar tıkanmalarıyla düzensiz zihinsel kayıp yaratan demans ____ demanstır."),
    C("ileri55", "ileri", "Kötü muamele", "kurumsal şiddet", "Huzurevi, hastane ya da uzun süreli bakım kurumlarında yaşlı yetişkinlere yönelik kötü muamele.", "Huzurevi ve bakım kurumlarında yaşlılara yönelik kötü muamele ____ şiddettir."),
    C("ileri56", "ileri", "Erikson", "benlik bütünlüğüne karşı umutsuzluk", "Erikson'un ileri yetişkinlikte geçmiş yaşamı olumlu değerlendirme ya da iyi harcanmadığı sonucuna varma krizi.", "Erikson'a göre ileri yetişkinlik krizi ____ dönemidir."),
    C("ileri57", "ileri", "Erikson", "yaşamı gözden geçirme", "Kişinin yaşamının olumlu yönleriyle pişmanlıklarını değerlendirip anlamlandırması.", "İleri yetişkinlikte kişinin geçmişini değerlendirmesi ____ olarak adlandırılır."),
    C("ileri58", "ileri", "Kuramlar", "hareketlilik kuramı", "Yaşlı yetişkinler ne kadar aktif ve katılımcı olursa yaşam doyumlarının o kadar yüksek olacağını savunan kuram.", "Yaşlıların aktif ve katılımcı oldukça doyumlarının artacağını savunan kuram ____ kuramıdır."),
    C("ileri59", "ileri", "Kuramlar", "sosyoduygusal seçicilik kuramı", "Yaşlı yetişkinlerin duygusal doyuma değer verip yakın arkadaş ve aileyle daha çok zaman geçirdiğini savunan kuram.", "Yaşlıların sosyal ilişkilerde daha seçici hale geldiğini savunan kuram ____ kuramıdır."),
    C("ileri60", "ileri", "Kuramlar", "ödünleme yoluyla seçici optimizasyon", "Seçme, optimizasyon ve ödünleme süreçleriyle yaşlı yetişkinlerin kaynaklarını hedeflerine paylaştırmasını açıklayan kuram.", "Seçme, optimizasyon ve ödünleme süreçlerini içeren kuram ____ kuramıdır."),
    C("ileri61", "ileri", "Kuramlar", "seçme", "Eksilen kapasite ve fonksiyon kaybı nedeniyle yaşam alanlarının azaltılması süreci.", "Ödünleme yoluyla seçici optimizasyonda yaşam alanlarının azaltılması ____ sürecidir."),
    C("ileri62", "ileri", "Kuramlar", "optimizasyon", "Alıştırma ve yeni teknolojilerle bazı alanlarda performansı sürdürme süreci.", "Alıştırma ve yeni teknolojilerle performansı sürdürme ____ sürecidir."),
    C("ileri63", "ileri", "Kuramlar", "ödünleme", "Görevler kişinin mevcut potansiyelinin üzerinde kapasite gerektirdiğinde kullanılan uyum süreci.", "Görev mevcut kapasiteyi aştığında kullanılan uyum süreci ____ olarak adlandırılır."),
    C("ileri64", "ileri", "Benlik", "benlik saygısı", "Yirmili yaşlarda artan, otuzlu-kırklı yaşlarda dengelenen, ellili-altmışlı yaşlarda yükselen ve ileri yaşlarda düşen benlik değerlendirmesi.", "Yetişkinlik boyunca değişen kişinin kendine ilişkin değeri ____ saygısıdır."),
    C("ileri65", "ileri", "Benlik", "olası benlikler", "Kişilerin olabilecekleri, olmak istedikleri ve olmaktan korktukları benlikler.", "Kişilerin olmak istedikleri ya da olmaktan korktukları benlikler ____ benliklerdir."),
    C("ileri66", "ileri", "Benlik", "benlik kontrolü", "Yaşlı yetişkinlerin kayıplara rağmen kontrol duygusunu koruma çabası.", "Yaşlı yetişkinlerin kayıplara rağmen korumaya çalıştığı duygu ____ kontrolüdür."),
    C("ileri67", "ileri", "Toplum", "yaş ayrımcılığı", "Yaşlarından dolayı yaşlı yetişkinlere karşı önyargılı davranma ve katılımlarını engelleme.", "Yaş nedeniyle önyargılı davranma ____ ayrımcılığıdır."),
    C("ileri68", "ileri", "Toplum", "kuşaklararası eşitsizlik", "Yaşlı yetişkinlerin kaynakların adil olmayan büyük kısmını aldığı ve gençlere adaletsiz davranıldığı görüşü.", "Kaynakların kuşaklar arasında adil dağılmadığı görüşü ____ eşitsizliktir."),
    C("ileri69", "ileri", "Sosyal ilişkiler", "sosyal destek", "Yaşlı yetişkinlerin fiziksel ve zihinsel sağlığıyla ilişkili, destek verme ve alma çevresi.", "Yaşlı yetişkinlerin fiziksel ve zihinsel sağlığıyla ilişkili yardım ağı ____ destektir."),
    C("ileri70", "ileri", "Sosyal ilişkiler", "yoldaşlık modeli", "İnsanların yaşamlarını sosyal destek verdikleri ve aldıkları kişisel çevre içinde sürdürdüğünü savunan model.", "Sosyal destek ilişkilerini kişisel çevre içinde açıklayan model ____ modelidir."),
    C("ileri71", "ileri", "Sosyal ilişkiler", "arkadaşlık", "İleri yetişkinlikte yeni kurulma olasılığı azalan, ancak birkaç yakın arkadaşla yaşam doyumunu destekleyen ilişki.", "İleri yetişkinlikte birkaç yakın kişinin varlığıyla yaşam doyumunu destekleyen ilişki ____tır."),
    C("ileri72", "ileri", "Sosyal ilişkiler", "sosyal bütünleşme", "Başkalarıyla bağlantılı olma hissi veren sosyal çevrelere katılım.", "Başkalarıyla bağlantılı olma hissi veren sosyal çevrelere katılım ____ bütünleşmedir."),
    C("ileri73", "ileri", "Sosyal ilişkiler", "özgecilik ve gönüllülük", "Yaşlı yetişkinlerde başkalarına faydalı olma duygusu ve gönüllü çalışmalarla ilişkili olumlu yaşam boyutu.", "Başkalarına faydalı olma ve gönüllü çalışma ____ ile ilişkilidir."),
    C("ileri74", "ileri", "Başarılı yaşlanma", "başarılı yaşlanma", "Uygun beslenme, aktif yaşam, zihinsel uyarı, esneklik, sosyal destek ve hastalığın olmamasıyla desteklenen olumlu yaşlanma.", "Uygun beslenme, aktif yaşam, zihinsel uyarı ve sosyal destek ____ yaşlanmanın parçalarıdır."),

    C("olum01", "olum", "Kültür", "ölüm sistemi", "Her kültürde ölümle başa çıkmayı düzenleyen insanlar, mekanlar, zamanlar, nesneler ve semboller bütünü.", "Her kültürde ölümle başa çıkmayı düzenleyen yapı ____ sistemidir."),
    C("olum02", "olum", "Kültür", "insanlar", "Kastenbaum'a göre ölüm sistemini oluşturan bileşenlerden biri.", "Kastenbaum'a göre ölüm sistemi bileşenlerinden biri ____dır."),
    C("olum03", "olum", "Kültür", "mekanlar ve bağlam", "Kastenbaum'un ölüm sistemi bileşenlerinden biri.", "Kastenbaum'un ölüm sistemi bileşenlerinden biri mekanlar ve ____dır."),
    C("olum04", "olum", "Kültür", "zamanlar", "Kastenbaum'un ölüm sistemi bileşenlerinden biri.", "Kastenbaum'a göre ölüm sistemi bileşenlerinden biri ____dır."),
    C("olum05", "olum", "Kültür", "semboller", "Kastenbaum'un ölüm sistemi bileşenlerinden biri.", "Kastenbaum'a göre ölüm sistemi bileşenlerinden biri ____dir."),
    C("olum06", "olum", "Ölümü tanımlamak", "beyin ölümü", "Beynin elektriksel etkinliğinin belirli bir süre bütünüyle durmasıyla açıklanan nörolojik ölüm tanımı.", "Beynin elektriksel etkinliğinin bütünüyle durması ____ ölümü olarak adlandırılır."),
    C("olum07", "olum", "Ölümü tanımlamak", "düz EEG kaydı", "Beyin ölümü için ölçütlerden biri olarak belirtilen kayıt.", "Beyin ölümü için belirli süre kaydedilen ____ ölçüt kabul edilir."),
    C("olum08", "olum", "Kararlar", "doğal ölüm yasası", "Ölümcül hasta kişilerin bitkisel yaşam yerine ölmeyi tercih edebilmesi düşüncesine dayanan karar çerçevesi.", "Ölümcül hastanın bitkisel yaşam yerine ölümü tercih edebilmesi ____ yasasıyla ilişkilidir."),
    C("olum09", "olum", "Kararlar", "yaşam vasiyeti", "Bireyin tıbbi karar veremeyeceği durumlar için önceden belirttiği istekleri içeren belge.", "Tıbbi karar verilemeyecek durumlar için önceden belirtilen istekler ____ vasiyetiyle ifade edilir."),
    C("olum10", "olum", "Ötenazi", "ötenazi", "Tedavisi imkansız hastalığı ya da ağır engeli olan kişilerin yaşamını acısız biçimde sona erdirme eylemi.", "Tedavisi imkansız hastalarda yaşamı acısız sona erdirme eylemi ____ olarak adlandırılır."),
    C("olum11", "olum", "Ötenazi", "pasif ötenazi", "Tedaviye ya da yaşam destek ünitelerine son vererek kişinin ölmesine izin verme.", "Yaşam destek ünitelerine son vererek ölmesine izin verme ____ ötenazidir."),
    C("olum12", "olum", "Ötenazi", "aktif ötenazi", "Ölümcül dozda ilaç verme gibi kasıtlı yollarla hastanın yaşamını sonlandırma.", "Ölümcül doz ilaç gibi kasıtlı yollarla yaşamı sonlandırma ____ ötenazidir."),
    C("olum13", "olum", "Ötenazi", "hekim destekli intihar", "Aktif ötenazi tartışmalarında hekimin ölümcül hastanın yaşamını sonlandırmasına yardım etmesi.", "Hekimin ölümcül hastanın yaşamını sonlandırmasına yardım etmesi ____ olarak adlandırılır."),
    C("olum14", "olum", "Ötenazi", "Jack Kevorkian", "Hekim destekli intihar örnekleriyle bilinen ve ikinci dereceden cinayetten suçlu bulunan Michiganlı doktor.", "Hekim destekli intihar tartışmalarında adı geçen Michiganlı doktor ____dır."),
    C("olum15", "olum", "Bakım", "iyi ölüm", "Fiziksel rahatlık, sevilen kişilerin desteği, kabullenme ve uygun tıbbi bakım içeren ölüm deneyimi.", "Fiziksel rahatlık, sevilenlerin desteği ve kabullenme içeren ölüm deneyimi ____ olarak adlandırılır."),
    C("olum16", "olum", "Bakım", "imarethane", "Yaşam sonunu olabildiğince ağrısız, kaygısız ve depresyonsuz geçirmeyi amaçlayan program.", "Yaşam sonunu ağrısız ve onurlu geçirmeyi amaçlayan program ____ olarak adlandırılır.", ["bakımevi", "hospis"]),
    C("olum17", "olum", "Bakım", "yatıştırıcı bakım", "Ağrıyı azaltma ve insanların onurlarıyla ölmelerine yardım etmeyi içeren bakım türü.", "Ağrıyı azaltıp onurlu ölümü destekleyen bakım ____ bakımdır.", ["palliative bakım", "palyatif bakım"]),
    C("olum18", "olum", "Gelişimsel bakış", "ölüm nedenleri", "Çocuklukta kazalar ve hastalıklar, genç yetişkinlikte kazalar, yaşlılıkta kalp rahatsızlığı ve kanser gibi nedenlerin öne çıkması.", "Yaşam dönemlerine göre değişen kazalar, hastalıklar ve kronik rahatsızlıklar ____ nedenleridir."),
    C("olum19", "olum", "Çocukluk", "ölümün evrensel ve geri dönüşsüz olması", "Olgun ölüm kavramının, ölümün tüm canlılar için son ve geri dönüşsüz olduğunu anlamayı içermesi.", "Olgun ölüm kavramı ölümün ____ ve geri dönüşsüz olduğunu içerir."),
    C("olum20", "olum", "Çocukluk", "dürüstlük", "Çocukla ölüm hakkında konuşurken önerilen en iyi strateji.", "Çocukla ölüm hakkında konuşurken en iyi strateji ____ olarak belirtilir."),
    C("olum21", "olum", "Ergenlik", "soyut ölüm kavramı", "Ergenlerin ölümü karanlık, ışık, dönüşüm ya da hiçlik gibi kavramlarla tanımlayabilmesi.", "Ergenlerin ölüm kavramı çocuklara göre daha ____ niteliktedir."),
    C("olum22", "olum", "Yetişkinlik", "ölüm farkındalığı", "Yaşlandıkça artan ve orta yetişkinlikte daha yoğun hale gelen ölümle ilgili bilinç.", "Birey yaşlandıkça ____ farkındalığı artar."),
    C("olum23", "olum", "Kübler-Ross", "Kübler-Ross'un ölüm evreleri", "Ölmekte olan insanların düşünce ve davranışlarını beş evreyle açıklayan model.", "İnkar, öfke, uzlaşma, depresyon ve kabullenmeden oluşan model ____ ölüm evreleridir."),
    C("olum24", "olum", "Kübler-Ross", "inkar ve yalıtılmışlık", "Kişinin gerçekten ölmekte olduğunu reddettiği Kübler-Ross evresi.", "Kişinin ölmekte olduğunu reddettiği evre ____ evresidir."),
    C("olum25", "olum", "Kübler-Ross", "öfke", "İnkarın yerini küskünlük, hiddet ve kıskançlığa bıraktığı Kübler-Ross evresi.", "İnkarın yerini hiddet ve küskünlüğe bıraktığı evre ____ evresidir."),
    C("olum26", "olum", "Kübler-Ross", "uzlaşma", "Kişinin ölümün ertelenebileceği ya da geciktirilebileceği umudunu geliştirdiği evre.", "Ölümün ertelenebileceği umudunun geliştiği evre ____ evresidir."),
    C("olum27", "olum", "Kübler-Ross", "depresyon", "Ölmekte olan kişinin ölümün kesinliğini kabul etmeye başladığı ve hazırlayıcı keder yaşayabildiği evre.", "Ölümün kesinliği kabul edilmeye başlandığında yaşanan evre ____ evresidir."),
    C("olum28", "olum", "Kübler-Ross", "kabullenme", "Kişinin huzur duygusu geliştirdiği ve kaderini kabullendiği evre.", "Kişinin huzur duygusu geliştirip kaderini kabul ettiği evre ____ evresidir."),
    C("olum29", "olum", "İletişim", "açık iletişim", "Ölmekte olan kişilere karşı psikologların önerdiği iletişim biçimi.", "Ölmekte olan kişilerle iletişimde çoğu psikolog ____ iletişim önerir."),
    C("olum30", "olum", "Yas", "yas", "Sevilen kişinin kaybından sonra yaşanan duygusal uyuşukluk, inanmama, ayrılık kaygısı, çaresizlik ve üzüntü süreci.", "Sevilen kişinin kaybından sonraki duygusal süreç ____ olarak adlandırılır."),
    C("olum31", "olum", "Yas", "özlem", "Kaybedilen kişiyi geri getirmeye yönelik aralıklarla tekrar eden ihtiyaç ya da istek.", "Kaybedilen kişiyi geri getirme isteği ____ olarak adlandırılır."),
    C("olum32", "olum", "Yas", "uzamış yas", "Kalıcı çaresizlik içeren ve uzun zaman geçmesine rağmen çözülemeyen yas.", "Uzun zaman geçmesine rağmen çözülemeyen yas ____ yastır."),
    C("olum33", "olum", "Yas", "mahrum kalınmış yas", "Sosyal olarak desteklenemeyen ya da açık biçimde tutulamayan kayıplarda yaşanan yas.", "Sosyal olarak desteklenmeyen kayıplardaki yas ____ yastır."),
    C("olum34", "olum", "Yas", "travmatik yas", "Olumsuz inançlar ve kendini suçlamayla birlikte depresyon ve kaygı belirtilerini artırabilen yas biçimi.", "Kendini suçlama ve olumsuz inançlarla ağırlaşabilen yas ____ yastır."),
    C("olum35", "olum", "Yas", "ikili süreç modeli", "Yasta kayıp odaklı ve iyileşme odaklı stres kaynakları arasında gidip gelmeyi vurgulayan model.", "Yasta kayıp odaklı ve iyileşme odaklı stresler arasında gidip gelmeyi açıklayan model ____ modelidir."),
    C("olum36", "olum", "Yas", "kayıp odaklı stres kaynakları", "Ölen kişiye ve kaybın olumlu-olumsuz değerlendirmelerine odaklanan yas boyutu.", "Ölen kişiye ve kaybın değerlendirmelerine odaklanan boyut ____ stres kaynaklarıdır."),
    C("olum37", "olum", "Yas", "iyileşme odaklı stres kaynakları", "Kimlik değişimi ve maddi konularla ilgilenme gibi yasın dolaylı ikincil sonuçları.", "Kimlik değişimi ve maddi işleri yönetme gibi ikincil sonuçlar ____ stres kaynaklarıdır."),
    C("olum38", "olum", "Yas", "ani ve travmatik ölüm", "Geride kalan kişiler üzerindeki etkisi daha yoğun ve uzun süreli olan ölüm türü.", "Geride kalanlar üzerinde etkisi daha yoğun ve uzun süren ölüm türü ____ ölümdür."),
    C("olum39", "olum", "Yas", "hayat arkadaşının kaybı", "Eş ölümünden sonra keder, mali kayıp, yalnızlık, fiziksel hastalık ve depresyonla ilişkili kayıp.", "Eşin ölümünden sonra yaşanan yoğun kayıp ____ kaybıdır."),
    C("olum40", "olum", "Kültür", "sağlıklı yas sürecindeki kültürel çeşitlilik", "Japonya'da ölen kişiyle bağ sürdürülürken Hopi kabilesinde ölünün hızlı unutulması gibi farklı yas biçimleri.", "Japonya ve Hopi örnekleri ____ kültürel çeşitliliğini gösterir."),
    C("olum41", "olum", "Yas biçimleri", "naaş yakımı", "Amerika'nın Pasifik bölgesinde, Kanada'da ve özellikle Japonya ile pek çok Asya ülkesinde daha yaygın olan uygulama.", "Ölen kişinin bedeninin yakılması ____ olarak adlandırılır."),
    C("olum42", "olum", "Yas biçimleri", "cenaze töreni", "Çoğu kültürde yas tutmanın önemli bir yönü olan ritüel.", "Çoğu kültürde yas tutmanın önemli ritüellerinden biri ____ törenidir."),
    C("olum43", "olum", "Anlamlandırma", "dünyayı anlamlandırmak", "Yasın, bireyleri ölüm sonrası deneyimi ve yaşam varsayımlarını anlamlandırmaya yöneltmesi.", "Yasın harekete geçirdiği süreçlerden biri ____ anlamlandırmaktır."),
  ];

  const ESSAY_QUESTIONS = [
    {
      id: "essay-genc-01",
      sourceKey: "genc",
      source: SOURCE_LABELS.genc,
      topic: "Beliren yetişkinlik",
      question: "Arnett'in beliren yetişkinlik kuramını açıklayınız. Bu dönemin neden ergenlikten ve tam yetişkinlikten ayrı değerlendirildiğini örneklerle tartışınız.",
      answer: [
        "Beliren yetişkinlik yaklaşık 18-25 yaş aralığında, ergenlikten yetişkinliğe geçişi anlatan bir dönemdir. Bu dönemde kişi artık ergen değildir; fakat ekonomik bağımsızlık, kalıcı iş, evlilik veya ebeveynlik gibi geleneksel yetişkin rollerini de tam olarak üstlenmemiş olabilir.",
        "Arnett bu dönemi kimlik arayışı, kararsızlık, öze dönüklük, arada kalmışlık ve olasılıklar dönemi olarak açıklar. Örneğin üniversite öğrencisinin bölüm, meslek, ilişki ve yaşam tarzı denemeleri yapması kimlik arayışına; iş ve şehir değiştirmesi kararsızlığa örnektir.",
        "Bu dönem ergenlikten ayrılır çünkü birey daha fazla özerklik ve sorumluluk kazanır. Tam yetişkinlikten ayrılır çünkü uzun vadeli roller henüz kesinleşmemiştir. Bu nedenle gelişimsel olarak geçici, keşif ağırlıklı ve kültürel koşullardan etkilenen bir dönemdir.",
      ],
      keywords: ["Arnett", "kimlik arayışı", "kararsızlık", "olasılıklar", "18-25"],
    },
    {
      id: "essay-genc-02",
      sourceKey: "genc",
      source: SOURCE_LABELS.genc,
      topic: "Bilişsel gelişim",
      question: "Genç yetişkinlikte gerçekçi-pragmatik düşünme, yansıtıcı-göreceli düşünme ve postformal düşünme kavramlarını karşılaştırınız.",
      answer: [
        "Gerçekçi ve pragmatik düşünme, bireyin yaşamın sınırlılıklarını görerek ideal çözümler yerine uygulanabilir çözümlere yönelmesidir. Genç yetişkin iş ve ilişki deneyimleriyle yalnızca neyin doğru olduğunu değil, neyin yapılabilir olduğunu da düşünür.",
        "Yansıtıcı ve göreceli düşünme, tek bir kesin doğru yerine bağlamı, farklı bakış açılarını ve kanıtları dikkate almayı içerir. Perry'nin yaklaşımında ergenlikteki siyah-beyaz düşünme yerini daha esnek değerlendirmelere bırakır.",
        "Postformal düşünme bu iki yönü birleştirir: Sorunların cevabı duruma göre değişebilir, doğruyu arama süreci bitmeyebilir ve birey çelişkili bilgileri birlikte değerlendirebilir. Bu nedenle genç yetişkinlikte bilişsel gelişim sadece bilgi artışı değil, düşünme tarzının olgunlaşmasıdır.",
      ],
      keywords: ["pragmatik", "yansıtıcı", "göreceli", "postformal", "bağlam"],
    },
    {
      id: "essay-genc-03",
      sourceKey: "genc",
      source: SOURCE_LABELS.genc,
      topic: "Sağlık davranışları",
      question: "Genç yetişkinlikte sağlık alışkanlıklarının uzun vadeli yaşam doyumu ve fiziksel sağlık üzerindeki etkisini açıklayınız.",
      answer: [
        "Genç yetişkinlik fiziksel performansın yüksek olduğu bir dönemdir; ancak bu durum sağlık risklerinin olmadığı anlamına gelmez. Ergenlikten taşınan hareketsizlik, kötü beslenme, obezite, sigara, alkol ve madde kullanımı bu dönemde kalıcı alışkanlıklara dönüşebilir.",
        "Obezite; tansiyon, diyabet ve kalp-damar hastalıkları gibi sorunlarla ilişkilidir. Düzenli egzersiz ise yalnızca kilo kontrolüne değil, benlik algısına, anksiyete ve depresyonun azalmasına da katkı sağlar.",
        "Bu nedenle genç yetişkinlikte geliştirilen sağlık davranışları ileri yaşlardaki sağlık kapasitesini etkiler. Dönem kısa vadede güçlü görünse de, yaşam boyu gelişim açısından koruyucu alışkanlıkların kurulduğu kritik bir basamaktır.",
      ],
      keywords: ["obezite", "egzersiz", "madde kullanımı", "yaşam doyumu", "koruyucu alışkanlık"],
    },
    {
      id: "essay-genc-04",
      sourceKey: "genc",
      source: SOURCE_LABELS.genc,
      topic: "Bağlanma ve yakınlık",
      question: "Yetişkin bağlanma biçimlerinin genç yetişkinlikte yakın ilişki kurma, aşk ve evlilik kararları üzerindeki etkisini açıklayınız.",
      answer: [
        "Bağlanma bebeklikte temellenen, fakat yetişkin yakın ilişkilerinde de etkisini sürdüren bir örüntüdür. Güvenli bağlanma yakınlık kurmayı kolaylaştırırken, kaygılı veya kaçınmacı örüntüler ilişkide aşırı bağımlılık, terk edilme korkusu ya da yakınlıktan kaçma biçiminde görülebilir.",
        "Dörtlü bağlanma modelinde güvenli, saplantılı, kayıtsız ve korkulu bağlanma biçimleri benlik ve başkaları modellerine göre ayrılır. Olumlu benlik ve olumlu başkaları modeli ilişki kurmayı kolaylaştırır; olumsuz modeller ilişkiyi tehdit algısıyla zorlaştırabilir.",
        "Genç yetişkinlik Erikson'a göre yakınlığa karşı yalıtılmışlık dönemidir. Kişi yakın ilişki kuramazsa yalnızlık ve yalıtılmışlık yaşayabilir; sağlıklı bağlanma ise romantik ilişki, arkadaşlık ve evlilikte karşılıklı güveni destekler.",
      ],
      keywords: ["güvenli bağlanma", "saplantılı", "kayıtsız", "korkulu", "yakınlık"],
    },
    {
      id: "essay-genc-05",
      sourceKey: "genc",
      source: SOURCE_LABELS.genc,
      topic: "İş ve kariyer",
      question: "Genç yetişkinlikte iş, kariyer seçimi ve işsizlik neden gelişimsel açıdan önemlidir? Cam tavan ve çift gelirli çiftler kavramlarını da kullanarak tartışınız.",
      answer: [
        "Genç yetişkinlikte iş seçimi kimlik gelişiminin önemli bir parçasıdır. İş, bireyin ekonomik bağımsızlığını, sosyal çevresini, günlük yaşam düzenini ve benlik algısını etkiler. Bu nedenle kariyer kararı yalnızca ekonomik değil, psikososyal bir karardır.",
        "İşsizlik stres, düşük benlik algısı, depresyon ve aile/evlilik sorunlarıyla ilişkilendirilebilir. Çift gelirli çiftlerde ise iki kişinin çalışması ekonomik destek sağlasa da ev işleri, çocuk bakımı ve iş-yaşam dengesi yeni çatışmalar yaratabilir.",
        "Cam tavan kavramı kadınların ve azınlıkların başarılarına rağmen üst pozisyonlara yükselmesini engelleyen görünmez bariyerleri anlatır. Bu kavram, kariyer gelişiminin bireysel yetenek kadar sosyal yapı ve ayrımcılıkla da ilişkili olduğunu gösterir.",
      ],
      keywords: ["kariyer", "işsizlik", "ekonomik bağımsızlık", "cam tavan", "çift gelirli çiftler"],
    },
    {
      id: "essay-genc-06",
      sourceKey: "genc",
      source: SOURCE_LABELS.genc,
      topic: "Aşk ve ilişkiler",
      question: "Romantik aşk, samimi aşk ve Sternberg'in aşk üçgeni yaklaşımını genç yetişkinlikte ilişki gelişimi açısından açıklayınız.",
      answer: [
        "Romantik aşk genellikle ilişkinin ilk dönemlerinde yoğun tutku ve cinsellik içerir. Samimi aşk ise zamanla gelişen şefkat, güven, yoldaşlık ve bağlılık yönüyle öne çıkar. Bu nedenle ilişki olgunlaştıkça tutkunun yerini daha kalıcı bağlanma alabilir.",
        "Sternberg aşkı tutku, samimiyet ve bağlanma boyutlarıyla açıklar. Bu boyutların farklı birleşimleri farklı aşk türlerini oluşturur. Örneğin yalnız tutku geçici bir çekim yaratabilir; samimiyet ve bağlanma ise uzun süreli ilişkiyi destekler.",
        "Genç yetişkinlikte yakınlık kurma ihtiyacı güçlüdür. Sağlıklı ilişki yalnızca çekicilikten değil, kendini açma, karşılıklı güven, benzer değerler ve bağımsızlık-yakınlık dengesinden oluşur.",
      ],
      keywords: ["romantik aşk", "samimi aşk", "Sternberg", "tutku", "bağlanma"],
    },
    {
      id: "essay-orta-01",
      sourceKey: "orta",
      source: SOURCE_LABELS.orta,
      topic: "Fiziksel değişim",
      question: "Orta yetişkinlikte fiziksel değişimlerin genel özelliklerini açıklayınız. Bu değişimlerin bireyler arasında neden farklılık gösterdiğini tartışınız.",
      answer: [
        "Orta yetişkinlik yaklaşık 40-45 yaşlarından 60-65 yaşlarına kadar uzanan dönemdir. Bu dönemde fiziksel değişimler ergenlikteki gibi ani değil, çoğunlukla yavaş ve kademelidir. Görme ve işitme azalması, ciltte kırışma, kas gücü kaybı, kilo artışı ve kemik yoğunluğunda azalma görülebilir.",
        "Sarcopenia yaşla ilişkili kas kütlesi ve güç kaybını, osteoporoz ise kemik dokusu kaybını anlatır. Görme uyumunun azalması yakın nesneleri görmeyi zorlaştırırken, duyma kaybı da orta yaşta başlayabilir.",
        "Bu değişimlerin derecesi genetik yapı, beslenme, egzersiz, sigara/alkol kullanımı, stres, kronik hastalıklar ve sosyoekonomik koşullara göre değişir. Bu yüzden orta yaş tek tip bir gerileme dönemi değil, bireysel farklılıkların belirgin olduğu bir geçiş dönemidir.",
      ],
      keywords: ["sarcopenia", "osteoporoz", "görme", "işitme", "bireysel farklılık"],
    },
    {
      id: "essay-orta-02",
      sourceKey: "orta",
      source: SOURCE_LABELS.orta,
      topic: "Cinsellik ve hormonlar",
      question: "Klimakterik, menopoz ve orta yaşlı erkeklerde hormonal değişiklikleri karşılaştırınız. Bu değişimlerin psikososyal etkileri neler olabilir?",
      answer: [
        "Klimakterik, doğurganlığın azaldığı orta yaşa geçişi anlatır. Menopoz ise kadının menstrüel döneminin tamamen sona ermesidir ve çoğunlukla 40'lı yaşların sonu ile 50'li yaşların başında görülür. Östrojen azalması sıcak basması, yorgunluk ve hızlı kalp atışı gibi belirtiler yaratabilir.",
        "Erkeklerde üreme kapasitesi tamamen bitmez; ancak testosteron üretimi ve sperm sayısı yavaş biçimde azalabilir. Erektil fonksiyon bozukluğu bazı erkeklerde cinsel performans ve benlik algısı üzerinde etkili olabilir.",
        "Bu biyolojik değişimler yalnızca fizyolojik değildir. Toplumsal yaşlanma algısı, beden imgesi, evlilik doyumu, cinsel iletişim ve sağlık hizmetlerine erişim psikososyal etkileri belirler. Sağlıklı uyum için doğru bilgi, açık iletişim ve tıbbi destek önemlidir.",
      ],
      keywords: ["klimakterik", "menopoz", "östrojen", "testosteron", "psikososyal etki"],
    },
    {
      id: "essay-orta-03",
      sourceKey: "orta",
      source: SOURCE_LABELS.orta,
      topic: "Zeka ve biliş",
      question: "Orta yetişkinlikte kristalize zeka ve akıcı zeka nasıl değişir? Seattle Boylamsal Çalışması bu konuda neden önemlidir?",
      answer: [
        "Kristalize zeka, bireyin yaşam boyunca biriktirdiği bilgi, kelime dağarcığı ve sözel becerilere dayanır. Deneyimle geliştiği için orta yetişkinlikte artmaya devam edebilir. Akıcı zeka ise yeni ve soyut problemleri hızlı çözme, yeni ilişkiler kurma ve esnek muhakeme yeteneğidir; yaşla birlikte daha erken düşme eğilimi gösterebilir.",
        "Seattle Boylamsal Çalışması yetişkinlik boyunca zihinsel yeteneklerin durağanlık ve değişimini uzun süreli verilerle incelemesi açısından önemlidir. Çalışmada sözel yetenek, sözel bellek, tümevarımsal muhakeme ve mekansal yönelim gibi bazı becerilerin orta yaşta yüksek kalabildiği; algısal hız gibi bazı becerilerin daha erken düştüğü görülür.",
        "Bu bulgular orta yaşın bilişsel çöküş dönemi olmadığını gösterir. Hız ve yeni bilgi işleme bazı alanlarda zayıflayabilir; fakat bilgi, uzmanlık, pratik problem çözme ve deneyime dayalı yargı güçlü kalabilir.",
      ],
      keywords: ["kristalize zeka", "akıcı zeka", "Seattle", "algısal hız", "uzmanlık"],
    },
    {
      id: "essay-orta-04",
      sourceKey: "orta",
      source: SOURCE_LABELS.orta,
      topic: "Kişilik kuramları",
      question: "Erikson'un üretkenliğe karşı verimsizlik dönemi ile Levinson'un orta yaş geçişi yaklaşımını karşılaştırınız.",
      answer: [
        "Erikson'a göre orta yetişkinliğin temel krizi üretkenliğe karşı verimsizliktir. Üretkenlik, bireyin çocuklar, öğrenciler, iş, toplum veya kültür yoluyla gelecek kuşaklara katkıda bulunmasıdır. Verimsizlik ise kişinin yalnızca kendine yönelmesi ve kalıcı bir katkı üretemediğini hissetmesidir.",
        "Levinson ise orta yaş geçişini bireyin gençlikten yaşlılığa, yıkıcılıktan yapıcılığa, erkeksilikten kadınsılığa ve başkalarıyla olmaktan ayrışmaya doğru yaşadığı çatışmalarla açıklar. Bu yaklaşım orta yaşta yaşamı yeniden değerlendirme temasına odaklanır.",
        "İki yaklaşım da orta yaşta değerlendirme ve yeniden düzenleme olduğunu kabul eder. Ancak Erikson daha çok toplumsal katkı ve kuşaklararası aktarımı vurgularken, Levinson bireyin yaşam yapısını ve içsel zıtlıklarını yeniden düzenlemesini öne çıkarır.",
      ],
      keywords: ["üretkenlik", "verimsizlik", "Levinson", "orta yaş geçişi", "yaşam değerlendirmesi"],
    },
    {
      id: "essay-orta-05",
      sourceKey: "orta",
      source: SOURCE_LABELS.orta,
      topic: "Yaşam olayları ve bağlam",
      question: "Yaşam olayları yaklaşımı, sosyal saat ve kuşak etkisi kavramlarını orta yetişkinlik gelişimini açıklamak için kullanınız.",
      answer: [
        "Yaşam olayları yaklaşımı, kişilik ve uyum değişimlerini yalnızca yaşa bağlı evrelerle değil; evlilik, boşanma, iş kaybı, hastalık, eşin ölümü gibi olayların yarattığı stresle açıklar. Çağdaş yaklaşımda olayın etkisi kişinin kaynaklarına, aile desteğine, sağlığına ve sosyo-tarihsel bağlama bağlıdır.",
        "Sosyal saat, bireylerden belirli yaşlarda evlenme, çocuk sahibi olma, kariyer kurma veya emekli olma gibi görevleri yerine getirmesinin beklenmesidir. Bu beklentiler kişinin kendini erken, geç veya zamanında hissetmesine yol açabilir.",
        "Kuşak etkisi ise aynı tarihsel dönemde doğanların benzer toplumsal koşullardan etkilenmesidir. Örneğin ekonomik kriz, savaş, eğitim olanakları veya kadınların iş gücüne katılımı orta yaş deneyimini değiştirir. Bu üç kavram orta yetişkinliğin yalnız biyolojik değil, toplumsal bir süreç olduğunu gösterir.",
      ],
      keywords: ["yaşam olayları", "sosyal saat", "kuşak etkisi", "bağlam", "stres"],
    },
    {
      id: "essay-orta-06",
      sourceKey: "orta",
      source: SOURCE_LABELS.orta,
      topic: "Aile ilişkileri",
      question: "Orta yetişkinlikte aile rollerini boş yuva, büyük ebeveynlik ve nesillerarası ilişkiler açısından açıklayınız.",
      answer: [
        "Orta yetişkinlikte bireyler hem yetişkin çocuklarıyla hem yaşlanan ebeveynleriyle hem de torunlarıyla ilişkilerini yeniden düzenler. Çocukların evden ayrılması boş yuva deneyimini yaratır; bu durum bazı ailelerde özgürlük ve evlilik doyumu, bazılarında ise kayıp ve yalnızlık duygusu doğurabilir.",
        "Ekonomik belirsizlik, boşanma veya iş sorunları nedeniyle yetişkin çocukların eve dönmesi boş yuvanın yeniden doldurulmasıdır. Bu durum ebeveynlerin rollerini yeniden tanımlamasını gerektirir.",
        "Yaşam süresinin uzaması büyük ebeveynliği daha görünür hale getirmiştir. Orta yaş yetişkinleri aynı zamanda genç kuşaklara değer ve deneyim aktarırken, yaşlı kuşaklara bakım desteği sağlayabilir. Bu yüzden orta yetişkinlik kuşaklar arasında köprü kurulan bir dönemdir.",
      ],
      keywords: ["boş yuva", "büyük ebeveynlik", "nesillerarası", "yetişkin çocuk", "bakım"],
    },
    {
      id: "essay-ileri-01",
      sourceKey: "ileri",
      source: SOURCE_LABELS.ileri,
      topic: "Uzun ömür ve yaş kategorileri",
      question: "Yaşam beklentisi, yaşam uzamı ve işlevsel yaş kavramlarını açıklayınız. Genç-yaşlı, yaşlı-yaşlı ve en yaşlı-yaşlı ayrımı neden tek başına yeterli değildir?",
      answer: [
        "Yaşam beklentisi, belirli bir yılda doğan ortalama bir insanın yaşaması beklenen yıl sayısıdır. Yaşam uzamı ise insanın ulaşabileceği biyolojik üst sınırı ifade eder. Bu iki kavram aynı değildir; beklenti toplum koşullarına göre değişirken, uzam maksimum sınırı anlatır.",
        "Genç-yaşlı 65-74, yaşlı-yaşlı 75-84, en yaşlı-yaşlı 85 yaş ve üzeri grupları ifade eder. Bu sınıflama pratik olsa da bireyin gerçek işlevselliğini her zaman yansıtmaz.",
        "İşlevsel yaş, kişinin biyolojik, psikolojik ve sosyal işlevlerine bakar. Örneğin 85 yaşındaki bir kişi sağlık, bilişsel kapasite ve sosyal katılım açısından 70 yaşındaki başka bir kişiden daha iyi durumda olabilir. Bu nedenle yaşlılığı yalnız kronolojik yaşla açıklamak eksik kalır.",
      ],
      keywords: ["yaşam beklentisi", "yaşam uzamı", "işlevsel yaş", "genç-yaşlı", "en yaşlı-yaşlı"],
    },
    {
      id: "essay-ileri-02",
      sourceKey: "ileri",
      source: SOURCE_LABELS.ileri,
      topic: "Biyolojik yaşlanma",
      question: "Yaşlanmanın biyolojik kuramlarından hücresel saat, serbest radikal, mitokondrial ve hormonal stres kuramlarını karşılaştırınız.",
      answer: [
        "Hücresel saat kuramı, hücrelerin sınırlı sayıda bölünebildiğini ve telomerlerin her bölünmede kısalarak hücre yenilenmesini sınırladığını savunur. Bu yaklaşım yaşlanmayı hücresel yenilenme kapasitesinin azalmasıyla açıklar.",
        "Serbest radikal kuramı, metabolizma sonucu oluşan kararsız oksijen moleküllerinin DNA ve hücresel yapılara zarar verdiğini öne sürer. Mitokondrial kuram ise enerji üretiminden sorumlu mitokondrilerin bozulmasının yaşlanmaya ve hastalıklara katkıda bulunduğunu savunur.",
        "Hormonal stres kuramı, yaşlanmayla hormonal sistemin strese direnç kapasitesinin azalmasını ve hastalık riskinin artmasını vurgular. Bu kuramlar birbirini dışlamaz; yaşlanma büyük olasılıkla birden fazla biyolojik mekanizmanın ortak etkisidir.",
      ],
      keywords: ["hücresel saat", "telomer", "serbest radikal", "mitokondri", "hormonal stres"],
    },
    {
      id: "essay-ileri-03",
      sourceKey: "ileri",
      source: SOURCE_LABELS.ileri,
      topic: "Sağlık ve başarılı yaşlanma",
      question: "İleri yetişkinlikte fiziksel sağlık, duyusal kayıplar, egzersiz ve beslenmenin başarılı yaşlanmadaki rolünü açıklayınız.",
      answer: [
        "İleri yetişkinlikte görsel keskinlik, işitme, tat, koku ve dokunma gibi duyusal işlevlerde azalma görülebilir. Katarakt, glokom, maküler dejenerasyon, yüksek tansiyon, akciğer kapasitesinde azalma, arterit ve osteoporoz bu dönemin önemli sağlık başlıklarıdır.",
        "Egzersiz yaşlı yetişkinlerde kronik hastalıkların önlenmesi, motor becerilerin korunması, bağışıklık işlevi, ruh sağlığı ve bilişsel işlevlerle ilişkilidir. Aerobik aktivite, esneme ve güç antrenmanları birlikte düşünüldüğünde daha koruyucu olabilir.",
        "Beslenme de başarılı yaşlanmanın temel parçasıdır. Yeterli protein, vitamin ve mineral alımı, aşırı kalori ve hareketsizlikten kaçınma, zihinsel uyarım ve sosyal destekle birleştiğinde yaşlı bireyin işlevselliğini korur. Başarılı yaşlanma yalnız hastalık yokluğu değil, aktif ve anlamlı yaşamı sürdürebilmedir.",
      ],
      keywords: ["duyusal kayıp", "egzersiz", "beslenme", "osteoporoz", "başarılı yaşlanma"],
    },
    {
      id: "essay-ileri-04",
      sourceKey: "ileri",
      source: SOURCE_LABELS.ileri,
      topic: "Bilişsel yaşlanma",
      question: "İleri yetişkinlikte bilişsel mekanikler ve bilişsel pragmatikler nasıl değişir? Bellek türleri ve dikkat açısından örnekleyiniz.",
      answer: [
        "Bilişsel mekanikler zihnin donanımı gibidir; hız, duyusal girdi, ayırt etme, karşılaştırma ve temel işlem doğruluğu gibi süreçleri içerir. Yaşla birlikte işlem hızı, bölünmüş dikkat ve çalışma belleği gibi alanlarda düşüş görülebilir.",
        "Bilişsel pragmatikler ise kültüre, deneyime ve eğitime dayalı bilgi birikimidir. Dil, kelime bilgisi, mesleki bilgi, yaşam becerileri ve uzmanlık bu alana girer. Bu nedenle yaşlı yetişkin bazı hızlı işlem görevlerinde zorlanırken, deneyime dayalı yargılarda güçlü kalabilir.",
        "Episodik bellek yaşam olaylarının nerede ve ne zaman yaşandığıyla ilgilidir ve yaşla daha kırılgan hale gelebilir. Anlamsal bellek dünya bilgisi ve kelime bilgisiyle ilgilidir ve çoğu zaman daha iyi korunur. Dilimin ucunda fenomeni, kelimeyi bilip o anda geri çağıramama şeklinde görülebilir.",
      ],
      keywords: ["bilişsel mekanikler", "bilişsel pragmatikler", "episodik bellek", "anlamsal bellek", "dikkat"],
    },
    {
      id: "essay-ileri-05",
      sourceKey: "ileri",
      source: SOURCE_LABELS.ileri,
      topic: "Demans ve beyin bozuklukları",
      question: "Demans, Alzheimer hastalığı, Parkinson hastalığı ve çoklu damar tıkanmasına bağlı demansı ayırt ediniz.",
      answer: [
        "Demans, zihinsel işlevlerin bozulmasıyla giden nörolojik bozuklukların genel adıdır. Alzheimer hastalığı demansın en bilinen türlerinden biridir; bellek, muhakeme, dil ve sonunda fiziksel işlevlerde ilerleyici ve geri dönüşsüz bozulma ile seyreder.",
        "Parkinson hastalığı dopamin üreten sinirlerin zarar görmesiyle ilişkilidir. Titreme, hareketlerin yavaşlaması, kas sertliği ve yüz ifadelerinde azalma gibi motor belirtiler öne çıkar; bazı vakalarda bilişsel bozulma da eşlik edebilir.",
        "Çoklu damar tıkanmasına bağlı demans ise beyindeki damar sorunları ve kan akışı bozulmalarıyla ilişkilidir. Alzheimer daha sürekli kötüleşme eğilimi gösterirken, vasküler demansta belirtiler basamaklı veya düzensiz ilerleyebilir. Bu ayrım tanı ve bakım planı açısından önemlidir.",
      ],
      keywords: ["demans", "Alzheimer", "Parkinson", "vasküler demans", "dopamin"],
    },
    {
      id: "essay-ileri-06",
      sourceKey: "ileri",
      source: SOURCE_LABELS.ileri,
      topic: "Sosyoduygusal yaşlanma",
      question: "Erikson'un benlik bütünlüğüne karşı umutsuzluk dönemi, yaşamı gözden geçirme, sosyoduygusal seçicilik ve seçici optimizasyon kuramlarını birlikte açıklayınız.",
      answer: [
        "Erikson'a göre ileri yetişkinlikte temel kriz benlik bütünlüğüne karşı umutsuzluktur. Birey geçmiş yaşamını anlamlı ve bütünlüklü görürse benlik bütünlüğü geliştirir; yaşamını boşa harcadığını düşünürse pişmanlık ve umutsuzluk yaşayabilir.",
        "Yaşamı gözden geçirme, kişinin olumlu anıları kadar pişmanlıklarını da değerlendirip yaşamına anlam vermesidir. Bu süreç bilgelik, kabullenme ve ölümle daha barışık olma açısından önem taşır.",
        "Sosyoduygusal seçicilik kuramı, yaşlı bireylerin daha anlamlı ve duygusal doyum sağlayan ilişkileri seçtiğini savunur. Ödünleme yoluyla seçici optimizasyon ise bireyin kapasitesi azaldığında hedeflerini seçmesi, güçlü alanlarını optimize etmesi ve kayıpları telafi etmesini açıklar. Bu kuramlar başarılı yaşlanmanın aktif uyum içerdiğini gösterir.",
      ],
      keywords: ["benlik bütünlüğü", "yaşamı gözden geçirme", "sosyoduygusal seçicilik", "optimizasyon", "ödünleme"],
    },
    {
      id: "essay-olum-01",
      sourceKey: "olum",
      source: SOURCE_LABELS.olum,
      topic: "Ölüm sistemi ve kültür",
      question: "Ölüm sistemi kavramını açıklayınız. Kültürel çeşitliliğin ölüm, cenaze ve yas tutma biçimlerini nasıl etkilediğini örneklerle tartışınız.",
      answer: [
        "Ölüm sistemi, bir kültürde ölümle ilgili insanlar, mekanlar, zamanlar, nesneler ve sembollerden oluşan düzeni ifade eder. Her toplum ölümün ne anlama geldiğini, ölünün bedenine ne yapılacağını, kimin yas tutacağını ve hangi ritüellerin uygulanacağını farklı biçimde tanımlar.",
        "Bazı kültürlerde ölüm ruhun başka bir yaşama geçişi olarak görülürken, bazı kültürlerde biyolojik son olarak yorumlanır. Cenaze töreni, naaş yakımı, siyah giyme, yemek verme veya ölen kişiyle bağın sürdürülmesi gibi uygulamalar kültüre göre değişir.",
        "Bu çeşitlilik, yasın tek ve evrensel bir kalıbı olmadığını gösterir. Psikolojik destek verirken kişinin kültürel, dini ve ailevi anlam sistemini dikkate almak gerekir.",
      ],
      keywords: ["ölüm sistemi", "kültür", "ritüel", "cenaze", "yas"],
    },
    {
      id: "essay-olum-02",
      sourceKey: "olum",
      source: SOURCE_LABELS.olum,
      topic: "Ölümü tanımlamak",
      question: "Beyin ölümü kavramını açıklayınız. Günümüzde ölümü belirlemenin geçmişe göre neden daha karmaşık hale geldiğini tartışınız.",
      answer: [
        "Geçmişte ölüm çoğunlukla nefes alma, kalp atışı ve kan basıncı gibi biyolojik işlevlerin durmasıyla belirlenirdi. Tıbbi teknolojiler geliştikçe solunum ve dolaşım yapay olarak sürdürülebildiği için ölümün tanımı karmaşıklaşmıştır.",
        "Beyin ölümü, beynin elektriksel etkinliğinin belirli bir süre bütünüyle durması ve hem kortikal işlevlerin hem beyin sapı işlevlerinin sona ermesiyle açıklanır. Düz EEG kaydı bu değerlendirmede ölçütlerden biridir.",
        "Bu karmaşıklık etik ve hukuki kararları da etkiler. Yaşam desteğinin sürdürülmesi, organ bağışı, aile onayı ve hastanın önceden bildirdiği istekler ölümün yalnız biyolojik değil, aynı zamanda sosyal ve ahlaki bir karar alanı olduğunu gösterir.",
      ],
      keywords: ["beyin ölümü", "EEG", "yaşam desteği", "etik", "tıbbi teknoloji"],
    },
    {
      id: "essay-olum-03",
      sourceKey: "olum",
      source: SOURCE_LABELS.olum,
      topic: "Yaşam sonu bakım",
      question: "Yaşam vasiyeti, ötenazi, pasif ötenazi, aktif ötenazi, bakımevi ve yatıştırıcı bakım kavramlarını karşılaştırınız.",
      answer: [
        "Yaşam vasiyeti, kişinin tıbbi karar veremeyeceği durumda hangi tedavileri isteyip istemediğini önceden belirtmesidir. Bu belge aile ve sağlık çalışanları için yol gösterici olabilir.",
        "Ötenazi, tedavisi imkansız hastalık veya ağır engel durumunda yaşamı acısız biçimde sona erdirme eylemidir. Pasif ötenazi tedavinin veya yaşam desteğinin kesilmesiyle ölmesine izin vermeyi; aktif ötenazi ise ölümcül doz ilaç verme gibi doğrudan yaşamı sonlandıran eylemleri anlatır.",
        "Bakımevi/hospis ve yatıştırıcı bakım ise ölümü hızlandırmaktan çok ağrıyı azaltma, kaygıyı düşürme, onuru koruma ve yaşam sonu kalitesini artırma amacı taşır. Bu kavramlar etik, hukuk, kültür ve bireysel özerklik açısından birlikte değerlendirilmelidir.",
      ],
      keywords: ["yaşam vasiyeti", "ötenazi", "pasif", "aktif", "palyatif bakım"],
    },
    {
      id: "essay-olum-04",
      sourceKey: "olum",
      source: SOURCE_LABELS.olum,
      topic: "Kübler-Ross",
      question: "Kübler-Ross'un ölüm evrelerini sıralayıp açıklayınız. Bu modelin hangi yönlerden sınırlı olabileceğini tartışınız.",
      answer: [
        "Kübler-Ross ölmekte olan insanların tepkilerini beş evreyle açıklar: inkar ve yalıtılmışlık, öfke, uzlaşma, depresyon ve kabullenme. İnkar kişinin ölmekte olduğunu reddetmesi; öfke hiddet ve küskünlük; uzlaşma ölümün ertelenebileceği umudu; depresyon kesinliği fark etme; kabullenme ise huzur ve kabul duygusudur.",
        "Model ölümle yüzleşme sürecini anlamak için yararlı bir çerçeve sunar. Ancak herkes bu evreleri aynı sırayla, aynı yoğunlukta veya tamamını yaşayarak geçirmez.",
        "Yas ve ölüm tepkileri kişilik, kültür, dini inanç, hastalığın türü, sosyal destek ve ölümün ani ya da beklenen olmasına göre değişir. Bu nedenle model katı bir sıra gibi değil, olası tepkileri anlamaya yarayan esnek bir çerçeve olarak kullanılmalıdır.",
      ],
      keywords: ["inkar", "öfke", "uzlaşma", "depresyon", "kabullenme"],
    },
    {
      id: "essay-olum-05",
      sourceKey: "olum",
      source: SOURCE_LABELS.olum,
      topic: "Yas türleri",
      question: "Yas, uzamış yas, mahrum kalınmış yas ve travmatik yas kavramlarını açıklayınız.",
      answer: [
        "Yas, sevilen bir kişinin kaybından sonra yaşanan duygusal uyuşukluk, inanmama, özlem, ayrılık kaygısı, çaresizlik, üzüntü ve yalnızlık sürecidir. Normal yas zaman içinde dalgalanarak azalabilir; kişi kayıpla yaşamayı öğrenir.",
        "Uzamış yas, uzun süre geçmesine rağmen çözülemeyen ve kalıcı çaresizlik içeren yas biçimidir. Kişi günlük yaşama dönmekte zorlanabilir ve depresyon ya da intihar riski artabilir.",
        "Mahrum kalınmış yas, toplum tarafından açıkça desteklenmeyen veya meşru görülmeyen kayıplarda yaşanır; örneğin gizli ilişki, kürtaj ya da damgalanan ölüm biçimleri. Travmatik yas ise ani, şiddetli veya beklenmedik ölümlerde kendini suçlama, kaygı ve depresyon belirtileriyle ağırlaşabilir.",
      ],
      keywords: ["yas", "uzamış yas", "mahrum kalınmış yas", "travmatik yas", "özlem"],
    },
    {
      id: "essay-olum-06",
      sourceKey: "olum",
      source: SOURCE_LABELS.olum,
      topic: "İkili süreç modeli",
      question: "Yasla başa çıkmada ikili süreç modelini açıklayınız. Kayıp odaklı ve iyileşme odaklı stres kaynaklarına örnek veriniz.",
      answer: [
        "İkili süreç modeli, yasla başa çıkmanın tek çizgisel bir süreç olmadığını; kişinin kayıp odaklı ve iyileşme odaklı stres kaynakları arasında gidip geldiğini savunur.",
        "Kayıp odaklı stres kaynakları ölen kişiyi düşünme, özlem duyma, ölüm hakkında tekrar tekrar düşünme ve kaybın anlamını değerlendirme gibi tepkileri içerir. Örneğin eşini kaybeden kişinin eski fotoğraflara bakıp yoğun keder yaşaması bu boyuta girer.",
        "İyileşme odaklı stres kaynakları ise kaybın ardından ortaya çıkan yeni yaşam görevleridir: dul kimliğine uyum sağlama, maddi işleri düzenleme, ev sorumluluklarını üstlenme veya sosyal rolleri yeniden kurma. Sağlıklı başa çıkma bu iki boyut arasında esnek gidip gelebilmeyi içerir.",
      ],
      keywords: ["ikili süreç", "kayıp odaklı", "iyileşme odaklı", "baş etme", "uyum"],
    },
  ];

  const SOURCE_ORDER = ["genc", "orta", "ileri", "olum"];
  const TEMPLATES = [
    (definition) => `Aşağıdaki kavramlardan hangisi şu açıklamaya karşılık gelir: ${definition}`,
    (definition) => `PDF'lerdeki kullanıma göre bu açıklama hangi kavramı anlatır? ${definition}`,
    (definition) => `Bu tanım için doğru seçenek hangisidir? ${definition}`,
    (definition) => `Aşağıdaki seçeneklerden hangisi bu bilgiyi en doğru adlandırır? ${definition}`,
  ];

  function hashText(text) {
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function stableShuffle(items, seedText) {
    const result = [...items];
    let seed = hashText(seedText);
    for (let index = result.length - 1; index > 0; index -= 1) {
      seed = Math.imul(seed ^ (seed >>> 15), 2246822519) >>> 0;
      const swapIndex = seed % (index + 1);
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function buildSequence({ count, fillOnly = false, seed = "base" }) {
    const pools = {};
    const cursors = {};
    const cycles = {};
    const result = [];

    SOURCE_ORDER.forEach((source) => {
      const sourcePool = CONCEPTS.filter((concept) => concept.source === source && (!fillOnly || concept.fill));
      pools[source] = stableShuffle(sourcePool, `${seed}-${source}-0`);
      cursors[source] = 0;
      cycles[source] = 0;
    });

    while (result.length < count) {
      const source = SOURCE_ORDER[(result.length + hashText(seed)) % SOURCE_ORDER.length];

      if (cursors[source] >= pools[source].length) {
        cycles[source] += 1;
        cursors[source] = 0;
        pools[source] = stableShuffle(pools[source], `${seed}-${source}-${cycles[source]}`);
      }

      result.push(pools[source][cursors[source]]);
      cursors[source] += 1;
    }

    return result;
  }

  function makeOptions(concept, examId, index) {
    const sameSource = CONCEPTS.filter((item) => item.source === concept.source && item.id !== concept.id);
    const shuffled = stableShuffle(sameSource, `${concept.id}-${examId}-${index}`).map((item) => item.term);
    const wrongOptions = [];

    for (const option of shuffled) {
      if (!wrongOptions.includes(option) && option !== concept.term) {
        wrongOptions.push(option);
      }
      if (wrongOptions.length === 3) {
        break;
      }
    }

    return stableShuffle([concept.term, ...wrongOptions], `options-${concept.id}-${examId}-${index}`);
  }

  function makeFillQuestion(concept, examId, index) {
    return {
      id: `exam-${examId}-fill-${index + 1}`,
      type: "fill",
      sourceKey: concept.source,
      source: SOURCE_LABELS[concept.source],
      topic: concept.topic,
      prompt: concept.fill,
      answer: concept.term,
      acceptable: [concept.term, ...concept.aliases],
      explanation: concept.definition,
    };
  }

  function makeMultipleQuestion(concept, examId, index) {
    const template = TEMPLATES[(examId + index) % TEMPLATES.length];
    return {
      id: `exam-${examId}-mc-${index + 1}`,
      type: "multiple",
      sourceKey: concept.source,
      source: SOURCE_LABELS[concept.source],
      topic: concept.topic,
      prompt: template(concept.definition),
      options: makeOptions(concept, examId, index),
      answer: concept.term,
      explanation: concept.definition,
    };
  }

  const FILL_SEQUENCE = buildSequence({ count: 100, fillOnly: true, seed: "fill-sequence" });
  const MULTIPLE_SEQUENCE = buildSequence({ count: 280, seed: "multiple-sequence" });

  function buildExam(examId) {
    const fillStart = (examId - 1) * 10;
    const fillConcepts = FILL_SEQUENCE.slice(fillStart, fillStart + 10);
    const fillIds = new Set(fillConcepts.map((concept) => concept.id));
    const multipleConcepts = [];
    let multipleCursor = (examId - 1) * 25;

    while (multipleConcepts.length < 25) {
      const concept = MULTIPLE_SEQUENCE[multipleCursor % MULTIPLE_SEQUENCE.length];
      const alreadyInExam = multipleConcepts.some((item) => item.id === concept.id);

      if (!fillIds.has(concept.id) && !alreadyInExam) {
        multipleConcepts.push(concept);
      }

      multipleCursor += 1;
    }

    const fillQuestions = fillConcepts.map((concept, index) => makeFillQuestion(concept, examId, index));
    const multipleQuestions = multipleConcepts.map((concept, index) => makeMultipleQuestion(concept, examId, index));

    return {
      id: examId,
      title: `Sınav ${examId}`,
      subtitle: "4 PDF karışık · 10 boşluk doldurma · 25 çoktan seçmeli",
      questions: [...fillQuestions, ...multipleQuestions],
    };
  }

  const EXAMS = Array.from({ length: 10 }, (_, index) => buildExam(index + 1));
  const IMPORTANT_CONCEPT_IDS = [
    "genc01", "genc05", "genc09", "genc12", "genc16", "genc18", "genc22", "genc27",
    "genc33", "genc39", "genc40", "genc41", "genc42", "genc47", "genc50", "genc54",
    "orta01", "orta07", "orta11", "orta14", "orta15", "orta19", "orta20", "orta21",
    "orta22", "orta25", "orta34", "orta35", "orta36", "orta39", "orta44", "orta50",
    "ileri01", "ileri02", "ileri06", "ileri08", "ileri10", "ileri11", "ileri12", "ileri13",
    "ileri16", "ileri28", "ileri34", "ileri35", "ileri39", "ileri40", "ileri43", "ileri44",
    "ileri49", "ileri50", "ileri51", "ileri56", "ileri59", "ileri60", "ileri67", "ileri74",
    "olum01", "olum06", "olum09", "olum10", "olum11", "olum12", "olum16", "olum17",
    "olum23", "olum30", "olum32", "olum33", "olum35", "olum36", "olum37",
  ];
  const IMPORTANT_CONCEPTS = IMPORTANT_CONCEPT_IDS
    .map((id) => CONCEPTS.find((concept) => concept.id === id))
    .filter(Boolean);
  const root = typeof window !== "undefined" ? window : globalThis;
  root.PSYCH_SOURCE_LABELS = SOURCE_LABELS;
  root.PSYCH_CONCEPTS = CONCEPTS;
  root.PSYCH_EXAMS = EXAMS;
  root.PSYCH_ESSAY_QUESTIONS = ESSAY_QUESTIONS;
  root.PSYCH_IMPORTANT_CONCEPTS = IMPORTANT_CONCEPTS;

  if (typeof module !== "undefined") {
    module.exports = { SOURCE_LABELS, CONCEPTS, EXAMS, ESSAY_QUESTIONS, IMPORTANT_CONCEPTS };
  }
})();
