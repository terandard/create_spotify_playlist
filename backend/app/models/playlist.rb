require 'selenium-webdriver'

class Playlist
    def initialize(url)
        @url = 'https://www.livefans.jp/' + url
        @status = :ok
        scraping
    end

    def scraping
        options = Selenium::WebDriver::Chrome::Options.new
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--blink-settings=imageEnabled=false')

        driver = Selenium::WebDriver.for :chrome, options: options
        driver.get(@url)
        track_elements = driver.find_elements(:css, '.rnd')

        if track_elements.blank?
            @status = :not_found
            driver.quit
            return
        end

        parent_element = driver.find_element(:css, '.setBlock')
        @artist = parent_element.find_element(:id, 'eventEventArtistName').attribute("value")
        @event_title = parent_element.find_element(:id, 'eventTitle').attribute("value")
        @event_subtitle = parent_element.find_element(:id, 'eventSubTitle').attribute("value")

        @tracks = extract_tracks(track_elements)
        driver.quit
    end

    def extract_tracks(track_elements)
        re = Regexp.new('top: (\d+)px')
        tracks = {}
        track_elements.each do |e|
            key = re.match(e.attribute('style'))[1].to_i
            track = e.find_element(:class, 'ttl').attribute("textContent")
            tracks[key] = track
        end

        tracks.sort.to_h.values
    end

    def to_json
        {
            artist: @artist,
            event_title: @event_title,
            event_subtitle: @event_subtitle,
            tracks: @tracks
        }
    end

    def get_status
        @status
    end
end