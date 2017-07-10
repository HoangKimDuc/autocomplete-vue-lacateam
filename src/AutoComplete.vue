<template>
    <div class="has-feedback dropdown" :class="{open : showlist}">
        <input type="text" class="form-control dropdown-toggle" data-toggle="dropdown" id="search"
        :placeholder="placeholder" 
        v-model="keyword"
        @keyup="keyup"
        @click="showlist=(items.length > 0 ? true : false)">
        <span class="glyphicon glyphicon-search form-control-feedback text-muted"></span>
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
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        props: {
            url: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: 'Search'
            },
            limit:{
                type:Number,
                default: 4
            },
            callbackdata: {
                type: Function,
                required: true
            },
            callbackdataselected: {
                type: Function,
                required: true
            },
            bgcolorselect: {
                type: String,
                default: '#650065'
            }
        },
        components:{
            'templatedata':{
                props:{
                    item:{
                        type:Object,
                        default:{}
                    }
                },
                template: '<h1>{{item.name}}</h1>',
                mounted:function(){
                    console.log(this);
                }
            }
        },
        data() {
            return {
                items: [],
                index: -1,
                showlist: false,
                keyword: '',
            }
        },
        mounted: function () {
            this.setOption();
        },
        watch: {
            keyword: function (val) {
                if (this.keyword.length > 0)
                    this.search();
                else
                    this.items={};
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
                    // case 13: //enter
                    //     this.selectList(this.json[this.focusList])
                    //     this.showList = false;
                    //     break;
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
                    vm.callbackdata(response.data);
                }).catch(function (e) {
                    console.log(e);
                });
            },
            setOption: function () {
                $(':root').css('--bg-color-hover', this.bgcolorselect);
            },
            focusEnter: function () {
                this.num_focus = -1;
                $('#search').focus();
            },
            go: function (data) {
                this.callbackdataselected(data);
            }
        }
    }
</script>
<style>
     :root {
        --bg-color-hover: #650065;
    }

    .dropdown-menu {
        padding: 0;
        border: none;
        width:100%;
        max-height: 300px;
        overflow-y: auto;
    }

    .dropdown-menu>li {
        border-bottom: 1px solid #ddd;
    }

    .dropdown-menu>li>a {
        list-style: none;
        padding: 5px 10px;
        cursor: pointer;
        border-top: 1px solid #ddd;

        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .dropdown-menu>li>a:hover,
    .dropdown-menu>li>a:focus {
        background-color: var(--bg-color-hover);
        color: #ffffff;
    }
</style>