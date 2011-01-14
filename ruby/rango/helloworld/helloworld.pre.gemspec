#!/usr/bin/env gem build
# encoding: utf-8

# Reuse the main gemspec for releasing prerelease versions
eval(File.read("helloworld.gemspec")).tap do |specification|
  specification.version = "#{specification.version}.pre"
end
