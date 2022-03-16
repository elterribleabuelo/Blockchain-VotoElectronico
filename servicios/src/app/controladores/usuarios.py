import os
from flask import request, jsonify, Response
from app import app, mongo
from bson import json_util
from bson.objectid import ObjectId

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


@app.errorhandler(404)
def not_found(error=None):

    response = jsonify({"message": "Resource Not Found" + request.url, "status": 404})
    response.status_code = 404
    return response
