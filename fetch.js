// function myFetch() {
//     // check if url is provided 
//     var url = (arguments.length > 0 && arguments[0] !== undefined) ? arguments[0]: '';
//     // check if options are provided
//     var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1]: {};

//     // create new instance of XMLHttpRequest
//     var xhr = new XMLHttpRequest()
//     var onFulfillment = [];
//     var onError = [];
//     var onCompletion = [];
//     // fetch should GET data by default, but also be able to execute other methods
//     var method = "GET" || options.method;
//     xhr.onreadystatechange = function (){
//         var data = this;
//         // if resoucre is successfully fetched
//         if(this.readyState == 4 && this.status == 200){
//             onFulfillment.forEach(function(cb){
//                 cb(data);
//             });
//             onCompletion.forEach(function(cb){
//                 cb(data);
//             });
//         } else if (this.readyState == 4 && this.status !== 200) {
//             onError.forEach(function(cb){
//                 cb(data);
//             })
//             onCompletion.forEach(function(cb){
//                 cb(data)
//             });
//         }
//     };
//     xhr.open(method, url, true);
//     xhr.send();

//     return {
//         then: function then(fulfillmentFunction){
//             onFulfillment.push(fulfillmentFunction);
//         },
//         catch: function _catch(errorFunction) {
//             onError.push(errorFunction);
//         },
//         finally: function _finally(completionFunction){
//             onCompletion.push(completionFunction);
//         }
//     }
// };

// myFetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then((response)=>response.json())
//     .then((data) => console.log(data));

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