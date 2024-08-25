import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

class TransactionAnomalyDetector:
    def __init__(self, threshold=0.5):
        self.threshold = threshold
        self.model = IsolationForest(contamination=self.threshold)
        self.scaler = StandardScaler()

    def fit(self, X):
        self.model.fit(X)
        return self

    def predict(self, X):
        X_scaled = self.scaler.transform(X)
        predictions = self.model.predict(X_scaled)
        return predictions

    def evaluate(self, y_true, y_pred):
        accuracy = accuracy_score(y_true, y_pred)
        report = classification_report(y_true, y_pred)
        matrix = confusion_matrix(y_true, y_pred)
        return accuracy, report, matrix

    def detect_anomalies(self, transactions):
        transactions_df = pd.DataFrame(transactions)
        X = transactions_df.drop(['is_anomaly'], axis=1)
        y_pred = self.predict(X)
        anomalies = transactions_df[y_pred == -1]
        return anomalies

# Example usage
detector = TransactionAnomalyDetector(threshold=0.5)
transactions = [...];  # Load transactions data
detector.fit(transactions)
anomalies = detector.detect_anomalies(transactions)
print(anomalies)
