import axios from "axios";

export default async function request(httpConfig) {

    try {
        const response = await axios(httpConfig);

        console.log(response);

        if (! ( response.status >= 200 && response.status < 300) ) {
            throw new Error('Something went wrong');
        }

        return {
            data: response.data
        }
    }
    catch(e) {
        console.log(e);
        return { error: e.response.data.message };
    }
}