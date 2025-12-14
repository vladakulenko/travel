export const waitUntil = (isoDate: string) => {
    const delay = new Date(isoDate).getTime() - Date.now();

    return new Promise<void>((resolve) => {
        setTimeout(resolve, Math.max(delay, 0));
    });
};
