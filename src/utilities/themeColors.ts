type ThemeColors = {
    bgColor: {
        [x: string]: string;
    },
    surfaceElevated: {
        [x: string]: string;
    },
    color: {
        [x: string]: string;
    },
    muted: {
        [x: string]: string;
    },
    border: {
        [x: string]: string;
    },
    itemHover: {
        [x: string]: string;
    },
    accent: {
        [x: string]: string;
    }
}

const themeColors: ThemeColors = {
    bgColor: {
        dark: '#121A20',
        light: '#FFFFFF',
        system: '#FFFFFF'
    },
    surfaceElevated: {
        dark: '#18232B',
        light: '#F8FAFC',
        system: '#F8FAFC'
    },
    color: {
        dark: '#E8F0F2',
        light: '#0F172A',
        system: '#0F172A'
    },
    muted: {
        dark: '#8BA0AD',
        light: '#64748B',
        system: '#64748B'
    },
    border: {
        dark: 'rgba(148, 180, 198, 0.14)',
        light: 'rgba(15, 23, 42, 0.09)',
        system: 'rgba(15, 23, 42, 0.09)'
    },
    itemHover: {
        dark: '#1C2933',
        light: '#F1F5F9',
        system: '#F1F5F9'
    },
    accent: {
        dark: '#14B8A6',
        light: '#0D9488',
        system: '#0D9488'
    }
}

export default themeColors;
