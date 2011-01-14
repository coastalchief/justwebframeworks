#!/usr/bin/env rackup -p 4000 -s thin
# encoding: utf-8

# Shebang:
#   - bin/shotgun: doesn't work for some reason, it doesn't read this file at all
#   - bin/rackup

# Try to keep this file as small as possible.
# You should put here rack-specific stuff which means mainly
# middleware initialization (Rack::Builder#use) and setting
# rack endpoint (Rack::Builder#run). Development middleware
# setup should be placed into rackup.rb. However generic
# middleware setup should be placed in lib/app/initializers,
# so it can be reusable in case the application run as a
# mountable application.

# In fact
#   - It's a stupid idea to evaluate the whole file in context of a Rack::Builder instance
#   - You can't use __END__ in config.ru because of the eval
#   - File vs. Rack::File

require ::File.expand_path("../init.rb", __FILE__)

run helloworld.rack#.to_app
