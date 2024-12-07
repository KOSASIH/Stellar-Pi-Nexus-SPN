import logging
import prometheus_client as prom

class StabilizerMonitoring:
    def __init__(self):
        # Prometheus metrics
        self.price_metric = prom.Gauge(
            'pi_coin_price', 
            'Real-time Pi Coin Price Stabilization Metric'
        )
        self.deviation_metric = prom.Gauge(
            'price_deviation', 
            'Price Deviation from Target'
        )
        
        # Logging configuration
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - Pi Coin Stabilizer - %(levelname)s: %(message)s'
        )
        self.logger = logging.getLogger('PiCoinStabilizer')

    def log_stabilization_event(self, current_price, target_price):
        deviation = abs(current_price - target_price)
        
        # Log event
        self.logger.info(f"Stabilization Event: Current={current_price}, Target={target_price}")
        
        # Update Prometheus metrics
        self.price_metric.set(current_price)
        self.deviation_metric.set(deviation)

    def alert_significant_deviation(self, deviation):
        if deviation > 5:  # Significant deviation threshold
            self.logger.warning(f"ALERT: Significant Price Deviation - {deviation}")
