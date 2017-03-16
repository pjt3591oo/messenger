/**
 * Created by bagjeongtae on 2017. 3. 13..
 */
Vue.component('message', {
    props:['type','message'],
    template: '<div class="ui message success" :class="type">{{message}}</div>'
});

let vm = new Vue({
    el: "#app",
    data:{
        message: "mung"
    }
});