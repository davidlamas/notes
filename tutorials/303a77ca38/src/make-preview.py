"""Build one self-contained HTML file from this page (inlines CSS and JS).
Usage: python3 src/make-preview.py OUT.html   (run from the page folder)"""
import re, sys
h = open('index.html').read()
h = re.sub(r'<link[^>]*href="styles\.css[^"]*"[^>]*>', lambda m: '<style>' + open('styles.css').read() + '</style>', h)
h = re.sub(r'<script[^>]*src="([^"]+)"[^>]*></script>', lambda m: '<script>' + open(m.group(1).split('?')[0]).read().replace('</script>', '<\\/script>') + '</script>', h)
open(sys.argv[1], 'w').write(h)
