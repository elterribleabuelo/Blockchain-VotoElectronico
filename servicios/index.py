import os
import sys
from flask import request, jsonify

# Definir la raiz del proyecto
ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
print(ROOT_PATH)

os.environ.update({"ROOT_PATH": ROOT_PATH})
os.environ.update({"ENV": "desarrollo"})
os.environ.update({"PUERTO": "4000"})
sys.path.append(os.path.join(ROOT_PATH, "src"))


from app import app

if __name__ == "__main__":
    app.config["DEBUG"] = os.environ.get("ENV") == "desarrollo"

app.run(host="0.0.0.0", port=int(os.environ.get("PUERTO")))
