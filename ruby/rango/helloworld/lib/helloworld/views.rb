# encoding: utf-8

# http://wiki.github.com/botanicus/rango/controllers

require "rango/stacks/controller"

module Helloworld
  class Application < Rango::StackController

    # http://wiki.github.com/botanicus/rango/errors-handling
    def render_http_error(exception)
      if self.respond_to?(exception.to_snakecase)
        self.send(exception.to_snakecase, exception)
      else
        render_http_error_template(exception)
      end
    end

    def render_http_error_template(exception)
      render "errors/#{exception.status}.html"
    rescue TemplateInheritance::TemplateNotFound
      render "errors/500.html"
    end
  end

  def not_found_handler
    raise NotFound, "No route found"
  end

  class ShowCase < Application
    def index
      render "index.html"
    end
  end

end
