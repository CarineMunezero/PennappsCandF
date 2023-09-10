from global_functions import * 
from daily_challenge import load 

def send_messages_to_everyone(text):
    all_numbers = get_all_numbers()
    msg = text
    for number in ['']:
    # Check if this user has sent us a text today: 
        # if not user_sent_message_today(number):
            # message_body = "Hello, this is a broadcast message."
            from_ = "" 
            to = number
            # print(to)
            send_message(msg, to, from_) 

