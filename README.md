# Clinic Management System

A backend service for managing clinic appointments, doctors, and patients using NestJS, Postgres and TypeORM.

## Table of Contents

- [Installation](#installation)
- [Features](#Features)
- [Requirements](#requirements)
- [Example Responses](#example-responses)
- [API Endpoints](#api-endpoints)
  - [Patients](#patients)
    - Create Patient
    - Update Patient
    - Get Patient
    - Delete Patient
  - [Doctors](#doctors)
    - Create Doctor
    - Update Doctor
    - Delete Doctor
  - [Appointments](#appointments)
    - Create Appointment
    - Update Appointment
    - List Appointments for a Doctor on a particular day
    - Find Available Time Slots for a Doctor on a particular doctor

## Installation

Clone the repository:

```bash
git clone [https://github.com/BatukeshwarVats/clinic.git]
cd clinic
```

Create .env file

```bash
DATABASE_HOST=DB_IP_ADDRESS
DATABASE_PORT=DB_PORT_NUMBER
DATABASE_USERNAME=DB_USER_NAME
DATABASE_PASSWORD=YOUR_PASSWORD
DATABASE_NAME=clinic
```

RUN

```bash
npm install
npm run start:dev
```

## Features

- Manage patients
- Manage doctors
- Schedule, update, and list appointments
- Check available time slots for doctors

## Requirements

- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL

## API's Sample response

DOCTOR

```bash
Create Doctor
    REQUEST:
        curl --location 'http://127.0.0.1:3000/doctor/' \
        --header 'Content-Type: application/json' \
        --data '{
            "name": "Doctor 4",
            "department":"Cardiology",
            "contactDetails":"details7",
            "availability":"True"
    }'

    RESPONSE:
        {
            "name": "Doctor 4",
            "department": "Cardiology",
            "contactDetails": "details7",
            "availability": True,
            "id": "d26601e9-3c2b-4700-a6bd-7b241ba3477e"
        }

Update Doctor
    REQUEST:
        curl --location --request PATCH 'http://127.0.0.1:3000/doctor/d26601e9-3c2b-4700-a6bd-7b241ba3477e' \
        --header 'Content-Type: application/json' \
        --data '{
            "name": "Doctor 2",
            "department":"Dermatology",
            "contactDetails":"details29",
            "availability":"true"
    }'
    RESPONSE:
        {
            "id": "d26601e9-3c2b-4700-a6bd-7b241ba3477e",
            "name": "Doctor 2",
            "department": "Dermatology",
            "contactDetails": "details29",
            "availability": false
        }
Delete Doctor
    REQUEST:
        curl --location --request DELETE 'http://127.0.0.1:3000/doctor/e1417984-a999-4f5e-aef1-611f5538fd4c' \
        --data ''
    RESPONSE:
        statusCode:200
```

PATIENT

```bash
Create Patient
    REQUEST:
        curl --location 'http://127.0.0.1:3000/patient/' \
        --header 'Content-Type: application/json' \
        --data '{
            "name": "Patient 2",
            "dob":"12-12-12",
            "contactDetails":"7898ss8"
        }'

    RESPONSE:
        {
            "name": "Patient 2",
            "dob": "12-12-12",
            "contactDetails": "7898ss8",
            "id": "edb8a024-22c3-4f59-aa42-bb6b91db0668"
        }

Update Patient
    REQUEST:
        curl --location --request PATCH 'http://127.0.0.1:3000/patient/edb8a024-22c3-4f59-aa42-bb6b91db0668' \
        --header 'Content-Type: application/json' \
        --data '{
            "name": "Doctor 3",
            "contactDetails":"details3sdd"
        }'
    RESPONSE:
        {
            "id": "edb8a024-22c3-4f59-aa42-bb6b91db0668",
            "name": "Doctor 3",
            "dob": "2012-12-11T18:30:00.000Z",
            "contactDetails": "details3sdd"
        }

Delete Patient
    REQUEST:
        curl --location --request DELETE 'http://127.0.0.1:3000/patient/182b5859-ece6-4a86-a282-2c472a335e82' \
        --data ''
    RESPONSE:
        statusCode:200


Get Patient
    REQUEST:
        curl --location 'http://127.0.0.1:3000/patient/edb8a024-22c3-4f59-aa42-bb6b91db0668' \
        --data ''
    RESPONSE:
        {
            "id": "edb8a024-22c3-4f59-aa42-bb6b91db0668",
            "name": "Doctor 3",
            "dob": "2012-12-11T18:30:00.000Z",
            "contactDetails": "details3sdd"
        }
```

APPOINTMENT

```bash
Create Appointment
    REQUEST:
        curl --location 'http://127.0.0.1:3000/appointment/' \
        --header 'Content-Type: application/json' \
        --data '{
            "patientId": "b96c2204-1064-4fc2-b919-d21766951290",
            "doctorId": "7b8c26b0-9279-4161-89c9-f9c05c3a625f",
            "status": "Scheduled",
            "date": "2024-06-01T10:00:00Z",
            "slot": 16
        }'

    RESPONSE:
        {
            "date": "2024-06-01T10:00:00.000Z",
            "slot": 16,
            "status": "Scheduled",
            "patient": {
                "id": "b96c2204-1064-4fc2-b919-d21766951290",
                "name": "Patient 1",
                "dob": "2012-12-11T18:30:00.000Z",
                "contactDetails": "789"
            },
            "doctor": {
                "id": "7b8c26b0-9279-4161-89c9-f9c05c3a625f",
                "name": "Doctor 2",
                "department": "Dermatology",
                "contactDetails": "details2",
                "availability": true
            },
            "id": "11c6ba10-e44d-47ce-8406-943c56091480"
        }

Update Appointment
    REQUEST:
        curl --location --request PATCH 'http://127.0.0.1:3000/appointment/6f3c5f8a-bd18-4d16-9e74-5a0f4c970d97' \
        --header 'Content-Type: application/json' \
        --data '{
            "status":"Cancelled"
        }'
    RESPONSE:
        {
            "id": "6f3c5f8a-bd18-4d16-9e74-5a0f4c970d97",
            "date": "2024-06-01T10:00:00.000Z",
            "slot": 15,
            "status": "Cancelled"
        }

GET Available Slots for doctor on a Day
    REQUEST:
        curl --location 'http://127.0.0.1:3000/appointment/doctor/7b8c26b0-9279-4161-89c9-f9c05c3a625f/available-slots?date=2024-06-01T10%3A00%3A00.000Z' \
        --data ''
    RESPONSE:
        [
            "0:00 - 1:00",
            "1:00 - 2:00",
            "2:00 - 3:00",
            "3:00 - 4:00",
            "4:00 - 5:00",
            "5:00 - 6:00",
            "6:00 - 7:00",
            "7:00 - 8:00",
            "8:00 - 9:00",
            "9:00 - 10:00",
            "10:00 - 11:00",
            "11:00 - 12:00",
            "17:00 - 18:00",
            "18:00 - 19:00",
            "19:00 - 20:00",
            "20:00 - 21:00",
            "21:00 - 22:00",
            "22:00 - 23:00",
            "23:00 - 24:00"
        ]

GET Appointment for doctor on a Day
    REQUEST:
        curl --location 'http://127.0.0.1:3000/appointment/doctor/7b8c26b0-9279-4161-89c9-f9c05c3a625f?date=2024-06-01T10%3A00%3A00.000Z' \
        --data ''
    RESPONSE:
        [
            {
                "id": "bda4a1e4-afff-4a96-9312-dd3129622c23",
                "date": "2024-06-01T10:00:00.000Z",
                "slot": 12,
                "status": "Scheduled"
            },
            {
                "id": "2143dadc-e9d6-4834-8966-c838d67d8206",
                "date": "2024-06-01T10:00:00.000Z",
                "slot": 13,
                "status": "Scheduled"
            },
            {
                "id": "0eca66a0-9d87-4f61-84b2-518c8fc40647",
                "date": "2024-06-01T10:00:00.000Z",
                "slot": 14,
                "status": "Scheduled"
            },
            {
                "id": "11c6ba10-e44d-47ce-8406-943c56091480",
                "date": "2024-06-01T10:00:00.000Z",
                "slot": 16,
                "status": "Scheduled"
            },
            {
                "id": "6f3c5f8a-bd18-4d16-9e74-5a0f4c970d97",
                "date": "2024-06-01T10:00:00.000Z",
                "slot": 15,
                "status": "Cancelled"
            }
        ]
```

## API Endpoints

Import the postman collection from repo.It has all the sample requests.
