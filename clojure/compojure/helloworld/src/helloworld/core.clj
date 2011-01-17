(ns helloworld.core
  (:use compojure.core)
  (:require [compojure.route :as route]))

(defroutes example
  (GET "/" [] "<h1>Hello World!</h1>")
  (route/not-found "Page not found"))