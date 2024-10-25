Weather Dashboard
This project is a Weather Dashboard that allows users to get real-time weather forecasts for any city. The app displays weather data, visualizes it with interactive charts, and provides a simple chatbot interface to answer user queries.
Features:
•	City Weather Search: Users can search for a city to get a 5-day weather forecast.
•	Real-time Data: Fetches weather data using the OpenWeather API.
•	Weather Display: Shows current weather conditions like temperature, humidity, and wind speed.
•	Interactive Charts: Includes a vertical bar chart, doughnut chart, and line chart to display temperature trends and weather conditions.
•	Forecast Table: Displays the 5-day weather forecast in a table format.
•	Chatbot: Users can ask the chatbot about the weather in different cities or general queries.
Technologies Used:
•	HTML: Structure of the weather dashboard.
•	CSS: Styling for the layout, sidebar, and weather display.
•	JavaScript: Logic for fetching weather data, displaying it, and rendering charts.
•	Chart.js: Used to generate interactive charts for visualizing weather data.
•	OpenWeather API: Fetches real-time weather data.
•	Gemini API: (Placeholder in code) for handling general chatbot queries.
Project Structure:
	index.html          # Main HTML file for the website
	tables.html         # Separate HTML file for displaying weather tables
	app.js              # Main JavaScript file that handles API calls, charts, and chatbot logic
	style.css           # CSS file that styles the layout and components
	logo.png            # Logo of the weather app
	user-profile.png    # Placeholder for the user profile image
	cloudy.jpg          # Weather-related background images (for different weather conditions)
How to Use:
1.	Search for a City: Enter the name of a city in the search bar and click on the "Get Weather" button.
2.	View Weather Data: The weather display will update to show the current weather conditions, and charts will visualize the temperature trends.
3.	Check the Forecast: A table below the weather display shows the 5-day forecast with dates, temperatures, and weather conditions.
4.	Use the Chatbot: You can ask questions in the chatbot. If you ask about the weather, specify the city (e.g., "What's the weather in London?").
API Integration:
OpenWeather API
This project uses the OpenWeather API to fetch the 5-day weather forecast for a city. The fetched data includes:
•	Temperature (in °C)
•	Weather conditions (clear, cloudy, rainy, etc.)
•	Humidity levels
•	Wind speed
To use the API, you need to sign up on OpenWeather and get an API key. Update the apiKey variable in app.js with your own key.
Gemini API (Optional)
For chatbot responses, the Gemini API is used as a placeholder to fetch responses to user queries. You can replace this with any AI chatbot or natural language processing API that fits your needs.
Charts and Visualizations
•	Bar Chart: Displays the forecasted temperature for the next 5 days.
•	Doughnut Chart: Visualizes the occurrence of different weather conditions (cloudy, rainy, clear).
•	Line Chart: Shows a line graph of the temperature trends over 5 days.
These charts are created using the Chart.js library.
Customization
You can customize the following aspects:
•	Weather Backgrounds: You can update the background images for different weather conditions (cloudy, rainy, clear) by replacing the respective images (cloudy.jpg, rainy.jpg, etc.).
•	Chatbot: Modify the handleGeneralQuery function in app.js to integrate a different chatbot service.
License:
Feel free to use, modify, and distribute it.

