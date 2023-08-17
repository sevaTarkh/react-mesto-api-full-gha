class Api{
    constructor(options){
        this._options = options;
        this._baseUrl = this._options.baseUrl;
        this._headers = this._options.headers;
    }
    _getResJson(res){
        if (res.ok){
          return res.json();
        } 
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    getUserInformationFromServer(token){
      return fetch(`${this._baseUrl}/users/me`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      })
    .then(this._getResJson)
    }
    getInitialCards(token){
        return fetch(`${this._baseUrl}/cards`,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          })
        .then(this._getResJson)
    }
    deleteCard(cardId, token){
        return fetch(`${this._baseUrl}${'/cards/'}${cardId}`,{
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          })
          .then(this._getResJson)
    }
    createCardForServer(data, token){
      return fetch(`${this._baseUrl}/cards`,{
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.fotoname,
          link: data.link
        })
      })
      .then(this._getResJson)
    }
    editProfileInformation(data, token){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.theme
      })
    })
    .then(this._getResJson)
    }
    editProfileAvatar(data, token){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data.linkavatar
        })
      })
      .then(this._getResJson)
    }
    handlePutLike(cardId, token){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then(this._getResJson)
    }
    handleRemoveLike(cardId, token){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then(this._getResJson)
    }
}

const api = new Api({
    baseUrl: 'https://api.plum.nomoreparties.co', 
});

export default api;