import { useEffect, useRef } from 'react';
import { useScene } from '../context/SceneContext';
import { PROFILE } from '../data/profile';

/**
 * Dynamic meta tags and virtual routing for the four 3D rooms.
 */
const ROOM_META = {
    null: {
        path: '/',
        title: `${PROFILE.displayName} — ${PROFILE.title}`,
        description: PROFILE.shortDescription,
    },
    about: {
        path: '/about',
        title: `About Me — ${PROFILE.displayName}`,
        description: `${PROFILE.about} ${PROFILE.goal}`,
    },
    gallery: {
        path: '/gallery',
        title: `Projects — ${PROFILE.displayName}`,
        description: 'Explore practical Python cybersecurity projects for log analysis, threat detection, network scanning and vulnerability risk reporting.',
    },
    studio: {
        path: '/studio',
        title: `Arts — ${PROFILE.displayName}`,
        description: "Explore Varun's graphite drawing archive as new art pieces are completed.",
    },
    contact: {
        path: '/contact',
        title: `Contact — ${PROFILE.displayName}`,
        description: `Contact ${PROFILE.displayName} by email or visit his GitHub profile.`,
    },
};

const PATH_TO_ROOM = {
    '/': null,
    '/about': 'about',
    '/gallery': 'gallery',
    '/studio': 'studio',
    '/contact': 'contact',
};

export function getInitialRoomFromUrl() {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    return PATH_TO_ROOM[path] !== undefined ? PATH_TO_ROOM[path] : null;
}

export function useDocumentMeta() {
    const { currentRoom, teleportTo } = useScene();
    const isHandlingPopState = useRef(false);
    const lastPushedRoom = useRef(undefined);

    useEffect(() => {
        const roomKey = currentRoom === null ? 'null' : currentRoom;
        const meta = ROOM_META[roomKey] || ROOM_META.null;

        document.title = meta.title;

        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) descTag.setAttribute('content', meta.description);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', meta.title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', meta.description);

        const absoluteUrl = `${window.location.origin}${meta.path}`;
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', absoluteUrl);

        const canonicalTag = document.querySelector('link[rel="canonical"]');
        if (canonicalTag) canonicalTag.setAttribute('href', absoluteUrl);

        if (!isHandlingPopState.current && lastPushedRoom.current !== currentRoom) {
            if (lastPushedRoom.current === undefined) {
                window.history.replaceState({ room: currentRoom }, '', meta.path);
            } else {
                window.history.pushState({ room: currentRoom }, '', meta.path);
            }
            lastPushedRoom.current = currentRoom;
        }
        isHandlingPopState.current = false;
    }, [currentRoom]);

    useEffect(() => {
        const handlePopState = (event) => {
            const room = event.state ? event.state.room : null;
            if (room !== undefined) {
                isHandlingPopState.current = true;
                lastPushedRoom.current = room;
                teleportTo(room);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [teleportTo]);
}
