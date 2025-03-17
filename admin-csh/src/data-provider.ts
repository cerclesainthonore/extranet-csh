import {fetchUtils} from 'react-admin';

const apiUrl: string = import.meta.env.VITE_EXTRANET_CSH_API_URL;

const httpClient = (url: string, options: RequestInit = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
    getList: async (resource: string, params: any) => {
        let url;
        switch (resource) {
            case 'newsletter':
                url = `${apiUrl}/newsletter`;
                break;
            case 'conferences':
                url = `${apiUrl}/conferences`;
                break;
            case 'agenda':
                url = `${apiUrl}/agenda?getReservations=true`;
                break;
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }

        let {json} = await httpClient(url);
        if (params.pagination) {
            const {page, perPage} = params.pagination;
            const firstElement = (page - 1) * perPage;
            json = json.slice(firstElement, firstElement + perPage);
        }

        return {
            data: json,
            total: json.length,
        };
    },

    getOne: async (resource: string, params: any) => {
        let url;
        switch (resource) {
            case 'newsletter':
            case 'conferences':
                url = `${apiUrl}/conferences/${params.id}`;
                break;
            case 'agenda':
                url = `${apiUrl}/agenda/${params.id}`;
                break;
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }

        const {json} = await httpClient(url);
        return {
            data: json,
        };
    },

    getMany: async (resource: string, params: any) => {
        let url;
        const json = [];
        for (const id of params.ids) {
            switch (resource) {
                case 'newsletter':
                    url = `${apiUrl}/newsletter/${id}`;
                    break;
                case 'conferences':
                    url = `${apiUrl}/conferences/${id}`;
                    break;
                case 'agenda':
                    url = `${apiUrl}/agenda/${id}`;
                    break;
                default:
                    throw new Error(`Unknown resource: ${resource}`);
            }

            json.push(await httpClient(url));
        }

        return {
            data: json,
        }
    },

    getManyReference: async (resource: string, params: any) => {
        let url;
        switch (resource) {
            case 'newsletter':
                url = `${apiUrl}/newsletter/`;
                break;
            case 'conferences':
                url = `${apiUrl}/conferences/`;
                break;
            case 'agenda':
                url = `${apiUrl}/agenda/`;
                break;
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }

        const {json} = await httpClient(url);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let data = json.filter((value: object) => value[params.target] === params.id);
        if (params.pagination) {
            const {page, perPage} = params.pagination;
            const firstElement = (page - 1) * perPage;
            data = data.slice(firstElement, firstElement + perPage);
        }

        return {
            data: data,
            total: data.length,
        }
    },

    create: async (resource: string, params: any) => {
        let url;
        let data;
        switch (resource) {
            case 'newsletter':
                url = `${apiUrl}/newsletter/subscribe`;
                data = {
                    name: params.data.name,
                    mail: params.data.mail,
                    discoveredVia: params.data.discoveredVia,
                    phone: params.data.phone,
                };
                break;
            case 'agenda':
                url = `${apiUrl}/agenda`;
                data = {
                    title: params.data.title,
                    date: params.data.date,
                    description: params.data.description,
                };
                break;
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }

        const {json} = await httpClient(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return {data: {...params.data, id: json.id}};
    },

    update: async (resource: string, params: any) => {
        let url;
        switch (resource) {
            case 'newsletter':
                url = `${apiUrl}/newsletter/${params.id}`;
                break;
            case 'conferences':
                url = `${apiUrl}/conferences/${params.id}`;
                break;
            case 'agenda':
                url = `${apiUrl}/agenda/${params.id}`;
                break;
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }

        await httpClient(url, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        });
        return {data: params.data};
    },

    updateMany: async (resource: string, params: any) => {
        let url;
        for (const id of params.ids) {
            switch (resource) {
                case 'newsletter':
                    url = `${apiUrl}/newsletter/${id}`;
                    break;
                case 'conferences':
                    url = `${apiUrl}/conferences/${id}`;
                    break;
                case 'agenda':
                    url = `${apiUrl}/agenda/${id}`;
                    break;
                default:
                    throw new Error(`Unknown resource: ${resource}`);
            }

            await httpClient(url, {
                method: 'PATCH',
                body: JSON.stringify(params.data),
            });
        }
        return {data: params.ids};
    },

    delete: async (resource: string, params: any) => {
        let url;
        switch (resource) {
            case 'newsletter':
                url = `${apiUrl}/newsletter/${params.id}`;
                break;
            case 'conferences':
                url = `${apiUrl}/conferences/${params.id}`;
                break;
            case 'agenda':
                url = `${apiUrl}/agenda/${params.id}`;
                break;
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }

        await httpClient(url, {
            method: 'DELETE',
        });
        return {data: params.previousData};
    },

    deleteMany: async (resource: string, params: any) => {
        let url;
        for (const id of params.ids) {
            switch (resource) {
                case 'newsletter':
                    url = `${apiUrl}/newsletter/${id}`;
                    break;
                case 'conferences':
                    url = `${apiUrl}/conferences/${id}`;
                    break;
                case 'agenda':
                    url = `${apiUrl}/agenda/${id}`;
                    break;
                default:
                    throw new Error(`Unknown resource: ${resource}`);
            }

            await httpClient(url, {
                method: 'DELETE',
            });
        }
        return {data: params.ids};
    }
};

export default dataProvider;
