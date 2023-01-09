const stockOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'eef61afd8dmshd3e45bf348b2eb9p13bdc2jsn3335b6566b8f',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
};
const overviewOptions = {
    method: 'GET',
    headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '419bd5942fmshff5dd7dcf34cd06p1dd32djsne642e068e809',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
};

const stockUrl = 'https://twelve-data1.p.rapidapi.com'
const overviewUrl = 'https://bing-news-search1.p.rapidapi.com'

export const fetchSymbolSearch = async (search) => {
    const response = await fetch(`${stockUrl}/symbol_search?symbol=${search}&outputsize=30`, stockOptions)
    const data = await response.json()
    return data
}
export const fetchOverviewNews = async (search) => {
    const response = await fetch(`${overviewUrl}/news/search?q=money%20budget%20tips&freshness=Week&textFormat=Raw&safeSearch=Off`, overviewOptions)
    const data = await response.json()
    return data
}


