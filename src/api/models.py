from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    favorites = db.relationship('Favorites', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    url = db.Column(db.String(250), unique=True, nullable=False)
    height =  db.Column(db.String(250), nullable=True)
    mass =  db.Column(db.String(250), nullable=True)
    hair_color = db.Column(db.String(250), nullable=True)
    skin_color = db.Column(db.String(250), nullable=True)
    eye_color = db.Column(db.String(250), nullable=True)
    birth_year = db.Column(db.String(250), nullable=True)
    gender = db.Column(db.String(250), nullable=True)
    favorites = db.relationship('Favorites', backref='people', lazy=True)

    def __repr__(self):
        return '<People %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "height": self.height,
            "mass": self.mass,
            "hair_color": self.hair_color,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "birth_year": self.birth_year,
            "gender": self.gender
        }

class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    url = db.Column(db.String(250), unique=True, nullable=False)
    rotation_period =  db.Column(db.String(250), nullable=True)
    orbital_period =  db.Column(db.String(250), nullable=True)
    diameter = db.Column(db.String(250), nullable=True)
    climate = db.Column(db.String(250), nullable=True)
    gravity = db.Column(db.String(250), nullable=True)
    terrain = db.Column(db.String(250), nullable=True)
    population = db.Column(db.String(250), nullable=True)
    favorites = db.relationship('Favorites', backref='planets', lazy=True)

    def __repr__(self):
        return '<Planets %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "rotation_period": self.rotation_period,
            "orbital_period": self.orbital_period,
            "diameter": self.diameter,
            "climate": self.climate,
            "gravity": self.gravity,
            "terrain": self.terrain,
            "population": self.population
        }

class Films(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    url = db.Column(db.String(250), unique=True, nullable=True)
    episode_id =  db.Column(db.String(250), nullable=True)
    opening_crawl =  db.Column(db.String(1000), nullable=True)
    director = db.Column(db.String(250), nullable=True)
    producer = db.Column(db.String(250), nullable=True)
    release_date = db.Column(db.String(250), nullable=True)
    favorites = db.relationship('Favorites', backref='films', lazy=True)

    def __repr__(self):
        return '<Films %r>' % self.title

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "episode_id": self.episode_id,
            "opening_crawl": self.opening_crawl,
            "director": self.director,
            "producer": self.producer,
            "release_date": self.release_date,
        }

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    people_id = db.Column(db.Integer, db.ForeignKey('people.id'), nullable=True)
    planets_id = db.Column(db.Integer, db.ForeignKey('planets.id'), nullable=True)
    films_id = db.Column(db.Integer, db.ForeignKey('films.id'), nullable=True)

    def __repr__(self):
        return '<Favorites %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
        }