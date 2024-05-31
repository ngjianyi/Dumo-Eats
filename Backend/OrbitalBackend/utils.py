from pymongo import MongoClient

# connection_string = mongodb+srv://<username>:<password>@<atlas cluster>/<myFirstDatabase>?retryWrites=true&w=majority
connection_string = 'mongodb+srv://admin:orbitaldumoeats@dumoeats.iv9yl4q.mongodb.net/?retryWrites=true&w=majority&appName=DumoEats'
client = MongoClient(connection_string)
db = client['DumoEats']
# client = pymongo.MongoClient('mongodb+srv://username:password@HOSTNAME/DATABASE_NAME?authSource=admin&tls=true&tlsCAFile=<PATH_TO_CA_FILE>')

# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# uri = "mongodb+srv://admin:orbitaldumoeats@dumoeats.iv9yl4q.mongodb.net/?retryWrites=true&w=majority&appName=DumoEats"
# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))
# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)
