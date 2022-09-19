class Api::ScrapingController < ApplicationController
    before_action :check_param
    def index
        # e.g. params[:url] = events/1420946
        result = Playlist.new(params[:url]).to_json
        render json: {status: :ok, data: result}
    end

    def check_param
        if !params.has_key?(:url)
            render json: {status: :bad_request}
        end
    end
end
