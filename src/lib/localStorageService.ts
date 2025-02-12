export const getItemLocalStorage = <T>(key: string): T => {
    const data = localStorage.getItem(key);
    const typedData: T = data ? JSON.parse(data) : '';
    return typedData
}

export const setItemLocalStorage = <T>(key: string, item: T): void => {
    localStorage.setItem(key, JSON.stringify(item));
}

export const rmItemLocalStorage = (key: string): void => {
    localStorage.removeItem(key)
}



export const getAuthToken = (): string => {
    return getItemLocalStorage('token')
}

export const setAuthToken = (token: string): void => {
    setItemLocalStorage('token', token)
}

export const rmAuthToken = (): void => {
    getItemLocalStorage('token')
}