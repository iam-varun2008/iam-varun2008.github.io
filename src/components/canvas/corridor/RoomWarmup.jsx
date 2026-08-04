import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import GalleryRoom from '../rooms/Gallery/GalleryRoom';
import StudioRoom from '../rooms/Studio/StudioRoom';
import AboutRoom from '../rooms/About/AboutRoom';
import ContactRoom from '../rooms/Contact/ContactRoom';
import { isSanityDataLoaded } from '../../../hooks/useSanityData';

/**
 * Pre-renders the rooms off-screen so their shaders are ready before the
 * visitor opens a door. This is only an optimization and must never block the
 * entrance experience.
 */
const RoomWarmup = ({ onWarmupComplete, skipIntensiveWarmup }) => {
    const [isDone, setIsDone] = useState(false);
    const frameCount = useRef(0);
    const compilationStarted = useRef(false);
    const completeFired = useRef(false);
    const { gl, scene, camera } = useThree();

    const finishWarmup = useCallback(() => {
        if (completeFired.current) return;
        completeFired.current = true;

        requestAnimationFrame(() => {
            setIsDone(true);
            onWarmupComplete?.();
        });
    }, [onWarmupComplete]);

    // Some browser/GPU combinations leave compileAsync pending indefinitely.
    // The visitor should always be allowed through even if GPU warm-up fails.
    useEffect(() => {
        const fallbackTimer = window.setTimeout(finishWarmup, 8000);
        return () => window.clearTimeout(fallbackTimer);
    }, [finishWarmup]);

    useFrame(() => {
        if (isDone || completeFired.current || compilationStarted.current) return;
        if (!isSanityDataLoaded()) return;

        frameCount.current += 1;
        const targetFrames = skipIntensiveWarmup ? 1 : 3;

        if (frameCount.current < targetFrames) return;
        compilationStarted.current = true;

        // Medium and low-tier devices compile each room normally when opened.
        if (skipIntensiveWarmup) {
            finishWarmup();
            return;
        }

        const compileSynchronously = () => {
            try {
                gl.compile(scene, camera);
            } catch (error) {
                console.warn('Room shader warm-up was skipped', error);
            } finally {
                finishWarmup();
            }
        };

        if (gl.compileAsync) {
            gl.compileAsync(scene, camera, scene)
                .then(finishWarmup)
                .catch((error) => {
                    console.warn('Async room shader warm-up failed', error);
                    compileSynchronously();
                });
        } else {
            compileSynchronously();
        }
    });

    if (isDone || skipIntensiveWarmup) return null;

    const noop = () => {};

    return (
        <group position={[0, -500, 0]}>
            <Suspense fallback={null}>
                <group position={[-20, 0, 0]}>
                    <GalleryRoom showRoom={true} onReady={noop} isExiting={false} isWarmup={true} />
                </group>
            </Suspense>
            <Suspense fallback={null}>
                <group position={[20, 0, 0]}>
                    <StudioRoom showRoom={true} onReady={noop} isExiting={false} isWarmup={true} />
                </group>
            </Suspense>
            <Suspense fallback={null}>
                <group position={[-20, 0, -50]}>
                    <AboutRoom showRoom={true} onReady={noop} isExiting={false} isWarmup={true} />
                </group>
            </Suspense>
            <Suspense fallback={null}>
                <group position={[20, 0, -50]}>
                    <ContactRoom showRoom={true} onReady={noop} isExiting={false} isWarmup={true} />
                </group>
            </Suspense>
        </group>
    );
};

export default RoomWarmup;
