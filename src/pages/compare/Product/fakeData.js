  // fake data :
  const article = {
    Id_article: 1,
    product_number: "24G-P5-4999-KR",
    designation: "EVGA RTX 3090 Ti FTW3 KINGPIN",
    marque: "EVGA",
    img_src: "https://tpucdn.com/gpu-specs/images/b/9743-front.jpg",
    img_alt: "EVGA RTX 3090 Ti FTW3 KINGPIN",
    Id_model: 2,
  };
  const model = {
    Id_model: 2,
    name: "RTX 3000",
    Id_category: 1,
  };
  const category = {
    Id_category: 1,
    name: "Cartes Graphique",
    code: "cg",
    img_src: null,
    img_alt: "Cartes Graphique",
  };
  const gpu = {
    Id_gpu: 147,
    ean: null,
    upc: null,
    chipset: "3090Ti",
    color: "Black",
    gpu_clock: 1560,
    boost_clock: 1905,
    memory_clock: 1313,
    bus_interface: "4.0 x16",
    bus_width: 384,
    memory_vram: 24,
    slot_width: 3,
    length: 331,
    width: 150,
    height: 70,
    tdp: 450,
    psu_needed: 850,
    nb_hdmi: 1,
    nb_dp: 3,
    nb_usbc: 0,
    power_connector: "1 x 16 Pin ",
    pixel_rate: 213,
    texture_rate: 640,
    fp32: 41,
    shader: 10752,
    tmu: 336,
    rop: 112,
    sm_cu: 874,
    tensor_cores: 336,
    rt_cores: 84,
    Id_article: 147,
  };
  const comments = [
    {
      Id_comment: 1,
      content:
        "This GPU is amazing! I was able to play all my favorite games at max settings with no issues.",
      note: 5,
      createdBy: "Secutor",
      deletedBy: null,
      modifiedBy: null,
      createdAt: "2022-04-01",
      deletedAt: null,
      modifiedAt: null,
      Id_customer: 6,
      Id_article: 1,
    },
    {
      Id_comment: 2,
      content:
        "I'm disappointed with this GPU. It's not as powerful as I expected and I've had some stability issues.",
      note: 2,
      createdBy: "TestPseudo_100",
      deletedBy: null,
      modifiedBy: null,
      createdAt: "2022-04-03",
      deletedAt: null,
      modifiedAt: null,
      Id_customer: 7,
      Id_article: 1,
    },
    {
      Id_comment: 3,
      content: "Good GPU for the price. I've had no issues so far.",
      note: 4,
      createdBy: "TestPseudo_2",
      deletedBy: null,
      modifiedBy: null,
      createdAt: "2022-04-05",
      deletedAt: null,
      modifiedAt: null,
      Id_customer: 8,
      Id_article: 1,
    },
  ];

  const seller = [
    {
      name: "LDLC",
      img_src: "https://ldlc.com/logo.png",
      img_alt: "LDLC logo",
    },
    {
      name: "Amazon",
      img_src: "https://amazon.com/logo.png",
      img_alt: "Amazon logo",
    },
  ];

  const historique_prix = [
    { price: 500, date: "2022-04-01" },
    { price: 490, date: "2022-04-02" },
    { price: 480, date: "2022-04-03" },
    { price: 470, date: "2022-04-04" },
    { price: 460, date: "2022-04-05" },
  ];

  const seller_historique_article = [
    {
      article_id: 1,
      seller_id: 1,
      historique_prix_id: 1,
    },
    {
      article_id: 1,
      seller_id: 1,
      historique_prix_id: 2,
    },
    {
      article_id: 1,
      seller_id: 1,
      historique_prix_id: 3,
    },
    {
      article_id: 1,
      seller_id: 1,
      historique_prix_id: 4,
    },
    {
      article_id: 1,
      seller_id: 1,
      historique_prix_id: 5,
    },
    {
      article_id: 1,
      seller_id: 2,
      historique_prix_id: 1,
    },
    {
      article_id: 1,
      seller_id: 2,
      historique_prix_id: 2,
    },
    {
      article_id: 1,
      seller_id: 2,
      historique_prix_id: 3,
    },
    {
      article_id: 1,
      seller_id: 2,
      historique_prix_id: 4,
    },
    {
      article_id: 1,
      seller_id: 2,
      historique_prix_id: 5,
    },
  ];

