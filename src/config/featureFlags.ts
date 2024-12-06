const featureFlags = {
    ENABLE_NEW_FEATURE: process.env.ENABLE_NEW_FEATURE === 'true',
    ENABLE_ANOTHER_FEATURE: process.env.ENABLE_ANOTHER_FEATURE === 'true',
};

export default featureFlags;
