Camping.goes :HelloWorld

module HelloWorld::Controllers
    class Index < R '/'
      def get
        "Hello World"
      end
    end
end
    