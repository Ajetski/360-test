// allow tabs
var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}

function runCode(input) {
    navigator.serviceWorker.controller.postMessage({
        code: '(function() { ' + input + ' }())'
    });
}

navigator.serviceWorker.addEventListener('message', event => {
    if(event.data.error) {
        console.log(event.data.response, event.data.error);
    }
    else{
        console.log("worker's repsonse: ", JSON.parse(event.data.response));
    }
    document.getElementById('output').innerText = event.data.response;
  });

navigator.serviceWorker.register("/worker.js")
    .then(function (registration) {
        console.log("ServiceWorker registration successful with scope: ", registration.scope, registration);
        if(!navigator.serviceWorker.controller){
            location.reload();
        }
    })
    .catch(function (error) {
        console.error("Service Worker Error", error);
    });




