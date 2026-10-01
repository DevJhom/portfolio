import { Vector2, type Camera, type Scene, type WebGLRenderer } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export interface PostFx {
    composer: EffectComposer;
    setSize(width: number, height: number): void;
    dispose(): void;
}

export function createPostFx(renderer: WebGLRenderer, scene: Scene, camera: Camera, strength: number): PostFx {
    const composer = new EffectComposer(renderer);
    const size = renderer.getSize(new Vector2());

    // High threshold: the logo discs stay crisp and only the additive glows and links bloom.
    const bloom = new UnrealBloomPass(size, strength, 0.55, 0.62);

    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    return {
        composer,
        setSize(width, height) {
            composer.setSize(width, height);
        },
        dispose() {
            bloom.dispose();
            composer.dispose();
        },
    };
}
