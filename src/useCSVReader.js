import { useState } from "react";
import { csvToJSON } from './utils'

export function useCSVReader() {
    const [data, setData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const parsed = csvToJSON(text);
            setData(parsed);
        };
        reader.readAsText(file);
    };

    return { data, handleFileUpload };
}