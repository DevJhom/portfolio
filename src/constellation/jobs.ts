import type { TechId } from './techs';

// Same ids as the Experience enum in TechStack.vue, whose timeline renders the job copy.
export type JobId = 'internship' | 'omnistar' | 'clicknext';

export interface Job {
    id: JobId;
    techs: TechId[];
}

// Job → tech mapping mirrors mouseOnExp() in TechStack.vue; keep the two in sync.
export const jobs: Job[] = [
    {
        id: 'internship',
        techs: ['figma', 'react', 'scss', 'git', 'googlecloud'],
    },
    {
        id: 'omnistar',
        techs: ['nodejs', 'firebase', 'sql', 'mongodb', 'linux', 'git', 'docker', 'googlecloud'],
    },
    {
        id: 'clicknext',
        techs: ['vue', 'typescript', 'vite', 'csharp', 'sql', 'mongodb', 'redis', 'linux', 'git', 'docker', 'neovim', 'claude'],
    },
];
