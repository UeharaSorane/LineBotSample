var rollbase = require('./rollbase.js');
var rply = {
	type: 'text'
}; //type是必需的,但可以更改

////////////////////////////////////////
//////////////// 恐懼
////////////////////////////////////////
var cocmadnessrt = [
	['1)失憶：調查員會發現自己只記得最後身處的安全地點，卻沒有任何來到這裡的記憶。例如，調查員前一刻還在家中吃著早飯，下一刻就已經直面著不知名的怪物。'],
	['2)假性殘疾：調查員陷入了心理性的失明，失聰以及軀體缺失感中。'],
	['3)暴力傾向：調查員陷入了六親不認的暴力行為中，對周圍的敵人與友方進行著無差別的攻擊。'],
	['4)偏執：調查員陷入了嚴重的偏執妄想之中。有人在暗中窺視著他們，同伴中有人背叛了他們，沒有人可以信任，萬事皆虛。'],
	['5)人際依賴：守秘人適當參考調查員的背景中重要之人的條目，調查員因為一些原因而將他人誤認為了他重要的人並且努力的會與那個人保持那種關係。'],
	['6)昏厥：調查員當場昏倒。'],
	['7)逃避行為：調查員會用任何的手段試圖逃離現在所處的位置，即使這意味著開走唯一一輛交通工具並將其它人拋諸腦後。'],
	['8)竭嘶底裡：調查員表現出大笑，哭泣，嘶吼，害怕等的極端情緒表現。'],
	['9)恐懼：調查員投一個D100或者由守秘人選擇，來從恐懼症狀表中選擇一個恐懼源，就算這一恐懼的事物是並不存在的，調查員的症狀會持續1D10 輪。'],
	['10)狂躁：調查員投一個D100 或者由守秘人選擇，來從狂躁症狀表中選擇一個狂躁的誘因。']
];

var cocmadnesssu = [
	['1)失憶（Amnesia）：回過神來，調查員們發現自己身處一個陌生的地方，並忘記了自己是誰。記憶會隨時間恢復。'],
	['2)被竊（Robbed）：調查員恢復清醒，發覺自己被盜，身體毫髮無損。如果調查員攜帶著寶貴之物（見調查員背景），做幸運檢定來決定其是否被盜。所有有價值的東西無需檢定自動消失。'],
	['3)遍體鱗傷（Battered）：調查員恢復清醒，發現自己身上滿是拳痕和瘀傷。生命值減少到瘋狂前的一半，但這不會造成重傷。調查員沒有被竊。這種傷害如何持續到現在由守秘人決定。'],
	['4)暴力傾向（Violence）：調查員陷入強烈的暴力與破壞欲之中。調查員回過神來可能會理解自己做了什麼也可能毫無印象。調查員對誰或何物施以暴力，他們是殺人還是僅僅造成了傷害，由守秘人決定。'],
	['5)極端信念（Ideology/Beliefs）：查看調查員背景中的思想信念，調查員會採取極端和瘋狂的表現手段展示他們的思想信念之一。比如一個信教者會在地鐵上高聲佈道。'],
	['6)重要之人（Significant People）：考慮調查員背景中的重要之人，及其重要的原因。在1D10 小時或更久的時間中，調查員將不顧一切地接近那個人，並為他們之間的關係做出行動。'],
	['7)被收容（Institutionalized）：調查員在精神病院病房或警察局牢房中回過神來，他們可能會慢慢回想起導致自己被關在這裡的事情。'],
	['8)逃避行為（Flee in panic）：調查員恢復清醒時發現自己在很遠的地方，也許迷失在荒郊野嶺，或是在駛向遠方的列車或長途汽車上。'],
	['9)恐懼（Phobia）：調查員患上一個新的恐懼症。在表Ⅸ：恐懼症狀表上骰1 個D100 來決定症狀，或由守秘人選擇一個。調查員在回過神來，並開始為避開恐懼源而採取任何措施。'],
	['10)狂躁（Mania）：調查員患上一個新的狂躁症。在表Ⅹ：狂躁症狀表上骰1 個d100 來決定症狀，或由守秘人選擇一個。在這次瘋狂發作中，調查員將完全沉浸於其新的狂躁症狀。這症狀是否會表現給旁人則取決於守秘人和此調查員。']
];

var cocPhobias = [
	['1) 沐浴癖（Ablutomania）：執著于清洗自己。'],
	['2) 猶豫癖（Aboulomania）：病態地猶豫不定。'],
	['3) 喜暗狂（Achluomania）：對黑暗的過度熱愛。'],
	['4) 喜高狂（Acromaniaheights）：狂熱迷戀高處。'],
	['5) 親切癖（Agathomania）：病態地對他人友好。'],
	['6) 喜曠症（Agromania）：强烈地傾向于待在開闊空間中。'],
	['7) 喜尖狂（Aichmomania）：痴迷于尖銳或鋒利的物體。'],
	['8) 戀猫狂（Ailuromania）：近乎病態地對猫友善。'],
	['9) 疼痛癖（Algomania）：痴迷于疼痛。'],
	['10) 喜蒜狂（Alliomania）：痴迷于大蒜。'],
	['11) 乘車癖（Amaxomania）：痴迷于乘坐車輛。'],
	['12) 欣快癖（Amenomania）：不正常地感到喜悅。'],
	['13) 喜花狂（Anthomania）：痴迷于花朵。'],
	['14) 計算癖（Arithmomania）：狂熱地痴迷于數字。'],
	['15) 消費癖（Asoticamania）：魯莽衝動地消費。'],
	['16) 隱居癖*（Automania）：過度地熱愛獨自隱居。（原文如此，存疑，Automania實際上是戀車癖）'],
	['17) 芭蕾癖（Balletmania）：痴迷于芭蕾舞。'],
	['18) 竊書癖（Biliokleptomania）：無法克制偷竊書籍的衝動。'],
	['19) 戀書狂（Bibliomania）：痴迷于書籍和/或閱讀'],
	['20) 磨牙癖（Bruxomania）：無法克制磨牙的衝動。'],
	['21) 靈臆症（Cacodemomania）：病態地堅信自己已被一個邪惡的靈體占據。'],
	['22) 美貌狂（Callomania）：痴迷于自身的美貌。'],
	['23) 地圖狂（Cartacoethes）：在何時何處都無法控制查閱地圖的衝動。'],
	['24) 跳躍狂（Catapedamania）：痴迷于從高處跳下。'],
	['25) 喜冷症（Cheimatomania）：對寒冷或寒冷的物體的反常喜愛。'],
	['26) 舞蹈狂（Choreomania）：無法控制地起舞或發顫。'],
	['27) 戀床癖（Clinomania）：過度地熱愛待在床上。'],
	['28) 戀墓狂（Coimetormania）：痴迷于墓地。'],
	['29) 色彩狂（Coloromania）：痴迷于某種顔色。'],
	['30) 小丑狂（Coulromania）：痴迷于小丑。'],
	['31) 恐懼狂（Countermania）：執著于經歷恐怖的場面。'],
	['32) 殺戮癖（Dacnomania）：痴迷于殺戮。'],
	['33) 魔臆症（Demonomania）：病態地堅信自己已被惡魔附身。'],
	['34) 抓撓癖（Dermatillomania）：執著于抓撓自己的皮膚。'],
	['35) 正義狂（Dikemania）：痴迷于目睹正義被伸張。'],
	['36) 嗜酒狂（Dipsomania）：反常地渴求酒精。'],
	['37) 毛皮狂（Doramania）：痴迷于擁有毛皮。（存疑）'],
	['38) 贈物癖（Doromania）：痴迷于贈送禮物。'],
	['39) 漂泊症（Drapetomania）：執著于逃離。'],
	['40) 漫游癖（Ecdemiomania）：執著于四處漫游。'],
	['41) 自戀狂（Egomania）：近乎病態地以自我爲中心或自我崇拜。'],
	['42) 職業狂（Empleomania）：對于工作的無盡病態渴求。'],
	['43) 臆罪症（Enosimania）：病態地堅信自己帶有罪孽。'],
	['44) 學識狂（Epistemomania）：痴迷于獲取學識。'],
	['45) 靜止癖（Eremiomania）：執著于保持安靜。'],
	['46) 乙醚上癮（Etheromania）：渴求乙醚。'],
	['47) 求婚狂（Gamomania）：痴迷于進行奇特的求婚。'],
	['48) 狂笑癖（Geliomania）：無法自製地，强迫性的大笑。'],
	['49) 巫術狂（Goetomania）：痴迷于女巫與巫術。'],
	['50) 寫作癖（Graphomania）：痴迷于將每一件事寫下來。'],
	['51) 裸體狂（Gymnomania）：執著于裸露身體。'],
	['52) 妄想狂（Habromania）：近乎病態地充滿愉快的妄想（而不顧現實狀况如何）。'],
	['53) 蠕蟲狂（Helminthomania）：過度地喜愛蠕蟲。'],
	['54) 槍械狂（Hoplomania）：痴迷于火器。'],
	['55) 飲水狂（Hydromania）：反常地渴求水分。'],
	['56) 喜魚癖（Ichthyomania）：痴迷于魚類。'],
	['57) 圖標狂（Iconomania）：痴迷于圖標與肖像'],
	['58) 偶像狂（Idolomania）：痴迷于甚至願獻身于某個偶像。'],
	['59) 信息狂（Infomania）：痴迷于積累各種信息與資訊。'],
	['60) 射擊狂（Klazomania）：反常地執著于射擊。'],
	['61) 偷竊癖（Kleptomania）：反常地執著于偷竊。'],
	['62) 噪音癖（Ligyromania）：無法自製地執著于製造響亮或刺耳的噪音。'],
	['63) 喜綫癖（Linonomania）：痴迷于綫繩。'],
	['64) 彩票狂（Lotterymania）：極端地執著于購買彩票。'],
	['65) 抑鬱症（Lypemania）：近乎病態的重度抑鬱傾向。'],
	['66) 巨石狂（Megalithomania）：當站在石環中或立起的巨石旁時，就會近乎病態地寫出各種奇怪的創意。'],
	['67) 旋律狂（Melomania）：痴迷于音樂或一段特定的旋律。'],
	['68) 作詩癖（Metromania）：無法抑制地想要不停作詩。'],
	['69) 憎恨癖（Misomania）：憎恨一切事物，痴迷于憎恨某個事物或團體。'],
	['70) 偏執狂（Monomania）：近乎病態地痴迷與專注某個特定的想法或創意。'],
	['71) 誇大癖（Mythomania）：以一種近乎病態的程度說謊或誇大事物。'],
	['72) 臆想症（Nosomania）：妄想自己正在被某種臆想出的疾病折磨。'],
	['73) 記錄癖（Notomania）：執著于記錄一切事物（例如攝影）'],
	['74) 戀名狂（Onomamania）：痴迷于名字（人物的、地點的、事物的）'],
	['75) 稱名癖（Onomatomania）：無法抑制地不斷重複某個詞語的衝動。'],
	['76) 剔指癖（Onychotillomania）：執著于剔指甲。'],
	['77) 戀食癖（Opsomania）：對某種食物的病態熱愛。'],
	['78) 抱怨癖（Paramania）：一種在抱怨時産生的近乎病態的愉悅感。'],
	['79) 面具狂（Personamania）：執著于佩戴面具。'],
	['80) 幽靈狂（Phasmomania）：痴迷于幽靈。'],
	['81) 謀殺癖（Phonomania）：病態的謀殺傾向。'],
	['82) 渴光癖（Photomania）：對光的病態渴求。'],
	['83) 背德癖（Planomania）：病態地渴求違背社會道德（原文如此，存疑，Planomania實際上是漂泊症）'],
	['84) 求財癖（Plutomania）：對財富的强迫性的渴望。'],
	['85) 欺騙狂（Pseudomania）：無法抑制的執著于撒謊。'],
	['86) 縱火狂（Pyromania）：執著于縱火。'],
	['87) 提問狂（Questiong-Asking Mania）：執著于提問。'],
	['88) 挖鼻癖（Rhinotillexomania）：執著于挖鼻子。'],
	['89) 塗鴉癖（Scribbleomania）：沉迷于塗鴉。'],
	['90) 列車狂（Siderodromomania）：認爲火車或類似的依靠軌道交通的旅行方式充滿魅力。'],
	['91) 臆智症（Sophomania）：臆想自己擁有難以置信的智慧。'],
	['92) 科技狂（Technomania）：痴迷于新的科技。'],
	['93) 臆咒狂（Thanatomania）：堅信自己已被某種死亡魔法所詛咒。'],
	['94) 臆神狂（Theomania）：堅信自己是一位神靈。'],
	['95) 抓撓癖（Titillomaniac）：抓撓自己的强迫傾向。'],
	['96) 手術狂（Tomomania）：對進行手術的不正常愛好。'],
	['97) 拔毛癖（Trichotillomania）：執著于拔下自己的頭髮。'],
	['98) 臆盲症（Typhlomania）：病理性的失明。'],
	['99) 嗜外狂（Xenomania）：痴迷于异國的事物。'],
	['100) 喜獸癖（Zoomania）：對待動物的態度近乎瘋狂地友好。']
];

var cocManias = [
	['1) 洗澡恐懼症（Ablutophobia）：對于洗滌或洗澡的恐懼。'],
	['2) 恐高症（Acrophobia）：對于身處高處的恐懼。'],
	['3) 飛行恐懼症（Aerophobia）：對飛行的恐懼。'],
	['4) 廣場恐懼症（Agoraphobia）：對于開放的（擁擠）公共場所的恐懼。'],
	['5) 恐鶏症（Alektorophobia）：對鶏的恐懼。'],
	['6) 大蒜恐懼症（Alliumphobia）：對大蒜的恐懼。'],
	['7) 乘車恐懼症（Amaxophobia）：對于乘坐地面載具的恐懼。'],
	['8) 恐風症（Ancraophobia）：對風的恐懼。'],
	['9) 男性恐懼症（Androphobia）：對于成年男性的恐懼。'],
	['10) 恐英症（Anglophobia）：對英格蘭或英格蘭文化的恐懼。'],
	['11) 恐花症（Anthophobia）：對花的恐懼。'],
	['12) 截肢者恐懼症（Apotemnophobia）：對截肢者的恐懼。'],
	['13) 蜘蛛恐懼症（Arachnophobia）：對蜘蛛的恐懼。'],
	['14) 閃電恐懼症（Astraphobia）：對閃電的恐懼。'],
	['15) 廢墟恐懼症（Atephobia）：對遺迹或殘址的恐懼。'],
	['16) 長笛恐懼症（Aulophobia）：對長笛的恐懼。'],
	['17) 細菌恐懼症（Bacteriophobia）：對細菌的恐懼。'],
	['18) 導彈/子彈恐懼症（Ballistophobia）：對導彈或子彈的恐懼。'],
	['19) 跌落恐懼症（Basophobia）：對于跌倒或摔落的恐懼。'],
	['20) 書籍恐懼症（Bibliophobia）：對書籍的恐懼。'],
	['21) 植物恐懼症（Botanophobia）：對植物的恐懼。'],
	['22) 美女恐懼症（Caligynephobia）：對美貌女性的恐懼。'],
	['23) 寒冷恐懼症（Cheimaphobia）：對寒冷的恐懼。'],
	['24) 恐鐘錶症（Chronomentrophobia）：對于鐘錶的恐懼。'],
	['25) 幽閉恐懼症（Claustrophobia）：對于處在封閉的空間中的恐懼。'],
	['26) 小丑恐懼症（Coulrophobia）：對小丑的恐懼。'],
	['27) 恐犬症（Cynophobia）：對狗的恐懼。'],
	['28) 惡魔恐懼症（Demonophobia）：對邪靈或惡魔的恐懼。'],
	['29) 人群恐懼症（Demophobia）：對人群的恐懼。'],
	['30) 牙科恐懼症①（Dentophobia）：對牙醫的恐懼。'],
	['31) 丟弃恐懼症（Disposophobia）：對于丟弃物件的恐懼（貯藏癖）。'],
	['32) 皮毛恐懼症（Doraphobia）：對動物皮毛的恐懼。'],
	['33) 過馬路恐懼症（Dromophobia）：對于過馬路的恐懼。'],
	['34) 教堂恐懼症（Ecclesiophobia）：對教堂的恐懼。'],
	['35) 鏡子恐懼症（Eisoptrophobia）：對鏡子的恐懼。'],
	['36) 針尖恐懼症（Enetophobia）：對針或大頭針的恐懼。'],
	['37) 昆蟲恐懼症（Entomophobia）：對昆蟲的恐懼。'],
	['38) 恐猫症（Felinophobia）：對猫的恐懼。'],
	['39) 過橋恐懼症（Gephyrophobia）：對于過橋的恐懼。'],
	['40) 恐老症（Gerontophobia）：對于老年人或變老的恐懼。'],
	['41)恐女症（Gynophobia）：對女性的恐懼。'],
	['42) 恐血症（Haemaphobia）：對血的恐懼。'],
	['43) 宗教罪行恐懼症（Hamartophobia）：對宗教罪行的恐懼。'],
	['44) 觸摸恐懼症（Haphophobia）：對于被觸摸的恐懼。'],
	['45) 爬蟲恐懼症（Herpetophobia）：對爬行動物的恐懼。'],
	['46) 迷霧恐懼症（Homichlophobia）：對霧的恐懼。'],
	['47) 火器恐懼症（Hoplophobia）：對火器的恐懼。'],
	['48) 恐水症（Hydrophobia）：對水的恐懼。'],
	['49) 催眠恐懼症①（Hypnophobia）：對于睡眠或被催眠的恐懼。'],
	['50) 白袍恐懼症（Iatrophobia）：對醫生的恐懼。'],
	['51) 魚類恐懼症（Ichthyophobia）：對魚的恐懼。'],
	['52) 蟑螂恐懼症（Katsaridaphobia）：對蟑螂的恐懼。'],
	['53) 雷鳴恐懼症（Keraunophobia）：對雷聲的恐懼。'],
	['54) 蔬菜恐懼症（Lachanophobia）：對蔬菜的恐懼。'],
	['55) 噪音恐懼症（Ligyrophobia）：對刺耳噪音的恐懼。'],
	['56) 恐湖症（Limnophobia）：對湖泊的恐懼。'],
	['57) 機械恐懼症（Mechanophobia）：對機器或機械的恐懼。'],
	['58) 巨物恐懼症（Megalophobia）：對于龐大物件的恐懼。'],
	['59) 捆綁恐懼症（Merinthophobia）：對于被捆綁或緊縛的恐懼。'],
	['60) 流星恐懼症（Meteorophobia）：對流星或隕石的恐懼。'],
	['61) 孤獨恐懼症（Monophobia）：對于一人獨處的恐懼。'],
	['62) 不潔恐懼症（Mysophobia）：對污垢或污染的恐懼。'],
	['63) 粘液恐懼症（Myxophobia）：對粘液（史萊姆）的恐懼。'],
	['64) 尸體恐懼症（Necrophobia）：對尸體的恐懼。'],
	['65) 數字8恐懼症（Octophobia）：對數字8的恐懼。'],
	['66) 恐牙症（Odontophobia）：對牙齒的恐懼。'],
	['67) 恐夢症（Oneirophobia）：對夢境的恐懼。'],
	['68) 稱呼恐懼症（Onomatophobia）：對于特定詞語的恐懼。'],
	['69) 恐蛇症（Ophidiophobia）：對蛇的恐懼。'],
	['70) 恐鳥症（Ornithophobia）：對鳥的恐懼。'],
	['71) 寄生蟲恐懼症（Parasitophobia）：對寄生蟲的恐懼。'],
	['72) 人偶恐懼症（Pediophobia）：對人偶的恐懼。'],
	['73) 吞咽恐懼症（Phagophobia）：對于吞咽或被吞咽的恐懼。'],
	['74) 藥物恐懼症（Pharmacophobia）：對藥物的恐懼。'],
	['75) 幽靈恐懼症（Phasmophobia）：對鬼魂的恐懼。'],
	['76) 日光恐懼症（Phenogophobia）：對日光的恐懼。'],
	['77) 鬍鬚恐懼症（Pogonophobia）：對鬍鬚的恐懼。'],
	['78) 河流恐懼症（Potamophobia）：對河流的恐懼。'],
	['79) 酒精恐懼症（Potophobia）：對酒或酒精的恐懼。'],
	['80) 恐火症（Pyrophobia）：對火的恐懼。'],
	['81) 魔法恐懼症（Rhabdophobia）：對魔法的恐懼。'],
	['82) 黑暗恐懼症（Scotophobia）：對黑暗或夜晚的恐懼。'],
	['83) 恐月症（Selenophobia）：對月亮的恐懼。'],
	['84) 火車恐懼症（Siderodromophobia）：對于乘坐火車出行的恐懼。'],
	['85) 恐星症（Siderophobia）：對星星的恐懼。'],
	['86) 狹室恐懼症（Stenophobia）：對狹小物件或地點的恐懼。'],
	['87) 對稱恐懼症（Symmetrophobia）：對對稱的恐懼。'],
	['88) 活埋恐懼症（Taphephobia）：對于被活埋或墓地的恐懼。'],
	['89) 公牛恐懼症（Taurophobia）：對公牛的恐懼。'],
	['90) 電話恐懼症（Telephonophobia）：對電話的恐懼。'],
	['91) 怪物恐懼症①（Teratophobia）：對怪物的恐懼。'],
	['92) 深海恐懼症（Thalassophobia）：對海洋的恐懼。'],
	['93) 手術恐懼症（Tomophobia）：對外科手術的恐懼。'],
	['94) 十三恐懼症（Triskadekaphobia）：對數字13的恐懼症。'],
	['95) 衣物恐懼症（Vestiphobia）：對衣物的恐懼。'],
	['96) 女巫恐懼症（Wiccaphobia）：對女巫與巫術的恐懼。'],
	['97) 黃色恐懼症（Xanthophobia）：對黃色或“黃”字的恐懼。'],
	['98) 外語恐懼症（Xenoglossophobia）：對外語的恐懼。'],
	['99) 异域恐懼症（Xenophobia）：對陌生人或外國人的恐懼。'],
	['100) 動物恐懼症（Zoophobia）：對動物的恐懼。']

];

function ccrt() {
	var rollcc = Math.floor(Math.random() * 10);
	var time = Math.floor(Math.random() * 10) + 1;
	var PP = Math.floor(Math.random() * 100);
	if (rollcc <= 7) {
		rply.text = cocmadnessrt[rollcc] + '\n症狀持續' + time + '輪數';
	} else
	if (rollcc == 8) {
		rply.text = cocmadnessrt[rollcc] + '\n症狀持續' + time + '輪數' + ' \n' + cocManias[PP];
	} else
	if (rollcc == 9) {
		rply.text = cocmadnessrt[rollcc] + '\n症狀持續' + time + '輪數' + ' \n' + cocPhobias[PP];
	};
	return rply;
}
function ccsu() {
	var rollcc = Math.floor(Math.random() * 10);
	var time = Math.floor(Math.random() * 10) + 1;
	var PP = Math.floor(Math.random() * 100);
	if (rollcc <= 7) {
		rply.text = cocmadnesssu[rollcc] + '\n症狀持續' + time + '小時';
	} else
	if (rollcc == 8) {
		rply.text = cocmadnesssu[rollcc] + '\n症狀持續' + time + '小時' + ' \n' + cocManias[PP];
	} else
	if (rollcc == 9) {
		rply.text = cocmadnesssu[rollcc] + '\n症狀持續' + time + '小時' + ' \n' + cocPhobias[PP];
	};
	return rply;
}
