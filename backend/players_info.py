import pickle 
from global_functions import * 

def create_players(): 
    # Initialize everyone's scores to 0 
    players = {}
    all_numbers = get_all_numbers()
    for player in all_numbers:
        players[str(player)] = 0 
    with open("players.pickle", 'wb') as db:
        pickle.dump(players, db)
def update_player(phone_number): 
    with open("players.pickle", 'rb') as db:
        players = pickle.load(db)

    players[str(phone_number)] += 10 

    with open("players.pickle", 'wb') as db:
        pickle.dump(players, db)

def get_all_players_score():
    with open("players.pickle", 'rb') as db:
        players = pickle.load(db) 

    return players