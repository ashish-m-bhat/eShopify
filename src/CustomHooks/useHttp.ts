import { useCallback } from "react";

interface RequestConfig {
    url: string;
    method?: string;
    body?: string;
    headers?:{
        'Content-type': string
    }
};

export default function useHttp(postFetchFunction: Function) {
    const satisfyRequest = useCallback(async (requestConfig: RequestConfig) => {

        const response = await fetch(requestConfig.url, {
            method:requestConfig.method,
            body:requestConfig.body?requestConfig.body:null,
            headers:requestConfig.headers?requestConfig.headers:{}
        });
        const data = await response.json();

        // Execute the function passed as a parameter
        postFetchFunction(data);
    }, [postFetchFunction]);
    return satisfyRequest;
};
