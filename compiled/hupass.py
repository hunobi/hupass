import webview, sys
from modules.core import Api   

if __name__ == "__main__":
    file = sys.argv[1] if len(sys.argv)>1 else None
    api = Api(filepath=file)

    window = webview.create_window('HuPass', url='index.html', js_api= api,
        resizable=False, min_size=(800,600), background_color="#282c34")
    api.set_window(window)
    
    webview.start(debug=False)