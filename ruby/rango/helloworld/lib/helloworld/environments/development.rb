# encoding: utf-8

# http://wiki.github.com/botanicus/rango/environments-support
require "rango/environments"

# database connection
case Rango.environment
when "development", "production", "staging"
  DataMapper.setup(:default, "sqlite3:db/#{Rango.environment}.db")
when "test", "spec", "cucumber"
  DataMapper.setup(:default, "sqlite3::memory:")
end

if Rango.development?
  Rango.logger = SimpleLogger::Logger.new(STDOUT)
  Rango.logger.auto_flush = true
else
  Rango.logger = SimpleLogger::Plain.new("log/#{Rango.environment}.log")
  Rango.logger.auto_flush = false
end

# write log at exit
at_exit { Rango.logger.close }
