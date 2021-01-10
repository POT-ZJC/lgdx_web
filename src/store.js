import Vue from 'vue'
let obj = { htmlSize:14}
export let store = Vue.observable(obj)
export let mutations = {
     setHtmlSize(data) {
       store.htmlSize=data||14
     }
}
