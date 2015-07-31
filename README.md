# handlerbar
###1.first_try
初次学习，重点了解模版，可编辑context，以及最后模板注入

###2.handler_register
we would create a helper named list to generate our HTML list. 
The helper receives the people as its first parameter, 
and an options hash as its second parameter. 
The options hash contains a property named fn,
 which you can invoke with a context just as you would invoke a normal Handlebars template.
 
######Block expressions allow you to define *helpers* 
that will invoke a section of your template with a different context than the current.
*These block helpers* are identified by a # preceeding the helper name 
and require a matching closing mustache, /, of the same name.

###3.paths
嵌套路径
*../*路径链接到父级模板作用域
具体怎么用？context可以有多个？？

###4.Handlebars.registerHelper
想起了angular注册指令
###5.this Handlebars.SafeString
<code> 
Handlebars.registerHelper('agree_button',function(){
        var emotion = Handlebars.escapeExpression(this.emotion);
            name = Handlebars.escapeExpression(this.name);
        return new Handlebars.SafeString(
             "<button>I agree. I " + emotion + " " + name + "</button>"
        );
    });
</code>