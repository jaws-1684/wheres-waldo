require 'json'
class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  def image_url name
    ActionController::Base.helpers.asset_path(name)
  end
end
