export const getTheme = (hexColor : string ) => {
    hexColor = hexColor?.substring(1);

    if (hexColor?.length !== 6)
        hexColor = hexColor?.split("").map((char) => char + char).join("") as string;

    // Convertir la couleur hexadécimale en valeurs RVB
    const r = parseInt(hexColor?.substring(1, 3), 16);
    const g = parseInt(hexColor?.substring(3, 5), 16);
    const b = parseInt(hexColor?.substring(5, 7), 16);

    // Calculer la luminosité (en utilisant la formule YIQ)
    const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Déterminer si la couleur de fond est claire ou sombre
    if (luminosity < 0.5)
        return 'dark';  // Couleur de fond sombre, texte clair
    else
        return 'light'; // Couleur de fond clair, texte sombre
}
