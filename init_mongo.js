db = db.getSiblingDB("CSH");
db.createCollection("Newsletter");
db.createCollection("Conferences");

function insertConference({
                              title,
                              author,
                              date,
                              summary,
                              link,
                              tags,
                              coverFilename
                          }) {
    db.Conferences.update({
            date
        },
        {
            $setOnInsert: {
                title,
                author,
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
    author: "Fabrice Hadjadj",
    date: new Date("2023-03-10"),
    summary: "Nous recevrons le 10 Mars à Saint Roch dans le cadre du Cercle Saint Honoré avec le Chœur Liturgique Lux Amoris Fabrice Hadjadj pour une conférence sur Le chant liturgique.\n" +
        "\"Chanter c'est prier deux fois... ou pas du tout !\"\n" +
        "Fabrice Hadjadj est un philosophe, écrivain et dramaturge de langue française, juif de nom arabe et de confession catholique.\n" +
        "Lux Amoris est un chœur liturgique créé en 2018, qui a pour objectif la promotion du chant sacré et la formation des choristes.",
    link: "https://www.youtube.com/embed/YZL4qC9kTWU?si=XsQcaSco7djbsID1",
    tags: ["liturgy", "art", "interview"],
    coverFilename: "2023_03_10-chant_liturgique"
});

insertConference({
    title: "Le Saint Suaire de Turin",
    author: "Jean-Christian Petitfils",
    date: new Date("2023-03-23"),
    summary: "",
    link: "",
    tags: ["apologetics", "book", "history"],
    coverFilename: "2023_03_23-saint_suaire_de_turin"
});

insertConference({
    title: "Charles et Zita de Habsbourg : itinéraire spirituel d'un couple",
    author: "Elizabeth Montfort",
    date: new Date("2023-03-27"),
    summary: "Nous recevrons le 27 Mars à Saint Roch dans le cadre du Cercle Saint Honoré Elizabeth Montfort pour son dernier livre Charles et Zita de Habsbourg.\n" +
        "Elizabeth Montfort, diplômée en droit et en philosophie, a été députée au Parlement européen de 1999 à 2004. Elle est responsable pour la France de la Ligue de prière du bienheureux Charles d'Autriche pour la paix des peuples et secrétaire générale de l'Association pour la béatification de l'impératrice et reine Zita, épouse et mère de famille.",
    link: "https://www.youtube.com/embed/qECCwrlWDUM?si=YN5wZybbaGCEAzP3",
    tags: ["spirituality", "book", "philosophy"],
    coverFilename: "2023_03_27-charles_et_zita_de_habsbourg"
});

insertConference({
    title: "OUT OF THE BOX !",
    author: "Marie-Caroline Schürr",
    date: new Date("2023-05-12"),
    summary: "Nous recevrons le 12 mai à Saint Roch dans le cadre du Cercle Saint-Honoré Marie-Caroline Schürr pour son dernier livre OUT OF THE BOX !\n" +
        "Marie-Caroline Schürr est « consultante en inclusion sociale et développement personnel » et atteinte d’une maladie génétique rare qui la prive de l’usage de ses jambes et de ses bras. Ce qui ne l’a jamais empêchée de mener à bien bon nombre de projets dont celui de partir seule sur les chemins de Compostelle : 400 km en fauteuil pour « expérimenter de manière très concrète les chemins de la Providence ».",
    link: "https://www.youtube.com/embed/97FUYZGR1_8?si=Of-XZ9icK_yOJeXQ",
    tags: ["book", "self_improvement"],
    coverFilename: "2023_05_12-out_of_the_box"
});

insertConference({
    title: "Arnaud Beltrame : Héros ? Modèle ? Martyr ?",
    author: "Jean-Baptiste Golfier",
    date: new Date("2023-06-16"),
    summary: "Nous recevrons le 16 Juin à Saint Roch dans le cadre du Cercle Saint Honoré le père Jean-Baptiste Golfier, chanoine de l’abbaye de Lagrasse pour une conférence « Arnaud Beltrame : Héros ? Modèle ? Martyr ? »\n" +
        "Un témoignage inédit sur la vie spirituelle et la postérité du colonel Arnaud Beltrame.\n" +
        "Officier supérieur de gendarmerie, Arnaud Beltrame est mort assassiné en service en mars 2018 à Carcassonne, pour s’être volontairement substitué à un otage au cours d’une attaque terroriste.\n" +
        "Son sacrifice a eu un grand retentissement en France et à l'étranger, et lui a valu un hommage national.",
    link: "",
    tags: ["interview", "spirituality"],
    coverFilename: "2023_06_16-arnaud_beltrame"
});

insertConference({
    title: "Arnaud Beltrame : Héros ? Modèle ? Martyr ?",
    author: "Jean-Baptiste Golfier",
    date: new Date("2023-06-16"),
    summary: "Nous recevrons le 16 Juin à Saint Roch dans le cadre du Cercle Saint Honoré le père Jean-Baptiste Golfier, chanoine de l’abbaye de Lagrasse pour une conférence « Arnaud Beltrame : Héros ? Modèle ? Martyr ? »\n" +
        "Un témoignage inédit sur la vie spirituelle et la postérité du colonel Arnaud Beltrame.\n" +
        "Officier supérieur de gendarmerie, Arnaud Beltrame est mort assassiné en service en mars 2018 à Carcassonne, pour s’être volontairement substitué à un otage au cours d’une attaque terroriste.\n" +
        "Son sacrifice a eu un grand retentissement en France et à l'étranger, et lui a valu un hommage national.",
    link: "",
    tags: ["interview", "spirituality"],
    coverFilename: "2023_06_16-arnaud_beltrame"
});

