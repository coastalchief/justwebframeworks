#!/usr/bin/env ruby
# encoding: utf-8

# default encoding setup
Encoding.default_internal = "utf-8"
Encoding.default_external = "utf-8"

# This file should set Rango environment
# You can run your scripts with ./init.rb my-script.rb
# See http://wiki.github.com/botanicus/rango/rango-boot-process

# bundler
begin
  # Require the preresolved locked set of gems.
  require File.expand_path("../.bundle/environment", __FILE__)
rescue LoadError
  # Fallback on doing the resolve at runtime.
  require "rubygems"
  require "bundler"
  Bundler.setup
end

require "rango"

# we need to load dependencies before boot, so bootloaders will be called
Rango.logger.info("Loading dependencies for #{Rango.environment}")

$LOAD_PATH.unshift(File.expand_path("../lib", __FILE__))

require "helloworld"

Rango.boot

# Available arguments:
#   ./init.rb -i
#   ./init.rb -i file
#   ./init.rb file
Rango.parse(ARGV)
