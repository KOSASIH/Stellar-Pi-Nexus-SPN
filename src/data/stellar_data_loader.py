import pandas as pd
import numpy as np
from stellar_sdk import Server, Asset, Account
from stellar_sdk.exceptions import NotFoundError

class StellarDataLoader:
    def __init__(self, horizon_url, network_passphrase):
        self.horizon_url = horizon_url
        self.network_passphrase = network_passphrase
        self.server = Server(horizon_url)

    def load_accounts(self, account_ids):
        accounts = []
        for account_id in account_ids:
            try:
                account = self.server.accounts().account_id(account_id).call()
                accounts.append(self._parse_account(account))
            except NotFoundError:
                print(f"Account {account_id} not found")
        return pd.DataFrame(accounts)

    def load_transactions(self, account_id, start_time, end_time):
        transactions = []
        cursor = None
        while True:
            try:
                if cursor:
                    transactions_response = self.server.transactions().for_account(account_id).cursor(cursor).call()
                else:
                    transactions_response = self.server.transactions().for_account(account_id).call()
                for transaction in transactions_response['_embedded']['records']:
                    transactions.append(self._parse_transaction(transaction))
                cursor = transactions_response['_links']['next']['href'].split('&cursor=')[1]
            except NotFoundError:
                break
        transactions_df = pd.DataFrame(transactions)
        transactions_df = transactions_df[(transactions_df['timestamp'] >= start_time) & (transactions_df['timestamp'] <= end_time)]
        return transactions_df

    def _parse_account(self, account):
        return {
            'account_id': account['id'],
            'balance': account['balances'][0]['balance'],
            'sequence_number': account['sequence_number']
        }

    def _parse_transaction(self, transaction):
        return {
            'transaction_id': transaction['id'],
            'from_account_id': transaction['source_account'],
            'to_account_id': transaction['destination_account'],
            'amount': transaction['amount'],
            'asset_code': transaction['asset_code'],
            'asset_issuer': transaction['asset_issuer'],
            'timestamp': transaction['created_at']
        }

# Example usage
loader = StellarDataLoader(horizon_url='https://horizon.stellar.org', network_passphrase='public')
account_ids = [...];  # List of account IDs
accounts_df = loader.load_accounts(account_ids)
print(accounts_df)

start_time = '2022-01-01T00:00:00Z'
end_time = '2022-01-31T23:59:59Z'
transactions_df = loader.load_transactions(account_id='GA...', start_time=start_time, end_time=end_time)
print(transactions_df)
