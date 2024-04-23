# Individual Project

# Endpoints

_Authentication_

- **POST /login**
- **POST /register**

_Field_

- **GET /fields**
- **GET /fields/:id**

_Booking_

- **GET /booking**
- **POST /booking/:id**
- **patch /booking/:id**


# POST /login

_Information_

This endpoint is used for user authentication, providing an access token upon successful login.

> ### **Request**

- **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

## Response

Response: (200 - OK)

```json
{
  "message": "login success",
  "token": "string"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Email is required"
}
"OR"
{
  "message": "Password is required"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Email/Password"
}
```

---

# POST /register

_Information_

This endpoint is used to register a new user.

> ### **Request**

- **Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response: (201 - Created)

```json
{
  "user": {
    "id": "number",
    "username": "string",
    "email": "string",
    "password": "string",
    "updatedAt": "date",
    "createdAt": "date"
  }
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Username Cannot be Empty"
}
```

```json
{
  "message": "Email cannot be empty"
}
"OR"
{
  "message": "Must be an Email format"
}
"OR"
{
  "message": "Email already exists"
}
```

```json
{
  "message": "Password cannot be empty"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

---

# GET /fields/:id

_Information_

This endpoint retrieves a specific mountain by ID.

> ### **Request**

- **Header:**
  - `Authentication`

## Response

Response: (200 - OK)

```json
{
  "id": "number",
  "name": "string",
  "price": "number",
  "imgUrl": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---