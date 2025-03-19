db = db.getSiblingDB("CSH");
db.createCollection("Newsletter");
db.createCollection("Conferences");
db.CreateCollection("Banner");

db.Banner.updateOne({}, {
    $setOnInsert: {
        text: "Réservez une place pour l'ostension de la Sainte Tunique du Christ",
        href: "https://www.helloasso.com/associations/les-amis-de-la-sainte-tunique-d-argenteuil/evenements/conference-sur-la-sainte-tunique-d-argenteuil-a-paris",
        bannerColor: "#b32b2e",
        dateStart: new Date("2025-03-15T00:00:00"),
        dateEnd: new Date("2025-03-28T19:30:00"),
    }
}, {upsert: true});

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
    title: "Mourir vivant & La voie des hommes",
    authors: ["Philippe de Maistre"],
    date: new Date("2022-10-07"),
    summary: "",
    link: "",
    tags: ["book", "biography", "religion", "testimony"],
    coverFilename: "2022_10_07-mourir_vivant"
});

insertConference({
    title: "Benoit XVI : Une vie (tomes 1 & 2)",
    authors: ["Peter Seewald", "Clément Imbert"],
    date: new Date("2022-11-18"),
    summary: "",
    link: "https://www.youtube.com/embed/VePlU3MgyVQ?si=d9HJQv5ROZkOWPzQ",
    tags: ["book", "biography", "religion", "testimony"],
    coverFilename: "2022_11_18-benoit_xvi"
});

insertConference({
    title: "L'Amérique empire",
    authors: ["Nikola Mirković"],
    date: new Date("2022-12-02"),
    summary: "",
    link: "",
    tags: ["book", "history", "politics", "geopolitics"],
    coverFilename: "2022_12_02-amerique"
});

insertConference({
    title: "Conversations avec le Président",
    authors: ["Samuel Pruvot"],
    date: new Date("2023-02-10"),
    summary: "",
    link: "",
    tags: ["book", "religion", "politics"],
    coverFilename: "2023_02_10-conversations_president"
});

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

insertConference({
    title: "En arrivant au paradis",
    authors: ["Richard de Seze"],
    date: new Date("2024-03-21"),
    summary: "Le jeudi 21 mars, à 19h30 à Saint-Roch, le Cercle Saint-Honoré aura la joie d'accueillir Richard de Seze pour présenter son dernier ouvrage « En arrivant au Paradis »\n" +
        "Consultant en communication, Richard de Seze est aussi journaliste culture pour plusieurs périodiques. Il a récemment publié, aux Éditions du Cerf, Les 33 meilleures blagues de Jésus, avec Basile de Koch.",
    link: "https://www.youtube.com/embed/sb6By8c5HGw?si=GJVExl1bQaQtJgJn",
    tags: ["spirituality", "comics", "religion"],
    coverFilename: "2024_03_21-paradis"
});

insertConference({
    title: "Reggae catholique",
    authors: ["Les Guetteurs"],
    date: new Date("2024-04-05"),
    summary: "Le vendredi 5 avril, à 19h30 en l'Eglise Saint-Roch, le Cercle Saint-Honoré aura la joie d'accueillir Les Guetteurs pour un concert et témoignages.\n" +
        "Les Guetteurs sont nés il y a 15 ans : en avril 2007, lorsque Fratoun, alors âgé de douze ans, a eu dans le cœur de partager sa foi par la musique. De concert en concert, de chanson en chanson, d’album en album, le groupe s’est peu à peu formé, professionnalisé, pour enfin devenir ce qu’il est aujourd’hui : une bande de cinq musiciens expérimentés et sonorisés par un ingénieur d’exception, une équipe joyeuse capable de soulever les foules. Leurs mélodies sont entraînantes, leurs rythmes chaloupés, leurs textes poétiques. Leurs chansons atteignent leur but : toucher les cœurs.\n" +
        "En juin 2023, ils reviennent avec l’album Roi : onze chansons qui transmettent un message d’espérance, de foi et d’amour. Onze chansons portées par un rythme : le reggae. Onze chansons qui parlent d’un ROI : le Christ. Ce nouvel opus est percutant et groovy, poétique et sensible. Et surtout rempli de JOIE",
    link: "",
    tags: ["interview", "testimony", "religion", "spirituality"],
    coverFilename: "2024_04_05-reggae_catholique"
});

insertConference({
    title: "Notre-Dame : Une affaire d'État",
    authors: ["Didier Rykner"],
    date: new Date("2024-04-05"),
    summary: "Le vendredi 12 avril, à 19h30 en l’Eglise Saint-Roch, le Cercle Saint-Honoré aura la joie d'accueillir Didier Rykner pour présenter son dernier ouvrage « Notre-Dame : Une affaire d'État ».\n" +
        "Didier Rykner est le fondateur et directeur de la rédaction de La Tribune de l’Art, un média influent engagé au service de la défense du patrimoine. Journaliste d’investigation, né à Paris, de parents parisiens, il combat depuis des années le traitement infligé au patrimoine. Il a publié aux Belles Lettres La Disparition de Paris (2022).",
    link: "",
    tags: ["book", "politics"],
    coverFilename: "2024_04_05-reggae_catholique"
});

insertConference({
    title: "Sur l'islam",
    authors: ["Rémi Brague"],
    date: new Date("2024-06-14"),
    summary: "Le vendredi 14 juin, à 19h30 en l’Eglise Saint-Roch, le Cercle Saint-Honoré aura la joie d'accueillir Rémi Brague pour présenter son dernier ouvrage « Sur l'islam ».\n" +
        "Né en 1947, Rémi Brague est spécialiste de philosophie antique et médiévale. Professeur émérite à la Sorbonne et à l’université Louis-et-Maximilien de Munich, Brague explore les traditions philosophiques arabes, juives et gréco-latines, et combat les lieux communs sur les religions.",
    link: "https://www.youtube.com/embed/RWw5rLXQLgc?si=j7JdEjdSJefcGxO0",
    tags: ["book", "religion", "history"],
    coverFilename: "2024_06_14-islam"
});

insertConference({
    title: "La Rose Blanche : des résistants chrétiens contre le nazisme",
    authors: ["Henri Peter"],
    date: new Date("2024-09-13"),
    summary: "Le vendredi 13 septembre, à 19h30 en l’Eglise Saint-Roch, le Cercle Saint-Honoré aura la joie d'accueillir Henri Peter pour présenter son dernier ouvrage «La Rose Blanche : des résistants chrétiens contre le nazisme».\n" +
        "Henri Peter, originaire de Colmar, est enseignant retraité. Il a contribué à la redécouverte de l’écrivain catholique allemand Gertrud von Le Fort dont il a traduit plusieurs ouvrages (La Femme éternelle, L’Enfant étranger, Écrits de résistance, parus aux éditions Via Romana).",
    link: "", // Il n'y a que l'incipit sur youtube
    tags: ["book", "testimony", "history", "spirituality"],
    coverFilename: "2024_09_13-rose_blanche"
});

insertConference({
    title: "Écologie tragique",
    authors: ["Fabrice Hadjadj"],
    date: new Date("2024-10-11"),
    summary: "Le vendredi 11 octobre, à 19h30 en l’Eglise Saint-Roch, le Cercle Saint-Honoré aura la joie d'accueillir Fabrice Hadjadj pour présenter son dernier ouvrage «Écologie tragique».\n" +
        "Fabrice Hadjadj est diplômé de l'Institut d'études politiques de Paris et agrégé de philosophie. Dramaturge, musicien, auteur jeunesse, il est aussi l'auteur de nombreux essais, qui en font l'un des philosophes contemporains les plus influents.",
    link: "",
    tags: ["book", "philosophy"],
    coverFilename: "2024_10_11-ecologie_tragique"
});

insertConference({
    title: "L'évidence : itinéraire d'un incroyant converti",
    authors: ["Lucas Tierny"],
    date: new Date("2024-11-08"),
    summary: "Le vendredi 8 novembre, à 19h30 en l’Eglise Saint-Roch, le Cercle Saint-Honoré aura la joie d'accueillir Lucas Tierny pour présenter son ouvrage « L’évidence ».\n" +
        "Lucas Tierny est diplômé de l'EMLYON. Consultant en stratégie, il accompagne les dirigeants dans leurs projets de transformations. Membre de cercles de réflexions politiques et socio-économiques, engagé dans des activités caritatives, il accompagne régulièrement des jeunes à discerner dans leurs vies personnelles et leurs orientations. Il a participé à la fondation de l'Escale, un événement dédié aux personnes en quête spirituelle.",
    link: "",
    tags: ["book", "spirituality", "testimony", "apologetics"],
    coverFilename: "2024_11_08-evidence"
});
