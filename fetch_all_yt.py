import urllib.request
import re
import json

req = urllib.request.Request('https://www.youtube.com/channel/UCYMeCFtjbxJcstdH3YkS8AA/videos', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # The JSON data is usually in ytInitialData
    m = re.search(r'var ytInitialData = ({.*?});</script>', html)
    if m:
        data = json.loads(m.group(1))
        # Navigate the JSON structure to find videos
        # Usually: contents -> twoColumnBrowseResultsRenderer -> tabs -> [1] (Videos) -> tabRenderer -> content -> richGridRenderer -> contents
        
        videos = []
        for tab in data.get('contents', {}).get('twoColumnBrowseResultsRenderer', {}).get('tabs', []):
            if 'tabRenderer' in tab and tab['tabRenderer'].get('title') == 'Videos':
                contents = tab['tabRenderer']['content']['richGridRenderer']['contents']
                for item in contents:
                    if 'richItemRenderer' in item:
                        vid_renderer = item['richItemRenderer']['content'].get('videoRenderer')
                        if vid_renderer:
                            videos.append(vid_renderer['videoId'])
                break
        
        print('FOUND FULL LIST:', len(videos))
        for vid in videos:
            print(vid)
    else:
        print('ytInitialData not found')
except Exception as e:
    print('Error:', e)
