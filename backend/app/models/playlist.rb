require 'selenium-webdriver'

class Playlist
    def initialize(url)
        @url = 'https://www.livefans.jp/' + url
        scraping
    end

    def scraping
        options = Selenium::WebDriver::Chrome::Options.new
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')

        driver = Selenium::WebDriver.for :chrome, options: options
        driver.get(@url)
        parent_element = driver.find_element(:css, '.setBlock')
        @artist = parent_element.find_element(:id, 'eventEventArtistName').attribute("value")
        @event_title = parent_element.find_element(:id, 'eventTitle').attribute("value")
        @event_subtitle = parent_element.find_element(:id, 'eventSubTitle').attribute("value")

        @tracks = extract_tracks(parent_element)
        driver.quit
    end

    def extract_tracks(parent_element)
        re = Regexp.new('top: (\d+)px')
        tracks = {}
        parent_element.find_elements(:class, 'rnd').each do |e|
            key = re.match(e.attribute('style'))[1]
            track = e.find_element(:class, 'ttl').text
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
end