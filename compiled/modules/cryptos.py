import base64, hashlib, secrets, random
from Crypto import Random
from Crypto.Cipher import AES


def sha256(data) ->str:
    m = hashlib.sha256()
    m.update(str(data).encode())
    return m.hexdigest()

def random_string() ->str:
    size = random.randint(20, 64)
    pswd_hex = secrets.token_hex(size)
    pswd = ""
    for i in pswd_hex:
        if random.random() > 0.66: pswd += i.upper()
        elif random.random() > 0.33: pswd += random.choice(['!',"@","#","$","%","^","&","*","(",")","-",'+'])
        else: pswd += i
    return pswd

class AESCipher(object):

    def __init__(self, key :str): 
        self.bs = AES.block_size
        self.key = hashlib.sha256(key.encode()).digest()

    def encrypt(self, raw):
        raw = self._pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw.encode()))

    def decrypt(self, enc :str):
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s)-1:])]