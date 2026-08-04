/**
 * Arts room content for Nandi Varun Reddy.
 * The three verified graphite slots are ready for real image files when supplied.
 */

export const PLATFORM_CONFIG = {
    art: {
        color: '#efe9dc',
        accentColor: '#c8bca9',
        icon: 'ART',
        label: 'Graphite Portrait',
        shape: 'monitor',
    },
};

export const CONTENT_DATA = [
    {
        id: 'portrait-1',
        platform: 'art',
        title: 'Graphite Portrait 01',
        description: 'Reserved for Varun’s first finished graphite portrait.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        thumbnail: null,
        url: null,
        date: 'Artwork coming soon',
        readTime: 'Graphite pencil',
    },
    {
        id: 'portrait-2',
        platform: 'art',
        title: 'Graphite Portrait 02',
        description: 'Reserved for Varun’s second finished graphite portrait.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        thumbnail: null,
        url: null,
        date: 'Artwork coming soon',
        readTime: 'Graphite pencil',
    },
    {
        id: 'portrait-3',
        platform: 'art',
        title: 'Graphite Portrait 03',
        description: 'Reserved for Varun’s third finished graphite portrait.',
        frontTexture: '/textures/studio/monitor_front.webp',
        paintedFrontTexture: '/textures/studio/monitor_front_painted.webp',
        thumbnail: null,
        url: null,
        date: 'Artwork coming soon',
        readTime: 'Graphite pencil',
    },
];

export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter((item) => item.platform === platform);
};

export const getLatestContent = () => CONTENT_DATA[0];
