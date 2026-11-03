"""Generate the native marketing icon with macOS's built-in image utility."""
import json
import pathlib
import subprocess

target = pathlib.Path('ios/App/App/Assets.xcassets/AppIcon.appiconset')
target.mkdir(parents=True, exist_ok=True)
subprocess.run(['sips', '-z', '1024', '1024', 'assets/icon-512.png', '--out', str(target / 'AppIcon.png')], check=True)
(target / 'Contents.json').write_text(json.dumps({
    'images': [{'filename': 'AppIcon.png', 'idiom': 'universal', 'platform': 'ios', 'size': '1024x1024'}],
    'info': {'author': 'xcode', 'version': 1}
}, indent=2))
