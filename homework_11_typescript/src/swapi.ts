// объект взамодействия с сервером
export class Swapi {
    constructor() {

    }
    getPeople (callback: Function, url: string) {
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then((res: SwapiResultType) => callback(res));
    }
}

export type SwapiResultItemType = {
    name: string,
    height: string,
    mass: string,
    gender: string
}

export type SwapiResultType = {
    next: string,
    previous: string,
    results: Array<SwapiResultItemType>
}