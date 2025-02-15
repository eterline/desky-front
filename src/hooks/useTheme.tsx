import { useEffect, useState } from "react";
import { DeskyTheme, fetchTheme } from "../lib/api/settingsService";
import useFetchService from "./useFetchService";
import { getItemLocalStorage, setItemLocalStorage } from "../libs/localStorage";

export type DeskyThemeParam  = DeskyTheme;

const storeTheme = (name: string, theme: DeskyTheme) => (
    setItemLocalStorage(`theme-${name}`, JSON.stringify(theme).replaceAll(/rgb\(|rgba\(|\)/gm, ""))
)

const exportTheme = (name: string): DeskyTheme => {
    return JSON.parse(getItemLocalStorage(`theme-${name}`))
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
        const savedTheme = exportTheme(name);
        if (savedTheme) {
            Object.entries(savedTheme).forEach(([key, value]) => {
                document.documentElement.style.setProperty(`--${key}`, value);
                console.log(`--${key}`, value)
            });
        }
    }, [name]);
    
};

export default useTheme;