export function getItemLocalStorage(key: string) {
    try {
        const item = localStorage.getItem(key);
        if (!item) {
            console.warn(`Key "${key}" not found in localStorage.`);
            return null;
        }
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error parsing JSON for key "${key}":`, error);
        return null;
    }
}

export function setItemLocalStorage(key: string, value: Object) {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error(`Error set key value "${key}":`, error);
    }
}