/**
 * Determines if the text color should be light or dark based on the background color
 * 
 * @param hexColor - The hex color of the background (e.g. #FFFFFF)
 * @returns 'light' if the background color is dark, 'dark' if the background color is light
 */
export const getTheme = (hexColor : string ): string => {
    hexColor = hexColor?.substring(1);

    if (hexColor?.length !== 6)
        hexColor = hexColor?.split("").map((char) => char + char).join("") as string;

    // Convert hex color to RGB
    const r = parseInt(hexColor?.substring(1, 3), 16);
    const g = parseInt(hexColor?.substring(3, 5), 16);
    const b = parseInt(hexColor?.substring(5, 7), 16);

    // YIQ equation, for determining color brightness
    const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    if (luminosity < 0.80)
        return 'dark';  // Color is dark, use white text
    else
        return 'light'; // Color is light, use dark text
}
