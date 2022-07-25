import webview, time, os
import modules.db as db
import modules.cryptos as crypto

class Api:
    def __init__(self, filepath=None) -> None:
        self.filepath = filepath
        self.folderpath = None
        self.db = None
        self.__window = None
        self.__token = None
    

    def command(self, cmd, args):
        if cmd == "settings_update_password":
            old = args['old']
            new = args['new']
            new_hash = crypto.sha256(new)
            if old == self.__token:
                self.__token = new
                self.db['metadata']['db_password_hash'] = new_hash
                self.update_database(self.db)
                return True
            return False
        
        elif cmd == "set_clipboard":
            data = args['data']
            os.system('echo | set /p nul="' + data + '"| clip')
        
        elif cmd == "generate_password":
            return crypto.random_string()

        elif cmd == "exit": self.__window.destroy()

    def load_database(self, password):
        try:
            self.db = db.load(self.filepath,password)
            self.db["metadata"]["time_last_access"] = time.time_ns()
            db.save(self.filepath,self.db, password)
            self.__token = password
            return True
        except:
            return False

    def create_database(self, path, name, password) -> bool:
        try:
            db.create(name, password, path)
            self.filepath = path
            return True
        except:
            return False
        
    def update_database(self, data):
        self.db = data
        db.save(self.filepath, self.db, self.__token)

    # loading db
    def create_loading_file_window(self) -> str:
        tmp = self.__window.create_file_dialog(webview.OPEN_DIALOG, allow_multiple=False, file_types=('Hupass (*.hpdb)', 'All files (*.hpdb)'))
        self.filepath = tmp[0] if tmp is not None else None
        return self.filepath
    
    # create db
    def create_loading_folder_window(self) -> str:
        tmp = self.__window.create_file_dialog(webview.FOLDER_DIALOG, allow_multiple=False, file_types=('Hupass (*.hpdb)', 'All files (*.hpdb)'))
        self.folderpath = tmp[0] if tmp is not None else None
        return self.folderpath

    def get_storage(self) -> dict:
        return {
            "filepath": self.filepath,
            "folderpath": self.folderpath,
            "db": self.db,
            "latest_db_version": db.Versions.latest
        }

    def set_window(self, win): self.__window = win
