"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, People, Planets, Films, Favorites
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# api.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
# jwt = JWTManager(api)

@api.route('/people', methods=['GET'])
def get_people():
    people = People.query.all()
    #[<People 'Yoda'>, <People 'Darth Vader'>]
    list_people = list(map(lambda person : person.serialize(), people ))
    response_body = {
        "msg": "Hello, from people",
        "list_people": list_people
    }
    return jsonify(response_body), 200

@api.route('/people/<int:people_id>', methods=['GET'])
def get_person(people_id):
    person = People.query.filter_by(id=people_id).first()
    response_body = {
        "msg": "Hello, from person",
        "person": person.serialize()
    }
    return jsonify(response_body), 200


@api.route('/planets', methods=['GET'])
def get_planets():
    planets = Planets.query.all()
    #[<People 'Planet1'>, <People 'Planet2'>]
    list_planets = list(map(lambda planet : planet.serialize(), planets ))
    response_body = {
        "msg": "Hello, from planets",
        "list_planets": list_planets
    }
    return jsonify(response_body), 200


#select * from people where id = planets_id
@api.route('/planets/<int:planets_id>', methods=['GET'])
def get_planet(planets_id):
    planet = Planets.query.filter_by(id=planets_id).first()
    response_body = {
        "msg": "Hello, from planet",
        "person": planet.serialize()
    }
    return jsonify(response_body), 200

@api.route('/films', methods=['GET'])
def get_films():
    films = Films.query.all()
    list_films = list(map(lambda film : film.serialize(), films ))
    response_body = {
        "msg": "Hello, from films",
        "list_films": list_films
    }
    return jsonify(response_body), 200

@api.route('/films/<int:films_id>', methods=['GET'])
def get_film(films_id):
    films = Films.query.filter_by(id=films_id).first()
    response_body = {
        "msg": "Hello, from films",
        "person": films.serialize()
    }
    return jsonify(response_body), 200

@api.route('/user/<int:user_id>/favorites', methods=['GET'])
def get_user_favorites(user_id):
  favorites_query = Favorites.query.filter_by(user_id=user_id).all()
  list_favorites = []
  for i in favorites_query:
      favorite_people = People.query.filter_by(id=i.people_id).first()
      if favorite_people:
        list_favorites.append(favorite_people.name)
      favorite_planets = Planets.query.filter_by(id=i.planets_id).first()
      if favorite_planets:
        list_favorites.append(favorite_planets.name)
  response_body = {
    "list_favorites_{}".format(user_id): list_favorites
  }
  return jsonify(response_body), 200


@api.route('/favorites/planets/<int:planets_id>', methods=['POST'])
@jwt_required()
def add_new_favorite_planet(planets_id):
    current_user = get_jwt_identity()
    favorites_query = Favorites.query.filter(Favorites.user_id==current_user, Favorites.planets_id==planets_id).first()

    if not favorites_query:
        planets = Planets.query.filter_by(id=planets_id).first()
        new_favorite = Favorites(user_id=current_user, planets_id=planets_id)
        if planets:
            db.session.add(new_favorite)
            db.session.commit()
            return jsonify({"msg": "Creating favorite planet"}), 200
        else:
            return jsonify({"msg": "Planet doesn't exists"}), 401
    if favorites_query:
        return jsonify({"msg": "Favorite planet already added"}), 200


@api.route('/favorites/people/<int:people_id>', methods=['POST'])
@jwt_required()
def add_new_favorite_people(people_id):
    current_user = get_jwt_identity()
    favorites_query = Favorites.query.filter(Favorites.user_id==current_user, Favorites.people_id==people_id).first()

    if not favorites_query:
        people = People.query.filter_by(id=people_id).first()
        new_favorite = Favorites(user_id=current_user, people_id=people_id)
        if people:
            db.session.add(new_favorite)
            db.session.commit()
            return jsonify({"msg": "Creating favorite person"}), 200
        else:
            return jsonify({"msg": "Person doesn't exists"}), 401
    if favorites_query:
        return jsonify({"msg": "Favorite person already added"}), 200


@api.route('/favorites/planets/<int:planets_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_planet(planets_id):
    current_user = get_jwt_identity()
    favorites_query = Favorites.query.filter(Favorites.user_id==current_user, Favorites.planets_id==planets_id).first()

    if favorites_query:
        db.session.delete(favorites_query)
        db.session.commit()
        return jsonify({"msg": "Deleting favorite people"}), 200
    
    if not favorites_query:
        return jsonify({"msg": "Favorite doesn't exist"}), 200
    

@api.route('/favorites/people/<int:people_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_people(people_id):
    current_user = get_jwt_identity()
    favorites_query = Favorites.query.filter(Favorites.user_id==current_user, Favorites.people_id==people_id).first()

    if favorites_query:
        db.session.delete(favorites_query)
        db.session.commit()
        return jsonify({"msg": "Deleting favorite people"}), 200
    
    if not favorites_query:
        return jsonify({"msg": "Favorite doesn't exist"}), 200