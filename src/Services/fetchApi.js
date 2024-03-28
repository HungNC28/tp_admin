import { useState, useEffect } from "react";
import axios from "axios";

function useApiData(apiUrl) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [apiUrl]);

    return data;
}

export default useApiData;
