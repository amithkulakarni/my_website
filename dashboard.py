from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import shutil


HOST = "127.0.0.1"
PORT = 8000
ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"


class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIST), **kwargs)


if __name__ == "__main__":
    if not DIST.exists():
        npm = shutil.which("npm")
        print("This project is now a React + Vite app.")
        if npm:
            print("Run: npm install")
            print("Then: npm run dev")
            print("Or build static files with: npm run build")
        else:
            print("Node.js/npm is not installed. Install Node.js first, then run npm install and npm run dev.")
        raise SystemExit(0)

    server = None
    for port in range(PORT, PORT + 20):
        try:
            server = ThreadingHTTPServer((HOST, port), PortfolioHandler)
            url = f"http://{HOST}:{port}/index.html"
            break
        except OSError:
            continue

    if server is None:
        raise SystemExit("No available local port found from 8000 to 8019.")

    print(f"Serving website at {url}")
    server.serve_forever()
