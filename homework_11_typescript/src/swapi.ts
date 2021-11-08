// объект взамодействия с сервером
export class Swapi {
    constructor() {}
    getPeople (callback: Function, url: string): void {
        fetch(url)
            .then((response: Response): Promise<SwapiResultType> => {
                return response.json()
            })
            .then((res: SwapiResultType): void => callback(res));
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