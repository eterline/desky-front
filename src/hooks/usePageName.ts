import { useEffect } from "react";

const usePageName = (name: string) => {
    useEffect(() => {document.title = `Desky [${name}]`}, [name]);
}

export default usePageName;