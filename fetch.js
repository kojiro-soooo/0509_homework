function myFetch(resource, options = {}){
    return new Promise((res, rej)=> {
        const {method, body = null, headers = null} = options;
        var xhttp = new XMLHttpRequest();

        xhttp.onload = () => {
            if (xhttp.status==200){
                res(this.response);
            }
            else {
                rej(new Error("Error: " + this.status));
            }
        };

        xhttp.onerror = () => {
            cb(new Error('Error'));
        };

        xhttp.open(method, resource);
        
        if (headers) {
            for (let item of Object.entries(object.headers)){
                xhttp.setRequestHeader(item[0], item[1]);
            }
        }

        if (method == "GET" || method == "DELETE"){
            xhttp.send();
        } else if (method == "PUT" || "POST") {
            if (body) {
                xhttp.send(JSON.stringify(body));
            } else {
                rej(new Error("Empty body"))
            }
        }
    })
};

myFetch("https://jsonplaceholder.typicode.com/todos/1", {method: "GET"})
    .then((response) => console.log(response))