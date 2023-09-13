# -*- coding: utf-8 -*- 

import json
import random
import datetime

FLIGHT_COUNT = 1000
MAX_DATE = 50

airports = [
    {
        "code": "IST",
        "name": "İstanbul Havalimanı"
    },
    {
        "code": "ESB",
        "name": "Ankara Esenboğa Havalimanı"
    },
    {
        "code": "ADB",
        "name": "İzmir Adnan Menderes Havalimanı"
    },
    {
        "code": "BJV",
        "name": "Bodrum Milas-Bodrum Havalimanı"
    },
]

flights = []

for _ in range(FLIGHT_COUNT):
    from_idx = random.randrange(len(airports))
    to_idx = random.randrange(len(airports))

    while to_idx == from_idx:
        to_idx = random.randrange(len(airports))

    flights.append({
        "from": airports[from_idx]["code"],
        "to": airports[to_idx]["code"],
        "date": (datetime.date.today() + datetime.timedelta(days=random.randrange(MAX_DATE))).isoformat(),
        "time": f"{random.randrange(23)}:{random.choice(['00', '15', '30', '45'])}"
    })

data = {
    "airports": airports,
    "flights": flights
}

with open("mock_data.json", "w+") as f:
    json.dump(data, f, ensure_ascii=False)


