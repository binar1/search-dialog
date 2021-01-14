

export async function Get(link, token) {
  var payload = {
    method: "Get",
  };

   
  if (token !==undefined) {
    payload.headers = {
      Authorization: `Bearer ${ token}`,
      "Content-Type": "application/json",
    };
  }

  var result =await SendRequest(link,payload)
  return result;
}


async function SendRequest(link, payload){
    var result = await fetch(link, payload)
    .then(async (res) => {
      var result = await res.json();
      return result;
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
    return error
    });

    return result;
}
