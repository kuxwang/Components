/* 内容管理对象 */

var H5 =function ( ) {
    this.id = ('h5_'+Math.random()).replace('.','_');
    this.el = $('<div class="h5" id="'+this.id+'">').hide();
    this.page = [];
    $('body').append( this.el );

    /**
     * 新增一个页
     * @param {string} name 组建的名称，会加入到ClassName中
     * @param {string} text 页内的默认文本
     * @return {H5} H5对象，可以重复使用H5对象支持的方法
     */
    this.addPage = function( name , text ){
        var page = $('<div class="h5_page section">');

        if( name != undefined ){
            page.addClass('h5_page_'+name);
        }
        if( text != undefined ){
            page.text(text);
        }
        this.el.append(page);
        this.page.push( page );
        if( typeof this.whenAddPage === 'function' ){
            this.whenAddPage();
        }
        return this;
    }

    /* 新增一个组件 */
    this.addComponent = function(name, cfg){
        var cfg = cfg || {};
        cfg = $.extend({
             type : 'base'
         },cfg);

        var component;  //  定义一个变量，存储 组件元素
        var page = this.page.slice(-1)[0];
        switch( cfg.type ){
            case 'base' :
                component = new Base(name,cfg);
                break;

            case 'polyline' :
                component = new Polyline(name,cfg);
                break;

            case 'pie' :
                component = new Pie(name,cfg);
                break;
            case 'bar' :
                component = new Bar(name,cfg);
                break;
            case 'bar_v' :
                component = new Bar_v(name,cfg);
                break;

            case 'radar' :
                component = new Radar(name,cfg);
                break;

            case 'pie' :
                component = new Pie(name,cfg);
                break;
            case 'ring' :
                component = new Ring(name,cfg);
                break;
           case 'point' :
                component = new Point(name,cfg);
                break;
            default:
        }

        page.append(component);
        return this;
    }
    /* H5对象初始化呈现 */
    this.loader = function( firstPage ){
        this.el.fullpage({
            onLeave:function( index, nextIndex, direction) {
                $('.section').eq(index-1).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function( anchorLink, index ) {
                $('.section').eq(index-1).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo( firstPage );
        }
    }
    this.loader = typeof H5_loading == 'function' ? H5_loading : this.loader;
    return this;
}