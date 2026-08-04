import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import CorridorSegment, { SEGMENT_LENGTH } from './CorridorSegment';
import { useScene } from '../../../context/SceneContext';

/**
 * Wrapper to toggle segment visibility based on camera position.
 * Massively reduces Draw Calls by hiding segments fully behind the camera.
 */
const SegmentVisibilityWrapper = ({ children, segmentIndex }) => {
    const groupRef = useRef();
    const { camera } = useThree();
    const { isInRoom } = useScene();

    // Z bounds for this segment
    // Segment 0: Z=10 to Z=-70
    // Segment 1: Z=-70 to Z=-150
    const startZ = 10 - (segmentIndex * SEGMENT_LENGTH);
    const endZ = startZ - SEGMENT_LENGTH;

    useFrame(() => {
        if (!groupRef.current) return;
        // Camera looks towards -Z. 
        // If camera is significantly "in front" of the segment (e.g., camera Z is much less than endZ), hide it.
        // The final Contact doorway lands the camera just beyond the segment edge.
        // Keep the owning segment alive while a room is open, and leave enough
        // corridor buffer to cover the entry handoff before context updates.
        const isBehindCamera = !isInRoom && camera.position.z < endZ - 12;
        // If camera is significantly "behind" the segment (e.g., camera Z is much greater than startZ + buffer), hide it.
        const isFarAhead = camera.position.z > startZ + 30;

        const isVisible = !(isBehindCamera || isFarAhead);

        if (groupRef.current.visible !== isVisible) {
            groupRef.current.visible = isVisible;
        }
    });

    return (
        <group ref={groupRef}>
            {children}
        </group>
    );
};

/**
 * InfiniteCorridorManager Component
 * 
 * Manages dynamic generation/removal of corridor segments.
 * 
 * hideDoorsForSegments: Array of segment indices that should hide their SegmentDoors
 * (used during entrance to avoid duplicate doors while keeping content preloaded)
 */
const InfiniteCorridorManager = ({
    onDoorEnter,
    hideDoorsForSegments = [], // Segments that should hide their SegmentDoors
    clipSegmentNeg1 = false, // Whether to clip segment -1 at EntranceDoors
    setCameraOverride // Function to take over camera control
}) => {
    // The portfolio is a single authored journey. Contact is the final stop,
    // so no additional corridor segments are generated beyond this one.
    const activeSegments = [0];

    return (
        <group>
            {activeSegments.map((segmentIndex) => (
                <SegmentVisibilityWrapper key={`seg-wrap-${segmentIndex}`} segmentIndex={segmentIndex}>
                    <CorridorSegment
                        key={`segment-${segmentIndex}`}
                        segmentIndex={segmentIndex}
                        onDoorEnter={onDoorEnter}
                        hideSegmentDoors={hideDoorsForSegments.includes(segmentIndex)}
                        zClip={clipSegmentNeg1 && segmentIndex === -1 ? 22 : 100000}
                        setCameraOverride={setCameraOverride}
                    />
                </SegmentVisibilityWrapper>
            ))}
        </group>
    );
};

export default InfiniteCorridorManager;
