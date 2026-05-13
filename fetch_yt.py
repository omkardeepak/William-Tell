import urllib.request
import re
import json

req = urllib.request.Request('https://www.youtube.com/watch?v=7zEUImqBxLY', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    m = re.search(r'\"channelId\":\"([^\"]+)\"', html)
    if m:
        channel_id = m.group(1)
        print('CHANNEL:', channel_id)
        
        # Now fetch the channel RSS feed
        feed_url = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channel_id
        feed_req = urllib.request.Request(feed_url, headers={'User-Agent': 'Mozilla/5.0'})
        feed_xml = urllib.request.urlopen(feed_req).read().decode('utf-8')
        
        # Extract video IDs from the RSS
        video_ids = re.findall(r'<yt:videoId>([^<]+)</yt:videoId>', feed_xml)
        print('VIDEOS IN ORDER:')
        for vid in video_ids:
            print(vid)
    else:
        print('Channel ID not found')
except Exception as e:
    print('Error:', e)
