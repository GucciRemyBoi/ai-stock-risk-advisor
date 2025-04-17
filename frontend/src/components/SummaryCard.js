import React, { useState } from 'react';

const SummaryCard = () => {
    const [stockTicker, setStockTicker] = useState('');
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);

    // Handle stock ticker input change
    const handleInputChange = (event) => {
        setStockTicker(event.target.value);
    };

    // Fetch website content summary based on stock ticker
    const handleFetchSummary = async () => {
        if (!stockTicker) {
            alert('Please enter a stock ticker!');
            return;
        }

        // Construct the URL for the API request based on stock ticker
        const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${stockTicker}&apikey=2JOGGRYNTZO5D3T4`;

        try {
            // Make the GET request to FastAPI, passing the stock ticker as part of the URL query
            const response = await fetch(`http://127.0.0.1:8000/fetch-website/?url=${encodeURIComponent(url)}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            // Handle the response and display the summary or error
            if (data.error) {
                setError(data.error);
                setSummary(null);
            } else {
                setSummary(data.preview); // Display the preview of the website content
                setError(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching the data.');
            setSummary(null);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">AI Summary:</h3>

            {/* Input for stock ticker */}
            <input
                type="text"
                placeholder="Enter Stock Ticker (e.g., AAPL)"
                value={stockTicker}
                onChange={handleInputChange}
                className="border rounded p-2 mb-2 w-full"
            />

            {/* Button to fetch summary */}
            <button
                onClick={handleFetchSummary}
                className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
            >
                Get Website Summary
            </button>

            {/* Show error message if any */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Show AI summary or loading state */}
            {summary ? (
                <p className="text-sm text-gray-600 mt-4">{summary}</p>
            ) : (
                !error && <p className="text-sm text-gray-600 mt-4">Enter a stock ticker to get the summary.</p>
            )}
        </div>
    );
};

export default SummaryCard;
