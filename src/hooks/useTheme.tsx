import { useEffect } from "react";
import { DeskyTheme, fetchTheme, setupBackground } from "../lib/api/settingsService";
import useFetchService from "./useFetchService";
import { getItemLocalStorage, setItemLocalStorage } from "../lib/localStorage/localStorageService";

export type DeskyThemeParam  = DeskyTheme;

const storeTheme = (name: string, theme: DeskyTheme) => (
    setItemLocalStorage(`theme-${name}`, JSON.stringify(theme).replaceAll(/rgb\(|rgba\(|\)/gm, ""))
)

const exportTheme = (name: string): DeskyTheme => {
    try {
        return JSON.parse(getItemLocalStorage(`theme-${name}`))
    } catch (err) {
        console.log("can't import theme colors from storage", err)
    }
}

const useTheme = (name: string) => {
    const {error, loading, data} = useFetchService(fetchTheme);

    useEffect(() => {
        if (!error && !loading && data) {
            Object.entries(data).map(
                ([themeName, theme]) => storeTheme(themeName, theme)
            );
        }
    }, [name, data]);

    useEffect(() => {

        setupBackground();
        const savedTheme = exportTheme(name);

        if (savedTheme) {
            Object.entries(savedTheme).forEach(([key, value]) => {
                document.documentElement.style.setProperty(`--${key}`, value);
            });
        }

    }, [name, data]);
    
};

export default useTheme;