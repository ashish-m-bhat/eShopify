export default function useHttp(postFetchFunction) {


    const satisfyRequest = async (requestConfig) => {

        const response = await fetch(requestConfig.url, {
            method:requestConfig.method,
            body:requestConfig.body?requestConfig.body:null,
            headers:requestConfig.headers?requestConfig.headers:{}
        });
        const data = await response.json();

        // Execute the function passed as a parameter
        postFetchFunction(data);
    }
    return satisfyRequest;
}
