[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15209820&assignment_repo_type=AssignmentRepo)

# P2-Challenge-2 (Client Side)

> Tuliskan API Docs kamu di sini

List of available endpoints:

GET /
GET /cuisines/:id/pub

POST /login
POST /addUser

GET /cuisines
POST /cuisinesAdd
PUT /cuisinesEdit/:id

GET /cuisines/:id

GET /category

PATCH /uploadImage/:id

1. GET /

Response (200 - OK)

[
{
"imgUrl": "https://cdn.antaranews.com/cache/1200x800/2021/02/15/salai.jpg",
"name": "Ikan Salai",
"description": "Ikan lais, gabus, patin atau baung yang diproses dengan cara pengasapan. Ikan ini memiliki rasa gurih dan sangat lezat."
},
{
"imgUrl": "https://awsimages.detik.net.id/community/media/visual/2021/08/30/resep-gulai-ayam-rumah-makan-padang_43.jpeg?w=1200",
"name": "Ayam Gulai",
"description": "Perpaduan daging ayam yang lembut dan kuah gulai yang nikma"
}
....
]

2. GET /cuisine/:id/pub

Request:

params:

{
"id": integer
}

Response (200 - OK)

{
"imgUrl": "https://awsimages.detik.net.id/community/media/visual/2021/08/30/resep-gulai-ayam-rumah-makan-padang_43.jpeg?w=1200",
"name": "Ayam Gulai",
"description": "Perpaduan daging ayam yang lembut dan kuah gulai yang nikma",
"price": Rp. 25000
"categoryId: "Gulai",
"authorId": "Admin"
}

3. POST /login

Request:

body:
{
"email": "string",
"password": "string"
}

Response (200 - OK)
{
"access_token": "string"
}

Response (400 - Bad Request)
{
"message": "Email is required"
}
OR
{
"message": "Password is required"
}

Response (401 - Unauthorized)
{
"message": "Invalid email/password"
}

4. POST /addUser

Request:

body:
{
"email": "string",
"password": "string"
}

Response (201 - Created)
{
"id": "integer",
"email": "string"
}

Response (400 - Bad Request)
{
"message": "Email is required"
}
OR
{
"message": "Invalid email format"
}
OR
{
"message": "Email must be unique"
}
OR
{
"message": "Password is required"
}

5. GET /cuisines

Request:

headers:
{
"Authorization": `Bearer ${access_token}`
}

Response (200- OK)
[
{
"imgUrl": "https://cdn.antaranews.com/cache/1200x800/2021/02/15/salai.jpg",
"name": "Ikan Salai",
"description": "Ikan lais, gabus, patin atau baung yang diproses dengan cara pengasapan. Ikan ini memiliki rasa gurih dan sangat lezat."
},
{
"imgUrl": "https://awsimages.detik.net.id/community/media/visual/2021/08/30/resep-gulai-ayam-rumah-makan-padang_43.jpeg?w=1200",
"name": "Ayam Gulai",
"description": "Perpaduan daging ayam yang lembut dan kuah gulai yang nikma"
}
....
]

6. POST /cuisinesAdd

Request:

headers:
{
"Authorization": `Bearer ${access_token}`
}

body:
{
"name": "Ikan Salai",
"description": "Ikan lais, gabus, patin atau baung yang diproses dengan cara pengasapan. Ikan ini memiliki rasa gurih dan sangat lezat.",
"price": 25000,
"categoryId": 3,
"authorId": 1
}

Response (201 - Created)

{
"id": 25,
"name": "Ikan Salai",
"description": "Ikan lais, gabus, patin atau baung yang diproses dengan cara pengasapan. Ikan ini memiliki rasa gurih dan sangat lezat.",
"price": 25000,
"categoryId": Bakar,
"authorId": Admin
}

7. PUT /cuisinesEdit/:id

Request:

headers:
{
"Authorization": `Bearer ${access_token}`
}

params:
{
"id": "integer"
}
body:
{
"name": "Ikan Salai Patin",
"description": "Ikan Patin yang diproses dengan cara pengasapan. Ikan ini memiliki rasa gurih dan sangat lezat.",
"price": 25000,
"categoryId": 3,
"authorId": 1
}

Response (200 - OK)
{
"message": "Edit Cuisine successful"
}

Response (404 - Not Found)
{
"message": "Data no found"
}

Response (403 - Forbidden)
{
"message": "You have no access"
}

8. GET /category

Request:

headers:
{
"Authorization": `Bearer ${access_token}`
}

Response (200- OK)
[
{
"name" : "Gulai"
},
{
"name" : "Balado"
},
{
"name" : "Bakar"
},
]

9. PATCH /uploadImage/:id

Request:

headers:
{
"Authorization": `Bearer ${access_token}`
}

form-data:
{
"multypart/form-data": file
}

Response (200 - OK)
{
"message": "Image uploaded successfully!"
}

Global Error

Response (401 - Unauthorized)
{
"message": "Invalid token"
}

Response (500 - Internal Server Error)
{
"message": "Internal Server Errror"
}
