
from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import fields
from dataclasses import dataclass
from sqlalchemy.orm import session, declarative_base, mapper
# from models import db, Stock, Client, Orders
import datetime
import time
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://crystaldev:lmao@localhost/crystalshop'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "*"}})

db = SQLAlchemy(app)

ma = Marshmallow()


# stock model / schema
@dataclass
class Stock(db.Model):
    __tablename__ = "stock"
    id_stock = db.Column(db.Integer, primary_key=True)
    name_crystal = db.Column(db.String(45), nullable=False)
    quantity = db.Column(db.Integer)
    __mapper_args__ = {
        'polymorphic_identity': 'stock'
    }

    def __init__(self, name_crystal, quantity):
        self.name_crystal = name_crystal
        self.quantity = quantity


class StockSchema(ma.Schema):
    id_stock = fields.Integer(dump_only=True)
    name_crystal = fields.String(required=True, error_messages={
                                 "required": "Name Crystal is required."})
    quantity = fields.Integer(required=False)


# stock READ


@app.route('/stock', methods=['GET'])
def index():
    get_stock = db.session.query(Stock).all()
    stock_schema = StockSchema(many=True)
    stock = stock_schema.dump(get_stock)
    return make_response(jsonify(stock))

# stock READ by id //


@app.route('/stock/<id_stock>', methods=['GET'])
def get_stock_by_id(id_stock):
    get_stockById = Stock.query.get(id_stock)
    if not get_stockById:
        return make_response({'error': 'item not found'}, 404)
    stock_schema = StockSchema()
    item = stock_schema.dump(get_stockById)
    return make_response(jsonify(item))

# stock CREATE


@app.route('/newstock', methods=['POST'])
def create_stock():
    data = request.get_json()
    if not ('name_crystal' or 'quantity') in data:
        return make_response(jsonify({"Error": "Fields are required."}), 400)
    find = Stock.query.filter_by(name_crystal=data['name_crystal']).first()
    if not find:
        new_data = Stock(
            name_crystal=data['name_crystal'],
            quantity=data['quantity']
        )
        db.session.add(new_data)
        db.session.commit()
        stock_schema = StockSchema()
        new = stock_schema.dump(new_data)
        return make_response(jsonify({"item": new}), 201)

    find.quantity = int(data['quantity']) + int(find.quantity)

    db.session.add(find)
    db.session.commit()
    stock_schema = StockSchema()
    attached = stock_schema.dump(find)
    return make_response(jsonify({"item": attached}), 201)

# stock DELETE


@app.route('/stock/<id_stock>', methods=['DELETE'])
def delete_stock_by_id(id_stock):
    get_stock = Stock.query.get(id_stock)
    if not get_stock:
        return make_response({'error': 'item not found'}, 404)
    try:
        db.session.delete(get_stock)
        db.session.commit()
        return make_response({'item': 'removed'}, 200)
    except Exception as e:
        print(e)
        return make_response({'Error': "Item can't be deleted"}, 405)

# stock UPDATE


@app.route('/stock/edit/<id_stock>', methods=['PUT'])
def update_stock_by_id(id_stock):
    data = request.get_json()
    get_stockById = Stock.query.get(id_stock)
    if not get_stockById:
        return make_response({'error': 'item not found'}, 404)
    if data.get('name_crystal'):
        get_stockById.name_crystal = data['name_crystal']
    if data.get('quantity'):
        get_stockById.quantity = data['quantity']
    db.session.add(get_stockById)
    db.session.commit()
    stock_schema = StockSchema()
    item = stock_schema.dump(get_stockById)
    return make_response(jsonify(item))

# CLIENT

# client model / schema


class Client(db.Model):
    __tablename__ = "client"
    id_client = db.Column(db.Integer, primary_key=True)
    name_client = db.Column(db.String(60), nullable=False)
    __mapper_args__ = {
        'polymorphic_identity': 'client'
    }

    def __init__(self, name_client):
        self.name_client = name_client


class ClientSchema(ma.Schema):
    id_client = fields.Integer(dump_only=True)
    name_client = fields.String(required=True)

# client READ


@app.route('/client', methods=['GET'])
def client():
    # get_client = Client.query.all()
    get_client = db.session.query(Client).all()
    client_schema = ClientSchema(many=True)
    client = client_schema.dump(get_client)
    return make_response(jsonify(client), 200)

# client READ by id


@app.route('/client/<id_client>', methods=['GET'])
def get_client_by_id(id_client):
    get_clientById = Client.query.get(id_client)
    if not get_clientById:
        return make_response({'error': 'client not found'}, 404)
    client_schema = ClientSchema()
    idByClient = client_schema.dump(get_clientById)
    return make_response(jsonify(idByClient), 200)

# client CREATE


@app.route('/newclient', methods=['POST'])  # ERROR si el cliente ya existe
def create_client():
    data = request.get_json()
    findclient = Client.query.filter_by(
        name_client=data['name_client']).first()
    if findclient:
        return make_response(jsonify({"Error": "The client already exists"}), 400)
    if not findclient:
        client_schema = ClientSchema()
        new_client = Client(
            name_client=data['name_client'],
        )
        db.session.add(new_client)
        db.session.commit()
        result = client_schema.dump(new_client)
        return make_response(jsonify({"client": result}), 200)

# client DELETE


@app.route('/client/<id_client>', methods=['DELETE'])
def delete_client_by_id(id_client):
    get_id_client = Client.query.get(id_client)
    if not get_id_client:
        return make_response({'error': 'client not found'}, 404)
    try:
        db.session.delete(get_id_client)
        db.session.commit()
        return make_response({'client': 'removed'}, 200)
    except Exception:
        return make_response({'Error': "Client can't be deleted"}, 405)


# client UPDATE

@app.route('/client/edit/<id_client>', methods=['PUT'])
def update_client_by_id(id_client):
    data = request.get_json()
    get_clientById = Client.query.get(id_client)
    if not get_clientById:
        return make_response({'error': 'item not found'}, 404)
    if data.get('name_client'):
        get_clientById.name_client = data['name_client']
    db.session.add(get_clientById)
    db.session.commit()
    client_schema = ClientSchema()
    client_id = client_schema.dump(get_clientById)
    return make_response(jsonify(client_id), 200)

# ORDERS

# Orders models / schema


class Orders(db.Model):
    __tablename__ = "orders"
    id_order = db.Column('id_order', db.Integer, primary_key=True)
    id_stock = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    id_client = db.Column(db.Integer)
    time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    name_client = db.Column(db.String(60))
    name_crystal = db.Column(db.String(60))


def __init__(self, quantity, name_client, name_crystal, id_client, id_order, id_stock):
    self.id_order = id_order
    self.id_stock = id_stock
    self.id_client = id_client
    self.time = time
    self.name_client = name_client
    self.name_crystal = name_crystal
    self.quantity = quantity


class OrdersSchema(ma.Schema):
    id_order = fields.Integer()
    id_stock = fields.Integer()
    quantity = fields.Integer()
    id_client = fields.Integer()
    time = fields.DateTime()
    name_crystal = fields.String()
    name_client = fields.String()


# Orders CREATE


@app.route('/neworder', methods=['POST'])
def create_order():
    data = request.get_json()
    print(data)
    find_name_client = Client.query.filter_by(
        name_client=data['name_client']).first()
    if not find_name_client:
        return make_response(jsonify({"Error": "Client not found"}), 404)
    find_name_crystal = Stock.query.filter_by(
        name_crystal=data['name_crystal']).first()
    if not find_name_crystal:
        return make_response(jsonify({"Error": "Crystal not found"}), 404)
    if int(data['quantity']) > find_name_crystal.quantity:
        return make_response(jsonify({"Error": "Quantity not available"}), 400)
    new_order = Orders(
        quantity=data['quantity'],
        id_stock=find_name_crystal.id_stock,
        id_client=find_name_client.id_client,
        name_crystal=data['name_crystal'],
        name_client=data['name_client']
    )
    db.session.add(new_order)
    find_name_crystal.quantity = find_name_crystal.quantity - int(data['quantity'])
    print(find_name_crystal.quantity)
    db.session.add(find_name_crystal)
    db.session.commit()
    orders_schema = OrdersSchema()
    attached = orders_schema.dump(new_order)
    return make_response(jsonify(attached), 200)

@app.route('/ordersjoin', methods=['GET'])
def get_join():
    join = db.session.query(
    Orders.quantity, 
    Stock.name_crystal, 
    Client.name_client, 
    Orders.id_stock, 
    Orders.id_client, 
    Orders.id_order, 
    Orders.time).filter(
        Orders.id_stock == Stock.id_stock,
        Orders.id_client == Client.id_client).all()
    orders_schema = OrdersSchema(many=True)
    ordersjoin = orders_schema.dump(join)
    return make_response(jsonify(ordersjoin), 200)

@app.route('/ordersjoin/<id_order>', methods=['GET'])
def get_order_by_id(id_order):
    get_orderById = Orders.query.get(id_order)
    if not get_orderById:
        return make_response({'error': 'order not found'}, 404)
    orders_schema = OrdersSchema()
    idByOrder = orders_schema.dump(get_orderById)
    return make_response(jsonify(idByOrder), 200)

@app.route('/ordersjoin/<id_order>', methods=['DELETE'])
def delete_order_by_id(id_order):
    get_id_order = Orders.query.get(id_order)
    if not get_id_order:
        return make_response({'error': 'order not found'}, 404)
    try:
        db.session.delete(get_id_order)
        db.session.commit()
        return make_response({'order': 'removed'}, 200)
    except Exception:
        return make_response({'Error': "Order can't be deleted"}, 405)
