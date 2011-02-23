//steal/js /users/admin/documents/coastal/dev/justwebframework/js/javascriptmvc/helloworld/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('/users/admin/documents/coastal/dev/justwebframework/js/javascriptmvc/helloworld/scripts/build.html',{to: '/users/admin/documents/coastal/dev/justwebframework/js/javascriptmvc/helloworld'});
});
