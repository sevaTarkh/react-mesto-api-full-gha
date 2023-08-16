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
    getUserInformationFromServer(){
      return fetch(`${this._baseUrl}/users/me`,{
        headers: this._headers
      })
    .then(this._getResJson)
    }
    getInitialCards(){
        return fetch(`${this._baseUrl}/cards`,{
            headers: this._headers
          })
        .then(this._getResJson)
    }
    deleteCard(cardId){
        return fetch(`${this._baseUrl}${'/cards/'}${cardId}`,{
            method: 'DELETE',
            headers: this._headers
          })
          .then(this._getResJson)
    }
    createCardForServer(data){
      return fetch(`${this._baseUrl}/cards`,{
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.fotoname,
          link: data.link
        })
      })
      .then(this._getResJson)
    }
    editProfileInformation(data){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.theme
      })
    })
    .then(this._getResJson)
    }
    editProfileAvatar(data){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.linkavatar
        })
      })
      .then(this._getResJson)
    }
    handlePutLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
        method: 'PUT',
        headers: this._headers
      })
      .then(this._getResJson)
    }
    handleRemoveLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResJson)
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000', 
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
  },
});

export default api;