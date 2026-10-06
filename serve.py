#!/usr/bin/env python3
"""Serve the saved practitioner page on this computer only."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import re
os.chdir(Path(__file__).resolve().parent)
class Handler(SimpleHTTPRequestHandler):
 def send_head(self):
  # Byte ranges let browser audio controls seek without downloading from the start.
  if self.path.split('?',1)[0].startswith('/assets/audio/'):
   path=Path(self.translate_path(self.path))
   if path.is_file():
    stream=path.open('rb');size=path.stat().st_size
    start,end=0,size-1
    header=self.headers.get('Range')
    match=re.fullmatch(r'bytes=(\d*)-(\d*)',header or '')
    if match:
     first,last=match.groups()
     if first:start=int(first);end=min(int(last),end) if last else end
     elif last:start=max(0,size-int(last))
     if start>=size or end<start:
      stream.close();self.send_response(416);self.send_header('Content-Range',f'bytes */{size}');self.end_headers();return None
    self.send_response(206 if match else 200)
    self.send_header('Content-Type',self.guess_type(str(path)))
    self.send_header('Accept-Ranges','bytes')
    self.send_header('Content-Length',str(end-start+1))
    if match:self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
    self.end_headers();stream.seek(start);self.audio_remaining=end-start+1;return stream
  return super().send_head()
 def copyfile(self,source,outputfile):
  if hasattr(self,'audio_remaining'):
   remaining=self.audio_remaining
   while remaining:
    chunk=source.read(min(65536,remaining))
    if not chunk:break
    outputfile.write(chunk);remaining-=len(chunk)
   return
  super().copyfile(source,outputfile)
 def do_GET(self):
  route=self.path.split('?',1)[0]
  if route in ('/', '/practitioners', '/practitioners/'):
   self.path='/index.html'
  elif not route.startswith('/assets/') and not Path(route.lstrip('/')).is_file():
   self.send_response(302)
   self.send_header('Location', 'https://howwefeel.org'+self.path)
   self.end_headers()
   return
  super().do_GET()
print('Local copy: http://127.0.0.1:8765/practitioners', flush=True)
ThreadingHTTPServer(('127.0.0.1',8765), Handler).serve_forever()
