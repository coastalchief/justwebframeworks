# encoding: utf-8

require "rango/rack/middlewares/basic"

require "multigiri"
require "multigiri/email_obfuscator"
# require "multigiri/google_analytics"
require "multigiri/html5"
require "multigiri/link_checker"
require "multigiri/default_attributes"
require "multigiri/minify"

Rango.after_boot(:rackup) do
  Helloworld.rackup do
    use Rango::Middlewares::Basic

    use Multigiri::HTML do
      use Multigiri::HTML5::Forms
      use Multigiri::HTML5::Hidden
      use Multigiri::EmailObfuscator
      # use Multigiri::GoogleAnalytics, :my_tracking_code
      use Multigiri::DefaultAttributes
      if Rango.development?
        use Multigiri::LinkChecker, SimpleLogger::Logger.new("log/links.log")
      end
    end
  end
end
