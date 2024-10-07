function initials(fullName: string): string {

    const ignoredArticles = ['de', 'd\'', 'du', 'des', 'la', 'le', 'les', 'l\''];

    const isArticle = (word: string): boolean => {
        return ignoredArticles.some(article => word.toLowerCase() === article);
    };

    const words = fullName.split(" ");

    let initials = "";
    for (const word of words) {
        if (!isArticle(word)) {
            initials += word.charAt(0).toUpperCase();
        } else if (word.includes("'")) {
            const parts = word.split("'");
            if (parts[1]) {
                initials += parts[1].charAt(0).toUpperCase();
            }
        }
    }

    return initials;
}

const sortByLastName = (authors: string[]): string[] => {
    return authors.sort((a, b) => {
        const lastNameA = initials(a).slice(-1)[0];
        const lastNameB = initials(b).slice(-1)[0];

        if (lastNameA < lastNameB) {
            return -1;
        } else if (lastNameA > lastNameB) {
            return 1;
        } else {
            return 0;
        }
    });
};

export {initials, sortByLastName};