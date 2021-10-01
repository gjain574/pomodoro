
# Pomodoro Timer

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/19173627/135675962-ae9175cb-5a56-413c-a309-c008b5ef958a.png">

## What's Included ?

- API 
- React Interface
- Timer Scheduler ( marks timer as Completed + notify via webhook )

## Getting Started

- Need Docker version >= 20.10.8
- Run in terminal : 'docker-compose up --build -d'
- Access the web app on localhost:4000

## API Documentation

### Create Timer
```http
POST /api/v1/timers

{
    "name" : "Task 1",
    "duration" : 1000,
    "webhook_url" : ""
}

```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Optional**. Timer Task Name |
| `duration` | `integer` | **Optional**. Timer Duration in Seconds. Default = 1500 secs |
| `webhook_url` | `string` | **Optional**. Webhook url |

### Fetch Timer
```http
GET /api/v1/timers/:id
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | **Required**. Timer ID |

### Fetch Timers
```http
GET /api/v1/timers
```

### Update Timer
```http
PUT /api/v1/timers/:id

{
    "status" : "resumed"
}

```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | **Required**. Timer ID |
| `status` | `enum` | **Required**. Can be either 'resumed' or 'completed' |

### Delete Timer
```http
DELETE /api/v1/timers/:id
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | **Required**. Timer ID |




