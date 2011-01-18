%% -*- mode: nitrogen -*-
-module (index).
-compile(export_all).
-include_lib("nitrogen/include/wf.hrl").

main() -> #template { file="./site/templates/bare.html" }.

title() -> "Hello World!!".

body() ->
    #container_12 { body=[
        #grid_8 { alpha=true, prefix=2, suffix=2, omega=true, body=inner_body() }
    ]}.

inner_body() -> 
    [
        #h1 { text="Hello World" },
        #p{},
        "
        If you can see this page, then your Nitrogen server is up and
        running. Click the button below to test postbacks.
        ",
        #p{}, 	
        #button { id=button, text="Click me!", postback=click },
        #p{},
        "
        Run <b>./bin/dev help</b> to see some useful developer commands.
        "
    ].
	
event(click) ->
    wf:replace(button, #panel { 
        body="You clicked the button!", 
        actions=#effect { effect=highlight }
    }).
