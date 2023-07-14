# Binance Spot Order Book React Application

This repository contains a practice project that serves as an exercise to develop a React application. The application interacts with the Binance Spot API to retrieve trading pair data and order book information for the selected pair. It provides a live display of the data using real-time updates.

## Installation

To install and run this application locally, follow these steps:

1. Clone this repository to your local machine using the following command:
```sh
git clone https://github.com/your-username/your-repo.git
```

2. Navigate to the project directory:
```sh
cd your-repo
```

3. Install the required dependencies by running the following command:
```sh
npm install
```

## Running

Once you have installed the necessary dependencies, you can start the application by running the following command:

```sh
npm start
```

This will start the development server and the application will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.
The page will reload when you make changes. You may also see any lint errors in the console.

## Usage

Once the application is running, you can use it to retrieve trading pair data and order book information from the Binance Spot API. The application will display the data in real-time, providing an interactive and dynamic experience.

Feel free to explore the functionality and customize the application to suit your needs. This project serves as a practice exercise and can be extended or modified as desired.

## Challanges Faced
1. Structure of the Trade Pair API Response: Found it in docs ([here](https://binance-docs.github.io/apidocs/spot/en/#exchange-information)) and verified it by curl.
2. The Trade pairs are about 2000 count which lead to face difficulty in finding an option so used a dropdown with search(react-select).
3. The API should be called initially only once at the start, achieved it by using useEffect hook. 
4. For the API Error handling, used Bootstrap Alert Component.
5. Connecting to Web Sockets, found it in docs ([here](https://binance-docs.github.io/apidocs/spot/en/#how-to-manage-a-local-order-book-correctly)).
6. Order Book UI are React-Bootstrap Components.
7. The Main Challange was to close the old connection and opening the new web socket connection on change of trade pair selection, since the data from old connection was interrrupting the current order book display.

## Contributing

If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Contributions are welcome and greatly appreciated.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, or distribute the code as per the terms of this license.