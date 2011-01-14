# encoding: utf-8

require "pathname"
require "rack/builder"

module Helloworld
  def self.root
    @@root ||= File.expand_path("../helloworld", __FILE__)
  end

  def self.path
    @@path ||= Pathname.new(self.root)
  end

  def self.rack
    @@rack ||= Rack::Builder.new
  end

  def self.rackup(&block)
    self.rack.instance_eval(&block)
    return self.rack
  end
end

# initializers
Rango.logger.info("Loading initializers ...")
Dir["#{Helloworld.root}/initializers/*.rb"].each do |path|
  Rango.logger.debug("Loading initializer #{File.basename(path)}")
  require path
end

# load models
Rango.logger.info("Loading models ...")
Dir["#{Helloworld.root}/models/**/*.rb"].each do |path|
  Rango.logger.debug("Loading model #{File.basename(path)}")
  require path
end

# load views
Rango.logger.info("Loading views ...")
require "helloworld/views"
