require "action_dispatch"
require "rails/engine"
require "citizens_advice_components"
require "pry"

class CadsBuilder < SiteBuilder
  def build
    make_test_posts
    load_cads
    build_components_collection
  end

  def build_components_collection
    
  end

  def make_test_posts
    %w[one two three four].each do |post|
      doc "#{post}.md" do 
        collection "posts"
        content post
      end
    end
  end

  def load_cads
    site.config.loaded_cads ||= begin
      cads_loader = Zeitwerk::Loader.new
      CitizensAdviceComponents::Engine.config.autoload_once_paths.each do |path|
        cads_loader.push_dir path
      end
      cads_loader.setup
      cads_loader.eager_load
      true
    end
  end
end