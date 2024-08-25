import pandas as pd
import numpy as np
from pi_sdk import PiClient

class PiDataLoader:
    def __init__(self, pi_client):
        self.pi_client = pi_client

    def load_user_data(self, user_ids):
        users = []
        for user_id in user_ids:
            user = self.pi_client.get_user(user_id)
            users.append(self._parse_user(user))
        return pd.DataFrame(users)

    def load_transaction_data(self, start_time, end_time):
        transactions = []
        for transaction in self.pi_client.get_transactions(start_time, end_time):
            transactions.append(self._parse_transaction(transaction))
        return pd.DataFrame(transactions)

    def _parse_user(self, user):
        return {
            'user_id': user['id'],
            'username': user['username'],
            'balance': user['balance']
        }

    def _parse_transaction(self, transaction):
        return {
            'transaction_id': transaction['id'],
            'from_user_id': transaction['from_user_id'],
            'to_user_id': transaction['to_user_id'],
            'amount': transaction['amount'],
            'timestamp': transaction['timestamp']
        }

# Example usage
pi_client = PiClient(api_key='YOUR_API_KEY', api_secret='YOUR_API_SECRET')
loader = PiDataLoader(pi_client)
user_ids = [...];  # List of user IDs
users_df = loader.load_user_data(user_ids)
print(users_df)

start_time = '2022-01-01T00:00:00Z'
end_time = '2022-01-31T23:59:59Z'
transactions_df = loader.load_transaction_data(start_time, end_time)
print(transactions_df)
