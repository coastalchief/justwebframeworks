#!/usr/bin/env gem build
# encoding: utf-8

require "base64"

Gem::Specification.new do |spec|
  spec.name = "helloworld"
  spec.version = "0.0.1"
  spec.authors = [""]
  spec.homepage = "http://github.com//helloworld"
  spec.summary = ""
  spec.description = "" # TODO: long description
  spec.cert_chain = nil
  spec.email = "TODO"
  spec.has_rdoc = true

  # files
  spec.files = `git ls-files`.split("\n")
  spec.require_paths = ["lib"]

  # Ruby version
  # NOTE: if you are using JRuby, you have to run jruby --1.9 -S gem install helloworld
  spec.required_ruby_version = ::Gem::Requirement.new("~> 1.9")

  # dependencies
  spec.add_dependency "rango", ">= 0.3"
  spec.add_dependency "pancake"
  spec.add_dependency "usher"
  spec.add_dependency "tilt"
  spec.add_dependency "haml"

  # RubyGems has runtime dependencies (add_dependency) and
  # development dependencies (add_development_dependency)
  # Rango isn't a monolithic framework, so you might want
  # to use just one specific part of it, so it has no sense
  # to specify dependencies for the whole gem. If you want
  # to install everything what you need for start with Rango,
  # just run gem install rango --development

  spec.add_development_dependency "bundler"

  begin
    require "changelog"
  rescue LoadError
    warn "You have to have changelog gem installed for post install message"
  else
    spec.post_install_message = CHANGELOG.new.version_changes
  end

  # RubyForge
  spec.rubyforge_project = "helloworld"
end
