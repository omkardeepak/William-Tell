import urllib.request
import json
import time

video_ids = [
    '7zEUImqBxLY', '3-1PyFj1h7Y', 'Kkb-ogpelIo', 'H9FNmeSnbQY', 'vdDbyddtEsE',
    'MWepSouX1Es', 'ubRXxLr08rY', 'ON3CbgeviSs', 'aSxR-I_OG1A', '6TcIzK_E4lQ',
    'NL9Wl0jAfM8', 'fLrw2V4N_Vs', 'oJrqi2bThJs', '86cB9Vm5QRQ', 'Kv-zKigB9kY',
    'hSU-_Gz_QGQ', 'GXlg5S4ASgs', '9iCMhKNMBbE', 'Bba2IMvh3dc', 'RfCXTA15bno',
    'en-z_aTVn30', 'POX8SAX_eVQ', 'B5dLCHgC21Q', 'RoUvFpiaRro', 'pY4sQVsJC3I',
    'MUVOx9CezRo', 'e3H9h1nmV0g', 'OqWaih22a-c', 'X30KBVV9k4I', 'ri3ylqx8xYQ',
    'XNgy1CugdwI', 'qJ2JaafaTWE', 'f051D_Hg-BM', 'kuZgNuNMAxE', '4svjw9bicV0',
    '5lVBuUxjNZA'
]

title_map = {}

for vid in video_ids:
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode('utf-8'))
        title_map[vid] = data.get('title', '')
        print(f"Fetched: {vid} -> {data.get('title', '')}")
    except Exception as e:
        print(f"Failed: {vid} due to {e}")
    time.sleep(0.2)  # be nice to the API

# Write map as JSON
with open('oembed_titles.json', 'w') as f:
    json.dump(title_map, f, indent=2)

print("\n\nSUCCESS! Write map to oembed_titles.json")
