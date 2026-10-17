import type { TechId } from './techs';

// Every line in the constellation; a job shows the pairs with both ends in that job.
export const relations: [TechId, TechId][] = [
    ['typescript', 'vue'],
    ['typescript', 'react'],
    ['typescript', 'nodejs'],
    ['typescript', 'claude'],
    ['typescript', 'csharp'],

    ['vite', 'vue'],
    ['scss', 'vue'],
    ['scss', 'react'],
    ['figma', 'react'],

    ['csharp', 'cplusplus'],

    ['csharp', 'sql'],
    ['csharp', 'redis'],
    ['nodejs', 'mongodb'],
    ['nodejs', 'firebase'],
    ['sql', 'mongodb'],

    ['firebase', 'googlecloud'],
    ['docker', 'googlecloud'],
    ['docker', 'linux'],
    ['git', 'linux'],
    ['git', 'googlecloud'],

    ['neovim', 'linux'],
    ['neovim', 'claude'],
];
