export const handleLikes = (currentLikes: string[], newUID: string): string[] =>
    currentLikes.includes(newUID)
        ? currentLikes.filter(currentUID => currentUID !== newUID)
        : [newUID, ...currentLikes];
