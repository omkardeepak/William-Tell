import urllib.request
import re
import sys
import datetime

with open('src/pages/Works.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

ids = re.findall(r'youtubeId:\s*\'([A-Za-z0-9_-]+)\'', content)

video_dates = []
for vid in ids:
    try:
        req = urllib.request.Request('https://www.youtube.com/watch?v=' + vid, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        m = re.search(r'<meta itemprop="datePublished" content="([^"]+)">', html)
        if m:
            date_str = m.group(1)
            video_dates.append((vid, date_str))
        else:
            video_dates.append((vid, '1970-01-01'))
    except Exception as e:
        video_dates.append((vid, '1970-01-01'))

# Sort descending by date
video_dates.sort(key=lambda x: x[1], reverse=True)

print('ORDERED IDS:')
for v in video_dates:
    print(f"    {{ youtubeId: '{v[0]}' }}, // {v[1]}")
