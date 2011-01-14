# encoding: utf-8

# http://wiki.github.com/botanicus/rango/routers
require "rango/router"

Rango::Router.use(:usher)

# http://github.com/joshbuddy/usher
Rango::Router.app = Usher::Interface.for(:rack) do
  default(Helloworld::Application.dispatcher(:not_found_handler)) # route not found to the controller so we can properly rescue it
  get("/").to(Helloworld::ShowCase.dispatcher(:index)).name(:showcase)
end
