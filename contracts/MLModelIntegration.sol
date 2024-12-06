// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MLModelIntegration {
    struct PredictionRequest {
        address requester;
        string inputData;
        uint256 requestId;
        bool completed;
        string result;
    }

    mapping(uint256 => PredictionRequest) public predictions;
    uint256 public nextRequestId;

    event PredictionRequested(uint256 indexed requestId, address indexed requester, string inputData);
    event PredictionCompleted(uint256 indexed requestId, string result);

    // Function to request a prediction from the ML model
    function requestPrediction(string memory inputData) public {
        require(bytes(inputData).length > 0, "Input data cannot be empty");

        uint256 requestId = nextRequestId++;
        predictions[requestId] = PredictionRequest({
            requester: msg.sender,
            inputData: inputData,
            requestId: requestId,
            completed: false,
            result: ""
        });

        emit PredictionRequested(requestId, msg.sender, inputData);
    }

    // Function to simulate the completion of a prediction
    // In a real-world scenario, this would be called by an off-chain service
    function completePrediction(uint256 requestId, string memory result) public {
        require(requestId < nextRequestId, "Invalid request ID");
        require(!predictions[requestId].completed, "Prediction already completed");

        predictions[requestId].completed = true;
        predictions[requestId].result = result;

        emit PredictionCompleted(requestId, result);
    }

    // Function to retrieve the prediction result
    function getPredictionResult(uint256 requestId) public view returns (string memory) {
        require(requestId < nextRequestId, "Invalid request ID");
        require(predictions[requestId].completed, "Prediction not completed yet");

        return predictions[requestId].result;
    }
}
