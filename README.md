# autocomplete-vue-lacateam
AutoComplete VueJs 2

* [Vue.js](http://vuejs.org/) (tested with 2.x)
* [Bootstrap CSS](http://getbootstrap.com/) (tested with 3.x)

### Installation

```bash
$ npm install --save autocomplete-vue-lacateam
```

### Example
```js
import autocomplete from 'autocomplete-vue-lacateam'
    
new Vue({
  el: '#app',,
  components: { autocomplete },
  data () {
    return {
      url: '/searchusers',
      limit: 4,
      placeholder: 'Name|Email',
      bgcolorselect: '#000000'
    }
  },
  methods: {
    callbackdata (data) {            
      console.log(data);
      // data : return data clicked
    }
  }
})
```

```html
<body id="app">
  <autocomplete 
  url="url" 
  placeholder="placeholder" 
  limit="5"
  :callbackdata="callbackdata" 
  bgcolorselect="bgcolorselect">
   <template scope="item">
      <h4>{{ item.text.name }}</h4>
      <p>{{ item.text.email }}</p>
      <!--default template
         <h4>{{item.value?item.value:item.name}}</h4>
      -->
    </template>
  </autocomplete>
</body>
```

#### Props
| Name          | Type     | Default | Required | Description
| :------------ | :--------| :-------| :--------| :-----------
| url           | String   |         | true     | Total itens in server side
| callbackdata  | Function |         | true     | Returns the selected result

##### Options
| Name                | String  | Default     | Description
| :-------------------| :-------| :-----------| :-------
| bgcolorselect       | String  | "#650065"   | Background Color when select and focus data
| placeholder         | String  | "Search"    | PlaceHolder
| limit               | String  | "3"         | Limit
| fielddatashow       | String  | "name"      | Data show in input
| start               | String  | "3"         | Keyword length to start searching
| icon                | String  | "glyphicon glyphicon-search text-muted" | icon of the input control
| iconleft            | String  | "false"     | By default, the icon on the right is equivalent to inconleft = "true"  
