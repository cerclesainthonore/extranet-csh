db = db.getSiblingDB("CSH");
db.createCollection("Newsletter");
db.createCollection("Conferences");

function insertConference({
                              title,
                              authors,
                              date,
                              summary,
                              link,
                              tags,
                              coverFilename
                          }) {
    db.Conferences.updateOne({
            date
        },
        {
            $setOnInsert: {
                title,
                authors,
                date,
                summary,
                link,
                tags,
                coverFilename
            }
        },
        {upsert: true}
    )
}

insertConference({
    title: "Le chant liturgique",
    authors: ["Fabrice Hadjadj"],
    date: new Date("2023-03-10"),
    summary: "Nous recevrons le 10 Mars à Saint Roch dans le cadre du Cercle Saint Honoré avec le Chœur Liturgique Lux Amoris Fabrice Hadjadj pour une conférence sur Le chant liturgique.\n" +
        "\"Chanter c'est prier deux fois... ou pas du tout !\"\n" +
        "Fabrice Hadjadj est un philosophe, écrivain et dramaturge de langue française, juif de nom arabe et de confession catholique.\n" +
        "Lux Amoris est un chœur liturgique créé en 2018, qui a pour objectif la promotion du chant sacré et la formation des choristes.",
    link: "https://www.youtube.com/embed/YZL4qC9kTWU?si=XsQcaSco7djbsID1",
    tags: ["liturgy", "art", "interview", "religion"],
    coverFilename: "2023_03_10-chant_liturgique"
});

insertConference({
    title: "Le Saint Suaire de Turin",
    authors: ["Jean-Christian Petitfils"],
    date: new Date("2023-03-23"),
    summary: "",
    link: "",
    tags: ["apologetics", "book", "history", "religion"],
    coverFilename: "2023_03_23-saint_suaire_de_turin"
});

insertConference({
    title: "Charles et Zita de Habsbourg : itinéraire spirituel d'un couple",
    authors: ["Elizabeth Montfort"],
    date: new Date("2023-03-27"),
    summary: "Nous recevrons le 27 Mars à Saint Roch dans le cadre du Cercle Saint Honoré Elizabeth Montfort pour son dernier livre Charles et Zita de Habsbourg.\n" +
        "Elizabeth Montfort, diplômée en droit et en philosophie, a été députée au Parlement européen de 1999 à 2004. Elle est responsable pour la France de la Ligue de prière du bienheureux Charles d'Autriche pour la paix des peuples et secrétaire générale de l'Association pour la béatification de l'impératrice et reine Zita, épouse et mère de famille.",
    link: "https://www.youtube.com/embed/qECCwrlWDUM?si=YN5wZybbaGCEAzP3",
    tags: ["spirituality", "book", "philosophy", "biography", "religion"],
    coverFilename: "2023_03_27-charles_et_zita_de_habsbourg"
});

insertConference({
    title: "SEPTENTRION",
    authors: ["François-Régis Dabas"],
    date: new Date("2023-04-14"),
    summary: "",
    link: "",
    tags: ["book", "testimony", "geopolitics"],
    coverFilename: "2023_04_14-septentrion"
});

insertConference({
    title: "OUT OF THE BOX !",
    authors: ["Marie-Caroline Schürr"],
    date: new Date("2023-05-12"),
    summary: "Nous recevrons le 12 mai à Saint Roch dans le cadre du Cercle Saint-Honoré Marie-Caroline Schürr pour son dernier livre OUT OF THE BOX !\n" +
        "Marie-Caroline Schürr est « consultante en inclusion sociale et développement personnel » et atteinte d’une maladie génétique rare qui la prive de l’usage de ses jambes et de ses bras. Ce qui ne l’a jamais empêchée de mener à bien bon nombre de projets dont celui de partir seule sur les chemins de Compostelle : 400 km en fauteuil pour « expérimenter de manière très concrète les chemins de la Providence ».",
    link: "https://www.youtube.com/embed/97FUYZGR1_8?si=Of-XZ9icK_yOJeXQ",
    tags: ["book", "self_improvement"],
    coverFilename: "2023_05_12-out_of_the_box"
});

insertConference({
    title: "Arnaud Beltrame : Héros ? Modèle ? Martyr ?",
    authors: ["Jean-Baptiste Golfier"],
    date: new Date("2023-06-16"),
    summary: "Nous recevrons le 16 Juin à Saint Roch dans le cadre du Cercle Saint Honoré le père Jean-Baptiste Golfier, chanoine de l’abbaye de Lagrasse pour une conférence « Arnaud Beltrame : Héros ? Modèle ? Martyr ? »\n" +
        "Un témoignage inédit sur la vie spirituelle et la postérité du colonel Arnaud Beltrame.\n" +
        "Officier supérieur de gendarmerie, Arnaud Beltrame est mort assassiné en service en mars 2018 à Carcassonne, pour s’être volontairement substitué à un otage au cours d’une attaque terroriste.\n" +
        "Son sacrifice a eu un grand retentissement en France et à l'étranger, et lui a valu un hommage national.",
    link: "",
    tags: ["interview", "spirituality", "biography"],
    coverFilename: "2023_06_16-arnaud_beltrame"
});

insertConference({
    title: "Le discernement",
    authors: ["François Bert"],
    date: new Date("2023-09-28"),
    summary: "Chers amis,\n" +
        "\n" +
        "Nous avons le plaisir de vous inviter à la prochaine conférence du Cercle Saint-Honoré.\n" +
        "\n" +
        "Elle se déroulera le Jeudi 28 septembre à 19h30 à Saint-Roch, François Bert viendra nous parler du Discernement.\n" +
        "\n" +
        "\"Le Discernement à l'usage de ceux qui croient qu'être intelligent suffit pour décider.\"\n" +
        "\n" +
        "Venez nombreux et n'hésitez pas à en parler autour de vous. Nous sommes impatients de vous retrouver.",
    link: "",
    tags: ["book", "spirituality", "philosophy"],
    coverFilename: "2023_09_28-discernement"
});

insertConference({
    title: "Saint Pierre : le mystère et l'évidence",
    authors: ["Christophe Dickès"],
    date: new Date("2023-10-05"),
    summary: "",
    link: "https://www.youtube.com/embed/eFrImblcMv8?si=mNgyBM2UuonSPgNm",
    tags: ["religion", "book", "history", "biography"],
    coverFilename: "2023_10_05-saint_pierre"
});

insertConference({
    title: "Les papes et la France",
    authors: ["Michel Viot"],
    date: new Date("2023-10-12"),
    summary: "Nous recevrons le Jeudi 12 octobre à 19h30 à Saint Roch dans le cadre du Cercle Saint Honoré le père Michel Viot, pour pour son dernier livre « Les papes et la France : de Clovis à De Gaulle »\n" +
        "Le Père Michel Viot, qui fut évêque luthérien de Paris et ancien dignitaire de la GLNF, est membre de la pastorale diocésaine des funérailles du diocèse de Paris et prêtre coopérateur à Notre-Dame de Lourdes. Il est l’auteur de nombreux ouvrages parmi lesquels L’heure du royaume de France est-elle venue ? (2018) et Le rapport Sauvé : une manipulation ? (2021) chez Via Romana.",
    link: "https://www.youtube.com/embed/Kk6X2Nta3hU?si=Hpy8m5aBrtwwbkt2", // Deux liens ?
    tags: ["book", "history", "religion"],
    coverFilename: "2023_10_12-papes_et_france"
});

insertConference({
    title: "Pape François : la révolution",
    authors: ["Jean-Marie Guénois"],
    date: new Date("2023-10-20"),
    summary: "Nous recevrons le 20 Octobre à Saint Roch dans le cadre du Cercle Saint-Honoré Jean-Marie Guénois, pour son dernier livre « Pape François : La révolution »\n" +
        "Jean-Marie Guénois est rédacteur en chef au Figaro chargé des religions, consultant pour RTL et journaliste à l'Esprit des lettres sur KTO.",
    link: "https://www.youtube.com/embed/pYD8oNzhZ3U?si=REBqD114Ibimfmgc",
    tags: ["book", "religion", "biography"],
    coverFilename: "2023_10_20-pape_francois"
});

insertConference({
    title: "Peut-on programmer la mort ?",
    authors: ["Pierre Jova"],
    date: new Date("2023-11-16"),
    summary: "Nous recevrons le 16 Novembre à Saint Roch dans le cadre du Cercle Saint-Honoré Pierre Jova, pour son dernier livre « Peut-on programmer la mort ? »\n" +
        "Pierre Jova est journaliste à La Vie depuis 2019. Cofondateur de la revue d’écologie intégrale Limite, il a collaboré au Figaro, au Pèlerin et à Famille chrétienne. Outre sa passion pour l’actualité internationale, il enquête régulièrement sur des sujets de société, en particulier liés à l’immigration, à la justice sociale et aux religions. Il a publié Les chrétiens face aux migrants (Tallandier, 2019).",
    link: "https://www.youtube.com/embed/w7n5bZn2Rfw?si=d2lhlTEXZXuyppGH",
    tags: ["book", "philosophy", "politics"],
    coverFilename: "2023_11_16-programmer_la_mort"
});

insertConference({
    title: "Pascal et la proposition chrétienne", // titre originel sur fb : Bon anniversaire Blaise Pascal
    authors: ["Pierre Manent"],
    date: new Date("2023-12-14"),
    summary: "Nous recevrons le Jeudi 14 décembre à Saint Roch dans le cadre du Cercle Saint-Honoré Pierre Manent, pour son essai « Pascal et la proposition chrétienne »\n" +
        "Pierre Manent a été directeur d'études à l'EHESS. Membre fondateur de la revue Commentaire, il a publié de nombreux ouvrages, parmi lesquels : Tocqueville et la nature de de la démocratie (1993), La Cité de l'homme (1994) ; La Raison des nations (2006) ; Les Métamorphoses de la cité (2010) ; Montaigne. La vie sans loi (2014) ; Situation de la France (2015) ou La loi naturelle et les droits de l’homme (2020).",
    link: "https://www.youtube.com/embed/Z1_yWFv8hro?si=vqf-KGzLnw8PWFIE",
    tags: ["book", "philosophy", "religion"],
    coverFilename: "2023_12_14-blaise_pascal"
});

insertConference({
    title: "La dernière avant-garde - Le Christ ou le néant",
    authors: ["Romaric Sangars"],
    date: new Date("2024-01-12"),
    summary: "Nous recevrons le vendredi 12 janvier à Saint Roch, dans le cadre du Cercle Saint-Honoré Romaric Sangars, pour présenter son essai « La dernière avant-garde »\n" +
        "Journaliste et écrivain, Romaric Sangars est l’auteur de romans comme Les Verticaux ou Conversion, et d’un essai remarqué, Suffirait-il d’aller gifler Jean d’Ormesson pour arranger un peu la gueule de la littérature française ?",
    link: "https://www.youtube.com/embed/2OcYi7cWeAo?si=FZzZo8XtBrk_EA1X",
    tags: ["book", "philosophy", "religion"],
    coverFilename: "2024_01_12-christ_ou_neant"
});

insertConference({
    title: "L'esprit de la liturgie en débat",
    authors: ["Uwe Michel Lang", "Jean-Baptiste Nadler"],
    date: new Date("2024-02-15"),
    summary: "Le jeudi 15 février, à Saint-Roch, le Cercle Saint-Honoré aura la joie d'accueillir le Père Jean-Baptiste Nadler de la Communauté de l’Emmanuel et le Père Uwe Michael Lang de l’Oratoire Saint-Philippe Neri à Londres.\n" +
        "Cette rencontre sera l'occasion d'approfondir la compréhension de l'Esprit de la Liturgie à travers les récents ouvrages de nos invités : « L'esprit de la messe de Paul VI » et « Une brève histoire de la messe dans le rite romain »\n" +
        "Après avoir commencé la vie religieuse à l'abbaye de Solesmes, le P. Jean-Baptiste Nadler est devenu prêtre de la communauté de l'Emmanuel. Il est l'auteur du livre Les racines juives de la messe (éditions de l'Emmanuel, 2015). Il est actuellement curé dans le diocèse de Vannes.\n" +
        "\n" +
        "Uwe Michael Lang est prêtre de l'Oratoire de Saint Philippe Neri à Londres. Il enseigne la théologie à St Mary's University de Twickenham et au Allen Hall Seminary de Londres. Son livre Se tourner vers le Seigneur, préfacé par le cardinal Joseph Ratzinger/Benoît XVI a été publié en 2006 aux éditions Ad Solem.",
    link: "https://www.youtube.com/embed/yhOGRCmcFow?si=SWjE0-EE2SOuwbNp",
    tags: ["debate", "liturgy", "religion"],
    coverFilename: "2024_02_15-liturgie_debat"
});
