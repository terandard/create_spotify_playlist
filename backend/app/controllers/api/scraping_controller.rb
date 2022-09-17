class Api::ScrapingController < ApplicationController
    def index
        # e.g. params[:url] = events/1420946
        result = Playlist.new(params[:url]).to_json
        render json: {status: :ok, data: result}
    end
end
