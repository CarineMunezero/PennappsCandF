from twilio.rest import Client

from global_functions import *  
import random 
import daily_challenge 
from players_info import * 
import json 

OPENAI_KEY = ""
METAPHOR_TOKEN = ""
SID = ""
AUTH_TOKEN = ""
NUMBER = ''



client = Client(account_sid, auth_token)

msg, index = daily_challenge.load("data.pickle") 

from flask import Flask, request

app = Flask(__name__)
message = client.messages.create(
    body = msg,
    from_ = '+18559593981',
    to = '+14752879371'
)
@app.route('/powerank', methods=['GET'])
def return_rankings(): 
    with open("players.pickle", "rb") as pk: 
        text = pickle.load(pk) 
    # convert text to json 
    data = json.dumps(text) 

    return data   

@app.route('/webhooks', methods=['POST'])
def webhook():
    # print(request.form)
    user_response = request.form['Body']
    number = request.form["To"]
    if(len(user_response) != 1 or ord(user_response.lower()) > 102):
        print(user_response.isnumeric)
        message = client.messages.create(
                body='Please select among the letter options on the screen',
                from_='+18559593981',
                to='+14752879371',
                status_callback='https://5677-2607-f470-34-2101-af65-57c-8243-9691.ngrok-free.app/'
            )
        return '', 200
    if not user_sent_message_today(number):
        #Make sure each user only replies once per day to the  challenge
        if (str(ord(user_response.lower()) - 97)) == str(index):
            print(user_response, " ", ord(user_response.lower()) - 97) 
            congratulation_message = "Congratulations! You chose the correct answer!"
            message = client.messages.create(
                body=congratulation_message,
                from_='+18559593981',
                to='+14752879371',
                status_callback='https://5677-2607-f470-34-2101-af65-57c-8243-9691.ngrok-free.app/'
            )
            import os 
            if(os.path.exists("players.pickle")):
                update_player(number) 
            else:
                create_players()
                update_player(number)
        
        
        else: 
            print(user_response, " ", ord(user_response.lower()) - 97, " ", index) 
            congratulation_message = f"Sorry, that was the wrong answer. The right answer is {chr(97 + index)}. Better Luck Tomorrow!"
            message = client.messages.create(
                body=congratulation_message,
                from_='+18559593981',
                to='+14752879371'
            )
    else: 
        congratulation_message = "You cannot reply more than once!"
        message = client.messages.create(
                body=congratulation_message,
                from_='+18559593981',
                to='+14752879371'
            )
    return '', 200

# @app.route('/', methods=['POST'])
# def other_webhook():
#     # print(request.form)
#     user_response = request.form['Body']
#     number = request.form["To"]
#     if not user_sent_message_today(number):
#         #Make sure each user only replies once per day to the challenge
#         if (ord(user_response) - 97) == str(index):
#             congratulation_message = "Congratulations! You chose the correct answer!"
#             message = client.messages.create(
#                 body=congratulation_message,
#                 from_='+18559593981',
#                 to='+14752879371',
#                 status_callback='https://5677-2607-f470-34-2101-af65-57c-8243-9691.ngrok-free.app/'
#             )
#         else: 
#             congratulation_message = f"Sorry, that was the wrong answer. The right answer is {index}. Better Luck Tomorrow!"
#             message = client.messages.create(
#                 body=congratulation_message,
#                 from_='+18559593981',
#                 to='+14752879371'
#             )
#     else: 
#         congratulation_message = "You cannot reply more than once!"
#         message = client.messages.create(
#                 body=congratulation_message,
#                 from_='+18559593981',
#                 to='+14752879371'
#             )
#     return '', 200

if __name__ == '__main__':
    app.run(host= '0.0.0.0', port=8080)



# # message = client.messages('SM36a1bc37e9da8bacff2ef83a2db8d667').fetch()

# print(message.body)
# messages = client.messages.list(limit=20)

# for record in messages:
#     print(record)`