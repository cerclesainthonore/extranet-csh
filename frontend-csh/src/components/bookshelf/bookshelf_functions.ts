function initials(fullName: string): string {
    const ignoredArticles = ['de', 'd\'', 'du', 'des', 'la', 'le', 'les', 'l\''];

    const isArticle = (word: string): boolean => {
        return ignoredArticles.some(article => word.toLowerCase() === article);
    };

    const words = fullName.split(' ');

    let initials = '';
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

export { initials };