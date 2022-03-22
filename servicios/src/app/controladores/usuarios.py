import os
from flask import request, jsonify, Response
from app import app, mongo
from bson import json_util
from bson.objectid import ObjectId
import base64
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("src/app/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

ROOT_PATH = os.environ.get("ROOT_PATH")


@app.route("/users", methods=["POST"])
def create_user():
    # Receiving data
    dni = request.json["dni"]
    nombre = request.json["nombre"]
    apellido_paterno = request.json["apellido_paterno"]
    apellido_materno = request.json["apellido_materno"]
    fecha_nacimiento = request.json["fecha_nacimiento"]
    url_foto = request.json["url_foto"]

    if (
        dni
        and nombre
        and apellido_paterno
        and apellido_materno
        and fecha_nacimiento
        and url_foto
    ):

        id = mongo.db.usuarios.insert(
            {
                "dni": dni,
                "nombre": nombre,
                "apellido_paterno": apellido_paterno,
                "apellido_materno": apellido_materno,
                "fecha_nacimiento": fecha_nacimiento,
                "url_foto": url_foto,
            }
        )

        response = {
            "id": str(id),
            "dni": dni,
            "nombre": nombre,
            "apellido_paterno": apellido_paterno,
            "apellido_materno": apellido_materno,
            "fecha_nacimiento": fecha_nacimiento,
            "url_foto": url_foto,
        }
        return response

    else:
        return not_found()


@app.route("/users", methods=["GET"])
def get_users():
    users = mongo.db.usuarios.find()
    response = json_util.dumps(users)  # Convirtiendo el bson a un json

    return Response(response, mimetype="application/json")


@app.route("/users/<dni>", methods=["GET"])
def get_user(dni):
    user = mongo.db.usuarios.find({"dni": dni})
    response = json_util.dumps(user)
    return Response(response, mimetype="application/json")


@app.route("/users/<dni>", methods=["DELETE"])
def delete_user(dni):
    mongo.db.users.delete_one({"dni": dni})
    response = jsonify({"message": "User" + dni + "was deleted succesfully"})
    return response


@app.route("/users/<id>", methods=["PUT"])
def update_user(id):
    dni = request.json["dni"]
    nombre = request.json["nombre"]
    apellido_paterno = request.json["apellido_paterno"]
    apellido_materno = request.json["apellido_materno"]
    fecha_nacimiento = request.json["fecha_nacimiento"]
    url_foto = request.json["url_foto"]

    if (
        dni
        and nombre
        and apellido_paterno
        and apellido_materno
        and fecha_nacimiento
        and url_foto
    ):

        mongo.db.usuarios.update_one(
            {"_id": ObjectId(id)},
            {
                "$set": {
                    "dni": dni,
                    "nombre": nombre,
                    "apellido_paterno": apellido_paterno,
                    "apellido_materno": apellido_materno,
                    "fecha_nacimiento": fecha_nacimiento,
                    "url_foto": url_foto,
                }
            },
        )
        response = jsonify({"message": "User" + id + "was updated succesfully"})
        return response


@app.route("/users/image_base64", methods=["POST"])
def create_base64():
    dni = request.json["dni"]
    url_foto = request.json["url_foto"]
    image_base64 = base64.b64encode(requests.get(url_foto).content).decode("utf-8")
    image_base64 = "data:image/png;base64," + image_base64
    # print("Imagen en base64", image_base64)
    if dni and url_foto:

        id = mongo.db.images.insert(
            {
                "dni": dni,
                "url_foto": url_foto,
                "encode_PhotoToBase64": image_base64,
            }
        )

        response = {
            "id": str(id),
            "dni": dni,
            "url_foto": url_foto,
            "encode_PhotoToBase64": image_base64,
        }
        return response

    else:
        return not_found()


@app.route("/users/image_base64/<dni>", methods=["GET"])
def get_base64(dni):
    images = mongo.db.images.find({"dni": dni})
    response = json_util.dumps(images)  # Convirtiendo el bson a un json
    return Response(response, mimetype="application/json")


@app.errorhandler(404)
def not_found(error=None):

    response = jsonify({"message": "Resource Not Found" + request.url, "status": 404})
    response.status_code = 404
    return response
