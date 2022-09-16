class Api::ScrapingController < ApplicationController
    def index
        data = {
            hoge: params[:url]
        }
        render json: {status: :ok, data: data}
    end
end
