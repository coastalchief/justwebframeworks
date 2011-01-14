# encoding: utf-8

Rango.after_boot(:setup_router) do
  Rango::Router.use(:usher)
  require "helloworld/urls"
  Helloworld.rackup { run Rango::Router.app }
end
