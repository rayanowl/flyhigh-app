
const airportsData = [
    { code: "IST", name: "İstanbul Airport" },
    { code: "ESB", name: "Ankara Esenboğa Airport" },
    { code: "ADB", name: "İzmir Adnan Menderes Airport" },
    { code: "BJV", name: "Bodrum Milas-Bodrum Airport" },

];

const flightsData = [
    {
        departureDate: "2023-09-13",
        departureTime: "08:00",
        arrivalTime: "10:30",
        price: 250,
        departureAirportCode: "IST",
        arrivalAirportCode: "ESB"
    },
    {
        departureDate: "2023-09-13",
        departureTime: "10:30",
        arrivalTime: "12:00",
        price: 180,
        departureAirportCode: "ESB",
        arrivalAirportCode: "IST"
    },
    {
        departureDate: "2023-09-15",
        departureTime: "08:00",
        arrivalTime: "10:30",
        price: 250,
        departureAirportCode: "IST",
        arrivalAirportCode: "ESB"
    },
    {
        departureDate: "2023-09-15",
        departureTime: "10:00",
        arrivalTime: "12:30",
        price: 250,
        departureAirportCode: "IST",
        arrivalAirportCode: "BJV"
    },
    {
        departureDate: "2023-09-15",
        departureTime: "09:15",
        arrivalTime: "11:45",
        price: 300,
        departureAirportCode: "ADB",
        arrivalAirportCode: "BJV"
    },
    {
        departureDate: "2023-09-16",
        departureTime: "14:00",
        arrivalTime: "16:30",
        price: 220,
        departureAirportCode: "BJV",
        arrivalAirportCode: "ADB"
    },
    {
        departureDate: "2023-09-17",
        departureTime: "11:30",
        arrivalTime: "13:15",
        price: 270,
        departureAirportCode: "IST",
        arrivalAirportCode: "ESB"
    },
    {
        departureDate: "2023-09-17",
        departureTime: "15:45",
        arrivalTime: "17:15",
        price: 190,
        departureAirportCode: "ESB",
        arrivalAirportCode: "IST"
    },
    {
        departureDate: "2023-09-18",
        departureTime: "07:30",
        arrivalTime: "09:00",
        price: 320,
        departureAirportCode: "IST",
        arrivalAirportCode: "ADB"
    },
    {
        departureDate: "2023-09-20",
        departureTime: "14:30",
        arrivalTime: "16:00",
        price: 280,
        departureAirportCode: "BJV",
        arrivalAirportCode: "ESB"
    },
    {
        departureDate: "2023-09-20",
        departureTime: "08:45",
        arrivalTime: "10:15",
        price: 210,
        departureAirportCode: "ESB",
        arrivalAirportCode: "IST"
    },
];


function showAirports(inputType) {
    const airportList = document.getElementById(`${inputType}AirportList`);
    airportList.innerHTML = "";

    airportsData.forEach(airport => {
        const listItem = document.createElement("li");
        listItem.textContent = `${airport.code} - ${airport.name}`;
        listItem.addEventListener("click", function() {
            document.getElementById(`${inputType}Airport`).value = airport.code;
            airportList.innerHTML = "";
        });
        airportList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const flightSearchForm = document.getElementById("flightSearchForm");
    const loadingIndicator = document.getElementById("loadingIndicator");
    const flightList = document.getElementById("flightList");

    flightSearchForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const departureAirportCode = document.getElementById("departureAirport").value;
        const arrivalAirportCode = document.getElementById("arrivalAirport").value;
        const departureDate = document.getElementById("departureDate").value;
        
        try {
            loadingIndicator.style.display = "block";
            displayFlightResults(departureAirportCode,arrivalAirportCode,departureDate);
        } catch (error) {
            flightList.innerHTML = "<p>No flights available for the selected dates and airports.</p>";
        } finally {
            loadingIndicator.style.display = "none";
        }
    });

    async function fetchFlights(departureAirportCode, arrivalAirportCode, departureDate) {

        console.log(departureDate);
        console.log(departureAirportCode);
        console.log(arrivalAirportCode);

        const url = `https://flight-fare-search.p.rapidapi.com/v2/flights/?from=${departureAirportCode}&to=${arrivalAirportCode}&date=${departureDate}&adult=1&type=economy&currency=USD`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c1edc253efmshd8590bd5a74f453p1a823cjsnecd4097e6b67',
                'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url,options);

            if (!response.ok) {
                console.log(response);

                throw new Error(`API'den veri alınamadı. Hata Kodu: ${response.status}`);
            }
            console.log(response);
            const result = await response.text();
	        console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    function displayFlightResults(departureAirportCode, arrivalAirportCode, departureDate) {
        const flightList = document.getElementById("flightList");
        const loadingIndicator = document.getElementById("loadingIndicator"); // Get the loading animation element
        flightList.innerHTML = "";
        const departureDateEnd = document.getElementById("returnDate");
        const oneWay = document.getElementById("oneWay");
    
        // Hide the flightList and show the loading animation
        flightList.style.display = "none";
        loadingIndicator.style.display = "block";
    
        // Remove the loading animation after a delay (you can adjust the delay as needed)
        setTimeout(() => {
            loadingIndicator.style.display = "none";
            flightList.style.display = "block";
        }, 2000); // Adjust the delay as needed (e.g., 2000 milliseconds)
    
        // Create a flag to check if any flights are found
        let flightsFound = false;
    
        if (oneWay.checked) {
            departureDateEnd.style.display ="none";
            flightsData.forEach(ucus => {
                const flightDate = ucus.departureDate;
                if (
                    flightDate >= departureDate &&
                    flightDate <= departureDateEnd &&
                    ucus.departureAirportCode === departureAirportCode &&
                    ucus.arrivalAirportCode === arrivalAirportCode
                ) {
                    const flightItem = createFlightItem(ucus);
                    flightList.appendChild(flightItem);
                    flightsFound = true; // Set the flag to true if a flight is found
                }
            });
        } else { // Gidiş dönüş
            flightsData.forEach(ucus => {
                departureDateEnd.style.display ="block";
                const flightDate = ucus.departureDate;
                if (
                    flightDate >= departureDate &&
                    flightDate <= departureDateEnd &&
                    ucus.departureAirportCode === departureAirportCode &&
                    ucus.arrivalAirportCode === arrivalAirportCode
                ) {
                    const flightItem = createFlightItem(ucus);
                    flightList.appendChild(flightItem);
                    flightsFound = true; // Set the flag to true if a flight is found
                }
            });
    
            // Check for return flights
            flightsData.forEach(ucus => {
                const flightDate = ucus.departureDate;
                if (
                    flightDate >= departureDate &&
                    flightDate <= departureDateEnd &&
                    ucus.departureAirportCode === arrivalAirportCode &&
                    ucus.arrivalAirportCode === departureAirportCode
                ) {
                    const flightItem = createFlightItem(ucus);
                    flightList.appendChild(flightItem);
                    flightsFound = true; // Set the flag to true if a flight is found
                }
            });
        }
    
        // If no flights were found, display a message
        if (!flightsFound) {
            const noFlightsMessage = document.createElement("p");
            noFlightsMessage.textContent = "No flights available for the selected dates and airports.";
            flightList.appendChild(noFlightsMessage);
        }
    }
    
    // Helper function to create a flight item
    function createFlightItem(ucus) {
        const flightItem = document.createElement("div");
        flightItem.classList.add("flight-item");
        flightItem.innerHTML = `
            <h3>Departure Date: ${ucus.departureDate}</h3>
            <p>Departure Time: ${ucus.departureTime}</p>
            <p>Arrival Time: ${ucus.arrivalTime}</p>
            <p>Price: ${ucus.price}</p>
            <p>Departure IATA: ${ucus.departureAirportCode}</p>
            <p>Arrival IATA: ${ucus.arrivalAirportCode}</p>
        `;
        return flightItem;
    }
    
            
    
    
    
});
