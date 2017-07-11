export default {
        template:`  <div class="has-feedback dropdown" :class="{open:showlist}">
        <input type="text" class="form-control dropdown-toggle" data-toggle="dropdown" id="search"
        :placeholder="placeholder" 
        v-model="keyword"
        @input="input"
        @keyup="keyup"
        @focus="showlist=(items.length > 0 ? true : false)">
        <span class="form-control-feedback" :class="icon"></span>
        <ul class="dropdown-menu">
           <li v-for="item in items">
            <a href="#"
            @click="go(item)" 
            @keyup="keyup"
            @keyup.enter="go(item)">
            <slot :text="item">
                <h4>{{item.value?item.value:item.name}}</h4>
            </slot>
            </a>
        </li>
        </ul>
    </div>`,
        props: {
            url: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: 'Search'
            },
            start:{
                type:String,
                default: '3'
            },
            limit:{
                type:String,
                default: '3'
            },
            callbackdata: {
                type: Function,
                default: null
            },
            fielddatashow:{
                type:String,
                default: 'name'
            },
            bgcolorselect: {
                type: String,
                default: '#650065'
            },
            icon: {
                type: String,
                default: 'glyphicon glyphicon-search text-muted'
            },
            iconleft:{
                type: String,
                default: 'false'
            }

        },
        data() {
            return {
                items: [],
                index: -1,
                showlist: false,
                keyword: '',
                itemselected:{}
            }
        },
        mounted: function () {
            require('./style.css');
            this.setOption();

        },
        watch: {            
            keyword: function () {
                
               if (this.keyword.length >= this.start){
                    this.search();
                    if(this.items.length>0){
                        if(!$(".dropdown").hasClass('open'))
                            $(".dropdown-toggle").dropdown("toggle");
                    }
                }else{
                    this.items={};
                }
            },
            items: function (val) {
                this.showlist = this.items.length > 0 ? true : false;
                //
            },
            showlist: function(){
                if(!this.showList)
                    this.index=-1;
            },
            index: function(){
                if(this.index==-1){
                    $('#search').focus();
                    return;
                }
                $('.dropdown-menu>li>a')[this.index].focus();
            }
        },
        methods: {
            keywordchange:function(){
                
            },
            input:function(){
                //this.keywordchange();
            },
            keyup:function(e) {
                let key = e.keyCode;
                // Disable when list isn't showing up
                if (this.showList==false) return;
                switch (key) {
                    case 40: //down
                        if(this.index<this.items.length-1)
                             this.index++;
                       break;
                    case 38: //up
                        if(this.index>-1)
                              this.index--;
                        break;
                    case 13:
                        if(this.callbackdata)
                            {
                                this.callbackdata(this.itemselected);
                            }
                        break;
                    case 27: //esc
                        this.showList = false;
                        break;
                }
            },
            search: function () {
                var vm = this;
                axios.get(this.url+"?keyword="+this.keyword
                    +"&&limit="+this.limit
                ).then(function (response) {
                    vm.items = response.data;
                    // vm.callbackdata(response.data);
                }).catch(function (e) {
                    console.log(e);
                });
            },
            setOption: function () {
                $(':root').css('--bg-color-hover', this.bgcolorselect);
                if(this.iconleft=='true')
                {
                    $(':root').css('--num-padding-left', '45px');
                    $(':root').css('--num-padding-right', '12px');
                    $(':root').css('--align-left', '0px');
                    $(':root').css('--align-right', 'auto');
                }
                
            },
            focusEnter: function () {
                this.index = -1;
                $('#search').focus();
            },
            go: function (data) {
                this.focusEnter();
                this.itemselected = data;
                this.keyword=data[this.fielddatashow];
            }
        }
    }
    