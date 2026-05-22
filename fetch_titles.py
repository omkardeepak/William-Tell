import urllib.request
import re
import json

req = urllib.request.Request('https://www.youtube.com/channel/UCYMeCFtjbxJcstdH3YkS8AA/videos', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    m = re.search(r'var ytInitialData = ({.*?});</script>', html)
    if m:
        data = json.loads(m.group(1))
        videos = []
        for tab in data.get('contents', {}).get('twoColumnBrowseResultsRenderer', {}).get('tabs', []):
            if 'tabRenderer' in tab and tab['tabRenderer'].get('title') == 'Videos':
                contents = tab['tabRenderer']['content']['richGridRenderer']['contents']
                for item in contents:
                    if 'richItemRenderer' in item:
                        vid_renderer = item['richItemRenderer']['content'].get('videoRenderer')
                        if vid_renderer:
                            video_id = vid_renderer['videoId']
                            title = vid_renderer.get('title', {}).get('runs', [{}])[0].get('text', '')
                            videos.append({'youtubeId': video_id, 'title': title})
                break
        
        print(json.dumps(videos, indent=2))
    else:
        print('ytInitialData not found')
except Exception as e:
    print('Error:', e)
