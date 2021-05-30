export default async (endpoint, data = {}) => {
    let API_URL = 'https://worldsbestkaiju.herokuapp.com'
    let response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}
