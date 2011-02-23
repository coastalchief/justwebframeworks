//steal/js /users/admin/documents/coastal/dev/justwebframework/js/javascriptmvc/helloworld/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/clean',function(){
	steal.clean('/users/admin/documents/coastal/dev/justwebframework/js/javascriptmvc/helloworld/helloworld.html',{indent_size: 1, indent_char: '\t'});
});
