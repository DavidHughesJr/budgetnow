const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'eef61afd8dmshd3e45bf348b2eb9p13bdc2jsn3335b6566b8f',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
};

const url = 'https://twelve-data1.p.rapidapi.com'

export const fetchSymbolSearch = async (search) => {
    const response = await fetch(`${url}/symbol_search?symbol=${search}&outputsize=30`, options)
    const data = await response.json()
    return data
}

