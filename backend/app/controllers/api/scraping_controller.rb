class Api::ScrapingController < ApplicationController
    before_action :check_param
    def index
        # e.g. params[:url] = events/1420946
        playlist = Playlist.new(params[:url])
        render json: {status: playlist.get_status, data: playlist.to_json}
    end

    def check_param
        if !params.has_key?(:url)
            render json: {status: :bad_request}
        end
    end
end
