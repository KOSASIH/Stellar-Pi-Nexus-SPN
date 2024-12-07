import pytest
import numpy as np
from src.stabilizer.stabilizer import PiCoinStabilizer
from src.stabilizer.ai_predictor import PricePredictor
from src.stabilizer.blockchain_oracle import Oracle

class TestPiCoinStabilizer:
    @pytest.fixture
    def stabilizer(self):
        return PiCoinStabilizer(target_value=314.159)

    def test_initialization(self, stabilizer):
        assert stabilizer.target_value == 314.159
        assert stabilizer.quantum_stabilization_matrix is not None
        
    def test_quantum_matrix_generation(self, stabilizer):
        matrix = stabilizer.quantum_stabilization_matrix
        assert matrix.shape == (314, 314)
        assert np.isclose(np.linalg.det(matrix), 1.0, rtol=1e-3)

    def test_dynamic_price_adjustment(self, stabilizer):
        adjusted_price = stabilizer.dynamic_price_adjustment()
        assert isinstance(adjusted_price, (int, float))
        assert abs(adjusted_price - 314.159) < 10  # Reasonable deviation

    def test_implement_stabilization(self, stabilizer):
        stabilized_price = stabilizer.implement_stabilization()
        assert isinstance(stabilized_price, (int, float))
        assert abs(stabilized_price - 314.159) < 5  # Tight tolerance

class TestAIPredictor:
    @pytest.fixture
    def predictor(self):
        return PricePredictor()

    def test_model_creation(self, predictor):
        assert predictor.model is not None
        assert len(predictor.model.layers) > 0

    def test_price_deviation_prediction(self, predictor):
        deviation = predictor.predict_price_deviation()
        assert isinstance(deviation, np.ndarray)
        assert deviation.size > 0

class TestBlockchainOracle:
    @pytest.fixture
    def oracle(self):
        return Oracle()

    def test_price_retrieval(self, oracle):
        price = oracle.get_current_price()
        assert isinstance(price, (int, float))
        assert price > 0
