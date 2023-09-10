from twilio.rest import Client

from global_functions import *  
import random 

account_sid = ""
auth_token = ""

def setup():
    client = Client(account_sid, auth_token)

    mapping = create_questions() 

    intro = "Welcome to Finance-Timer, here is today's question:\n"
    question = mapping["question"]
    answer = mapping["true_answer"] 
    false_answers = mapping["completion"] 
    all_answers = list(false_answers)
    all_answers.append(answer)
    all_answers_cpy = all_answers.copy()
    random.shuffle(all_answers)
    for i in range(len(all_answers)):
        all_answers[i] = chr(ord('a') + i) +')' +  all_answers[i]

    index = all_answers_cpy.index(answer) 
    # print(index)

    msg = intro + question  + '\n' + "Chose from these\n" + "\n".join(all_answers); 

    import pickle

    with open('data.pickle', 'wb') as file:
        pickle.dump((msg, index), file)

def load(textfile): 
        import pickle

        with open('data.pickle', 'rb') as file:
            msg, index = pickle.load(file)
        return msg, index 

if __name__ == "__main__":
    setup() 
