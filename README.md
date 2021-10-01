
# Getting Started Steps

- Need Docker version >= 20.10.8
- Run in terminal : 'docker-compose up --build -d'
- Access the web app on localhost:4000

## API Documentation : 

### Create Timer
```http
POST /api/v1/timers
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Optional**. Timer Task Name |
| `duration` | `integer` | **Optional**. Timer Duration in Seconds. Default = 1500 secs |
| `webhook_url` | `string` | **Optional**. Webhook url |
