from modules.cryptos import sha256, AESCipher
import time, json

class Versions:
    latest = 1
    v1 = 1

def load(path, password) -> dict:
    with open(path, 'rb') as file:
        line = file.readline()
        data = line
        while line:
            line = file.readline()
            data = data + line
        file.close()
        cipher = AESCipher(password)
        data = cipher.decrypt(data)
        return json.loads(data)

def save(path, data, password):
    cipher = AESCipher(password)
    data = cipher.encrypt(json.dumps(data))
    with open(path, 'wb') as file:
        file.write(data)
        file.close()

def create(name, password, path):
    pass_hash = sha256(password)
    cipher = AESCipher(password)
    t = time.time_ns()
    data = {
        "metadata": {
            "version": Versions.latest,
            "time_created": t,
            "time_last_access": None,
            "db_name": name,
            "db_password_hash": pass_hash
        },
        "accounts":
        [
            {
                "name": "example",
                "url": "example.hub",
                "login": "admin",
                "password": "admin",
                "notes": "This is example record",
                "time_created": t,
                "time_updated": t
            }
        ],
        "settings":{
            "pinned": False
        }
    }
    data = cipher.encrypt(json.dumps(data))
    with open(path, 'wb') as file:
        file.write(data)
        file.close()
    


        