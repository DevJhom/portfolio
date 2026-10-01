import type { LogoKey } from './logos';

export type TechId = LogoKey;

export interface Tech {
    id: TechId;
    label: string;
    color: string;
}

// Brand colours from portfolio/src/scss/colors.scss. Google Cloud has no variable there
// (its tile uses a gradient border), so it takes the Google blue from that gradient.
export const techs: Tech[] = [
    { id: 'figma', label: 'Figma', color: '#a259ff' },
    { id: 'vue', label: 'Vue', color: '#47ba87' },
    { id: 'react', label: 'React', color: '#58c4dc' },
    { id: 'typescript', label: 'TypeScript', color: '#377cc8' },
    { id: 'vite', label: 'Vite', color: '#bd34fe' },
    { id: 'scss', label: 'SCSS', color: '#c0658f' },
    { id: 'csharp', label: 'C#', color: '#9b4f97' },
    { id: 'cplusplus', label: 'C++', color: '#659bd3' },
    { id: 'nodejs', label: 'Node.js', color: '#58a149' },
    { id: 'firebase', label: 'Firebase', color: '#ffce36' },
    { id: 'mongodb', label: 'MongoDB', color: '#4faa41' },
    { id: 'sql', label: 'SQL', color: '#bac9d1' },
    { id: 'redis', label: 'Redis', color: '#d82c20' },
    { id: 'linux', label: 'Linux', color: '#dcdcdc' },
    { id: 'git', label: 'Git', color: '#f05030' },
    { id: 'docker', label: 'Docker', color: '#0091e2' },
    { id: 'googlecloud', label: 'Google Cloud', color: '#4285f4' },
    { id: 'neovim', label: 'Neovim', color: '#87bf6e' },
    { id: 'claude', label: 'Claude', color: '#d97757' },
];
