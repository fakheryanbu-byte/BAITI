export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories?: number;
  category: string;
  tags?: string[];
  sizes?: { id: string; name: string; price: number }[];
}

export const CATEGORIES = [
  { id: 'pies', name: 'الفطائر', icon: 'Pizza' },
  { id: 'pizza', name: 'البيتزا', icon: 'Pizza' },
  { id: 'grills', name: 'المشويات', icon: 'Flame' },
  { id: 'shawarma', name: 'الشاورما', icon: 'Beef' },
  { id: 'burger', name: 'البرجر', icon: 'ChefHat' },
  { id: 'falafel', name: 'الفلافل', icon: 'Salad' },
  { id: 'appetizers', name: 'المقبلات', icon: 'Salad' },
  { id: 'juices', name: 'العصائر', icon: 'GlassWater' },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- الفطائر ---
  { id: 'p1', name: 'جبن شيدر', description: 'فطيرة محشوة بجبن الشيدر الغني', price: 5.5, category: 'pies' },
  { id: 'p2', name: 'لبنة تركية', description: 'فطيرة بطعم اللبنة التركية الأصلية', price: 5.5, category: 'pies' },
  { id: 'p3', name: 'سبانخ', description: 'فطيرة السبانخ الطازجة', price: 5.5, category: 'pies' },
  { id: 'p4', name: 'زعتر', description: 'فطيرة الزعتر البلدي مع زيت الزيتون', price: 5.5, category: 'pies' },
  { id: 'p5', name: 'محمرة', description: 'فطيرة المحمرة الحراقة قليلاً', price: 5.5, category: 'pies' },
  { id: 'p6', name: 'جبن عكاوي', description: 'فطيرة جبن عكاوي فاخر', price: 6.0, category: 'pies' },
  { id: 'p7', name: 'لحم', description: 'فطيرة اللحم الطازج', price: 6.0, category: 'pies' },
  { id: 'p8', name: 'نوتيلا', description: 'فطيرة محشوة بشوكولاتة نوتيلا', price: 6.0, category: 'pies' },
  { id: 'p9', name: 'لبنة عسل', description: 'مزيج اللبنة مع العسل الصافي', price: 6.0, category: 'pies' },
  { id: 'p10', name: 'جبن بيض', description: 'فطيرة محشوة بالجبن والبيض', price: 10.0, category: 'pies' },
  { id: 'p11', name: 'صحن فطائر مشكل صغير', description: 'تشكيلة مختارة من أصناف الفطائر', price: 32.0, category: 'pies' },
  { id: 'p12', name: 'صحن فطائر مكس بيتي', description: 'أفخم تشكيلة فطائر من مطعم بيتي', price: 67.0, category: 'pies' },

  // --- البيتزا ---
  {
    id: 'pz-baiti',
    name: 'بيتزا بيتي كبير',
    description: 'بيتزا بيتي المميزة بحجم كبير',
    price: 37.0,
    category: 'pizza',
    sizes: [{ id: 'large', name: 'كبير', price: 37.0 }]
  },
  ...[
    { name: 'بيتزا محشية', p: [20, 27, 34] },
    { name: 'بيتزا محشية سبيشل', p: [26, 34, 41] },
    { name: 'بيتزا مكس أجبان', p: [19, 25, 31] },
    { name: 'بيتزا سبيشل', p: [18, 25, 31] },
    { name: 'بيتزا ملكي', p: [18, 25, 31] },
    { name: 'بيتزا دجاج رانش', p: [18, 25, 31] },
    { name: 'بيتزا لحم', p: [17, 24, 30] },
    { name: 'بيتزا بيبروني', p: [17, 24, 30] },
    { name: 'بيتزا مرتديلا', p: [17, 24, 30] },
    { name: 'بيتزا مكسيكي', p: [17, 24, 30] },
    { name: 'بيتزا دجاج', p: [17, 24, 30] },
    { name: 'بيتزا نقانق', p: [17, 24, 30] },
    { name: 'بيتزا سبانخ', p: [16, 23, 29] },
    { name: 'بيتزا هالابينو', p: [16, 22, 29] },
    { name: 'بيتزا خضار', p: [15, 21, 27] },
    { name: 'بيتزا جبن', p: [15, 21, 27] },
    { name: 'بيتزا كرافت', p: [15, 21, 27] },
    { name: 'عش البلبل - بالعسل', p: [15, 21, 27] },
    { name: 'عش البلبل بالزعتر', p: [15, 21, 27] },
    { name: 'شهد الملكة - بالعسل', p: [15, 21, 27] }
  ].map((item, index) => ({
    id: `pz-item-${index}`,
    name: item.name,
    description: `بيتزا ${item.name} طازجة وساخنة من الفرن`,
    price: item.p[0],
    category: 'pizza',
    sizes: [
      { id: 'small', name: 'صغير', price: item.p[0] },
      { id: 'medium', name: 'وسط', price: item.p[1] },
      { id: 'large', name: 'كبير', price: item.p[2] }
    ]
  })),

  // --- المشويات ---
  // صحون المشويات
  ...[
    { name: 'كباب لحم ملكي', p: [38, 74, 141] },
    { name: 'كباب خشخاش', p: [38, 74, 141] },
    { name: 'كباب لحم', p: [34, 67, 132] },
    { name: 'أوصال لحم', p: [33, 64, 126] },
    { name: 'كباب دجاج', p: [29, 57, 112] },
    { name: 'شيش طاووق', p: [31, 61, 120] },
    { name: 'شيش طاووق بالعظم', p: [24, 47, 92] },
    { name: 'ريش', p: [35, 70, 140] },
    { name: 'مشكل مشوي', p: [32, 63, 125] }
  ].map((item, index) => ({
    id: `gr-plate-${index}`,
    name: item.name,
    description: `${item.name} مشوي على الفحم`,
    price: item.p[0],
    category: 'grills',
    sizes: [
      { id: 'person', name: 'نفر', price: item.p[0] },
      { id: 'half-kilo', name: 'نص كيلو', price: item.p[1] },
      { id: 'kilo', name: 'كيلو', price: item.p[2] }
    ]
  })),
  { id: 'gr-plate-baiti-sm', name: 'مشوي بيتي صغير', description: 'صحن مشاوي بيتي متنوع حجم صغير', price: 211.0, category: 'grills' },
  { id: 'gr-plate-baiti-lg', name: 'مشوي بيتي كبير', description: 'صحن مشاوي بيتي عائلي فاخر', price: 285.0, category: 'grills' },
  {
    id: 'gr-chicken-coal',
    name: 'دجاج على الفحم',
    description: 'دجاج مشوي على الفحم مع الرز',
    price: 30.0,
    category: 'grills',
    sizes: [
      { id: 'half', name: 'نص حبة', price: 15.0 },
      { id: 'full', name: 'حبة', price: 30.0 }
    ]
  },
  { id: 'gr-rice', name: 'نفر رز', description: 'رز بسمتي طازج', price: 6.0, category: 'grills' },

  // سندوتشات المشويات
  ...[
    { name: 'كباب لحم ملكي', p: [12, 13] },
    { name: 'كباب لحم', p: [8, 9] },
    { name: 'أوصال لحم', p: [9, 10] },
    { name: 'كباب دجاج', p: [7, 8] },
    { name: 'شيش طاووق', p: [8, 9] }
  ].map((item, index) => ({
    id: `gr-sand-${index}`,
    name: `سندوتش ${item.name}`,
    description: `سندوتش ${item.name} مشوي طازج`,
    price: item.p[0],
    category: 'grills',
    sizes: [
      { id: 'regular', name: 'عادي', price: item.p[0] },
      { id: 'cheese', name: 'جبن', price: item.p[1] }
    ]
  })),
  ...[
    { name: 'كباب لحم', p: [15, 16] },
    { name: 'أوصال لحم', p: [16, 17] },
    { name: 'كباب دجاج', p: [13, 14] },
    { name: 'شيش طاووق', p: [15, 16] }
  ].map((item, index) => ({
    id: `gr-sarookh-${index}`,
    name: `صاروخ ${item.name}`,
    description: `سندوتش صاروخ ${item.name} حجم كبير`,
    price: item.p[0],
    category: 'grills',
    sizes: [
      { id: 'regular', name: 'عادي', price: item.p[0] },
      { id: 'cheese', name: 'جبن', price: item.p[1] }
    ]
  })),

  // --- الشاورما ---
  // شاورما دجاج
  {
    id: 'sh-ch-1',
    name: 'شاورما دجاج شامي / جبن',
    description: 'شاورما دجاج بخبز شامي طازج',
    price: 6.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 6.0 },
      { id: 'large', name: 'كبير', price: 7.0 }
    ]
  },
  {
    id: 'sh-ch-2',
    name: 'شاورما دجاج فطير / جبن',
    description: 'شاورما دجاج بخبز الفطير المميز',
    price: 7.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 7.0 },
      { id: 'large', name: 'كبير', price: 8.0 }
    ]
  },
  {
    id: 'sh-ch-3',
    name: 'شاورما دجاج صاروخ / جبن',
    description: 'سندوتش شاورما صاروخ حجم كبير',
    price: 10.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 10.0 },
      { id: 'large', name: 'كبير', price: 11.0 }
    ]
  },
  {
    id: 'sh-ch-4',
    name: 'صاروخ دجاج إيطالي',
    description: 'شاورما صاروخ على الطريقة الإيطالية',
    price: 11.0,
    category: 'shawarma',
    sizes: [{ id: 'large', name: 'كبير', price: 11.0 }]
  },
  {
    id: 'sh-ch-5',
    name: 'عربي دجاج صغير',
    description: 'وجبة عربي دجاج مع البطاطس والثوم',
    price: 14.0,
    category: 'shawarma',
    sizes: [
      { id: 'normal', name: 'عادي', price: 14.0 },
      { id: 'cheese', name: 'مع جبن', price: 15.0 },
      { id: 'double-cheese', name: 'دبل جبن', price: 16.0 }
    ]
  },
  {
    id: 'sh-ch-6',
    name: 'عربي دجاج وسط',
    description: 'وجبة عربي دجاج حجم وسط',
    price: 22.0,
    category: 'shawarma',
    sizes: [
      { id: 'normal', name: 'عادي', price: 22.0 },
      { id: 'cheese', name: 'مع جبن', price: 24.0 },
      { id: 'double-cheese', name: 'دبل جبن', price: 26.0 }
    ]
  },
  {
    id: 'sh-ch-7',
    name: 'عربي دجاج كبير',
    description: 'وجبة عربي دجاج حجم كبير للعائلة',
    price: 26.0,
    category: 'shawarma',
    sizes: [
      { id: 'normal', name: 'عادي', price: 26.0 },
      { id: 'cheese', name: 'مع جبن', price: 28.0 },
      { id: 'double-cheese', name: 'دبل جبن', price: 30.0 }
    ]
  },
  {
    id: 'sh-ch-8',
    name: 'عربي دجاج إيطالي',
    description: 'وجبة عربي دجاج بنكهة إيطالية',
    price: 15.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 15.0 },
      { id: 'large', name: 'كبير', price: 29.0 }
    ]
  },
  {
    id: 'sh-ch-9',
    name: 'عربي دجاج سويسري',
    description: 'وجبة عربي دجاج بنكهة سويسرية مميزة',
    price: 15.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 15.0 },
      { id: 'medium', name: 'وسط', price: 25.0 },
      { id: 'large', name: 'كبير', price: 29.0 }
    ]
  },
  { id: 'sh-ch-10', name: 'عربي دجاج مكس', description: 'وجبة عربي دجاج مشكلة', price: 29.0, category: 'shawarma' },
  {
    id: 'sh-ch-11',
    name: 'مصحصح شاورما دجاج / جبن',
    description: 'سندوتش مصحصح شاورما دجاج',
    price: 15.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 15.0 },
      { id: 'large', name: 'كبير', price: 16.0 }
    ]
  },
  { id: 'sh-ch-12', name: 'صحن شاورما دجاج شرحات', description: 'صحن شرحات شاورما دجاج', price: 33.0, category: 'shawarma' },
  { id: 'sh-ch-13', name: 'صحن شاورما دجاج ملكي', description: 'صحن ملكي شاورما دجاج فاخر', price: 38.0, category: 'shawarma' },
  { id: 'sh-ch-14', name: 'صحن اسكندر دجاج', description: 'صحن اسكندر شاورما دجاج تركي', price: 30.0, category: 'shawarma' },
  { id: 'sh-ch-15', name: 'صحن شاورما دجاج بيتي', description: 'أفخم صحن شاورما دجاج من بيتي', price: 42.0, category: 'shawarma' },
  { id: 'sh-ch-16', name: 'صحن كاساديا دجاج', description: 'كاساديا الدجاج المحشوة بالشاورما', price: 17.0, category: 'shawarma' },
  {
    id: 'sh-ch-17',
    name: 'صحن بطاطس',
    description: 'بطاطس مقلية مقرمشة',
    price: 5.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 5.0 },
      { id: 'medium', name: 'وسط', price: 7.0 },
      { id: 'large', name: 'كبير', price: 11.0 }
    ]
  },

  // شاورما لحم
  {
    id: 'sh-mt-1',
    name: 'شاورما لحم شامي / جبن',
    description: 'شاورما لحم بخبز شامي طازج',
    price: 9.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 9.0 },
      { id: 'large', name: 'كبير', price: 10.0 }
    ]
  },
  {
    id: 'sh-mt-2',
    name: 'شاورما لحم فطير / جبن',
    description: 'شاورما لحم بخبز الفطير المميز',
    price: 10.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 10.0 },
      { id: 'large', name: 'كبير', price: 11.0 }
    ]
  },
  {
    id: 'sh-mt-3',
    name: 'شاورما لحم صاروخ / جبن',
    description: 'سندوتش شاورما لحم صاروخ حجم كبير',
    price: 13.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 13.0 },
      { id: 'large', name: 'كبير', price: 14.0 }
    ]
  },
  { id: 'sh-mt-4', name: 'صاروخ لحم إيطالي', description: 'شاورما لحم صاروخ على الطريقة الإيطالية', price: 14.0, category: 'shawarma' },
  {
    id: 'sh-mt-5',
    name: 'عربي لحم صغير',
    description: 'وجبة عربي لحم مع البطاطس والثوم',
    price: 17.0,
    category: 'shawarma',
    sizes: [
      { id: 'normal', name: 'عادي', price: 17.0 },
      { id: 'cheese', name: 'مع جبن', price: 18.0 },
      { id: 'double-cheese', name: 'دبل جبن', price: 19.0 }
    ]
  },
  {
    id: 'sh-mt-6',
    name: 'عربي لحم وسط',
    description: 'وجبة عربي لحم حجم وسط',
    price: 26.0,
    category: 'shawarma',
    sizes: [
      { id: 'normal', name: 'عادي', price: 26.0 },
      { id: 'cheese', name: 'مع جبن', price: 28.0 },
      { id: 'double-cheese', name: 'دبل جبن', price: 30.0 }
    ]
  },
  {
    id: 'sh-mt-7',
    name: 'عربي لحم كبير',
    description: 'وجبة عربي لحم حجم كبير للعائلة',
    price: 30.0,
    category: 'shawarma',
    sizes: [
      { id: 'normal', name: 'عادي', price: 30.0 },
      { id: 'cheese', name: 'مع جبن', price: 32.0 },
      { id: 'double-cheese', name: 'دبل جبن', price: 34.0 }
    ]
  },
  {
    id: 'sh-mt-8',
    name: 'عربي لحم إيطالي',
    description: 'وجبة عربي لحم بنكهة إيطالية',
    price: 18.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 18.0 },
      { id: 'large', name: 'كبير', price: 32.0 }
    ]
  },
  {
    id: 'sh-mt-9',
    name: 'عربي لحم سويسري',
    description: 'وجبة عربي لحم بنكهة سويسرية مميزة',
    price: 18.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 18.0 },
      { id: 'medium', name: 'وسط', price: 29.0 },
      { id: 'large', name: 'كبير', price: 33.0 }
    ]
  },
  { id: 'sh-mt-10', name: 'عربي لحم مكس بلس', description: 'وجبة عربي لحم مشكلة بلس', price: 35.0, category: 'shawarma' },
  {
    id: 'sh-mt-11',
    name: 'محمرة شاورما لحم / جبن',
    description: 'محمرة شاورما لحم بالجبن',
    price: 18.0,
    category: 'shawarma',
    sizes: [
      { id: 'small', name: 'صغير', price: 18.0 },
      { id: 'large', name: 'كبير', price: 31.0 }
    ]
  },
  { id: 'sh-mt-12', name: 'صحن شاورما لحم شرحات', description: 'صحن شرحات شاورما لحم', price: 42.0, category: 'shawarma' },
  { id: 'sh-mt-13', name: 'صحن شاورما لحم ملكي', description: 'صحن ملكي شاورما لحم فاخر', price: 48.0, category: 'shawarma' },
  { id: 'sh-mt-14', name: 'صحن اسكندر لحم', description: 'صحن اسكندر شاورما لحم تركي', price: 33.0, category: 'shawarma' },
  { id: 'sh-mt-15', name: 'صحن شاورما لحم بيتي', description: 'أفخم صحن شاورما لحم من بيتي', price: 47.0, category: 'shawarma' },
  { id: 'sh-mt-16', name: 'صحن كاساديا لحم', description: 'كاساديا اللحم المحشوة بالشاورما', price: 20.0, category: 'shawarma' },

  // --- البرجر ---
  { id: 'br1', name: 'برجر دجاج', description: 'برجر دجاج كلاسيكي', price: 6.0, category: 'burger' },
  { id: 'br2', name: 'برجر دجاج بالجبن', description: 'برجر دجاج مع طبقة جبن', price: 7.0, category: 'burger' },
  { id: 'br3', name: 'برجر شاورما', description: 'برجر محشو بقطع الشاورما المميزة', price: 9.0, category: 'burger' },
  { id: 'br4', name: 'وجبة برجر كبيرة', description: 'برجر + بطاطس + بيبسي', price: 19.0, category: 'burger' },

  // --- الفلافل ---
  { id: 'fl1', name: 'فطيرة فلافل بالجبنة', description: 'فلافل طازجة مخبوزة كفطيرة مع الجبن', price: 7.0, category: 'falafel' },
  { id: 'fl2', name: 'ساندوتش طعمية', description: 'ساندوتش طعمية كلاسيكي', price: 4.0, category: 'falafel' },
  { id: 'fl3', name: 'عربي طعمية صغير', description: 'وجبة طعمية عربي مع الإضافات', price: 13.0, category: 'falafel' },
  { id: 'fl4', name: 'صحن طعمية كبير', description: 'صحن مشكل من الطعمية والمقبلات', price: 15.0, category: 'falafel' },

  // --- المقبلات ---
  { id: 'ap-tabbouleh', name: 'تبولة', description: 'سلطة التبولة الشامية الطازجة', price: 7.0, category: 'appetizers' },
  { id: 'ap-hummus', name: 'حمص', description: 'حمص بطحينة محضر يومياً', price: 8.0, category: 'appetizers' },
  { id: 'ap-mutabbal', name: 'متبل', description: 'باذنجان مشوي مع الطحينة', price: 8.0, category: 'appetizers' },
  { id: 'ap-baba', name: 'بابا غنوج', description: 'باذنجان مشوي مع الخضار والطحينة', price: 8.0, category: 'appetizers' },
  { id: 'ap-muhammara', name: 'محمرة', description: 'محمرة حارة بالجوز وزيت الزيتون', price: 8.0, category: 'appetizers' },
  { id: 'ap-mixed', name: 'مشكل مقبلات', description: 'صحن يجمع أفضل أنواع المقبلات لدينا', price: 17.0, category: 'appetizers' },
  { id: 'ap-soda-sm', name: 'مشروب غازي', description: 'مشروب غازي بارد (علبة)', price: 3.0, category: 'appetizers' },
  { id: 'ap-soda-family', name: 'مشروب غازي عائلي', description: 'مشروب غازي حجم عائلي كبير', price: 9.0, category: 'appetizers' },

  // --- العصائر الطبيعية ---
  ...[
    "مانجو", "جوافة", "مانجو بالحليب", "جوافة بالحليب", "رمان", "رمان بالعنب", 
    "رمان + برتقال", "برتقال خلاط", "برتقال بالليمون", "ليمون", "ليمون نعناع", 
    "ليمون بالزنجبيل", "شمام", "شمام بالحليب", "شمام بالعسل", "فراولة", 
    "فراولة بالحليب", "كيوي", "كيوي بالليمون", "كيوي أناناس", "كوكتيل", 
    "تفاح أحمر - أخضر", "موز", "موز بالعسل", "موز بالحليب", "عنب أسود", 
    "أفوكادو بالحليب", "أفوكادو بالتفاح", "أفوكادو بالفراولة", 
    "أفوكادو بالموز والعسل", "أفوكادو بالمانجو", "أفوكادو + شمام", 
    "أفوكادو + فراولة", "حبحب", "حبحب رمان", "أناناس", "شمندر", 
    "شمندر بالرمان", "شمندر بالبرتقال"
  ].map((name, index) => ({
    id: `ju-nat-${index}`,
    name,
    description: `عصير ${name} طازج ومنعش`,
    price: 5.0, // Default for small
    category: 'juices',
    sizes: [
      { id: 'small', name: 'صغير', price: 5.0 },
      { id: 'medium', name: 'وسط', price: 8.0 },
      { id: 'large', name: 'كبير', price: 10.0 }
    ]
  })),
  {
    id: 'ju-orange-pressed',
    name: 'برتقال كبس',
    description: 'عصير برتقال كبس طازج',
    price: 8.0,
    category: 'juices',
    sizes: [
      { id: 'small', name: 'صغير', price: 8.0 },
      { id: 'medium', name: 'وسط', price: 12.0 },
      { id: 'large', name: 'كبير', price: 14.0 }
    ]
  },

  // --- الخلطات الخاصة ---
  ...[
    "عوار قلب", "أسحار", "السهرة", "أينشتاين", "عرايسي", "عصير VIP", 
    "جي", "أصفهاني", "فياجرا", "ملكية", "جيم", "مانجو آيسكريم"
  ].map((name, index) => ({
    id: `ju-spec-${index}`,
    name,
    description: `خلطة ${name} المميزة من مطعم بيتي`,
    price: 7.0,
    category: 'juices',
    sizes: [
      { id: 'small', name: 'صغير', price: 7.0 },
      { id: 'medium', name: 'وسط', price: 10.0 },
      { id: 'large', name: 'كبير', price: 12.0 }
    ]
  })),

  // --- عصيرات الشقف ---
  ...[
    "رمان حب", "حبحب شقف", "أناناس شقف", "كيوي شقف", "مانجو شقف", 
    "شمام شقف", "طبقات", "عرايسي شقف"
  ].map((name, index) => ({
    id: `ju-shagaf-${index}`,
    name,
    description: `عصير ${name} بقطع الفواكه الطازجة`,
    price: 9.0,
    category: 'juices',
    sizes: [
      { id: 'small', name: 'صغير', price: 9.0 },
      { id: 'medium', name: 'وسط', price: 11.0 },
      { id: 'large', name: 'كبير', price: 22.0 }
    ]
  })),
];
